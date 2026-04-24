const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://web-production-afbe4.up.railway.app'

type UnknownRecord = Record<string, unknown>

type BackendPlan = {
  id?: string
  code?: string
  name?: string
  description?: string | null
  price?: number | null
  currency?: string | null
  billingCycle?: string | null
  durationDays?: number | null
  stripePriceId?: string | null
  stripeProductId?: string | null
  features?: unknown
  limits?: unknown
  entitlements?: unknown
  isActive?: boolean
  sortOrder?: number | null
}

type BackendConsumable = {
  id?: string
  code?: string
  title?: string
  description?: string | null
  type?: 'likes_pack' | 'compliments_pack' | 'boosts_pack' | string
  quantity?: number | null
  price?: number | null
  currency?: string | null
  sortOrder?: number | null
}

export type MarketingPlan = {
  id: string
  code: string
  name: string
  description: string
  price: number | null
  currency: string | null
  billingCycle: string | null
  durationDays: number | null
  stripePriceId: string | null
  stripeProductId: string | null
  checkoutReady: boolean
  features: string[]
  isActive: boolean
  sortOrder: number
}

export type MarketingOffer = {
  id: string
  code: string
  title: string
  description: string
  type: string
  quantity: number
  price: number | null
  currency: string | null
  sortOrder: number
}

function prettifyKey(input: string) {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function readFeatureEntries(source: unknown, bucket: Set<string>) {
  if (!source || typeof source !== 'object') {
    return
  }

  for (const [key, value] of Object.entries(source as UnknownRecord)) {
    if (value === true) {
      bucket.add(prettifyKey(key))
      continue
    }

    if (typeof value === 'string' && value.trim()) {
      bucket.add(value.trim())
      continue
    }

    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
      bucket.add(`${prettifyKey(key)}: ${value}`)
      continue
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string' && item.trim()) {
          bucket.add(item.trim())
        }
      }
    }
  }
}

function normalizePlan(plan: BackendPlan): MarketingPlan | null {
  if (!plan.code || !plan.name) {
    return null
  }

  const features = new Set<string>()
  readFeatureEntries(plan.features, features)
  readFeatureEntries(plan.entitlements, features)
  readFeatureEntries(plan.limits, features)

  const stripePriceId =
    typeof plan.stripePriceId === 'string' && plan.stripePriceId.trim()
      ? plan.stripePriceId
      : null

  const stripeProductId =
    typeof plan.stripeProductId === 'string' && plan.stripeProductId.trim()
      ? plan.stripeProductId
      : null

  return {
    id: plan.id ?? plan.code,
    code: plan.code,
    name: plan.name,
    description: plan.description ?? '',
    price: typeof plan.price === 'number' ? plan.price : null,
    currency: typeof plan.currency === 'string' ? plan.currency : null,
    billingCycle: typeof plan.billingCycle === 'string' ? plan.billingCycle : null,
    durationDays: typeof plan.durationDays === 'number' ? plan.durationDays : null,
    stripePriceId,
    stripeProductId,
    checkoutReady: Boolean(stripePriceId),
    features: [...features],
    isActive: plan.isActive !== false,
    sortOrder:
      typeof plan.sortOrder === 'number' ? plan.sortOrder : Number.MAX_SAFE_INTEGER,
  }
}

function normalizeOffer(offer: BackendConsumable): MarketingOffer | null {
  if (!offer.code || !offer.title || !offer.type) {
    return null
  }

  return {
    id: offer.id ?? offer.code,
    code: offer.code,
    title: offer.title,
    description: offer.description ?? '',
    type: offer.type,
    quantity: typeof offer.quantity === 'number' ? offer.quantity : 0,
    price: typeof offer.price === 'number' ? offer.price : null,
    currency: typeof offer.currency === 'string' ? offer.currency : null,
    sortOrder:
      typeof offer.sortOrder === 'number' ? offer.sortOrder : Number.MAX_SAFE_INTEGER,
  }
}

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return []
    }

    const payload = (await response.json()) as { data?: T[] } | T[]

    if (Array.isArray(payload)) {
      return payload
    }

    return Array.isArray(payload.data) ? payload.data : []
  } catch {
    return []
  }
}

function mergePlanCollections(
  mobilePlans: MarketingPlan[],
  webPlans: MarketingPlan[],
): MarketingPlan[] {
  const mergedByCode = new Map<string, MarketingPlan>()

  for (const plan of mobilePlans) {
    mergedByCode.set(plan.code, plan)
  }

  for (const plan of webPlans) {
    const existing = mergedByCode.get(plan.code)

    if (!existing) {
      mergedByCode.set(plan.code, plan)
      continue
    }

    const mergedFeatures = [...new Set([...existing.features, ...plan.features])]

    mergedByCode.set(plan.code, {
      ...existing,
      id: plan.id || existing.id,
      name: plan.name || existing.name,
      description: plan.description || existing.description,
      price: plan.price ?? existing.price,
      currency: plan.currency ?? existing.currency,
      billingCycle: plan.billingCycle ?? existing.billingCycle,
      durationDays: plan.durationDays ?? existing.durationDays,
      stripePriceId: plan.stripePriceId ?? existing.stripePriceId,
      stripeProductId: plan.stripeProductId ?? existing.stripeProductId,
      checkoutReady: Boolean(plan.stripePriceId ?? existing.stripePriceId),
      features: mergedFeatures,
      sortOrder: Math.min(existing.sortOrder, plan.sortOrder),
    })
  }

  return [...mergedByCode.values()]
    .filter((plan) => plan.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getMarketingPlans(): Promise<MarketingPlan[]> {
  const [mobileRawPlans, webRawPlans] = await Promise.all([
    fetchCollection<BackendPlan>('/api/v1/mobile/plans'),
    fetchCollection<BackendPlan>('/api/v1/web/plans'),
  ])

  const mobilePlans = mobileRawPlans
    .map(normalizePlan)
    .filter((plan): plan is MarketingPlan => plan !== null)

  const webPlans = webRawPlans
    .map(normalizePlan)
    .filter((plan): plan is MarketingPlan => plan !== null)

  return mergePlanCollections(mobilePlans, webPlans)
}

export async function getMarketingOffers(): Promise<MarketingOffer[]> {
  const rawOffers = await fetchCollection<BackendConsumable>('/api/v1/web/consumables')

  return rawOffers
    .map(normalizeOffer)
    .filter((offer): offer is MarketingOffer => offer !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

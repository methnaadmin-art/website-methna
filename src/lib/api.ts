import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-afbe4.up.railway.app'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
})

type ApiEnvelope<T> = {
  success?: boolean
  data: T
}

function unwrapData<T>(payload: T | ApiEnvelope<T>) {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    Object.prototype.hasOwnProperty.call(payload, 'data')
  ) {
    return (payload as ApiEnvelope<T>).data
  }

  return payload as T
}

// Attach auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Types ────────────────────────────────────────────────────

export interface Plan {
  id: string
  code: string
  name: string
  description: string | null
  price: number
  currency: string
  billingCycle: string
  durationDays: number
  stripePriceId: string | null
  stripeProductId: string | null
  features: Record<string, unknown>
  limits: Record<string, unknown>
  entitlements: Record<string, unknown>
  isActive: boolean
  sortOrder: number
}

export interface ConsumableProduct {
  id: string
  code: string
  title: string
  description: string | null
  type: 'likes_pack' | 'compliments_pack' | 'boosts_pack'
  quantity: number
  price: number
  currency: string
  stripePriceId: string | null
  sortOrder: number
}

export interface UserBalances {
  likes: number
  compliments: number
  boosts: number
}

export interface CheckoutSession {
  checkoutUrl: string
  sessionId: string
}

export interface EmailCheckResult {
  exists: boolean
  userId?: string
  isPremium?: boolean
  planCode?: string
  status?: string
  message?: string
}

export interface SubscriptionStatusByEmailResult {
  exists: boolean
  planName?: string
  planCode?: string
  status?: string
  renewalDate?: string | null
  features?: string[]
  isPremium?: boolean
  message?: string
}

export interface PublicCheckoutPayload {
  email: string
  planCode: string
  successUrl?: string
  cancelUrl?: string
}

export interface AppContent {
  id: string
  type: string
  title: string
  content: string
  locale: string
  isPublished: boolean
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
  locale: string
  order: number
  isPublished: boolean
}

export interface SupportTicket {
  id: string
  subject: string
  message: string
  status: string
  createdAt: string
}

// ── Plans API ────────────────────────────────────────────────

export const plansApi = {
  getPlans: () =>
    api
      .get<ApiEnvelope<Plan[]> | Plan[]>('/web/plans')
      .then((r) => unwrapData(r.data)),

  checkEmail: (email: string) =>
    api
      .post<ApiEnvelope<EmailCheckResult> | EmailCheckResult>('/web/subscriptions/check-email', {
        email,
      })
      .then((r) => unwrapData(r.data)),

  getSubscriptionStatusByEmail: (email: string) =>
    api
      .get<
        ApiEnvelope<SubscriptionStatusByEmailResult> | SubscriptionStatusByEmailResult
      >('/web/subscription/status-by-email', {
        params: { email },
      })
      .then((r) => unwrapData(r.data)),

  createCheckoutSession: (planCode: string) =>
    api
      .post<ApiEnvelope<CheckoutSession> | CheckoutSession>(
        '/web/payments/create-checkout-session',
        { planCode },
      )
      .then((r) => unwrapData(r.data)),

  createPublicCheckoutSession: (payload: PublicCheckoutPayload) =>
    api
      .post<ApiEnvelope<CheckoutSession> | CheckoutSession>(
        '/web/payments/public-checkout',
        payload,
      )
      .then((r) => unwrapData(r.data)),

  getSubscriptionStatus: () =>
    api
      .get('/web/subscription/status')
      .then((r) => unwrapData(r.data as ApiEnvelope<unknown> | unknown)),

  getManageUrl: () =>
    api
      .get<ApiEnvelope<{ url: string }> | { url: string }>('/web/payments/manage-url')
      .then((r) => unwrapData(r.data)),

  getManageUrlByEmail: (email: string) =>
    api
      .post<ApiEnvelope<{ url: string }> | { url: string }>('/web/subscription/manage', {
        email,
      })
      .then((r) => unwrapData(r.data)),
}

// ── Consumable API ───────────────────────────────────────────

export const consumableApi = {
  getProducts: () =>
    api
      .get<ApiEnvelope<ConsumableProduct[]> | ConsumableProduct[]>('/web/consumables')
      .then((r) => unwrapData(r.data)),

  getBalances: () =>
    api
      .get<ApiEnvelope<UserBalances> | UserBalances>('/web/consumables/balances')
      .then((r) => unwrapData(r.data)),

  createCheckoutSession: (productCode: string) =>
    api
      .post<ApiEnvelope<CheckoutSession> | CheckoutSession>(
        '/web/consumables/create-checkout-session',
        { productCode },
      )
      .then((r) => unwrapData(r.data)),

  getPurchaseHistory: (page = 1, limit = 20) =>
    api.get('/web/consumables/purchases', { params: { page, limit } }).then((r) => r.data),
}

// ── Content API ──────────────────────────────────────────────

export const contentApi = {
  getByType: (type: string, locale = 'en') =>
    api.get<AppContent>(`/content/${type}`, { params: { locale } }).then((r) => r.data),

  getFaqs: (locale = 'en', category?: string) =>
    api.get<FaqItem[]>('/content/faqs/list', { params: { locale, category } }).then((r) => r.data),
}

// ── Support API ──────────────────────────────────────────────

export const supportApi = {
  createTicket: (subject: string, message: string) =>
    api.post<SupportTicket>('/support', { subject, message }).then((r) => r.data),

  getMyTickets: (page = 1, limit = 10) =>
    api.get('/support/my-tickets', { params: { page, limit } }).then((r) => r.data),

  getTicket: (id: string) =>
    api.get<SupportTicket>(`/support/my-tickets/${id}`).then((r) => r.data),
}

export default api

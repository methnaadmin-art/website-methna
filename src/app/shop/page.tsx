'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  consumableApi,
  type ConsumableProduct,
  type UserBalances,
} from '@/lib/api'
import { Heart, MessageCircle, Zap, ShoppingCart, Loader2 } from 'lucide-react'

const TYPE_CONFIG = {
  likes_pack: {
    icon: Heart,
    label: 'Likes',
    emoji: '❤️',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-950',
    border: 'border-pink-200 dark:border-pink-800',
  },
  compliments_pack: {
    icon: MessageCircle,
    label: 'Compliments',
    emoji: '💬',
    gradient: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50 dark:bg-purple-950',
    border: 'border-purple-200 dark:border-purple-800',
  },
  boosts_pack: {
    icon: Zap,
    label: 'Boosts',
    emoji: '⚡',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-200 dark:border-amber-800',
  },
} as const

type ProductType = keyof typeof TYPE_CONFIG

export default function ShopPage() {
  const [products, setProducts] = useState<ConsumableProduct[]>([])
  const [balances, setBalances] = useState<UserBalances | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ProductType>('likes_pack')

  const fetchData = useCallback(async () => {
    try {
      const [prods, bals] = await Promise.all([
        consumableApi.getProducts(),
        consumableApi.getBalances().catch(() => null),
      ])
      setProducts(prods)
      setBalances(bals)
    } catch (err) {
      console.error('Failed to load shop data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handlePurchase = async (product: ConsumableProduct) => {
    setPurchasing(product.code)
    try {
      const session = await consumableApi.createCheckoutSession(product.code)
      // Redirect to Stripe Checkout
      window.location.href = session.checkoutUrl
    } catch (err) {
      console.error('Failed to create checkout session:', err)
      alert('Failed to start purchase. Please try again.')
    } finally {
      setPurchasing(null)
    }
  }

  const filteredProducts = products.filter((p) => p.type === activeTab)

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          Buy likes, compliments, and boosts to enhance your experience
        </p>
      </div>

      {/* Balances */}
      {balances && (
        <div className="mb-8 grid grid-cols-3 gap-4">
          {(
            [
              ['likes', '❤️', 'Likes'],
              ['compliments', '💬', 'Compliments'],
              ['boosts', '⚡', 'Boosts'],
            ] as const
          ).map(([key, emoji, label]) => (
            <div
              key={key}
              className="rounded-xl border bg-card p-4 text-center shadow-sm"
            >
              <div className="text-2xl">{emoji}</div>
              <div className="mt-1 text-2xl font-bold">
                {balances[key as keyof UserBalances]}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {(Object.entries(TYPE_CONFIG) as [ProductType, (typeof TYPE_CONFIG)[ProductType]][]).map(
          ([type, config]) => {
            const Icon = config.icon
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === type
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-md`
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                {config.label}
              </button>
            )
          },
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No {TYPE_CONFIG[activeTab].label.toLowerCase()} packs available yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const config = TYPE_CONFIG[product.type as ProductType]
            const isPurchasing = purchasing === product.code
            return (
              <div
                key={product.id}
                className={`relative overflow-hidden rounded-2xl border ${config.border} ${config.bg} p-6 shadow-sm transition-shadow hover:shadow-md`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} text-white shadow-lg`}
                  >
                    <span className="text-2xl">{config.emoji}</span>
                  </div>

                  {/* Quantity */}
                  <div className="text-3xl font-bold">+{product.quantity}</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {config.label}
                  </div>

                  {/* Title */}
                  <div className="mt-2 text-sm">{product.title}</div>

                  {/* Description */}
                  {product.description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product.description}
                    </p>
                  )}

                  {/* Buy button */}
                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={isPurchasing}
                    className={`mt-4 w-full rounded-xl bg-gradient-to-r ${config.gradient} px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100`}
                  >
                    {isPurchasing ? (
                      <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />$
                        {product.price.toFixed(2)} {product.currency.toUpperCase()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

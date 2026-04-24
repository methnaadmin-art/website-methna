'use client'

import { useEffect, useState } from 'react'
import { consumableApi, type UserBalances } from '@/lib/api'
import { CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const [balances, setBalances] = useState<UserBalances | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Poll for updated balances (webhook may take a moment)
    const poll = async (attempts = 0) => {
      try {
        const bals = await consumableApi.getBalances()
        setBalances(bals)
      } catch {
        if (attempts < 5) {
          setTimeout(() => poll(attempts + 1), 2000)
        }
      } finally {
        setLoading(false)
      }
    }
    poll()
  }, [])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-lg">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold">Payment Successful!</h1>
        <p className="mt-2 text-muted-foreground">
          Your purchase has been confirmed and your balance has been updated.
        </p>

        {loading ? (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm text-muted-foreground">Updating balances...</span>
          </div>
        ) : balances ? (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-pink-50 p-3 dark:bg-pink-950">
              <div className="text-xl">❤️</div>
              <div className="text-lg font-bold">{balances.likes}</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
            <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950">
              <div className="text-xl">💬</div>
              <div className="text-lg font-bold">{balances.compliments}</div>
              <div className="text-xs text-muted-foreground">Compliments</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950">
              <div className="text-xl">⚡</div>
              <div className="text-lg font-bold">{balances.boosts}</div>
              <div className="text-xs text-muted-foreground">Boosts</div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex gap-3">
          <Link
            href="/shop"
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to Shop
          </Link>
          <Link
            href="/"
            className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}

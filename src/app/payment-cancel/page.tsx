'use client'

import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-lg">
        <XCircle className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Payment Cancelled</h1>
        <p className="mt-2 text-muted-foreground">
          Your purchase was not completed. No charges have been made.
        </p>
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

# Methna Premium Web

Premium subscription website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Stripe-ready backend proxy contracts.

## Features

- Dynamic plans loaded from backend source of truth.
- Mandatory email verification gate before checkout.
- Checkout session request via backend (frontend never grants premium).
- Success/cancel pages for Stripe redirect return.
- Manage subscription page with status + billing portal trigger.
- Terms/privacy pages fetched from backend content endpoints.
- Dedicated contact page that submits support tickets.
- Premium visual system with polished animation and responsive layouts.

## Routes

- `/premium`
- `/subscription` (alias redirect)
- `/manage-subscription`
- `/about`
- `/terms`
- `/privacy`
- `/contact`
- `/success`
- `/cancel`

## API Proxy Routes (Next.js)

- `GET /api/plans`
- `POST /api/check-email`
- `POST /api/checkout`
- `GET /api/content/:slug`
- `POST /api/support/tickets`
- `GET /api/subscription/status`
- `POST /api/subscription/manage`

## Environment

1. Copy `.env.example` to `.env.local`
2. Set backend and Stripe values.

Important defaults:

- Backend base URL expected with prefix: `http://localhost:3000/api/v1`
- Site URL: `http://localhost:3000`

## Backend Gap Note

Your current backend in `desktop/jord` already supports plans and content endpoints, but Stripe web checkout/public email-check routes are currently auth-only or disabled.

Required contracts are documented in:

- `BACKEND_CONTRACTS.md`

## Run

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/premium`

## Build

```bash
npm run lint
npm run build
npm run start
```


# Backend Contracts Required For Full Web Stripe Flow

Current backend (`desktop/jord`) already supports:

- `GET /api/v1/plans/public`
- `GET /api/v1/content/terms`
- `GET /api/v1/content/privacy`

Current backend does **not** expose public web-oriented Stripe endpoints yet. For complete web subscription flow, implement these contracts in backend:

## 1) Check Email Before Checkout

`POST /api/v1/subscriptions/check-email`

Request:

```json
{
  "email": "user@example.com"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "exists": true,
    "userId": "uuid",
    "message": "Account found"
  }
}
```

## 2) Create Stripe Checkout Session

`POST /api/v1/payments/create-checkout-session`

Request:

```json
{
  "email": "user@example.com",
  "planCode": "premium",
  "successUrl": "https://your-site.com/success",
  "cancelUrl": "https://your-site.com/cancel",
  "source": "premium-web"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "url": "https://checkout.stripe.com/c/session_id"
  }
}
```

Notes:

- Must fail with 403 if email has no app account.
- Must not require JWT for this web entry point if email-check contract is used.

## 3) Subscription Status By Email

`GET /api/v1/subscription/status?email=user@example.com`

Response:

```json
{
  "success": true,
  "data": {
    "planName": "Premium",
    "planCode": "premium",
    "status": "active",
    "renewalDate": "2026-05-01T08:00:00.000Z",
    "features": ["who liked me", "ghost mode", "passport mode"]
  }
}
```

## 4) Open Subscription Management Portal

`POST /api/v1/subscription/manage`

Request:

```json
{
  "email": "user@example.com"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "url": "https://billing.stripe.com/p/session"
  }
}
```

## 5) Public Support Ticket Creation

`POST /api/v1/support/tickets`

Request:

```json
{
  "name": "Customer Name",
  "email": "contact@example.com",
  "accountEmail": "app-account@example.com",
  "subject": "Billing issue",
  "message": "Detailed message"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "ticketId": "uuid"
  }
}
```

## 6) Webhook Source Of Truth

Implement/restore Stripe webhook endpoint (e.g. `/webhook/stripe`) to:

- map checkout customer email -> app user
- activate selected plan
- apply plan entitlements/features
- write subscription + purchase transaction records

Frontend must never activate premium directly.

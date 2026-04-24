'use client'

import { isAxiosError } from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  Play,
  QrCode,
  ShieldCheck,
  Sparkles,
  Stars,
  UsersRound,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  HeroExactUiCluster,
  MockupStoryRail,
} from '@/components/landing/exact-ui-showcase'
import type { MarketingPlan } from '@/lib/marketing-api'
import {
  plansApi,
  type EmailCheckResult,
  type SubscriptionStatusByEmailResult,
} from '@/lib/api'

const navLinks = [
  { label: 'Our Vision', href: '#vision' },
  { label: 'Community', href: '#community' },
  { label: 'The Process', href: '#process' },
  { label: 'Support', href: '#support' },
]

const philosophyPoints = [
  {
    title: 'Intentional discovery',
    copy: 'Detailed profiles focus on values, deen, city, and long-term compatibility instead of noisy swiping.',
  },
  {
    title: 'Respectful introductions',
    copy: 'Methna is designed for Muslims seeking halal, serious relationships with warmth, clarity, and dignity.',
  },
  {
    title: 'Privacy-first design',
    copy: 'Visibility controls, verified users, and moderation tools keep the experience calm and protected.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Build a profile with purpose',
    copy: 'Share your values, lifestyle, and future intentions through a more thoughtful onboarding flow.',
  },
  {
    step: '02',
    title: 'Complete verification',
    copy: 'Identity, selfie, and document checkpoints help create a more trusted space for everyone.',
  },
  {
    step: '03',
    title: 'Discover serious matches',
    copy: 'Use smart filters across city, country, and compatibility details to focus on quality, not volume.',
  },
  {
    step: '04',
    title: 'Connect respectfully',
    copy: 'Move into conversation with privacy-aware messaging and a tone shaped for serious Muslim matchmaking.',
  },
]

const trustCards = [
  {
    icon: BadgeCheck,
    title: 'Verified members',
    copy: 'Verification layers help make sure the people you meet are genuine and serious.',
  },
  {
    icon: LockKeyhole,
    title: 'Privacy-first by design',
    copy: 'Controls for visibility, moderation, and communication boundaries are built in from the start.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe interaction',
    copy: 'Respectful reporting tools and moderation flows keep the platform aligned with serious intentions.',
  },
]

const footerGroups = [
  {
    title: 'The Platform',
    links: [
      { label: 'How it Works', href: '#process', external: false },
      { label: 'Premium Membership', href: '#membership', external: false },
      { label: 'Contact Us', href: '/contact', external: false },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Explore the App', href: '#community', external: false },
      { label: 'Trust & Safety', href: '#trust', external: false },
      { label: 'Support Email', href: 'mailto:support@methna.app', external: true },
    ],
  },
  {
    title: 'Legal & Trust',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy', external: false },
      { label: 'Terms & Conditions', href: '/terms-and-conditions', external: false },
      { label: 'Contact Support', href: '/contact', external: false },
    ],
  },
]

const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

function SectionPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#ddd3cc] bg-white px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#86685c] shadow-[0_14px_34px_-28px_rgba(92,70,54,0.22)]">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}

function PrimaryButton({
  children,
  onClick,
  loading,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
}) {
  const isDisabled = loading || disabled

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#b97867_0%,#c78573_100%)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_22px_44px_-28px_rgba(167,108,89,0.48)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_54px_-30px_rgba(167,108,89,0.56)] sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? 'Processing...' : children}
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}

function GhostButton({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  return (
    <a
      href={href}
      className="inline-flex w-full items-center justify-center rounded-full border border-[#d9ccc3] bg-white px-6 py-3.5 text-sm font-semibold text-[#6b5447] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#c9b1a5] hover:text-[#3d2a20] sm:w-auto"
    >
      {children}
    </a>
  )
}

function StoreButton({
  href,
  icon: Icon,
  label,
  note,
}: {
  href?: string
  icon: typeof Apple
  label: string
  note: string
}) {
  const sharedClassName =
    'group flex items-center justify-between gap-3 rounded-[1.45rem] border border-[#eaded7] bg-white px-4 py-3 text-left shadow-[0_14px_36px_-32px_rgba(87,67,51,0.18)]'

  if (!href) {
    return (
      <button type="button" disabled className={`${sharedClassName} cursor-not-allowed opacity-70`}>
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7ece8] text-[#8e5e58]">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-[#2b1d17]">{label}</span>
            <span className="block text-xs text-[#8e7b71]">{note}</span>
          </span>
        </span>
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${sharedClassName} transition hover:-translate-y-0.5 hover:border-[#d8c7be] hover:bg-[#fffcf9]`}
    >
      <span className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7ece8] text-[#8e5e58]">
          <Icon className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-[#2b1d17]">{label}</span>
          <span className="block text-xs text-[#8e7b71]">{note}</span>
        </span>
      </span>
    </a>
  )
}

function QRPreview() {
  const cells = Array.from({ length: 121 }, (_, index) => {
    const row = Math.floor(index / 11)
    const column = index % 11
    const finder =
      (row < 3 && column < 3) ||
      (row < 3 && column > 7) ||
      (row > 7 && column < 3)
    const accent = (row * column + row + column) % 3 === 0
    return finder || accent
  })

  return (
    <div className="rounded-[1.8rem] border border-[#eaded7] bg-[#fffdfa] p-5 shadow-[0_20px_50px_-40px_rgba(87,67,51,0.16)]">
      <div className="mb-3 flex items-center gap-2 text-[#876d60]">
        <QrCode className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">QR Ready</span>
      </div>
      <div className="grid grid-cols-11 gap-1 rounded-[1.2rem] bg-white p-3">
        {cells.map((filled, index) => (
          <span
            key={index}
            className={
              filled
                ? 'aspect-square rounded-[4px] bg-[#241811]'
                : 'aspect-square rounded-[4px] bg-transparent'
            }
          />
        ))}
      </div>
      <p className="mt-3 text-xs leading-6 text-[#8d7b71]">
        Sign up and login happen inside the mobile app. This area is ready for your
        live QR destination when you connect the store links.
      </p>
    </div>
  )
}

function StoreModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#04010a]/75 backdrop-blur-xl"
            onClick={onClose}
            aria-label="Close modal"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2.25rem] border border-[#eaded7] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f1eb_100%)] shadow-[0_48px_120px_-70px_rgba(111,84,67,0.42)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -top-16 left-10 h-48 w-48 rounded-full bg-[#efd8cf] blur-3xl" />
            <div className="absolute right-6 top-8 h-36 w-36 rounded-full bg-[#f2e3df] blur-3xl" />
            <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <button
                  type="button"
                  className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#eaded7] bg-white text-[#745d52] hover:bg-[#f8f1eb]"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e2d7d0] bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8b6b5d]">
                  Continue in the app
                </div>
                <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-[#21170f] [font-family:var(--font-display)] sm:text-4xl">
                  Methna keeps sign up and login inside the mobile app.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-[#6e5f56]">
                  Download Methna on your phone to create your profile, explore serious
                  introductions, and continue with privacy, intention, and respect.
                </p>
                <div className="mt-8 grid gap-3">
                  <StoreButton
                    icon={Apple}
                    label="App Store"
                    note="Connect your live iOS listing"
                  />
                  <StoreButton
                    icon={Play}
                    label="Google Play"
                    note="Connect your live Android listing"
                  />
                </div>
              </div>

              <QRPreview />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a href={href} className="text-sm text-[#5f5149] hover:text-[#3d2a20]">
        {children}
      </a>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className="text-sm text-[#5f5149] hover:text-[#3d2a20]">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className="text-sm text-[#5f5149] hover:text-[#3d2a20]">
      {children}
    </Link>
  )
}

function formatPlanPrice(plan: MarketingPlan) {
  if (typeof plan.price !== 'number' || !plan.currency) {
    return 'Membership details on request'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: plan.currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(plan.price)
}

function formatPlanCycle(plan: MarketingPlan) {
  if (plan.billingCycle) {
    return `per ${plan.billingCycle.toLowerCase()}`
  }

  if (plan.durationDays) {
    return `every ${plan.durationDays} days`
  }

  return 'live from backend'
}

function formatPlanName(plan: MarketingPlan) {
  return plan.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatPlanCode(code: string | null | undefined) {
  if (!code) {
    return 'Premium'
  }

  return code
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value))
}

function readApiMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const payload = error.response?.data as
      | { message?: string | string[]; error?: string }
      | undefined

    if (Array.isArray(payload?.message) && payload.message.length > 0) {
      return payload.message[0]
    }

    if (typeof payload?.message === 'string' && payload.message.trim()) {
      return payload.message
    }

    if (typeof payload?.error === 'string' && payload.error.trim()) {
      return payload.error
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

export function LandingPage({ plans }: { plans: MarketingPlan[] }) {
  const [storeModalOpen, setStoreModalOpen] = useState(false)
  const [selectedPlanCode, setSelectedPlanCode] = useState(plans[0]?.code ?? '')
  const [accountEmail, setAccountEmail] = useState('')
  const [checkedAccount, setCheckedAccount] = useState<EmailCheckResult | null>(null)
  const [checkedSubscription, setCheckedSubscription] =
    useState<SubscriptionStatusByEmailResult | null>(null)
  const [checkedEmail, setCheckedEmail] = useState('')
  const [emailCheckLoading, setEmailCheckLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null)

  const activePlan =
    plans.find((plan) => plan.code === selectedPlanCode) ?? plans[0] ?? null
  const normalizedEmail = normalizeEmail(accountEmail)
  const hasFreshAccountCheck = checkedEmail === normalizedEmail && checkedAccount !== null
  const checkoutReady = activePlan?.checkoutReady ?? false

  const displayedFeatures = useMemo(() => {
    if (!activePlan) {
      return [
        'Membership plans sync automatically from your backend.',
        'Admin-managed pricing can appear here without editing the frontend.',
        'Checkout can stay connected to your existing subscription flow.',
      ]
    }

    return activePlan.features.length > 0
      ? activePlan.features.slice(0, 5)
      : [
          'Advanced filters for values, deen, and location',
          'Visibility controls for a more private experience',
          'Better discovery power for serious introductions',
          'Priority support for premium members',
        ]
  }, [activePlan])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const params = new URLSearchParams(window.location.search)
    const checkoutState = params.get('checkout')

    if (checkoutState === 'success') {
      setCheckoutNotice(
        'Stripe checkout completed. Your subscription will sync back to the same Methna account email.',
      )
      setCheckoutError(null)
    } else if (checkoutState === 'cancel') {
      setCheckoutNotice('Checkout was cancelled. You can review your plan and try again any time.')
    } else {
      return
    }

    params.delete('checkout')
    params.delete('plan')
    const nextQuery = params.toString()
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}`
    window.history.replaceState({}, '', nextUrl)
  }, [])

  const handleEmailCheck = async () => {
    if (!isValidEmail(accountEmail)) {
      setCheckedAccount(null)
      setCheckedSubscription(null)
      setCheckedEmail('')
      setCheckoutNotice(null)
      setCheckoutError('Use the email already registered inside the Methna app.')
      return null
    }

    try {
      setEmailCheckLoading(true)
      setCheckoutError(null)
      setCheckoutNotice(null)

      const result = await plansApi.checkEmail(normalizedEmail)
      let subscriptionStatus: SubscriptionStatusByEmailResult | null = null

      if (result.exists) {
        try {
          subscriptionStatus = await plansApi.getSubscriptionStatusByEmail(normalizedEmail)
        } catch {
          subscriptionStatus = {
            exists: result.exists,
            isPremium: result.isPremium,
            planCode: result.planCode,
            status: result.status,
            message: result.message,
          }
        }
      }

      setCheckedAccount(result)
      setCheckedSubscription(subscriptionStatus)
      setCheckedEmail(normalizedEmail)

      if (subscriptionStatus?.isPremium && subscriptionStatus.planCode) {
        const matchedPlan = plans.find((plan) => plan.code === subscriptionStatus?.planCode)
        if (matchedPlan) {
          setSelectedPlanCode(matchedPlan.code)
        }
      }

      return { account: result, subscription: subscriptionStatus }
    } catch (error) {
      const message = readApiMessage(
        error,
        'We could not verify this account email right now. Please try again.',
      )
      setCheckedAccount(null)
      setCheckedSubscription(null)
      setCheckedEmail('')
      setCheckoutError(message)
      return null
    } finally {
      setEmailCheckLoading(false)
    }
  }

  const handlePlanCheckout = async () => {
    if (!activePlan) {
      setStoreModalOpen(true)
      return
    }

    let account = hasFreshAccountCheck ? checkedAccount : null
    let subscription = checkedSubscription

    if (!account) {
      const emailResult = await handleEmailCheck()
      account = emailResult?.account ?? null
      subscription = emailResult?.subscription ?? null
    }

    if (!account) {
      return
    }

    if (!account.exists) {
      setCheckoutError(
        account.message || 'No account was found with this email. Create your profile in the app first.',
      )
      return
    }

    const premiumStatus = subscription?.isPremium ?? account.isPremium

    if (premiumStatus) {
      try {
        setCheckoutLoading(activePlan.code)
        setCheckoutError(null)
        const manage = await plansApi.getManageUrlByEmail(normalizedEmail)

        if (!manage.url) {
          throw new Error('Billing management is not available for this account yet.')
        }

        window.location.href = manage.url
        return
      } catch (error) {
        setCheckoutError(
          readApiMessage(
            error,
            'This account already has premium, but we could not open billing management right now.',
          ),
        )
        return
      } finally {
        setCheckoutLoading(null)
      }
    }

    try {
      setCheckoutError(null)
      setCheckoutNotice(null)
      setCheckoutLoading(activePlan.code)

      const origin = window.location.origin
      const checkout = await plansApi.createPublicCheckoutSession({
        email: normalizedEmail,
        planCode: activePlan.code,
        successUrl: `${origin}/?checkout=success&plan=${activePlan.code}`,
        cancelUrl: `${origin}/?checkout=cancel&plan=${activePlan.code}`,
      })

      if (!checkout.checkoutUrl) {
        throw new Error('Stripe did not return a checkout URL.')
      }

      window.location.href = checkout.checkoutUrl
    } catch (error) {
      setCheckoutError(
        readApiMessage(
          error,
          'The live membership plan is connected, but checkout could not start just now.',
        ),
      )
    } finally {
      setCheckoutLoading(null)
    }
  }

  const subscriberPlanLabel =
    checkedSubscription?.planName ||
    formatPlanCode(checkedSubscription?.planCode || checkedAccount?.planCode)

  const accountStatusMessage = !hasFreshAccountCheck
    ? null
    : !checkedAccount?.exists
      ? 'No Methna account was found with this email. Install the app first, create your profile, then return here for subscription checkout.'
      : (checkedSubscription?.isPremium ?? checkedAccount?.isPremium)
        ? `Premium already active on ${subscriberPlanLabel}. Open billing management for this subscriber email instead of paying again.`
        : 'Account found. This email is on the free plan, so you can continue to Stripe checkout.'

  const subscriberHasPremium = checkedSubscription?.isPremium ?? checkedAccount?.isPremium ?? false

  const accountStatusClassName = !hasFreshAccountCheck
    ? ''
    : subscriberHasPremium
      ? 'border-[#fde6b6] bg-[#fff7e8] text-[#8a5b11]'
      : checkedAccount?.exists
        ? 'border-[#d9f2df] bg-[#f3fff6] text-[#24603b]'
        : 'border-[#eadbff] bg-[#f6f0ff] text-[#5b31d6]'

  const subscriberStatusLabel = checkedSubscription?.status
    ? checkedSubscription.status.replace(/_/g, ' ').toLowerCase()
    : null

  const primaryButtonLabel = subscriberHasPremium
    ? 'Manage billing'
    : activePlan
      ? `Continue to Stripe for ${formatPlanName(activePlan)}`
      : 'Join Methna'

  return (
    <>
      <StoreModal open={storeModalOpen} onClose={() => setStoreModalOpen(false)} />

      <div className="relative overflow-hidden bg-[#faf7f2]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(231,215,205,0.72),transparent_68%)]" />
        <div className="pointer-events-none absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-[#f0ddd2] blur-[110px]" />
        <div className="pointer-events-none absolute right-[-7rem] top-[18rem] h-72 w-72 rounded-full bg-[#f3e7de] blur-[120px]" />

        <main className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <section id="top" className="mx-auto max-w-[1280px]">
            <div className="rounded-[1.35rem] border border-[#e8ddd6] bg-[#f7f4ef] p-3 shadow-[0_28px_64px_-46px_rgba(59,36,25,0.18)]">
              <div className="overflow-hidden rounded-[1rem] border border-[#eee7e0] bg-white">
                <header className="border-b border-[#f0e9e3] bg-white px-5 py-4 sm:px-8">
                  <div className="flex items-center justify-between gap-6">
                    <a href="#top" className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#eadfd9] bg-[#f7efea]">
                        <Image
                          src="/assets/methna-mark.png"
                          alt="Methna logo"
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                          priority
                        />
                      </span>
                      <span className="text-[1.8rem] font-semibold leading-none text-[#b06f64] [font-family:var(--font-display)]">
                        Methna
                      </span>
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex">
                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="text-sm font-medium text-[#66574e] transition-colors hover:text-[#432f25]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </nav>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStoreModalOpen(true)}
                        className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-[#5f5149] hover:bg-[#f6efe9] sm:inline-flex"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setStoreModalOpen(true)}
                        className="rounded-full bg-[linear-gradient(135deg,#b97867_0%,#c78573_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_36px_-24px_rgba(167,108,89,0.44)]"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </header>

                <div className="relative min-h-[32rem] overflow-hidden bg-[linear-gradient(135deg,#6f5738_0%,#8d7144_12%,#d1bb88_32%,#f4ead6_58%,#dbc697_72%,#85683f_100%)] px-6 py-10 sm:px-8 sm:py-14 lg:min-h-[39rem] lg:px-12">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,19,11,0.72)_0%,rgba(35,24,13,0.62)_22%,rgba(47,33,18,0.22)_50%,rgba(41,28,16,0.08)_66%,rgba(30,20,11,0.18)_100%)]" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] overflow-hidden lg:block">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(50,34,19,0.08)_0%,rgba(50,34,19,0)_20%)]" />
                    <Image
                      src="/assets/reference-hero-section.png"
                      alt=""
                      fill
                      priority
                      aria-hidden="true"
                      className="object-cover object-[82%_84%] scale-[1.3]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,28,14,0.38)_0%,rgba(42,28,14,0.06)_18%,rgba(20,13,7,0.04)_100%)]" />
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden lg:hidden">
                    <Image
                      src="/assets/reference-hero-section.png"
                      alt=""
                      fill
                      priority
                      aria-hidden="true"
                      className="object-cover object-[76%_88%] scale-[1.38]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,21,12,0.44)_0%,rgba(31,21,12,0.5)_100%)]" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(248,224,173,0.2),transparent_22%),radial-gradient(circle_at_76%_16%,rgba(255,239,195,0.16),transparent_18%),linear-gradient(180deg,rgba(16,10,5,0.02)_0%,rgba(16,10,5,0.22)_100%)]" />

                  <motion.div {...revealUp} initial={false} className="relative z-10 max-w-[34rem]">
                    <p className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[#e0c996]">
                      Rooted in tradition. Built for the future.
                    </p>
                    <h1 className="mt-5 text-balance text-[3rem] font-semibold leading-[0.9] text-white [font-family:var(--font-display)] sm:text-[4.7rem] lg:text-[6rem]">
                      Build Your
                      <br />
                      Future,
                      <br />
                      <span className="italic">Rooted in Faith.</span>
                    </h1>
                    <p className="mt-6 max-w-[34rem] text-lg leading-8 text-[#f2e9dd] sm:text-[1.45rem] sm:leading-[1.6]">
                      Methna is more than an app. It is the first step toward the
                      family life you have always envisioned.
                    </p>

                    <div className="mt-10">
                      <PrimaryButton onClick={() => setStoreModalOpen(true)}>
                        Start Your Journey
                      </PrimaryButton>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section id="vision" className="mx-auto mt-16 max-w-[1200px]">
            <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <motion.div {...revealUp}>
                <div className="rounded-[2.2rem] border border-[#ece2db] bg-[#f7f2ed] p-5 shadow-[0_22px_54px_-42px_rgba(72,52,39,0.18)]">
                  <div className="rounded-[1.7rem] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(236,226,219,0.75)]">
                    <div className="overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,#fbf6f1_0%,#f1e6de_100%)] p-5">
                      <div className="mx-auto max-w-[17rem]">
                        <Image
                          src="/assets/exact-ui/methna-chat-list-screen.png"
                          alt="Methna chats list screen displayed in a premium editorial frame"
                          width={1290}
                          height={2796}
                          sizes="(max-width: 1024px) 58vw, 320px"
                          className="h-auto w-full rounded-[1.5rem] shadow-[0_28px_60px_-36px_rgba(64,41,27,0.32)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...revealUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              >
                <SectionPill>Our philosophy</SectionPill>
                <h2 className="mt-5 max-w-lg text-balance text-[2.7rem] font-semibold leading-[0.98] text-[#20160f] [font-family:var(--font-display)] sm:text-5xl">
                  Designed for marriage. Built for family.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[#62544d]">
                  In a world of fleeting interactions, Methna prioritizes sincerity,
                  privacy, and meaningful compatibility for Muslims looking for a serious,
                  halal relationship journey.
                </p>
                <div className="mt-8 space-y-5">
                  {philosophyPoints.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ddd2fb] bg-[#f3eeff] text-[#643bda]">
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-[#271b12]">{item.title}</p>
                        <p className="mt-1 text-base leading-7 text-[#665850]">{item.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="community" className="mx-auto mt-18 max-w-[1200px]">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div {...revealUp}>
                <SectionPill>Community</SectionPill>
                <h2 className="mt-5 max-w-md text-balance text-[2.7rem] font-semibold leading-[1] text-[#22170f] [font-family:var(--font-display)] sm:text-[4rem]">
                  A space for serenity, not noise.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[#665850]">
                  Methna removes the chaos of casual dating. Discovery, messaging, and
                  premium visibility controls are shaped to feel calmer, more respectful,
                  and genuinely marriage-minded.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    { icon: UsersRound, label: 'Verified introductions' },
                    { icon: MapPin, label: 'City and country filters' },
                    { icon: HeartHandshake, label: 'Respectful communication' },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ddd3ce] bg-white/76 px-4 py-2 text-sm text-[#5d5049]"
                    >
                      <item.icon className="h-4 w-4 text-[#643bda]" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...revealUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              >
                <div className="relative rounded-[2.4rem] border border-[#e9ddd7] bg-[#f5efea] p-6 shadow-[0_24px_56px_-44px_rgba(65,44,33,0.2)]">
                  <div className="ml-auto max-w-[28rem] rounded-[1.8rem] bg-white p-3 shadow-[0_24px_50px_-36px_rgba(83,59,45,0.22)]">
                    <div className="overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,#fff9f2_0%,#f1dfd4_100%)] p-4">
                      <Image
                        src="/assets/exact-ui/methna-conversation-screen.png"
                        alt="Methna conversation screen shown inside a soft editorial frame"
                        width={1290}
                        height={2796}
                        sizes="(max-width: 1024px) 58vw, 360px"
                        className="mx-auto h-auto w-full max-w-[16.5rem] rounded-[1.5rem] shadow-[0_26px_56px_-36px_rgba(64,41,27,0.3)]"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-5 left-6 right-10 rounded-[1.5rem] border border-[#efe4dd] bg-white/95 px-6 py-5 shadow-[0_24px_50px_-34px_rgba(83,59,45,0.18)] backdrop-blur-xl sm:left-auto sm:right-[5%] sm:w-[21rem]">
                    <p className="text-lg font-medium italic leading-8 text-[#b07b70] [font-family:var(--font-display)]">
                      &ldquo;Your story begins with a single, meaningful connection.&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="showcase" className="mx-auto mt-24 max-w-[1280px]">
            <motion.div
              {...revealUp}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              className="rounded-[2rem] border border-[#eaded9] bg-white px-6 py-10 shadow-[0_22px_54px_-42px_rgba(79,54,47,0.14)] sm:px-8 lg:px-12 lg:py-12"
            >
              <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
                <HeroExactUiCluster />
                <MockupStoryRail />
              </div>
            </motion.div>
          </section>

          <section id="process" className="mx-auto mt-24 max-w-[1200px]">
            <motion.div {...revealUp} className="text-center">
              <SectionPill>The process</SectionPill>
              <h2 className="mt-5 text-balance text-[2.7rem] font-semibold leading-[0.98] text-[#20160f] [font-family:var(--font-display)] sm:text-[3.4rem]">
                A clearer path from profile to serious connection.
              </h2>
            </motion.div>
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  {...revealUp}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                  className="rounded-[1.8rem] border border-[#e6dbd6] bg-white p-6 shadow-[0_18px_44px_-38px_rgba(76,53,42,0.16)]"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#b07065]">
                    Step {step.step}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#24180f] [font-family:var(--font-display)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#64564e]">{step.copy}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section
            id="trust"
            className="mx-auto mt-24 max-w-[1200px] rounded-[2.6rem] border border-[#eae0da] bg-[linear-gradient(180deg,#f9f5f0_0%,#fffdfa_100%)] px-6 py-14 shadow-[0_24px_56px_-46px_rgba(66,44,31,0.14)] sm:px-10"
          >
            <motion.div {...revealUp} className="text-center">
              <SectionPill>A foundation of trust</SectionPill>
              <h2 className="mt-5 text-balance text-[2.8rem] font-semibold leading-[0.98] text-[#21170f] [font-family:var(--font-display)] sm:text-[3.5rem]">
                Safety and privacy are part of the product, not an afterthought.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#665850]">
                Respectful design, verification workflows, moderation handling, and
                thoughtful privacy controls help Methna feel serious from the first click.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {trustCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...revealUp}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                  className="rounded-[1.8rem] border border-[#ebe1dc] bg-white p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7ece8] text-[#b07065]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-3xl font-semibold text-[#20160f] [font-family:var(--font-display)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#64564e]">{item.copy}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="membership" className="mx-auto mt-24 max-w-[1200px]">
            <motion.div
              {...revealUp}
              className="rounded-[2.5rem] border border-[#e6dbd6] bg-[linear-gradient(180deg,#faf6f2_0%,#ffffff_100%)] p-5 shadow-[0_24px_56px_-44px_rgba(75,53,42,0.16)] sm:p-6"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/80 lg:grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="bg-[linear-gradient(180deg,#b97867_0%,#c88977_100%)] px-7 py-8 text-white sm:px-10 sm:py-10">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/72">
                    Premium membership
                  </p>
                  <h2 className="mt-4 max-w-sm text-balance text-[2.5rem] font-semibold leading-[0.98] [font-family:var(--font-display)] sm:text-[3rem]">
                    Invest in a more intentional experience.
                  </h2>
                  <p className="mt-4 max-w-sm text-base leading-8 text-white/78">
                    Pricing is synced from the real admin-managed plan data. For web
                    checkout, we verify the email already registered in the app and
                    then open the backend Stripe flow for that account.
                  </p>

                  {plans.length > 1 ? (
                    <div className="mt-8 flex flex-wrap gap-2">
                      {plans.map((plan) => (
                        <button
                          key={plan.code}
                          type="button"
                          onClick={() => setSelectedPlanCode(plan.code)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                            activePlan?.code === plan.code
                              ? 'border-white/80 bg-white text-[#5b31d6]'
                              : 'border-white/25 bg-white/8 text-white/82'
                          }`}
                        >
                          {formatPlanName(plan)}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-10">
                    <p className="text-5xl font-semibold [font-family:var(--font-display)]">
                      {activePlan ? formatPlanPrice(activePlan) : 'Coming soon'}
                    </p>
                    <p className="mt-2 text-base text-white/78">
                      {activePlan ? formatPlanCycle(activePlan) : 'synced from your backend'}
                    </p>
                    <p className="mt-6 max-w-sm text-sm leading-7 text-white/72">
                      {activePlan?.description ||
                        'This plan is synced from your backend pricing so the website stays aligned with the app and admin panel.'}
                    </p>
                    <p className="mt-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/82">
                      {checkoutReady
                        ? 'Stripe web checkout ready'
                        : 'Awaiting Stripe web price from admin'}
                    </p>
                  </div>
                </div>

                <div className="bg-white px-7 py-8 sm:px-10 sm:py-10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#af7469]">
                        Membership benefits
                      </p>
                      <h3 className="mt-3 text-[2rem] font-semibold text-[#20160f] [font-family:var(--font-display)] sm:text-3xl">
                        Premium value without aggressive upselling.
                      </h3>
                    </div>
                    <Stars className="hidden h-10 w-10 text-[#b97867] sm:block" />
                  </div>

                  <div className="mt-8 grid gap-4">
                    {displayedFeatures.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-[1.3rem] border border-[#eee5e0] bg-[#fbf8f5] px-4 py-3"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7ece8] text-[#af7469]">
                          <BadgeCheck className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm leading-7 text-[#5d5049]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-[#ece1db] bg-[#fbf7f2] p-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#af7469]">
                      Existing account required
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#5d5049]">
                      Enter the same email already registered in the Methna app. We
                      check the account first, then open Stripe checkout or billing
                      management for that exact user.
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <input
                        type="email"
                        aria-label="Methna account email"
                        value={accountEmail}
                        onChange={(event) => {
                          setAccountEmail(event.target.value)
                          setCheckedAccount(null)
                          setCheckedSubscription(null)
                          setCheckedEmail('')
                          setCheckoutError(null)
                          setCheckoutNotice(null)
                        }}
                        placeholder="Enter your Methna account email"
                        className="h-12 flex-1 rounded-full border border-[#ddcfc5] bg-white px-5 text-sm text-[#24180f] outline-none transition focus:border-[#b97867] focus:ring-2 focus:ring-[#efd7cf]"
                      />
                      <button
                        type="button"
                        onClick={handleEmailCheck}
                        disabled={emailCheckLoading}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-[#ddcfc5] bg-white px-5 text-sm font-semibold text-[#8f625c] hover:border-[#cdb8ad] disabled:cursor-wait disabled:opacity-70"
                      >
                        {emailCheckLoading ? 'Checking...' : 'Check account'}
                      </button>
                    </div>

                    {accountStatusMessage ? (
                      <p
                        className={`mt-4 rounded-[1rem] border px-4 py-3 text-sm ${accountStatusClassName}`}
                      >
                        {accountStatusMessage}
                      </p>
                    ) : null}

                    {subscriberHasPremium ? (
                      <div className="mt-4 rounded-[1rem] border border-[#fde6b6] bg-[#fffaf0] px-4 py-4 text-sm text-[#6d5120]">
                        <p className="font-semibold text-[#6a3e0f]">
                          Current premium plan: {subscriberPlanLabel}
                        </p>
                        <p className="mt-2 leading-7">
                          {subscriberStatusLabel
                            ? `Subscription status: ${subscriberStatusLabel}.`
                            : 'Subscription status is active on this email.'}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {checkoutNotice ? (
                    <p className="mt-5 rounded-[1rem] border border-[#d9f2df] bg-[#f3fff6] px-4 py-3 text-sm text-[#24603b]">
                      {checkoutNotice}
                    </p>
                  ) : null}

                  {checkoutError ? (
                    <p className="mt-5 rounded-[1rem] border border-[#eadbff] bg-[#f6f0ff] px-4 py-3 text-sm text-[#5b31d6]">
                      {checkoutError}
                    </p>
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton
                      onClick={handlePlanCheckout}
                      loading={checkoutLoading === activePlan?.code}
                    >
                      {primaryButtonLabel}
                    </PrimaryButton>
                    <GhostButton href="#support">Talk to support</GhostButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="mx-auto mt-24 max-w-[980px] text-center">
            <motion.div
              {...revealUp}
              className="rounded-[2.5rem] border border-[#e9ddd8] bg-white px-8 py-12 shadow-[0_20px_48px_-42px_rgba(70,48,37,0.16)] sm:px-14"
            >
              <div className="mx-auto flex w-max items-center gap-2 rounded-full border border-[#e2d8d3] bg-[#fbf8f5] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#af7469]">
                <Sparkles className="h-3.5 w-3.5" />
                Community reassurance
              </div>
              <p className="mt-8 text-balance text-[2.7rem] font-medium italic leading-[1.24] text-[#302117] [font-family:var(--font-display)] sm:text-[3.4rem]">
                &ldquo;Finding someone who shared my commitment to faith and family felt
                impossible until I found Methna. It felt calm, serious, and genuinely
                respectful.&rdquo;
              </p>
              <p className="mt-8 text-lg font-semibold text-[#24180f]">Amina & Yusuf</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#8f7f76]">
                Illustrative testimonial for launch storytelling
              </p>
            </motion.div>
          </section>

          <section className="mx-auto mt-24 max-w-[1200px]">
            <motion.div
              {...revealUp}
              className="rounded-[2.5rem] border border-[#e4d9d4] bg-[linear-gradient(135deg,#f8efe9_0%,#ffffff_54%,#f5ede7_100%)] px-8 py-12 shadow-[0_22px_52px_-44px_rgba(62,39,35,0.16)] sm:px-12"
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <SectionPill>Final invitation</SectionPill>
                  <h2 className="mt-5 max-w-2xl text-balance text-[2.7rem] font-semibold leading-[0.98] text-[#1f150f] [font-family:var(--font-display)] sm:text-[3.3rem]">
                    Start your journey with more intention, more trust, and more
                    clarity.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64564d]">
                    Join Methna to explore verified Muslim matchmaking built for serious
                    relationships, modern expectations, and respectful design.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <PrimaryButton onClick={() => setStoreModalOpen(true)}>
                    Join Methna
                  </PrimaryButton>
                  <GhostButton href="/contact">Contact Us</GhostButton>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer id="support" className="px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px] rounded-[2.2rem] border border-[#e8ddd7] bg-white/92 px-7 py-10 shadow-[0_18px_44px_-38px_rgba(70,49,38,0.16)] sm:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr_0.92fr_0.92fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#eadfdb] bg-[#f7f2ed]">
                    <Image
                      src="/assets/methna-mark.png"
                      alt="Methna mark"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                  <span className="text-[1.7rem] font-semibold leading-none text-[#b06f64] [font-family:var(--font-display)]">
                    Methna
                  </span>
                </div>
                <p className="mt-5 max-w-xs text-base leading-8 text-[#61534b]">
                  Building stronger Muslim families through intentional, faith-aware, and
                  respectful connections.
                </p>
                <div className="mt-5 flex items-center gap-3 text-sm text-[#6a5b52]">
                  <a href="mailto:support@methna.app" className="hover:text-[#4f30b7]">
                    support@methna.app
                  </a>
                  <span className="text-[#d4c7c1]">&bull;</span>
                  <a href="#top" className="hover:text-[#4f30b7]">
                    Back to top
                  </a>
                </div>
              </div>

              {footerGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b7a71]">
                    {group.title}
                  </p>
                  <div className="mt-5 grid gap-3">
                    {group.links.map((link) => (
                      <FooterLink
                        key={link.href}
                        href={link.href}
                        external={link.external}
                      >
                        {link.label}
                      </FooterLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-[#efe6e0] pt-6 text-sm text-[#7f7068] sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; 2026 Methna. Designed for a respectful Muslim matchmaking journey.</p>
              <p>Styled to match the approved client direction with live backend commerce support.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

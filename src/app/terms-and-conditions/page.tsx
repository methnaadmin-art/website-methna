import type { Metadata } from 'next'
import { SecondaryPageShell } from '@/components/site/secondary-page-shell'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Methna',
  description: 'Read the Methna terms and conditions for use of the platform.',
}

const sections = [
  {
    title: 'Use of the Platform',
    body: 'Methna is intended for respectful Muslim matchmaking and serious relationship intent. Users are expected to engage honestly, respectfully, and in line with platform guidelines.',
  },
  {
    title: 'Accounts and Verification',
    body: 'Users may be asked to complete verification steps or provide documents where relevant. Methna may suspend, limit, or remove accounts that violate trust, safety, or moderation policies.',
  },
  {
    title: 'Premium Membership',
    body: 'Subscription plans, premium features, and billing terms may change over time. The website can display live plans from the backend, but final access and billing are governed by the active product configuration.',
  },
  {
    title: 'Community Conduct',
    body: 'Harassment, impersonation, abuse, or misuse of privacy-sensitive features may result in moderation action, including warnings, limitations, or account removal.',
  },
  {
    title: 'Contact',
    body: 'For legal or account questions, contact support@methna.app.',
  },
]

export default function TermsAndConditionsPage() {
  return (
    <SecondaryPageShell
      eyebrow="Terms & Conditions"
      title="Platform terms for a serious, respectful matchmaking experience."
      intro="This page gives you a polished legal-style structure now, while keeping the content easy to replace with your final approved terms later."
    >
      <div className="grid gap-5">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[1.6rem] border border-[#e9ddd7] bg-[#fcfaf8] p-6"
          >
            <h2 className="text-2xl font-semibold text-[#20160f] [font-family:var(--font-display)]">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-8 text-[#64564e]">{section.body}</p>
          </section>
        ))}
      </div>
    </SecondaryPageShell>
  )
}

import type { Metadata } from 'next'
import { SecondaryPageShell } from '@/components/site/secondary-page-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy | Methna',
  description: 'Read the Methna privacy policy and data-handling principles.',
}

const sections = [
  {
    title: 'Information We Collect',
    body: 'Methna may collect profile details, account verification details, subscription information, and support communications needed to operate a respectful Muslim matchmaking platform.',
  },
  {
    title: 'How We Use Information',
    body: 'We use collected information to provide matching, improve trust and moderation systems, manage subscriptions, protect accounts, and communicate important service updates.',
  },
  {
    title: 'Privacy and Visibility Controls',
    body: 'Methna is designed with privacy-aware controls so users can manage profile visibility, communication boundaries, and account settings in a way that feels safe and intentional.',
  },
  {
    title: 'Security and Verification',
    body: 'Verification flows, moderation handling, and account safety measures are used to help protect the integrity of the platform and reduce misuse.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions, contact support@methna.app.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <SecondaryPageShell
      eyebrow="Privacy Policy"
      title="How Methna approaches privacy, trust, and account protection."
      intro="This page is a clean policy-style overview for the website. You can replace the text with your final legal copy whenever your legal team or advisor is ready."
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

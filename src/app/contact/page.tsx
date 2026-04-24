import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/contact-form'
import { SecondaryPageShell } from '@/components/site/secondary-page-shell'

export const metadata: Metadata = {
  title: 'Contact Us | Methna',
  description: 'Contact the Methna team for support, partnerships, and product questions.',
}

export default function ContactPage() {
  return (
    <SecondaryPageShell
      eyebrow="Contact Us"
      title="Support that feels calm, clear, and respectful."
      intro="Reach the Methna team for launch support, partnership questions, or help with the platform. We usually recommend including your city or country and the issue you are facing so we can respond faster."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.8rem] border border-[#e9ddd7] bg-[#faf6f2] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7a4ef8]">
            Support details
          </p>
          <div className="mt-5 grid gap-4 text-base leading-8 text-[#64564e]">
            <p>
              Email:{' '}
              <a href="mailto:support@methna.app" className="font-semibold text-[#4f30b7]">
                support@methna.app
              </a>
            </p>
            <p>Response window: Usually within 1 to 2 business days.</p>
            <p>
              Best for: Account issues, subscription questions, verification support,
              partnerships, and launch inquiries.
            </p>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-[#ebe1db] bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7a71]">
              FAQ teaser
            </p>
            <p className="mt-3 text-base leading-7 text-[#64564e]">
              Need help with privacy controls, account verification, or premium
              membership? Mention it in your message and we will guide you to the
              fastest resolution.
            </p>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[#e9ddd7] bg-white p-6">
          <ContactForm />
        </div>
      </div>
    </SecondaryPageShell>
  )
}

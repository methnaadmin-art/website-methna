import { LandingPage } from '@/components/landing/landing-page'
import { getMarketingPlans } from '@/lib/marketing-api'

export default async function HomePage() {
  const plans = await getMarketingPlans()

  return <LandingPage plans={plans} />
}

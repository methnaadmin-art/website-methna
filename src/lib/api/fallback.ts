import type { PremiumPlan } from "@/lib/api/types";

export const fallbackPlans: PremiumPlan[] = [
  {
    code: "premium",
    name: "Premium",
    description: "Unlock your full daily match velocity and premium visibility.",
    price: 14.99,
    currency: "USD",
    interval: "month",
    badge: "Most Popular",
    recommended: true,
    features: [
      "See who liked you",
      "Ghost mode",
      "Passport mode",
      "Priority likes",
      "Weekly boosts",
      "Premium badge",
    ],
    limits: {
      dailyLikes: -1,
      weeklyBoosts: 1,
      monthlyRewinds: 5,
      compliments: 20,
    },
  },
  {
    code: "gold",
    name: "Gold",
    description: "Maximum control, elite discoverability, and full premium stack.",
    price: 24.99,
    currency: "USD",
    interval: "month",
    badge: "Elite",
    recommended: false,
    features: [
      "Everything in Premium",
      "Profile boost priority",
      "Unlimited rewinds",
      "Unlimited compliments",
      "Advanced filters",
      "Priority support lane",
    ],
    limits: {
      dailyLikes: -1,
      weeklyBoosts: 3,
      monthlyRewinds: -1,
      compliments: -1,
    },
  },
];

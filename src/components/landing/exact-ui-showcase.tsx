'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type ExactUiScreen = {
  src: string
  alt: string
}

const heroScreens: ExactUiScreen[] = [
  {
    src: '/assets/exact-ui/methna-users-screen.png',
    alt: 'Methna users screen showing likes, passes, and matches in a premium card grid.',
  },
  {
    src: '/assets/exact-ui/methna-profile-screen.png',
    alt: 'Methna profile screen showing a polished profile overview and premium controls.',
  },
]

const showcaseLines = ['The app that', 'guides Muslims', 'with clarity.']

const showcasePoints = [
  {
    index: '01',
    title: 'Discovery with calm structure',
    copy: 'The new grid-style users screen keeps likes, passes, and matches in one softer premium flow.',
  },
  {
    index: '02',
    title: 'Profiles with stronger identity',
    copy: 'The profile mockup adds a clearer sense of verification, completion, and premium presence.',
  },
]

function MockupPhone({
  screen,
  rotate,
  className,
  priority = false,
  delay = 0,
}: {
  screen: ExactUiScreen
  rotate: number
  className: string
  priority?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.35 }}
      animate={{ y: [0, -10, 0], rotate: [rotate, rotate - 1.2, rotate] }}
      transition={{
        opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
        y: { duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay },
        rotate: { duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      style={{ rotate }}
    >
      <div className="rounded-[2.3rem] bg-white p-2.5 shadow-[0_38px_90px_-40px_rgba(67,51,40,0.28)]">
        <div className="overflow-hidden rounded-[1.8rem] border border-[#ece2db] bg-[#fbf8f4]">
          <Image
            src={screen.src}
            alt={screen.alt}
            width={1290}
            height={2796}
            priority={priority}
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 260px"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroExactUiCluster() {
  const [usersScreen, profileScreen] = heroScreens

  return (
    <div className="relative mx-auto min-h-[22rem] w-full max-w-[30rem] sm:min-h-[28rem] lg:min-h-[34rem]">
      <div className="pointer-events-none absolute left-[6%] top-[14%] h-40 w-40 rounded-full bg-[#ebe3ff] blur-[88px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[12%] h-44 w-44 rounded-full bg-[#ffdfe3] blur-[96px]" />
      <div className="pointer-events-none absolute inset-x-[14%] bottom-[5%] h-10 rounded-full bg-[radial-gradient(circle,rgba(38,28,22,0.22),transparent_68%)] blur-2xl" />

      <MockupPhone
        screen={usersScreen}
        rotate={-11}
        delay={0.08}
        priority
        className="absolute left-[4%] top-[12%] z-10 w-[11.3rem] sm:w-[13rem] lg:w-[15.2rem]"
      />

      <MockupPhone
        screen={profileScreen}
        rotate={7}
        delay={0.22}
        priority
        className="absolute right-[6%] top-[2%] z-20 w-[11.3rem] sm:w-[13rem] lg:w-[15.2rem]"
      />
    </div>
  )
}

export function MockupStoryRail() {
  return (
    <div className="flex h-full flex-col justify-center">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#c96d7d]"
      >
        Premium app showcase
      </motion.p>

      <div className="mt-5 space-y-1.5">
        {showcaseLines.map((line, index) => (
          <motion.span
            key={line}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05 + index * 0.06,
            }}
            className="block text-balance text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.06em] text-[#13100d] sm:text-[4rem] lg:text-[5.2rem]"
          >
            {line}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        className="mt-6 max-w-xl text-base leading-8 text-[#5e5148] sm:text-lg"
      >
        The real Methna mobile experience now uses your latest mockups, with a cleaner
        mix of discovery, profile depth, and respectful presentation.
      </motion.p>

      <div className="mt-8 space-y-5">
        {showcasePoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.22 + index * 0.08,
            }}
            className="flex items-start gap-4"
          >
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ffd0dc] bg-[#fff2f6] text-sm font-semibold tracking-[0.16em] text-[#ff4f7d]">
              {point.index}
            </span>
            <div>
              <p className="text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#ff4f7d] sm:text-[2.1rem]">
                {point.title}
              </p>
              <p className="mt-1 text-base leading-7 text-[#6a5d55]">{point.copy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function SecondaryPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f7f1eb] px-4 py-4 text-[#24180f] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <header className="rounded-full border border-[#e8ddd7] bg-white/84 px-5 py-3 shadow-[0_20px_50px_-42px_rgba(73,51,39,0.24)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#eadfdb] bg-[#f8f2ed]">
                <Image
                  src="/assets/methna-mark.png"
                  alt="Methna logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="text-[1.7rem] font-semibold leading-none text-[#7a4ef8] [font-family:var(--font-display)]">
                Methna
              </span>
            </Link>
            <div className="flex items-center gap-5 text-sm font-semibold text-[#67594f]">
              <Link href="/" className="hover:text-[#4f30b7]">
                Home
              </Link>
              <Link href="/contact" className="hover:text-[#4f30b7]">
                Contact
              </Link>
            </div>
          </div>
        </header>

        <main className="mt-8 rounded-[2.3rem] border border-[#e8ddd7] bg-white/82 px-6 py-10 shadow-[0_30px_70px_-54px_rgba(70,48,38,0.22)] sm:px-10 sm:py-12">
          <span className="inline-flex rounded-full border border-[#ddd2cc] bg-[#faf5f1] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#6f49df]">
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-[3.2rem] font-semibold leading-[0.98] text-[#20160f] [font-family:var(--font-display)] sm:text-[4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#665850]">{intro}</p>
          <div className="mt-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

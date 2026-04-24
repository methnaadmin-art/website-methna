'use client'

import { useState } from 'react'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const mailto = new URL('mailto:support@methna.app')
    mailto.searchParams.set('subject', subject || 'Methna website inquiry')
    mailto.searchParams.set('body', `Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = mailto.toString()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[#3a2b22]">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[1.1rem] border border-[#e7ddd7] bg-[#fcfaf8] px-4 py-3 text-base outline-none ring-0 transition-colors focus:border-[#bca7ff]"
            placeholder="Your name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#3a2b22]">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[1.1rem] border border-[#e7ddd7] bg-[#fcfaf8] px-4 py-3 text-base outline-none ring-0 transition-colors focus:border-[#bca7ff]"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-[#3a2b22]">
        Subject
        <input
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="rounded-[1.1rem] border border-[#e7ddd7] bg-[#fcfaf8] px-4 py-3 text-base outline-none ring-0 transition-colors focus:border-[#bca7ff]"
          placeholder="How can we help?"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-[#3a2b22]">
        Message
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-40 rounded-[1.1rem] border border-[#e7ddd7] bg-[#fcfaf8] px-4 py-3 text-base outline-none ring-0 transition-colors focus:border-[#bca7ff]"
          placeholder="Tell us what you need support with."
          required
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-fit rounded-full bg-[linear-gradient(135deg,#5b31d6_0%,#7c4dff_48%,#a267ff_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-26px_rgba(91,49,214,0.55)]"
      >
        Send via Email
      </button>
    </form>
  )
}

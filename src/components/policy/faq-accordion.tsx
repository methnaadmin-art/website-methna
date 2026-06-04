"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const fallbackFaqs: FaqItem[] = [
  {
    id: "intent",
    category: "Getting Started",
    question: "Is Methna for casual dating?",
    answer:
      "No. Methna is built for serious, marriage-minded users who want intentional matchmaking.",
  },
  {
    id: "privacy",
    category: "Privacy & Safety",
    question: "How does Methna protect user privacy?",
    answer:
      "Methna includes profile visibility controls, moderation support, and privacy-aware profile design including locked photo access rules.",
  },
  {
    id: "premium-value",
    category: "Premium",
    question: "What do I get with Premium?",
    answer:
      "Premium adds practical advantages like seeing who liked you, profile boosts, ghost mode, passport mode, and stronger discovery reach.",
  },
  {
    id: "verification",
    category: "Privacy & Safety",
    question: "Is there verification and moderation?",
    answer:
      "Yes. Verification and moderation pathways are part of Methna's trust and safety model.",
  },
];

export function FaqAccordion() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(fallbackFaqs);
        }
      })
      .catch(() => setError("Unable to load FAQs."))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(faqs.map((f) => f.category).filter(Boolean))];

  return (
    <section className="section-wrap py-14 md:py-20">
      <article className="premium-panel px-6 py-8 md:px-10 md:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          FAQ
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Answers, without the noise
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          Get clear guidance on premium, privacy, trust, and account support.
        </p>

        {loading && (
          <p className="mt-8 text-sm text-muted">Loading FAQs...</p>
        )}

        {error && (
          <p className="mt-8 text-sm text-danger">{error}</p>
        )}

        {!loading && !error && faqs.length === 0 && (
          <p className="mt-8 text-sm text-muted">
            No FAQs are available right now. Please check back later or{" "}
            <a href="/contact" className="text-accent-strong underline">
              contact support
            </a>
            .
          </p>
        )}

        {!loading &&
          !error &&
          categories.map((cat) => (
            <div key={cat} className="mt-10">
              <h2 className="text-lg font-semibold text-foreground">{cat}</h2>
              <div className="mt-4 space-y-3">
                {faqs
                  .filter((f) => f.category === cat)
                  .map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-border/60 bg-white/60 transition-colors"
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left subtle-focus-ring"
                        >
                          <span className="text-[15px] font-medium text-foreground">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-sm leading-relaxed text-foreground/80">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

        {!loading && !error && categories.length === 0 && faqs.length > 0 && (
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-border/60 bg-white/60 transition-colors"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left subtle-focus-ring"
                  >
                    <span className="text-[15px] font-medium text-foreground">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm leading-relaxed text-foreground/80">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error ? (
          <div className="mt-9 rounded-2xl border border-border/70 bg-white/80 p-4 text-sm text-muted md:flex md:items-center md:justify-between">
            <p>
              Need help with a specific billing or account issue?
            </p>
            <a
              href="/contact"
              className="mt-2 inline-flex text-sm font-semibold text-accent-strong underline md:mt-0"
            >
              Contact support
            </a>
          </div>
        ) : null}
      </article>
    </section>
  );
}

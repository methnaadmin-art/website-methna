"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function FaqAccordion() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFaqs(data);
        } else {
          setFaqs([]);
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
          Help
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          Find answers to common questions about Methna.
        </p>

        {loading && (
          <p className="mt-8 text-sm text-muted">Loading FAQs...</p>
        )}

        {error && (
          <p className="mt-8 text-sm text-danger">{error}</p>
        )}

        {!loading && !error && faqs.length === 0 && (
          <p className="mt-8 text-sm text-muted">
            No FAQs available yet. Please check back later or{" "}
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
      </article>
    </section>
  );
}

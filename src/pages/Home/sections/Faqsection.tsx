import React, { useEffect, useRef, useState } from "react";

/**
 * "Frequently Asked Questions" — support/FAQ section with a working
 * accordion on the right and contact CTAs on the left. Same reveal +
 * styling conventions as the other sections in this set.
 */

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking 6–8 weeks ahead for domestic trips and 3–4 months ahead for international travel, especially during peak season, to lock in the best fares and availability.",
  },
  {
    question: "What's included in the holiday packages?",
    answer:
      "Most packages include accommodation, daily breakfast, airport transfers, and a curated itinerary. Flights, meals beyond breakfast, and optional excursions are listed separately at checkout.",
  },
  {
    question: "Can I customize a package to my preferences?",
    answer:
      "Yes — every package can be tailored. Swap hotels, add extra nights, adjust the itinerary, or build a fully custom trip with one of our travel experts.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Cancellations made 30+ days before departure receive a full refund minus a small processing fee. Refund terms closer to departure vary by supplier and are shown before you book.",
  },
  {
    question: "Do you offer travel insurance?",
    answer:
      "Yes, optional travel insurance covering trip cancellation, medical emergencies, and lost baggage can be added during checkout for a small additional cost.",
  },
  {
    question: "Is there support available during my trip?",
    answer:
      "Our support team is reachable 24/7 by chat and email throughout your trip, and Platinum members get a dedicated concierge line for urgent needs.",
  },
];

const ChatIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const ChevronDown: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const FAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-8 lg:px-16"
      style={{ backgroundColor: "#F0EDE8" }}
    >
      <style>{`
        @keyframes faqLineGrow { to { width: 24px; } }
        @keyframes faqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqSlideRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes faqAnswerIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .faq-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: faqLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .faq-fade-up { opacity: 0; }
        .faq-fade-up.is-visible { animation: faqFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .faq-row { opacity: 0; }
        .faq-row.is-visible { animation: faqSlideRight 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .faq-answer { animation: faqAnswerIn 0.25s ease-out; }

        .faq-chevron { transition: transform 0.3s ease; }
        .faq-chevron.is-open { transform: rotate(180deg); }

        .faq-item {
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .faq-item:hover { box-shadow: 0 8px 22px -12px rgba(27,42,74,0.18); }
        .faq-item.is-open { border-color: rgba(201,151,74,0.35); }

        .faq-btn-primary { transition: transform 0.2s ease, background-color 0.2s ease; }
        .faq-btn-primary:hover { transform: translateY(-2px); background-color: #24345E; }
        .faq-btn-secondary { transition: background-color 0.2s ease, border-color 0.2s ease; }
        .faq-btn-secondary:hover { background-color: rgba(27,42,74,0.04); border-color: #1B2A4A; }

        @media (prefers-reduced-motion: reduce) {
          .faq-fade-up, .faq-row { opacity: 1; animation: none !important; }
        }
      `}</style>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left: heading + CTAs */}
        <div>
          <p
            className={`faq-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
            style={{ animationDelay: "0s", color: "#C9974A" }}
          >
            <span className="faq-eyebrow-line" />
            Need Help?
          </p>

          <h2
            className={`faq-fade-up ${isVisible ? "is-visible" : ""} mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl`}
            style={{ animationDelay: "0.08s", color: "#1B2A4A" }}
          >
            Frequently Asked Questions
          </h2>

          <p
            className={`faq-fade-up ${isVisible ? "is-visible" : ""} mt-4 max-w-xs text-sm leading-relaxed`}
            style={{ animationDelay: "0.14s", color: "#5B6472" }}
          >
            Can't find what you're looking for? Our travel experts are available around the clock.
          </p>

          <div
            className={`faq-fade-up ${isVisible ? "is-visible" : ""} mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col`}
            style={{ animationDelay: "0.2s" }}
          >
            <button
              className="faq-btn-primary flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: "#1B2A4A" }}
            >
              <ChatIcon />
              Chat With Us
            </button>
            <button
              className="faq-btn-secondary flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
              style={{ borderColor: "#D8D2C6", color: "#1B2A4A" }}
            >
              <MailIcon />
              Email Support
            </button>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className={`faq-row ${isVisible ? "is-visible" : ""} faq-item ${isOpen ? "is-open" : ""} rounded-xl border bg-white`}
                style={{ animationDelay: `${0.1 + i * 0.07}s`, borderColor: "rgba(27,42,74,0.08)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold" style={{ color: "#1B2A4A" }}>
                    {faq.question}
                  </span>
                  <span className={`faq-chevron ${isOpen ? "is-open" : ""}`} style={{ color: "#8A93A3" }}>
                    <ChevronDown />
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer px-5 pb-4">
                    <p className="text-xs leading-relaxed" style={{ color: "#5B6472" }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
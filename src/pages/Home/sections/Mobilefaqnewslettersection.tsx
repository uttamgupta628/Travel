import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const AppleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M16.4 1.5c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-2.9.8-.9 2-1.5 3-1.5ZM20 17.2c-.5 1.2-.8 1.7-1.5 2.7-1 1.5-2.3 3.3-4 3.3-1.5 0-1.9-1-3.9-1s-2.5 1-4 1c-1.7 0-3-1.7-4-3.1C.7 17.4-.6 12.7 1 9.5c.8-1.6 2.2-2.6 3.7-2.6 1.5 0 2.4 1 3.7 1s2.4-1.1 4-1.1c1.3 0 2.7.7 3.7 1.9-3.3 1.8-2.7 6.5.9 7.5-.3.7-.5 1.4-1 2Z" />
  </svg>
);
const PlayIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M4 2.8c0-.7.8-1.2 1.5-.8l14 9.2c.6.4.6 1.2 0 1.6l-14 9.2c-.7.4-1.5-.1-1.5-.8V2.8Z" />
  </svg>
);
const ChevronIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const SendIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
  </svg>
);
const SparkleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.5c.5 3.4 2.7 5.6 6.1 6.1-3.4.5-5.6 2.7-6.1 6.1-.5-3.4-2.7-5.6-6.1-6.1 3.4-.5 5.6-2.7 6.1-6.1Z" />
  </svg>
);
const MapIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="m9 5-6 2v13l6-2 6 2 6-2V5l-6 2-6-2Z" />
    <path d="M9 5v13M15 7v13" />
  </svg>
);
const BellIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const APP_FEATURES = ["AI Assistant", "Offline Maps", "Offer Tracking", "Instant Booking"];

const FAQS = [
  {
    q: "How does Price Drop Protection work?",
    a: "Once you book, we keep tracking the fare on your route. If the price drops before departure, we automatically refund you the difference — no forms, no waiting on hold.",
  },
  {
    q: "Can I change or cancel my booking?",
    a: "Yes. Most bookings can be changed or cancelled free of charge within our flex window. Refunds for eligible cancellations land back in your account within 2 hours.",
  },
  {
    q: "What is Traveleo Premium Membership?",
    a: "Premium is our paid membership for frequent travelers — it includes lounge access, zero forex markup, 2x TravelPoints, priority support, and member-only rates, starting at ₹999/year.",
  },
  {
    q: "How does the AI Trip Planner work?",
    a: "Just describe your trip in plain language — budget, dates, vibe — and our AI builds a complete itinerary with flights, stays, and activities in seconds, which you can tweak before booking.",
  },
  {
    q: "Are payments secure?",
    a: "Yes. Every transaction is protected with bank-grade encryption and 3D Secure authentication, and we never store your full card details on our servers.",
  },
];

/* -------------------------------- Component ------------------------------- */

const MobileFaqNewsletterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${y * -10}deg`);
    el.style.setProperty("--ry", `${x * 12}deg`);
  };
  const resetPhone = () => {
    const el = phoneRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  const handleNewsletterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = newsletterRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes mfnFadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mfnBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes mfnPhoneFloat {
          0%, 100% { transform: translateY(0) rotateX(var(--rx)) rotateY(var(--ry)); }
          50% { transform: translateY(-10px) rotateX(var(--rx)) rotateY(var(--ry)); }
        }
        @keyframes mfnSparkleSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes mfnCheckPop {
          0% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        .mfn-fade-up { opacity: 0; }
        .mfn-fade-up.is-visible { animation: mfnFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .mfn-blob { animation: mfnBlobFloat 10s ease-in-out infinite; }

        /* ---- App promo ---- */
        .mfn-app-card {
          position: relative;
          overflow: hidden;
        }
        .mfn-app-glow {
          animation: mfnBlobFloat 8s ease-in-out infinite;
        }

        .mfn-phone-outer {
          perspective: 900px;
        }
        .mfn-phone {
          --rx: 0deg;
          --ry: 0deg;
          transform-style: preserve-3d;
          transition: transform 0.25s ease-out;
          animation: mfnPhoneFloat 5s ease-in-out infinite;
        }

        .mfn-store-btn {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .mfn-store-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(0,0,0,0.5);
        }
        .mfn-store-btn:active { transform: translateY(0) scale(0.97); }

        .mfn-tag {
          transition: border-color 0.25s ease, color 0.25s ease;
        }

        /* ---- FAQ ---- */
        .mfn-faq-item {
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .mfn-faq-item.is-open {
          border-color: rgba(168,85,247,0.3);
          background: rgba(255,255,255,0.03);
        }
        .mfn-faq-chevron {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .mfn-faq-item.is-open .mfn-faq-chevron {
          transform: rotate(180deg);
        }
        .mfn-faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .mfn-faq-answer-wrap.is-open {
          grid-template-rows: 1fr;
        }
        .mfn-faq-answer-inner {
          overflow: hidden;
        }

        /* ---- Newsletter ---- */
        .mfn-newsletter-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          overflow: hidden;
        }
        .mfn-newsletter-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(360px circle at var(--mx) var(--my), rgba(168,85,247,0.16), transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .mfn-newsletter-card:hover::before { opacity: 1; }

        .mfn-sparkle {
          animation: mfnSparkleSpin 6s linear infinite;
        }

        .mfn-email-input {
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .mfn-email-input.is-focused {
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 0 0 4px rgba(168,85,247,0.12);
        }

        .mfn-subscribe-btn {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .mfn-subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(168,85,247,0.55);
        }
        .mfn-subscribe-btn:active { transform: translateY(0) scale(0.96); }

        .mfn-check-pop {
          animation: mfnCheckPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        @media (prefers-reduced-motion: reduce) {
          .mfn-fade-up { opacity: 1; animation: none !important; }
          .mfn-blob, .mfn-app-glow, .mfn-phone, .mfn-sparkle { animation: none; }
          .mfn-store-btn:hover, .mfn-subscribe-btn:hover { transform: none; }
          .mfn-check-pop { animation: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="mfn-blob pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />
      <div aria-hidden className="mfn-blob pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[110px]" style={{ animationDelay: "3.5s" }} />

      <div className="relative mx-auto max-w-5xl">
        {/* ---------------------------- App promo card ---------------------------- */}
        <div
          className={`mfn-fade-up mfn-app-card ${isVisible ? "is-visible" : ""} grid grid-cols-1 items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent px-6 py-10 sm:px-10 md:grid-cols-2`}
          style={{ animationDelay: "0s" }}
        >
          <div aria-hidden className="mfn-app-glow pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[90px]" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80">
              iOS &amp; Android
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Your trips,
              <br />
              in your pocket
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
              Book flights, track price drops, and chat with your AI trip planner — all synced
              instantly across your phone and desktop.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {APP_FEATURES.map((feature) => (
                <span
                  key={feature}
                  className="mfn-tag rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/45"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="mfn-store-btn flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2.5 text-sm font-semibold text-black"
              >
                <AppleIcon />
                App Store
              </button>
              <button
                type="button"
                className="mfn-store-btn flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <PlayIcon />
                Google Play
              </button>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative mx-auto w-full max-w-[220px] md:mx-0 md:ml-auto">
            <div className="mfn-phone-outer">
              <div
                ref={phoneRef}
                onMouseMove={handlePhoneMouseMove}
                onMouseLeave={resetPhone}
                className="mfn-phone relative aspect-[9/18.5] w-full rounded-[2.2rem] border-4 border-white/10 bg-gradient-to-b from-[#1a1030] to-[#0c0818] p-2 shadow-2xl shadow-purple-950/40"
              >
                <div className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60" />
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[1.6rem] bg-gradient-to-b from-purple-950/40 to-black/40 px-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-900/50">
                    <SparkleIcon />
                  </span>
                  <p className="text-xs font-bold text-white">Traveleo</p>
                  <div className="mt-2 flex w-full items-center justify-around border-t border-white/10 pt-3">
                    <MapIcon />
                    <BellIcon />
                    <span className="h-3.5 w-3.5 rounded-full bg-fuchsia-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------- FAQ ------------------------------- */}
        <div className="mt-24">
          <div className="mx-auto max-w-xl text-center">
            <p
              className={`mfn-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
              style={{ animationDelay: "0.1s" }}
            >
              Support
            </p>
            <h2
              className={`mfn-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
              style={{ animationDelay: "0.16s" }}
            >
              Frequently Asked
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className={`mfn-fade-up mfn-faq-item ${isVisible ? "is-visible" : ""} ${
                    isOpen ? "is-open" : ""
                  } overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]`}
                  style={{ animationDelay: `${0.2 + i * 0.06}s` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-white">{faq.q}</span>
                    <span className="mfn-faq-chevron text-white/50">
                      <ChevronIcon />
                    </span>
                  </button>
                  <div className={`mfn-faq-answer-wrap ${isOpen ? "is-open" : ""}`}>
                    <div className="mfn-faq-answer-inner">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-white/45">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --------------------------- Newsletter --------------------------- */}
        <div
          ref={newsletterRef}
          onMouseMove={handleNewsletterMouseMove}
          className={`mfn-fade-up mfn-newsletter-card ${isVisible ? "is-visible" : ""} mx-auto mt-24 max-w-xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent px-6 py-12 text-center sm:px-10`}
          style={{ animationDelay: "0.55s" }}
        >
          <span className="mfn-sparkle relative mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white">
            <SparkleIcon />
          </span>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80">
            Stay In The Loop
          </p>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Travel Inspiration,
            <br />
            every week
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/45">
            Fresh destination ideas, price-drop alerts, and members-only offers — straight to your
            inbox, once a week.
          </p>

          {subscribed ? (
            <div className="mfn-check-pop mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300">
              You're subscribed! Welcome aboard.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Your email address"
                className={`mfn-email-input flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none ${
                  isFocused ? "is-focused" : ""
                }`}
              />
              <button
                type="submit"
                className="mfn-subscribe-btn flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <SendIcon />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileFaqNewsletterSection;
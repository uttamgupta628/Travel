import React, { useEffect, useRef, useState } from "react";

/**
 * "Get Travel Deals in Your Inbox" — newsletter signup band.
 * Warm cream-to-peach gradient card, centered content, same reveal
 * convention as the rest of the set.
 */

const SendIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const NewsletterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="px-4 py-16 sm:px-8 lg:px-16" style={{ backgroundColor: "#FFFFFF" }}>
      <style>{`
        @keyframes nwlFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nwlIconPop {
          from { opacity: 0; transform: translateY(10px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .nwl-fade-up { opacity: 0; }
        .nwl-fade-up.is-visible { animation: nwlFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .nwl-icon { opacity: 0; }
        .nwl-icon.is-visible { animation: nwlIconPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

        .nwl-input:focus { outline: none; border-color: #D9A441; box-shadow: 0 0 0 3px rgba(217,164,65,0.15); }

        .nwl-submit { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .nwl-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 22px -10px rgba(217,164,65,0.55); }

        @media (prefers-reduced-motion: reduce) {
          .nwl-fade-up, .nwl-icon { opacity: 1; animation: none !important; }
        }
      `}</style>

      <div
        ref={sectionRef}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16"
        style={{ background: "linear-gradient(135deg, #F7EEE1 0%, #F0DCC0 100%)" }}
      >
        <div
          className={`nwl-icon ${isVisible ? "is-visible" : ""} mx-auto flex h-12 w-12 items-center justify-center rounded-2xl`}
          style={{ background: "linear-gradient(135deg, #E8B857, #C9974A)" }}
        >
          <SendIcon />
        </div>

        <h2
          className={`nwl-fade-up ${isVisible ? "is-visible" : ""} mt-5 font-serif text-2xl font-bold sm:text-3xl`}
          style={{ animationDelay: "0.08s", color: "#1B2A4A" }}
        >
          Get Travel Deals in Your Inbox
        </h2>

        <p
          className={`nwl-fade-up ${isVisible ? "is-visible" : ""} mx-auto mt-3 max-w-md text-sm leading-relaxed`}
          style={{ animationDelay: "0.14s", color: "#6B6255" }}
        >
          Join 500,000+ travellers who receive exclusive deals, hidden destination guides, and seasonal recommendations every week.
        </p>

        {submitted ? (
          <p
            className={`nwl-fade-up is-visible mt-7 text-sm font-semibold`}
            style={{ color: "#1B2A4A" }}
          >
            You're on the list — check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`nwl-fade-up ${isVisible ? "is-visible" : ""} mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row`}
            style={{ animationDelay: "0.2s" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="nwl-input w-full rounded-full border bg-white px-5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400"
              style={{ borderColor: "#E4D8C4" }}
            />
            <button
              type="submit"
              className="nwl-submit shrink-0 rounded-full px-6 py-2.5 text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #E8B857, #D9A441)", color: "#1B2A4A" }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          className={`nwl-fade-up ${isVisible ? "is-visible" : ""} mt-4 text-[11px]`}
          style={{ animationDelay: "0.26s", color: "#9C9284" }}
        >
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
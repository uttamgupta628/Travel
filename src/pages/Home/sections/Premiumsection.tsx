import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const PlaneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M2 16.5 22 9l-5 11-2.5-5.5L11 17l-1-4-4-1 4-2.5-2-3L2 16.5Z" transform="translate(1 -1)" />
  </svg>
);
const CrownIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M3 8.5 7 11l5-6.5L17 11l4-2.5L19.5 18h-15L3 8.5Z" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const BENEFITS = [
  "Airport Lounge Access in 1,200+ lounges globally",
  "Zero Forex Markup on all international transactions",
  "Complimentary Travel Insurance up to ₹50 Lakhs",
  "2x TravelPoints on every booking",
  "Priority 24/7 concierge support",
  "Exclusive member-only rates and partner discounts",
];

/* -------------------------------- Component ------------------------------- */

const PremiumSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${y * -10}deg`);
    card.style.setProperty("--ry", `${x * 14}deg`);
    card.style.setProperty("--mx", `${(e.clientX - rect.left)}px`);
    card.style.setProperty("--my", `${(e.clientY - rect.top)}px`);
  };
  const resetCard = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes premFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes premFadeLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes premCardIn {
          from { opacity: 0; transform: translateY(30px) rotateY(-8deg); }
          to { opacity: 1; transform: translateY(0) rotateY(0deg); }
        }
        @keyframes premBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes premCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes premSheen {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        @keyframes premCheckPop {
          0% { opacity: 0; transform: scale(0.4); }
          70% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes premGlowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        .prem-fade-up { opacity: 0; }
        .prem-fade-up.is-visible { animation: premFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .prem-fade-left { opacity: 0; }
        .prem-fade-left.is-visible { animation: premFadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .prem-blob { animation: premBlobFloat 10s ease-in-out infinite; }

        .prem-benefit-check {
          opacity: 0;
        }
        .prem-fade-left.is-visible .prem-benefit-check {
          animation: premCheckPop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        .prem-cta {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .prem-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -10px rgba(168,85,247,0.6);
        }
        .prem-cta:active { transform: translateY(0) scale(0.97); }

        .prem-card-outer {
          opacity: 0;
          perspective: 1000px;
        }
        .prem-card-outer.is-visible {
          animation: premCardIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .prem-card {
          --rx: 0deg;
          --ry: 0deg;
          --mx: 50%;
          --my: 50%;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.25s ease-out, box-shadow 0.3s ease;
          animation: premCardFloat 6s ease-in-out infinite;
        }
        .prem-card:hover {
          box-shadow: 0 30px 60px -20px rgba(88,28,135,0.55), 0 0 0 1px rgba(168,85,247,0.25);
        }
        .prem-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(300px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .prem-card:hover::before { opacity: 1; }

        .prem-sheen {
          position: absolute;
          top: -50%;
          left: 0;
          width: 40%;
          height: 200%;
          background: linear-gradient(
            100deg,
            transparent 30%,
            rgba(255,255,255,0.12) 50%,
            transparent 70%
          );
          animation: premSheen 4.5s ease-in-out infinite;
          animation-delay: 1.2s;
          pointer-events: none;
        }

        .prem-card-glow {
          animation: premGlowPulse 3s ease-in-out infinite;
        }

        .prem-dots {
          letter-spacing: 0.15em;
        }

        @media (prefers-reduced-motion: reduce) {
          .prem-fade-up, .prem-fade-left { opacity: 1; animation: none !important; }
          .prem-blob { animation: none; }
          .prem-benefit-check { animation: none !important; opacity: 1; }
          .prem-cta:hover { transform: none; }
          .prem-card-outer.is-visible { animation: none; opacity: 1; }
          .prem-card { animation: none; transform: none !important; }
          .prem-sheen { animation: none; display: none; }
          .prem-card-glow { animation: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="prem-blob pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />
      <div aria-hidden className="prem-blob pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[110px]" style={{ animationDelay: "3.5s" }} />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <p
            className={`prem-fade-left ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
            style={{ animationDelay: "0s" }}
          >
            Exclusive Access
          </p>
          <h2
            className={`prem-fade-left ${isVisible ? "is-visible" : ""} mt-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl`}
            style={{ animationDelay: "0.08s" }}
          >
            Traveleo
          </h2>
          <h2
            className={`prem-fade-left ${isVisible ? "is-visible" : ""} bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl`}
            style={{ animationDelay: "0.16s" }}
          >
            Premium
          </h2>

          <p
            className={`prem-fade-left ${isVisible ? "is-visible" : ""} mt-5 max-w-md text-sm leading-relaxed text-white/45`}
            style={{ animationDelay: "0.24s" }}
          >
            Join 2.5 million premium members enjoying exclusive benefits, priority service, and
            real savings on every journey — from ₹999/year.
          </p>

          <ul className="mt-7 space-y-3.5">
            {BENEFITS.map((benefit, i) => (
              <li
                key={benefit}
                className={`prem-fade-left ${isVisible ? "is-visible" : ""} flex items-start gap-3`}
                style={{ animationDelay: `${0.3 + i * 0.07}s` }}
              >
                <span
                  className="prem-benefit-check mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white"
                  style={{ animationDelay: `${0.4 + i * 0.07}s` }}
                >
                  <CheckIcon />
                </span>
                <span className="text-sm text-white/60">{benefit}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`prem-cta prem-fade-left ${isVisible ? "is-visible" : ""} mt-8 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-7 py-3.5 text-sm font-semibold text-white`}
            style={{ animationDelay: "0.8s" }}
          >
            Get Premium — ₹999/year
          </button>
        </div>

        {/* Right: membership card */}
        <div
          className={`prem-card-outer ${isVisible ? "is-visible" : ""} mx-auto w-full max-w-sm`}
          style={{ animationDelay: "0.3s" }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={resetCard}
            className="prem-card aspect-[1.55/1] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#2b1250] via-[#3d1a63] to-[#150826] p-6 shadow-2xl shadow-purple-950/40"
          >
            <div aria-hidden className="prem-card-glow pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="prem-sheen" />

            <div className="relative flex h-full flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 text-white">
                    <PlaneIcon />
                  </span>
                  <span className="text-sm font-bold text-white">Traveleo</span>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                  Premium
                </span>
              </div>

              {/* Member since + number */}
              <div>
                <p className="text-[10px] uppercase tracking-wide text-white/40">Member since</p>
                <p className="mt-0.5 text-sm font-semibold text-white/90">January 2025</p>
                <p className="prem-dots mt-3 text-lg font-medium text-white/70">
                  •••• •••• •••• 4892
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-white/40">Travel Points</p>
                  <p className="text-xl font-bold text-white">
                    12,480 <span className="text-xs font-normal text-white/40">pts</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-white/40">Tier</p>
                  <span className="flex items-center gap-1 text-sm font-bold text-amber-300">
                    <CrownIcon />
                    Gold
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
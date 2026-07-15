import React, { useEffect, useRef, useState } from "react";

/**
 * "Travel Like It's Personal" — platinum membership card promo.
 * Same conventions as the other sections: IntersectionObserver reveal
 * gate, inline styles for brand colors, Tailwind for layout, a <style>
 * block for keyframes. Card panel background uses the three navy tones
 * from the brief: #1A2E5A -> #0D1B3E -> #0A0F2A.
 */

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#D9A441",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-4 w-4",
};

const BENEFITS: Benefit[] = [
  {
    title: "Airport Lounge Access",
    description: "1,300+ lounges worldwide",
    icon: (
      <svg {...iconProps}>
        <path d="M4 19h16" />
        <path d="M6 19V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  {
    title: "Zero Forex Markup",
    description: "Spend abroad, save more",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15c0 1.1 1.3 2 3 2s3-.9 3-2-1.3-1.8-3-2-3-.9-3-2 1.3-2 3-2 3 .9 3 2" />
      </svg>
    ),
  },
  {
    title: "Cashback Rewards",
    description: "Up to 5% on every spend",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <circle cx="16.5" cy="14.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Exclusive Travel Deals",
    description: "Members-only fares, hotels",
    icon: (
      <svg {...iconProps}>
        <path d="M20.6 12.6 12 21.2 2.8 12A2 2 0 0 1 2.2 10.6L3 5a2 2 0 0 1 2-1.8L10.6 3a2 2 0 0 1 1.4.6l8.6 8.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.2" fill="#D9A441" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Priority Support",
    description: "Dedicated 24/7 concierge",
    icon: (
      <svg {...iconProps}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
        <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Reward Points",
    description: "Earn & redeem instantly",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.5 1.2 6.4L12 16.9l-5.5 3.1 1.2-6.4-4.7-4.5 6.3-.7L12 2.5Z" />
      </svg>
    ),
  },
];

const PlatinumMembershipSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-4 py-24 sm:px-8 lg:px-16" style={{ backgroundColor: "#F0EDE8" }}>
      <style>{`
        @keyframes pltLineGrow { to { width: 24px; } }
        @keyframes pltFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pltCardIn {
          from { opacity: 0; transform: translateY(24px) rotate(0deg); }
          to { opacity: 1; transform: translateY(0) rotate(-6deg); }
        }
        @keyframes pltCardFloat {
          0%, 100% { transform: rotate(-6deg) translateY(0); }
          50% { transform: rotate(-6deg) translateY(-8px); }
        }

        .plt-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #D9A441;
          animation: pltLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .plt-fade-up { opacity: 0; }
        .plt-fade-up.is-visible { animation: pltFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .plt-card { opacity: 0; }
        .plt-card.is-visible { animation: pltCardIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .plt-card.is-visible .plt-card-inner { animation: pltCardFloat 6s ease-in-out infinite; animation-delay: 0.9s; }
        .plt-card:hover .plt-card-inner { transform: rotate(-2deg) scale(1.02); }
        .plt-card-inner { transition: transform 0.35s ease; }

        .plt-btn-primary { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .plt-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -8px rgba(217,164,65,0.5); }
        .plt-btn-secondary { transition: background-color 0.2s ease, border-color 0.2s ease; }
        .plt-btn-secondary:hover { background-color: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.4); }

        @media (prefers-reduced-motion: reduce) {
          .plt-fade-up, .plt-card { opacity: 1; animation: none !important; }
          .plt-card.is-visible .plt-card-inner { animation: none; transform: rotate(-6deg); }
        }
      `}</style>

      <div
        ref={sectionRef}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-16"
        style={{ background: "linear-gradient(135deg, #1A2E5A 0%, #0D1B3E 55%, #0A0F2A 100%)" }}
      >
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: card mockup */}
          <div className={`plt-card ${isVisible ? "is-visible" : ""} flex justify-center lg:justify-start`}>
            <div
              className="plt-card-inner relative aspect-[1.586/1] w-full max-w-[320px] rounded-2xl p-5 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #24407A 0%, #16264D 60%, #0D1730 100%)",
                border: "1px solid rgba(217,164,65,0.25)",
              }}
            >
              {/* Overlapping gold circles (card network mark) */}
              <div className="absolute right-5 top-5 flex">
                <div className="h-7 w-7 rounded-full" style={{ backgroundColor: "#D9A441" }} />
                <div className="-ml-3 h-7 w-7 rounded-full" style={{ backgroundColor: "#F2C879", opacity: 0.9 }} />
              </div>

              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-serif text-lg font-bold tracking-wide text-white">WANDERLUX</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#D9A441" }}>
                    Platinum Elite
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-white/40">Card Holder</p>
                    <p className="mt-0.5 text-xs font-semibold tracking-wide text-white">Priya Mehta</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-wider text-white/40">Valid Thru</p>
                    <p className="mt-0.5 text-xs font-semibold tracking-wide text-white">02/28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: copy + benefits */}
          <div>
            <p
              className={`plt-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
              style={{ animationDelay: "0s", color: "#D9A441" }}
            >
              <span className="plt-eyebrow-line" />
              Platinum Membership
            </p>

            <h2
              className={`plt-fade-up ${isVisible ? "is-visible" : ""} mt-3 font-serif text-3xl font-bold text-white sm:text-4xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Travel Like It's Personal
            </h2>

            <p
              className={`plt-fade-up ${isVisible ? "is-visible" : ""} mt-3 max-w-lg text-sm leading-relaxed`}
              style={{ animationDelay: "0.14s", color: "rgba(226,232,240,0.6)" }}
            >
              Unlock an unparalleled world of privileges, rewards, and dedicated service crafted for the discerning traveler.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {BENEFITS.map((benefit, i) => (
                <div
                  key={benefit.title}
                  className={`plt-fade-up ${isVisible ? "is-visible" : ""} flex items-start gap-3`}
                  style={{ animationDelay: `${0.2 + i * 0.06}s` }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(217,164,65,0.12)", border: "1px solid rgba(217,164,65,0.3)" }}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{benefit.title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: "rgba(226,232,240,0.5)" }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`plt-fade-up ${isVisible ? "is-visible" : ""} mt-9 flex flex-wrap items-center gap-3`}
              style={{ animationDelay: "0.6s" }}
            >
              <button
                className="plt-btn-primary rounded-full px-6 py-3 text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #E8B857, #D9A441)", color: "#0A0F2A" }}
              >
                Get Platinum Card — Free
              </button>
              <button
                className="plt-btn-secondary rounded-full border px-6 py-3 text-sm font-semibold text-white"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatinumMembershipSection;
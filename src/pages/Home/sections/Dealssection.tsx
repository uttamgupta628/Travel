import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const ClockIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
const ArrowIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const CalendarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);
const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M15.5 5.2A3 3 0 0 1 17 11M17.5 14c2 .3 3.5 1.9 3.5 5" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

type DealKind = "flash" | "bank" | "seasonal";

interface Deal {
  kind: DealKind;
  badge: string;
  title: string;
  subtitle: string;
  meta: string;
  metaIcon: React.ReactNode;
  ctaLabel: string;
}

const DEALS: Deal[] = [
  {
    kind: "flash",
    badge: "Flash Sale",
    title: "Flights to Dubai",
    subtitle: "Up to 35% OFF all routes",
    meta: "", // filled dynamically with countdown
    metaIcon: <ClockIcon />,
    ctaLabel: "Grab Deal",
  },
  {
    kind: "bank",
    badge: "Bank Offer",
    title: "HDFC Card — Extra ₹2,000 Off",
    subtitle: "Instant discount on booking",
    meta: "Valid till Aug 31, 2026",
    metaIcon: <CalendarIcon />,
    ctaLabel: "Grab Deal",
  },
  {
    kind: "seasonal",
    badge: "Sponsored",
    title: "Maldives Monsoon Special",
    subtitle: "Packages from ₹72,999/person",
    meta: "Limited rooms available",
    metaIcon: <UsersIcon />,
    ctaLabel: "Grab Deal",
  },
];

const KIND_STYLES: Record<
  DealKind,
  { badge: string; glow: string; accent: string }
> = {
  flash: {
    badge: "bg-gradient-to-r from-red-500 to-orange-400 text-white",
    glow: "rgba(248,113,113,0.16)",
    accent: "text-orange-300",
  },
  bank: {
    badge: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    glow: "rgba(129,140,248,0.16)",
    accent: "text-indigo-300",
  },
  seasonal: {
    badge: "bg-gradient-to-r from-teal-400 to-emerald-400 text-white",
    glow: "rgba(45,212,191,0.16)",
    accent: "text-teal-300",
  },
};

/* -------------------------------- Component ------------------------------- */

const DEAL_END_TIME = Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 42 + 1000 * 15; // ~8h 42m 15s from load

const formatCountdown = (ms: number) => {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
};

const DealsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(DEAL_END_TIME - Date.now());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(DEAL_END_TIME - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes dealFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dealBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes dealPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(248,113,113,0.45); }
          50% { box-shadow: 0 0 0 5px rgba(248,113,113,0); }
        }
        @keyframes dealDotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        .deal-fade-up { opacity: 0; }
        .deal-fade-up.is-visible { animation: dealFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .deal-blob { animation: dealBlobFloat 9s ease-in-out infinite; }

        .deal-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.35s ease;
        }
        .deal-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
        }
        .deal-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          background: radial-gradient(240px circle at var(--mx) var(--my), var(--deal-glow), transparent 65%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .deal-card:hover::before { opacity: 1; }

        .deal-badge-flash {
          animation: dealPulse 2s ease-in-out infinite;
        }
        .deal-live-dot {
          animation: dealDotBlink 1.4s ease-in-out infinite;
        }

        .deal-cta {
          transition: gap 0.25s ease, color 0.25s ease;
        }
        .deal-cta:hover {
          gap: 0.4rem;
        }
        .deal-cta-arrow {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .deal-cta:hover .deal-cta-arrow {
          transform: translateX(3px);
        }

        .deal-view-all {
          transition: gap 0.25s ease, opacity 0.25s ease;
        }
        .deal-view-all:hover {
          gap: 0.5rem;
          opacity: 1;
        }
        .deal-view-all-arrow {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .deal-view-all:hover .deal-view-all-arrow {
          transform: translateX(3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .deal-fade-up { opacity: 1; animation: none !important; }
          .deal-blob { animation: none; }
          .deal-card:hover { transform: none; }
          .deal-badge-flash { animation: none; }
          .deal-live-dot { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="deal-blob pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />
      <div aria-hidden className="deal-blob pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className={`deal-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
              style={{ animationDelay: "0s" }}
            >
              Limited Time
            </p>
            <h2
              className={`deal-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Deals &amp; Offers
            </h2>
          </div>
          <a
            href="#"
            className={`deal-fade-up deal-view-all ${isVisible ? "is-visible" : ""} flex items-center gap-1.5 text-sm font-semibold text-fuchsia-300/80`}
            style={{ animationDelay: "0.15s" }}
          >
            View All
            <span className="deal-view-all-arrow">
              <ArrowIcon />
            </span>
          </a>
        </div>

        {/* Deal cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEALS.map((deal, i) => {
            const style = KIND_STYLES[deal.kind];
            return (
              <div
                key={deal.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                className={`deal-fade-up deal-card ${isVisible ? "is-visible" : ""} overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5`}
                style={{ animationDelay: `${0.2 + i * 0.08}s`, ["--deal-glow" as any]: style.glow }}
              >
                <div className="relative">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${style.badge} ${
                      deal.kind === "flash" ? "deal-badge-flash" : ""
                    }`}
                  >
                    {deal.kind === "flash" && (
                      <span className="deal-live-dot h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                    {deal.badge}
                  </span>

                  <h3 className="mt-3.5 text-base font-bold text-white">{deal.title}</h3>
                  <p className="mt-1 text-xs text-white/45">{deal.subtitle}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${style.accent}`}>
                      {deal.metaIcon}
                      {deal.kind === "flash" ? `Ends in ${formatCountdown(countdown)}` : deal.meta}
                    </span>
                    <a
                      href="#"
                      className={`deal-cta flex items-center gap-1 text-xs font-semibold ${style.accent}`}
                    >
                      {deal.ctaLabel}
                      <span className="deal-cta-arrow">
                        <ArrowIcon />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
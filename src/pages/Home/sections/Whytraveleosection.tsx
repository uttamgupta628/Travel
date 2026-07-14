import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const ZapIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);
const RefreshIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 12a8 8 0 0 1 14.5-4.5M20 12a8 8 0 0 1-14.5 4.5" />
    <path d="M18 3v4.5h-4.5M6 21v-4.5h4.5" />
  </svg>
);
const TrendDownIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="m4 7 6 6 4-4 6 6" />
    <path d="M20 9v6h-6" />
  </svg>
);
const CardIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19M6 15h4" />
  </svg>
);
const SparkleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
);
const ShieldIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const HeadsetIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4.5" height="6" rx="1.5" />
    <rect x="17" y="13" width="4.5" height="6" rx="1.5" />
    <path d="M19.5 19v.5a3 3 0 0 1-3 3H13" />
  </svg>
);
const AwardIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="8" r="5.5" />
    <path d="m8.5 13-1.5 8 5-2.5 5 2.5-1.5-8" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <ZapIcon />,
    title: "Zero Convenience Fee",
    description: "Book without hidden charges or service fees on thousands of routes.",
  },
  {
    icon: <RefreshIcon />,
    title: "Flexible Bookings",
    description: "Change or cancel plans without stress with our flex guarantee.",
  },
  {
    icon: <TrendDownIcon />,
    title: "Price Drop Protection",
    description: "Prices drop after booking? We automatically refund the difference.",
  },
  {
    icon: <CardIcon />,
    title: "Instant Refunds",
    description: "Money back in your account within 2 hours, not 7–10 business days.",
  },
  {
    icon: <SparkleIcon />,
    title: "AI Trip Planning",
    description: "Our AI crafts personalized itineraries based on your style and budget.",
  },
  {
    icon: <ShieldIcon />,
    title: "Secure Payments",
    description: "Bank-grade encryption with 3D Secure authentication on every transaction.",
  },
  {
    icon: <HeadsetIcon />,
    title: "24/7 Support",
    description: "Live human support in 12 languages, any time you need us.",
  },
  {
    icon: <AwardIcon />,
    title: "Reward Points",
    description: "Earn TravelPoints on every booking, redeemable on future trips.",
  },
];

/* -------------------------------- Component ------------------------------- */

const WhyTraveleoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
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
        @keyframes whyFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes whyIconPop {
          0% { opacity: 0; transform: scale(0.5) rotate(-12deg); }
          65% { opacity: 1; transform: scale(1.15) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes whyBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }

        .why-fade-up { opacity: 0; }
        .why-fade-up.is-visible { animation: whyFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .why-blob { animation: whyBlobFloat 9s ease-in-out infinite; }

        .why-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .why-card:hover {
          transform: translateY(-6px);
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: 0 20px 40px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.08);
        }
        .why-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(220px circle at var(--mx) var(--my), rgba(168,85,247,0.14), transparent 65%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .why-card:hover::before { opacity: 1; }

        .why-icon-badge {
          opacity: 0;
        }
        .why-fade-up.is-visible .why-icon-badge {
          animation: whyIconPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .why-card:hover .why-icon-badge {
          transform: scale(1.08) rotate(-4deg);
        }
        .why-icon-badge {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        @media (prefers-reduced-motion: reduce) {
          .why-fade-up { opacity: 1; animation: none !important; }
          .why-blob { animation: none; }
          .why-card:hover { transform: none; }
          .why-icon-badge { animation: none !important; opacity: 1; }
          .why-card:hover .why-icon-badge { transform: none; }
        }
      `}</style>

      {/* Ambient glow accents, consistent with the rest of the page */}
      <div aria-hidden className="why-blob pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" />
      <div aria-hidden className="why-blob pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">
          <p
            className={`why-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
            style={{ animationDelay: "0s" }}
          >
            Why Traveleo
          </p>
          <h2
            className={`why-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
            style={{ animationDelay: "0.1s" }}
          >
            Travel smarter,
            <br />
            not harder
          </h2>
        </div>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              className={`why-fade-up why-card ${isVisible ? "is-visible" : ""} overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5`}
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <div
                className="why-icon-badge flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 text-fuchsia-300"
                style={{ animationDelay: `${0.25 + i * 0.07}s` }}
              >
                {feature.icon}
              </div>
              <h3 className="relative mt-4 text-sm font-bold text-white">{feature.title}</h3>
              <p className="relative mt-1.5 text-xs leading-relaxed text-white/40">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTraveleoSection;
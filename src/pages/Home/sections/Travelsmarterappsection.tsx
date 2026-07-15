import React, { useEffect, useRef, useState } from "react";

/**
 * "Travel Smarter with the Wanderlux App" — app-download promo section.
 * Same conventions as TravelInspirationSection / WhatTravellersSaySection:
 * IntersectionObserver reveal gate, inline styles for brand colors,
 * Tailwind for layout, a <style> block for keyframes.
 *
 * Phone screenshot is a Cloudinary demo asset as a placeholder — swap
 * the `cld(...)` public ID for a real Wanderlux app screenshot whenever
 * ready (see comment on the constant below).
 */

const cld = (publicId: string, w: number, h: number) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_${w},h_${h},c_fill,g_auto/${publicId}`;

// Placeholder — swap for a real in-app screenshot (e.g. the Bali trip
// itinerary screen shown in the design reference).
const PHONE_SCREENSHOT = cld("samples/landscapes/beach-boat", 460, 920);

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "white",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-4 w-4",
};

const FEATURES: Feature[] = [
  {
    title: "Offline Tickets",
    description: "Access boarding passes without internet.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 10a2 2 0 0 1 0-4h18a2 2 0 0 1 0 4 2 2 0 0 0 0 4 2 2 0 0 1 0 4H3a2 2 0 0 1 0-4 2 2 0 0 0 0-4Z" />
        <path d="M13 6v2M13 11v2M13 16v2" />
      </svg>
    ),
  },
  {
    title: "Trip Timeline",
    description: "Your entire itinerary in one view.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.2 1.9" />
      </svg>
    ),
  },
  {
    title: "Instant Check-in",
    description: "Skip queues with one-tap check-in.",
    icon: (
      <svg {...iconProps}>
        <path d="M20 7 10 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Real-time Alerts",
    description: "Flight updates and gate changes instantly.",
    icon: (
      <svg {...iconProps}>
        <path d="M9 17a3 3 0 0 0 6 0" />
        <path d="M6 10a6 6 0 1 1 12 0c0 3.2 1 4.5 2 5.5H4c1-1 2-2.3 2-5.5Z" />
      </svg>
    ),
  },
  {
    title: "One-tap Booking",
    description: "Book in under 10 seconds, anywhere.",
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
];

const AppleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
    <path d="M16.365 1.43c0 1.14-.463 2.084-1.14 2.797-.755.79-1.99 1.396-2.997 1.318-.13-1.096.41-2.253 1.09-2.97C14.09.833 15.32.223 16.365 1.43ZM20.5 17.2c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.39 3.5-4.13 3.52-1.54.02-1.94-1.01-4.03-1-2.1.01-2.54 1.02-4.08 1-1.74-.02-3.06-1.77-4.05-3.33C.36 16.7-.42 12.02 1.4 8.86c1.28-2.23 3.4-3.54 5.38-3.54 1.97 0 3.21 1.08 4.84 1.08 1.58 0 2.55-1.08 4.83-1.08 1.77 0 3.65.97 4.98 2.64-4.38 2.4-3.67 8.67-.93 9.24Z" />
  </svg>
);

const PlayIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white">
    <path d="M4 3.5c0-.63.69-1.02 1.24-.7l14.6 8.5c.55.32.55 1.08 0 1.4l-14.6 8.5c-.55.32-1.24-.07-1.24-.7v-17Z" />
  </svg>
);

const TravelSmarterAppSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

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
        @keyframes tsaLineGrow { to { width: 24px; } }
        @keyframes tsaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tsaSlideLeft {
          from { opacity: 0; transform: translateX(32px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tsaPopIn {
          from { opacity: 0; transform: translateY(10px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tsaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .tsa-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: tsaLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .tsa-fade-up { opacity: 0; }
        .tsa-fade-up.is-visible { animation: tsaFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .tsa-phone { opacity: 0; }
        .tsa-phone.is-visible { animation: tsaSlideLeft 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .tsa-phone.is-visible .tsa-phone-frame { animation: tsaFloat 6s ease-in-out infinite; animation-delay: 0.8s; }

        .tsa-float-card { opacity: 0; }
        .tsa-float-card.is-visible { animation: tsaPopIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

        .tsa-feature-row { transition: transform 0.25s ease; }
        .tsa-feature-row:hover { transform: translateX(3px); }
        .tsa-feature-row:hover .tsa-feature-icon { transform: scale(1.08); }
        .tsa-feature-icon { transition: transform 0.25s ease; }

        .tsa-store-btn { transition: transform 0.2s ease, background-color 0.2s ease; }
        .tsa-store-btn:hover { transform: translateY(-2px); background-color: #1B2A4A; }

        @media (prefers-reduced-motion: reduce) {
          .tsa-fade-up, .tsa-phone, .tsa-float-card { opacity: 1; animation: none !important; }
          .tsa-phone.is-visible .tsa-phone-frame { animation: none; }
        }
      `}</style>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy + features */}
        <div>
          <p
            className={`tsa-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
            style={{ animationDelay: "0s", color: "#C9974A" }}
          >
            <span className="tsa-eyebrow-line" />
            Download Now
          </p>

          <h2
            className={`tsa-fade-up ${isVisible ? "is-visible" : ""} mt-3 max-w-md font-serif text-3xl font-bold leading-tight sm:text-4xl`}
            style={{ animationDelay: "0.08s", color: "#1B2A4A" }}
          >
            Travel Smarter with the Wanderlux App
          </h2>

          <p
            className={`tsa-fade-up ${isVisible ? "is-visible" : ""} mt-4 max-w-sm text-sm leading-relaxed`}
            style={{ animationDelay: "0.14s", color: "#5B6472" }}
          >
            Everything you need for a seamless journey — from planning to landing — in the palm of your hand.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className={`tsa-fade-up ${isVisible ? "is-visible" : ""} tsa-feature-row flex items-center gap-3.5`}
                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
              >
                <div
                  className="tsa-feature-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#1B2A4A" }}
                >
                  {feature.icon}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#1B2A4A" }}>
                    {feature.title}
                  </p>
                  <p className="text-xs" style={{ color: "#8A93A3" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`tsa-fade-up ${isVisible ? "is-visible" : ""} mt-9 flex flex-wrap items-center gap-3`}
            style={{ animationDelay: "0.65s" }}
          >
            <button
              className="tsa-store-btn flex items-center gap-2.5 rounded-xl px-4 py-2.5"
              style={{ backgroundColor: "#14131A" }}
            >
              <AppleIcon />
              <span className="text-left leading-tight">
                <span className="block text-[9px] text-white/60">Download on the</span>
                <span className="block text-xs font-semibold text-white">App Store</span>
              </span>
            </button>
            <button
              className="tsa-store-btn flex items-center gap-2.5 rounded-xl px-4 py-2.5"
              style={{ backgroundColor: "#14131A" }}
            >
              <PlayIcon />
              <span className="text-left leading-tight">
                <span className="block text-[9px] text-white/60">Get it on</span>
                <span className="block text-xs font-semibold text-white">Google Play</span>
              </span>
            </button>
          </div>
        </div>

        {/* Right: phone mockup with floating cards */}
        <div className={`tsa-phone ${isVisible ? "is-visible" : ""} relative flex justify-center lg:justify-end`} style={{ animationDelay: "0.25s" }}>
          <div className="tsa-phone-frame relative w-[220px] sm:w-[250px]">
            <div
              className="relative overflow-hidden rounded-[2.2rem] border-[6px] shadow-2xl"
              style={{ borderColor: "#14131A", backgroundColor: "#14131A" }}
            >
              <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.7rem]">
                {!imgFailed ? (
                  <img
                    src={PHONE_SCREENSHOT}
                    alt="Wanderlux app trip screen"
                    onError={() => setImgFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* Status pill */}
                <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />

                {/* Top label */}
                <div className="absolute left-3.5 top-8">
                  <p className="text-[8px] font-medium uppercase tracking-wide text-white/70">Confirming Trip</p>
                  <p className="mt-0.5 font-serif text-sm font-bold text-white">Bali Trip</p>
                </div>

                {/* Bottom flight info */}
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="text-[8px] font-medium uppercase tracking-wide text-white/60">Your Flight</p>
                  <div className="mt-1 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">BOM</p>
                      <p className="text-[8px] text-white/50">06:20 AM</p>
                    </div>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/60" fill="currentColor">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5Z" />
                    </svg>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">DPS</p>
                      <p className="text-[8px] text-white/50">12:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card: date changed */}
          <div
            className={`tsa-float-card ${isVisible ? "is-visible" : ""} absolute left-[-1.25rem] top-[42%] w-40 rounded-xl bg-white p-3 shadow-lg shadow-black/10 sm:left-[-2rem]`}
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#C9974A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M8 3v3M16 3v3" />
              </svg>
              <p className="text-[9px] font-semibold" style={{ color: "#1B2A4A" }}>
                Date changed to D14
              </p>
            </div>
            <p className="mt-1 text-[8px]" style={{ color: "#8A93A3" }}>
              Updated 2 minutes ago
            </p>
          </div>

          {/* Floating card: confirmed */}
          <div
            className={`tsa-float-card ${isVisible ? "is-visible" : ""} absolute right-[-0.75rem] top-6 w-32 rounded-xl bg-white p-3 shadow-lg shadow-black/10 sm:right-[-1.5rem]`}
            style={{ animationDelay: "1.15s" }}
          >
            <p className="text-[8px] font-medium" style={{ color: "#8A93A3" }}>
              Seat 12A, Economy
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
              <p className="text-[10px] font-bold" style={{ color: "#1B2A4A" }}>
                Confirmed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSmarterAppSection;
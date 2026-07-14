import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const PlaneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);
const HotelIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" />
    <path d="M13 21v-8a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v8" />
    <path d="M2 21h20M7 8h1M7 12h1M7 16h1" />
  </svg>
);
const HolidaysIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 15c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    <path d="M12 15V4M2 15h20M4 15v5M20 15v5" />
  </svg>
);
const TrainIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="5" y="3" width="14" height="13" rx="3" />
    <path d="M5 12h14M9 21l-2 2M15 21l2 2M8 8h.01M16 8h.01" />
  </svg>
);
const BusIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="3" y="5" width="18" height="12" rx="2.5" />
    <path d="M3 11h18M7 20v-3M17 20v-3M7 8h2M15 8h2" />
  </svg>
);
const VisaIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="2" />
    <path d="M6 17c.5-2 2-3 3-3s2.5 1 3 3M14 9h4M14 13h4" />
  </svg>
);
const ExperienceIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 16.8 10.2 11.2 4.6 9.4 10.2 7.6 12 2Z" />
  </svg>
);
const PinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
  </svg>
);
const SwapIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M7 7h13l-3.5-3.5M17 17H4l3.5 3.5" />
  </svg>
);
const CalendarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="9" cy="7.5" r="3" />
    <path d="M2 20v-1.5A3.5 3.5 0 0 1 5.5 15h7a3.5 3.5 0 0 1 3.5 3.5V20" />
  </svg>
);
const SearchIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
const PlusMinusIcon: React.FC<{ variant: "plus" | "minus" }> = ({ variant }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className="h-3 w-3">
    <path d="M5 12h14" />
    {variant === "plus" && <path d="M12 5v14" />}
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const TABS = [
  { label: "Flights", icon: <PlaneIcon /> },
  { label: "Hotels", icon: <HotelIcon /> },
  { label: "Holidays", icon: <HolidaysIcon /> },
  { label: "Trains", icon: <TrainIcon /> },
  { label: "Buses", icon: <BusIcon /> },
  { label: "Visa", icon: <VisaIcon /> },
  { label: "Experiences", icon: <ExperienceIcon /> },
];

const TRIP_TYPES = ["Round Trip", "One Way", "Multi City"];

const AIRLINES = [
  "Air India",
  "IndiGo",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Lufthansa",
  "British Airways",
  "Turkish Airlines",
  "Akasa Air",
  "Vistara",
];

/* -------------------------------- Component ------------------------------- */

const BookingSearchSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabsWrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tripType, setTripType] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [searching, setSearching] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

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

  // Position the sliding pill behind the active tab.
  useEffect(() => {
    const btn = tabRefs.current[activeTab];
    const wrap = tabsWrapRef.current;
    if (!btn || !wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - wrapRect.left, width: btnRect.width });
  }, [activeTab, isVisible]);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => setSearching(false), 1800);
  };

  const from = swapped ? { city: "Dubai, UAE", code: "DXB" } : { city: "New Delhi, India", code: "DEL" };
  const to = swapped ? { city: "New Delhi, India", code: "DEL" } : { city: "Dubai, UAE", code: "DXB" };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes bkFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bkCardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bkFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes bkMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes bkPulseRing {
          0% { box-shadow: 0 0 0 0 rgba(168,85,247,0.45); }
          100% { box-shadow: 0 0 0 10px rgba(168,85,247,0); }
        }
        @keyframes bkSpin { to { transform: rotate(360deg); } }
        @keyframes bkPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }

        .bk-fade-up { opacity: 0; }
        .bk-fade-up.is-visible { animation: bkFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .bk-card { opacity: 0; }
        .bk-card.is-visible { animation: bkCardIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .bk-blob { animation: bkFloat 8s ease-in-out infinite; }

        .bk-tab-indicator {
          transition: left 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .bk-swap-btn:hover { animation: bkPulseRing 1.2s ease-out infinite; }
        .bk-swap-btn.is-swapping svg { animation: bkSpin 0.4s ease; }

        .bk-field {
          transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
        }
        .bk-field:hover, .bk-field:focus-within {
          border-color: rgba(168,85,247,0.45);
          background-color: rgba(255,255,255,0.05);
        }

        .bk-search-btn {
          background-size: 200% 100%;
          background-position: 0% 0%;
          transition: background-position 0.5s ease, transform 0.2s ease;
        }
        .bk-search-btn:hover { background-position: 100% 0%; transform: translateY(-1px); }

        .bk-count-pop { display: inline-block; animation: bkPop 0.35s cubic-bezier(0.34,1.56,0.64,1); }

        .bk-marquee-track {
          animation: bkMarquee 22s linear infinite;
        }
        .bk-marquee:hover .bk-marquee-track { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .bk-fade-up, .bk-card { opacity: 1; animation: none !important; }
          .bk-blob, .bk-marquee-track { animation: none; }
          .bk-swap-btn:hover { animation: none; }
          .bk-swap-btn.is-swapping svg { animation: none; }
        }
      `}</style>

      {/* Ambient glow accents matching the hero's palette */}
      <div aria-hidden className="bk-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />
      <div aria-hidden className="bk-blob pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-5xl">
        {/* Floating search card */}
        <div
          className={`bk-card ${isVisible ? "is-visible" : ""} relative rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-4`}
        >
          {/* Service tabs */}
          <div ref={tabsWrapRef} className="relative flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
            <div
              className="bk-tab-indicator absolute bottom-3 top-0 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 shadow-md shadow-fuchsia-500/30"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => setActiveTab(i)}
                className={`relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300 sm:px-4 ${
                  activeTab === i ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Trip type radios */}
          <div className="flex flex-wrap items-center gap-5 px-2 py-4">
            {TRIP_TYPES.map((type, i) => (
              <button
                key={type}
                onClick={() => setTripType(i)}
                className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    tripType === i ? "border-fuchsia-500" : "border-white/30"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-transform duration-200"
                    style={{ transform: tripType === i ? "scale(1)" : "scale(0)" }}
                  />
                </span>
                <span className={tripType === i ? "text-white" : ""}>{type}</span>
              </button>
            ))}
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-1 gap-2.5 px-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr]">
            {/* From */}
            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">From</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-purple-400">
                  <PinIcon />
                </span>
                <div>
                  <p className="text-base font-bold text-white">{from.code}</p>
                  <p className="text-xs text-white/40">{from.city}</p>
                </div>
              </div>
            </div>

            {/* Swap button */}
            <div className="flex items-center justify-center py-1 lg:py-0">
              <button
                onClick={() => setSwapped((v) => !v)}
                className={`bk-swap-btn flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-transform duration-300 hover:text-white ${
                  swapped ? "is-swapping" : ""
                }`}
                style={{ transform: `rotate(${swapped ? 180 : 0}deg)` }}
                aria-label="Swap origin and destination"
              >
                <SwapIcon />
              </button>
            </div>

            {/* To */}
            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">To</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-pink-400">
                  <PinIcon />
                </span>
                <div>
                  <p className="text-base font-bold text-white">{to.code}</p>
                  <p className="text-xs text-white/40">{to.city}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-1 gap-2.5 px-1 sm:grid-cols-2">
            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                <CalendarIcon /> Departure
              </p>
              <p className="mt-1.5 text-base font-bold text-white">Aug 15, 2025</p>
              <p className="text-xs text-white/40">Thursday</p>
            </div>
            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                <CalendarIcon /> Return
              </p>
              <p className="mt-1.5 text-base font-bold text-white">Aug 22, 2025</p>
              <p className="text-xs text-white/40">Thursday</p>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-1 gap-2.5 px-1 sm:grid-cols-3">
            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                <UsersIcon /> Travelers
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span key={travelers} className="bk-count-pop text-base font-bold text-white">
                  {travelers} {travelers === 1 ? "Adult" : "Adults"}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTravelers((v) => Math.max(1, v - 1))}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <PlusMinusIcon variant="minus" />
                  </button>
                  <button
                    onClick={() => setTravelers((v) => Math.min(9, v + 1))}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <PlusMinusIcon variant="plus" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Cabin Class</p>
              <p className="mt-1.5 text-base font-bold text-white">Economy</p>
            </div>

            <div className="bk-field rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Promo Code</p>
              <input
                type="text"
                placeholder="Enter code"
                className="mt-1.5 w-full bg-transparent text-base font-semibold text-white placeholder-white/30 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={searching}
            className="bk-search-btn mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 disabled:cursor-wait sm:mt-3"
          >
            {searching ? (
              <>
                <span
                  className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                  style={{ animation: "bkSpin 0.7s linear infinite" }}
                />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon />
                Search Flights
              </>
            )}
          </button>
        </div>

        {/* Trusted-by marquee */}
        <div className={`bk-fade-up ${isVisible ? "is-visible" : ""} mt-16 text-center`} style={{ animationDelay: "0.3s" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">
            Trusted by 300+ Airline Partners
          </p>

          <div className="bk-marquee relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="bk-marquee-track flex w-max items-center gap-3">
              {[...AIRLINES, ...AIRLINES].map((airline, i) => (
                <span
                  key={`${airline}-${i}`}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
                >
                  {airline}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSearchSection;
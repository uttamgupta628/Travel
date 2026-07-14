import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const WindIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5" />
    <path d="M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5" />
    <path d="M3 17h9a2 2 0 1 1-2 2" />
  </svg>
);
const CompassIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" />
    <path d="m14.5 9.5-1.8 5.2-5.2 1.8 1.8-5.2 5.2-1.8Z" />
  </svg>
);
const MountainIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="m3 19 6.5-11L14 15l2-3 5 7Z" />
    <circle cx="17.5" cy="6.5" r="1.5" />
  </svg>
);
const GlobeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" />
  </svg>
);
const WaveIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M2 9c1.5-1.7 3.5-1.7 5 0s3.5 1.7 5 0 3.5-1.7 5 0 3.5 1.7 5 0" />
    <path d="M2 15c1.5-1.7 3.5-1.7 5 0s3.5 1.7 5 0 3.5-1.7 5 0 3.5 1.7 5 0" />
  </svg>
);
const CameraIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13" r="3.3" />
  </svg>
);
const BrainIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M9 4.5a2.5 2.5 0 0 0-2.5 2.5v.2A2.8 2.8 0 0 0 5 9.7v.6a2.6 2.6 0 0 0-1 4.6 2.7 2.7 0 0 0 1.9 3.6c.4 1.4 1.7 2.5 3.1 2.5" />
    <path d="M15 4.5a2.5 2.5 0 0 1 2.5 2.5v.2a2.8 2.8 0 0 1 1.5 2.5v.6a2.6 2.6 0 0 1 1 4.6 2.7 2.7 0 0 1-1.9 3.6c-.4 1.4-1.7 2.5-3.1 2.5" />
    <path d="M9 4.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2M12 4.5v15" />
  </svg>
);
const SparkleSendIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="2.3" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

interface ExperienceTile {
  label: string;
  icon: React.ReactNode;
  gradient: string;
}

const EXPERIENCES: ExperienceTile[] = [
  { label: "Adventure Sports", icon: <WindIcon />, gradient: "from-orange-500 to-red-500" },
  { label: "Wildlife Safari", icon: <CompassIcon />, gradient: "from-green-500 to-emerald-500" },
  { label: "Mountain Trek", icon: <MountainIcon />, gradient: "from-blue-500 to-indigo-500" },
  { label: "Cultural Tours", icon: <GlobeIcon />, gradient: "from-purple-500 to-violet-500" },
  { label: "Scuba Diving", icon: <WaveIcon />, gradient: "from-cyan-400 to-sky-500" },
  { label: "Photography", icon: <CameraIcon />, gradient: "from-pink-500 to-rose-500" },
];

const SUGGESTIONS = [
  "7-day Japan itinerary",
  "Beach under ₹50,000",
  "Best winter destinations",
  "Solo Europe backpacking",
];

const PLACEHOLDER_PROMPTS = [
  "Plan my honeymoon in Switzerland under ₹2,00,000",
  "5-day family trip to Goa on a budget",
  "Adventure trip to New Zealand for 2 weeks",
  "Weekend getaway near me, under ₹15,000",
];

/* -------------------------------- Component ------------------------------- */

const ExploreExperiencesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const plannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_PROMPTS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleTileMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const tile = tileRefs.current[index];
    if (!tile) return;
    const rect = tile.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    tile.style.setProperty("--rx", `${y}deg`);
    tile.style.setProperty("--ry", `${x}deg`);
  };
  const resetTile = (index: number) => {
    const tile = tileRefs.current[index];
    if (!tile) return;
    tile.style.setProperty("--rx", `0deg`);
    tile.style.setProperty("--ry", `0deg`);
  };

  const handlePlannerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = plannerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const applySuggestion = (text: string) => setQuery(text);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes expFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes expBrainFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes expGlowPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes expPlaceholderFade {
          0% { opacity: 0; transform: translateY(4px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
        @keyframes expCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .exp-fade-up { opacity: 0; }
        .exp-fade-up.is-visible { animation: expFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .exp-blob { animation: expBlobFloat 10s ease-in-out infinite; }

        .exp-tile {
          --rx: 0deg;
          --ry: 0deg;
          transform: perspective(600px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(0);
          transition: transform 0.25s ease-out, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        .exp-tile:hover {
          box-shadow: 0 18px 34px -14px rgba(0,0,0,0.55);
        }
        .exp-tile-icon {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .exp-tile:hover .exp-tile-icon {
          transform: scale(1.15) rotate(-6deg);
        }
        .exp-tile-label {
          transition: color 0.25s ease;
        }
        .exp-tile-wrap:hover .exp-tile-label {
          color: rgba(255,255,255,0.9);
        }

        .exp-planner-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          overflow: hidden;
        }
        .exp-planner-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(420px circle at var(--mx) var(--my), rgba(168,85,247,0.14), transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .exp-planner-card:hover::before { opacity: 1; }

        .exp-brain-badge {
          animation: expBrainFloat 4s ease-in-out infinite;
        }
        .exp-brain-glow {
          animation: expGlowPulse 2.4s ease-in-out infinite;
        }

        .exp-input-wrap {
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .exp-input-wrap.is-focused {
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 0 0 4px rgba(168,85,247,0.12);
        }

        .exp-placeholder {
          animation: expPlaceholderFade 3.2s ease-in-out infinite;
        }
        .exp-caret {
          animation: expCaret 1s step-start infinite;
        }

        .exp-plan-btn {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .exp-plan-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px -8px rgba(168,85,247,0.6);
        }
        .exp-plan-btn:active { transform: translateY(0) scale(0.96); }

        .exp-chip {
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .exp-chip:hover {
          border-color: rgba(168,85,247,0.4);
          color: rgba(255,255,255,0.9);
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-fade-up { opacity: 1; animation: none !important; }
          .exp-blob { animation: none; }
          .exp-tile { transform: none !important; }
          .exp-tile:hover .exp-tile-icon { transform: none; }
          .exp-brain-badge, .exp-brain-glow { animation: none; }
          .exp-placeholder { animation: none; opacity: 1; }
          .exp-caret { animation: none; }
          .exp-plan-btn:hover { transform: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="exp-blob pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[110px]" />
      <div aria-hidden className="exp-blob pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" style={{ animationDelay: "3.5s" }} />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">
          <p
            className={`exp-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
            style={{ animationDelay: "0s" }}
          >
            Beyond The Ordinary
          </p>
          <h2
            className={`exp-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
            style={{ animationDelay: "0.1s" }}
          >
            Explore Experiences
          </h2>
        </div>

        {/* Experience tiles */}
        <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.label}
              className={`exp-fade-up exp-tile-wrap ${isVisible ? "is-visible" : ""} flex flex-col items-center`}
              style={{ animationDelay: `${0.2 + i * 0.06}s` }}
            >
              <div
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                onMouseMove={(e) => handleTileMouseMove(e, i)}
                onMouseLeave={() => resetTile(i)}
                className={`exp-tile flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br ${exp.gradient} text-white sm:h-24 sm:w-24`}
              >
                <div className="exp-tile-icon">{exp.icon}</div>
              </div>
              <p className="exp-tile-label mt-2.5 text-center text-[11px] font-medium text-white/50">
                {exp.label}
              </p>
            </div>
          ))}
        </div>

        {/* AI Travel Planner card */}
        <div
          ref={plannerRef}
          onMouseMove={handlePlannerMouseMove}
          className={`exp-fade-up exp-planner-card ${isVisible ? "is-visible" : ""} mt-20 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-14 text-center sm:px-12`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="relative mx-auto flex h-12 w-12 items-center justify-center">
            <div className="exp-brain-glow absolute inset-0 rounded-2xl bg-purple-500/40 blur-lg" />
            <div className="exp-brain-badge relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-900/40">
              <BrainIcon />
            </div>
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80">
            Powered by AI
          </p>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Your Personal
            <br />
            Travel Planner
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/45">
            Ask anything — destination ideas, budget itineraries, honeymoon plans, adventure
            routes. Our AI builds a complete plan in seconds.
          </p>

          {/* Input */}
          <div className="mx-auto mt-7 flex max-w-xl flex-col gap-2.5 sm:flex-row">
            <div
              className={`exp-input-wrap relative flex flex-1 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-left ${
                isFocused ? "is-focused" : ""
              }`}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-transparent"
              />
              {!query && !isFocused && (
                <span
                  key={placeholderIndex}
                  className="exp-placeholder pointer-events-none absolute left-4 text-sm text-white/35"
                >
                  Try: "{PLACEHOLDER_PROMPTS[placeholderIndex]}"
                </span>
              )}
              {!query && isFocused && (
                <span className="pointer-events-none absolute left-4 text-sm text-white/35">
                  Type your travel idea
                  <span className="exp-caret">|</span>
                </span>
              )}
            </div>
            <button
              type="button"
              className="exp-plan-btn flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white"
            >
              <SparkleSendIcon />
              Plan
            </button>
          </div>

          {/* Suggestion chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => applySuggestion(s)}
                className="exp-chip rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/45"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreExperiencesSection;
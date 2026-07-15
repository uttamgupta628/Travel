import React, { useEffect, useRef, useState } from "react";

/**
 * Images are served through Cloudinary (auto format/quality + smart
 * cropping), reusing confirmed public "demo" cloud assets, with an
 * onError fallback to a colored gradient if an asset fails to load.
 * Swap the `cld(...)` public IDs for your own Cloudinary cloud name +
 * uploaded experience photos whenever ready.
 */
const cld = (publicId: string) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_500,h_600,c_fill,g_auto/${publicId}`;

interface Experience {
  image: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  count: number;
  unit: string;
}

/* ---------------------------------- Icons --------------------------------- */

const MountainIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="m3 18 6-9 4 6 3-4 5 7Z" />
  </svg>
);
const ForkIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M18 3c-2 1-3 3-3 6s1 3 3 3v9" />
  </svg>
);
const AnchorIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v14M5 12H2a10 10 0 0 0 20 0h-3M5 12a7 7 0 0 0 7 9M19 12a7 7 0 0 1-7 9" />
  </svg>
);
const SunIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);
const PeakIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="m8 3 4 6 4-6 5 16H3Z" />
    <path d="m9 12-2 7M15 12l2 7" />
  </svg>
);
const DiveIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M3 12c3-4 6-4 9 0s6 4 9 0" />
    <path d="M3 17c3-4 6-4 9 0s6 4 9 0" />
    <circle cx="18" cy="6" r="2" />
  </svg>
);
const CamelIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M3 20c2-1 3-3 3-5 0-3 2-5 4-5 1 0 1.5.6 1.5 1.5S11 13 10 13c1 0 2 1 3 1s2-2 3-3 3-1 4 1c.6 1.2 0 2-1 2v5" />
  </svg>
);
const WineIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M8 3h8l-1 7a3 3 0 0 1-6 0Z" />
    <path d="M12 12v6M9 21h6" />
  </svg>
);
const CameraIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 8h3l2-3h6l2 3h3v11H4Z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);
const GlobeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
  </svg>
);
const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const EXPERIENCES: Experience[] = [
  { image: cld("pm/hikers_mts.jpg"), icon: <MountainIcon />, iconBg: "bg-emerald-500", title: "Adventure Trips", count: 240, unit: "trips" },
  { image: cld("samples/food/dessert"), icon: <ForkIcon />, iconBg: "bg-orange-500", title: "Food Tours", count: 180, unit: "tours" },
  { image: cld("samples/landscapes/beach-boat"), icon: <AnchorIcon />, iconBg: "bg-sky-500", title: "Cruises", count: 95, unit: "cruises" },
  { image: cld("pm/mountains_autumn.jpg"), icon: <SunIcon />, iconBg: "bg-amber-500", title: "Safari Adventures", count: 130, unit: "safaris" },
  { image: cld("samples/landscapes/nature-mountains"), icon: <PeakIcon />, iconBg: "bg-teal-500", title: "Mountain Trekking", count: 310, unit: "treks" },
  { image: cld("samples/animals/three-dogs"), icon: <DiveIcon />, iconBg: "bg-cyan-500", title: "Scuba Diving", count: 140, unit: "dives" },
  { image: cld("samples/landscapes/architecture-signs"), icon: <CamelIcon />, iconBg: "bg-yellow-500", title: "Desert Safari", count: 90, unit: "safaris" },
  { image: cld("pm/kitchen.jpg"), icon: <WineIcon />, iconBg: "bg-fuchsia-500", title: "Wine Tours", count: 120, unit: "tours" },
  { image: cld("samples/landscapes/girl-urban-view"), icon: <CameraIcon />, iconBg: "bg-blue-500", title: "Cultural Walks", count: 270, unit: "walks" },
  { image: cld("pm/woman_car.jpg"), icon: <GlobeIcon />, iconBg: "bg-indigo-500", title: "Local Experiences", count: 400, unit: "spots" },
];

/* ------------------------------- Count-up hook ----------------------------- */

const useCountUp = (target: number, start: boolean, duration = 1400) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
};

/* --------------------------------- Card ---------------------------------- */

const ExperienceCard: React.FC<{ exp: Experience; index: number; sectionVisible: boolean }> = ({
  exp,
  index,
  sectionVisible,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [failed, setFailed] = useState(false);
  const count = useCountUp(exp.count, revealed, 1200 + index * 60);

  // Per-card blur-up reveal, staggered by its own position in the grid —
  // a different entrance technique (blur + scale settle) than the
  // fade-up-on-a-timer pattern used elsewhere on the page.
  useEffect(() => {
    if (!sectionVisible) return;
    const timer = setTimeout(() => setRevealed(true), 120 + index * 90);
    return () => clearTimeout(timer);
  }, [sectionVisible, index]);

  return (
    <div
      ref={cardRef}
      className={`ce-card group relative overflow-hidden rounded-2xl ${revealed ? "is-revealed" : ""}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-800">
        {!failed ? (
          <img
            src={exp.image}
            alt={exp.title}
            loading="lazy"
            onError={() => setFailed(true)}
            className="ce-card-img absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, hsl(${(index * 53) % 360} 40% 24%), hsl(${(index * 53 + 40) % 360} 35% 12%))`,
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Hover curtain wipe — a sliding tint that rises from the bottom,
            distinct from the diagonal shine-sweep used on other sections. */}
        <div className="ce-curtain absolute inset-x-0 bottom-0 h-full" />

        {/* Explore CTA revealed by the curtain */}
        <div className="ce-explore absolute inset-x-0 bottom-3 flex translate-y-3 items-center justify-center gap-1 text-xs font-semibold text-white opacity-0">
          Explore
          <ArrowRightIcon />
        </div>

        {/* Icon badge — flips in on a Y-axis rather than popping/bouncing */}
        <div
          className={`ce-icon-badge absolute -bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg ${exp.iconBg}`}
        >
          {exp.icon}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 pl-14">
          <h3 className="text-sm font-bold text-white">{exp.title}</h3>
          <p className="text-[11px] text-white/60">
            {count}+ {exp.unit}
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- Component ------------------------------- */

const CuratedExperiencesSection: React.FC = () => {
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
      { threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-8 lg:px-16"
      style={{ backgroundColor: "#0D1B3E" }}
    >
      <style>{`
        @keyframes ceLineExpand { to { width: 32px; } }
        @keyframes ceTextGlow {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }

        .ce-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: ceLineExpand 0.7s ease-out forwards;
        }
        .ce-eyebrow-line.right { animation-delay: 0.1s; }
        .ce-eyebrow-text { animation: ceTextGlow 3s ease-in-out infinite; }

        .ce-heading, .ce-sub {
          opacity: 0;
          filter: blur(6px);
          transform: translateY(10px);
          transition: opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease;
        }
        .ce-section-visible .ce-heading { opacity: 1; filter: blur(0); transform: translateY(0); transition-delay: 0.15s; }
        .ce-section-visible .ce-sub { opacity: 1; filter: blur(0); transform: translateY(0); transition-delay: 0.28s; }

        /* Blur-up reveal for each card: starts soft-focus and slightly
           zoomed, then settles into sharp focus — a different feel from
           a simple translateY fade. */
        .ce-card {
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .ce-card.is-revealed { opacity: 1; transform: scale(1); }
        .ce-card-img {
          filter: blur(10px) saturate(0.8);
          transform: scale(1.15);
          transition: filter 0.9s ease, transform 1.1s cubic-bezier(0.22,1,0.36,1);
        }
        .ce-card.is-revealed .ce-card-img { filter: blur(0) saturate(1); transform: scale(1.06); }
        .ce-card:hover .ce-card-img { transform: scale(1.14); }

        /* Rising curtain reveal on hover */
        .ce-curtain {
          background: linear-gradient(180deg, transparent 0%, rgba(201,151,74,0.0) 40%, rgba(13,27,62,0.55) 100%);
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .ce-card:hover .ce-curtain { clip-path: inset(55% 0 0 0); }
        .ce-card:hover .ce-explore { opacity: 1; transform: translateY(0); transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s; }

        /* Icon badge flip-in on the Y axis, staggered after its card settles */
        .ce-icon-badge {
          opacity: 0;
          transform: perspective(400px) rotateY(90deg) scale(0.7);
          transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ce-card.is-revealed .ce-icon-badge {
          opacity: 1;
          transform: perspective(400px) rotateY(0deg) scale(1);
          transition-delay: 0.35s;
        }
        .ce-card:hover .ce-icon-badge {
          transform: perspective(400px) rotateY(0deg) scale(1.12) translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .ce-eyebrow-line { animation: none; width: 32px; }
          .ce-eyebrow-text { animation: none; }
          .ce-heading, .ce-sub { opacity: 1; filter: none; transform: none; transition: none; }
          .ce-card { opacity: 1; transform: none; transition: none; }
          .ce-card-img { filter: none; transform: none; transition: none; }
          .ce-card:hover .ce-card-img { transform: none; }
          .ce-icon-badge { opacity: 1; transform: none; transition: none; }
          .ce-card:hover .ce-icon-badge { transform: none; }
        }
      `}</style>

      <div className={`relative mx-auto max-w-7xl ${isVisible ? "ce-section-visible" : ""}`}>
        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9974A" }}>
            <span className="ce-eyebrow-line left" />
            <span className="ce-eyebrow-text">Beyond the Ordinary</span>
            <span className="ce-eyebrow-line right" />
          </p>
          <h2 className="ce-heading mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Curated Experiences
          </h2>
          <p className="ce-sub mt-3 text-sm text-white/50">
            From summit treks to underwater worlds — find your next defining adventure.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.title} exp={exp} index={i} sectionVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedExperiencesSection;
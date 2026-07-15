import React, { useEffect, useRef, useState } from "react";

/**
 * Images are served through Cloudinary (auto format/quality + smart
 * cropping), using the same confirmed public "demo" cloud assets as the
 * Dream Destinations section, with an onError fallback to a colored
 * gradient if a specific asset ever fails to load. Swap the `cld(...)`
 * public IDs for your own Cloudinary cloud name + uploaded package photos
 * whenever you have them.
 */
const cld = (publicId: string) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_700,h_500,c_fill,g_auto/${publicId}`;

interface Package {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  stops: string[];
  rating: number;
  reviews: string;
  features: { icon: React.ReactNode; label: string }[];
  price: string;
  originalPrice: string;
}

/* ---------------------------------- Icons --------------------------------- */

const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
  </svg>
);
const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <circle cx="9" cy="7.5" r="2.5" />
    <path d="M2.5 19v-1a3.5 3.5 0 0 1 3.5-3.5h6a3.5 3.5 0 0 1 3.5 3.5v1" />
  </svg>
);
const MountainIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="m3 18 6-9 4 6 3-4 5 7Z" />
  </svg>
);
const TrainIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <rect x="5" y="3" width="14" height="12" rx="3" />
    <path d="M5 11h14M9 19l-2 2M15 19l2 2" />
  </svg>
);
const TempleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 2v3M4 9l8-4 8 4M3 21h18M5 21V9h14v12" />
  </svg>
);
const LeafIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M4 20c8 0 13-5 13-13V4h-3C6 4 4 12 4 20Z" />
  </svg>
);
const SpaIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 3c2 3 2 5 0 7-2-2-2-4 0-7Z" />
    <path d="M5 12c2.5 1 4 3 4 6M19 12c-2.5 1-4 3-4 6M12 12v7" />
  </svg>
);
const SnowIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
  </svg>
);
const CableCarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M2 5l20 3" />
    <rect x="7" y="9" width="6" height="5" rx="1" />
    <path d="M9 9V6.5M11 9V7" />
  </svg>
);
const FondueIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M4 14h16l-2 6H6l-2-6Z" />
    <path d="M12 14V8M9 8s0-3 3-3 3 3 3 3" />
  </svg>
);
const SunsetIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M3 17h18M6 17a6 6 0 0 1 12 0M12 8v3M8.5 9.5l1.8 1.8M15.5 9.5l-1.8 1.8" />
  </svg>
);
const RuinsIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M4 21V9M9 21V9M15 21V9M20 21V9M3 9l9-6 9 6M3 21h18" />
  </svg>
);
const IslandIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M12 15V5M9 8l3-3 3 3" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const PACKAGES: Package[] = [
  {
    image: cld("pm/japan.jpg"),
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
    title: "Golden Japan Journey",
    stops: ["Tokyo", "Kyoto", "Osaka", "Nara"],
    rating: 4.9,
    reviews: "1.1k",
    features: [
      { icon: <UsersIcon />, label: "Small Group" },
      { icon: <MountainIcon />, label: "Mount Fuji" },
      { icon: <TrainIcon />, label: "Bullet Train" },
    ],
    price: "$3,299",
    originalPrice: "$4,199",
  },
  {
    image: cld("pm/hikers_mts.jpg"),
    badge: "Hot Deal",
    badgeColor: "bg-orange-500",
    title: "Bali Bliss Retreat",
    stops: ["Seminyak", "Ubud", "Nusa Dua"],
    rating: 4.8,
    reviews: "890",
    features: [
      { icon: <TempleIcon />, label: "Temple Tours" },
      { icon: <LeafIcon />, label: "Rice Terrace Trek" },
      { icon: <SpaIcon />, label: "Spa Day" },
    ],
    price: "$1,899",
    originalPrice: "$2,499",
  },
  {
    image: cld("pm/mountains_autumn.jpg"),
    badge: "Premium",
    badgeColor: "bg-violet-600",
    title: "Swiss Alps Explorer",
    stops: ["Zurich", "Interlaken", "Zermatt", "Geneva"],
    rating: 4.9,
    reviews: "740",
    features: [
      { icon: <SnowIcon />, label: "Glacier Walk" },
      { icon: <CableCarIcon />, label: "Cable Car Ride" },
      { icon: <FondueIcon />, label: "Fondue Night" },
    ],
    price: "$4,599",
    originalPrice: "$5,999",
  },
  {
    image: cld("samples/landscapes/architecture-signs"),
    badge: "Luxury",
    badgeColor: "bg-teal-600",
    title: "Mediterranean Escape",
    stops: ["Santorini", "Athens", "Mykonos"],
    rating: 4.9,
    reviews: "1.3k",
    features: [
      { icon: <SunsetIcon />, label: "Caldera Sunset" },
      { icon: <RuinsIcon />, label: "Ancient Ruins" },
      { icon: <IslandIcon />, label: "Island Hop" },
    ],
    price: "$2,999",
    originalPrice: "$3,799",
  },
];

/* -------------------------------- Component ------------------------------- */

const HolidayPackagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

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

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-8 lg:px-16"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <style>{`
        @keyframes hpFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hpLineGrow { to { width: 24px; } }
        @keyframes hpShine {
          0% { transform: translateX(-130%) skewX(-12deg); }
          100% { transform: translateX(160%) skewX(-12deg); }
        }
        @keyframes hpBadgeShimmer {
          0% { background-position: -120% 0; }
          100% { background-position: 220% 0; }
        }

        .hp-fade-up { opacity: 0; }
        .hp-fade-up.is-visible { animation: hpFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }

        .hp-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: hpLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .hp-card {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .hp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px -16px rgba(30, 41, 59, 0.22);
        }
        .hp-card:hover .hp-card-img { transform: scale(1.1); }
        .hp-card:hover .hp-shine { animation: hpShine 1s ease forwards; }
        .hp-shine {
          position: absolute;
          inset: -20% -60%;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%);
          pointer-events: none;
        }

        .hp-badge-shimmer {
          background-image: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          background-size: 250% 100%;
          animation: hpBadgeShimmer 3s ease-in-out infinite;
        }

        .hp-view-link { position: relative; }
        .hp-view-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1px;
          width: 0;
          background: #C9974A;
          transition: width 0.25s ease;
        }
        .hp-view-link:hover::after { width: 100%; }
        .hp-view-link:hover .hp-arrow { transform: translateX(3px); }
        .hp-arrow { transition: transform 0.25s ease; display: inline-block; }

        .hp-btn {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .hp-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -6px rgba(27,42,74,0.45); }
        .hp-btn:hover .hp-btn-arrow { transform: translateX(3px); }
        .hp-btn-arrow { transition: transform 0.25s ease; display: inline-block; }

        @media (prefers-reduced-motion: reduce) {
          .hp-fade-up { opacity: 1; animation: none !important; }
          .hp-card:hover { transform: none; }
          .hp-card:hover .hp-card-img { transform: none; }
          .hp-card:hover .hp-shine { animation: none; }
          .hp-badge-shimmer { animation: none; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p
              className={`hp-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
              style={{ animationDelay: "0s", color: "#C9974A" }}
            >
              <span className="hp-eyebrow-line" />
              Handcrafted
            </p>
            <h2
              className={`hp-fade-up ${isVisible ? "is-visible" : ""} mt-2 font-serif text-3xl font-bold sm:text-4xl`}
              style={{ animationDelay: "0.08s", color: "#1B2A4A" }}
            >
              Holiday Packages
            </h2>
            <p
              className={`hp-fade-up ${isVisible ? "is-visible" : ""} mt-2 text-sm text-gray-500`}
              style={{ animationDelay: "0.14s" }}
            >
              All-inclusive journeys expertly curated for unforgettable memories.
            </p>
          </div>

          <a
            href="#"
            className={`hp-fade-up ${isVisible ? "is-visible" : ""} hp-view-link flex items-center gap-1.5 text-sm font-semibold`}
            style={{ animationDelay: "0.2s", color: "#C9974A" }}
          >
            View All Packages
            <span className="hp-arrow">
              <ArrowRightIcon />
            </span>
          </a>
        </div>

        {/* Package cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.title}
              className={`hp-fade-up hp-card ${isVisible ? "is-visible" : ""} overflow-hidden rounded-2xl bg-white shadow-md shadow-black/5`}
              style={{ animationDelay: `${0.28 + i * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {!failedImages[i] ? (
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    onError={() => setFailedImages((prev) => ({ ...prev, [i]: true }))}
                    className="hp-card-img absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(i * 63) % 360} 45% 32%), hsl(${(i * 63 + 40) % 360} 40% 18%))`,
                    }}
                  />
                )}

                <div className="hp-shine" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                <span
                  className={`hp-badge-shimmer absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${pkg.badgeColor}`}
                >
                  {pkg.badge}
                </span>

                <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <span className="text-amber-400">
                    <StarIcon />
                  </span>
                  {pkg.rating} · {pkg.reviews}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-bold" style={{ color: "#1B2A4A" }}>
                  {pkg.title}
                </h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {pkg.stops.map((stop) => (
                    <span
                      key={stop}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                    >
                      {stop}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                  <span className="ml-1 text-[11px] font-medium text-gray-400">Hotel Rating</span>
                </div>

                <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                  {pkg.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span style={{ color: "#C9974A" }}>{f.icon}</span>
                      {f.label}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Starting from
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-base font-extrabold" style={{ color: "#1B2A4A" }}>
                        {pkg.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">{pkg.originalPrice}</span>
                    </p>
                  </div>
                  <button
                    className="hp-btn flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#1B2A4A" }}
                  >
                    View Package
                    <span className="hp-btn-arrow">
                      <ArrowRightIcon />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidayPackagesSection;
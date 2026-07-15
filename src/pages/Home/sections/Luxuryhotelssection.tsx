import React, { useEffect, useRef, useState } from "react";

/**
 * Images are served through Cloudinary (auto format/quality + smart
 * cropping), reusing the same confirmed public "demo" cloud assets as the
 * other sections, with an onError fallback to a colored gradient if a
 * specific asset ever fails to load. Swap the `cld(...)` public IDs for
 * your own Cloudinary cloud name + uploaded hotel photos whenever ready.
 */
const cld = (publicId: string) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_600,h_600,c_fill,g_auto/${publicId}`;

interface Hotel {
  image: string;
  badge: string;
  badgeColor: string;
  name: string;
  location: string;
  rating: number;
  reviews: string;
  amenities: string[];
  price: string;
}

/* ---------------------------------- Icons --------------------------------- */

const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
  </svg>
);
const PinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
  </svg>
);
const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const HOTELS: Hotel[] = [
  {
    image: cld("pm/japan.jpg"),
    badge: "Iconic",
    badgeColor: "bg-amber-500",
    name: "Aman Tokyo",
    location: "Tokyo, Japan",
    rating: 5,
    reviews: "842",
    amenities: ["Infinity Pool", "Spa", "Fine Dining", "Concierge"],
    price: "$899",
  },
  {
    image: cld("samples/landscapes/beach-boat"),
    badge: "Overwater",
    badgeColor: "bg-sky-500",
    name: "Six Senses Laamu",
    location: "Laamu, Maldives",
    rating: 5,
    reviews: "513",
    amenities: ["Overwater Villa", "Dining", "Spa", "Observatory"],
    price: "$1,299",
  },
  {
    image: cld("samples/landscapes/architecture-signs"),
    badge: "Ultra-Luxury",
    badgeColor: "bg-rose-500",
    name: "Burj Al Arab",
    location: "Dubai, UAE",
    rating: 5,
    reviews: "2,214",
    amenities: ["Butler Service", "Helipad", "Beach Club", "10 Restaurants"],
    price: "$1,799",
  },
  {
    image: cld("pm/mountains_autumn.jpg"),
    badge: "Mountain",
    badgeColor: "bg-emerald-600",
    name: "Le Grand Bellevue",
    location: "Gstaad, Switzerland",
    rating: 4.9,
    reviews: "377",
    amenities: ["Ski-in/Ski-out", "Spa", "Alpine Dining", "Pool"],
    price: "$1,099",
  },
];

/* -------------------------------- Component ------------------------------- */

const LuxuryHotelsSection: React.FC = () => {
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
        @keyframes lhFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lhLineGrow { to { width: 24px; } }
        @keyframes lhShine {
          0% { transform: translateX(-130%) skewX(-12deg); }
          100% { transform: translateX(160%) skewX(-12deg); }
        }
        @keyframes lhBadgeShimmer {
          0% { background-position: -120% 0; }
          100% { background-position: 220% 0; }
        }
        @keyframes lhStarPop {
          0% { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          70% { opacity: 1; transform: scale(1.15) rotate(6deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .lh-fade-up { opacity: 0; }
        .lh-fade-up.is-visible { animation: lhFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }

        .lh-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: lhLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .lh-card {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .lh-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px -18px rgba(30, 41, 59, 0.22);
        }
        .lh-card:hover .lh-card-img { transform: scale(1.1); }
        .lh-card:hover .lh-shine { animation: lhShine 1s ease forwards; }
        .lh-shine {
          position: absolute;
          inset: -20% -60%;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%);
          pointer-events: none;
        }

        .lh-badge-shimmer {
          background-image: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          background-size: 250% 100%;
          animation: lhBadgeShimmer 3s ease-in-out infinite;
        }

        .lh-fade-up.is-visible .lh-star {
          opacity: 0;
          animation: lhStarPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        .lh-amenity {
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .lh-amenity:hover {
          background-color: rgba(201, 151, 74, 0.14);
          color: #A87526;
        }

        .lh-btn { transition: transform 0.2s ease, box-shadow 0.3s ease; }
        .lh-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -6px rgba(27,42,74,0.45); }
        .lh-btn:hover .lh-btn-arrow { transform: translateX(3px); }
        .lh-btn-arrow { transition: transform 0.25s ease; display: inline-block; }

        .lh-view-link { position: relative; }
        .lh-view-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1px;
          width: 0;
          background: #C9974A;
          transition: width 0.25s ease;
        }
        .lh-view-link:hover::after { width: 100%; }
        .lh-view-link:hover .lh-arrow { transform: translateX(3px); }
        .lh-arrow { transition: transform 0.25s ease; display: inline-block; }

        @media (prefers-reduced-motion: reduce) {
          .lh-fade-up { opacity: 1; animation: none !important; }
          .lh-card:hover { transform: none; }
          .lh-card:hover .lh-card-img { transform: none; }
          .lh-card:hover .lh-shine { animation: none; }
          .lh-badge-shimmer { animation: none; }
          .lh-fade-up.is-visible .lh-star { opacity: 1; animation: none !important; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p
              className={`lh-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
              style={{ animationDelay: "0s", color: "#C9974A" }}
            >
              <span className="lh-eyebrow-line" />
              World's Finest
            </p>
            <h2
              className={`lh-fade-up ${isVisible ? "is-visible" : ""} mt-2 font-serif text-3xl font-bold sm:text-4xl`}
              style={{ animationDelay: "0.08s", color: "#1B2A4A" }}
            >
              Luxury Hotels
            </h2>
            <p
              className={`lh-fade-up ${isVisible ? "is-visible" : ""} mt-2 text-sm text-gray-500`}
              style={{ animationDelay: "0.14s" }}
            >
              Handpicked properties where every detail tells a story of excellence.
            </p>
          </div>

          <a
            href="#"
            className={`lh-fade-up ${isVisible ? "is-visible" : ""} lh-view-link flex items-center gap-1.5 text-sm font-semibold`}
            style={{ animationDelay: "0.2s", color: "#C9974A" }}
          >
            Explore All Hotels
            <span className="lh-arrow">
              <ArrowRightIcon />
            </span>
          </a>
        </div>

        {/* Hotel cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {HOTELS.map((hotel, i) => (
            <div
              key={hotel.name}
              className={`lh-fade-up lh-card ${isVisible ? "is-visible" : ""} flex overflow-hidden rounded-2xl bg-white shadow-md shadow-black/5`}
              style={{ animationDelay: `${0.26 + i * 0.09}s` }}
            >
              {/* Image */}
              <div className="relative w-36 shrink-0 overflow-hidden sm:w-44">
                {!failedImages[i] ? (
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    onError={() => setFailedImages((prev) => ({ ...prev, [i]: true }))}
                    className="lh-card-img absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(i * 71) % 360} 45% 32%), hsl(${(i * 71 + 40) % 360} 40% 18%))`,
                    }}
                  />
                )}
                <div className="lh-shine" />
                <span
                  className={`lh-badge-shimmer absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm ${hotel.badgeColor}`}
                >
                  {hotel.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold" style={{ color: "#1B2A4A" }}>
                      {hotel.name}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-600">
                      <StarIcon />
                      {hotel.rating}
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                    <PinIcon />
                    {hotel.location}
                  </p>

                  <div className="mt-1.5 flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span
                        key={s}
                        className="lh-star"
                        style={{ animationDelay: `${0.4 + i * 0.09 + s * 0.05}s` }}
                      >
                        <StarIcon />
                      </span>
                    ))}
                    <span className="ml-1 text-[11px] text-gray-400">({hotel.reviews} reviews)</span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {hotel.amenities.map((a) => (
                      <span
                        key={a}
                        className="lh-amenity rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Per night from
                    </p>
                    <p className="text-base font-extrabold" style={{ color: "#1B2A4A" }}>
                      {hotel.price}
                    </p>
                  </div>
                  <button
                    className="lh-btn flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#1B2A4A" }}
                  >
                    Book Now
                    <span className="lh-btn-arrow">
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

export default LuxuryHotelsSection;
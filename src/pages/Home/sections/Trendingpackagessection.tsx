import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const StarIcon: React.FC<{ half?: boolean; empty?: boolean }> = ({ half, empty }) => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
    <defs>
      <linearGradient id="starHalfGrad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.6 5.9 20.6l1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z"
      fill={empty ? "none" : half ? "url(#starHalfGrad)" : "currentColor"}
      stroke="currentColor"
      strokeWidth={empty ? 1.2 : 0}
    />
  </svg>
);
const ClockIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
const RouteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M5 8v3a4 4 0 0 0 4 4h6a4 4 0 0 1 4 3" />
  </svg>
);


/* --------------------------------- Data --------------------------------- */

type BadgeType = "Bestseller" | "Hot Deal" | "Seasonal";

interface Package {
  title: string;
  badge: BadgeType;
  duration: string;
  route: string;
  tags: string[];
  rating: number;
  reviews: number;
  price: string;
  image: string;
}

// Same pattern used across the site: direct working photo URLs, with a
// documented path to swap in your own Cloudinary-hosted assets later.
// Set CLOUD_NAME + use cld("your_public_id") once your Cloudinary account is ready.
const CLOUD_NAME = "";
const cld = (publicIdOrUrl: string) =>
  CLOUD_NAME
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_900,h_650,c_fill,g_auto/${publicIdOrUrl}`
    : publicIdOrUrl;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80&auto=format&fit=crop";

const PACKAGES: Package[] = [
  {
    title: "Swiss Alps Luxury Escape",
    badge: "Bestseller",
    duration: "7N / 8D",
    route: "Zurich · Interlaken · Lucerne",
    tags: ["Flights", "5★ Hotels", "Guided Tours"],
    rating: 4.0,
    reviews: 380,
    price: "₹95,000",
    image: cld(
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=900&q=80&auto=format&fit=crop"
    ),
  },
  {
    title: "Bali Wellness Retreat",
    badge: "Hot Deal",
    duration: "5N / 6D",
    route: "Ubud · Seminyak · Nusa Dua",
    tags: ["Flights", "Resort Stay", "Spa Credits"],
    rating: 4.0,
    reviews: 615,
    price: "₹42,500",
    image: cld(
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80&auto=format&fit=crop"
    ),
  },
  {
    title: "Japan Cherry Blossom Tour",
    badge: "Seasonal",
    duration: "8N / 9D",
    route: "Tokyo · Kyoto · Osaka",
    tags: ["Flights", "Boutique Hotels", "Rail Pass"],
    rating: 5.0,
    reviews: 295,
    price: "₹68,000",
    image: cld(
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80&auto=format&fit=crop"
    ),
  },
];

const BADGE_STYLES: Record<BadgeType, string> = {
  Bestseller: "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white",
  "Hot Deal": "bg-gradient-to-r from-rose-500 to-orange-400 text-white",
  Seasonal: "bg-gradient-to-r from-sky-500 to-cyan-400 text-white",
};

/* -------------------------------- Component ------------------------------- */

const TrendingPackagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

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

  const markLoaded = (title: string) => {
    setLoadedImages((prev) => new Set(prev).add(title));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<StarIcon key={i} />);
      else if (rating >= i - 0.5) stars.push(<StarIcon key={i} half />);
      else stars.push(<StarIcon key={i} empty />);
    }
    return stars;
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes pkgFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pkgBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes pkgShimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pkgBadgeIn {
          0% { opacity: 0; transform: translateY(-6px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pkgPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(168,85,247,0); }
        }

        .pkg-fade-up { opacity: 0; }
        .pkg-fade-up.is-visible { animation: pkgFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pkg-blob { animation: pkgBlobFloat 10s ease-in-out infinite; }

        .pkg-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.45s ease;
        }
        .pkg-card:hover {
          transform: translateY(-8px);
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: 0 24px 48px -18px rgba(0,0,0,0.65), 0 0 0 1px rgba(168,85,247,0.1);
        }
        .pkg-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: inherit;
          background: radial-gradient(280px circle at var(--mx) var(--my), rgba(168,85,247,0.16), transparent 65%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .pkg-card:hover::before { opacity: 1; }

        .pkg-img-wrap { overflow: hidden; }
        .pkg-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .pkg-card:hover .pkg-img { transform: scale(1.08); }

        .pkg-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 0px,
            rgba(255,255,255,0.08) 40px,
            rgba(255,255,255,0.03) 80px
          );
          background-size: 800px 100%;
          animation: pkgShimmer 1.6s infinite linear;
        }

        .pkg-fade-up.is-visible .pkg-badge {
          animation: pkgBadgeIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .pkg-tag {
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .pkg-card:hover .pkg-tag {
          border-color: rgba(168,85,247,0.3);
          color: rgba(255,255,255,0.85);
        }

        .pkg-cta {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.25s ease;
        }
        .pkg-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(168,85,247,0.55);
        }
        .pkg-cta:active { transform: translateY(0) scale(0.97); }

        .pkg-overlay {
          background: linear-gradient(180deg, rgba(8,12,26,0) 45%, rgba(8,12,26,0.85) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .pkg-fade-up { opacity: 1; animation: none !important; }
          .pkg-blob { animation: none; }
          .pkg-card:hover { transform: none; }
          .pkg-card:hover .pkg-img { transform: none; }
          .pkg-shimmer { animation: none; }
          .pkg-fade-up.is-visible .pkg-badge { animation: none; opacity: 1; }
          .pkg-cta:hover { transform: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="pkg-blob pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />
      <div aria-hidden className="pkg-blob pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[110px]" style={{ animationDelay: "3.5s" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">
          <p
            className={`pkg-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
            style={{ animationDelay: "0s" }}
          >
            Handpicked Journeys
          </p>
          <h2
            className={`pkg-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
            style={{ animationDelay: "0.1s" }}
          >
            Trending Holiday Packages
          </h2>
        </div>

        {/* Package grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const isLoaded = loadedImages.has(pkg.title);
            return (
              <div
                key={pkg.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                className={`pkg-fade-up pkg-card ${isVisible ? "is-visible" : ""} overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]`}
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                {/* Image */}
                <div className="pkg-img-wrap relative h-48 w-full">
                  {!isLoaded && <div className="pkg-shimmer absolute inset-0" />}
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    onLoad={() => markLoaded(pkg.title)}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
                      else markLoaded(pkg.title);
                    }}
                    loading="lazy"
                    className={`pkg-img h-full w-full object-cover transition-opacity duration-500 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="pkg-overlay pointer-events-none absolute inset-0" />
                  <span
                    className={`pkg-badge absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLES[pkg.badge]}`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="relative p-5">
                  <h3 className="text-base font-bold text-white">{pkg.title}</h3>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45">
                    <span className="flex items-center gap-1">
                      <ClockIcon />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <RouteIcon />
                      {pkg.route}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pkg.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pkg-tag rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div>
                      <div className="flex items-center gap-0.5 text-amber-300">
                        {renderStars(pkg.rating)}
                        <span className="ml-1.5 text-[11px] font-medium text-white/40">
                          ({pkg.reviews})
                        </span>
                      </div>
                      <p className="mt-1.5 text-base font-bold text-white">
                        {pkg.price}
                        <span className="ml-1 text-[11px] font-normal text-white/40">/person</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="pkg-cta rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white"
                    >
                      View Details
                    </button>
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

export default TrendingPackagesSection;
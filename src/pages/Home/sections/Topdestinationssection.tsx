import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const HeartIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.4 4c2.1-.3 3.9.7 4.9 2.3.5.8.8 1.2 1.7 1.2s1.2-.4 1.7-1.2C14.7 4.7 16.5 3.7 18.6 4c3.4.5 4.9 4 3.4 7.2-2.5 4.7-10 9.3-10 9.3Z" />
  </svg>
);
const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.6 5.9 20.6l1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
  </svg>
);
const PinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);
const ArrowIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

type Category = "Beach" | "Romantic" | "Cultural" | "Luxury" | "Mountains" | "Adventure";

interface Destination {
  name: string;
  location: string;
  category: Category;
  rating: number;
  price: string;
  // Replace with your own Cloudinary delivery URLs, e.g.
  // https://res.cloudinary.com/<cloud_name>/image/upload/f_auto,q_auto,w_800/traveleo/bali.jpg
  image: string;
}

// --- Image setup ---
// These point directly at hosted photos so the section renders immediately.
// To serve them through YOUR Cloudinary account instead (recommended for
// production — automatic resizing, format conversion, and CDN caching):
//   1. Upload each destination photo to Cloudinary.
//   2. Set CLOUD_NAME below to your cloud name.
//   3. Replace each image value with cld("your_public_id").
// The shared "demo" Cloudinary account blocks fetch delivery for unrecognized
// external domains, which is why wrapping these URLs through it failed before.
const CLOUD_NAME = ""; // <-- set your Cloudinary cloud name here
const cld = (publicIdOrUrl: string) =>
  CLOUD_NAME
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800,h_1000,c_fill,g_auto/${publicIdOrUrl}`
    : publicIdOrUrl;

const SOURCE_IMAGES: Record<string, string> = {
  Bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&q=80&auto=format&fit=crop",
  Santorini: "https://images.unsplash.com/photo-1570077188670-e5f281f00afc?w=1000&q=80&auto=format&fit=crop",
  Japan: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1000&q=80&auto=format&fit=crop",
  Maldives: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1000&q=80&auto=format&fit=crop",
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80&auto=format&fit=crop",
  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80&auto=format&fit=crop",
  Switzerland: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1000&q=80&auto=format&fit=crop",
  Iceland: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1000&q=80&auto=format&fit=crop",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1000&q=80&auto=format&fit=crop";

const DESTINATIONS: Destination[] = [
  {
    name: "Bali",
    location: "Indonesia",
    category: "Beach",
    rating: 4.9,
    price: "₹32,999",
    image: cld(SOURCE_IMAGES.Bali),
  },
  {
    name: "Santorini",
    location: "Greece",
    category: "Romantic",
    rating: 4.8,
    price: "₹78,500",
    image: cld(SOURCE_IMAGES.Santorini),
  },
  {
    name: "Japan",
    location: "Asia",
    category: "Cultural",
    rating: 4.9,
    price: "₹55,000",
    image: cld(SOURCE_IMAGES.Japan),
  },
  {
    name: "Maldives",
    location: "South Asia",
    category: "Luxury",
    rating: 5.0,
    price: "₹1,20,000",
    image: cld(SOURCE_IMAGES.Maldives),
  },
  {
    name: "Paris",
    location: "France",
    category: "Romantic",
    rating: 4.7,
    price: "₹65,000",
    image: cld(SOURCE_IMAGES.Paris),
  },
  {
    name: "Dubai",
    location: "UAE",
    category: "Luxury",
    rating: 4.8,
    price: "₹45,000",
    image: cld(SOURCE_IMAGES.Dubai),
  },
  {
    name: "Switzerland",
    location: "Europe",
    category: "Mountains",
    rating: 4.9,
    price: "₹95,000",
    image: cld(SOURCE_IMAGES.Switzerland),
  },
  {
    name: "Iceland",
    location: "Europe",
    category: "Adventure",
    rating: 4.8,
    price: "₹88,000",
    image: cld(SOURCE_IMAGES.Iceland),
  },
];

const FILTERS: Array<Category | "All"> = [
  "All",
  "Beach",
  "Romantic",
  "Cultural",
  "Luxury",
  "Mountains",
  "Adventure",
];

/* -------------------------------- Component ------------------------------- */

const TopDestinationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Category | "All">("All");
  const [liked, setLiked] = useState<Set<string>>(new Set());
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

  const toggleLike = (name: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const markLoaded = (name: string) => {
    setLoadedImages((prev) => new Set(prev).add(name));
  };

  const filtered =
    activeFilter === "All"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes destFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes destBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes destShimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes destPop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .dest-fade-up { opacity: 0; }
        .dest-fade-up.is-visible { animation: destFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .dest-blob { animation: destBlobFloat 9s ease-in-out infinite; }

        .dest-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.45s ease;
        }
        .dest-card:hover {
          transform: translateY(-8px);
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: 0 24px 48px -18px rgba(0,0,0,0.65), 0 0 0 1px rgba(168,85,247,0.1);
        }
        .dest-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: inherit;
          background: radial-gradient(260px circle at var(--mx) var(--my), rgba(168,85,247,0.16), transparent 65%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .dest-card:hover::before { opacity: 1; }

        .dest-img-wrap { overflow: hidden; }
        .dest-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.7s ease;
          filter: saturate(1.02);
        }
        .dest-card:hover .dest-img {
          transform: scale(1.09);
        }

        .dest-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 0px,
            rgba(255,255,255,0.08) 40px,
            rgba(255,255,255,0.03) 80px
          );
          background-size: 800px 100%;
          animation: destShimmer 1.6s infinite linear;
        }

        .dest-heart {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease, color 0.25s ease;
        }
        .dest-heart:active { transform: scale(0.85); }
        .dest-heart.is-liked {
          animation: destPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        .dest-pill {
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .dest-pill:active { transform: scale(0.96); }

        .dest-badge {
          backdrop-filter: blur(6px);
        }

        .dest-overlay {
          background: linear-gradient(180deg, rgba(8,12,26,0) 40%, rgba(8,12,26,0.55) 75%, rgba(8,12,26,0.92) 100%);
        }

        .dest-explore {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .dest-card:hover .dest-explore {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .dest-fade-up { opacity: 1; animation: none !important; }
          .dest-blob { animation: none; }
          .dest-card:hover { transform: none; }
          .dest-card:hover .dest-img { transform: none; }
          .dest-shimmer { animation: none; }
          .dest-heart.is-liked { animation: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="dest-blob pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />
      <div aria-hidden className="dest-blob pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p
              className={`dest-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
              style={{ animationDelay: "0s" }}
            >
              Curated for you
            </p>
            <h2
              className={`dest-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
              style={{ animationDelay: "0.1s" }}
            >
              Top Destinations
            </h2>
          </div>

          {/* Filter pills */}
          <div
            className={`dest-fade-up ${isVisible ? "is-visible" : ""} flex flex-wrap gap-2`}
            style={{ animationDelay: "0.18s" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`dest-pill rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
                  activeFilter === f
                    ? "border-transparent bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Destination grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dest, i) => {
            const isLiked = liked.has(dest.name);
            const isLoaded = loadedImages.has(dest.name);
            return (
              <div
                key={dest.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                className={`dest-fade-up dest-card ${isVisible ? "is-visible" : ""} group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]`}
                style={{ animationDelay: `${0.15 + i * 0.06}s` }}
              >
                {/* Image */}
                <div className="dest-img-wrap absolute inset-0">
                  {!isLoaded && <div className="dest-shimmer absolute inset-0" />}
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.location}`}
                    onLoad={() => markLoaded(dest.name)}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src !== FALLBACK_IMAGE) {
                        img.src = FALLBACK_IMAGE;
                      } else {
                        markLoaded(dest.name);
                      }
                    }}
                    loading="lazy"
                    className={`dest-img h-full w-full object-cover transition-opacity duration-500 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                {/* Gradient overlay */}
                <div className="dest-overlay pointer-events-none absolute inset-0 z-[1]" />

                {/* Category badge */}
                <span className="dest-badge absolute left-3 top-3 z-[2] rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80">
                  {dest.category}
                </span>

                {/* Heart button */}
                <button
                  type="button"
                  onClick={() => toggleLike(dest.name)}
                  aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                  className={`dest-heart absolute right-3 top-3 z-[2] flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 ${
                    isLiked ? "is-liked text-fuchsia-400" : "text-white/70 hover:text-white"
                  }`}
                >
                  <HeartIcon filled={isLiked} />
                </button>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 z-[2] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{dest.name}</h3>
                    <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                      <StarIcon />
                      {dest.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/45">
                    <PinIcon />
                    {dest.location}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-white/35">From</p>
                      <p className="text-sm font-bold text-white">{dest.price}</p>
                    </div>
                    <span className="dest-explore flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white">
                      Explore
                      <ArrowIcon />
                    </span>
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

export default TopDestinationsSection;
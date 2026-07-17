import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Images are served through Cloudinary (auto format/quality + smart
 * cropping). I used 10 distinct assets confirmed to exist on Cloudinary's
 * public "demo" cloud as stand-ins — most are generic landscape/lifestyle
 * samples rather than literal photos of each destination (Cloudinary's demo
 * cloud doesn't have real Bali/Maldives/Santorini shots to pull from), so
 * treat these as technical placeholders, not a visual match. Swap the
 * `cld(...)` public IDs for your own Cloudinary cloud name + uploaded
 * destination photos whenever you have them — everything else keeps
 * working unchanged, including the onError fallback below.
 */
const cld = (publicId: string) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_700,h_900,c_fill,g_auto/${publicId}`;

interface Destination {
  image: string;
  name: string;
  country: string;
  tag: string;
  tagColor: string;
  rating: number;
  reviews: string;
  price: string;
}

const DESTINATIONS: Destination[] = [
  {
    image: cld("pm/hikers_mts.jpg"),
    name: "Bali",
    country: "Indonesia",
    tag: "Trending",
    tagColor: "bg-orange-500",
    rating: 4.9,
    reviews: "2.4k",
    price: "$899",
  },
  {
    image: cld("pm/japan.jpg"),
    name: "Japan",
    country: "Japan",
    tag: "Popular",
    tagColor: "bg-amber-500",
    rating: 4.8,
    reviews: "3.1k",
    price: "$1,299",
  },
  {
    image: cld("samples/landscapes/architecture-signs"),
    name: "Dubai",
    country: "UAE",
    tag: "Luxury",
    tagColor: "bg-violet-600",
    rating: 4.7,
    reviews: "1.8k",
    price: "$1,099",
  },
  {
    image: cld("pm/mountains_autumn.jpg"),
    name: "Switzerland",
    country: "Switzerland",
    tag: "Scenic",
    tagColor: "bg-sky-500",
    rating: 4.9,
    reviews: "1.2k",
    price: "$1,899",
  },
  {
    image: cld("samples/landscapes/girl-urban-view"),
    name: "Paris",
    country: "France",
    tag: "Classic",
    tagColor: "bg-slate-700",
    rating: 4.6,
    reviews: "4.5k",
    price: "$1,599",
  },
  {
    image: cld("samples/landscapes/beach-boat"),
    name: "Amalfi",
    country: "Italy",
    tag: "Romantic",
    tagColor: "bg-pink-500",
    rating: 4.7,
    reviews: "980",
    price: "$1,399",
  },
  {
    image: cld("sample.jpg"),
    name: "Maldives",
    country: "Maldives",
    tag: "Exclusive",
    tagColor: "bg-teal-600",
    rating: 5.0,
    reviews: "760",
    price: "$2,499",
  },
  {
    image: cld("pm/woman_car.jpg"),
    name: "Thailand",
    country: "Thailand",
    tag: "Value",
    tagColor: "bg-red-500",
    rating: 4.6,
    reviews: "3.6k",
    price: "$799",
  },
  {
    image: cld("samples/landscapes/nature-mountains"),
    name: "Iceland",
    country: "Iceland",
    tag: "Adventure",
    tagColor: "bg-emerald-600",
    rating: 4.8,
    reviews: "1.1k",
    price: "$1,899",
  },
  {
    image: cld("pm/kitchen.jpg"),
    name: "Santorini",
    country: "Greece",
    tag: "Romantic",
    tagColor: "bg-rose-500",
    rating: 4.9,
    reviews: "2.9k",
    price: "$1,699",
  },
];

const FILTERS = [
  "All",
  "Trending",
  "Luxury",
  "Romantic",
  "Adventure",
  "Popular",
];

// How many cards are visible in the single row at once.
const CARDS_PER_VIEW = 3;
// Gap between cards in px (kept in sync with the track's inline gap).
const CARD_GAP = 20;
// Auto-scroll speed in pixels per millisecond (higher = faster).
const SCROLL_SPEED = 0.045;

/* ---------------------------------- Icons --------------------------------- */

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M12 20.5s-7-4.35-9.5-8.7C.8 8.2 2.3 4.5 6 4.5c2 0 3.3 1 4 2.3C10.7 5.5 12 4.5 14 4.5c3.7 0 5.2 3.7 3.5 7.3-2.5 4.35-9.5 8.7-9.5 8.7Z" />
  </svg>
);
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
const ChevronLeftIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
const ChevronRightIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/* -------------------------------- Component ------------------------------- */

const DreamDestinationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const filtersWrapRef = useRef<HTMLDivElement>(null);
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [justLiked, setJustLiked] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [cardWidth, setCardWidth] = useState(0);

  // Continuous auto-scroll state (kept in refs so the rAF loop doesn't
  // trigger React re-renders every frame — we mutate the track's style
  // directly instead).
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

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
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const btn = filterRefs.current[activeFilter];
    const wrap = filtersWrapRef.current;
    if (!btn || !wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - wrapRect.left, width: btnRect.width });
  }, [activeFilter, isVisible]);

  // Measure the carousel wrapper so exactly CARDS_PER_VIEW cards fit per row.
  useEffect(() => {
    const wrap = carouselWrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const width = wrap.getBoundingClientRect().width;
      const totalGap = CARD_GAP * (CARDS_PER_VIEW - 1);
      setCardWidth((width - totalGap) / CARDS_PER_VIEW);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(wrap);
    return () => resizeObserver.disconnect();
  }, []);

  const toggleLike = (index: number) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
    if (!liked[index]) {
      setJustLiked(index);
      setTimeout(() => setJustLiked((v) => (v === index ? null : v)), 350);
    }
  };

  const visibleDestinations =
    activeFilter === 0
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.tag === FILTERS[activeFilter]);

  // Reset the scroll position whenever the filter (and therefore the list) changes.
  useEffect(() => {
    positionRef.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transform = "translateX(0px)";
    }
  }, [activeFilter]);

  // Render the list twice back-to-back so the loop is seamless: once the
  // track has scrolled the width of one full set, we snap the position
  // back by that same amount (invisibly, since the second copy is already
  // sitting right where the first one was).
  const loopDestinations = [...visibleDestinations, ...visibleDestinations];
  const singleSetWidth = cardWidth
    ? visibleDestinations.length * (cardWidth + CARD_GAP)
    : 0;

  useEffect(() => {
    if (!cardWidth || visibleDestinations.length === 0) return;

    let lastTime: number | null = null;

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current && singleSetWidth > 0) {
        positionRef.current += delta * SCROLL_SPEED;
        if (positionRef.current >= singleSetWidth) {
          positionRef.current -= singleSetWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cardWidth, singleSetWidth, visibleDestinations.length]);

  const nudge = useCallback(
    (direction: 1 | -1) => {
      if (!cardWidth || singleSetWidth <= 0) return;
      const step = cardWidth + CARD_GAP;
      let next = positionRef.current + direction * step;
      // Keep the position wrapped within [0, singleSetWidth) so the
      // seamless loop math keeps working after a manual nudge.
      next = ((next % singleSetWidth) + singleSetWidth) % singleSetWidth;
      positionRef.current = next;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${next}px)`;
      }
    },
    [cardWidth, singleSetWidth],
  );

  const goPrev = useCallback(() => nudge(-1), [nudge]);
  const goNext = useCallback(() => nudge(1), [nudge]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-2 sm:px-8 lg:px-16"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <style>{`
        @keyframes ddFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ddHeartPop {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes ddShimmer {
          0% { background-position: -120% 0; }
          100% { background-position: 220% 0; }
        }
        @keyframes ddShine {
          0% { transform: translateX(-130%) skewX(-12deg); }
          100% { transform: translateX(160%) skewX(-12deg); }
        }
        @keyframes ddPriceGlow {
          0% { text-shadow: 0 0 0 rgba(201, 151, 74, 0); }
          50% { text-shadow: 0 0 12px rgba(201, 151, 74, 0.35); }
          100% { text-shadow: 0 0 0 rgba(201, 151, 74, 0); }
        }

        .dd-fade-up { opacity: 0; }
        .dd-fade-up.is-visible { animation: ddFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }

        .dd-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: ddLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }
        @keyframes ddLineGrow { to { width: 24px; } }

        .dd-filter-indicator {
          transition: left 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .dd-nav-btn {
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
        }
        .dd-nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -8px rgba(27, 42, 74, 0.35);
        }
        .dd-nav-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .dd-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .dd-track {
          will-change: transform;
        }

        .dd-card {
          transition: transform 0.42s cubic-bezier(0.22,1,0.36,1), box-shadow 0.42s ease, border-color 0.42s ease;
          border: 1px solid transparent;
        }
        .dd-card:hover {
          transform: translateY(-9px);
          box-shadow: 0 26px 50px -16px rgba(30, 41, 59, 0.28);
          border-color: rgba(201, 151, 74, 0.35);
        }
        .dd-card:hover .dd-card-img { transform: scale(1.1); }
        .dd-card:hover .dd-shine { animation: ddShine 1s ease forwards; }
        .dd-card:hover .dd-name { color: #C9974A; }
        .dd-card:hover .dd-price { animation: ddPriceGlow 1.1s ease; }

        .dd-card-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }

        .dd-shine {
          position: absolute;
          inset: -20% -60%;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%);
          pointer-events: none;
        }

        .dd-heart.just-liked { animation: ddHeartPop 0.35s ease; }
        .dd-heart {
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .dd-heart:hover { transform: scale(1.12); }

        .dd-tag-shimmer {
          background-image: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          background-size: 250% 100%;
          animation: ddShimmer 3s ease-in-out infinite;
        }

        .dd-name {
          transition: color 0.3s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .dd-fade-up { opacity: 1; animation: none !important; }
          .dd-card:hover { transform: none; }
          .dd-card:hover .dd-card-img { transform: none; }
          .dd-card:hover .dd-shine { animation: none; }
          .dd-heart.just-liked { animation: none; }
          .dd-tag-shimmer { animation: none; }
          .dd-card:hover .dd-price { animation: none; }
          .dd-nav-btn:hover:not(:disabled) { transform: none; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading + filters + carousel arrows */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p
              className={`dd-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
              style={{ animationDelay: "0s", color: "#C9974A" }}
            >
              <span className="dd-eyebrow-line" />
              Curated for You
            </p>
            <h2
              className={`dd-fade-up ${isVisible ? "is-visible" : ""} mt-2 text-3xl font-bold tracking-tight sm:text-4xl`}
              style={{
                animationDelay: "0.08s",
                color: "#1B2A4A",
                fontFamily:
                  "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif",
              }}
            >
              Dream Destinations
            </h2>
          </div>

          <div
            className={`dd-fade-up ${isVisible ? "is-visible" : ""} flex flex-wrap items-center gap-4`}
            style={{ animationDelay: "0.16s" }}
          >
            <div ref={filtersWrapRef} className="relative flex flex-wrap gap-2">
              <div
                className="dd-filter-indicator absolute inset-y-0 rounded-full"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  backgroundColor: "#1B2A4A",
                }}
              />
              {FILTERS.map((filter, i) => (
                <button
                  key={filter}
                  ref={(el) => {
                    filterRefs.current[i] = el;
                  }}
                  onClick={() => setActiveFilter(i)}
                  className={`relative z-10 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 ${
                    activeFilter === i
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  style={
                    activeFilter !== i
                      ? { backgroundColor: "rgba(27,42,74,0.06)" }
                      : undefined
                  }
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Prev / Next carousel controls (manual nudge; auto-scroll keeps going) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous destination"
                className="dd-nav-btn flex h-9 w-9 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: "#1B2A4A" }}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next destination"
                className="dd-nav-btn flex h-9 w-9 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: "#1B2A4A" }}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel — continuously auto-scrolls right to left, pauses on hover */}
        <div
          ref={carouselWrapRef}
          className="mt-12 overflow-hidden"
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="dd-track flex"
            style={{ gap: `${CARD_GAP}px` }}
          >
            {loopDestinations.map((dest, i) => {
              const originalIndex = DESTINATIONS.indexOf(dest);
              return (
                <div
                  key={`${dest.name}-${i}`}
                  className={`dd-fade-up dd-card ${isVisible ? "is-visible" : ""} group relative overflow-hidden rounded-2xl bg-white shadow-md shadow-black/5`}
                  style={{
                    animationDelay: `${0.22 + (i % visibleDestinations.length) * 0.06}s`,
                    flex: `0 0 ${cardWidth || 0}px`,
                    width: cardWidth || undefined,
                  }}
                >
                  {/* Image block (top portion only, like a hotel card) */}
                  <div className="relative aspect-1/1 w-full overflow-hidden">
                    {!failedImages[originalIndex] ? (
                      <img
                        src={dest.image}
                        alt={dest.name}
                        loading="lazy"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [originalIndex]: true,
                          }))
                        }
                        className="dd-card-img absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, hsl(${(originalIndex * 47) % 360} 45% 30%), hsl(${(originalIndex * 47 + 40) % 360} 40% 18%))`,
                        }}
                      />
                    )}

                    <div className="dd-shine" />

                    {/* Category tag */}
                    <span
                      className={`dd-tag-shimmer absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${dest.tagColor}`}
                    >
                      {dest.tag}
                    </span>

                    {/* Wishlist heart */}
                    <button
                      onClick={() => toggleLike(originalIndex)}
                      aria-label="Toggle wishlist"
                      className={`dd-heart ${justLiked === originalIndex ? "just-liked" : ""} absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm ${
                        liked[originalIndex]
                          ? "text-rose-400"
                          : "hover:text-rose-300"
                      }`}
                    >
                      <HeartIcon filled={!!liked[originalIndex]} />
                    </button>
                  </div>

                  {/* Details block (below image, like a hotel card) */}
                  <div className="p-5">
                    <h3
                      className="dd-name truncate text-xl font-bold"
                      style={{ color: "#1B2A4A" }}
                    >
                      {dest.name}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
                      <PinIcon />
                      {dest.country}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                        <span className="text-amber-400">
                          <StarIcon />
                        </span>
                        {dest.rating}
                        <span className="text-gray-400">({dest.reviews})</span>
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <span
                        className="dd-price text-xl font-bold"
                        style={{ color: "#1B2A4A" }}
                      >
                        <span className="font-normal text-gray-400">From </span>
                        {dest.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamDestinationsSection;

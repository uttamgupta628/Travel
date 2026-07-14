import React, { useEffect, useRef, useState } from "react";

/**
 * Images are served through Cloudinary's fetch/transformation pipeline so
 * they're automatically resized, compressed (q_auto/f_auto) and cropped
 * with smart gravity (g_auto) for every card.
 *
 * I used Cloudinary's public "demo" cloud sample assets below as stand-ins
 * (architecture / beach / mountain / urban shots) since I can't upload real
 * licensed photos of Rome, Bali, Spiti or Goa on your behalf. Swap the
 * `image` values for your own Cloudinary cloud name + public IDs
 * (e.g. https://res.cloudinary.com/<your-cloud-name>/image/upload/...)
 * once you've uploaded the real destination photos — everything else
 * (transformations, layout, animation) will keep working as-is.
 */
const cld = (publicId: string) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_900,h_1100,c_fill,g_auto/${publicId}`;

interface Destination {
  image: string;
  name: string;
  location: string;
  price: string;
  days: string;
  rating: number;
}

const DESTINATIONS: Destination[] = [
  {
    image: cld("samples/landscapes/architecture-signs"),
    name: "Rome, Italy",
    location: "Rome, Italy",
    price: "$5,42k",
    days: "10 Days Trip",
    rating: 4.2,
  },
  {
    image: cld("samples/landscapes/girl-urban-view"),
    name: "Bali, Group tour",
    location: "Bali, Indonesia",
    price: "$5,42k",
    days: "05 Days Trip",
    rating: 4.4,
  },
  {
    image: cld("samples/landscapes/nature-mountains"),
    name: "Spiti Valley",
    location: "Himachal, India",
    price: "$5,42k",
    days: "07 Days Trip",
    rating: 4.8,
  },
  {
    image: cld("samples/landscapes/beach-boat"),
    name: "Goa Beach",
    location: "Goa, India",
    price: "$5,42k",
    days: "10 Days Trip",
    rating: 4.2,
  },
];

const PlaneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.2" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ExploreIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const DOT_COUNT = 3;

const DestinationsSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeDot, setActiveDot] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setScrollProgress(ratio);
    setActiveDot(Math.min(DOT_COUNT - 1, Math.round(ratio * (DOT_COUNT - 1))));
  };

  const goToDot = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: (maxScroll * index) / (DOT_COUNT - 1),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger the reveal animation only once the section actually enters the
  // viewport, instead of firing on mount regardless of scroll position.
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

  // Cursor-tracked 3D tilt. Applied via CSS custom properties + a ref so it
  // never fights with the entrance/fade animation running on the same node.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  };

  const resetTilt = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.65) rotate(-6deg); }
          65% { opacity: 1; transform: scale(1.12) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.6); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-130%) skewX(-12deg); }
          100% { transform: translateX(160%) skewX(-12deg); }
        }
        .dest-fade-up { opacity: 0; }
        .dest-fade-up.is-visible {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .dest-blob { animation: floatSlow 7s ease-in-out infinite; }
        .dest-scroller { perspective: 1200px; }
        .dest-scroller::-webkit-scrollbar { display: none; }
        .dest-scroller { scrollbar-width: none; }

        .dest-tilt {
          --rx: 0deg;
          --ry: 0deg;
          transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0) scale(1);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
          transform-style: preserve-3d;
        }
        .dest-tilt:hover {
          transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0) scale(1.035) translateY(-10px);
          box-shadow: 0 26px 50px -12px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(37, 99, 235, 0.08);
        }
        .dest-tilt:hover .dest-card-img { transform: scale(1.15); }
        .dest-tilt:hover .dest-card-overlay { opacity: 1; }
        .dest-tilt:hover .dest-card-chip { transform: translateY(0); opacity: 1; }
        .dest-tilt:hover .dest-explore { transform: translateY(0); opacity: 1; }
        .dest-tilt:hover .dest-shine { animation: shimmerSweep 1.1s ease forwards; }

        .dest-shine {
          position: absolute;
          inset: -20% -60%;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%);
          pointer-events: none;
        }

        .dest-badge-glow { position: relative; }
        .dest-badge-glow::before {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 9999px;
          background: rgba(251, 191, 36, 0.55);
          animation: pulseGlow 2.2s ease-in-out infinite;
          z-index: -1;
        }

        .dest-price-pop { opacity: 0; }
        .dest-price-pop.is-visible {
          animation: popIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .dest-fade-up { opacity: 1; animation: none !important; }
          .dest-price-pop { opacity: 1; animation: none !important; }
          .dest-blob { animation: none; }
          .dest-badge-glow::before { animation: none; opacity: 0; }
          .dest-tilt, .dest-tilt:hover { transform: none; }
          .dest-tilt:hover .dest-card-img { transform: none; }
          .dest-tilt:hover .dest-shine { animation: none; }
        }
      `}</style>

      {/* Ambient background accents */}
      <div
        aria-hidden
        className="dest-blob pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="dest-blob pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="relative">
          <div
            className={`dest-fade-up ${isVisible ? "is-visible" : ""} mx-auto max-w-xl text-center`}
            style={{ animationDelay: "0s" }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Trending Trips
            </p>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Top Destinations
            </h2>
          </div>

          <a
            href="#"
            className={`dest-fade-up ${isVisible ? "is-visible" : ""} group absolute right-0 top-2 hidden items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:inline-flex`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative">
              View all
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </a>
        </div>

        {/* Cards — horizontal scroll-snap on small screens, grid on large */}
        <div
          ref={scrollerRef}
          className="dest-scroller mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-6 lg:mt-14 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.name}
              className={`dest-fade-up ${isVisible ? "is-visible" : ""} mx-auto w-72 shrink-0 snap-start lg:w-full lg:max-w-none`}
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => resetTilt(i)}
                className="dest-tilt group relative overflow-hidden rounded-[32px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.10)] ring-1 ring-gray-100"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[32px]">
                  <img
                    src={dest.image}
                    alt={dest.location}
                    loading="lazy"
                    className="dest-card-img absolute inset-0 h-full w-full scale-[1.08] object-cover transition-transform duration-700 ease-out"
                  />

                  {/* Shine sweep on hover */}
                  <div className="dest-shine" />

                  {/* Bottom gradient for legibility + hover reveal */}
                  <div className="dest-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-75 transition-opacity duration-300" />

                  {/* Rating chip with pulsing glow */}
                  <div className="dest-badge-glow absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-900 shadow-sm backdrop-blur-sm">
                    <span className="text-amber-400">
                      <StarIcon />
                    </span>
                    {dest.rating}
                  </div>

                  {/* Location pin, revealed on hover */}
                  <div className="dest-card-chip absolute left-4 top-4 flex translate-y-[-6px] items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300">
                    <PinIcon />
                    {dest.location.split(",")[1]?.trim() ?? dest.location}
                  </div>

                  {/* Explore CTA revealed on hover */}
                  <div className="dest-explore absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg shadow-blue-600/30 transition-all duration-300">
                    Explore
                    <ExploreIcon />
                  </div>

                  {/* Name + days overlaid on the image */}
                  <div className="absolute inset-x-0 bottom-0 p-5 pb-16">
                    <h3 className="text-xl font-bold text-white drop-shadow-sm">
                      {dest.name}
                    </h3>
                    <span className="mt-1.5 flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <PlaneIcon />
                      {dest.days}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Starting from
                  </span>
                  <span
                    className={`dest-price-pop ${isVisible ? "is-visible" : ""} text-xl font-extrabold text-blue-600`}
                    style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                  >
                    {dest.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress-linked pagination bar (mirrors real scroll position) */}
        <div className="mx-auto mt-6 flex max-w-[180px] items-center gap-2 lg:hidden">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-blue-100">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-blue-600 transition-[width] duration-150 ease-out"
              style={{ width: `${8 + scrollProgress * 92}%` }}
            />
          </div>
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 w-2 shrink-0 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: activeDot === i ? "#2563eb" : "#dbeafe",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
import React, { useEffect, useRef, useState } from "react";

import destRome from "../../../assets/destination-rome.png";
import destBali from "../../../assets/destination-bali.png";
import destSpiti from "../../../assets/destination-spiti.png";
import destGoa from "../../../assets/destination-goa.png";

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
    image: destRome,
    name: "Rome, Italy",
    location: "Rome, Italy",
    price: "$5,42k",
    days: "10 Days Trip",
    rating: 4.2,
  },
  {
    image: destBali,
    name: "Bali, Group tour",
    location: "Bali, Indonesia",
    price: "$5,42k",
    days: "05 Days Trip",
    rating: 4.4,
  },
  {
    image: destSpiti,
    name: "Spiti Valley",
    location: "Himachal, India",
    price: "$5,42k",
    days: "07 Days Trip",
    rating: 4.8,
  },
  {
    image: destGoa,
    name: "Goa Beach",
    location: "Goa, India",
    price: "$5,42k",
    days: "10 Days Trip",
    rating: 4.2,
  },
];

const PlaneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const DOT_COUNT = 3;

const DestinationsSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
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

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dest-fade-up {
          opacity: 0;
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .dest-scroller::-webkit-scrollbar { display: none; }
        .dest-scroller { scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          .dest-fade-up { opacity: 1; animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="relative">
          <div
            className="dest-fade-up mx-auto max-w-xl text-center"
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
            className="dest-fade-up group absolute right-0 top-2 hidden items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:inline-flex"
            style={{ animationDelay: "0.1s" }}
          >
            View all
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </a>
        </div>

        {/* Cards — horizontal scroll-snap on small screens, grid on large */}
        <div
          ref={scrollerRef}
          className="dest-scroller mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:mt-14 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0"
          style={{ animationDelay: "0.15s" }}
        >
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.name}
              className="dest-fade-up group mx-auto w-52 shrink-0 snap-start overflow-hidden rounded-[28px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.14)] lg:w-full lg:max-w-[220px]"
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.location}
                  className="absolute inset-0 h-full w-full scale-[1.35] object-cover transition-transform duration-500 group-hover:scale-[1.45]"
                />
              </div>

              <div className="p-4 pt-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {dest.name}
                  </h3>
                  <span className="shrink-0 text-base font-bold text-gray-900">
                    {dest.price}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="text-blue-500">
                      <PlaneIcon />
                    </span>
                    {dest.days}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-gray-900">
                    <span className="text-amber-400">
                      <StarIcon />
                    </span>
                    {dest.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots — mirror the scroll position, tap to jump */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: DOT_COUNT }).map((_, i) => {
            const isActive = activeDot === i;
            return (
              <button
                key={i}
                onClick={() => goToDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  height: isActive ? 10 : 8,
                  width: isActive ? 10 : 8,
                  backgroundColor: isActive
                    ? "#2563eb"
                    : i < DOT_COUNT - 1
                    ? "#93c5fd"
                    : "#dbeafe",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
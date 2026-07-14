import React from "react";

import heroImageOne from "../../../assets/hero-explorer.png";
import heroImageTwo from "../../../assets/hero-mountains.png";
import heroImageThree from "../../../assets/hero-landmark.png";

/* --- Small inline icon set (no extra dependency needed) --- */
const MapPinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const RouteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h8a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H8" />
  </svg>
);

const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SearchIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PlayIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-float { animation: floatY 5s ease-in-out infinite; }
        .hero-float-slow { animation: floatY 6.5s ease-in-out infinite; }
        .hero-float-slower { animation: floatY 7.5s ease-in-out infinite; }
        .hero-fade-up {
          opacity: 0;
          animation: fadeInUp 0.7s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-float, .hero-float-slow, .hero-float-slower { animation: none; }
          .hero-fade-up { opacity: 1; animation: none; }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        {/* Left column */}
        <div className="text-center lg:text-left">
          <div
            className="hero-fade-up mb-5 flex items-center justify-center gap-2 lg:justify-start"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="text-2xl">🌍</span>
            <span className="font-serif text-xl italic text-blue-600">
              TravelGo
            </span>
          </div>

          <h1
            className="hero-fade-up text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-[3.4rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Explore the world with
            <br className="hidden sm:block" /> group of{" "}
            <span className="font-serif italic text-blue-600">explorers</span>
          </h1>

          <p
            className="hero-fade-up mx-auto mt-5 max-w-md text-gray-500 lg:mx-0"
            style={{ animationDelay: "0.25s" }}
          >
            Join exciting group trips, make new friends and create memories
            for a lifetime.
          </p>

          <div
            className="hero-fade-up mt-8 flex items-center justify-center gap-5 lg:justify-start"
            style={{ animationDelay: "0.35s" }}
          >
            <button className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40">
              Explore More
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </button>

            <button className="flex items-center gap-3 text-sm font-semibold text-gray-800">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform duration-300 hover:scale-110">
                <PlayIcon />
              </span>
              Play Demo
            </button>
          </div>

          {/* Search bar */}
          <div
            className="hero-fade-up mt-10 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/60 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <MapPinIcon />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">
                  Location
                </p>
                <p className="text-xs text-gray-400">Where are you going?</p>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-gray-200 sm:block" />
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <RouteIcon />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">
                  Distance
                </p>
                <p className="text-xs text-gray-400">Distance km/m</p>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-gray-200 sm:block" />
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <UsersIcon />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">
                  Max People
                </p>
                <p className="text-xs text-gray-400">0</p>
              </div>
            </div>
            <button
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 hover:scale-105 sm:ml-2"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Right column — descending staircase image stack */}
        <div
          className="hero-fade-up flex items-start justify-center gap-2 sm:gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="hero-float h-72 w-36 shrink-0 overflow-hidden rounded-[2rem] border-4 border-blue-400 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 sm:h-108 sm:w-56">
            <img
              src={heroImageOne}
              alt="Explorer overlooking clouds"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hero-float-slow mt-6 h-72 w-36 shrink-0 overflow-hidden rounded-[2rem] border-4 border-blue-400 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 sm:mt-10 sm:h-108 sm:w-56">
            <img
              src={heroImageTwo}
              alt="Snow-capped mountains"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hero-float-slower mt-14 h-72 w-36 shrink-0 overflow-hidden rounded-[2rem] border-4 border-blue-400 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 sm:mt-20 sm:h-108 sm:w-56">
            <img
              src={heroImageThree}
              alt="Historic landmark"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
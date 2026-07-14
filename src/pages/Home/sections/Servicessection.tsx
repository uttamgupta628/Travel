import React from "react";

import iconWeather from "../../../assets/icon-weather.png";
import iconFlights from "../../../assets/icon-flights.png";
import iconEvents from "../../../assets/icon-events.png";
import iconCustomize from "../../../assets/icon-customize.png";

interface Service {
  icon: string;
  title: string;
  description: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: iconWeather,
    title: "Calculated Weather",
    description: "Accurate weather prediction using calculations.",
  },
  {
    icon: iconFlights,
    title: "Best Flights",
    description: "Affordable flights with seamless booking experience.",
    featured: true,
  },
  {
    icon: iconEvents,
    title: "Local Events",
    description: "Discover nearby festivals, culture, and experiences.",
  },
  {
    icon: iconCustomize,
    title: "Customization",
    description: "Tailored features matching business requirements.",
  },
];

/** Decorative plus-sign grid — pinned to the section's top-right corner. */
const PlusGrid: React.FC = () => {
  const cols = 5;
  const rows = 6;
  // (row, col) cells that get a color accent
  const accents: Record<string, string> = {
    "0-0": "text-orange-500",
    "2-2": "text-blue-600",
  };

  return (
    <div
      className="services-fade-up absolute right-0 top-1 hidden select-none grid-cols-5 gap-x-4 gap-y-3 lg:grid"
      style={{ animationDelay: "0.1s" }}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const key = `${r}-${c}`;
          const isAccent = key in accents;
          return (
            <span
              key={key}
              className={`text-sm font-semibold leading-none ${
                isAccent ? `${accents[key]} plus-accent` : "text-gray-300"
              }`}
              style={isAccent ? { animationDelay: `${r * 0.3}s` } : undefined}
            >
              +
            </span>
          );
        })
      )}
    </div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes plusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        .services-fade-up {
          opacity: 0;
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .plus-accent { animation: plusPulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .services-fade-up { opacity: 1; animation: none; }
          .plus-accent { animation: none; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl">
        <PlusGrid />

        {/* Heading — always centered, independent of the corner decoration */}
        <div
          className="services-fade-up mx-auto max-w-2xl text-center"
          style={{ animationDelay: "0s" }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Category
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            We Offer Best Services
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`services-fade-up group relative rounded-3xl px-6 py-8 text-center transition-all duration-300 ${
                service.featured
                  ? "bg-white shadow-2xl shadow-gray-200/80 lg:-mt-6 lg:py-14"
                  : "hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              {/* Icon with offset blob behind it */}
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                <span className="absolute bottom-0 right-0 h-20 w-20 translate-x-1 translate-y-1 rotate-6 rounded-2xl bg-amber-100 transition-transform duration-300 group-hover:rotate-12" />
                <img
                  src={service.icon}
                  alt=""
                  className="relative z-10 h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-gray-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
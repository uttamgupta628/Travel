import React, { useEffect, useRef, useState } from "react";

// Replace these with your actual asset paths — any filenames work.
import bigBenImage from "../../../assets/tour-big-ben.png";
import baliImage from "../../../assets/tour-bali.png";
import sydneyImage from "../../../assets/tour-sydney.png";
import dubaiImage from "../../../assets/tour-dubai.png";
import phetchaburiImage from "../../../assets/tour-phetchaburi.png";
import parisImage from "../../../assets/tour-paris.png";
import wuxiImage from "../../../assets/tour-wuxi.png";

interface Tour {
  image: string;
  city: string;
  place: string;
  heightClass: string;
}

const TRACK_A: Tour[] = [
  { image: bigBenImage, city: "Big Ben", place: "LONDON", heightClass: "h-44 sm:h-52" },
  { image: dubaiImage, city: "Dubai", place: "UAE", heightClass: "h-40 sm:h-48" },
];

const TRACK_B: Tour[] = [
  { image: baliImage, city: "Bali", place: "INDONESIA", heightClass: "h-56 sm:h-64" },
  { image: phetchaburiImage, city: "Phetchaburi", place: "THAILAND", heightClass: "h-32 sm:h-36" },
];

const SYDNEY: Tour = {
  image: sydneyImage,
  city: "Sydney",
  place: "AUSTRALIA",
  heightClass: "h-44 sm:h-52",
};

const TRACK_C_BOTTOM: Tour[] = [
  { image: parisImage, city: "Paris", place: "FRANCE", heightClass: "h-40 sm:h-48" },
  { image: wuxiImage, city: "Wuxi", place: "CHINA", heightClass: "h-40 sm:h-48" },
];

const TourCard: React.FC<{ tour: Tour; className?: string; delay: number; visible: boolean }> = ({
  tour,
  className = "",
  delay,
  visible,
}) => (
  <div
    className={`tour-fade-up group relative w-full overflow-hidden rounded-2xl ${tour.heightClass} ${className}`}
    style={{ animationDelay: visible ? `${delay}s` : undefined, opacity: visible ? undefined : 0 }}
  >
    <img
      src={tour.image}
      alt={`${tour.city}, ${tour.place}`}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4 text-center text-white transition-transform duration-300 group-hover:-translate-y-1">
      <span className="tour-script text-2xl leading-tight sm:text-3xl">{tour.city}</span>
      <span className="mt-0.5 text-xs font-bold tracking-[0.15em]">{tour.place}</span>
    </div>
  </div>
);

const FeaturedToursSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');

        @keyframes tourFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tour-fade-up {
          animation: tourFadeUp 0.7s ease-out forwards;
        }
        .tour-script {
          font-family: 'Dancing Script', cursive;
          font-weight: 700;
        }
        @media (prefers-reduced-motion: reduce) {
          .tour-fade-up { opacity: 1 !important; animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        {isVisible && (
          <div
            className="tour-fade-up mb-10"
            style={{ animationDelay: "0s" }}
          >
            <p className="text-sm font-bold text-blue-600">Explore</p>
            <h2 className="mt-1 text-2xl font-semibold text-gray-800 sm:text-3xl">
              Our featured tours
            </h2>
          </div>
        )}

        {isVisible && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Track A: Big Ben / Dubai */}
            <div className="flex flex-col gap-4">
              <TourCard tour={TRACK_A[0]} delay={0.1} visible={isVisible} />
              <TourCard tour={TRACK_A[1]} delay={0.22} visible={isVisible} />
            </div>

            {/* Track B: Bali / Phetchaburi */}
            <div className="flex flex-col gap-4">
              <TourCard tour={TRACK_B[0]} delay={0.16} visible={isVisible} />
              <TourCard tour={TRACK_B[1]} delay={0.28} visible={isVisible} />
            </div>

            {/* Track C: Sydney (full width) then Paris / Wuxi */}
            <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
              <TourCard tour={SYDNEY} delay={0.13} visible={isVisible} />
              <div className="grid grid-cols-2 gap-4">
                <TourCard tour={TRACK_C_BOTTOM[0]} delay={0.34} visible={isVisible} />
                <TourCard tour={TRACK_C_BOTTOM[1]} delay={0.4} visible={isVisible} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedToursSection;
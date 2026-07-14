import React, { useState } from "react";

// Replace these with your actual asset paths — any filenames work.
import avatarMike from "../../../assets/testimonial-mike.png";
import avatarChris from "../../../assets/testimonial-mike.png";
import avatarSara from "../../../assets/testimonial-mike.png";

interface Testimonial {
  avatar: string;
  quote: string;
  name: string;
  meta: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    avatar: avatarMike,
    quote:
      "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    name: "Mike taylor",
    meta: "London",
  },
  {
    avatar: avatarChris,
    quote:
      "Delivered was so if oh interested increasing sentiments. Blessing welcomed ladyship she met humoured sir breeding her. Well end dear rent way sure.",
    name: "Chris Thomas",
    meta: "CEO of Red Button",
  },
  {
    avatar: avatarSara,
    quote:
      "Removed reached mr of manners it engaged desire believe. Weeks quiet do allow to noise abode place ye. Especially assistance ye principle eagerness.",
    name: "Sara Malik",
    meta: "Product Designer",
  },
];

const ChevronIcon: React.FC<{ direction: "up" | "down" }> = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 transition-transform duration-300 ${direction === "down" ? "rotate-180" : ""}`}
  >
    <path d="m6 15 6-6 6 6" />
  </svg>
);

const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];
  const next = TESTIMONIALS[(index + 1) % total];

  const goTo = (i: number, dir: "up" | "down") => {
    setDirection(dir);
    setIndex(((i % total) + total) % total);
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes testiFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes testiSlideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes testiSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes testiPopIn {
          from { opacity: 0; transform: scale(0.85) rotate(-8deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .testi-fade-up {
          opacity: 0;
          animation: testiFadeUp 0.7s ease-out forwards;
        }
        .testi-slide-down {
          animation: testiSlideDown 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .testi-slide-up {
          animation: testiSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .testi-avatar-pop {
          animation: testiPopIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .testi-fade-up, .testi-slide-down, .testi-slide-up, .testi-avatar-pop {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Left — heading + dots */}
        <div>
          <p className="testi-fade-up text-sm font-bold uppercase tracking-[0.2em] text-blue-600" style={{ animationDelay: "0s" }}>
            Testimonials
          </p>
          <h2
            className="testi-fade-up mt-2 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl"
            style={{ animationDelay: "0.08s" }}
          >
            What People Say
            <br />
            About Us.
          </h2>

          <div className="testi-fade-up mt-8 flex items-center gap-2" style={{ animationDelay: "0.16s" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > index ? "down" : "up")}
                aria-label={`Go to testimonial ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  height: 8,
                  width: index === i ? 22 : 8,
                  backgroundColor: index === i ? "#2563eb" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right — stacked testimonial card */}
        <div className="testi-fade-up relative mx-auto w-full max-w-md pb-10 pt-8 lg:mx-0" style={{ animationDelay: "0.2s" }}>
          {/* Peek card behind */}
          <div className="absolute inset-x-4 bottom-0 rounded-2xl bg-gray-50 px-8 py-5 shadow-sm ring-1 ring-gray-100">
            <p className="truncate text-base font-bold text-blue-600/70">{next.name}</p>
            <p className="truncate text-sm text-blue-500/60">{next.meta}</p>
          </div>

          {/* Main card */}
          <div className="relative rounded-2xl bg-white p-8 pt-10 shadow-xl shadow-gray-200/70 ring-1 ring-gray-100 transition-shadow duration-300 hover:shadow-2xl">
            {/* Avatar */}
            <img
              key={`avatar-${index}`}
              src={current.avatar}
              alt={current.name}
              className="testi-avatar-pop absolute -top-8 left-6 h-16 w-16 rounded-full border-4 border-white object-cover shadow-md"
            />

            {/* Nav arrows */}
            <div className="absolute -right-3 top-6 flex flex-col gap-2 sm:-right-14">
              <button
                onClick={() => goTo(index - 1, "up")}
                aria-label="Previous testimonial"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-gray-100 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
              >
                <ChevronIcon direction="up" />
              </button>
              <button
                onClick={() => goTo(index + 1, "down")}
                aria-label="Next testimonial"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-gray-100 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
              >
                <ChevronIcon direction="down" />
              </button>
            </div>

            <div key={index} className={direction === "down" ? "testi-slide-down" : "testi-slide-up"}>
              <p className="pr-6 text-base leading-relaxed text-gray-600 sm:pr-10">
                &ldquo;{current.quote}&rdquo;
              </p>

              <p className="mt-5 text-base font-bold text-blue-600">{current.name}</p>
              <p className="text-sm text-blue-400">{current.meta}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
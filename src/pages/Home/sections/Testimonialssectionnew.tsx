import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.6 5.9 20.6l1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
  </svg>
);
const QuoteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
    <path d="M9.6 6C6.4 7.4 4.5 10 4.5 13.2c0 2.6 1.6 4.3 3.7 4.3 1.9 0 3.3-1.4 3.3-3.3 0-1.7-1.1-3-2.8-3.2.4-1.6 1.7-3 3.4-3.7L9.6 6Zm9 0c-3.2 1.4-5.1 4-5.1 7.2 0 2.6 1.6 4.3 3.7 4.3 1.9 0 3.3-1.4 3.3-3.3 0-1.7-1.1-3-2.8-3.2.4-1.6 1.7-3 3.4-3.7L18.6 6Z" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  location: string;
  date: string;
  gradient: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Traveleo completely transformed our honeymoon. The villa they recommended was straight out of a magazine — every detail was perfect, from the transfers to the sunset dinner. Absolutely magical.",
    name: "Aanya Sharma",
    initials: "AS",
    location: "Mumbai · Santorini",
    date: "March 2026",
    gradient: "from-purple-500 to-fuchsia-500",
    rating: 5,
  },
  {
    quote:
      "Booked our family ski trip through Traveleo and the experience was seamless. Price-drop protection saved us ₹8,000 automatically — I'll never book anywhere else.",
    name: "Rohan Mehta",
    initials: "RM",
    location: "Delhi · Switzerland",
    date: "January 2026",
    gradient: "from-blue-500 to-cyan-400",
    rating: 5,
  },
  {
    quote:
      "The AI trip planner suggested an itinerary I never would have thought of. Our overwater villa had a glass floor above the lagoon, and their 24/7 team resolved a last-minute issue in minutes.",
    name: "Priya Nair",
    initials: "PN",
    location: "Bengaluru · Maldives",
    date: "February 2026",
    gradient: "from-fuchsia-500 to-rose-500",
    rating: 5,
  },
];

/* -------------------------------- Component ------------------------------- */

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#080C1A" }}
    >
      <style>{`
        @keyframes testFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes testBlobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes testStarPop {
          0% { opacity: 0; transform: scale(0.3) rotate(-15deg); }
          60% { opacity: 1; transform: scale(1.25) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes testAvatarIn {
          0% { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }

        .test-fade-up { opacity: 0; }
        .test-fade-up.is-visible { animation: testFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .test-blob { animation: testBlobFloat 10s ease-in-out infinite; }

        .test-card {
          position: relative;
          --mx: 50%;
          --my: 50%;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.4s ease;
        }
        .test-card:hover {
          transform: translateY(-6px);
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: 0 22px 44px -18px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.1);
        }
        .test-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(260px circle at var(--mx) var(--my), rgba(168,85,247,0.14), transparent 65%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .test-card:hover::before { opacity: 1; }

        .test-quote-mark {
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .test-card:hover .test-quote-mark {
          transform: scale(1.08) rotate(-4deg);
          opacity: 0.16;
        }

        .test-star {
          opacity: 0;
        }
        .test-fade-up.is-visible .test-star {
          animation: testStarPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        .test-avatar {
          opacity: 0;
        }
        .test-fade-up.is-visible .test-avatar {
          animation: testAvatarIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .test-card:hover .test-avatar {
          transform: scale(1.06);
        }
        .test-avatar {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        @media (prefers-reduced-motion: reduce) {
          .test-fade-up { opacity: 1; animation: none !important; }
          .test-blob { animation: none; }
          .test-card:hover { transform: none; }
          .test-star, .test-avatar { animation: none !important; opacity: 1; }
          .test-card:hover .test-avatar { transform: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="test-blob pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[110px]" />
      <div aria-hidden className="test-blob pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" style={{ animationDelay: "3.5s" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">
          <p
            className={`test-fade-up ${isVisible ? "is-visible" : ""} text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400/80`}
            style={{ animationDelay: "0s" }}
          >
            Real Stories
          </p>
          <h2
            className={`test-fade-up ${isVisible ? "is-visible" : ""} mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl`}
            style={{ animationDelay: "0.1s" }}
          >
            Travelers love us
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              className={`test-fade-up test-card ${isVisible ? "is-visible" : ""} relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              {/* Decorative quote mark */}
              <div className="test-quote-mark pointer-events-none absolute right-4 top-4 text-fuchsia-400/10">
                <QuoteIcon />
              </div>

              {/* Stars */}
              <div className="relative flex gap-1 text-amber-300">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span
                    key={si}
                    className="test-star"
                    style={{ animationDelay: `${0.3 + i * 0.1 + si * 0.06}s` }}
                  >
                    <StarIcon />
                  </span>
                ))}
              </div>

              {/* Quote text */}
              <p className="relative mt-4 text-sm leading-relaxed text-white/60">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="relative mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <span
                  className={`test-avatar flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-xs font-bold text-white`}
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.location} · {t.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
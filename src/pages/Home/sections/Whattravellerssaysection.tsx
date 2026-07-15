import React, { useEffect, useRef, useState } from "react";

/**
 * "What Travellers Say" — testimonial carousel section.
 * Visually paired with TravelInspirationSection: same fade/slide-in
 * conventions on scroll, same IntersectionObserver gate, same
 * "inline styles for brand colors + Tailwind for layout" split.
 *
 * Background gradient uses the two navy tones from the brief:
 *   #0D1B3E (deep navy, top-left)  ->  #1E3A8A (royal blue, bottom-right)
 */

interface Testimonial {
  name: string;
  location: string;
  tripType: string;
  date: string;
  avatar: string;
  quote: string;
  verified: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Mehta",
    location: "Mumbai, India",
    tripType: "Bali Honeymoon Package",
    date: "March 2024",
    avatar:
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_96,h_96,c_thumb,g_face/samples/people/kitchen-bar.jpg",
    quote:
      "Wanderlux made our Bali honeymoon absolutely magical. The villa had a private infinity pool overlooking the jungle. Every detail was perfect — transfers, meals, even a surprise flower bath!",
    verified: true,
  },
  {
    name: "Arjun Nair",
    location: "Bengaluru, India",
    tripType: "Switzerland Family Tour",
    date: "January 2024",
    avatar:
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_96,h_96,c_thumb,g_face/samples/people/smiling-man.jpg",
    quote:
      "From the train tickets to the mountain-view hotel, everything was planned down to the minute. Our kids still talk about the cable car ride up to Titlis. Worth every rupee.",
    verified: true,
  },
  {
    name: "Sana Iyer",
    location: "Pune, India",
    tripType: "Japan Cherry Blossom Trip",
    date: "April 2024",
    avatar:
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_96,h_96,c_thumb,g_face/samples/people/smiling-woman.jpg",
    quote:
      "I've booked with three other agencies before — none came close. Our guide in Kyoto knew every hidden alley and quiet shrine away from the crowds. Seamless from start to finish.",
    verified: true,
  },
];

/* ---------------------------------- Icons --------------------------------- */

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill={filled ? "#D9A441" : "none"}
    stroke="#D9A441"
    strokeWidth={filled ? 0 : 1.2}
  >
    <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
  </svg>
);

const CheckBadge: React.FC = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="#3B82F6">
    <circle cx="10" cy="10" r="10" fill="#3B82F6" />
    <path
      d="M6 10.2l2.4 2.4L14.2 7"
      stroke="white"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ChevronIcon: React.FC<{ direction: "left" | "right" }> = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    {direction === "left" ? <path d="m15 5-7 7 7 7" /> : <path d="m9 5 7 7-7 7" />}
  </svg>
);

/* -------------------------------- Component ------------------------------- */

const WhatTravellersSaySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [avatarFailed, setAvatarFailed] = useState<Record<number, boolean>>({});
  const total = TESTIMONIALS.length;

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

  // Gentle autoplay, paused on hover.
  const hoverRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (!hoverRef.current) setActive((a) => (a + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  const goPrev = () => setActive((a) => (a - 1 + total) % total);
  const goNext = () => setActive((a) => (a + 1) % total);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-8 lg:px-16"
      style={{
        background: "linear-gradient(135deg, #0D1B3E 0%, #16295E 45%, #1E3A8A 100%)",
      }}
    >
      <style>{`
        @keyframes wtsLineGrow { to { width: 28px; } }
        @keyframes wtsFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wtsCardIn {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes wtsGlowDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(3%, -4%); }
        }

        .wts-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #D9A441;
          animation: wtsLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .wts-fade-up { opacity: 0; }
        .wts-fade-up.is-visible { animation: wtsFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .wts-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          animation: wtsGlowDrift 10s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .wts-card-key { animation: wtsCardIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }

        .wts-arrow {
          transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .wts-arrow:hover { background-color: rgba(255,255,255,0.12); transform: translateY(-1px); }

        .wts-dot {
          height: 6px;
          border-radius: 9999px;
          transition: width 0.3s ease, background-color 0.3s ease;
          background-color: rgba(255,255,255,0.25);
          width: 6px;
        }
        .wts-dot.is-active {
          width: 22px;
          background-color: #D9A441;
        }
        .wts-dot:not(.is-active):hover { background-color: rgba(255,255,255,0.45); }

        @media (prefers-reduced-motion: reduce) {
          .wts-fade-up { opacity: 1; animation: none !important; }
          .wts-glow { animation: none; }
          .wts-card-key { animation: none; }
        }
      `}</style>

      {/* Ambient glows for depth on the flat gradient */}
      <div className="wts-glow" style={{ top: "-10%", left: "-6%", width: 320, height: 320, background: "rgba(59,130,246,0.25)" }} />
      <div className="wts-glow" style={{ bottom: "-14%", right: "-8%", width: 380, height: 380, background: "rgba(217,164,65,0.12)", animationDelay: "1.5s" }} />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Heading */}
        <p
          className={`wts-fade-up ${isVisible ? "is-visible" : ""} flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em]`}
          style={{ animationDelay: "0s", color: "#D9A441" }}
        >
          <span className="wts-eyebrow-line" />
          Verified Reviews
          <span className="wts-eyebrow-line" />
        </p>
        <h2
          className={`wts-fade-up ${isVisible ? "is-visible" : ""} mt-3 font-serif text-3xl font-bold text-white sm:text-4xl`}
          style={{ animationDelay: "0.08s" }}
        >
          What Travellers Say
        </h2>
        <p
          className={`wts-fade-up ${isVisible ? "is-visible" : ""} mt-2 text-sm`}
          style={{ animationDelay: "0.14s", color: "rgba(226,232,240,0.65)" }}
        >
          Real stories from real adventurers across the globe.
        </p>

        {/* Card */}
        <div
          className={`wts-fade-up ${isVisible ? "is-visible" : ""} mt-10`}
          style={{ animationDelay: "0.22s" }}
        >
          <div
            key={active}
            className="wts-card-key mx-auto max-w-xl rounded-2xl border p-6 text-left backdrop-blur-sm sm:p-8"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            <p className="mt-4 font-serif text-[15px] italic leading-relaxed text-white/90 sm:text-base">
              "{current.quote}"
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                  {!avatarFailed[active] ? (
                    <img
                      src={current.avatar}
                      alt={current.name}
                      onError={() => setAvatarFailed((prev) => ({ ...prev, [active]: true }))}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(135deg, hsl(${(active * 67) % 360} 55% 45%), hsl(${(active * 67 + 40) % 360} 45% 25%))`,
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{current.name}</span>
                    {current.verified && <CheckBadge />}
                  </div>
                  <p className="text-xs" style={{ color: "rgba(226,232,240,0.55)" }}>
                    {current.location}
                  </p>
                  <p className="text-[11px]" style={{ color: "rgba(217,164,65,0.85)" }}>
                    {current.tripType}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[11px]" style={{ color: "rgba(226,232,240,0.4)" }}>
                {current.date}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div
          className={`wts-fade-up ${isVisible ? "is-visible" : ""} mt-7 flex items-center justify-center gap-4`}
          style={{ animationDelay: "0.3s" }}
        >
          <button
            aria-label="Previous testimonial"
            onClick={goPrev}
            className="wts-arrow flex h-8 w-8 items-center justify-center rounded-full border text-white/70"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`wts-dot ${i === active ? "is-active" : ""}`}
              />
            ))}
          </div>

          <button
            aria-label="Next testimonial"
            onClick={goNext}
            className="wts-arrow flex h-8 w-8 items-center justify-center rounded-full border text-white/70"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatTravellersSaySection;
import React, { useEffect, useRef, useState } from "react";

// Replace these with your actual asset paths — any filenames work.
import tripGreeceImage from "../../../assets/trip-greece.png";
import tripRomeAvatar from "../../../assets/trip-rome-avatar.png";
import authorAvatar from "../../../assets/trip-rome-avatar.png";

interface Step {
  title: string;
  description: string;
  bg: string;
  icon: React.ReactNode;
}

const TargetIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const WalletIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="6" width="20" height="14" rx="2.5" />
    <path d="M2 10h20" />
    <path d="M16 15h2.5" />
  </svg>
);

const LuggageIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8" />
    <path d="M9 12v4M15 12v4" />
  </svg>
);

const LeafIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 20c8 0 13-5 13-13V4h-3C6 4 4 12 4 20Z" />
  </svg>
);

const BookmarkIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M6 3.5h12v17l-6-4-6 4v-17Z" />
  </svg>
);

const CompassIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="9" />
    <path d="m14.5 9.5-2 5-3 1.5 2-5 3-1.5Z" />
  </svg>
);

const PeopleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20" />
    <circle cx="9.5" cy="7.5" r="3" />
    <path d="M18 20v-1.5a3.5 3.5 0 0 0-2.3-3.3" />
    <path d="M14.5 4.6a3 3 0 0 1 0 5.8" />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 20.5s-7-4.35-9.5-8.7C.8 8.2 2.3 4.5 6 4.5c2 0 3.3 1 4 2.3C10.7 5.5 12 4.5 14 4.5c3.7 0 5.2 3.7 3.5 7.3-2.5 4.35-9.5 8.7-9.5 8.7Z" />
  </svg>
);

const STEPS: Step[] = [
  {
    title: "Choose Destination",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    bg: "bg-amber-400",
    icon: <TargetIcon />,
  },
  {
    title: "Make Payment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    bg: "bg-orange-500",
    icon: <WalletIcon />,
  },
  {
    title: "Reach Airport on Selected Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    bg: "bg-teal-800",
    icon: <LuggageIcon />,
  },
];

const BookTripSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setProgress(40), 700);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes bookFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bookFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes badgeIn {
          from { opacity: 0; transform: translate(16px, 16px) scale(0.9); }
          to { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        .book-fade-up {
          opacity: 0;
          animation: bookFadeUp 0.7s ease-out forwards;
        }
        .book-fade-in {
          opacity: 0;
          animation: bookFadeIn 0.8s ease-out forwards;
        }
        .book-badge-in {
          opacity: 0;
          animation: badgeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .book-fade-up, .book-fade-in, .book-badge-in { opacity: 1; animation: none; }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Left — copy + steps */}
        <div>
          {isVisible && (
            <>
              <p
                className="book-fade-up text-sm font-bold uppercase tracking-[0.2em] text-blue-600"
                style={{ animationDelay: "0s" }}
              >
                Easy and Fast
              </p>
              <h2
                className="book-fade-up mt-2 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl"
                style={{ animationDelay: "0.08s" }}
              >
                Book Your Next Trip
                <br />
                In 3 Easy Steps
              </h2>

              <div className="mt-10 space-y-8">
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className="book-fade-up group flex items-start gap-4"
                    style={{ animationDelay: `${0.18 + i * 0.12}s` }}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${step.bg} shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right — floating trip card + progress badge */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          {isVisible && (
            <>
              <div
                className="book-fade-in relative rounded-3xl bg-white p-4 shadow-xl shadow-gray-200/70 ring-1 ring-gray-100"
                style={{ animationDelay: "0.15s" }}
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={tripGreeceImage}
                    alt="Trip to Greece"
                    className="h-52 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-56"
                  />
                </div>

                <div className="px-1 pt-4">
                  <h3 className="text-lg font-bold text-gray-900">Trip To Greece</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    14–29 June&nbsp;| &nbsp;by Robbin joseph
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    {[LeafIcon, BookmarkIcon, CompassIcon].map((Icon, i) => (
                      <span
                        key={i}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Icon />
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-sm text-gray-400">
                    <PeopleIcon />
                    24 people going
                  </div>
                </div>
              </div>

              {/* Floating progress badge */}
              <div
                className="book-badge-in absolute -bottom-8 -right-4 flex w-56 items-center gap-3 rounded-2xl bg-white p-3 shadow-xl shadow-gray-300/60 ring-1 ring-gray-100 transition-transform duration-300 hover:-translate-y-1 sm:-right-8 sm:w-60"
                style={{ animationDelay: "0.6s" }}
              >
                <img
                  src={tripRomeAvatar}
                  alt="Trip to Rome"
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-gray-400">Ongoing</span>
                    <span className="text-blue-400">
                      <HeartIcon />
                    </span>
                  </div>
                  <p className="truncate text-sm font-bold text-gray-900">Trip to rome</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-[1200ms] ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-blue-600">
                      {progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Hidden author avatar reference — swap into the card meta row if desired */}
              <img src={authorAvatar} alt="" className="hidden" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookTripSection;
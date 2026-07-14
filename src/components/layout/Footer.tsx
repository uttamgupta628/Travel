import React, { useEffect, useRef, useState } from "react";

// Replace with your actual asset paths — any filenames work.
import googlePlayBadge from "../../assets/badge-google-play.png";
import appStoreBadge from "../../assets/badge-app-store.png";

interface LinkColumn {
  heading: string;
  links: string[];
}

const COLUMNS: LinkColumn[] = [
  { heading: "Company", links: ["About", "Tours", "Vlog"] },
  { heading: "Contact", links: ["Help/FAQ", "Press", "Affilates"] },
  { heading: "More", links: ["Airlinefees", "Airline", "Low fare tips"] },
];

const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7C16.5 3.6 15.5 3.5 14.4 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.7v8h3.3Z" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1c.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.5-1.3 2-2Z" />
  </svg>
);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-white px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <style>{`
        @keyframes footFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .foot-fade-up {
          opacity: 0;
          animation: footFadeUp 0.6s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .foot-fade-up { opacity: 1 !important; animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Logo + tagline */}
          {isVisible && (
            <div className="sm:col-span-2 lg:col-span-4" style={{ animation: "footFadeUp 0.6s ease-out forwards", animationDelay: "0s", opacity: 0 }}>
              <p className="text-lg font-semibold tracking-wide text-black">LOGO</p>
              <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-gray-600">
                Book your trip in minute, get full Control for much longer.
              </p>
            </div>
          )}

          {/* Link columns */}
          {isVisible &&
            COLUMNS.map((col, i) => (
              <div
                key={col.heading}
                className="lg:col-span-2"
                style={{ animation: "footFadeUp 0.6s ease-out forwards", animationDelay: `${0.08 + i * 0.08}s`, opacity: 0 }}
              >
                <h3 className="text-base font-bold text-black">{col.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group inline-flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-black"
                      >
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          {link}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {/* Social + app badges */}
          {isVisible && (
            <div
              className="sm:col-span-2 lg:col-span-2"
              style={{ animation: "footFadeUp 0.6s ease-out forwards", animationDelay: "0.32s", opacity: 0 }}
            >
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:-translate-y-1 hover:bg-gray-200"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 hover:-translate-y-1 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #4f5bd5, #962fbf, #d62976, #fa7e1e, #feda75)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:-translate-y-1 hover:bg-gray-200"
                >
                  <TwitterIcon />
                </a>
              </div>

              <p className="mt-6 text-base font-semibold text-black">Discover our app</p>

              <div className="mt-3 flex items-center gap-3">
                <a
                  href="#"
                  className="inline-block transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href="#"
                  className="inline-block transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src={appStoreBadge}
                    alt="Available on the App Store"
                    className="h-10 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-14 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          All rights reserved@jadoo.co
        </div>
      </div>
    </footer>
  );
};

export default Footer;
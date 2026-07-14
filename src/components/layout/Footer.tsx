// import React, { useEffect, useRef, useState } from "react";

// // Replace with your actual asset paths — any filenames work.
// import googlePlayBadge from "../../assets/badge-google-play.png";
// import appStoreBadge from "../../assets/badge-app-store.png";

// interface LinkColumn {
//   heading: string;
//   links: string[];
// }

// const COLUMNS: LinkColumn[] = [
//   { heading: "Company", links: ["About", "Tours", "Vlog"] },
//   { heading: "Contact", links: ["Help/FAQ", "Press", "Affilates"] },
//   { heading: "More", links: ["Airlinefees", "Airline", "Low fare tips"] },
// ];

// const FacebookIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
//     <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7C16.5 3.6 15.5 3.5 14.4 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.7v8h3.3Z" />
//   </svg>
// );

// const TwitterIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
//     <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1c.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.5-1.3 2-2Z" />
//   </svg>
// );

// const Footer: React.FC = () => {
//   const footerRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const el = footerRef.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <footer ref={footerRef} className="relative overflow-hidden bg-white px-4 pb-8 pt-16 sm:px-6 lg:px-8">
//       <style>{`
//         @keyframes footFadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .foot-fade-up {
//           opacity: 0;
//           animation: footFadeUp 0.6s ease-out forwards;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .foot-fade-up { opacity: 1 !important; animation: none !important; }
//         }
//       `}</style>

//       <div className="mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
//           {/* Logo + tagline */}
//           {isVisible && (
//             <div className="sm:col-span-2 lg:col-span-4" style={{ animation: "footFadeUp 0.6s ease-out forwards", animationDelay: "0s", opacity: 0 }}>
//               <p className="text-lg font-semibold tracking-wide text-black">LOGO</p>
//               <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-gray-600">
//                 Book your trip in minute, get full Control for much longer.
//               </p>
//             </div>
//           )}

//           {/* Link columns */}
//           {isVisible &&
//             COLUMNS.map((col, i) => (
//               <div
//                 key={col.heading}
//                 className="lg:col-span-2"
//                 style={{ animation: "footFadeUp 0.6s ease-out forwards", animationDelay: `${0.08 + i * 0.08}s`, opacity: 0 }}
//               >
//                 <h3 className="text-base font-bold text-black">{col.heading}</h3>
//                 <ul className="mt-4 space-y-3">
//                   {col.links.map((link) => (
//                     <li key={link}>
//                       <a
//                         href="#"
//                         className="group inline-flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-black"
//                       >
//                         <span className="transition-transform duration-200 group-hover:translate-x-1">
//                           {link}
//                         </span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}

//           {/* Social + app badges */}
//           {isVisible && (
//             <div
//               className="sm:col-span-2 lg:col-span-2"
//               style={{ animation: "footFadeUp 0.6s ease-out forwards", animationDelay: "0.32s", opacity: 0 }}
//             >
//               <div className="flex items-center gap-3">
//                 <a
//                   href="#"
//                   aria-label="Facebook"
//                   className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:-translate-y-1 hover:bg-gray-200"
//                 >
//                   <FacebookIcon />
//                 </a>
//                 <a
//                   href="#"
//                   aria-label="Instagram"
//                   className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 hover:-translate-y-1 hover:scale-105"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #4f5bd5, #962fbf, #d62976, #fa7e1e, #feda75)",
//                   }}
//                 >
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
//                     <rect x="3" y="3" width="18" height="18" rx="5" />
//                     <circle cx="12" cy="12" r="4" />
//                     <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   aria-label="Twitter"
//                   className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:-translate-y-1 hover:bg-gray-200"
//                 >
//                   <TwitterIcon />
//                 </a>
//               </div>

//               <p className="mt-6 text-base font-semibold text-black">Discover our app</p>

//               <div className="mt-3 flex items-center gap-3">
//                 <a
//                   href="#"
//                   className="inline-block transition-transform duration-200 hover:-translate-y-1"
//                 >
//                   <img
//                     src={googlePlayBadge}
//                     alt="Get it on Google Play"
//                     className="h-10 w-auto object-contain"
//                   />
//                 </a>
//                 <a
//                   href="#"
//                   className="inline-block transition-transform duration-200 hover:-translate-y-1"
//                 >
//                   <img
//                     src={appStoreBadge}
//                     alt="Available on the App Store"
//                     className="h-10 w-auto object-contain"
//                   />
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-14 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
//           All rights reserved@jadoo.co
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons --------------------------------- */

const LogoMark: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.5c.5 3.4 2.7 5.6 6.1 6.1-3.4.5-5.6 2.7-6.1 6.1-.5-3.4-2.7-5.6-6.1-6.1 3.4-.5 5.6-2.7 6.1-6.1Z" />
  </svg>
);
const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M18.9 3H22l-7.4 8.4L23.3 21h-6.8l-5.3-6.6L4.9 21H1.8l7.9-9L1 3h6.9l4.8 6.1L18.9 3Zm-1.2 16h1.9L7.4 5H5.4l12.3 14Z" />
  </svg>
);
const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.4V21h3.1Z" />
  </svg>
);
const LinkedinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21h-3.37v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V21H9.1V8.5h3.24v1.71h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.84 2.26 4.84 6.17V21Z" />
  </svg>
);
const ChevronIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const SOCIALS = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
];

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog", "Investors"],
  },
  {
    title: "Destinations",
    links: ["Europe", "Asia Pacific", "Middle East", "Americas", "Africa"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Cancellations", "Refund Status", "Accessibility"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Security", "Sitemap"],
  },
];

/* -------------------------------- Component ------------------------------- */

const SiteFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const node = footerRef.current;
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

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden px-4 pt-20 pb-8 sm:px-6 lg:px-8" style={{ backgroundColor: "#050810" }}>
      <style>{`
        @keyframes ftFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ftBlobFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.05); }
        }
        @keyframes ftSparkleSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .ft-fade-up { opacity: 0; }
        .ft-fade-up.is-visible { animation: ftFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ft-blob { animation: ftBlobFloat 11s ease-in-out infinite; }

        .ft-logo-mark {
          animation: ftSparkleSpin 8s linear infinite;
        }

        .ft-social {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .ft-social:hover {
          transform: translateY(-3px);
          border-color: rgba(168,85,247,0.5);
          background: rgba(168,85,247,0.12);
          color: #fff;
        }
        .ft-social:active { transform: translateY(0) scale(0.94); }

        .ft-link {
          position: relative;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .ft-link::before {
          content: "";
          position: absolute;
          left: -14px;
          top: 50%;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #a855f7, #d946ef);
          transform: translateY(-50%) scale(0);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ft-link:hover {
          color: #fff;
          padding-left: 14px;
        }
        .ft-link:hover::before {
          transform: translateY(-50%) scale(1);
        }

        .ft-col-title {
          position: relative;
        }
        .ft-col-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 18px;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #a855f7, #d946ef);
        }

        .ft-selector {
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .ft-selector:hover {
          border-color: rgba(168,85,247,0.4);
          background: rgba(255,255,255,0.04);
        }

        .ft-divider {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .ft-fade-up { opacity: 1; animation: none !important; }
          .ft-blob, .ft-logo-mark { animation: none; }
          .ft-social:hover, .ft-link:hover { transform: none; }
        }
      `}</style>

      {/* Ambient glow accents */}
      <div aria-hidden className="ft-blob pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[110px]" />
      <div aria-hidden className="ft-blob pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_repeat(4,1fr)] md:gap-8">
          {/* Brand column */}
          <div className={`ft-fade-up ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "0s" }}>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-900/40">
                <span className="ft-logo-mark inline-flex">
                  <LogoMark />
                </span>
              </span>
              <span className="text-lg font-extrabold text-white">Traveleo</span>
            </div>
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-white/40">
              The world's most trusted premium travel platform. Crafting unforgettable journeys since 2019.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="ft-social flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col, i) => (
            <div
              key={col.title}
              className={`ft-fade-up ${isVisible ? "is-visible" : ""}`}
              style={{ animationDelay: `${0.08 + i * 0.06}s` }}
            >
              <h4 className="ft-col-title text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="ft-link text-sm text-white/40 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={`ft-fade-up ${isVisible ? "is-visible" : ""} ft-divider mt-14 h-px w-full`} style={{ animationDelay: "0.4s" }} />

        {/* Bottom bar */}
        <div
          className={`ft-fade-up ${isVisible ? "is-visible" : ""} mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row`}
          style={{ animationDelay: "0.46s" }}
        >
          <p className="text-xs text-white/30">
            © {year} Traveleo Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <button type="button" className="ft-selector flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/50">
              <img src="https://flagcdn.com/w20/in.png" alt="India flag" className="h-3 w-4 rounded-[2px] object-cover" />
              India
              <ChevronIcon />
            </button>
            <button type="button" className="ft-selector flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/50">
              INR ₹
              <ChevronIcon />
            </button>
            <button type="button" className="ft-selector flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/50">
              English
              <ChevronIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
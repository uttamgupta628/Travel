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




// import React, { useEffect, useRef, useState } from "react";

// /* ---------------------------------- Icons --------------------------------- */

// const LogoMark: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//     <path d="M12 2.5c.5 3.4 2.7 5.6 6.1 6.1-3.4.5-5.6 2.7-6.1 6.1-.5-3.4-2.7-5.6-6.1-6.1 3.4-.5 5.6-2.7 6.1-6.1Z" />
//   </svg>
// );
// const InstagramIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
//     <rect x="3" y="3" width="18" height="18" rx="5" />
//     <circle cx="12" cy="12" r="3.6" />
//     <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
//   </svg>
// );
// const TwitterIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
//     <path d="M18.9 3H22l-7.4 8.4L23.3 21h-6.8l-5.3-6.6L4.9 21H1.8l7.9-9L1 3h6.9l4.8 6.1L18.9 3Zm-1.2 16h1.9L7.4 5H5.4l12.3 14Z" />
//   </svg>
// );
// const FacebookIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
//     <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.4V21h3.1Z" />
//   </svg>
// );
// const LinkedinIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
//     <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21h-3.37v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V21H9.1V8.5h3.24v1.71h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.84 2.26 4.84 6.17V21Z" />
//   </svg>
// );
// const ChevronIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
//     <path d="m6 9 6 6 6-6" />
//   </svg>
// );

// /* --------------------------------- Data --------------------------------- */

// const SOCIALS = [
//   { icon: InstagramIcon, label: "Instagram", href: "#" },
//   { icon: TwitterIcon, label: "Twitter", href: "#" },
//   { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
//   { icon: FacebookIcon, label: "Facebook", href: "#" },
// ];

// const FOOTER_COLUMNS = [
//   {
//     title: "Company",
//     links: ["About Us", "Careers", "Press", "Blog", "Investors"],
//   },
//   {
//     title: "Destinations",
//     links: ["Europe", "Asia Pacific", "Middle East", "Americas", "Africa"],
//   },
//   {
//     title: "Support",
//     links: ["Help Center", "Contact Us", "Cancellations", "Refund Status", "Accessibility"],
//   },
//   {
//     title: "Legal",
//     links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Security", "Sitemap"],
//   },
// ];

// /* -------------------------------- Component ------------------------------- */

// const SiteFooter: React.FC = () => {
//   const footerRef = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const year = new Date().getFullYear();

//   useEffect(() => {
//     const node = footerRef.current;
//     if (!node) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     observer.observe(node);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <footer ref={footerRef} className="relative isolate overflow-hidden px-4 pt-20 pb-8 sm:px-6 lg:px-8" style={{ backgroundColor: "#050810" }}>
//       <style>{`
//         @keyframes ftFadeUp {
//           from { opacity: 0; transform: translateY(22px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes ftBlobFloat {
//           0%, 100% { transform: translateY(0) scale(1); }
//           50% { transform: translateY(-16px) scale(1.05); }
//         }
//         @keyframes ftSparkleSpin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .ft-fade-up { opacity: 0; }
//         .ft-fade-up.is-visible { animation: ftFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
//         .ft-blob { animation: ftBlobFloat 11s ease-in-out infinite; }

//         .ft-logo-mark {
//           animation: ftSparkleSpin 8s linear infinite;
//         }

//         .ft-social {
//           transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
//         }
//         .ft-social:hover {
//           transform: translateY(-3px);
//           border-color: rgba(168,85,247,0.5);
//           background: rgba(168,85,247,0.12);
//           color: #fff;
//         }
//         .ft-social:active { transform: translateY(0) scale(0.94); }

//         .ft-link {
//           position: relative;
//           transition: color 0.2s ease, padding-left 0.2s ease;
//         }
//         .ft-link::before {
//           content: "";
//           position: absolute;
//           left: -14px;
//           top: 50%;
//           width: 5px;
//           height: 5px;
//           border-radius: 9999px;
//           background: linear-gradient(135deg, #a855f7, #d946ef);
//           transform: translateY(-50%) scale(0);
//           transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         .ft-link:hover {
//           color: #fff;
//           padding-left: 14px;
//         }
//         .ft-link:hover::before {
//           transform: translateY(-50%) scale(1);
//         }

//         .ft-col-title {
//           position: relative;
//         }
//         .ft-col-title::after {
//           content: "";
//           position: absolute;
//           left: 0;
//           bottom: -6px;
//           width: 18px;
//           height: 2px;
//           border-radius: 9999px;
//           background: linear-gradient(90deg, #a855f7, #d946ef);
//         }

//         .ft-selector {
//           transition: border-color 0.25s ease, background 0.25s ease;
//         }
//         .ft-selector:hover {
//           border-color: rgba(168,85,247,0.4);
//           background: rgba(255,255,255,0.04);
//         }

//         .ft-divider {
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .ft-fade-up { opacity: 1; animation: none !important; }
//           .ft-blob, .ft-logo-mark { animation: none; }
//           .ft-social:hover, .ft-link:hover { transform: none; }
//         }
//       `}</style>

//       {/* Ambient glow accents */}
//       <div aria-hidden className="ft-blob pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[110px]" />
//       <div aria-hidden className="ft-blob pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" style={{ animationDelay: "4s" }} />

//       <div className="relative mx-auto max-w-6xl">
//         <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_repeat(4,1fr)] md:gap-8">
//           {/* Brand column */}
//           <div className={`ft-fade-up ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "0s" }}>
//             <div className="flex items-center gap-2">
//               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-900/40">
//                 <span className="ft-logo-mark inline-flex">
//                   <LogoMark />
//                 </span>
//               </span>
//               <span className="text-lg font-extrabold text-white">Traveleo</span>
//             </div>
//             <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-white/40">
//               The world's most trusted premium travel platform. Crafting unforgettable journeys since 2019.
//             </p>
//             <div className="mt-5 flex gap-2">
//               {SOCIALS.map(({ icon: Icon, label, href }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   aria-label={label}
//                   className="ft-social flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50"
//                 >
//                   <Icon />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Link columns */}
//           {FOOTER_COLUMNS.map((col, i) => (
//             <div
//               key={col.title}
//               className={`ft-fade-up ${isVisible ? "is-visible" : ""}`}
//               style={{ animationDelay: `${0.08 + i * 0.06}s` }}
//             >
//               <h4 className="ft-col-title text-xs font-bold uppercase tracking-[0.2em] text-white/80">
//                 {col.title}
//               </h4>
//               <ul className="mt-5 space-y-3">
//                 {col.links.map((link) => (
//                   <li key={link}>
//                     <a href="#" className="ft-link text-sm text-white/40 hover:text-white">
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className={`ft-fade-up ${isVisible ? "is-visible" : ""} ft-divider mt-14 h-px w-full`} style={{ animationDelay: "0.4s" }} />

//         {/* Bottom bar */}
//         <div
//           className={`ft-fade-up ${isVisible ? "is-visible" : ""} mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row`}
//           style={{ animationDelay: "0.46s" }}
//         >
//           <p className="text-xs text-white/30">
//             © {year} Traveleo Pvt. Ltd. All rights reserved.
//           </p>

//           <div className="flex items-center gap-2">
//             <button type="button" className="ft-selector flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/50">
//               <img src="https://flagcdn.com/w20/in.png" alt="India flag" className="h-3 w-4 rounded-[2px] object-cover" />
//               India
//               <ChevronIcon />
//             </button>
//             <button type="button" className="ft-selector flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/50">
//               INR ₹
//               <ChevronIcon />
//             </button>
//             <button type="button" className="ft-selector flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/50">
//               English
//               <ChevronIcon />
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default SiteFooter;



import React from "react";

/**
 * Site footer — dark navy, four link columns, social row, contact
 * details, and a bottom bar with legal links, language/currency
 * selectors, store badges, and a "trusted by" partner strip.
 *
 * Footers render at the bottom of an already-scrolled page, so this
 * skips the IntersectionObserver reveal used elsewhere in the set and
 * relies on simple hover feedback instead.
 */

interface LinkColumn {
  heading: string;
  links: string[];
}

const COLUMNS: LinkColumn[] = [
  {
    heading: "Destinations",
    links: ["Bali, Indonesia", "Tokyo, Japan", "Dubai, UAE", "Paris, France", "Maldives", "Santorini, Greece", "Iceland", "Switzerland"],
  },
  {
    heading: "Travel",
    links: ["Holiday Packages", "Luxury Hotels", "Flight Booking", "Car Rentals", "Cruise Deals", "Adventure Tours", "Visa Services"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Booking Guide", "Cancellation Policy", "Travel Insurance", "Accessibility", "Safety Guidelines"],
  },
  {
    heading: "Company",
    links: ["About Wanderlux", "Careers", "Press & Media", "Partner Program", "Affiliate Network", "Investor Relations"],
  },
];

const TRUSTED_BY = ["IATA", "ATOL", "ABTA", "TripAdvisor", "Booking.com"];

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M18.9 3H21l-6.6 7.5L22.2 21h-6.2l-4.9-6.4L5.5 21H3.3l7-8-7.5-10h6.3l4.4 5.9L18.9 3Zm-1.1 16.2h1.2L7.3 4.7H6l11.8 14.5Z" />
  </svg>
);
const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.7c0-.4.3-.7.5-.7Z" />
  </svg>
);
const YoutubeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M22 12s0-3.2-.4-4.7a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.8 2.8 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.8 2.8 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.8 2.8 0 0 0 2-2C22 15.2 22 12 22 12ZM10 15V9l5.2 3-5.2 3Z" />
  </svg>
);
const PhoneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.4a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const MailIconSm: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const GlobeIconSm: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
);
const CompassLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
    <circle cx="12" cy="12" r="10" fill="#D9A441" />
    <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" fill="white" />
  </svg>
);
const AppleIconSm: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="white">
    <path d="M16.365 1.43c0 1.14-.463 2.084-1.14 2.797-.755.79-1.99 1.396-2.997 1.318-.13-1.096.41-2.253 1.09-2.97C14.09.833 15.32.223 16.365 1.43ZM20.5 17.2c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.39 3.5-4.13 3.52-1.54.02-1.94-1.01-4.03-1-2.1.01-2.54 1.02-4.08 1-1.74-.02-3.06-1.77-4.05-3.33C.36 16.7-.42 12.02 1.4 8.86c1.28-2.23 3.4-3.54 5.38-3.54 1.97 0 3.21 1.08 4.84 1.08 1.58 0 2.55-1.08 4.83-1.08 1.77 0 3.65.97 4.98 2.64-4.38 2.4-3.67 8.67-.93 9.24Z" />
  </svg>
);
const PlayIconSm: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="white">
    <path d="M4 3.5c0-.63.69-1.02 1.24-.7l14.6 8.5c.55.32.55 1.08 0 1.4l-14.6 8.5c-.55.32-1.24-.07-1.24-.7v-17Z" />
  </svg>
);

const SOCIALS = [
  { icon: <TwitterIcon />, label: "Twitter" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <YoutubeIcon />, label: "YouTube" },
];

const SiteFooter: React.FC = () => {
  return (
    <footer className="px-4 pt-14 sm:px-8 lg:px-16" style={{ backgroundColor: "#0D1B3E" }}>
      <style>{`
        .ftr-link { transition: color 0.2s ease; color: rgba(226,232,240,0.55); }
        .ftr-link:hover { color: #D9A441; }

        .ftr-social {
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .ftr-social:hover { background-color: rgba(217,164,65,0.15); border-color: rgba(217,164,65,0.4); transform: translateY(-2px); color: #D9A441; }

        .ftr-pill { transition: border-color 0.2s ease, background-color 0.2s ease; }
        .ftr-pill:hover { border-color: rgba(255,255,255,0.3); background-color: rgba(255,255,255,0.06); }

        .ftr-store-btn { transition: transform 0.2s ease, background-color 0.2s ease; }
        .ftr-store-btn:hover { transform: translateY(-2px); background-color: rgba(255,255,255,0.1); }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <CompassLogo />
              <span className="font-serif text-lg font-bold text-white">Wanderlux</span>
            </div>
            <p className="mt-3 max-w-[220px] text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>
              Your trusted partner for world-class travel experiences. Crafting extraordinary journeys since 2018.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="ftr-social flex h-7 w-7 items-center justify-center rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(226,232,240,0.7)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 text-xs" style={{ color: "rgba(226,232,240,0.55)" }}>
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <span>+1 800 WANDERLUX</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIconSm />
                <span>hello@wanderlux.com</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeIconSm />
                <span>wanderlux.com</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(226,232,240,0.35)" }}>
                {col.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="ftr-link text-xs">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px]" style={{ color: "rgba(226,232,240,0.4)" }}>
            © 2025 Wanderlux Travel Pvt. Ltd. All rights reserved.{" "}
            <a href="#" className="ftr-link">Privacy Policy</a>{" · "}
            <a href="#" className="ftr-link">Terms</a>{" · "}
            <a href="#" className="ftr-link">Cookies</a>
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              className="ftr-pill rounded-full border px-3.5 py-1.5 text-[11px] font-medium text-white"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              English
            </button>
            <button
              className="ftr-pill rounded-full border px-3.5 py-1.5 text-[11px] font-medium text-white"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              USD $
            </button>
            <button
              className="ftr-store-btn flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-medium text-white"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              <AppleIconSm />
              App Store
            </button>
            <button
              className="ftr-store-btn flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-medium text-white"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              <PlayIconSm />
              Play Store
            </button>
          </div>
        </div>

        {/* Trusted by */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t py-5"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(226,232,240,0.3)" }}>
            Trusted By
          </span>
          {TRUSTED_BY.map((name) => (
            <span key={name} className="text-xs font-semibold" style={{ color: "rgba(226,232,240,0.4)" }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
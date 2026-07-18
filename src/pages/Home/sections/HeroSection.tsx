// import React from "react";

// import heroImageOne from "../../../assets/hero-explorer.png";
// import heroImageTwo from "../../../assets/hero-mountains.png";
// import heroImageThree from "../../../assets/hero-landmark.png";

// /* --- Small inline icon set (no extra dependency needed) --- */
// const MapPinIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
//     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );

// const RouteIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
//     <circle cx="6" cy="19" r="2" />
//     <circle cx="18" cy="5" r="2" />
//     <path d="M8 19h8a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H8" />
//   </svg>
// );

// const UsersIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
//     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// );

// const SearchIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
//     <circle cx="11" cy="11" r="8" />
//     <path d="m21 21-4.3-4.3" />
//   </svg>
// );

// const PlayIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const ArrowRightIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
//     <path d="M5 12h14" />
//     <path d="m12 5 7 7-7 7" />
//   </svg>
// );

// const HeroSection: React.FC = () => {
//   return (
//     <section className="relative overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
//       <style>{`
//         @keyframes floatY {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .hero-float { animation: floatY 5s ease-in-out infinite; }
//         .hero-float-slow { animation: floatY 6.5s ease-in-out infinite; }
//         .hero-float-slower { animation: floatY 7.5s ease-in-out infinite; }
//         .hero-fade-up {
//           opacity: 0;
//           animation: fadeInUp 0.7s ease-out forwards;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .hero-float, .hero-float-slow, .hero-float-slower { animation: none; }
//           .hero-fade-up { opacity: 1; animation: none; }
//         }
//       `}</style>

//       <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
//         {/* Left column */}
//         <div className="text-center lg:text-left">
//           <div
//             className="hero-fade-up mb-5 flex items-center justify-center gap-2 lg:justify-start"
//             style={{ animationDelay: "0.05s" }}
//           >
//             <span className="text-2xl">🌍</span>
//             <span className="font-serif text-xl italic text-blue-600">
//               TravelGo
//             </span>
//           </div>

//           <h1
//             className="hero-fade-up text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-[3.4rem]"
//             style={{ animationDelay: "0.15s" }}
//           >
//             Explore the world with
//             <br className="hidden sm:block" /> group of{" "}
//             <span className="font-serif italic text-blue-600">explorers</span>
//           </h1>

//           <p
//             className="hero-fade-up mx-auto mt-5 max-w-md text-gray-500 lg:mx-0"
//             style={{ animationDelay: "0.25s" }}
//           >
//             Join exciting group trips, make new friends and create memories
//             for a lifetime.
//           </p>

//           <div
//             className="hero-fade-up mt-8 flex items-center justify-center gap-5 lg:justify-start"
//             style={{ animationDelay: "0.35s" }}
//           >
//             <button className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40">
//               Explore More
//               <span className="transition-transform duration-300 group-hover:translate-x-1">
//                 <ArrowRightIcon />
//               </span>
//             </button>

//             <button className="flex items-center gap-3 text-sm font-semibold text-gray-800">
//               <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform duration-300 hover:scale-110">
//                 <PlayIcon />
//               </span>
//               Play Demo
//             </button>
//           </div>

//           {/* Search bar */}
//           <div
//             className="hero-fade-up mt-10 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/60 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2"
//             style={{ animationDelay: "0.45s" }}
//           >
//             <div className="flex flex-1 items-center gap-3 px-4 py-2">
//               <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
//                 <MapPinIcon />
//               </span>
//               <div className="text-left">
//                 <p className="text-xs font-semibold text-gray-800">
//                   Location
//                 </p>
//                 <p className="text-xs text-gray-400">Where are you going?</p>
//               </div>
//             </div>
//             <div className="hidden h-8 w-px bg-gray-200 sm:block" />
//             <div className="flex flex-1 items-center gap-3 px-4 py-2">
//               <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
//                 <RouteIcon />
//               </span>
//               <div className="text-left">
//                 <p className="text-xs font-semibold text-gray-800">
//                   Distance
//                 </p>
//                 <p className="text-xs text-gray-400">Distance km/m</p>
//               </div>
//             </div>
//             <div className="hidden h-8 w-px bg-gray-200 sm:block" />
//             <div className="flex flex-1 items-center gap-3 px-4 py-2">
//               <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
//                 <UsersIcon />
//               </span>
//               <div className="text-left">
//                 <p className="text-xs font-semibold text-gray-800">
//                   Max People
//                 </p>
//                 <p className="text-xs text-gray-400">0</p>
//               </div>
//             </div>
//             <button
//               className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 hover:scale-105 sm:ml-2"
//               aria-label="Search"
//             >
//               <SearchIcon />
//             </button>
//           </div>
//         </div>

//         {/* Right column — descending staircase image stack */}
//         <div
//           className="hero-fade-up flex items-start justify-center gap-2 sm:gap-3"
//           style={{ animationDelay: "0.2s" }}
//         >
//           <div className="hero-float h-72 w-36 shrink-0 overflow-hidden rounded-[2rem] border-4 border-blue-400 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 sm:h-108 sm:w-56">
//             <img
//               src={heroImageOne}
//               alt="Explorer overlooking clouds"
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <div className="hero-float-slow mt-6 h-72 w-36 shrink-0 overflow-hidden rounded-[2rem] border-4 border-blue-400 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 sm:mt-10 sm:h-108 sm:w-56">
//             <img
//               src={heroImageTwo}
//               alt="Snow-capped mountains"
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <div className="hero-float-slower mt-14 h-72 w-36 shrink-0 overflow-hidden rounded-[2rem] border-4 border-blue-400 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 sm:mt-20 sm:h-108 sm:w-56">
//             <img
//               src={heroImageThree}
//               alt="Historic landmark"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// import React, { useEffect, useRef, useState } from "react";

// // Background image served through Cloudinary (auto format/quality + smart
// // cropping) instead of a local import. I used a Cloudinary "demo" cloud
// // sample asset here as a stand-in for the mountain-lake scene in your
// // reference — since I can't source the exact licensed photo on your behalf.
// // Swap this for your own Cloudinary cloud name + uploaded photo whenever
// // you have it; everything else keeps working unchanged.
// const heroBackground =
//   "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_1920,h_1080,c_fill,g_auto/pm/mountains_autumn.jpg";

// const SparkleIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
//     <path d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 16.8 10.2 11.2 4.6 9.4 10.2 7.6 12 2Z" />
//   </svg>
// );

// const PlaneMiniIcon: React.FC = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
//     <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
//   </svg>
// );

// interface Stat {
//   value: number;
//   suffix: string;
//   label: string;
// }

// const STATS: Stat[] = [
//   { value: 15, suffix: "M+", label: "Happy Travelers" },
//   { value: 180, suffix: "+", label: "Countries" },
//   { value: 70, suffix: "K+", label: "Hotels" },
//   { value: 300, suffix: "+", label: "Airline Partners" },
// ];

// const useCountUp = (target: number, start: boolean, duration = 1600) => {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     const t0 = performance.now();
//     let frame: number;
//     const tick = (now: number) => {
//       const t = Math.min(1, (now - t0) / duration);
//       const eased = 1 - Math.pow(1 - t, 3);
//       setValue(Math.round(eased * target));
//       if (t < 1) frame = requestAnimationFrame(tick);
//     };
//     frame = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(frame);
//   }, [start, target, duration]);
//   return value;
// };

// const StatItem: React.FC<{ stat: Stat; delay: number; start: boolean }> = ({ stat, delay, start }) => {
//   const count = useCountUp(stat.value, start, 1400 + delay * 500);
//   return (
//     <div
//       className="hero-fade-up text-center"
//       style={{ animationDelay: `${0.75 + delay * 0.1}s` }}
//     >
//       <p className="text-2xl font-extrabold text-white sm:text-3xl">
//         {count}
//         {stat.suffix}
//       </p>
//       <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">{stat.label}</p>
//     </div>
//   );
// };

// const HeroSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const node = sectionRef.current;
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
//     <section
//       ref={sectionRef}
//       className="relative isolate flex min-h-screen items-center overflow-hidden bg-gray-900 px-4 pt-28 pb-16 sm:px-6 lg:px-8"
//     >
//       <style>{`
//         @keyframes heroFadeUp {
//           from { opacity: 0; transform: translateY(26px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes heroKenBurns {
//           0% { transform: scale(1.06) translate(0, 0); }
//           100% { transform: scale(1.16) translate(-1%, -1%); }
//         }
//         @keyframes dashDraw {
//           from { stroke-dashoffset: 1; }
//           to { stroke-dashoffset: 0; }
//         }
//         @keyframes planeFloat {
//           0%, 100% { transform: translateY(0) rotate(-6deg); }
//           50% { transform: translateY(-10px) rotate(-2deg); }
//         }
//         @keyframes badgeShimmer {
//           0% { background-position: -100% 0; }
//           100% { background-position: 200% 0; }
//         }

//         .hero-fade-up { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
//         .hero-bg-img { animation: heroKenBurns 18s ease-in-out infinite alternate; }
//         .hero-badge {
//           background-image: linear-gradient(100deg, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.06) 60%);
//           background-size: 250% 100%;
//           animation: badgeShimmer 3.5s ease-in-out infinite;
//         }
//         .hero-path {
//           stroke-dasharray: 1;
//           stroke-dashoffset: 1;
//           animation: dashDraw 2.4s ease-out forwards;
//         }
//         .hero-plane {
//           offset-path: path('M40 620 C 300 520, 550 560, 720 380 S 1050 120, 1180 60');
//           offset-rotate: 0deg;
//           animation: heroPlaneMove 9s linear infinite;
//         }
//         @keyframes heroPlaneMove {
//           0% { offset-distance: 0%; opacity: 0; }
//           8% { opacity: 1; }
//           92% { opacity: 1; }
//           100% { offset-distance: 100%; opacity: 0; }
//         }
//         .hero-plane-static { animation: planeFloat 4s ease-in-out infinite; }

//         @media (prefers-reduced-motion: reduce) {
//           .hero-fade-up { opacity: 1; animation: none; }
//           .hero-bg-img { animation: none; }
//           .hero-path { animation: none; stroke-dashoffset: 0; }
//           .hero-plane { animation: none; opacity: 0; }
//           .hero-plane-static { animation: none; }
//         }
//       `}</style>

//       {/* Background image with slow Ken Burns zoom + dark gradient for legibility */}
//       <div className="absolute inset-0 -z-20 overflow-hidden">
//         <img
//           src={heroBackground}
//           alt=""
//           className="hero-bg-img h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
//       </div>

//       {/* Animated flight-route lines */}
//       <svg
//         className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
//         viewBox="0 0 1200 700"
//         preserveAspectRatio="none"
//         aria-hidden
//       >
//         <defs>
//           <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
//             <stop offset="100%" stopColor="#f97316" stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         <path
//           id="routePathA"
//           className="hero-path"
//           d="M40 620 C 300 520, 550 560, 720 380 S 1050 120, 1180 60"
//           fill="none"
//           stroke="url(#routeGradient)"
//           strokeWidth="1.5"
//           pathLength={1}
//           style={{ animationDelay: "0.6s" }}
//         />
//         <path
//           id="routePathB"
//           className="hero-path"
//           d="M950 40 C 1000 160, 1120 220, 1180 260"
//           fill="none"
//           stroke="url(#routeGradient)"
//           strokeWidth="1.5"
//           pathLength={1}
//           style={{ animationDelay: "1.1s" }}
//         />
//         <circle className="hero-plane" r="3" fill="#ec4899" />
//       </svg>

//       <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
//         {isVisible && (
//           <>
//             <div className="hero-fade-up mb-6 flex justify-center" style={{ animationDelay: "0s" }}>
//               <span className="hero-badge inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
//                 <span className="text-fuchsia-400">
//                   <SparkleIcon />
//                 </span>
//                 Explore the World
//               </span>
//             </div>

//             <h1
//               className="hero-fade-up text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-6xl"
//               style={{ animationDelay: "0.12s" }}
//             >
//               Journeys Crafted for
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
//                 Unforgettable Memories
//               </span>
//             </h1>

//             <p
//               className="hero-fade-up mx-auto mt-6 max-w-2xl text-sm text-white/60 sm:text-base"
//               style={{ animationDelay: "0.24s" }}
//             >
//               Seamlessly book flights, hotels, holidays, buses, trains, visas, and
//               unforgettable experiences — all from one premium platform.
//             </p>

//             <div
//               className="hero-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
//               style={{ animationDelay: "0.36s" }}
//             >
//               <a
//                 href="#"
//                 className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform duration-300 hover:-translate-y-0.5"
//               >
//                 <span className="relative z-10">Start Planning</span>
//                 <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" style={{ clipPath: "polygon(0 0, 30% 0, 10% 100%, -20% 100%)" }} />
//               </a>
//               <a
//                 href="#"
//                 className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10"
//               >
//                 How It Works
//               </a>
//             </div>

//             <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-4">
//               {STATS.map((stat, i) => (
//                 <StatItem key={stat.label} stat={stat} delay={i} start={isVisible} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Decorative floating plane, bottom-left — matches the reference screenshot */}
//       <div className="hero-plane-static pointer-events-none absolute bottom-16 left-6 z-10 text-fuchsia-400/70 sm:left-10">
//         <PlaneMiniIcon />
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import React, { useEffect, useRef, useState } from "react";

const heroVideo =
  "https://res.cloudinary.com/dbezoksfw/video/upload/v1784350526/InShot_20260718_004705933_hrdjvs.mp4";

// const SLIDE_DURATION = 2000;

/* ---------------------------------- Icons --------------------------------- */

const PlaneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);
const HotelIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" />
    <path d="M13 21v-8a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v8" />
    <path d="M2 21h20M7 8h1M7 12h1M7 16h1" />
  </svg>
);
const PackageIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="M3 8l9 5 9-5M12 13v8" />
  </svg>
);
const ExperienceIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 16.8 10.2 11.2 4.6 9.4 10.2 7.6 12 2Z" />
  </svg>
);
const PinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.2" />
  </svg>
);
const CalendarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="9" cy="7.5" r="3" />
    <path d="M2 20v-1.5A3.5 3.5 0 0 1 5.5 15h7a3.5 3.5 0 0 1 3.5 3.5V20" />
  </svg>
);
const SearchIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

/* --------------------------------- Data --------------------------------- */

const TABS = [
  { label: "Flights", icon: <PlaneIcon /> },
  { label: "Hotels", icon: <HotelIcon /> },
  { label: "Packages", icon: <PackageIcon /> },
  { label: "Experiences", icon: <ExperienceIcon /> },
];

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
}

const STATS: Stat[] = [
  { value: 190, suffix: "+", label: "Destinations" },
  { value: 2, suffix: "M+", label: "Happy Travelers" },
  { value: 500, suffix: "+", label: "Expert Guides" },
  { value: 4.9, suffix: "★", label: "Rating", decimal: true },
];

/* ------------------------------- Count-up hook ----------------------------- */

const useCountUp = (target: number, start: boolean, decimal: boolean, duration = 1500) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = eased * target;
      setValue(decimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration, decimal]);
  return value;
};

const StatItem: React.FC<{ stat: Stat; delay: number; start: boolean }> = ({ stat, delay, start }) => {
  const count = useCountUp(stat.value, start, !!stat.decimal, 1400 + delay * 350);
  return (
     <div className="disc-fade-up text-center" style={{ animationDelay: `${1.05 + delay * 0.08}s` }}>
      <p className="text-lg font-bold  sm:text-xl">
        {stat.decimal ? count.toFixed(1) : count}
        {stat.suffix}
      </p>
      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide  sm:text-xs">
        {stat.label}
      </p>
    </div>
  );
};

/* ----------------------------- Background slideshow ----------------------------- */

const HeroBackgroundSlideshow: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        className="disc-bg-img absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,161,91,0.12),transparent_60%)]" />
    </div>
  );
};

/* -------------------------------- Component ------------------------------- */

const DiscoverHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => setSearching(false), 1600);
  };

  return (
    <>
      {/* HERO SECTION — ends here; background image lives only in this block */}
      <section
        ref={sectionRef}
        className="relative isolate flex min-h-[95vh] items-center px-4 pb-16 pt-28 sm:px-8 lg:px-16"
      >
        <style>{`
          @keyframes discFadeUp {
            from { opacity: 0; transform: translateY(26px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes discCardIn {
            from { opacity: 0; transform: translateY(28px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes discKenBurns {
            0% { transform: scale(1.08) translate(0, 0); }
            100% { transform: scale(1.18) translate(-1.5%, -1%); }
          }
          @keyframes discShimmer {
            0% { background-position: -120% 0; }
            100% { background-position: 220% 0; }
          }
          @keyframes discSpin { to { transform: rotate(360deg); } }

          .disc-fade-up { opacity: 0; animation: discFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
          .disc-card { opacity: 0; animation: discCardIn 0.85s cubic-bezier(0.22,1,0.36,1) forwards; }
          .disc-bg-img { animation: discKenBurns 20s ease-in-out infinite alternate; }

          .disc-field { transition: background-color 0.25s ease; }
          .disc-field:hover, .disc-field:focus-within {
            background-color: rgba(0, 0, 0, 0.02);
          }

          .disc-search-btn {
            background-size: 220% 100%;
            background-position: 0% 0%;
            transition: background-position 0.5s ease, transform 0.2s ease;
          }
          .disc-search-btn:hover { background-position: 100% 0%; transform: translateY(-1px); }

          .disc-eyebrow-shimmer {
            background-image: linear-gradient(100deg, rgba(217,161,91,0.15) 30%, rgba(217,161,91,0.4) 45%, rgba(217,161,91,0.15) 60%);
            background-size: 250% 100%;
            animation: discShimmer 3.5s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .disc-fade-up, .disc-card { opacity: 1; animation: none !important; }
            .disc-bg-img { animation: none; }
            .disc-eyebrow-shimmer { animation: none; }
          }
        `}</style>

        <HeroBackgroundSlideshow />

        <div className="relative z-10 w-full max-w-2xl">
          {isVisible && (
            <>
              <p
                className="disc-fade-up disc-eyebrow-shimmer inline-flex items-center gap-2 rounded-full border border-amber-200/30 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200"
                style={{ animationDelay: "0s" }}
              >
                <PlaneIcon />
                World-Class Travel Experiences
              </p>

              <h1
                className="disc-fade-up mt-6 font-serif text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl"
                style={{ animationDelay: "0.12s" }}
              >
                Discover the World in{" "}
                <span className="italic text-amber-300">Extraordinary</span> Ways
              </h1>

              <p
                className="disc-fade-up mt-5 max-w-md text-sm text-white/70 sm:text-base"
                style={{ animationDelay: "0.24s" }}
              >
                Curated journeys to 190+ countries. Expert-crafted itineraries, luxury
                stays, and unforgettable experiences.
              </p>
            </>
          )}
        </div>

        {/* Tabs — centered, sits above the bar, still inside the hero on the background image */}
        {isVisible && (
          <div
            className="disc-card absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-5xl translate-y-1/2 px-4 mb-14 sm:px-8 lg:px-16"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-wrap justify-center gap-1.5 pb-2">
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-250 sm:text-[13px] ${
                    activeTab === i
                      ? "bg-gray-900 text-white shadow-md shadow-black/20"
                      : "bg-white/90 text-gray-500 hover:bg-white hover:text-gray-800"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* WHITE SEARCH BAR — straddles the hero boundary, centered independent of text column */}
      {isVisible && (
        <div className="relative z-20 mx-auto -mt-4 w-full max-w-5xl px-4 sm:-mt-6 sm:px-8 lg:-mt-8 lg:px-16">
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40 sm:flex-row sm:items-stretch">
            <div className="grid flex-1 grid-cols-2 divide-x divide-y divide-gray-100 sm:grid-cols-4 sm:divide-y-0">
              <div className="disc-field px-4 py-3.5">
                <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  <PinIcon /> Destination
                </p>
                <p className="mt-1 truncate text-[13px] font-medium text-gray-800">
                  Bali, Indonesia
                </p>
              </div>
              <div className="disc-field px-4 py-3.5">
                <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  <CalendarIcon /> Check-in
                </p>
                <p className="mt-1 truncate text-[13px] font-medium text-gray-800">
                  Fri, 17 Jul 2026
                </p>
              </div>
              <div className="disc-field px-4 py-3.5">
                <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  <CalendarIcon /> Check-out
                </p>
                <p className="mt-1 truncate text-[13px] font-medium text-gray-800">
                  Sat, 18 Jul 2026
                </p>
              </div>
              <div className="disc-field px-4 py-3.5">
                <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  <UsersIcon /> Room &amp; Guest
                </p>
                <p className="mt-1 truncate text-[13px] font-medium text-gray-800">
                  1 Room, 2 Adults
                </p>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={searching}
              className="disc-search-btn flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-8 py-3.5 text-[13px] font-semibold text-gray-900 transition-transform disabled:cursor-wait sm:w-36"
            >
              {searching ? (
                <span
                  className="h-3.5 w-3.5 rounded-full border-2 border-gray-900/30 border-t-gray-900"
                  style={{ animation: "discSpin 0.7s linear infinite" }}
                />
              ) : (
                <SearchIcon />
              )}
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      )}

      {/* CONTENT BELOW HERO — starts right where the hero ends, cleared of the overlapping bar */}
      <div className="px-4 pb-16 pt-16 !text-black sm:px-8 lg:px-16">
  {isVisible && (
    <div className="mx-auto grid max-w-3xl grid-cols-4 gap-6 place-items-center sm:gap-10">
      {STATS.map((stat, i) => (
        <StatItem
          key={stat.label}
          stat={stat}
          delay={i}
          start={isVisible}
        />
      ))}
    </div>
        )}
      </div>
    </>
  );
};

export default DiscoverHeroSection;
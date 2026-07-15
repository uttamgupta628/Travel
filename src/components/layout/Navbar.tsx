// import React, { useEffect, useState } from "react";

// interface NavLink {
//   label: string;
//   href: string;
// }

// const NAV_LINKS: NavLink[] = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Tours", href: "#tours" },
//   { label: "Destinations", href: "#destinations" },
//   { label: "Vlog", href: "#vlog" },
// ];

// /**
//  * Flat sticky navbar. No outer black wrapper here — the black page
//  * "bezel" now lives one level up in Layout.tsx, wrapping the whole
//  * page (Navbar + page content) in a single rounded white card.
//  */
// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [active, setActive] = useState("Home");
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <nav
//       className={`sticky top-0 z-50 flex items-center justify-between bg-white/95 px-5 backdrop-blur transition-all duration-300 sm:px-8 ${
//         scrolled ? "py-3 shadow-md" : "py-4 shadow-none"
//       }`}
//     >
//       {/* Logo */}
//       <a href="#home" className="group flex items-center gap-2">
//         <span className="text-xl font-bold tracking-widest text-gray-900 transition-transform duration-300 group-hover:scale-105">
//           LOGO
//         </span>
//       </a>

//       {/* Desktop links */}
//       <ul className="hidden items-center gap-8 md:flex">
//         {NAV_LINKS.map((link) => (
//           <li key={link.label} className="group relative">
//             <a
//               href={link.href}
//               onClick={() => setActive(link.label)}
//               className={`text-sm font-medium transition-colors duration-200 ${
//                 active === link.label
//                   ? "text-blue-600"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               {link.label}
//             </a>
//             <span
//               className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ${
//                 active === link.label ? "w-full" : "w-0 group-hover:w-full"
//               }`}
//             />
//           </li>
//         ))}
//       </ul>

//       {/* CTA */}
//       <div className="hidden md:block">
//         <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/40 active:translate-y-0">
//           Register
//         </button>
//       </div>

//       {/* Mobile toggle */}
//       <button
//         className="flex flex-col gap-1.5 p-2 md:hidden"
//         onClick={() => setIsOpen((v) => !v)}
//         aria-label="Toggle menu"
//         aria-expanded={isOpen}
//       >
//         <span
//           className={`h-0.5 w-6 bg-gray-900 transition-transform duration-300 ${
//             isOpen ? "translate-y-2 rotate-45" : ""
//           }`}
//         />
//         <span
//           className={`h-0.5 w-6 bg-gray-900 transition-opacity duration-300 ${
//             isOpen ? "opacity-0" : ""
//           }`}
//         />
//         <span
//           className={`h-0.5 w-6 bg-gray-900 transition-transform duration-300 ${
//             isOpen ? "-translate-y-2 -rotate-45" : ""
//           }`}
//         />
//       </button>

//       {/* Mobile menu */}
//       <div
//         className={`absolute left-0 right-0 top-full overflow-hidden bg-white transition-all duration-300 md:hidden ${
//           isOpen ? "max-h-96 shadow-lg" : "max-h-0"
//         }`}
//       >
//         <div className="flex flex-col gap-1 p-5">
//           {NAV_LINKS.map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               onClick={() => {
//                 setActive(link.label);
//                 setIsOpen(false);
//               }}
//               className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
//                 active === link.label
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {link.label}
//             </a>
//           ))}
//           <button className="mt-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
//             Register
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useEffect, useState } from "react";

const PlaneLogoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const GlobeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MenuIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <span className="relative flex h-4 w-5 flex-col justify-between">
    <span
      className="h-0.5 w-full rounded-full bg-current transition-all duration-300"
      style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
    />
    <span
      className="h-0.5 w-full rounded-full bg-current transition-all duration-300"
      style={{ opacity: open ? 0 : 1 }}
    />
    <span
      className="h-0.5 w-full rounded-full bg-current transition-all duration-300"
      style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
    />
  </span>
);

const NAV_LINKS = ["Flights", "Hotels", "Holidays", "Trains", "Buses", "Visa", "Offers"];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav-enter fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 py-3 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <style>{`
        @keyframes navEnter {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: navEnter 0.6s ease-out forwards; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 2px;
          width: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #a855f7, #ec4899, #f97316);
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-cta {
          background-size: 200% 100%;
          background-position: 0% 0%;
          transition: background-position 0.5s ease, transform 0.2s ease;
        }
        .nav-cta:hover {
          background-position: 100% 0%;
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-enter { animation: none; }
        }
      `}</style>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 shadow-md shadow-fuchsia-500/30">
            <PlaneLogoIcon />
          </span>
          <span className="text-lg font-bold text-white">Travel Terns</span>
        </a>

        {/* Center links (desktop) */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="nav-link text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="nav-link flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
              More
              <span className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}>
                <ChevronDownIcon />
              </span>
            </button>
            <div
              className={`absolute left-1/2 top-full mt-3 w-40 -translate-x-1/2 rounded-xl border border-white/10 bg-black/80 p-2 text-sm text-white/80 shadow-xl backdrop-blur-xl transition-all duration-200 ${
                moreOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              {["Insurance", "Cabs", "Gift Cards", "Help"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Language"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:flex"
          >
            <GlobeIcon />
          </button>
          <button
            aria-label="Notifications"
            className="relative hidden h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:flex"
          >
            <BellIcon />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
          </button>

          <a
            href="#"
            className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white lg:inline-block"
          >
            Login
          </a>
          <a
            href="#"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 lg:inline-block"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="nav-cta hidden rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/30 lg:inline-block"
          >
            Download App
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[420px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {[...NAV_LINKS, "More"].map((link) => (
            <a
              key={link}
              href="#"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-4">
            <a href="#" className="flex-1 rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white">
              Login
            </a>
            <a href="#" className="flex-1 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-4 py-2 text-center text-sm font-semibold text-white">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
import React, { useEffect, useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tours", href: "#tours" },
  { label: "Destinations", href: "#destinations" },
  { label: "Vlog", href: "#vlog" },
];

/**
 * Flat sticky navbar. No outer black wrapper here — the black page
 * "bezel" now lives one level up in Layout.tsx, wrapping the whole
 * page (Navbar + page content) in a single rounded white card.
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between bg-white/95 px-5 backdrop-blur transition-all duration-300 sm:px-8 ${
        scrolled ? "py-3 shadow-md" : "py-4 shadow-none"
      }`}
    >
      {/* Logo */}
      <a href="#home" className="group flex items-center gap-2">
        <span className="text-xl font-bold tracking-widest text-gray-900 transition-transform duration-300 group-hover:scale-105">
          LOGO
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.label} className="group relative">
            <a
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === link.label
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
            </a>
            <span
              className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ${
                active === link.label ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="hidden md:block">
        <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/40 active:translate-y-0">
          Register
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        className="flex flex-col gap-1.5 p-2 md:hidden"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`h-0.5 w-6 bg-gray-900 transition-transform duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-gray-900 transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-gray-900 transition-transform duration-300 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 shadow-lg" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActive(link.label);
                setIsOpen(false);
              }}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === link.label
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button className="mt-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
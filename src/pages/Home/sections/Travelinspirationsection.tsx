import React, { useEffect, useRef, useState } from "react";

/**
 * Images are served through Cloudinary (auto format/quality + smart
 * cropping), reusing confirmed public "demo" cloud assets, with an
 * onError fallback to a colored gradient if an asset fails to load.
 * Swap the `cld(...)` public IDs for your own Cloudinary cloud name +
 * uploaded article photos whenever ready.
 */
const cld = (publicId: string, w: number, h: number) =>
  `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_${w},h_${h},c_fill,g_auto/${publicId}`;

interface Article {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  readTime: string;
  tag: string;
}

const FEATURED: Article & { badge: string } = {
  image: cld("samples/landscapes/beach-boat", 900, 900),
  badge: "Editor's Pick",
  category: "Hidden Gem",
  categoryColor: "text-amber-300",
  title: "Hidden Temples of Bali You've Never Heard Of",
  readTime: "6 min read",
  tag: "",
};

const ARTICLES: Article[] = [
  {
    image: cld("pm/japan.jpg", 300, 300),
    category: "Seasonal Guide",
    categoryColor: "text-amber-600",
    title: "Why Winter Is the Best Time to Visit Japan",
    readTime: "5 min",
    tag: "Seasonal",
  },
  {
    image: cld("samples/landscapes/architecture-signs", 300, 300),
    category: "Budget Travel",
    categoryColor: "text-emerald-600",
    title: "Weekend Getaways from Dubai Under $500",
    readTime: "3 min",
    tag: "Budget",
  },
  {
    image: cld("pm/mountains_autumn.jpg", 300, 300),
    category: "Travel Guide",
    categoryColor: "text-sky-600",
    title: "The Ultimate Switzerland Road Trip Itinerary",
    readTime: "12 min",
    tag: "Guide",
  },
];

/* ---------------------------------- Icons --------------------------------- */

const ClockIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* -------------------------------- Component ------------------------------- */

const TravelInspirationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [featuredFailed, setFeaturedFailed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

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

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-8 lg:px-16"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <style>{`
        @keyframes tiLineGrow { to { width: 24px; } }
        @keyframes tiSlideLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tiSlideRight {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tiFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ti-eyebrow-line {
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9974A;
          animation: tiLineGrow 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }

        .ti-fade-up { opacity: 0; }
        .ti-fade-up.is-visible { animation: tiFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* Featured card slides in from the left, the article list from the
           right — an asymmetric entrance rather than everything rising
           from below at once. */
        .ti-featured { opacity: 0; }
        .ti-featured.is-visible { animation: tiSlideLeft 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ti-list-item { opacity: 0; }
        .ti-list-item.is-visible { animation: tiSlideRight 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* Slow continuous pan on the featured image instead of a static
           photo or a hover-only zoom. */
        @keyframes tiPan {
          0% { transform: scale(1.12) translate(0, 0); }
          100% { transform: scale(1.22) translate(-2%, -2%); }
        }
        .ti-featured-img { animation: tiPan 14s ease-in-out infinite alternate; }

        .ti-read-link { position: relative; }
        .ti-read-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1px;
          width: 0;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .ti-read-link:hover::after { width: 100%; }
        .ti-read-link:hover .ti-read-arrow { transform: translateX(3px); }
        .ti-read-arrow { transition: transform 0.25s ease; display: inline-block; }

        .ti-list-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .ti-list-card:hover {
          transform: translateX(4px);
          box-shadow: 0 12px 28px -14px rgba(30, 41, 59, 0.25);
        }
        .ti-list-card:hover .ti-thumb-img { transform: scale(1.12); }

        @media (prefers-reduced-motion: reduce) {
          .ti-fade-up { opacity: 1; animation: none !important; }
          .ti-featured, .ti-list-item { opacity: 1; animation: none !important; }
          .ti-featured-img { animation: none; }
          .ti-list-card:hover { transform: none; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p
              className={`ti-fade-up ${isVisible ? "is-visible" : ""} flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]`}
              style={{ animationDelay: "0s", color: "#C9974A" }}
            >
              <span className="ti-eyebrow-line" />
              Editorial
            </p>
            <h2
              className={`ti-fade-up ${isVisible ? "is-visible" : ""} mt-2 font-serif text-3xl font-bold sm:text-4xl`}
              style={{ animationDelay: "0.08s", color: "#1B2A4A" }}
            >
              Travel Inspiration
            </h2>
          </div>

          <a
            href="#"
            className={`ti-fade-up ${isVisible ? "is-visible" : ""} ti-read-link flex items-center gap-1.5 self-start text-sm font-semibold sm:self-auto`}
            style={{ animationDelay: "0.14s", color: "#C9974A" }}
          >
            Read More Stories
            <span className="ti-read-arrow">
              <ArrowRightIcon />
            </span>
          </a>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Featured article */}
          <div
            className={`ti-featured ${isVisible ? "is-visible" : ""} group relative overflow-hidden rounded-2xl shadow-lg shadow-black/10`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-full">
              {!featuredFailed ? (
                <img
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  onError={() => setFeaturedFailed(true)}
                  className="ti-featured-img absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

              <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900 shadow-sm">
                {FEATURED.badge}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className={`text-[11px] font-bold uppercase tracking-wider ${FEATURED.categoryColor}`}>
                  {FEATURED.category}
                </p>
                <h3 className="mt-1.5 font-serif text-xl font-bold text-white sm:text-2xl">
                  {FEATURED.title}
                </h3>
                <div className="mt-3 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-white/60">
                    <ClockIcon />
                    {FEATURED.readTime}
                  </span>
                  <a href="#" className="ti-read-link flex items-center gap-1 text-xs font-semibold text-amber-300">
                    Read Article
                    <span className="ti-read-arrow">
                      <ArrowRightIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Article list */}
          <div className="flex flex-col gap-4">
            {ARTICLES.map((article, i) => (
              <div
                key={article.title}
                className={`ti-list-item ${isVisible ? "is-visible" : ""} ti-list-card flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm shadow-black/5`}
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                  {!failedImages[i] ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      onError={() => setFailedImages((prev) => ({ ...prev, [i]: true }))}
                      className="ti-thumb-img absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, hsl(${(i * 83) % 360} 45% 32%), hsl(${(i * 83 + 40) % 360} 40% 18%))`,
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 py-1 pr-2">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${article.categoryColor}`}>
                    {article.category}
                  </p>
                  <h4 className="mt-1 truncate text-sm font-bold" style={{ color: "#1B2A4A" }}>
                    {article.title}
                  </h4>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <ClockIcon />
                      {article.readTime}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-500">
                      {article.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelInspirationSection;
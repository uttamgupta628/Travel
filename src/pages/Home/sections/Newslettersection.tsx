import React, { useState } from "react";

// Replace with your actual asset path — any filename works.
import travelerImage from "../../../assets/newsletter-traveler.png";

const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
      <style>{`
        @keyframes newsFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes newsFadeInRight {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes newsFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes newsPopIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .news-fade-up {
          opacity: 0;
          animation: newsFadeUp 0.7s ease-out forwards;
        }
        .news-fade-right {
          opacity: 0;
          animation: newsFadeInRight 0.8s ease-out forwards;
        }
        .news-float {
          animation: newsFloat 4.5s ease-in-out infinite;
        }
        .news-pop-in {
          animation: newsPopIn 0.35s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .news-fade-up, .news-fade-right { opacity: 1 !important; animation: none !important; }
          .news-float { animation: none !important; }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl overflow-visible rounded-3xl bg-blue-50">
        <div className="grid items-center gap-8 px-8 py-14 sm:px-12 lg:grid-cols-2 lg:gap-6 lg:py-0">
          {/* Left — copy + form */}
          <div className="relative z-10 lg:py-16">
            <h2
              className="news-fade-up text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
              style={{ animationDelay: "0s" }}
            >
              Subscribe now to get useful traveling information
            </h2>

            <div className="news-fade-up mt-6" style={{ animationDelay: "0.1s" }}>
              {submitted ? (
                <div className="news-pop-in flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <CheckIcon />
                  </span>
                  You're subscribed — check your inbox!
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition-shadow duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 sm:w-72 sm:rounded-r-none"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-95 sm:rounded-l-none"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && (
                    <p className="news-pop-in mt-2 text-xs font-medium text-red-500">{error}</p>
                  )}
                </form>
              )}

              <p className="mt-3 max-w-sm text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                adipisici sunt in, provident facere ipsam?
              </p>
            </div>
          </div>

          {/* Right — traveler image, bleeding above/below the panel on large screens */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div
              className="news-fade-right"
              style={{ animationDelay: "0.15s" }}
            >
              <img
                src={travelerImage}
                alt="Traveler with backpack waving"
                className="news-float h-56 w-auto object-contain sm:h-72 lg:-my-14 lg:mr-4 lg:h-[420px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
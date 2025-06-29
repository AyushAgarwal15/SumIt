import React from "react";
import { logo } from "../assets";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const GithubIcon = () => (
  <svg
    className="w-[clamp(1rem,4vw,1.25rem)] h-[clamp(1rem,4vw,1.25rem)]"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start items-center">
          <img
            src={logo}
            alt="sumit logo"
            style={{ width: "clamp(2rem, 8vw, 5rem)" }}
            className="h-auto object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="text-gray-600 order-3 sm:order-2 w-full sm:w-auto">
          <p className="text-[clamp(0.75rem,1.75vw,1rem)]">
            Simplify your reading with AI-powered summaries
          </p>
          <p className="text-[clamp(0.7rem,1.5vw,0.875rem)] mt-1">
            © 2025 Ayush Agarwal. All rights reserved.
          </p>
        </div>

        {/* Right Links */}
        <div className="flex items-center justify-center sm:justify-end gap-3 order-2 sm:order-3">
          <a
            href="https://github.com/AyushAgarwal15/AI_Summarizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors touch-target"
            aria-label="GitHub Repository"
          >
            <GithubIcon />
          </a>
          <a
            href="https://ayushagarwal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors touch-target"
            aria-label="Portfolio Website"
          >
            <GlobeAltIcon className="w-[clamp(1rem,4vw,1.25rem)] h-[clamp(1rem,4vw,1.25rem)]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

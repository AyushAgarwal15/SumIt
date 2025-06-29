import React from "react";
import { logo } from "../assets";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 order-3 sm:order-2">
        {/* Logo */}
        <div className="flex items-center order-1 sm:order-1">
          <img
            src={logo}
            alt="sumit logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="text-center text-gray-600 order-3 sm:order-2">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">Simplify your reading with AI-powered summaries</p>
          <p className="text-xs sm:text-sm md:text-base mt-1">© 2025 Ayush Agarwal. All rights reserved.</p>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 order-2 sm:order-3">
          <a
            href="https://github.com/AyushAgarwal15/AI_Summarizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://ayushagarwal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

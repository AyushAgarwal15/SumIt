import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header
      id="hero"
      className="w-full flex justify-center items-center flex-col px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12"
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center w-full max-w-7xl mb-4 sm:mb-6 md:mb-8">
        <div className="logo-container">
          <img
            src={logo}
            alt="sumit logo"
            className="object-contain w-[clamp(4rem,10vw,10rem)]"
          />
        </div>

        <div className="flex gap-2">
          <a
            href="https://ayushagarwal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="black_btn text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2"
          >
            Portfolio
          </a>
          <button
            type="button"
            onClick={() =>
              window.open("https://github.com/AyushAgarwal15/AI_Summarizer")
            }
            className="black_btn text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2"
          >
            Github
          </button>
        </div>
      </nav>

      {/* Main Text */}
      <div className="text-center max-w-4xl mx-auto px-2 sm:px-4">
        <h1 className="font-extrabold leading-[1.15] text-[clamp(1.75rem,5vw,3.5rem)]">
          Transform Articles into
          <br className="hidden sm:block" />
          <span className="orange_gradient block mt-1 sm:mt-2">
            {" "}
            Smart Summaries
          </span>
        </h1>

        <h2 className="text-gray-600 mt-3 sm:mt-4 text-[clamp(0.875rem,1.75vw,1.25rem)] max-w-2xl mx-auto">
          Simplify your reading with <strong>SumIt</strong>, an intelligent
          article summarizer that turns lengthy articles into clear, concise,
          and easy-to-digest summaries.
        </h2>
      </div>
    </header>
  );
};

export default Hero;

import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header
      id="hero"
      className="w-full flex justify-center items-center flex-col px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8"
    >
      <nav className="flex justify-between items-center w-full mb-3 sm:mb-4 md:mb-6 pt-2 sm:pt-3 max-w-7xl mx-auto">
        <img
          src={logo}
          alt="sumit logo"
          className="w-24 sm:w-28 md:w-32 lg:w-40 xl:w-52 object-contain"
        />
        <div className="flex gap-1.5 sm:gap-2 md:gap-3">
          <a
            href="https://ayushagarwal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="black_btn text-xs sm:text-sm md:text-base px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-5 py-1.5"
          >
            Portfolio
          </a>
          <button
            type="button"
            onClick={() =>
              window.open("https://github.com/AyushAgarwal15/AI_Summarizer")
            }
            className="black_btn text-xs sm:text-sm md:text-base px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-5 py-1.5"
          >
            Github
          </button>
        </div>
      </nav>

      <h1 className="head_text text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl px-2 sm:px-3 md:px-4">
        Transform Articles into
        <br className="max-md:hidden" />
        <span className="orange_gradient"> Smart Summaries</span>
      </h1>
      <h2 className="desc text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-2 sm:px-3 md:px-4 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        Simplify your reading with SumIt, an intelligent article summarizer that
        turns lengthy articles into clear, concise, and easy-to-digest summaries
      </h2>
    </header>
  );
};

export default Hero;

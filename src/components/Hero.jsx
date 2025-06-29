import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header
      id="hero"
      className="w-full flex justify-center items-center flex-col"
    >
      <nav className="flex justify-between items-center w-full mb-1 pt-3">
        <img src={logo} alt="sumit logo" className="w-52 object-contain" />
        <div className="flex gap-3">
          <a
            href="https://ayushagarwal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="black_btn"
          >
            Portfolio
          </a>
          <button
            type="button"
            onClick={() =>
              window.open("https://github.com/AyushAgarwal15/AI_Summarizer")
            }
            className="black_btn"
          >
            Github
          </button>
        </div>
      </nav>

      <h1 className="head_text">
        Transform Articles into
        <br className="max-md:hidden" />
        <span className="orange_gradient"> Smart Summaries</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with SumIt, an intelligent article summarizer that
        turns lengthy articles into clear, concise, and easy-to-digest summaries
      </h2>
    </header>
  );
};

export default Hero;

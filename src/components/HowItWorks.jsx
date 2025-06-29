import React from "react";
import GradientCard from "./common/GradientCard";
import GradientIconCircle from "./common/GradientIconCircle";
import {
  LinkIcon,
  ProcessingIcon,
  ShareIcon,
  LightningIcon,
  CheckIcon,
} from "../constants/icons";

const HowItWorks = () => {
  const steps = [
    {
      title: "Paste & Submit",
      description:
        "Paste your article URL in the input field and click the enter button or press return to start the summarization process.",
      icon: <LinkIcon />,
    },
    {
      title: "AI Processing",
      description:
        "Our advanced AI analyzes the article, extracting key points and generating a comprehensive yet concise summary.",
      icon: <ProcessingIcon />,
    },
    {
      title: "Share Anywhere",
      description:
        "Share the summary directly to LinkedIn, Twitter, or other platforms with just one click. Perfect for social media and professional networking.",
      icon: <ShareIcon />,
    },
  ];

  const handleCardClick = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    { icon: <CheckIcon />, text: "Works with any article" },
    { icon: <LightningIcon />, text: "Instant summaries" },
    { icon: <ShareIcon />, text: "Easy sharing" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
          How It <span className="orange_gradient">Works</span>
        </h2>
        <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-3 md:px-4">
          Transform any article into a concise summary in three simple steps
        </p>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <GradientCard
              key={step.title}
              variant={index === 0 ? "orange" : index === 1 ? "blue" : "green"}
            >
              <GradientIconCircle
                icon={step.icon}
                className="mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                variant={
                  index === 0 ? "orange" : index === 1 ? "blue" : "green"
                }
              />
              <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-orange-100 text-orange-600 text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-2 sm:mb-3 md:mb-4">
                {index + 1}
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                {step.description}
              </p>
            </GradientCard>
          ))}
        </div>

        <GradientCard
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20"
          onClick={handleCardClick}
          variant="purple"
        >
          <GradientIconCircle
            icon={<LightningIcon />}
            className="mb-3 sm:mb-4 md:mb-5 lg:mb-6"
            variant="purple"
          />
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            Ready to Supercharge Your Reading?
          </h3>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl">
            Experience the power of AI-driven article summarization. Simply
            paste your article link above and let our advanced AI do the rest.
            Share your summaries across all major platforms with ease!
          </p>
          <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base text-gray-500">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1 sm:gap-1.5 md:gap-2"
              >
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </GradientCard>
      </div>
    </section>
  );
};

export default HowItWorks;

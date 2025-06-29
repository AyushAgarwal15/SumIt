import React from "react";
import GradientIconCircle from "./common/GradientIconCircle";
import GradientCard from "./common/GradientCard";
import {
  LinkIcon,
  ProcessingIcon,
  ShareIcon,
  LightningIcon,
  ArticleIcon,
  SpeedIcon,
  ShareAltIcon,
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
    { icon: <ArticleIcon />, text: "Works with any article" },
    { icon: <SpeedIcon />, text: "Instant summaries" },
    { icon: <ShareAltIcon />, text: "Easy sharing" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <h2 className="text-[clamp(1.25rem,3.5vw,2.5rem)] font-bold text-gray-900">
          How It <span className="orange_gradient">Works</span>
        </h2>
        <p className="mt-2 sm:mt-3 text-[clamp(0.875rem,1.75vw,1rem)] text-gray-600 max-w-xl mx-auto px-2">
          Transform any article into a concise summary in three simple steps
        </p>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {steps.map((step, index) => (
            <GradientCard
              key={step.title}
              variant={index === 0 ? "orange" : index === 1 ? "blue" : "green"}
              className="h-full"
            >
              <GradientIconCircle
                icon={step.icon}
                className="mb-2 sm:mb-3"
                variant={
                  index === 0 ? "orange" : index === 1 ? "blue" : "green"
                }
              />
              <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-100 text-orange-600 text-xs sm:text-sm font-bold mb-2">
                {index + 1}
              </span>
              <h3 className="text-[clamp(0.875rem,1.75vw,1.125rem)] font-bold text-gray-900 mb-1.5 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-[clamp(0.75rem,1.5vw,0.875rem)]">
                {step.description}
              </p>
            </GradientCard>
          ))}
        </div>

        <GradientCard
          className="mt-6 sm:mt-8 md:mt-10"
          onClick={handleCardClick}
          variant="purple"
        >
          <GradientIconCircle
            icon={<LightningIcon />}
            className="mb-2 sm:mb-3"
            variant="purple"
          />
          <h3 className="text-[clamp(1rem,2vw,1.5rem)] font-bold text-gray-900 mb-2 text-center">
            Ready to Supercharge Your Reading?
          </h3>
          <p className="text-gray-600 text-[clamp(0.75rem,1.5vw,1rem)] text-center max-w-2xl mx-auto">
            Experience the power of AI-driven article summarization. Simply
            paste your article link above and let our advanced AI do the rest.
            Share your summaries across all major platforms with ease!
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 text-[clamp(0.75rem,1.25vw,0.875rem)] text-gray-500">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 whitespace-nowrap bg-gray-50/80 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full"
              >
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  {feature.icon}
                </span>
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

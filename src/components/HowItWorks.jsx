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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          How It <span className="orange_gradient">Works</span>
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Transform any article into a concise summary in three simple steps
        </p>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <GradientCard key={step.title}>
              <GradientIconCircle icon={step.icon} className="mb-6" />
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-lg font-bold mb-4">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </GradientCard>
          ))}
        </div>

        <GradientCard className="mt-20" onClick={handleCardClick}>
          <GradientIconCircle icon={<LightningIcon />} className="mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Supercharge Your Reading?
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl">
            Experience the power of AI-driven article summarization. Simply
            paste your article link above and let our advanced AI do the rest.
            Share your summaries across all major platforms with ease!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
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

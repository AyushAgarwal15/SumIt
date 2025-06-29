import React from "react";

const GradientCard = ({
  children,
  onClick,
  className = "",
  variant = "orange",
}) => {
  const gradientClasses = {
    orange: "bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500",
    blue: "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500",
    green: "bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500",
    purple: "bg-gradient-to-r from-purple-500 via-pink-600 to-red-500",
  };

  return (
    <div
      className={`relative group cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${className}`}
      onClick={onClick}
    >
      <div
        className={`absolute -inset-1 ${gradientClasses[variant]} rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-300`}
      />
      <div className="relative px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-12 bg-white ring-1 ring-gray-200 rounded-xl leading-tight flex flex-col items-center text-center hover:shadow-xl transition duration-300 touch-auto select-none">
        {children}
      </div>
    </div>
  );
};

export default GradientCard;

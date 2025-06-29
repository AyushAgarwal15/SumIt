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
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className={`absolute -inset-1 ${gradientClasses[variant]} rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
      ></div>
      <div className="relative px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 bg-white ring-1 ring-gray-200 rounded-lg leading-none flex flex-col items-center text-center hover:shadow-xl transition duration-200">
        {children}
      </div>
    </div>
  );
};

export default GradientCard;

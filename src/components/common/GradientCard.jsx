import React from "react";

const GradientCard = ({
  children,
  onClick,
  className = "",
  gradientFrom = "amber-500",
  gradientVia = "orange-600",
  gradientTo = "yellow-500",
}) => {
  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-${gradientFrom} via-${gradientVia} to-${gradientTo} rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
      ></div>
      <div className="relative px-8 py-10 bg-white ring-1 ring-gray-200 rounded-lg leading-none flex flex-col items-center text-center hover:shadow-xl transition duration-200">
        {children}
      </div>
    </div>
  );
};

export default GradientCard;

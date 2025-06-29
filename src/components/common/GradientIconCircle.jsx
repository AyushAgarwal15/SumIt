import React from "react";

const GradientIconCircle = ({ icon, variant = "orange", className = "" }) => {
  const gradientClasses = {
    orange: "bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500",
    blue: "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500",
    green: "bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500",
    purple: "bg-gradient-to-r from-purple-500 via-pink-600 to-red-500",
  };

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full ${gradientClasses[variant]} shadow-lg ${className}`}
    >
      {icon}
    </div>
  );
};

export default GradientIconCircle;

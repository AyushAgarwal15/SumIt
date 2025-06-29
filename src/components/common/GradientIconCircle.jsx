import React from "react";

const GradientIconCircle = ({
  icon,
  gradientFrom = "amber-500",
  gradientVia = "orange-600",
  gradientTo = "yellow-500",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-${gradientFrom} via-${gradientVia} to-${gradientTo} shadow-lg ${className}`}
    >
      {icon}
    </div>
  );
};

export default GradientIconCircle;

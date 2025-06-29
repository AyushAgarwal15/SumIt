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
      className={`flex items-center justify-center rounded-full shadow-lg gradient-icon-circle ${gradientClasses[variant]} ${className}`}
      style={{
        width: "clamp(2.5rem, 6vw, 5rem)", // roughly 40px - 80px
        height: "clamp(2.5rem, 6vw, 5rem)",
      }}
    >
      <div className="text-white text-[clamp(1rem,2.5vw,2rem)]">{icon}</div>
    </div>
  );
};

export default GradientIconCircle;

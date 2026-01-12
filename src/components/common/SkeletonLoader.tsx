
const SkeletonLoader = () => {
  return (
    <div className="w-full flex flex-col gap-3 animate-pulse">
      {/* Simulation of a title */}
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
      
      {/* Simulation of paragraph lines */}
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  );
};

export default SkeletonLoader;

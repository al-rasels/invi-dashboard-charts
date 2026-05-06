// components/ProgressCard.jsx
import React from "react";

const ProgressCard = ({ title, progress, color }) => {
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="flex items-center justify-between !p-2 md:!p-3 hover:bg-gray-50 !rounded-lg">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 !rounded-full ${colorClasses[color]}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;

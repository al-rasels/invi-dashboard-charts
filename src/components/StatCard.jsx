// components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rgb-border-card !rounded-2xl p-[1.5px] overflow-hidden">
      <div className="bg-white !rounded-2xl shadow-sm !p-4 md:!p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p
              className={`text-sm font-semibold ${
                change.includes("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </p>
          </div>
          <div
            className={`w-10 h-10 md:w-12 md:h-12 !rounded-xl ${colorClasses[color]} flex items-center justify-center text-lg md:text-xl`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

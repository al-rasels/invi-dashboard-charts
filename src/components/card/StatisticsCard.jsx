import React from "react";
import { FaChartPie, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";

export default function StatisticsCard({ stats }) {
  const displayStats = [
    {
      title: "Total Products",
      value: stats?.total_products?.toLocaleString() || 0,
      icon: <FaShoppingCart />,
      iconBg: "bg-white/20",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700",
      shadow: "shadow-indigo-200"
    },
    {
      title: "Total Invoices",
      value: stats?.total_invoices?.toLocaleString() || 0,
      icon: <FaChartPie />,
      iconBg: "bg-white/20",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700",
      shadow: "shadow-emerald-200"
    },
    {
      title: "Total Clients",
      value: stats?.total_clients?.toLocaleString() || 0,
      icon: <FaUsers />,
      iconBg: "bg-white/20",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-violet-500 via-violet-600 to-purple-700",
      shadow: "shadow-violet-200"
    },
    {
      title: "Total Suppliers",
      value: stats?.total_suppliers?.toLocaleString() || 0,
      icon: <FaDollarSign />,
      iconBg: "bg-white/20",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700",
      shadow: "shadow-amber-200"
    },
  ];

  return (
    <div className="!bg-white !rounded-2xl !shadow-sm hover:!shadow-xl !transition-all !duration-300 !p-4 md:!p-6 !w-full !border !border-gray-100 !h-full !flex !flex-col !justify-between">
      {/* Header */}
      <div className="!flex !justify-between !items-center !border-b !border-gray-100 !pb-4 !mb-6">
        <div>
          <h2 className="!text-xl md:!text-2xl !font-black !text-gray-800 !tracking-tight">INVI <span className="!text-indigo-600">DASHBOARD</span></h2>
          <p className="!text-[10px] md:!text-xs !text-gray-400 !font-bold !uppercase !tracking-widest !mt-0.5">Real-time Performance Metrics</p>
        </div>

      </div>

      {/* Stats Body */}
      <div className="!grid !grid-cols-2 lg:!grid-cols-4 !gap-4 md:!gap-6">
        {displayStats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} ${stat.shadow} !shadow-lg !p-4 md:!p-5 !rounded-2xl !transition-all !duration-300 hover:!scale-[1.05] hover:!-translate-y-1 !flex !flex-col !items-center !text-center group !cursor-pointer`}>
            <div className={`!p-3 !rounded-xl ${stat.iconBg} !backdrop-blur-md !mb-4 group-hover:!rotate-12 !transition-transform !duration-300 !shadow-inner`}>
              <span className={`!text-xl md:!text-2xl ${stat.iconColor}`}>{stat.icon}</span>
            </div>
            <div className="!w-full">
              <p className="!text-[10px] md:!text-xs !font-bold !text-white/80 !uppercase !tracking-widest !mb-1">{stat.title}</p>
              <h3 className="!text-base md:!text-xl !font-black !text-white !truncate !drop-shadow-sm">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold text-emerald-400">
          ৳{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Custom dot component
const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#f59e0b"
      stroke="#fff"
      strokeWidth={2}
      className="drop-shadow-md"
    />
  );
};

export default function MonthlySalesCard({ salesData: rawSalesData }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const salesData = rawSalesData?.map(item => ({
    date: item.date.split('-').slice(1).reverse().join('/'), // Convert YYYY-MM-DD to MM/DD or similar
    amount: item.amount
  })) || [];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoomLevel(1);

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  const peakValue = Math.max(...(salesData.map(d => d.amount) || [0]), 0);
  const totalValue = salesData.reduce((acc, curr) => acc + curr.amount, 0);
  const avgValue = salesData.length ? totalValue / salesData.length : 0;

  return (
    <div
      className="glass-modern !rounded-2xl !transition-all !duration-500 !overflow-hidden !flex !flex-col !h-full"
    >
      {/* Header */}
      <div className="!flex !flex-col sm:!flex-row !items-start sm:!items-center !justify-between !px-4 md:!px-6 !py-4 !border-b !border-white/10 !gap-4">
        <h2 className="!text-lg md:!text-xl !font-bold !text-white !tracking-tight">
          Daily Sales Performance
        </h2>
        <div className="!flex !items-center !gap-1 md:!gap-2 !flex-wrap">
          <button
            onClick={handleZoomIn}
            className="!p-1.5 md:!p-2 !bg-white/10 hover:!bg-white/20 !rounded-full !transition-colors !duration-200 !text-slate-300 hover:!text-white !backdrop-blur-sm"
            title="Zoom In"
          >
            <AiOutlinePlusCircle size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="!p-1.5 md:!p-2 !bg-white/10 hover:!bg-white/20 !rounded-full !transition-colors !duration-200 !text-slate-300 hover:!text-white !backdrop-blur-sm"
            title="Zoom Out"
          >
            <AiOutlineMinusCircle size={18} />
          </button>
          <button
            onClick={handleReset}
            className="!p-1.5 md:!p-2 !bg-white/10 hover:!bg-white/20 !rounded-full !transition-colors !duration-200 !text-slate-300 hover:!text-white !backdrop-blur-sm"
            title="Reset"
          >
            <FaHome size={16} />
          </button>
          <button
            className="!p-1.5 md:!p-2 !bg-white/10 hover:!bg-white/20 !rounded-full !transition-colors !duration-200 !text-slate-300 hover:!text-white !ml-2 !backdrop-blur-sm"
            title="Menu"
          >
            <HiOutlineMenu size={18} />
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="!grid !grid-cols-3 !gap-2 !px-4 md:!px-6 !py-4 !bg-white/5 !backdrop-blur-sm">
        <div className="!text-center">
          <p className="!text-[10px] md:!text-xs !text-slate-300 !uppercase !font-bold !tracking-widest !mb-1">Peak</p>
          <p className="!text-sm md:!text-lg !font-black !text-emerald-400">৳{peakValue.toLocaleString()}</p>
        </div>
        <div className="!text-center !border-x !border-white/10">
          <p className="!text-[10px] md:!text-xs !text-slate-300 !uppercase !font-bold !tracking-widest !mb-1">
            Avg
          </p>
          <p className="!text-sm md:!text-lg !font-black text-vibrant-indigo">৳{avgValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="!text-center">
          <p className="!text-[10px] md:!text-xs !text-slate-300 !uppercase !font-bold !tracking-widest !mb-1">
            Total
          </p>
          <p className="!text-sm md:!text-lg !font-black text-vibrant-pink">৳{(totalValue / 1000).toFixed(1)}k</p>
        </div>
      </div>

      {/* Chart Area */}
      <div className="!px-2 md:!px-4 !pb-4 !flex-1 !min-h-[300px] md:!min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{ top: 20, right: 10, left: -15, bottom: 20 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="35%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="75%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                fill: "#f59e0b",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

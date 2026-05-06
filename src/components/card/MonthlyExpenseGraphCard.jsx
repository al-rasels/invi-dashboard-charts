import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white !px-4 !py-3 !rounded-2xl shadow-2xl border border-gray-700/50">
        <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-black text-rose-400 mt-1">
          ৳{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function MonthlyExpenseGraphCard({ expenses, currentMonthExpense }) {
  const chartData = expenses?.map((item) => ({
    month: item.month,
    amount: item.amount || 0,
  })) || [];

  // Only show months with data or up to current month
  const activeData = chartData.filter((d, i) => {
    // Show all months up to the last one with data + 1 for visual spacing
    const lastActiveIndex = chartData.reduce((last, curr, idx) => (curr.amount > 0 ? idx : last), 0);
    return i <= Math.min(lastActiveIndex + 1, 11);
  });

  const totalExpense = chartData.reduce((sum, d) => sum + d.amount, 0);
  const peakExpense = Math.max(...chartData.map((d) => d.amount), 0);
  const peakMonth = chartData.find((d) => d.amount === peakExpense)?.month || "N/A";
  const avgExpense = activeData.filter(d => d.amount > 0).length
    ? totalExpense / activeData.filter(d => d.amount > 0).length
    : 0;

  return (
    <div className="!bg-white !rounded-3xl !shadow-sm !border !border-gray-100 !overflow-hidden !flex !flex-col !h-full !transition-all hover:!shadow-2xl">
      {/* Header */}
      <div className="!p-4 md:!p-6">
        <div className="!flex !flex-col sm:!flex-row !justify-between !items-start sm:!items-center !gap-3">
          <div>
            <h2 className="!text-lg md:!text-xl !font-black !text-gray-800 !tracking-tight">
              Monthly <span className="!text-rose-600">Expense</span> Flow
            </h2>
            <p className="!text-[10px] !font-bold !text-gray-400 !uppercase !tracking-widest !mt-0.5">
              Spending Trend
            </p>
          </div>
          <div className="!flex !items-center !gap-2 !px-3 !py-1.5 !bg-rose-50 !rounded-xl !border !border-rose-100">
            <TrendingDown size={14} className="!text-rose-600" strokeWidth={3} />
            <span className="!text-[10px] !font-black !text-rose-600">
              ৳{(totalExpense / 1000000).toFixed(2)}M
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="!grid !grid-cols-3 !gap-2 !px-4 md:!px-6 !pb-4">
        <div className="!bg-gradient-to-br !from-rose-50 !to-pink-50 !rounded-2xl !p-3 !border !border-rose-100 !text-center">
          <p className="!text-[9px] !font-black !text-rose-400 !uppercase !tracking-widest !mb-0.5">Peak</p>
          <p className="!text-sm !font-black !text-rose-700">৳{(peakExpense / 1000).toFixed(0)}k</p>
        </div>
        <div className="!bg-gradient-to-br !from-orange-50 !to-amber-50 !rounded-2xl !p-3 !border !border-orange-100 !text-center">
          <p className="!text-[9px] !font-black !text-orange-400 !uppercase !tracking-widest !mb-0.5">Avg</p>
          <p className="!text-sm !font-black !text-orange-700">৳{(avgExpense / 1000).toFixed(0)}k</p>
        </div>
        <div className="!bg-gradient-to-br !from-violet-50 !to-purple-50 !rounded-2xl !p-3 !border !border-violet-100 !text-center">
          <p className="!text-[9px] !font-black !text-violet-400 !uppercase !tracking-widest !mb-0.5">May</p>
          <p className="!text-sm !font-black !text-violet-700">৳{(currentMonthExpense / 1000).toFixed(0)}k</p>
        </div>
      </div>

      {/* Chart */}
      <div className="!px-4 md:!px-6 !pb-6 !flex-1 !min-h-[180px] md:!min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#fb7185" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#fda4af" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 700 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }}
              tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="url(#expenseStroke)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#expenseGrad)"
              dot={{ r: 5, fill: "#f43f5e", stroke: "#fff", strokeWidth: 3 }}
              activeDot={{ r: 7, fill: "#e11d48", stroke: "#fff", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

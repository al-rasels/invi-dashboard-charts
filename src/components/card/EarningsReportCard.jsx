import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Tooltip as ReTooltip } from 'recharts';

export default function EarningsReportCard({ chartData: rawChartData, stats }) {
  const [animate, setAnimate] = useState(false);
  const [year, setYear] = useState("2025");

  const chartData = rawChartData?.map(item => ({
    label: item.month,
    earn: item.sell,
    exp: item.collection
  })) || [];

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="!bg-white !p-4 md:!p-8 !rounded-3xl !shadow-xl !flex !flex-col lg:!flex-row !w-full !relative !gap-8 !border !border-gray-100 !overflow-hidden !group">
      {/* Decorative background element */}
      <div className="!absolute !top-0 !right-0 !-mt-20 !-mr-20 !w-64 !h-64 !bg-indigo-50 !rounded-full !blur-3xl !opacity-50 group-hover:!opacity-70 !transition-opacity !duration-1000"></div>

      {/* ==== LEFT CHART AREA ==== */}
      <div className="!w-full lg:!w-2/3 lg:!pr-8 lg:!border-r !border-gray-100 !relative">
        <div className="!flex !flex-col sm:!flex-row sm:!items-center !justify-between !mb-8 !gap-4">
          <div>
            <h2 className="!text-xl md:!text-2xl !font-black !text-gray-800 !tracking-tight">Sells <span className="!text-indigo-600">vs</span> Collection</h2>
            <p className="!text-xs md:!text-sm !text-gray-400 !font-medium !mt-1">Monthly business performance overview</p>
          </div>

          <div className="!flex !gap-4 md:!gap-8 !bg-gray-50 !p-3 !rounded-2xl !border !border-gray-100">
            <div className="!flex !items-center !gap-2.5">
              <span className="!w-3.5 !h-3.5 !rounded-md !bg-gradient-to-tr !from-indigo-600 !to-blue-500 !shadow-md !shadow-indigo-100"></span>
              <span className="!text-gray-700 !text-xs md:!text-sm !font-bold">Total Sells</span>
            </div>
            <div className="!flex !items-center !gap-2.5">
              <span className="!w-3.5 !h-3.5 !rounded-md !bg-gradient-to-tr !from-emerald-500 !to-teal-400 !shadow-md !shadow-emerald-100"></span>
              <span className="!text-gray-700 !text-xs md:!text-sm !font-bold">Collection</span>
            </div>
          </div>
        </div>

        {/* ==== Custom Bar Chart ==== */}
        <div className="!h-[300px] md:!h-[450px] !w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorSells" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }} />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
              />
              <Bar dataKey="earn" fill="url(#colorSells)" radius={[6, 6, 0, 0]} barSize={window.innerWidth < 640 ? 12 : 24} />
              <Bar dataKey="exp" fill="url(#colorColl)" radius={[6, 6, 0, 0]} barSize={window.innerWidth < 640 ? 12 : 24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ==== RIGHT PANEL ==== */}
      <div className="!w-full lg:!w-1/3 !flex !flex-col !justify-between !pt-6 lg:!pt-0">
        <div>
          {/* Year Dropdown */}
          <div className="!flex !justify-end !mb-8">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="!px-4 !py-2 !bg-indigo-50 !text-indigo-600 !rounded-xl !text-xs md:!text-sm !font-bold !border !border-indigo-100 !outline-none focus:!ring-4 focus:!ring-indigo-100 !cursor-pointer !appearance-none !transition-all"
            >
              <option>Year: 2024</option>
              <option>Year: 2025</option>
            </select>
          </div>

          {/* Amount Card */}
          <div className="!bg-gradient-to-br !from-indigo-600 !via-indigo-700 !to-blue-800 !p-6 md:!p-8 !rounded-3xl !shadow-2xl !relative !overflow-hidden group/card !border !border-indigo-400/20">
            <div className="!absolute !top-0 !right-0 !w-32 !h-32 !bg-white/10 !rounded-full !-mr-16 !-mt-16 !blur-2xl"></div>
            <div className="!absolute !bottom-0 !left-0 !w-24 !h-24 !bg-blue-400/10 !rounded-full !-ml-12 !-mb-12 !blur-xl"></div>

            <div className="!relative !z-10 !text-center lg:!text-left">
              <h1 className="!text-3xl md:!text-5xl !font-black !text-white !tracking-tighter !drop-shadow-md">
                ৳{stats?.total_sell?.toLocaleString() || 0}
              </h1>
              <p className="!text-indigo-100 !text-sm md:!text-base !mt-2 !font-bold !uppercase !tracking-widest !opacity-90">Accumulated Revenue</p>

              <div className="!mt-6 !flex !items-center !justify-center lg:!justify-start !gap-2">
                <span className="!px-3 !py-1 !bg-white/20 !text-white !rounded-lg !text-xs !font-black !backdrop-blur-md">
                  +24.5% Growth
                </span>
                <span className="!text-indigo-50/60 !text-xs !font-bold !italic">Dynamic Forecast</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==== Mini Graph Area ==== */}
        <div className="!mt-8 !flex-1 !flex !flex-col">
          <p className="!text-xs !font-bold !text-gray-400 !uppercase !tracking-widest !mb-4">Collection Trend</p>
          <div className="!h-[120px] md:!h-[180px] !w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" hide />
                <Line type="monotone" dataKey="exp" stroke="url(#lineGrad)" strokeWidth={4} dot={false} />
                <ReTooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Button */}
        <button className="!mt-8 !w-full !bg-indigo-600 hover:!bg-indigo-700 !text-white !py-4 md:!py-5 !rounded-2xl !font-black !shadow-xl !shadow-indigo-100 !transition-all active:!scale-[0.98] !group !flex !items-center !justify-center !gap-3">
          Explore Analytics Report
          <svg className="!w-5 !h-5 group-hover:!translate-x-1 !transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

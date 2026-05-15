import { TrendingUpIcon, UsersIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Area, ComposedChart } from 'recharts';

export default function EarningsReportCard({ chartData: rawChartData, stats }) {
  const [animate, setAnimate] = useState(false);
  const [year, setYear] = useState("2025");

  const chartData = rawChartData?.map(item => ({
    label: item.month,
    sell: item.sell,
    collection: item.collection
  })) || [];

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`glass-modern glass-border-indigo !p-3 sm:!p-4 md:!p-6 lg:!p-8 !rounded-3xl !transition-all !duration-500 !flex !flex-col xl:!flex-row !w-full !relative !gap-4 sm:!gap-6 lg:!gap-8 !overflow-hidden !group ${animate ? "!opacity-100 !translate-y-0" : "!opacity-0 !translate-y-4"}`}>
      {/* Decorative background element */}
      <div className="!absolute !top-0 !right-0 !-mt-20 !-mr-20 !w-48 sm:!w-64 !h-48 sm:!h-64 !bg-indigo-600 !rounded-full !blur-[100px] !opacity-20 group-hover:!opacity-30 !transition-opacity !duration-1000"></div>

      {/* ==== LEFT CHART AREA ==== */}
      <div className="!w-full xl:!w-2/3 xl:!pr-6 xl:!border-r !border-white/10 !relative">
        <div className="!flex !flex-col sm:!flex-row sm:!items-center !justify-between !mb-4 sm:!mb-6 md:!mb-8 !gap-3 sm:!gap-4">
          <div className="!min-w-0">
            <h2 className="!text-lg sm:!text-xl md:!text-2xl !font-black !text-white !tracking-tight !truncate">Sells <span className="text-vibrant-indigo">vs</span> Collection</h2>
            <p className="!text-xs sm:!text-sm !text-slate-400 !font-medium !mt-0.5 sm:!mt-1">Monthly business performance overview</p>
          </div>

          <div className="!flex !flex-wrap gap-2 sm:!gap-4 md:!gap-8 !bg-white/5 !p-2 sm:!p-3 !rounded-2xl !border !border-white/10 !text-xs sm:!text-sm !backdrop-blur-sm">
            <div className="!flex !items-center !gap-2">
              <span className="!w-2.5 sm:!w-3.5 !h-2.5 sm:!h-3.5 !rounded-md !bg-gradient-to-tr !from-indigo-500 !to-blue-400 !shadow-lg !flex-shrink-0"></span>
              <span className="!text-white/80 !font-bold !whitespace-nowrap">Total Sells</span>
            </div>
            <div className="!flex !items-center !gap-2">
              <span className="!w-2.5 sm:!w-3.5 !h-2.5 sm:!h-3.5 !rounded-md !bg-gradient-to-tr !from-emerald-400 !to-teal-300 !shadow-lg !flex-shrink-0"></span>
              <span className="!text-white/80 !font-bold !whitespace-nowrap">Collection</span>
            </div>
          </div>
        </div>

        {/* ==== Custom Bar Chart ==== */}
        <div className="!h-64 sm:!h-72 md:!h-80 lg:!h-[350px] !w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }} 
                dy={8} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }} 
                width={35}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                  return value;
                }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="!bg-gray-900/95 !backdrop-blur-md !rounded-2xl !p-4 !shadow-2xl !border !border-white/10 !min-w-[150px]">
                        <p className="!text-slate-400 !text-[10px] !font-black !uppercase !tracking-widest !mb-2">{label}</p>
                        <div className="!space-y-2">
                          {payload.map((entry, index) => (
                            <div key={index} className="!flex !items-center !justify-between !gap-4">
                              <div className="!flex !items-center !gap-2">
                                <div className="!w-2 !h-2 !rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="!text-slate-300 !text-xs !font-bold !capitalize">{entry.name}</span>
                              </div>
                              <span className="!text-white !text-xs !font-black">৳{entry.value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="sell" fill="url(#colorSells)" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="collection" fill="url(#colorColl)" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ==== RIGHT PANEL ==== */}
      <div className="!w-full xl:!w-1/3 !flex !flex-col !justify-between !pt-4 sm:!pt-6 xl:!pt-0 !gap-4 sm:!gap-6">
        <div>
          {/* Year Dropdown */}
          {/* <div className="!flex !justify-end !mb-8">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="!px-4 !py-2 !bg-indigo-50 !text-indigo-600 !rounded-xl !text-xs md:!text-sm !font-bold !border !border-indigo-100 !outline-none focus:!ring-4 focus:!ring-indigo-100 !cursor-pointer !appearance-none !transition-all"
            >
              <option>Year: 2024</option>
              <option>Year: 2025</option>
            </select>
          </div> */}

          {/* Amount Card */}
          <div className="!bg-gradient-to-br !from-indigo-600 !via-indigo-700 !to-blue-800 !px-4 sm:!px-5 !py-5 sm:!py-6 !rounded-3xl !shadow-2xl !relative !overflow-hidden !border !border-indigo-400/20">
            {/* Decorative circles (background, unaffected) */}
            <div className="!absolute !-top-6 !-right-6 sm:!-top-5 !-right-5 !w-20 sm:!w-24 !h-20 sm:!h-24 !bg-white/[0.07] !rounded-full"></div>
            <div className="!absolute !-bottom-6 !-left-5 sm:!-bottom-5 sm:!-left-4 !w-16 sm:!w-18 !h-16 sm:!h-18 !bg-blue-400/10 !rounded-full"></div>

            {/* Centering wrapper */}
            <div className="!relative !z-10 !flex !flex-col !items-center !justify-center !h-full !text-center">

              {/* Row 1: icon label + live badge (now centered together) */}
              <div className="!flex !flex-wrap !items-center !justify-center !gap-1.5 sm:!gap-2 !mb-2 sm:!mb-2.5">
                <div className="!w-5 sm:!w-6.5 !h-5 sm:!h-6.5 !rounded-lg !bg-white/15 !flex !items-center !justify-center !flex-shrink-0">
                  <UsersIcon className="!w-3 sm:!w-3.5 !h-3 sm:!h-3.5 !text-white/90" />
                </div>
                <span className="!text-sm sm:!text-xl !font-medium !text-white/90 !uppercase !tracking-wide !leading-tight">
                 You have total
                </span>
                {/* Live badge placed right after the label */}
                <div className="!flex !items-center !gap-1.5 !px-2 sm:!px-2.5 !py-0.5 sm:!py-1 !rounded-full !bg-white/10 !backdrop-blur-sm !ml-0 sm:!ml-1">
                 
                 
                </div>
              </div>

              {/* Row 2: main number */}
              <div className="!flex !items-baseline !justify-center !gap-1 sm:!gap-1.5 !mb-1">
              
                <span className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl !font-bold !text-white !tracking-tight !leading-none">
                  ৳{new Intl.NumberFormat("en-BD").format(stats?.due_clients || 0)}
                </span>
              </div>

              {/* Row 3: description */}
              <p className="!text-xs sm:!text-sm md:!text-base !text-white/80 !leading-snug !mb-1 sm:!mb-1.5 !m-0">
                Total outstanding client dues
              </p>

              {/* Severity level badge (centered) */}
             

            
            </div>
          </div>
        </div>

        {/* ==== Mini Graph Area ==== */}
        <div className="!mt-4 sm:!mt-6 !flex-1 !flex !flex-col !min-h-0">
      

          <div className="!h-52 sm:!h-60 md:!h-72 lg:!h-80 !w-full !flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 5, left: 0, bottom: 5 }}>
                {/* Gradient definitions (unchanged) */}
                <defs>
                  <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>

                  {/* Area fill gradients (soft glow) */}
                  <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Horizontal grid for readability */}
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />

                {/* X-axis: show month labels */}
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 9, fontWeight: 500 }}
                  dy={4}
                />

                {/* Y-axis: subtle ticks */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 8 }}
                  width={35}
                  tickFormatter={(value) => {
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value;
                  }}
                />

                {/* Tooltip improved */}
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="!bg-gray-900/95 !backdrop-blur-md !rounded-xl !px-2 sm:!px-3 !py-1.5 sm:!py-2 !shadow-lg !border !border-white/10 !text-xs">
                          <p className="!text-white/60 !mb-0.5 sm:!mb-1 !text-[9px] sm:!text-[10px] !uppercase !tracking-wider">{label}</p>
                          {payload.map((entry, index) => (
                            <div key={index} className="!flex !items-center !gap-1.5 sm:!gap-2 !text-white">
                              <span
                                className="!w-1.5 sm:!w-2 !h-1.5 sm:!h-2 !rounded-full !flex-shrink-0"
                                style={{ backgroundColor: entry.color }}
                              ></span>
                              <span className="!capitalize !text-[9px] sm:!text-[11px] !font-medium !break-words">
                                {entry.name}: {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Legend: Modern styling */}
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ 
                    fontSize: '9px', 
                    fontWeight: 'bold',
                    color: '#6b7280', 
                    paddingBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                />

                {/* Area fills (under the lines) for depth */}
                <Area
                  type="monotone"
                  dataKey="sell"
                  name="Sells"
                  stroke="none"
                  fill="url(#areaGrad1)"
                  fillOpacity={1}
                  legendType="none"
                />
                <Area
                  type="monotone"
                  dataKey="collection"
                  name="Collection"
                  stroke="none"
                  fill="url(#areaGrad2)"
                  fillOpacity={1}
                  legendType="none"
                />

                {/* Lines with high-end polished dots */}
                <Line
                  type="monotone"
                  dataKey="sell"
                  name="Sells"
                  stroke="url(#lineGrad1)"
                  strokeWidth={3}
                  dot={{
                    r: 3.5,
                    strokeWidth: 2,
                    stroke: '#fff',
                    fill: '#6366f1',
                    fillOpacity: 1,
                    strokeOpacity: 1,
                  }}
                  activeDot={{
                    r: 5.5,
                    strokeWidth: 0,
                    fill: '#4f46e5',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="collection"
                  name="Collection"
                  stroke="url(#lineGrad2)"
                  strokeWidth={3}
                  dot={{
                    r: 3.5,
                    strokeWidth: 2,
                    stroke: '#fff',
                    fill: '#10b981',
                    fillOpacity: 1,
                    strokeOpacity: 1,
                  }}
                  activeDot={{
                    r: 5.5,
                    strokeWidth: 0,
                    fill: '#059669',
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Button */}

      </div>
    </div>
  );
}

import React from 'react';
import { ResponsiveContainer, LineChart, Line, Tooltip, AreaChart, Area } from 'recharts';

export default function ProfitCard({ stats }) {
    const chartData = [
      { earn: 400 }, { earn: 300 }, { earn: 500 }, { earn: 400 }, { earn: 600 }, { earn: 550 }, { earn: 700 }
    ];

    return (
      <div className="!w-full !bg-white !rounded-3xl !flex !flex-col !justify-between !shadow-sm !p-6 md:!p-8 !h-full !border !border-gray-100 !group !transition-all hover:!shadow-xl">
        <div className="!flex !justify-between !items-start">
          <div>
            <h3 className="!text-gray-900 !text-lg md:!text-2xl !font-black !tracking-tight group-hover:!text-indigo-600 !transition-colors">Total Balance</h3>
            <p className="!text-gray-400 !text-xs md:!text-sm !font-bold !uppercase !tracking-widest !mt-1">Live Capital</p>
          </div>

        </div>

        <div className="!w-full !h-[120px] md:!h-[150px] !mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip cursor={false} content={() => null} />
              <Area type="monotone" dataKey="earn" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="!mt-6 !flex !justify-between !items-end !w-full">
          <div>
            <p className="!text-3xl md:!text-4xl !font-black !text-gray-900 !tracking-tighter">
              ৳ {stats?.total_balance ? (stats.total_balance).toFixed(2) : '0'}
            </p>
            <p className="!text-emerald-500 !text-xs md:!text-sm !font-bold !flex !items-center !gap-1 !mt-1">
              <span className="!w-1.5 !h-1.5 !rounded-full !bg-emerald-500 !animate-pulse"></span>
              Live Syncing
            </p>
          </div>
          <div className="!p-3 !bg-gray-50 !rounded-2xl !border !border-gray-100 group-hover:!bg-indigo-600 group-hover:!text-white !transition-all !cursor-pointer">
            <svg className="!w-5 !h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    );
}
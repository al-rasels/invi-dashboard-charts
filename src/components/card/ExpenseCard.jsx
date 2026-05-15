import { TrendingDown, Receipt, Calendar } from "lucide-react";
import React from "react";


export default function ExpensesCard({ stats, mainUrl, monthlyExpenses }) {
    return (
        <div className="glass-modern glass-border-pink !rounded-3xl !p-6 md:!p-8 !flex !flex-col !justify-between !min-h-[250px] !group !transition-all !relative !overflow-hidden !h-full">
            {/* Background Decoration */}
            <div className="!absolute !top-0 !right-0 !w-40 !h-40 !bg-rose-600 !rounded-full !-mr-20 !-mt-20 !blur-[80px] !opacity-20 group-hover:!opacity-30 !transition-opacity"></div>
            <div className="!absolute !bottom-0 !left-0 !w-32 !h-32 !bg-orange-500 !rounded-full !-ml-16 !-mb-16 !blur-[60px] !opacity-10"></div>

            <div className="!z-10 !relative">
                <div className="!flex !items-center !justify-between !mb-2">
                    <h2 className="!text-lg md:!text-2xl !font-black !text-white !tracking-tight">
                        Monthly <span className="text-vibrant-pink">Expenses</span>
                    </h2>
                    <div className="!p-2.5 !bg-white/10 !rounded-xl group-hover:!bg-rose-500 group-hover:!text-white !transition-all !backdrop-blur-sm">
                        <TrendingDown size={18} className="!text-rose-400 group-hover:!text-white" strokeWidth={3} />
                    </div>
                </div>
                <p className="!text-xs !font-bold !text-slate-300 !uppercase !tracking-widest">Current Month Spending</p>

                <div className="!mt-6">
                    <p className="!text-4xl md:!text-5xl !font-black !text-white !tracking-tighter">
                        ৳ {stats?.current_month_expense?.toLocaleString() || 0}
                    </p>
                    <div className="!flex !items-center !gap-3 !mt-4">
                        <div className="!inline-flex !items-center !gap-2 !px-3 !py-1.5 !bg-white/10 !text-rose-300 !rounded-xl !text-xs !font-black !border !border-white/10 !backdrop-blur-sm">
                            <Calendar size={12} strokeWidth={3} />
                            May 2026
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Expense Mini Card */}
            <div className="!mt-6 !bg-white/5 !backdrop-blur-md !rounded-2xl !p-4 !border !border-white/10 !z-10 !relative">
                <div className="!flex !items-center !justify-between">
                    <div className="!flex !items-center !gap-3">
                        <div className="!p-2 !bg-white/10 !rounded-xl !shadow-lg">
                            <Receipt size={16} className="!text-rose-400" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="!text-[10px] !font-black !text-rose-300 !uppercase !tracking-widest">Today's Expense</p>
                            <p className="!text-lg !font-black !text-rose-500">৳ {stats?.todays_expense?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

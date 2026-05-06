import { TrendingDown, Receipt, Calendar } from "lucide-react";
import React from "react";


export default function ExpensesCard({ stats, mainUrl, monthlyExpenses }) {
    return (
        <div className="!bg-white !rounded-3xl !shadow-lg !p-6 md:!p-8 !flex !flex-col !justify-between !min-h-[250px] !border !border-gray-100 !group hover:!shadow-xl !transition-all !relative !overflow-hidden !h-full">
            {/* Background Decoration */}
            <div className="!absolute !top-0 !right-0 !w-40 !h-40 !bg-rose-50 !rounded-full !-mr-20 !-mt-20 !blur-3xl !opacity-40 group-hover:!opacity-60 !transition-opacity"></div>
            <div className="!absolute !bottom-0 !left-0 !w-32 !h-32 !bg-orange-50 !rounded-full !-ml-16 !-mb-16 !blur-3xl !opacity-30"></div>

            <div className="!z-10 !relative">
                <div className="!flex !items-center !justify-between !mb-2">
                    <h2 className="!text-lg md:!text-2xl !font-black !text-gray-800 !tracking-tight">
                        Monthly <span className="!text-rose-600">Expenses</span>
                    </h2>
                    <div className="!p-2.5 !bg-rose-50 !rounded-xl group-hover:!bg-rose-600 group-hover:!text-white !transition-all">
                        <TrendingDown size={18} className="!text-rose-600 group-hover:!text-white" strokeWidth={3} />
                    </div>
                </div>
                <p className="!text-xs !font-bold !text-gray-400 !uppercase !tracking-widest">Current Month Spending</p>

                <div className="!mt-6">
                    <p className="!text-4xl md:!text-5xl !font-black !text-gray-900 !tracking-tighter">
                        ৳{stats?.current_month_expense?.toLocaleString() || 0}
                    </p>
                    <div className="!flex !items-center !gap-3 !mt-4">
                        <div className="!inline-flex !items-center !gap-2 !px-3 !py-1.5 !bg-rose-50 !text-rose-600 !rounded-xl !text-xs !font-black !border !border-rose-100">
                            <Calendar size={12} strokeWidth={3} />
                            May 2026
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Expense Mini Card */}
            <div className="!mt-6 !bg-gradient-to-r !from-rose-50 !to-orange-50 !rounded-2xl !p-4 !border !border-rose-100 !z-10 !relative">
                <div className="!flex !items-center !justify-between">
                    <div className="!flex !items-center !gap-3">
                        <div className="!p-2 !bg-white !rounded-xl !shadow-sm">
                            <Receipt size={16} className="!text-rose-600" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="!text-[10px] !font-black !text-rose-400 !uppercase !tracking-widest">Today's Expense</p>
                            <p className="!text-lg !font-black !text-rose-700">৳{stats?.todays_expense?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

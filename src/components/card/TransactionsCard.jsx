import React from "react";
import { Banknote, CreditCard, Landmark, ShoppingBag, ArrowRight } from "lucide-react";

export default function TransactionsCard({ transactions }) {
  const displayTransactions = transactions?.slice(0, 10).map((inv, index) => {
    const isPaid = parseFloat(inv.paid) >= parseFloat(inv.tot_bill);
    return {
      icon: index % 2 === 0 ? <CreditCard size={20} /> : <Banknote size={20} />,
      title: inv.client_name || "Unknown Client",
      subtitle: inv.pm_name || "Standard Method",
      amount: `${isPaid ? '+' : '-'}${parseFloat(inv.paid).toLocaleString()}`,
      color: isPaid ? "text-emerald-600" : "text-amber-600",
      bgColor: isPaid ? "bg-emerald-50" : "bg-amber-50",
      iconBgColor: isPaid
        ? "bg-gradient-to-br from-emerald-600 to-teal-400"
        : "bg-gradient-to-br from-amber-600 to-orange-400",
      tag: isPaid ? "Paid" : "Due"
    };
  }) || [];

  return (
    <div className="bg-white !rounded-3xl !shadow-sm hover:!shadow-xl !transition-all !duration-500 !p-6 md:!p-8 h-full border border-gray-100 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">Recent <span className="text-indigo-600">Transactions</span></h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Live Sales Feed</p>
        </div>
        <button className="!p-2.5 bg-gray-50 !rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
          <ArrowRight size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar  max-h-[500px]">
        {displayTransactions.map((item, i) => (
          <div key={i} className={`flex justify-between items-center !p-4 !rounded-2xl border border-gray-100 transition-all hover:shadow-md hover:border-indigo-100 group cursor-pointer`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 !rounded-xl ${item.iconBgColor} text-white flex justify-center items-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-100`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="font-black text-gray-800 text-sm md:text-base truncate max-w-[150px]">{item.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.subtitle}</p>
                  <span className={`text-[8px] px-1.5 py-0.5 !rounded-md font-black uppercase ${item.bgColor} ${item.color}`}>{item.tag}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className={`font-black text-sm md:text-lg ${item.color}`}>{item.amount} ৳</p>
              <p className="text-[10px] text-gray-300 font-bold">Today</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

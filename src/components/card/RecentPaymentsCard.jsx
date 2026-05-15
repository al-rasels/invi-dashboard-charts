import { ArrowRight, User, Banknote } from "lucide-react";
import React from "react";

const getAvatarColor = (clientName = "") => {
  const colors = [
    "from-blue-500 to-blue-600 !shadow-blue-500/20",
    "from-emerald-500 to-teal-600 !shadow-emerald-500/20",
    "from-violet-500 to-indigo-600 !shadow-indigo-500/20",
    "from-amber-500 to-orange-600 !shadow-amber-500/20",
    "from-rose-500 to-pink-600 !shadow-rose-500/20",
  ];
  const index = clientName.length % colors.length;
  return colors[index];
};

const getPaymentMethodInfo = (method = "") => {
  const m = method.toUpperCase();
  if (m.includes("CASH")) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  if (m.includes("BKASH") || m.includes("NAGAD")) return "bg-pink-500/20 text-pink-300 border-pink-500/30";
  if (m.includes("BANK") || m.includes("POS")) return "bg-blue-500/20 text-blue-300 border-blue-500/30";
  return "bg-white/10 text-white border-white/10";
};

export default function RecentPaymentsCard({ payments }) {
  // Support both recent_collections format and recent_sell_summary format
  const displayData = payments?.slice(0, 10).map(p => ({
    date: p.entry_date,
    client: p.client_name,
    payment: parseFloat(p.amount || p.paid || 0).toLocaleString(),
    paymentMethod: p.pm_name || "Cash"
  })) || [];

  const totalCollected = payments?.reduce((sum, p) => sum + parseFloat(p.amount || p.paid || 0), 0) || 0;

  return (
    <div className="glass-modern glass-border-emerald !rounded-3xl !overflow-hidden !h-full !flex !flex-col !transition-all">
      {/* Header */}
      <div className="!px-6 !py-8">
        <div className="!flex !justify-between !items-center !gap-4">
          <div>
            <h2 className="!text-xl md:!text-2xl !font-black !text-white !tracking-tight">Recent <span className="text-vibrant-emerald">Collections</span></h2>
            <p className="!text-xs !text-slate-300 !mt-1 !font-bold !uppercase !tracking-widest">Due Payment Received</p>
          </div>
          <div className="!flex !items-center !gap-3">
            <div className="!flex !items-center !gap-2 !px-3 !py-1.5 !bg-emerald-500/20 !rounded-xl !border !border-emerald-500/30 !backdrop-blur-sm">
              <Banknote size={14} className="!text-emerald-400" />
              <span className="!text-xs !font-black !text-emerald-100">৳{totalCollected.toLocaleString()}</span>
            </div>
            <button className="!flex !items-center !gap-2 !px-4 !py-2 !bg-white/10 !text-white !rounded-xl !text-xs !font-black hover:bg-vibrant-gradient !transition-all !group !backdrop-blur-sm">
              View All <ArrowRight size={14} className="group-hover:!translate-x-1 !transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="!flex-1 !overflow-x-auto !overflow-y-auto !max-h-[750px] !custom-scrollbar !px-2 md:!px-0 !pb-4">
        <table className="!w-full !text-left !border-collapse !border !border-white/10 !min-w-[600px] md:!min-w-full">
          <thead>
            <tr className="!border-y !border-white/10 !bg-white/5 !backdrop-blur-sm">
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-slate-300 !uppercase !tracking-widest !border !border-white/10">Date</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-slate-300 !uppercase !tracking-widest !border !border-white/10">Client</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-slate-300 !uppercase !tracking-widest !text-right !border !border-white/10">Amount</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-slate-300 !uppercase !tracking-widest !text-center !border !border-white/10">Method</th>
            </tr>
          </thead>
          <tbody className="!divide-y !divide-slate-200/70">
            {displayData.map((row, idx) => {
              const avatarGrad = getAvatarColor(row.client);
              const methodClass = getPaymentMethodInfo(row.paymentMethod);
              return (
                <tr key={idx} className="!group hover:!bg-white/10 !transition-colors">
                  <td className="!py-5 !px-6 !border !border-white/10">
                    <span className="!font-bold !text-slate-300 !text-[11px] md:!text-xs">{row.date}</span>
                  </td>
                  <td className="!py-5 !px-6 !border !border-white/10">
                    <div className="!flex !items-center !gap-4">
                      <span className={`!w-10 !h-10 !rounded-xl bg-gradient-to-br ${avatarGrad} !shadow-lg !text-white !flex !justify-center !items-center group-hover:!scale-110 !transition-transform !duration-300 !flex-shrink-0`}>
                        <User size={18} strokeWidth={3} />
                      </span>
                      <span className="!min-w-0 !flex !flex-col !justify-center">
                        <span className="!font-black !text-white !text-sm !truncate !max-w-[120px] md:!max-w-[200px] !leading-tight">{row.client}</span>
                      </span>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-white/10">
                    <span className="!font-black !text-emerald-400 !text-sm md:!text-base">৳{row.payment}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-white/10">
                    <span className={`!px-3 !py-1 !rounded-lg !text-[10px] !font-black !uppercase !border ${methodClass} !inline-block !min-w-[70px] !backdrop-blur-sm`}>
                      {row.paymentMethod}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
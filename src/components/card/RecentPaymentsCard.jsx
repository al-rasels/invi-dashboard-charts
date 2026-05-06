import { ArrowRight, User, Banknote } from "lucide-react";
import React from "react";

const getAvatarColor = (clientName = "") => {
  const colors = [
    "from-blue-500 to-blue-600 shadow-blue-100",
    "from-emerald-500 to-teal-600 shadow-emerald-100",
    "from-violet-500 to-indigo-600 shadow-violet-100",
    "from-amber-500 to-orange-600 shadow-amber-100",
    "from-rose-500 to-pink-600 shadow-rose-100",
  ];
  const index = clientName.length % colors.length;
  return colors[index];
};

const getPaymentMethodInfo = (method = "") => {
  const m = method.toUpperCase();
  if (m.includes("CASH")) return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (m.includes("BKASH") || m.includes("NAGAD")) return "bg-pink-100 text-pink-700 border-pink-200";
  if (m.includes("BANK") || m.includes("POS")) return "bg-blue-100 text-blue-700 border-blue-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
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
    <div className="!bg-white !rounded-3xl !shadow-sm !border !border-solid !border-gray-200 !overflow-hidden !h-full !flex !flex-col !transition-all hover:!shadow-2xl">
      {/* Header */}
      <div className="!px-6 !py-8">
        <div className="!flex !justify-between !items-center !gap-4">
          <div>
            <h2 className="!text-xl md:!text-2xl !font-black !text-gray-900 !tracking-tight">Recent <span className="!text-emerald-600">Collections</span></h2>
            <p className="!text-xs !text-gray-400 !mt-1 !font-bold !uppercase !tracking-widest">Due Payment Received</p>
          </div>
          <div className="!flex !items-center !gap-3">
            <div className="!flex !items-center !gap-2 !px-3 !py-1.5 !bg-emerald-50 !rounded-xl !border !border-emerald-100">
              <Banknote size={14} className="!text-emerald-600" />
              <span className="!text-xs !font-black !text-emerald-700">৳{totalCollected.toLocaleString()}</span>
            </div>
            <button className="!flex !items-center !gap-2 !px-4 !py-2 !bg-indigo-50 !text-indigo-600 !rounded-xl !text-xs !font-black hover:!bg-indigo-600 hover:!text-white !transition-all !group">
              View All <ArrowRight size={14} className="group-hover:!translate-x-1 !transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="!flex-1 !overflow-x-auto !overflow-y-auto !max-h-[750px] !custom-scrollbar !px-2 md:!px-0 !pb-4">
        <table className="!w-full !text-left !border-collapse !border !border-gray-200 !min-w-[600px] md:!min-w-full">
          <thead>
            <tr className="!border-y !border-gray-200 !bg-gray-50">
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !border !border-gray-200">Date</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !border !border-gray-200">Client</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !text-right !border !border-gray-200">Amount</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !text-center !border !border-gray-200">Method</th>
            </tr>
          </thead>
          <tbody className="!divide-y !divide-gray-200">
            {displayData.map((row, idx) => {
              const avatarGrad = getAvatarColor(row.client);
              const methodClass = getPaymentMethodInfo(row.paymentMethod);
              return (
                <tr key={idx} className="!group hover:!bg-indigo-50/20 !transition-colors">
                  <td className="!py-5 !px-6 !border !border-gray-200">
                    <span className="!font-bold !text-gray-500 !text-[11px] md:!text-xs">{row.date}</span>
                  </td>
                  <td className="!py-5 !px-6 !border !border-gray-200">
                    <div className="!flex !items-center !gap-4">
                      <span className={`!w-10 !h-10 !rounded-xl bg-gradient-to-br ${avatarGrad} !shadow-lg !text-white !flex !justify-center !items-center group-hover:!scale-110 !transition-transform !duration-300 !flex-shrink-0`}>
                        <User size={18} strokeWidth={3} />
                      </span>
                      <span className="!min-w-0 !flex !flex-col !justify-center">
                        <span className="!font-black !text-gray-800 !text-sm !truncate !max-w-[120px] md:!max-w-[200px] !leading-tight">{row.client}</span>
                      </span>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-gray-200">
                    <span className="!font-black !text-emerald-700 !text-sm md:!text-base">৳{row.payment}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-gray-200">
                    <span className={`!px-3 !py-1 !rounded-lg !text-[10px] !font-black !uppercase !border ${methodClass} !inline-block !min-w-[70px]`}>
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
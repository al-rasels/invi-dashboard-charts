import React from "react";
import { Receipt, User, Calendar, CreditCard, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function RecentSellCard({ sells }) {
  const displaySells = sells?.slice(0, 8) || [];

  return (
    <div className="glass-modern glass-border-indigo !rounded-3xl !overflow-hidden !flex !flex-col !transition-all">
      {/* Header */}
      <div className="!px-6 !py-8 !bg-white/5 !backdrop-blur-sm">
        <div className="!flex !justify-between !items-center !gap-4">
          <div>
            <div className="!flex !items-center !gap-3 !mb-1">
              <div className="!p-2 bg-vibrant-gradient !rounded-lg !text-white">
                <Receipt size={18} strokeWidth={2.5} />
              </div>
              <h2 className="!text-xl md:!text-2xl !font-black !text-white !tracking-tight">Recent <span className="text-vibrant-indigo">Sells</span></h2>
            </div>
            <p className="!text-xs !text-slate-300 !font-bold !uppercase !tracking-widest">Latest Invoices & Transactions</p>
          </div>
          <button className="!flex !items-center !gap-2 !px-4 !py-2 !bg-white/10 !text-white !rounded-xl !text-xs !font-black hover:bg-vibrant-gradient !transition-all !group !backdrop-blur-sm">
            View All <ArrowRight size={14} className="group-hover:!translate-x-1 !transition-transform" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="h-auto !overflow-x-auto !custom-scrollbar !px-2 md:!px-0 !pb-4">
        <table className="!w-full !text-left !border-collapse !border !border-white/10 !min-w-[800px] md:!min-w-full">
          <thead>
            <tr className="!border-y !border-white/10 !bg-white/5 !backdrop-blur-sm">
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !border !border-white/10">Invoice</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !border !border-white/10">Client</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !text-right !border !border-white/10">Total Bill</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !text-right !border !border-white/10">Paid</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !text-right !border !border-white/10">Balance</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !text-center !border !border-white/10">Method</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-slate-300 !uppercase !tracking-widest !text-center !border !border-white/10">Status</th>
            </tr>
          </thead>
          <tbody className="!divide-y !divide-slate-200/70">
            {displaySells.map((sell, idx) => {
              const isPaid = parseFloat(sell.paid) >= parseFloat(sell.tot_bill);
              const balance = parseFloat(sell.tot_bill) - parseFloat(sell.paid);

              return (
                <tr key={idx} className="!group hover:!bg-white/10 !transition-colors">
                  <td className="!py-5 !px-6 !border !border-white/10">
                    <div className="!flex !flex-col">
                      <span className="!font-black text-vibrant-indigo !text-base">#{sell.sell_id}</span>
                      <span className="!text-xs !text-slate-400 !font-bold !flex !items-center !gap-1">
                        <Calendar size={12} /> {sell.entry_date}
                      </span>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !border !border-white/10">
                    <div className="!flex !items-center !gap-3">
                      <div className="!w-10 !h-10 !rounded-lg !bg-white/10 !flex !justify-center !items-center !text-slate-400 !backdrop-blur-sm !shadow-lg !shadow-black/20">
                        <User size={16} />
                      </div>
                      <div className="!min-w-0 !flex !flex-col !justify-center">
                        <span className="!font-bold !text-white !text-base !truncate !max-w-[150px] !leading-tight">{sell.client_name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-white/10">
                    <span className="!font-bold !text-white !text-base">৳{parseFloat(sell.tot_bill).toLocaleString()}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-white/10">
                    <span className="!font-bold !text-emerald-400 !text-base">৳{parseFloat(sell.paid).toLocaleString()}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-white/10">
                    <span className={`!font-bold !text-base ${balance > 0 ? '!text-rose-400' : '!text-slate-400'}`}>
                      ৳{balance.toLocaleString()}
                    </span>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-white/10">
                    <div className="!inline-flex !items-center !gap-1.5 !px-2.5 !py-1.5 !bg-white/10 !rounded-lg !text-xs !font-bold !text-white !uppercase !backdrop-blur-sm">
                      <CreditCard size={12} /> {sell.pm_name || 'Cash'}
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-white/10">
                    {isPaid ? (
                      <div className="!inline-flex !items-center !gap-1 !text-emerald-300 !bg-emerald-500/20 !px-2.5 !py-1.5 !rounded-lg !text-xs !font-black !uppercase !border !border-emerald-500/30 !backdrop-blur-sm">
                        <CheckCircle2 size={14} /> Paid
                      </div>
                    ) : (
                      <div className="!inline-flex !items-center !gap-1 !text-amber-300 !bg-amber-500/20 !px-2.5 !py-1.5 !rounded-lg !text-xs !font-black !uppercase !border !border-amber-500/30 !backdrop-blur-sm">
                        <Clock size={14} /> Due
                      </div>
                    )}
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

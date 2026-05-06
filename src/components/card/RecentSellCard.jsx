import React from "react";
import { Receipt, User, Calendar, CreditCard, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function RecentSellCard({ sells }) {
  const displaySells = sells?.slice(0, 8) || [];

  return (
    <div className="!bg-white !rounded-3xl !shadow-sm !border !border-solid !border-gray-200 !overflow-hidden !flex !flex-col !transition-all hover:!shadow-2xl">
      {/* Header */}
      <div className="!px-6 !py-8 !bg-gradient-to-r !from-indigo-600/5 !to-transparent">
        <div className="!flex !justify-between !items-center !gap-4">
          <div>
            <div className="!flex !items-center !gap-3 !mb-1">
              <div className="!p-2 !bg-indigo-600 !rounded-lg !text-white">
                <Receipt size={18} strokeWidth={2.5} />
              </div>
              <h2 className="!text-xl md:!text-2xl !font-black !text-gray-900 !tracking-tight">Recent <span className="!text-indigo-600">Sells</span></h2>
            </div>
            <p className="!text-xs !text-gray-400 !font-bold !uppercase !tracking-widest">Latest Invoices & Transactions</p>
          </div>
          <button className="!flex !items-center !gap-2 !px-4 !py-2 !bg-indigo-50 !text-indigo-600 !rounded-xl !text-xs !font-black hover:!bg-indigo-600 hover:!text-white !transition-all !group">
            View All <ArrowRight size={14} className="group-hover:!translate-x-1 !transition-transform" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="h-auto !overflow-x-auto !custom-scrollbar !px-2 md:!px-0 !pb-4">
        <table className="!w-full !text-left !border-collapse !border !border-gray-200 !min-w-[800px] md:!min-w-full">
          <thead>
            <tr className="!border-y !border-gray-200 !bg-gray-50">
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !border !border-gray-200">Invoice</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !border !border-gray-200">Client</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !text-right !border !border-gray-200">Total Bill</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !text-right !border !border-gray-200">Paid</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !text-right !border !border-gray-200">Balance</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !text-center !border !border-gray-200">Method</th>
              <th className="!py-4 !px-6 !text-xs !font-black !text-gray-500 !uppercase !tracking-widest !text-center !border !border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="!divide-y !divide-gray-200">
            {displaySells.map((sell, idx) => {
              const isPaid = parseFloat(sell.paid) >= parseFloat(sell.tot_bill);
              const balance = parseFloat(sell.tot_bill) - parseFloat(sell.paid);

              return (
                <tr key={idx} className="!group hover:!bg-indigo-50/30 !transition-colors">
                  <td className="!py-5 !px-6 !border !border-gray-200">
                    <div className="!flex !flex-col">
                      <span className="!font-black !text-indigo-600 !text-base">#{sell.sell_id}</span>
                      <span className="!text-xs !text-gray-400 !font-bold !flex !items-center !gap-1">
                        <Calendar size={12} /> {sell.entry_date}
                      </span>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !border !border-gray-200">
                    <div className="!flex !items-center !gap-3">
                      <div className="!w-10 !h-10 !rounded-lg !bg-gray-100 !flex !justify-center !items-center !text-gray-500">
                        <User size={16} />
                      </div>
                      <div className="!min-w-0 !flex !flex-col !justify-center">
                        <span className="!font-bold !text-gray-700 !text-base !truncate !max-w-[150px] !leading-tight">{sell.client_name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-gray-200">
                    <span className="!font-bold !text-gray-900 !text-base">৳{parseFloat(sell.tot_bill).toLocaleString()}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-gray-200">
                    <span className="!font-bold !text-emerald-600 !text-base">৳{parseFloat(sell.paid).toLocaleString()}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-gray-200">
                    <span className={`!font-bold !text-base ${balance > 0 ? '!text-rose-600' : '!text-gray-400'}`}>
                      ৳{balance.toLocaleString()}
                    </span>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-gray-200">
                    <div className="!inline-flex !items-center !gap-1.5 !px-2.5 !py-1.5 !bg-gray-100 !rounded-lg !text-xs !font-bold !text-gray-600 !uppercase">
                      <CreditCard size={12} /> {sell.pm_name || 'Cash'}
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-gray-200">
                    {isPaid ? (
                      <div className="!inline-flex !items-center !gap-1 !text-emerald-600 !bg-emerald-50 !px-2.5 !py-1.5 !rounded-lg !text-xs !font-black !uppercase !border !border-emerald-200">
                        <CheckCircle2 size={14} /> Paid
                      </div>
                    ) : (
                      <div className="!inline-flex !items-center !gap-1 !text-amber-600 !bg-amber-50 !px-2.5 !py-1.5 !rounded-lg !text-xs !font-black !uppercase !border !border-amber-200">
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

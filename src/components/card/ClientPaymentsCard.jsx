import { ArrowRight, Wallet, ReceiptText } from "lucide-react";
import React from "react";

const getAvatarColor = (clientName = "") => {
  const colors = [
    "bg-indigo-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-amber-600",
    "bg-blue-600",
  ];
  const index = clientName.length % colors.length;
  return colors[index];
};

export default function ClientPaymentsCard({ transactions }) {
  const displayData = transactions?.slice(5, 13).map(p => ({
    date: p.entry_date,
    client: p.client_name,
    total: parseFloat(p.tot_bill).toLocaleString(),
    payment: parseFloat(p.paid).toLocaleString(),
  })) || [];

  return (
    <div className="!bg-white !rounded-3xl !shadow-xl !border !border-gray-100 !overflow-hidden !h-full !flex !flex-col !transition-all hover:!shadow-2xl">
      {/* Header */}
      <div className="!px-6 !py-8">
        <div className="!flex !justify-between !items-center !gap-4">
          <div>
            <h2 className="!text-xl md:!text-2xl !font-black !text-gray-900 !tracking-tight">Payment <span className="!text-indigo-600">Breakdown</span></h2>
            <p className="!text-xs !text-gray-400 !mt-1 !font-bold !uppercase !tracking-widest">Billing overview</p>
          </div>
          <button className="!flex !items-center !gap-2 !px-4 !py-2 !bg-indigo-50 !text-indigo-600 !rounded-xl !text-xs !font-black hover:!bg-indigo-600 hover:!text-white !transition-all !group">
            View All <ArrowRight size={14} className="group-hover:!translate-x-1 !transition-transform" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="!flex-1 !overflow-x-auto !custom-scrollbar !px-2 md:!px-0 !pb-4">
        <table className="!w-full !text-left !border-collapse !border !border-gray-200 !min-w-[600px] md:!min-w-full">
          <thead>
            <tr className="!border-y !border-gray-200 !bg-gray-50">
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !border !border-gray-200">Client Name</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !text-right !border !border-gray-200">Total Bill</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !text-right !border !border-gray-200">Received</th>
              <th className="!py-4 !px-6 !text-[10px] !font-black !text-gray-500 !uppercase !tracking-widest !text-center !border !border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="!divide-y !divide-gray-200">
            {displayData.map((row, idx) => {
              const avatarColor = getAvatarColor(row.client);
              const isFullyPaid = row.total === row.payment;
              return (
                <tr key={idx} className="!group hover:!bg-gray-50 !transition-colors">
                  <td className="!py-5 !px-6 !border !border-gray-200">
                    <div className="!flex !items-center !gap-4">
                      <div className={`!w-10 !h-10 !rounded-xl ${avatarColor} !text-white !flex !justify-center !items-center !font-black !text-xs !shadow-md !shadow-indigo-50 group-hover:!scale-110 !transition-transform !duration-300 !flex-shrink-0`}>
                        {row.client?.charAt(0).toUpperCase()}
                      </div>
                      <div className="!min-w-0">
                        <p className="!font-black !text-gray-800 !text-sm !truncate !max-w-[120px] md:!max-w-[180px]">{row.client}</p>
                        <p className="!text-[10px] !text-gray-400 !font-bold !mt-0.5">{row.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-gray-200">
                    <span className="!font-bold !text-gray-500 !text-sm md:!text-base">৳{row.total}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-right !border !border-gray-200">
                    <span className="!font-black !text-indigo-600 !text-sm md:!text-base">৳{row.payment}</span>
                  </td>
                  <td className="!py-5 !px-6 !text-center !border !border-gray-200">
                    <div className={`!inline-flex !items-center !gap-1.5 !px-3 !py-1 !rounded-lg !text-[10px] !font-black !uppercase ${isFullyPaid ? '!bg-emerald-50 !text-emerald-600' : '!bg-amber-50 !text-amber-600'} !border !border-transparent ${isFullyPaid ? 'group-hover:!border-emerald-200' : 'group-hover:!border-amber-200'} !transition-all`}>
                      <div className={`!w-1.5 !h-1.5 !rounded-full ${isFullyPaid ? '!bg-emerald-500 !animate-pulse' : '!bg-amber-500'}`}></div>
                      {isFullyPaid ? 'Full' : 'Partial'}
                    </div>
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
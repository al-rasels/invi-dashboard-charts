import React from "react";
import { AlertTriangle, ArrowRight, Mail, Phone, User } from "lucide-react";

const getAvatarGradient = (name = "") => {
  const gradients = [
    "from-rose-500 to-red-600",
    "from-amber-500 to-orange-600",
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
  ];
  return gradients[name.length % gradients.length];
};

export default function MostDueClientsCard({ clients }) {
  const displayClients = clients?.slice(0, 10) || [];
  const totalDue = displayClients.reduce((sum, c) => sum + (parseFloat(c.due) || 0), 0);

  return (
    <div className="!bg-white !rounded-3xl !shadow-xl !p-6 md:!p-8 !h-full !border !border-gray-100 !flex !flex-col">
      {/* Header */}
      <div className="!flex !justify-between !items-start !mb-8">
        <div>
          <h2 className="!text-xl md:!text-2xl !font-black !text-gray-800 !tracking-tight">
            Most Due <span className="!text-rose-600">Clients</span>
          </h2>
          <p className="!text-xs !font-bold !text-gray-400 !uppercase !tracking-widest !mt-1">
            Top Outstanding Balances
          </p>
        </div>
        <button className="!p-3 !bg-rose-50 !rounded-2xl !text-rose-600 hover:!bg-rose-600 hover:!text-white !transition-all !shadow-sm">
          <ArrowRight size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Total Due Badge */}
      <div className="!bg-gradient-to-r !from-rose-50/50 !to-orange-50/50 !rounded-3xl !p-5 !mb-8 !border !border-rose-100/50 !backdrop-blur-sm">
        <div className="!flex !items-center !justify-between">
          <div className="!flex !items-center !gap-4">
            <div className="!p-3 !bg-rose-100 !rounded-2xl">
              <AlertTriangle size={22} className="!text-rose-600" strokeWidth={3} />
            </div>
            <div>
              <p className="!text-[11px] !font-black !text-rose-400 !uppercase !tracking-widest !mb-0.5">Total Outstanding</p>
              <p className="!text-2xl !font-black !text-rose-700 !tracking-tighter">৳{totalDue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
          <span className="!px-4 !py-2 !bg-rose-100 !text-rose-700 !rounded-xl !text-xs !font-black !uppercase !shadow-inner">
            {displayClients.length} Clients
          </span>
        </div>
      </div>

      {/* Client List */}
      <div className="!space-y-4 !overflow-y-auto !pr-3 !custom-scrollbar !flex-1 !max-h-[600px]">
        {displayClients.map((client, i) => {
          const gradient = getAvatarGradient(client.name);
          return (
            <div
              key={i}
              className="!flex !justify-between !items-center !p-4 !rounded-2xl !border !border-gray-50 !transition-all hover:!shadow-lg hover:!shadow-rose-50 hover:!border-rose-100 group !bg-white"
            >
              <div className="!flex !items-center !gap-4 !min-w-0">
                <div className={`!w-12 !h-12 !rounded-xl !bg-gradient-to-br ${gradient} !text-white !flex !justify-center !items-center group-hover:!scale-110 !transition-transform !duration-300 !shadow-lg !shadow-indigo-100 !flex-shrink-0`}>
                  <User size={20} strokeWidth={2.5} />
                </div>
                <span className="!min-w-0 !flex !flex-col !justify-center">
                  <span className="!font-black !text-gray-800 !text-sm md:!text-base !truncate !max-w-[120px] md:!max-w-[180px] !leading-tight">
                    {client.name}
                  </span>
                  <span className="!flex !items-center !gap-1.5 !mt-0.5">
                    <Phone size={10} className="!text-gray-300" />
                    <span className="!text-gray-400 !text-[10px] md:!text-xs !font-bold !tracking-wider !leading-none">
                      {client.mobile}
                    </span>
                  </span>
                </span>
              </div>

              <div className="!flex !items-center !gap-2 md:!gap-5">
                <div className="!text-right !mr-1 md:!mr-0">
                  <p className="!font-black !text-sm md:!text-lg !text-rose-600 !leading-none !mb-1">
                    ৳{parseFloat(client.due).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <span className="!text-[9px] !px-2 !py-0.5 !rounded-lg !font-black !uppercase !bg-rose-50 !text-rose-500 !border !border-rose-100">
                    Due
                  </span>
                </div>
                <button
                  title="Send SMS"
                  className="!relative !flex !items-center !justify-center !w-10 !h-10 md:!w-12 md:!h-12 !bg-gradient-to-br !from-indigo-500 !to-violet-600 !text-white !rounded-2xl !font-black hover:!from-indigo-600 hover:!to-violet-700 !transition-all !shadow-lg !shadow-indigo-500/30 hover:!shadow-indigo-500/50 hover:!-translate-y-1 active:!translate-y-0 !group/sms"
                >
                  {/* Pinging indicator to force attention */}

                  <Mail size={18} strokeWidth={2.5} className="group-hover/sms:!scale-110 !transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

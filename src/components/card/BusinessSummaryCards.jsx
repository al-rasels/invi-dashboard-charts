import React from "react";
import {
  Users,
  Truck,
  Package,
  TrendingUp,
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Receipt,
  CircleDollarSign,
  Boxes,
} from "lucide-react";

function SummaryCard({ title, subtitle, icon, items, gradient, glassBorder, accentColor }) {
  return (
    <div className={`glass-modern ${glassBorder} !rounded-[2.5rem] !p-0 !overflow-hidden !transition-all !duration-500 !group !relative !border !border-white/10 !shadow-2xl !shadow-black/25`}>
      {/* Subtle Grid Pattern Overlay */}
      <div className="!absolute !inset-0 !opacity-[0.03] !pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}></div>

      {/* Decorative Glow Orb */}
      <div className={`!absolute !-top-12 !-right-12 !w-48 !h-48 ${accentColor} !rounded-full !blur-[60px] !opacity-10 group-hover:!opacity-25 !transition-opacity !duration-700 !pointer-events-none`}></div>

      <div className="!relative !z-10 !p-6 md:!p-8 !bg-white/5 !backdrop-blur-[15px] !border-t !border-white/10">
        {/* Header */}
        <div className="!flex !items-center !gap-4 !mb-8 !pb-6 !border-b !border-white/10">
          <div className={`!p-3.5 !rounded-2xl !bg-gradient-to-br ${gradient} !text-white !shadow-2xl !shadow-black/20 group-hover:!scale-110 group-hover:!rotate-3 !transition-all !duration-500`}>
            {React.cloneElement(icon, { size: 24, strokeWidth: 2.5 })}
          </div>
          <div>
            <h3 className="!font-black !text-white !text-lg md:!text-xl !tracking-tight !leading-none">{title}</h3>
            <p className="!text-[10px] !font-bold !text-white/50 !uppercase !tracking-[0.2em] !mt-1.5">{subtitle}</p>
          </div>
        </div>

        {/* Items */}
        <div className="!space-y-3.5 !divide-y !divide-white/10">
          {items.map((item, idx) => (
            <div key={idx} className="!group/item !relative">
              <div 
                className="!absolute !inset-0 !bg-white/5 !rounded-2xl !opacity-0 group-hover/item:!opacity-100 !transition-opacity !duration-300"
              />
              <div className="!relative !flex !justify-between !items-center !p-3 !px-4 !rounded-2xl !border !border-white/10 hover:!border-white/20 !bg-white/5 !backdrop-blur-sm hover:!bg-white/10 !transition-all !duration-300">
                <div className="!flex !items-center !gap-3">
                  <div className={`!w-9 !h-9 !rounded-xl !bg-white/10 !flex !items-center !justify-center !text-white/60 group-hover/item:!text-white group-hover/item:!bg-white/15 !transition-all`}>
                    {item.icon}
                  </div>
                  <span className="!text-xs !font-bold !text-white/70 group-hover/item:!text-white !transition-colors">{item.label}</span>
                </div>
                <div className="!text-right">
                  <span className="!text-lg md:!text-xl !font-black !text-white !tracking-tighter !tabular-nums">
                    <span className="!text-xs !font-medium !text-white/40 !mr-1">৳</span>
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BusinessSummaryCards({ data }) {
  const clientStats = data?.client_stats || {};
  const supplierStats = data?.supplier_stats || {};
  const productStats = data?.product_stats || {};

  const formatValue = (val) => {
    const num = parseFloat(val) || 0;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  const cards = [
    {
      title: "Client Summary",
      subtitle: "Receivables Overview",
      icon: <Users />,
      gradient: "from-blue-500 via-indigo-500 to-indigo-600",
      glassBorder: "glass-border-indigo",
      accentColor: "bg-indigo-500",
      items: [
        {
          label: "Total Clients",
          value: formatValue(clientStats.totalSell),
          icon: <Receipt size={16} strokeWidth={2.5} />,
        },
        {
          label: "SMS Wallet",
          value: formatValue(clientStats.totalPayment),
          icon: <Wallet size={16} strokeWidth={2.5} />,
        },
        {
          label: "Due Amount",
          value: formatValue(clientStats.remain),
          icon: <ArrowDownRight size={16} strokeWidth={2.5} />,
        },
      ],
    },
    {
      title: "Supplier Summary",
      subtitle: "Payables Overview",
      icon: <Truck />,
      gradient: "from-fuchsia-500 via-pink-500 to-rose-600",
      glassBorder: "glass-border-pink",
      accentColor: "bg-pink-500",
      items: [
        {
          label: "Total Suppliers",
          value: formatValue(supplierStats.totalPurchase),
          icon: <Boxes size={16} strokeWidth={2.5} />,
        },
        {
          label: "Supplier Wallet",
          value: formatValue(supplierStats.totalPayment),
          icon: <CircleDollarSign size={16} strokeWidth={2.5} />,
        },
        {
          label: "Due Amount",
          value: formatValue(supplierStats.remain),
          icon: <ArrowUpRight size={16} strokeWidth={2.5} />,
        },
      ],
    },
    {
      title: "Net Valuation",
      subtitle: "Business Health",
      icon: <ShieldCheck />,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      glassBorder: "glass-border-emerald",
      accentColor: "bg-emerald-500",
      items: [
        {
          label: "Total Asset",
          value: formatValue(data?.total_asset),
          icon: <TrendingUp size={16} strokeWidth={2.5} />,
        },
        {
          label: "Total Liabilities",
          value: formatValue(data?.total_liabilities),
          icon: <ArrowDownRight size={16} strokeWidth={2.5} />,
        },
        {
          label: "Net Worth",
          value: formatValue(data?.net_valuation),
          icon: <BarChart3 size={16} strokeWidth={2.5} />,
        },
      ],
    },
    {
      title: "Product Summary",
      subtitle: "Stock Overview",
      icon: <Package />,
      gradient: "from-amber-400 via-orange-500 to-orange-600",
      glassBorder: "glass-border-amber",
      accentColor: "bg-amber-500",
      items: [
        {
          label: "Total Products",
          value: formatValue(productStats.total_stock),
          icon: <Boxes size={16} strokeWidth={2.5} />,
        },
        {
          label: "Due Amount",
          value: formatValue(productStats.stock_out),
          icon: <ArrowDownRight size={16} strokeWidth={2.5} />,
        },
        {
          label: "Inventory Value",
          value: formatValue(productStats.stock_in),
          icon: <ArrowUpRight size={16} strokeWidth={2.5} />,
        },
      ],
    },
  ];

  return (
    <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-4 !gap-4 md:!gap-6">
      {cards.map((card, i) => (
        <SummaryCard key={i} {...card} />
      ))}
    </div>
  );
}

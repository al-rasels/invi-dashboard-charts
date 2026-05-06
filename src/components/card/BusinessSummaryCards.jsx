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

function SummaryCard({ title, subtitle, icon, items, gradient, borderColor, accentColor }) {
  return (
    <div className={`!bg-white !rounded-3xl !shadow-sm hover:!shadow-xl !transition-all !duration-300 !p-6 !border !border-gray-100 !group !relative !overflow-hidden`}>
      {/* Background Decoration */}
      <div className={`!absolute !top-0 !right-0 !w-28 !h-28 ${accentColor} !rounded-full !-mr-14 !-mt-14 !blur-3xl !opacity-30 group-hover:!opacity-50 !transition-opacity`}></div>

      {/* Header */}
      <div className="!flex !items-center !gap-3 !mb-5 !relative !z-10">
        <div className={`!p-3 !rounded-2xl !bg-gradient-to-br ${gradient} !text-white !shadow-lg group-hover:!scale-110 !transition-transform !duration-300`}>
          {icon}
        </div>
        <span>
          <h3 className="!font-black inline-block !text-gray-800 !text-base md:!text-lg !tracking-tight">{title}</h3>
          <p className="!text-[10px] !font-bold !text-gray-400 !uppercase !tracking-widest">{subtitle}</p>
        </span>
      </div>

      {/* Items */}
      <div className="!space-y-3 !relative !z-10">
        {items.map((item, idx) => (
          <div key={idx} className={`!flex !justify-between !items-center !p-3.5 !rounded-xl ${item.bgColor || "!bg-gray-50"} !border ${item.borderColor || "!border-gray-100"} !transition-all hover:!scale-[1.02]`}>
            <div className="!flex !items-center !gap-2.5">
              <div className={`!w-8 !h-8 !rounded-lg ${item.iconBg || "!bg-gray-200"} !flex !items-center !justify-center`}>
                {item.icon}
              </div>
              <span className="!text-sm !font-bold !text-gray-600">{item.label}</span>
            </div>
            <span className={`!text-base md:!text-lg !font-black ${item.valueColor || "!text-gray-800"} !tracking-tight`}>
              ৳{item.value}
            </span>
          </div>
        ))}
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
      icon: <Users size={22} strokeWidth={2.5} />,
      gradient: "from-blue-600 to-indigo-700",
      borderColor: "border-blue-100",
      accentColor: "bg-blue-200",
      items: [
        {
          label: "Total Sell",
          value: formatValue(clientStats.totalSell),
          icon: <Receipt size={14} className="text-blue-600" strokeWidth={2.5} />,
          iconBg: "bg-blue-100",
          bgColor: "bg-blue-50/50",
          borderColor: "border-blue-100",
          valueColor: "text-blue-700",
        },
        {
          label: "Total Received",
          value: formatValue(clientStats.totalPayment),
          icon: <Wallet size={14} className="text-emerald-600" strokeWidth={2.5} />,
          iconBg: "bg-emerald-100",
          bgColor: "bg-emerald-50/50",
          borderColor: "border-emerald-100",
          valueColor: "text-emerald-700",
        },
        {
          label: "Outstanding Due",
          value: formatValue(clientStats.remain),
          icon: <ArrowDownRight size={14} className="text-rose-600" strokeWidth={2.5} />,
          iconBg: "bg-rose-100",
          bgColor: "bg-rose-50/50",
          borderColor: "border-rose-100",
          valueColor: "text-rose-700",
        },
      ],
    },
    {
      title: "Supplier Summary",
      subtitle: "Payables Overview",
      icon: <Truck size={22} strokeWidth={2.5} />,
      gradient: "from-violet-600 to-purple-700",
      borderColor: "border-violet-100",
      accentColor: "bg-violet-200",
      items: [
        {
          label: "Total Purchase",
          value: formatValue(supplierStats.totalPurchase),
          icon: <Boxes size={14} className="text-violet-600" strokeWidth={2.5} />,
          iconBg: "bg-violet-100",
          bgColor: "bg-violet-50/50",
          borderColor: "border-violet-100",
          valueColor: "text-violet-700",
        },
        {
          label: "Total Paid",
          value: formatValue(supplierStats.totalPayment),
          icon: <CircleDollarSign size={14} className="text-emerald-600" strokeWidth={2.5} />,
          iconBg: "bg-emerald-100",
          bgColor: "bg-emerald-50/50",
          borderColor: "border-emerald-100",
          valueColor: "text-emerald-700",
        },
        {
          label: "Supplier Due",
          value: formatValue(supplierStats.remain),
          icon: <ArrowUpRight size={14} className="text-amber-600" strokeWidth={2.5} />,
          iconBg: "bg-amber-100",
          bgColor: "bg-amber-50/50",
          borderColor: "border-amber-100",
          valueColor: "text-amber-700",
        },
      ],
    },
    {
      title: "Net Valuation",
      subtitle: "Business Health",
      icon: <ShieldCheck size={22} strokeWidth={2.5} />,
      gradient: "from-emerald-600 to-teal-700",
      borderColor: "border-emerald-100",
      accentColor: "bg-emerald-200",
      items: [
        {
          label: "Total Asset",
          value: formatValue(data?.total_asset),
          icon: <TrendingUp size={14} className="text-emerald-600" strokeWidth={2.5} />,
          iconBg: "bg-emerald-100",
          bgColor: "bg-emerald-50/50",
          borderColor: "border-emerald-100",
          valueColor: "text-emerald-700",
        },
        {
          label: "Total Liabilities",
          value: formatValue(data?.total_liabilities),
          icon: <ArrowDownRight size={14} className="text-rose-600" strokeWidth={2.5} />,
          iconBg: "bg-rose-100",
          bgColor: "bg-rose-50/50",
          borderColor: "border-rose-100",
          valueColor: "text-rose-700",
        },
        {
          label: "Net Worth",
          value: formatValue(data?.net_valuation),
          icon: <BarChart3 size={14} className="text-indigo-600" strokeWidth={2.5} />,
          iconBg: "bg-indigo-100",
          bgColor: "bg-indigo-50/50",
          borderColor: "border-indigo-100",
          valueColor: "text-indigo-700",
        },
      ],
    },
    {
      title: "Inventory Stats",
      subtitle: "Stock Overview",
      icon: <Package size={22} strokeWidth={2.5} />,
      gradient: "from-amber-500 to-orange-600",
      borderColor: "border-amber-100",
      accentColor: "bg-amber-200",
      items: [
        {
          label: "Stock In (Value)",
          value: formatValue(productStats.stock_in),
          icon: <ArrowUpRight size={14} className="text-emerald-600" strokeWidth={2.5} />,
          iconBg: "bg-emerald-100",
          bgColor: "bg-emerald-50/50",
          borderColor: "border-emerald-100",
          valueColor: "text-emerald-700",
        },
        {
          label: "Stock Out (Value)",
          value: formatValue(productStats.stock_out),
          icon: <ArrowDownRight size={14} className="text-rose-600" strokeWidth={2.5} />,
          iconBg: "bg-rose-100",
          bgColor: "bg-rose-50/50",
          borderColor: "border-rose-100",
          valueColor: "text-rose-700",
        },
        {
          label: "Current Stock",
          value: formatValue(productStats.total_stock),
          icon: <Boxes size={14} className="text-amber-600" strokeWidth={2.5} />,
          iconBg: "bg-amber-100",
          bgColor: "bg-amber-50/50",
          borderColor: "border-amber-100",
          valueColor: "text-amber-700",
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

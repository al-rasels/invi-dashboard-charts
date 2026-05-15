import React, { useMemo } from "react";
import Chart from "react-apexcharts";

/**
 * MostSoldProductsCard
 * Displays a donut chart of the best-selling products with a premium 3D look.
 * Data is expected to come from dashboard.json via the parent component.
 */
const MostSoldProductsCard = React.memo(({ products = [] }) => {
  // Ensure products is an array and filter out invalid items
  const validProducts = useMemo(() => {
    const items = Array.isArray(products) ? products : [];
    return items
      .filter(p => p && (Number(p.quantity) > 0 || Number(p.value) > 0))
      .map(p => ({
        ...p,
        label: p.label || "Miscellaneous",
        value: Number(p.value) || 0,
        quantity: Number(p.quantity) || 0
      }));
  }, [products]);

  const hasData = validProducts.length > 0;
  const topProducts = useMemo(() => validProducts.slice(0, 5), [validProducts]);

  // Use quantity for series to represent 'Most Sold' volume
  const series = useMemo(() => topProducts.map((p) => p.quantity), [topProducts]);
  const labels = useMemo(() => topProducts.map((p) => p.label), [topProducts]);

  const options = useMemo(() => ({
    chart: {
      type: "donut",
      fontFamily: 'inherit',
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        blur: 8,
        left: 3,
        top: 3,
        opacity: 0.15,
        color: '#000'
      }
    },
    stroke: {
      show: true,
      width: 0.5,
      colors: ['#fff']
    },
    labels: labels,
    colors: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ["#818CF8", "#34D399", "#FBBF24", "#F87171", "#A78BFA"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    legend: {
      show: false // Removed list of products as requested
    },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          size: "60%",
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val, { seriesIndex }) => {
          const p = topProducts[seriesIndex];
          return `<b>${val} units</b> (${p.value}%)`;
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 280
        }
      }
    }]
  }), [labels, hasData, topProducts]);

  return (
    <div className="glass-modern !rounded-[2.5rem] !p-6 md:!p-8 !flex !flex-col !h-full !transition-all">
      {/* Header */}
      <div className="!flex !items-center !justify-between !mb-6">
        <div>
          <h2 className="!text-xl md:!text-2xl !font-black !text-white !tracking-tight">
            Best <span className="text-vibrant-indigo">Sellers</span>
          </h2>
          <p className="!text-[10px] !font-bold !text-slate-300 !uppercase !tracking-[0.2em] !mt-1">Inventory Performance</p>
        </div>
        <div className="!w-12 !h-12 !bg-white/10 !rounded-2xl !flex !items-center !justify-center !shadow-lg !backdrop-blur-sm">
          <i className="fas fa-trophy text-vibrant-indigo !text-lg"></i>
        </div>
      </div>

      {/* Chart Area */}
      <div className="!flex-1 !flex !items-center !justify-center !min-h-[320px]">
        {hasData ? (
          <div className="!w-full !flex !justify-center">
            <Chart options={options} series={series} type="donut" width="340" />
          </div>
        ) : (
          <div className="!text-center !space-y-4">
            <div className="!w-20 !h-20 !bg-slate-100/90 !rounded-full !flex !items-center !justify-center !mx-auto !shadow-inner">
              <i className="fas fa-chart-pie !text-gray-200 !text-2xl"></i>
              </div>
            <p className="!text-sm !text-slate-500 !font-bold !uppercase !tracking-widest">No Sales Data</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default MostSoldProductsCard;
// pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import WelcomeCard from "../components/card/WelcomeCard";
import Statistics from "../components/card/StatisticsCard";
import EarningsReportCard from "../components/card/EarningsReportCard";
import ProfitCard from "../components/card/ProfitCard";
import ExpenseCard from "../components/card/ExpenseCard";
import MostSoldProductsCard from "../components/card/MostSoldProductsCard";
import TransactionsCard from "../components/card/TransactionsCard";
import MonthlySalesCard from "../components/card/MonthlySalesCard";
import RecentSellCard from "../components/card/RecentSellCard";
import RecentPaymentsCard from "../components/card/RecentPaymentsCard";
import MostDueClientsCard from "../components/card/MostDueClientsCard";
import MonthlyExpenseGraphCard from "../components/card/MonthlyExpenseGraphCard";
import BusinessSummaryCards from "../components/card/BusinessSummaryCards";

const BASE = mainUrl;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [valuation, setValuation] = useState(null);
  const [dueClients, setDueClients] = useState(null);

  useEffect(() => {
    // 1. Fetch Stats (Fast)
    fetch(`${BASE}index.php/welcome/get_dashboard_stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));

    // 2. Fetch Charts (Medium)
    fetch(`${BASE}index.php/welcome/get_dashboard_charts`)
      .then((res) => res.json())
      .then((data) => setCharts(data))
      .catch((err) => console.error("Error fetching charts:", err));

    // 3. Fetch Valuation (Slow)
    fetch(`${BASE}index.php/welcome/get_dashboard_valuation`)
      .then((res) => res.json())
      .then((data) => setValuation(data))
      .catch((err) => console.error("Error fetching valuation:", err));

    // 4. Fetch Due Clients (Slowest)
    fetch(`${BASE}index.php/welcome/get_dashboard_due_clients`)
      .then((res) => res.json())
      .then((data) => setDueClients(data))
      .catch((err) => console.error("Error fetching due clients:", err));
  }, []);

  // Map JSON to component-friendly data structures
  const mappedStats = {
    total_sell: stats?.total_sell,
    total_dues: stats?.total_dues,
    supplier_due: valuation?.supplier_due || stats?.supplier_due,
    stock_value: valuation?.stock_value || stats?.stock_value,
    total_invoices: stats?.total_invoices,
    total_products: stats?.total_products,
    total_clients: stats?.total_clients,
    total_suppliers: stats?.total_suppliers,
    todays_income: stats?.todays_income,
    todays_expense: stats?.todays_expense,
    opening_balance: stats?.opening_balance,
    current_month_expense: stats?.current_month_expense,
    total_balance: stats?.total_balance,
    total_asset: valuation?.total_asset,
    total_liabilities: valuation?.total_liabilities,
    net_valuation: valuation?.net_valuation,
  };

  return (
    <div className="!flex !h-auto !bg-gray-50/50">
      {/* Main Content */}
      <div className="!flex-1 !flex !flex-col !w-full !min-w-0">
        {/* Content Area */}
        <main className=" md:!p-6 !p-4 !flex-1 !space-y-6">
          {/* Top Section: Welcome and Statistics */}
          <div className="!grid !grid-cols-1 xl:!grid-cols-12 !gap-4">
            <div className="xl:!col-span-5">
              {!stats ? (
                <div className="shimmer-effect h-[200px] rounded-3xl"></div>
              ) : (
                <WelcomeCard stats={mappedStats} mainUrl={BASE} companyInfo={stats?.company_info} />
              )}
            </div>
            <div className="xl:!col-span-7">
              {!stats ? (
                <div className="shimmer-effect h-[200px] rounded-3xl"></div>
              ) : (
                <Statistics stats={mappedStats} />
              )}
            </div>
          </div>

          {/* 1. Business Summary Cards - Client, Supplier, Valuation, Inventory */}
          <div className="!space-y-4">
            <div className="!flex !items-center !gap-2 !px-2">
              <div className="!w-1 !h-6 !bg-indigo-600 !rounded-full"></div>
              <h2 className="!text-xl !font-black !text-gray-800 !uppercase !tracking-tight">Business <span className="!text-indigo-600">Summaries</span></h2>
            </div>
            {!valuation ? (
              <div className="shimmer-effect h-[140px] rounded-3xl"></div>
            ) : (
              <BusinessSummaryCards data={valuation} />
            )}
          </div>

          {/* 2. Earnings Report - Sells vs Collection */}
          <div>
            {!charts || !stats ? (
              <div className="shimmer-effect h-[400px] rounded-3xl"></div>
            ) : (
              <EarningsReportCard chartData={charts?.monthly_sales} stats={mappedStats} />
            )}
          </div>

          {/* 3. Financial Status Row */}
          <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 !gap-6">
            {!stats ? <div className="shimmer-effect h-[250px] rounded-3xl"></div> : <ProfitCard stats={mappedStats} />}
            {!stats ? <div className="shimmer-effect h-[250px] rounded-3xl"></div> : <ExpenseCard stats={mappedStats} mainUrl={BASE} monthlyExpenses={stats?.current_month_expenses} />}
            {!charts ? <div className="shimmer-effect h-[250px] rounded-3xl"></div> : <MostSoldProductsCard products={charts?.best_products} />}
          </div>

          {/* 4. Large Data Visualizations */}
          <div className="!grid !grid-cols-1 xl:!grid-cols-2 !gap-6">
            {!charts ? (
              <div className="shimmer-effect h-[350px] rounded-3xl"></div>
            ) : (
                <MonthlyExpenseGraphCard
                  expenses={charts?.monthly_expenses}
                  currentMonthExpense={stats?.current_month_expense}
                />
            )}
            {!charts ? (
              <div className="shimmer-effect h-[350px] rounded-3xl"></div>
            ) : (
              <MonthlySalesCard salesData={charts?.daily_sales} />
            )}
          </div>

          {/* 5. Lists and Breakdowns */}
          <div className="!grid !grid-cols-1 xl:!grid-cols-2 !gap-6">
            {!dueClients ? (
              <div className="shimmer-effect h-[500px] rounded-3xl flex items-center justify-center font-bold text-gray-500">Loading Most Due Clients...</div>
            ) : (
              <MostDueClientsCard clients={Array.isArray(dueClients) ? dueClients : dueClients?.most_due_clients} />
            )}
            {!stats ? (
              <div className="shimmer-effect h-[500px] rounded-3xl"></div>
            ) : (
              <RecentPaymentsCard payments={stats?.recent_collections} />
            )}
          </div>

          <div className="!mt-6">
            {!stats ? (
              <div className="shimmer-effect h-[400px] rounded-3xl"></div>
            ) : (
              <RecentSellCard sells={stats?.recent_sell_summary} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


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

const BASE = "mainUrl";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // await fetch(`${BASE}index.php/welcome/get_dashboard_data`)
      await fetch("./data/dashboard.json")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching dashboard data:", err);
          setLoading(false);
        });
    })()

  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Map flat JSON to component-friendly data structures
  const stats = {
    total_sell: data?.total_sell,
    total_dues: data?.total_dues,
    supplier_due: data?.supplier_due,
    stock_value: data?.stock_value,
    total_invoices: data?.total_invoices,
    total_products: data?.total_products,
    total_clients: data?.total_clients,
    total_suppliers: data?.total_suppliers,
    todays_income: data?.todays_income,
    todays_expense: data?.todays_expense,
    opening_balance: data?.opening_balance,
    current_month_expense: data?.current_month_expense,
    total_balance: data?.total_balance,
    total_asset: data?.total_asset,
    total_liabilities: data?.total_liabilities,
    net_valuation: data?.net_valuation,
  };


  return (
    <div className="!flex !h-full !bg-gray-50/50">
      {/* Main Content */}
      <div className="!flex-1 !flex !flex-col !w-full !min-w-0">
        {/* Content Area */}
        <main className=" md:!p-6 !flex-1 !space-y-6">
          {/* Top Section: Welcome and Statistics */}
          <div className="!grid !grid-cols-1 xl:!grid-cols-12 !gap-2 md:!gap-4 ">
            <div className="xl:!col-span-5">
              <WelcomeCard stats={stats} mainUrl={BASE} companyInfo={data?.company_info} />
            </div>
            <div className="xl:!col-span-7">
              <Statistics stats={stats} />
            </div>
          </div>

          {/* 1. Business Summary Cards - Client, Supplier, Valuation, Inventory */}
          <div className="!space-y-2">
            <div className="!flex !items-center !gap-2 !px-2">
              <div className="!w-1 !h-6 !bg-indigo-600 !rounded-full"></div>
              <h2 className="!text-xl !font-black !text-gray-800 !uppercase !tracking-tight">Business <span className="!text-indigo-600">Summaries</span></h2>
            </div>
            <BusinessSummaryCards data={data} />
          </div>

          {/* 2. Earnings Report - Sells vs Collection */}
          <div>
            <EarningsReportCard chartData={data?.monthly_sales} stats={stats} />
          </div>

          {/* 3. Financial Status Row */}
          <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 !gap-6">
            <ProfitCard stats={stats} />
            <ExpenseCard stats={stats} mainUrl={BASE} monthlyExpenses={data?.current_month_expenses} />
            <MostSoldProductsCard products={data?.best_products} />
          </div>

          {/* 4. Large Data Visualizations */}
          <div className="!grid !grid-cols-1 xl:!grid-cols-2 !gap-6">
            <MonthlyExpenseGraphCard
              expenses={data?.monthly_expenses}
              currentMonthExpense={data?.current_month_expense}
            />
            <MonthlySalesCard salesData={data?.daily_sales} />
          </div>

          {/* 5. Lists and Breakdowns */}
          <div className="!grid !grid-cols-1 xl:!grid-cols-2 !gap-6">
            <MostDueClientsCard clients={data?.most_due_clients} />
            <RecentPaymentsCard payments={data?.recent_collections} />
          </div>

          <div className="!mt-6">
            <RecentSellCard sells={data?.recent_sell_summary} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


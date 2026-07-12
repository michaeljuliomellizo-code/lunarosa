"use client";

import ReportsFilters from "./components/ReportsFilters";
import ReportsSummary from "./components/ReportsSummary";
import SalesByDayChart from "./components/SalesByDayChart";
import SalesByCategoryChart from "./components/SalesByCategoryChart";
import SalesByProductTable from "./components/SalesByProductTable";
import SalesByCustomerTable from "./components/SalesByCustomerTable";
import ExportButtons from "./components/ExportButtons";

export default function ReportsDashboard() {
  return (
    <div className="space-y-8">

      <ReportsFilters />

      <ReportsSummary />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <SalesByDayChart />

        <SalesByCategoryChart />

      </div>

      <SalesByProductTable />

      <SalesByCustomerTable />

      <ExportButtons />

    </div>
  );
}
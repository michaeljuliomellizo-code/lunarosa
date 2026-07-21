import { createClient } from "@/lib/supabase/server";

import DashboardStats from "@/app/admin/DashboardStats";
import SalesChart from "@/app/admin/SalesChart";
import RevenueChart from "@/app/admin/RevenueChart";
import TopCustomers from "@/app/admin/TopCustomers";

export default async function ReportsPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*");

  const { data: customers } = await supabase
    .from("profiles")
    .select("*");

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Reportes
        </h1>

        <p className="text-gray-600 mt-2">
          Analítica y métricas del negocio
        </p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-2 gap-8">

        <SalesChart />

        <RevenueChart
          orders={orders || []}
        />

      </div>

      <TopCustomers
        orders={orders || []}
        customers={customers || []}
      />

    </div>
  );
}
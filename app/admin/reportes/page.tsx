import { createClient } from "@/lib/supabase/server";

import DashboardStats from "@/app/admin/DashboardStats";
import RevenueCards from "@/app/admin/RevenueCards";
import SalesStats from "@/app/admin/SalesStats";
import SalesChart from "@/app/admin/SalesChart";
import RevenueChart from "@/app/admin/RevenueChart";
import TopCustomers from "@/app/admin/TopCustomers";

export default async function ReportsPage() {
  const supabase =
    await createClient();

  const {
    data: orders,
  } = await supabase
    .from("orders")
    .select("*");

  const {
    data: customers,
  } = await supabase
    .from("customers")
    .select("*");

  const topCustomers =
    customers
      ?.sort(
        (
          a: any,
          b: any
        ) =>
          Number(
            b.total_spent || 0
          ) -
          Number(
            a.total_spent || 0
          )
      )
      .slice(0, 10) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Reportes
        </h1>

        <p className="text-gray-500 mt-2">
          Analítica y métricas
          del negocio
        </p>
      </div>

      <DashboardStats />

      <RevenueCards
        orders={
          orders || []
        }
      />

      <SalesStats />

      <div className="grid lg:grid-cols-2 gap-8">
        <SalesChart />

        <RevenueChart
          orders={
            orders || []
          }
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <TopCustomers
          customers={
            topCustomers
          }
        />
      </div>
    </div>
  );
}
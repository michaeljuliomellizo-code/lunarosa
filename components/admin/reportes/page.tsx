import { createClient } from "@/lib/supabase/server";

import SalesChart from "@/components/admin/SalesChart";
import TopCustomers from "@/components/admin/TopCustomers";

export default async function ReportsPage() {
  const supabase =
    await createClient();

  const { data: orders } =
    await supabase
      .from("orders")
      .select("*");

  const { data: customers } =
    await supabase
      .from("customers")
      .select("*")
      .order(
        "total_spent",
        {
          ascending: false,
        }
      )
      .limit(10);

  const monthlySales =
    new Map();

  orders?.forEach(
    (order: any) => {
      const month =
        new Date(
          order.created_at
        ).toLocaleString(
          "es-CO",
          {
            month:
              "short",
          }
        );

      monthlySales.set(
        month,
        (monthlySales.get(
          month
        ) || 0) +
          Number(
            order.total ||
              0
          )
      );
    }
  );

  const chartData =
    Array.from(
      monthlySales.entries()
    ).map(
      ([month, total]) => ({
        month,
        total,
      })
    );

  const totalSales =
    orders?.reduce(
      (
        sum,
        order: any
      ) =>
        sum +
        Number(
          order.total ||
            0
        ),
      0
    ) || 0;

  const totalOrders =
    orders?.length || 0;

  const averageTicket =
    totalOrders > 0
      ? Math.round(
          totalSales /
            totalOrders
        )
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Reportes
        </h1>

        <p className="text-gray-500 mt-2">
          Analítica del negocio
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Ventas
          </h3>

          <p className="text-3xl font-bold mt-3 text-green-600">
            $
            {totalSales.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Pedidos
          </h3>

          <p className="text-3xl font-bold mt-3 text-blue-600">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Ticket Promedio
          </h3>

          <p className="text-3xl font-bold mt-3 text-pink-600">
            $
            {averageTicket.toLocaleString()}
          </p>
        </div>
      </div>

      <SalesChart
        data={chartData}
      />

      <TopCustomers
        customers={
          customers || []
        }
      />
    </div>
  );
}
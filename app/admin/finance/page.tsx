"use client";

import { useEffect, useState } from "react";

import DashboardStats from "../components/DashboardStats";
import SalesChart from "../components/SalesChart";

interface DashboardData {
  salesToday: number;
  salesWeek: number;
  salesMonth: number;
  salesYear: number;
  paid: number;
  pending: number;
  totalOrders: number;
  averageTicket: number;
}

interface CashFlowItem {
  date: string;
  total: number;
}

interface PaymentMethod {
  method: string;
  total: number;
  percentage: number;
}

interface Receivable {
  id: string;
  order_number: string;
  customer: string;
  email: string;
  total: number;
  createdAt: string;
  paymentStatus: string;
  status: string;
  daysPending: number;
}

interface FinancialStatement {
  subtotal: number;
  shipping: number;
  grossSales: number;
  netSales: number;
  averageTicket: number;
  completedOrders: number;
  cancelledOrders: number;
  shippingPercentage: number;
}

export default function FinancePage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [cashFlow, setCashFlow] =
    useState<CashFlowItem[]>([]);

  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>([]);

  const [receivable, setReceivable] =
    useState<Receivable[]>([]);

  const [statement, setStatement] =
    useState<FinancialStatement | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFinance();
  }, []);

  async function loadFinance() {
    try {
      const [
        dashboardRes,
        cashFlowRes,
        paymentRes,
        receivableRes,
        statementRes,
      ] = await Promise.all([
        fetch("/api/admin/finance/dashboard"),
        fetch("/api/admin/finance/cashflow"),
        fetch("/api/admin/finance/payment-methods"),
        fetch("/api/admin/finance/accounts-receivable"),
        fetch("/api/admin/finance/financial-statement"),
      ]);

      const dashboardJson =
        await dashboardRes.json();

      const cashJson =
        await cashFlowRes.json();

      const paymentJson =
        await paymentRes.json();

      const receivableJson =
        await receivableRes.json();

      const statementJson =
        await statementRes.json();

      setDashboard(dashboardJson.data);

      setCashFlow(cashJson.data);

      setPaymentMethods(paymentJson.data);

      setReceivable(receivableJson.data);

      setStatement(statementJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Cargando centro financiero...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          Centro Financiero
        </h1>

        <p className="text-gray-600">
          Estado financiero de Luna Rosa
        </p>
      </div>

      {dashboard && (
        <DashboardStats
          totalSales={dashboard.salesMonth}
          totalOrders={dashboard.totalOrders}
          totalCustomers={0}
          totalReferrals={0}
        />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <FinanceCard
          title="Ventas Hoy"
          value={dashboard?.salesToday ?? 0}
        />

        <FinanceCard
          title="Ventas Semana"
          value={dashboard?.salesWeek ?? 0}
        />

        <FinanceCard
          title="Ventas Año"
          value={dashboard?.salesYear ?? 0}
        />

        <FinanceCard
          title="Pendiente"
          value={dashboard?.pending ?? 0}
          danger
        />

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Flujo de Caja
        </h2>

        <SalesChart
          data={cashFlow.map((item) => ({
            name: item.date,
            sales: item.total,
          }))}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Métodos de Pago
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-2">
                  Método
                </th>

                <th className="text-right py-2">
                  Total
                </th>

                <th className="text-right py-2">
                  %
                </th>

              </tr>

            </thead>

            <tbody>

              {paymentMethods.map((item) => (
                <tr
                  key={item.method}
                  className="border-b"
                >
                  <td className="py-2">
                    {item.method}
                  </td>

                  <td className="text-right">
                    $
                    {item.total.toLocaleString()}
                  </td>

                  <td className="text-right">
                    {item.percentage}%
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Estado Financiero
          </h2>

          <div className="space-y-3">

            <StatementRow
              label="Subtotal"
              value={statement?.subtotal ?? 0}
            />

            <StatementRow
              label="Envíos"
              value={statement?.shipping ?? 0}
            />

            <StatementRow
              label="Ventas Brutas"
              value={statement?.grossSales ?? 0}
            />

            <StatementRow
              label="Ventas Netas"
              value={statement?.netSales ?? 0}
            />

            <StatementRow
              label="Ticket Promedio"
              value={statement?.averageTicket ?? 0}
            />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Cuentas por Cobrar
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-2">
                Pedido
              </th>

              <th className="text-left">
                Cliente
              </th>

              <th className="text-right">
                Total
              </th>

              <th className="text-right">
                Días
              </th>

            </tr>

          </thead>

          <tbody>

            {receivable.map((item) => (
              <tr
                key={item.id}
                className="border-b"
              >
                <td className="py-2">
                  {item.order_number}
                </td>

                <td>
                  {item.customer}
                </td>

                <td className="text-right">
                  $
                  {item.total.toLocaleString()}
                </td>

                <td className="text-right">
                  {item.daysPending}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function FinanceCard({
  title,
  value,
  danger = false,
}: {
  title: string;
  value: number;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white shadow p-5">

      <p className="text-gray-600 text-sm">
        {title}
      </p>

      <p
        className={`text-2xl font-bold mt-2 ${
          danger
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        ${value.toLocaleString()}
      </p>

    </div>
  );
}

function StatementRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between border-b pb-2">

      <span>{label}</span>

      <span className="font-semibold">
        ${value.toLocaleString()}
      </span>

    </div>
  );
}
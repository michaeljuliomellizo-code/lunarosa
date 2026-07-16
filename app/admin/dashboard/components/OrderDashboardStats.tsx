"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;

  todaySales: number;
  monthSales: number;
  averageTicket: number;

  waitingPayments: number;
}

export default function OrderDashboardStats() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await fetch(
        "/api/admin/dashboard/stats"
      );

      const result =
        await response.json();

      setStats(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map(
          (_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 animate-pulse"
            >
              <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-300 rounded" />
            </div>
          )
        )}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      title: "Pedidos",
      value: stats.totalOrders,
      color: "text-blue-600",
    },

    {
      title: "Pendientes",
      value: stats.pendingOrders,
      color: "text-yellow-600",
    },

    {
      title: "Procesando",
      value: stats.processingOrders,
      color: "text-indigo-600",
    },

    {
      title: "Enviados",
      value: stats.shippedOrders,
      color: "text-cyan-600",
    },

    {
      title: "Entregados",
      value: stats.deliveredOrders,
      color: "text-green-600",
    },

    {
      title: "Cancelados",
      value: stats.cancelledOrders,
      color: "text-red-600",
    },

    {
      title: "Ventas Hoy",
      value:
        "$" +
        stats.todaySales.toLocaleString(),
      color: "text-pink-600",
    },

    {
      title: "Ventas Mes",
      value:
        "$" +
        stats.monthSales.toLocaleString(),
      color: "text-purple-600",
    },

    {
      title: "Ticket Promedio",
      value:
        "$" +
        stats.averageTicket.toLocaleString(),
      color: "text-orange-600",
    },

    {
      title: "Pagos por validar",
      value: stats.waitingPayments,
      color: "text-amber-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
        >
          <div className="text-gray-600 text-sm">
            {card.title}
          </div>

          <div
            className={`mt-2 text-3xl font-bold ${card.color}`}
          >
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

interface ReportSummary {
  totalOrders: number;
  totalSales: number;
  subtotal: number;
  shippingTotal: number;
  averageTicket: number;
}

interface ReportsSummaryProps {
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
}

export default function ReportsSummary({
  filters,
}: ReportsSummaryProps) {
  const [summary, setSummary] =
    useState<ReportSummary>({
      totalOrders: 0,
      totalSales: 0,
      subtotal: 0,
      shippingTotal: 0,
      averageTicket: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSummary();
  }, [filters]);

  async function loadSummary() {
    try {
      setLoading(true);

      const params =
        new URLSearchParams();

      if (filters?.startDate) {
        params.append(
          "startDate",
          filters.startDate
        );
      }

      if (filters?.endDate) {
        params.append(
          "endDate",
          filters.endDate
        );
      }

      if (filters?.status) {
        params.append(
          "status",
          filters.status
        );
      }

      const response =
        await fetch(
          `/api/admin/reports/summary?${params.toString()}`
        );

      const json =
        await response.json();

      if (!response.ok) {
        throw new Error(
          json.error ??
            "Error cargando resumen."
        );
      }

      setSummary(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Ventas",
      value:
        "$" +
        summary.totalSales.toLocaleString(),
      color:
        "text-green-600",
    },
    {
      title: "Pedidos",
      value:
        summary.totalOrders.toLocaleString(),
      color:
        "text-pink-600",
    },
    {
      title: "Subtotal",
      value:
        "$" +
        summary.subtotal.toLocaleString(),
      color:
        "text-blue-600",
    },
    {
      title: "Envíos",
      value:
        "$" +
        summary.shippingTotal.toLocaleString(),
      color:
        "text-orange-600",
    },
    {
      title:
        "Ticket Promedio",
      value:
        "$" +
        Math.round(
          summary.averageTicket
        ).toLocaleString(),
      color:
        "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 animate-pulse h-28"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

      {cards.map(
        (card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6"
          >
            <p className="text-gray-500 text-sm">
              {card.title}
            </p>

            <h2
              className={`text-3xl font-bold mt-2 ${card.color}`}
            >
              {card.value}
            </h2>
          </div>
        )
      )}

    </div>
  );
}
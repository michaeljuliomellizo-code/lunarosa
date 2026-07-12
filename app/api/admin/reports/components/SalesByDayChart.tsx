"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SalesDay {
  date: string;
  orders: number;
  sales: number;
}

interface SalesByDayChartProps {
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
}

export default function SalesByDayChart({
  filters,
}: SalesByDayChartProps) {
  const [data, setData] =
    useState<SalesDay[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
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
          `/api/admin/reports/sales-by-day?${params.toString()}`
        );

      const json =
        await response.json();

      if (!response.ok) {
        throw new Error(
          json.error ??
            "Error cargando gráfico."
        );
      }

      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 h-[420px] animate-pulse" />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Ventas por Día
      </h2>

      <div className="h-[340px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip
                formatter={(value: unknown) => [
                    "$" + Number(value ?? 0).toLocaleString(),
                    "Ventas",
                ]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ec4899"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
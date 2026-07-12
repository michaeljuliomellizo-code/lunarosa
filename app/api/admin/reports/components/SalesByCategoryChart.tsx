"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface CategorySales {
  category: string;
  quantity: number;
  revenue: number;
}

interface SalesByCategoryChartProps {
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
}

const COLORS = [
  "#ec4899",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

export default function SalesByCategoryChart({
  filters,
}: SalesByCategoryChartProps) {
  const [data, setData] =
    useState<CategorySales[]>([]);

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
          `/api/admin/reports/sales-by-category?${params.toString()}`
        );

      const json =
        await response.json();

      if (!response.ok) {
        throw new Error(
          json.error ??
            "Error cargando categorías."
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
        Ventas por Categoría
      </h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[320px] text-gray-500">
          No hay datos disponibles.
        </div>
      ) : (
        <div className="h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="revenue"
                nameKey="category"
                outerRadius={120}
                innerRadius={55}
                paddingAngle={3}
                label={(props) => {
                    const category =
                        (props.payload as CategorySales | undefined)?.category ??
                        "";

                    const percent =
                        props.percent ?? 0;

                    return `${category} (${(percent * 100).toFixed(0)}%)`;
                }}
              >

                {data.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={entry.category}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip
                formatter={(value: unknown) => [
                    "$" + Number(value ?? 0).toLocaleString(),
                    "Ventas",
                ]}
               />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}
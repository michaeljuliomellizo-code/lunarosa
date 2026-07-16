"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface SalesChartData {
  name: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesChartData[];
}

export default function SalesChart({
  data,
}: SalesChartProps) {
  const totalSales = data.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  const totalOrders = data.length;

  const averageTicket =
    totalOrders === 0
      ? 0
      : totalSales / totalOrders;

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold">
            Flujo de Caja
          </h2>

          <p className="text-gray-600">
            Evolución diaria
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-600">
            Total
          </p>

          <p className="text-2xl font-bold text-green-600">
            $
            {totalSales.toLocaleString()}
          </p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{
              fontSize: 11,
            }}
          />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `$${Number(value).toLocaleString()}`
            }
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{
              r: 3,
            }}
            activeDot={{
              r: 6,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="bg-pink-50 rounded-lg p-4">

          <p className="text-gray-600 text-sm">
            Registros
          </p>

          <p className="text-2xl font-bold">
            {totalOrders}
          </p>

        </div>

        <div className="bg-green-50 rounded-lg p-4">

          <p className="text-gray-600 text-sm">
            Promedio Diario
          </p>

          <p className="text-2xl font-bold">
            $
            {Math.round(
              averageTicket
            ).toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
}
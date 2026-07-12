"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function SalesChart() {
  const [data, setData] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const {
      data: orders,
    } = await supabase
      .from("orders")
      .select(
        "created_at,total"
      )
      .order(
        "created_at"
      );

    const grouped:
      Record<
        string,
        number
      > = {};

    orders?.forEach(
      (order) => {
        const day =
          new Date(
            order.created_at
          ).toLocaleDateString();

        grouped[day] =
          (grouped[day] ||
            0) +
          Number(
            order.total
          );
      }
    );

    setData(
      Object.entries(
        grouped
      ).map(
        (
          item
        ) => ({
          date:
            item[0],

          sales:
            item[1],
        })
      )
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Ventas
      </h2>

      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
          >
            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}
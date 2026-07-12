"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

export default function DashboardStats() {
  const [stats, setStats] =
    useState({
      todaySales: 0,
      monthSales: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      customers: 0,
    });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const month =
      new Date();

    month.setDate(1);

    const {
      data: todayOrders,
    } = await supabase
      .from("orders")
      .select("total")
      .gte(
        "created_at",
        today
      );

    const {
      data: monthOrders,
    } = await supabase
      .from("orders")
      .select("total")
      .gte(
        "created_at",
        month.toISOString()
      );

    const {
      count:
        pendingOrders,
    } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq(
        "status",
        "ORDER_STATUS.PENDING",
      );

    const {
      count:
        deliveredOrders,
    } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq(
        "status",
        "ORDER_STATUS.DELIVERED"
      );

    const {
      count: customers,
    } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });

    setStats({
      todaySales:
        todayOrders?.reduce(
          (
            acc,
            item
          ) =>
            acc +
            Number(
              item.total
            ),
          0
        ) || 0,

      monthSales:
        monthOrders?.reduce(
          (
            acc,
            item
          ) =>
            acc +
            Number(
              item.total
            ),
          0
        ) || 0,

      pendingOrders:
        pendingOrders || 0,

      deliveredOrders:
        deliveredOrders || 0,

      customers:
        customers || 0,
    });
  }

  return (
    <div className="grid md:grid-cols-5 gap-6">

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">
          Ventas Hoy
        </h3>

        <p className="text-3xl font-bold">
          $
          {stats.todaySales.toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">
          Ventas Mes
        </h3>

        <p className="text-3xl font-bold">
          $
          {stats.monthSales.toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">
          Pendientes
        </h3>

        <p className="text-3xl font-bold">
          {stats.pendingOrders}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">
          Entregados
        </h3>

        <p className="text-3xl font-bold">
          {stats.deliveredOrders}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">
          Clientes
        </h3>

        <p className="text-3xl font-bold">
          {stats.customers}
        </p>
      </div>

    </div>
  );
}
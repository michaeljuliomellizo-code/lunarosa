"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface DashboardStats {
  totalSales: number;
  monthlySales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export default function DashboardCards() {
  const [stats, setStats] =
    useState<DashboardStats>({
      totalSales: 0,
      monthlySales: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0,
    });

  const [loading, setLoading] =
    useState(true);

  async function loadStats() {
    try {
      setLoading(true);

      const [
        ordersResponse,
        productsResponse,
        customersResponse,
      ] = await Promise.all([
        supabase
          .from("orders")
          .select(
            "id,total,created_at"
          ),

        supabase
          .from("products")
          .select("id")
          .eq("active", true),

        supabase
          .from("profiles")
          .select("id"),
      ]);

      const orders =
        ordersResponse.data || [];

      const products =
        productsResponse.data || [];

      const customers =
        customersResponse.data || [];

      const totalSales =
        orders.reduce(
          (acc, order) =>
            acc +
            Number(
              order.total || 0
            ),
          0
        );

      const now = new Date();

      const currentMonth =
        now.getMonth();

      const currentYear =
        now.getFullYear();

      const monthlySales =
        orders
          .filter((order) => {
            const date =
              new Date(
                order.created_at
              );

            return (
              date.getMonth() ===
                currentMonth &&
              date.getFullYear() ===
                currentYear
            );
          })
          .reduce(
            (acc, order) =>
              acc +
              Number(
                order.total || 0
              ),
            0
          );

      setStats({
        totalSales,
        monthlySales,
        totalOrders:
          orders.length,
        totalCustomers:
          customers.length,
        totalProducts:
          products.length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-6">
      <DashboardCard
        title="Ventas Totales"
        value={`$${stats.totalSales.toLocaleString()}`}
      />

      <DashboardCard
        title="Ventas Mes"
        value={`$${stats.monthlySales.toLocaleString()}`}
      />

      <DashboardCard
        title="Pedidos"
        value={stats.totalOrders}
      />

      <DashboardCard
        title="Clientes"
        value={stats.totalCustomers}
      />

      <DashboardCard
        title="Productos"
        value={stats.totalProducts}
      />
    </div>
  );
}

interface CardProps {
  title: string;
  value: string | number;
}

function DashboardCard({
  title,
  value,
}: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-600 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}
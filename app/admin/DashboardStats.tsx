"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@/lib/order/constants";

interface Order {
  id: string;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  status: string;
  payment_status: string;
}

interface Profile {
  id: string;
  created_at: string;
}

interface DashboardMetrics {
  totalRevenue: number;
  monthRevenue: number;
  todayRevenue: number;

  totalOrders: number;
  paidOrders: number;

  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;

  customers: number;
  newCustomersMonth: number;

  productsSold: number;

  averageTicket: number;

  deliveryRate: number;
  cancellationRate: number;
}

export default function DashboardStats() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<DashboardMetrics>({
      totalRevenue: 0,
      monthRevenue: 0,
      todayRevenue: 0,

      totalOrders: 0,
      paidOrders: 0,

      pendingOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,

      customers: 0,
      newCustomersMonth: 0,

      productsSold: 0,

      averageTicket: 0,

      deliveryRate: 0,
      cancellationRate: 0,
    });

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(
      loadDashboard,
      30000
    );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadDashboard() {
    setLoading(true);

    try {
      const now = new Date();

      const startToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const startMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

      const [
        ordersResponse,
        profilesResponse,
        itemsResponse,
      ] = await Promise.all([
        supabase
          .from("orders")
          .select("*"),

        supabase
          .from("profiles")
          .select(
            "id, created_at"
          ),

        supabase
          .from("order_items")
          .select(
            "quantity"
          ),
      ]);

      const orders =
        (ordersResponse.data ??
          []) as Order[];

      const profiles =
        (profilesResponse.data ??
          []) as Profile[];

      const orderItems =
        itemsResponse.data ?? [];

            const validOrders = orders.filter(
        (order) =>
          order.payment_status ===
            PAYMENT_STATUS.PAID &&
          order.status !==
            ORDER_STATUS.CANCELLED
      );

      const totalRevenue =
        validOrders.reduce(
          (sum, order) =>
            sum +
            Number(
              order.subtotal ?? 0
            ),
          0
        );

      const monthRevenue =
        validOrders
          .filter(
            (order) =>
              new Date(
                order.created_at
              ) >= startMonth
          )
          .reduce(
            (sum, order) =>
              sum +
              Number(
                order.subtotal ?? 0
              ),
            0
          );

      const todayRevenue =
        validOrders
          .filter(
            (order) =>
              new Date(
                order.created_at
              ) >= startToday
          )
          .reduce(
            (sum, order) =>
              sum +
              Number(
                order.subtotal ?? 0
              ),
            0
          );

      const totalOrders =
        orders.filter(
          (order) =>
            order.status !==
            ORDER_STATUS.CANCELLED
        ).length;

      const paidOrders =
        validOrders.length;

      const pendingOrders =
        orders.filter(
          (order) =>
            order.status ===
            ORDER_STATUS.PENDING
        ).length;

      const processingOrders =
        orders.filter(
          (order) =>
            order.status ===
            ORDER_STATUS.PROCESSING
        ).length;

      const shippedOrders =
        orders.filter(
          (order) =>
            order.status ===
            ORDER_STATUS.SHIPPED
        ).length;

      const deliveredOrders =
        orders.filter(
          (order) =>
            order.status ===
            ORDER_STATUS.DELIVERED
        ).length;

      const cancelledOrders =
        orders.filter(
          (order) =>
            order.status ===
            ORDER_STATUS.CANCELLED
        ).length;

      const customers =
        profiles.length;

      const newCustomersMonth =
        profiles.filter(
          (profile) =>
            new Date(
              profile.created_at
            ) >= startMonth
        ).length;

      const productsSold =
        orderItems.reduce(
          (sum, item: any) =>
            sum +
            Number(
              item.quantity ?? 0
            ),
          0
        );

      const averageTicket =
        paidOrders > 0
          ? totalRevenue /
            paidOrders
          : 0;

      const deliveryRate =
        paidOrders > 0
          ? Math.round(
              (deliveredOrders /
                paidOrders) *
                100
            )
          : 0;

      const cancellationRate =
        orders.length > 0
          ? Math.round(
              (cancelledOrders /
                orders.length) *
                100
            )
          : 0;

      setStats({
        totalRevenue,
        monthRevenue,
        todayRevenue,

        totalOrders,
        paidOrders,

        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,

        customers,
        newCustomersMonth,

        productsSold,

        averageTicket,

        deliveryRate,
        cancellationRate,
      });
    } catch (error) {
      console.error(
        "Error cargando dashboard",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow text-center">
        Cargando estadísticas...
      </div>
    );
  }
  return (
  <div className="space-y-8">

    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Ventas Totales
        </p>

        <h2 className="text-3xl font-bold text-pink-600 mt-2">
          $
          {stats.totalRevenue.toLocaleString("es-CO")}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Ventas del Mes
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          $
          {stats.monthRevenue.toLocaleString("es-CO")}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Ventas Hoy
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          $
          {stats.todayRevenue.toLocaleString("es-CO")}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Ticket Promedio
        </p>

        <h2 className="text-3xl font-bold text-purple-600 mt-2">
          $
          {Math.round(
            stats.averageTicket
          ).toLocaleString("es-CO")}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Clientes
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.customers}
        </h2>

        <p className="text-xs text-gray-500 mt-2">
          +{stats.newCustomersMonth} este mes
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Productos Vendidos
        </p>

        <h2 className="text-3xl font-bold mt-2 text-orange-600">
          {stats.productsSold}
        </h2>
      </div>

    </div>

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Estado de Pedidos
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

        <div className="rounded-xl bg-yellow-50 p-5">
          <p className="text-gray-500 text-sm">
            Pendientes
          </p>

          <h3 className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.pendingOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-gray-500 text-sm">
            En Proceso
          </p>

          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            {stats.processingOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-cyan-50 p-5">
          <p className="text-gray-500 text-sm">
            Enviados
          </p>

          <h3 className="text-3xl font-bold text-cyan-600 mt-2">
            {stats.shippedOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-green-50 p-5">
          <p className="text-gray-500 text-sm">
            Entregados
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {stats.deliveredOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-red-50 p-5">
          <p className="text-gray-500 text-sm">
            Cancelados
          </p>

          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {stats.cancelledOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-pink-50 p-5">
          <p className="text-gray-500 text-sm">
            Pagados
          </p>

          <h3 className="text-3xl font-bold text-pink-600 mt-2">
            {stats.paidOrders}
          </h3>
        </div>

      </div>
    </div>
        <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Indicadores del Negocio
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="rounded-xl border p-6">

          <p className="text-gray-500 text-sm">
            Pedidos Totales
          </p>

          <h3 className="text-4xl font-bold mt-3">
            {stats.totalOrders}
          </h3>

        </div>

        <div className="rounded-xl border p-6">

          <p className="text-gray-500 text-sm">
            % Entregados
          </p>

          <h3 className="text-4xl font-bold text-green-600 mt-3">
            {stats.deliveryRate}%
          </h3>

        </div>

        <div className="rounded-xl border p-6">

          <p className="text-gray-500 text-sm">
            % Cancelados
          </p>

          <h3 className="text-4xl font-bold text-red-600 mt-3">
            {stats.cancellationRate}%
          </h3>

        </div>

        <div className="rounded-xl border p-6">

          <p className="text-gray-500 text-sm">
            Clientes Nuevos
          </p>

          <h3 className="text-4xl font-bold text-purple-600 mt-3">
            {stats.newCustomersMonth}
          </h3>

          <p className="text-xs text-gray-500 mt-2">
            registrados este mes
          </p>

        </div>

      </div>

    </div>

  </div>
);
}
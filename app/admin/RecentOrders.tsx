"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
}

export default function RecentOrders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    setOrders(data || []);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Últimos Pedidos
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              border-b
              pb-3
            "
          >
            <p>
              #{order.id.slice(0, 8)}
            </p>

            <p>
              $
              {Number(
                order.total
              ).toLocaleString()}
            </p>

            <p>
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
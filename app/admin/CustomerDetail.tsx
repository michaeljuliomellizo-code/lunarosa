"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

export default function CustomerDetail({
  email,
}: {
  email: string;
}) {
  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {
    const { data } =
      await supabase
        .from("orders")
        .select("*")
        .eq(
          "customer_email",
          email
        )
        .order("created_at", {
          ascending: false,
        });

    setOrders(data || []);
  }

  const totalSpent =
    orders.reduce(
      (acc, order) =>
        acc +
        Number(order.total),
      0
    );

  return (
    <div className="space-y-8">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold">
          {email}
        </h1>

        <p className="mt-3">
          Pedidos:
          {" "}
          {orders.length}
        </p>

        <p>
          Total Comprado:
          {" "}
          $
          {totalSpent.toLocaleString()}
        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Historial
        </h2>

        <div className="space-y-4">

          {orders.map(
            (order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4"
              >
                <p>
                  Pedido:
                  {" "}
                  {order.id}
                </p>

                <p>
                  Estado:
                  {" "}
                  {order.status}
                </p>

                <p>
                  Total:
                  {" "}
                  $
                  {Number(
                    order.total
                  ).toLocaleString()}
                </p>

                <p>
                  Fecha:
                  {" "}
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}
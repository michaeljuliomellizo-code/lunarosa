"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string;
  phone: string;
  shipping_address: string;
  payment_proof: string | null;
  created_at: string;
}

export default function OrdersTable() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  async function loadOrders() {
    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(
      (data as Order[]) || []
    );
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(
    orderId: string,
    status: string
  ) {
    const { error } =
      await supabase
        .from("orders")
        .update({
          status,
        })
        .eq("id", orderId);

    if (error) {
      alert(error.message);
      return;
    }

    await supabase
      .from("order_status_history")
      .insert([
        {
          order_id: orderId,
          status,
          notes:
            "Estado actualizado desde Admin",
        },
      ]);

    await supabase
      .from("notifications")
      .insert([
        {
          title:
            "Estado actualizado",
          message:
            `Pedido ${orderId} → ${status}`,
        },
      ]);

    loadOrders();
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-6">
        Órdenes
      </h1>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Cliente
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Total
              </th>

              <th className="text-left py-3">
                Pago
              </th>

              <th className="text-left py-3">
                Método
              </th>

              <th className="text-left py-3">
                Teléfono
              </th>

              <th className="text-left py-3">
                Estado
              </th>

              <th className="text-left py-3">
                Fecha
              </th>

              <th className="text-left py-3">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b"
              >
                <td className="py-3">
                  {order.customer_name}
                </td>

                <td>
                  {order.customer_email}
                </td>

                <td>
                  $
                  {Number(
                    order.total
                  ).toLocaleString()}
                </td>

                <td>
                  {order.payment_status ===
                  "uploaded" ? (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                      Comprobante enviado
                    </span>
                  ) : order.payment_status ===
                    "paid" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Pagado
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      Pendiente
                    </span>
                  )}
                </td>

                <td>
                  {order.payment_method}
                </td>

                <td>{order.phone}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded"
                  >
                    <option value="pending">
                      Pendiente
                    </option>

                    <option value="processing">
                      Procesando
                    </option>

                    <option value="shipped">
                      Enviado
                    </option>

                    <option value="delivered">
                      Entregado
                    </option>

                    <option value="cancelled">
                      Cancelado
                    </option>
                  </select>
                </td>

                <td>
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/ordenes/${order.id}`}
                      className="bg-blue-500 text-white px-3 py-2 rounded"
                    >
                      Ver
                    </Link>

                    {order.payment_proof && (
                      <a
                        href={
                          order.payment_proof
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-500 text-white px-3 py-2 rounded"
                      >
                        Comprobante
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-10">
            No existen órdenes
          </p>
        )}
      </div>
    </div>
  );
}
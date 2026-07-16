"use client";

import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";

interface Order {
  id: string;
  order_number?: string | null;
  customer_name: string;
  customer_email: string;
  payment_method: string;
  payment_status: string;
  status: string;
  total: number;
  created_at: string;
}

interface OrderTableProps {
  orders: Order[];
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function OrderTable({
  orders,
}: OrderTableProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Pedido
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Cliente
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Fecha
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Método
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Total
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Pago
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Estado
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-gray-600"
                >
                  No existen pedidos.
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold">
                    {order.order_number ??
                      order.id.slice(0, 8)}
                  </div>

                  <div className="text-xs text-gray-600">
                    {order.id}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="font-medium">
                    {order.customer_name}
                  </div>

                  <div className="text-sm text-gray-600">
                    {order.customer_email}
                  </div>
                </td>

                <td className="px-5 py-4">
                  {formatDate(order.created_at)}
                </td>

                <td className="px-5 py-4 capitalize">
                  {order.payment_method}
                </td>

                <td className="px-5 py-4 text-right font-semibold">
                  $
                  {Number(
                    order.total
                  ).toLocaleString("es-CO")}
                </td>

                <td className="px-5 py-4 text-center">
                  <OrderStatusBadge
                    status={
                      order.payment_status
                    }
                    type="payment"
                  />
                </td>

                <td className="px-5 py-4 text-center">
                  <OrderStatusBadge
                    status={order.status}
                  />
                </td>

                <td className="px-5 py-4 text-center">
                  <Link
                    href={`/admin/ordenes/${order.id}`}
                    className="
                      inline-flex
                      items-center
                      rounded-lg
                      bg-pink-600
                      hover:bg-pink-700
                      text-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                    "
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
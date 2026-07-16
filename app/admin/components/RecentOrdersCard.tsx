"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

interface RecentOrder {
  id: string;
  order_number: string;

  customer_name: string;
  customer_email: string;

  total: number;

  status: string;
  payment_status: string;
  payment_method: string;

  created_at: string;

  items_count: number;
}

interface DashboardResponse {
  success: boolean;

  summary: {
    todayOrders: number;
    pendingOrders: number;
    pendingPayments: number;
  };

  data: RecentOrder[];
}

export default function RecentOrdersCard() {
  const [orders, setOrders] = useState<
    RecentOrder[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const response =
        await fetch(
          "/api/admin/dashboard/recent-orders"
        );

      const result: DashboardResponse =
        await response.json();

      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function formatMoney(
    value: number
  ) {
    return new Intl.NumberFormat(
      "es-CO",
      {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }
    ).format(value);
  }

  function formatDate(
    date: string
  ) {
    return new Date(
      date
    ).toLocaleString("es-CO");
  }

  function statusBadge(
    status: string
  ) {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
            <Clock size={14} />
            Pendiente
          </span>
        );

      case "processing":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
            <Package size={14} />
            Procesando
          </span>
        );

      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
            <Truck size={14} />
            Enviado
          </span>
        );

      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            <CheckCircle size={14} />
            Entregado
          </span>
        );

      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            <XCircle size={14} />
            Cancelado
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
            {status}
          </span>
        );
    }
  }

  function paymentBadge(
    payment: string
  ) {
    switch (payment) {
      case "approved":
        return (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Aprobado
          </span>
        );

      case "waiting_validation":
        return (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
            Validando
          </span>
        );

      case "rejected":
        return (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            Rechazado
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
            Pendiente
          </span>
        );
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Pedidos recientes
        </h2>

        <Link
          href="/admin/pedidos"
          className="text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          Ver todos
        </Link>

      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-600">
          Cargando pedidos...
        </div>
      ) : orders.length === 0 ? (
        <div className="py-12 text-center text-gray-600">
          No existen pedidos.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="px-4 py-3 text-left">
                  Pedido
                </th>

                <th className="px-4 py-3 text-left">
                  Cliente
                </th>

                <th className="px-4 py-3 text-center">
                  Productos
                </th>

                <th className="px-4 py-3 text-right">
                  Total
                </th>

                <th className="px-4 py-3 text-center">
                  Estado
                </th>

                <th className="px-4 py-3 text-center">
                  Pago
                </th>

                <th className="px-4 py-3 text-center">
                  Fecha
                </th>

                <th className="px-4 py-3 text-center">
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map(
                (order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 font-medium">
                      {order.order_number ??
                        order.id.substring(
                          0,
                          8
                        )}
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-medium">
                        {
                          order.customer_name
                        }
                      </div>

                      <div className="text-xs text-gray-600">
                        {
                          order.customer_email
                        }
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      {
                        order.items_count
                      }
                    </td>

                    <td className="px-4 py-4 text-right font-semibold">
                      {formatMoney(
                        order.total
                      )}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {statusBadge(
                        order.status
                      )}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        <CreditCard
                          size={15}
                        />
                        {paymentBadge(
                          order.payment_status
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      {formatDate(
                        order.created_at
                      )}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <Link
                        href={`/admin/pedidos/${order.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-2 text-white transition hover:bg-pink-600"
                      >
                        <Eye size={16} />
                        Ver
                      </Link>
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}
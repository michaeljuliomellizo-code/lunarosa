"use client";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

interface HistoryItem {
  id: string;
  status: string;
  comment: string | null;
  created_at: string;
  created_by: string | null;
}

interface OrderTimelineProps {
  orderId: string;
}

function formatDate(
  value: string
) {
  return new Date(value).toLocaleString(
    "es-CO",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function statusLabel(
  status: string
) {
  switch (
    status.toLowerCase()
  ) {
    case "pending":
      return "Pendiente";

    case "processing":
      return "Procesando";

    case "shipped":
      return "Enviado";

    case "delivered":
      return "Entregado";

    case "cancelled":
      return "Cancelado";

    default:
      return status;
  }
}

export default function OrderTimeline({
  orderId,
}: OrderTimelineProps) {
  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHistory();
  }, [orderId]);

  async function loadHistory() {
    const {
      data,
      error,
    } = await supabase
      .from(
        "order_status_history"
      )
      .select("*")
      .eq("order_id", orderId)
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

    if (!error && data) {
      setHistory(data);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Historial del pedido
      </h2>

      {loading && (
        <div className="py-10 text-center text-gray-600">
          Cargando historial...
        </div>
      )}

      {!loading &&
        history.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No existe historial
            para este pedido.
          </div>
        )}

      {!loading &&
        history.length > 0 && (
          <div className="space-y-6">
            {history.map(
              (
                item,
                index
              ) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    {index ===
                    history.length -
                      1 ? (
                      <CheckCircle2
                        size={22}
                        className="text-green-600"
                      />
                    ) : (
                      <Clock3
                        size={22}
                        className="text-pink-600"
                      />
                    )}

                    {index <
                      history.length -
                        1 && (
                      <div className="w-px flex-1 bg-gray-300 my-2" />
                    )}
                  </div>

                  <div className="flex-1 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="font-bold">
                        {statusLabel(
                          item.status
                        )}
                      </h3>

                      <span className="text-sm text-gray-600">
                        {formatDate(
                          item.created_at
                        )}
                      </span>
                    </div>

                    {item.comment && (
                      <p className="mt-2 text-gray-800">
                        {
                          item.comment
                        }
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                      <Circle
                        size={8}
                        fill="currentColor"
                      />

                      {item.created_by ??
                        "Sistema"}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
    </div>
  );
}
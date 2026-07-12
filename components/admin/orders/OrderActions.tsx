"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Check,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import PromptDialog from "@/components/ui/PromptDialog";

import { OrderAdminClient } from "@/lib/order/OrderAdminClient";

interface OrderActionsProps {
  order: {
    id: string;
    status: string;
    payment_status: string;
  };
}

export default function OrderActions({
  order,
}: OrderActionsProps) {
  const router =
    useRouter();

  //-----------------------------------------
  // Estados generales
  //-----------------------------------------

  const [loading, setLoading] =
    useState(false);

  //-----------------------------------------
  // Dialogos
  //-----------------------------------------

  const [
    cancelOpen,
    setCancelOpen,
  ] = useState(false);

  const [
    rejectOpen,
    setRejectOpen,
  ] = useState(false);

  //-----------------------------------------
  // Helpers
  //-----------------------------------------

  async function execute(
    action: () => Promise<any>,
    message: string
  ) {
    try {
      setLoading(true);

      await action();

      toast.success(message);

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error."
      );
    } finally {
      setLoading(false);
    }
  }
  async function approvePayment() {
    await execute(
      () =>
        OrderAdminClient.approvePayment(
          order.id
        ),
      "Pago aprobado."
    );
  }

  async function rejectPayment(
    reason: string
  ) {
    setRejectOpen(false);

    await execute(
      () =>
        OrderAdminClient.rejectPayment(
          order.id,
          reason
        ),
      "Pago rechazado."
    );
  }

  async function processing() {
    await execute(
      () =>
        OrderAdminClient.processing(
          order.id
        ),
      "Pedido en preparación."
    );
  }

  async function shipped() {
    await execute(
      () =>
        OrderAdminClient.shipped(
          order.id
        ),
      "Pedido enviado."
    );
  }

  async function delivered() {
    await execute(
      () =>
        OrderAdminClient.delivered(
          order.id
        ),
      "Pedido entregado."
    );
  }

  async function cancelOrder() {
    setCancelOpen(false);

    await execute(
      () =>
        OrderAdminClient.cancel(
          order.id
        ),
      "Pedido cancelado."
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">

        {order.status === "pending" &&
          order.payment_status !== "paid" && (
            <>
              <button
                disabled={loading}
                onClick={approvePayment}
                className="flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white px-4 py-2 disabled:opacity-50"
              >
                <Check size={18} />
                Aprobar pago
              </button>

              <button
                disabled={loading}
                onClick={() => setRejectOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 disabled:opacity-50"
              >
                <XCircle size={18} />
                Rechazar pago
              </button>

              <button
                disabled={loading}
                onClick={() => setCancelOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-gray-900 hover:bg-black text-white px-4 py-2 disabled:opacity-50"
              >
                <XCircle size={18} />
                Cancelar
              </button>
            </>
        )}

        {order.status === "pending" &&
          order.payment_status === "paid" && (
            <>
              <button
                disabled={loading}
                onClick={processing}
                className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 disabled:opacity-50"
              >
                <Package size={18} />
                Procesando
              </button>

              <button
                disabled={loading}
                onClick={() => setCancelOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-gray-900 hover:bg-black text-white px-4 py-2 disabled:opacity-50"
              >
                <XCircle size={18} />
                Cancelar
              </button>
            </>
        )}

        {order.status === "processing" && (
          <>
            <button
              disabled={loading}
              onClick={shipped}
              className="flex items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 disabled:opacity-50"
            >
              <Truck size={18} />
              Enviado
            </button>

            <button
              disabled={loading}
              onClick={() => setCancelOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-gray-900 hover:bg-black text-white px-4 py-2 disabled:opacity-50"
            >
              <XCircle size={18} />
              Cancelar
            </button>
          </>
        )}

        {order.status === "shipped" && (
          <button
            disabled={loading}
            onClick={delivered}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 disabled:opacity-50"
          >
            <Check size={18} />
            Entregado
          </button>
        )}

      </div>

      {/* Confirmar cancelación */}

      <ConfirmDialog
        open={cancelOpen}
        title="Cancelar pedido"
        description="¿Está seguro que desea cancelar este pedido?"
        confirmText="Cancelar pedido"
        danger
        loading={loading}
        onConfirm={cancelOrder}
        onCancel={() =>
          setCancelOpen(false)
        }
      />

      {/* Motivo rechazo */}

      <PromptDialog
        open={rejectOpen}
        title="Rechazar pago"
        description="Ingrese el motivo del rechazo."
        label="Motivo"
        placeholder="Escriba aquí..."
        confirmText="Rechazar pago"
        danger
        loading={loading}
        onConfirm={rejectPayment}
        onCancel={() =>
          setRejectOpen(false)
        }
      />
    </>
  );
}
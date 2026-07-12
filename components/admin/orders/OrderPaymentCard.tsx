"use client";

import Link from "next/link";
import {
  CreditCard,
  DollarSign,
  Receipt,
  CheckCircle2,
} from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

interface OrderPaymentCardProps {
  order: {
    payment_method: string;
    payment_status: string;
    payment_reference?: string | null;
    payment_proof?: string | null;
    subtotal?: number | null;
    shipping?: number | null;
    total: number;
    coupon_code?: string | null;
    referral_code?: string | null;
  };
}

function paymentMethodLabel(
  method: string
) {
  switch (
    method?.toLowerCase()
  ) {
    case "contraentrega":
      return "Contra entrega";

    case "transferencia":
      return "Transferencia";

    case "nequi":
      return "Nequi";

    case "daviplata":
      return "Daviplata";

    default:
      return method ?? "-";
  }
}

export default function OrderPaymentCard({
  order,
}: OrderPaymentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Pago
      </h2>

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <CreditCard
            size={20}
            className="text-pink-600 mt-1"
          />

          <div>
            <p className="text-sm text-gray-500">
              Método
            </p>

            <p className="font-semibold">
              {paymentMethodLabel(
                order.payment_method
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2
            size={20}
            className="text-pink-600 mt-1"
          />

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Estado del pago
            </p>

            <OrderStatusBadge
              status={
                order.payment_status
              }
              type="payment"
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Receipt
            size={20}
            className="text-pink-600 mt-1"
          />

          <div>
            <p className="text-sm text-gray-500">
              Referencia
            </p>

            <p className="font-semibold break-all">
              {order.payment_reference ||
                "-"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Comprobante
          </p>

          {order.payment_proof ? (
            <Link
              href={
                order.payment_proof
              }
              target="_blank"
              className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                bg-pink-600
                hover:bg-pink-700
                text-white
                px-4
                py-2
                transition
              "
            >
              Ver comprobante
            </Link>
          ) : (
            <p className="text-gray-400 italic">
              No adjuntado
            </p>
          )}
        </div>

        <div className="border-t pt-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="font-semibold">
              $
              {Number(
                order.subtotal ?? 0
              ).toLocaleString(
                "es-CO"
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Envío
            </span>

            <span className="font-semibold">
              $
              {Number(
                order.shipping ?? 0
              ).toLocaleString(
                "es-CO"
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Cupón
            </span>

            <span className="font-semibold">
              {order.coupon_code ??
                "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Referido
            </span>

            <span className="font-semibold">
              {order.referral_code ??
                "-"}
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between text-2xl font-bold">
            <div className="flex items-center gap-2">
              <DollarSign
                size={24}
                className="text-pink-600"
              />

              Total
            </div>

            <span className="text-pink-600">
              $
              {Number(
                order.total
              ).toLocaleString(
                "es-CO"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { Mail, MapPin, Phone, User } from "lucide-react";

interface OrderCustomerCardProps {
  order: {
    customer_name: string;
    customer_email: string;
    phone?: string | null;
    shipping_address?: string | null;
    notes?: string | null;
  };
}

export default function OrderCustomerCard({
  order,
}: OrderCustomerCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Información del cliente
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <User
              size={20}
              className="text-pink-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Nombre
              </p>

              <p className="font-semibold">
                {order.customer_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail
              size={20}
              className="text-pink-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Correo electrónico
              </p>

              <p className="font-semibold break-all">
                {order.customer_email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone
              size={20}
              className="text-pink-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Teléfono
              </p>

              <p className="font-semibold">
                {order.phone || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <MapPin
              size={20}
              className="text-pink-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Dirección de envío
              </p>

              <p className="font-semibold whitespace-pre-line">
                {order.shipping_address ||
                  "No registrada"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Observaciones
            </p>

            <div className="rounded-lg border bg-gray-50 p-4 min-h-[90px]">
              {order.notes ? (
                <p className="whitespace-pre-line">
                  {order.notes}
                </p>
              ) : (
                <p className="text-gray-400 italic">
                  El cliente no dejó observaciones.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
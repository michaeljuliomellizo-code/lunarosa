"use client";

import Image from "next/image";
import { DeliveryEstimate } from "@/lib/shipping/DeliveryTime";


interface Item {
  id: string;
  image?: string;
  name: string;
  color?: string;
  size?: string;
  quantity: number;
  price: number;
}

interface Props {
  items: Item[];

  subtotal: number;
  discount: number;

  shippingCost: number;
  shippingLoading: boolean;
  shippingAvailable: boolean;

  estimatedDays: number | null;
  deliveryEstimate: DeliveryEstimate;

  couponCode: string | null;

  totalProducts: number;
  total: number;
}

export default function OrderSummary({
  items,

  subtotal,
  discount,

  shippingCost,
  shippingLoading,
  shippingAvailable,

  estimatedDays,
  deliveryEstimate,

  couponCode,

  totalProducts,
  total,
}: Props) {
  return (
    <>
      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          🛍 Tu Pedido
        </h2>

        <div className="space-y-5">

          {items.map((item) => (

            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex gap-4 border-b pb-5"
            >

              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    Sin imagen
                  </div>
                )}

              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                {item.color && (
                  <p className="text-sm text-gray-700">
                    Color: {item.color}
                  </p>
                )}

                {item.size && (
                  <p className="text-sm text-gray-700">
                    Talla: {item.size}
                  </p>
                )}

                <p className="text-sm text-gray-700">
                  Cantidad: {item.quantity}
                </p>

              </div>

              <div className="font-bold text-pink-600">
                $
                {Number(item.price).toLocaleString("es-CO")}
              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="bg-gradient-to-br from-white to-pink-50 border rounded-3xl p-6 shadow-sm mt-6">

        <h2 className="font-bold text-xl mb-4">
          Resumen
        </h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>
            ${subtotal.toLocaleString("es-CO")}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between mb-2 text-green-600">
            <span>Descuento</span>
            <span>
              -${discount.toLocaleString("es-CO")}
            </span>
          </div>
        )}

        <div className="flex justify-between mb-2">

          <span>Envío</span>

          <span>

            {shippingLoading
              ? "Calculando..."
              : shippingAvailable
              ? `$${shippingCost.toLocaleString("es-CO")}`
              : "No disponible"}

          </span>

        </div>

        <div className="flex justify-between mb-2">

          <span>Tiempo estimado</span>

          <span className="text-pink-600 font-medium">
            {deliveryEstimate.label}
          </span>

        </div>

        {shippingAvailable &&
          estimatedDays && (

            <div className="flex justify-between text-sm text-gray-600 mb-2">

              <span>Días hábiles</span>

              <span>
                {estimatedDays}
              </span>

            </div>

          )}

        {couponCode && (

          <div className="flex justify-between mb-2 text-green-600">

            <span>Cupón</span>

            <span>{couponCode}</span>

          </div>

        )}

        <div className="flex justify-between text-sm text-gray-600 mb-4">

          <span>Productos</span>

          <span>{totalProducts}</span>

        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            ${total.toLocaleString("es-CO")}
          </span>

        </div>

      </div>
    </>
  );
}
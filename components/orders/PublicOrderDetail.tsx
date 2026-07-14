"use client";

import { useEffect, useState } from "react";

interface Props {
  orderId: string;
}

export default function PublicOrderDetail({
  orderId,
}: Props) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  async function loadOrder() {
    try {
      const response = await fetch(
        `/api/orders/${orderId}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "No fue posible cargar el pedido."
        );
      }

      const data = await response.json();

      setOrder(data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Cargando pedido...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        Pedido no encontrado
      </div>
    );
  }

  return (
    <div
      className="
        space-y-6
        w-full
      "
    >
      <div className="bg-white rounded-xl border p-6">
        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
            break-words
          "
        >
          Pedido #{order.order_number ?? order.id}
        </h1>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mt-6
          "
        >
          <div>
            <p>
              <strong>Cliente:</strong>{" "}
              {order.customer_name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer_email}
            </p>

            <p>
              <strong>Teléfono:</strong>{" "}
              {order.phone}
            </p>
          </div>

          <div>
            <p>
              <strong>Estado:</strong>{" "}
              {order.status}
            </p>

            <p>
              <strong>Estado del pago:</strong>{" "}
              {order.payment_status}
            </p>

            <p>
              <strong>Método:</strong>{" "}
              {order.payment_method}
            </p>

            <p>
              <strong>Total:</strong> $
              {Number(order.total).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <strong>Dirección</strong>

          <p>{order.shipping_address}</p>
        </div>

        {order.notes && (
          <div className="mt-6">
            <strong>Notas</strong>

            <p>{order.notes}</p>
          </div>
        )}

        {order.payment_reference && (
          <div className="mt-6">
            <strong>Referencia</strong>

            <p>{order.payment_reference}</p>
          </div>
        )}

        {order.payment_proof && (
          <div className="mt-6">
            <strong>Comprobante</strong>

            <div className="mt-3">
              <a
                href={order.payment_proof}
                target="_blank"
                rel="noreferrer"
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  justify-center
                  bg-pink-600
                  text-white
                  px-5
                  py-3
                  rounded-lg
                  "
              >
                Ver comprobante
              </a>
            </div>

            {!order.payment_proof
              .toLowerCase()
              .includes(".pdf") && (
              <img
                src={order.payment_proof}
                alt="Comprobante"
                className="
                  mt-4
                  w-full
                  max-w-md
                  rounded-lg
                  border
                  "
              />
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-2xl font-bold mb-6">
          Productos
        </h2>

        <div className="space-y-4">
          {order.order_items?.map(
            (item: any) => (
              <div
                key={item.id}
                className="
                  border
                  rounded-xl
                  p-4
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                  "
              >
                <img
                  src={
                    item.products?.image ??
                    "/placeholder.jpg"
                  }
                  alt={
                    item.products?.name
                  }
                  className="
                    w-full
                    sm:w-24
                    h-56
                    sm:h-24
                    object-cover
                    rounded-lg
                    border
                    "
                />

                <div className="flex-1">
                  <h3 className="
                    font-bold
                    text-lg
                    break-words
                    ">
                    {item.products?.name}
                  </h3>

                  {item.product_variants?.color && (
                    <p>
                      <strong>Color:</strong>{" "}
                      {
                        item.product_variants.color
                      }
                    </p>
                  )}

                  {item.product_variants?.size && (
                    <p>
                      <strong>Talla:</strong>{" "}
                      {
                        item.product_variants.size
                      }
                    </p>
                  )}

                  <p>
                    <strong>Cantidad:</strong>{" "}
                    {item.quantity}
                  </p>

                  <p>
                    <strong>Precio:</strong> $
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </p>

                  <p className="font-semibold">
                    Subtotal: $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-bold mb-4">
          Historial del pedido
        </h2>

        <div className="space-y-3">
          {order.order_status_history?.map(
            (history: any) => (
              <div
                key={history.id}
                className="
                  border-l-4
                  border-pink-500
                  pl-4
                  break-words
                  "
              >
                <p className="font-semibold capitalize">
                  {history.status}
                </p>

                {history.notes && (
                  <p className="text-gray-600">
                    {history.notes}
                  </p>
                )}

                <p className="text-sm text-gray-400">
                  {new Date(
                    history.created_at
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
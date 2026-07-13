"use client";

import { useEffect, useState } from "react";

interface Props {
  orderId: string;
}

export default function OrderDetail({
  orderId,
}: Props) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  async function loadOrder() {

    try {

      const response =
        await fetch(
          `/api/admin/orders/${orderId}`,
          {
            cache: "no-store",
          }
        );

      if (!response.ok) {

        if (response.status === 401) {

          window.location.href =
            "/login";

          return;

        }

        const error =
          await response.text();

        console.error(error);

        throw new Error(
          "No fue posible cargar el pedido."
        );

      }

      const data =
        await response.json();

      console.log(
        "ORDER RESPONSE:",
        data
      );

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
    <div className="space-y-6">

      <div className="bg-white rounded-xl border p-6">
        <h1 className="text-3xl font-bold">
          Pedido #{order.id}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-6">

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
              <strong>Pago:</strong>{" "}
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
          <strong>Dirección:</strong>

          <p>
            {order.shipping_address}
          </p>
        </div>

        {order.notes && (
          <div className="mt-6">
            <strong>Notas:</strong>

            <p>{order.notes}</p>
          </div>
        )}

        {order.payment_reference && (
          <div className="mt-6">
            <strong>Referencia:</strong>

            <p>
              {order.payment_reference}
            </p>
          </div>
        )}

        {order.payment_proof && (
          <div className="mt-6">
            <strong>Comprobante:</strong>

            <div className="mt-2">
              <a
                href={order.payment_proof}
                target="_blank"
                rel="noreferrer"
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Ver comprobante
              </a>
            </div>

            {order.payment_proof
              .toLowerCase()
              .includes(".pdf") ? null : (
              <img
                src={order.payment_proof}
                alt="Comprobante"
                className="
                  mt-4
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
          Productos Comprados
        </h2>

        {order.order_items?.length === 0 && (
          <div>
            No se encontraron productos
          </div>
        )}

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
                  gap-4
                  items-center
                "
              >
                <div className="flex-1">

                  <img
                    src={
                      item.products
                        ?.image ||
                      "/placeholder.jpg"
                    }
                    alt={
                      item.products
                        ?.name
                    }
                    className="
                      w-24
                      h-24
                      object-cover
                      rounded-lg
                      border
                    "
                  />


                  <h3 className="font-bold text-lg">
                    {item.products?.name}
                  </h3>

                  <p>
                    <strong>
                    Product ID:
                    </strong>
                    {" "}
                    {item.product_id}
                  </p>

                  <p>
                    <strong>
                    Cantidad:
                    </strong>{" "}
                    {item.quantity}
                  </p>
                  {item.product_variants?.color && (
                    <p>
                      <strong>
                      Color:
                      </strong>{" "}
                      {item.product_variants?.color}
                    </p>
                    )}

                    {item.product_variants?.size && (
                    <p>
                      <strong>
                      Talla:
                      </strong>{" "}
                      {item.product_variants.size}
                    </p>
                    )}

                  <p>
                    <strong>
                    Precio:
                    </strong>
                    {" "}
                    $
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </p>

                  <p className="font-semibold">
                    Subtotal:
                    {" "}
                    $
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

    </div>
  );
}
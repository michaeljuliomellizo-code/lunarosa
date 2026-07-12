"use client";

import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  price: number;
}

interface Variant {
  id: string;
  size: string | null;
  color: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  products: Product | Product[] | null;
  product_variants?: Variant | Variant[] | null;
}

interface OrderItemsCardProps {
  order: {
    subtotal?: number | null;
    shipping?: number | null;
    total: number;
    order_items: OrderItem[];
  };
}

export default function OrderItemsCard({
  order,
}: OrderItemsCardProps) {
  const subtotal =
    order.subtotal ??
    order.order_items.reduce(
      (acc, item) =>
        acc +
        Number(item.price) *
          Number(item.quantity),
      0
    );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Productos del pedido
      </h2>

      <div className="space-y-5">
        {order.order_items.map((item) => {
          const product = Array.isArray(
            item.products
          )
            ? item.products[0]
            : item.products;

          const variant = Array.isArray(
            item.product_variants
          )
            ? item.product_variants[0]
            : item.product_variants;

          return (
            <div
              key={item.id}
              className="flex gap-4 border rounded-xl p-4"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                {product?.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    Sin imagen
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  {product?.name ??
                    "Producto"}
                </h3>

                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  {variant?.color && (
                    <p>
                      <strong>
                        Color:
                      </strong>{" "}
                      {variant.color}
                    </p>
                  )}

                  {variant?.size && (
                    <p>
                      <strong>
                        Talla:
                      </strong>{" "}
                      {variant.size}
                    </p>
                  )}

                  <p>
                    <strong>
                      Cantidad:
                    </strong>{" "}
                    {item.quantity}
                  </p>

                  <p>
                    <strong>
                      Precio unitario:
                    </strong>{" "}
                    $
                    {Number(
                      item.price
                    ).toLocaleString(
                      "es-CO"
                    )}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Subtotal
                  </p>

                  <p className="text-xl font-bold text-pink-600">
                    $
                    {(
                      Number(
                        item.price
                      ) *
                      Number(
                        item.quantity
                      )
                    ).toLocaleString(
                      "es-CO"
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            $
            {Number(
              subtotal
            ).toLocaleString(
              "es-CO"
            )}
          </span>
        </div>

        <div className="flex justify-between mb-3">
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

        <div className="flex justify-between border-t pt-4 text-xl font-bold">
          <span>Total</span>

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
  );
}
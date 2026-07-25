"use client";

import Image from "next/image";

interface Props {
  items: any[];
}

export default function OrderItems({
  items,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Productos
      </h2>

      <div className="space-y-5">

        {items.map((item, index) => (

          <div
            key={index}
            className="flex gap-5 border-b last:border-none pb-5 last:pb-0"
          >

            <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

              {item.products?.image ? (

                <Image
                  src={item.products.image}
                  alt={item.products.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />

              ) : (

                <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                  Sin imagen
                </div>

              )}

            </div>

            <div className="flex-1">

              <h3 className="font-bold text-lg">
                {item.products?.name}
              </h3>

              {item.product_variants?.color && (
                <p className="text-gray-600 text-sm">
                  Color:
                  <span className="font-medium ml-1">
                    {item.product_variants.color}
                  </span>
                </p>
              )}

              {item.product_variants?.size && (
                <p className="text-gray-600 text-sm">
                  Talla:
                  <span className="font-medium ml-1">
                    {item.product_variants.size}
                  </span>
                </p>
              )}

              <p className="text-gray-600 text-sm">
                Cantidad:
                <span className="font-medium ml-1">
                  {item.quantity}
                </span>
              </p>

              <div className="mt-3 text-pink-600 font-bold text-lg">
                $
                {Number(item.price).toLocaleString("es-CO")}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
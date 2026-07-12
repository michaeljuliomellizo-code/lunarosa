"use client";

interface Product {
  id: string;
  name: string;
  sold: number;
}

export default function TopProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Más Vendidos
      </h2>

      <div className="space-y-4">
        {products.map(
          (product) => (
            <div
              key={
                product.id
              }
              className="
                flex
                justify-between
                border-b
                pb-3
              "
            >
              <span>
                {
                  product.name
                }
              </span>

              <span className="font-bold">
                {
                  product.sold
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
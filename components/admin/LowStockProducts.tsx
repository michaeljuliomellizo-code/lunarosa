"use client";

interface Product {
  id: string;
  name: string;
  stock: number;
}

export default function LowStockProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-600">
        Stock Bajo
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

              <span className="font-bold text-red-600">
                {
                  product.stock
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
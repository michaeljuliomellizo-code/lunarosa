"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface TopProduct {
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  quantity: number;
  revenue: number;
  averagePrice: number;
}

interface Summary {
  totalProducts: number;
  totalUnitsSold: number;
  totalRevenue: number;
  bestSeller: TopProduct | null;
}

export default function TopProductsCard() {
  const [products, setProducts] =
    useState<TopProduct[]>([]);

  const [summary, setSummary] =
    useState<Summary>({
      totalProducts: 0,
      totalUnitsSold: 0,
      totalRevenue: 0,
      bestSeller: null,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response =
        await fetch(
          "/api/admin/dashboard/top-products"
        );

      if (!response.ok) {
        throw new Error(
          "Error cargando productos."
        );
      }

      const data =
        await response.json();

      setProducts(data.products);

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse h-[520px]" />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold">
            Productos más vendidos
          </h2>

          <p className="text-gray-600">
            Ranking general
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-600">
            Unidades vendidas
          </p>

          <p className="text-2xl font-bold text-pink-600">
            {summary.totalUnitsSold.toLocaleString()}
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {products.map(
          (
            product,
            index
          ) => (
            <div
              key={
                product.productId
              }
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">

                <div className="text-lg font-bold text-pink-500 w-8">
                  #{index + 1}
                </div>

                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 relative">

                  {product.image ? (
                    <Image
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-xs">
                      Sin imagen
                    </div>
                  )}

                </div>

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {product.quantity.toLocaleString()} unidades
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  $
                  {product.revenue.toLocaleString()}
                </p>

                <p className="text-xs text-gray-600">
                  Promedio $
                  {Math.round(
                    product.averagePrice
                  ).toLocaleString()}
                </p>

                <Link
                  href={`/admin/productos/${product.productId}`}
                  className="text-pink-600 text-sm hover:underline mt-1 inline-block"
                >
                  Ver producto
                </Link>

              </div>

            </div>
          )
        )}

      </div>

      {summary.bestSeller && (
        <div className="mt-8 border-t pt-6">

          <h3 className="font-semibold mb-2">
            🏆 Producto líder
          </h3>

          <div className="flex justify-between items-center">

            <div>

              <p className="font-bold">
                {summary.bestSeller.name}
              </p>

              <p className="text-sm text-gray-600">
                {summary.bestSeller.quantity.toLocaleString()} unidades
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-green-600">
                $
                {summary.bestSeller.revenue.toLocaleString()}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

export default function TopProducts() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } =
      await supabase
        .from("order_items")
        .select(`
          quantity,
          products(
            name
          )
        `);

    const totals:
      Record<
        string,
        number
      > = {};

    data?.forEach(
      (item: any) => {
        const name =
          item.products?.name ||
          "Producto";

        totals[name] =
          (totals[name] || 0) +
          item.quantity;
      }
    );

    const sorted =
      Object.entries(
        totals
      )
        .sort(
          (
            a,
            b
          ) =>
            b[1] -
            a[1]
        )
        .slice(0, 10);

    setProducts(sorted);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Más Vendidos
      </h2>

      <div className="space-y-4">

        {products.map(
          (
            product
          ) => (
            <div
              key={
                product[0]
              }
              className="flex justify-between"
            >
              <span>
                {
                  product[0]
                }
              </span>

              <span>
                {
                  product[1]
                }
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}
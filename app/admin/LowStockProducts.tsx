"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

export default function LowStockProducts() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } =
      await supabase
        .from("products")
        .select("*")
        .lte(
          "stock",
          5
        )
        .order(
          "stock",
          {
            ascending: true,
          }
        );

    setProducts(
      data || []
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Stock Bajo
      </h2>

      <div className="space-y-4">

        {products.map(
          (
            product
          ) => (
            <div
              key={
                product.id
              }
              className="flex justify-between"
            >
              <span>
                {
                  product.name
                }
              </span>

              <span className="text-red-500 font-bold">
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
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface Variant {
  id: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  sku: string;
  products: {
    name: string;
  };
}

export default function ProductVariantsTable() {
  const [variants, setVariants] = useState<Variant[]>([]);

  async function loadVariants() {
    const { data } = await supabase
      .from("product_variants")
      .select(`
        *,
        products(name)
      `)
      .order("created_at", {
        ascending: false,
      });

    setVariants(data || []);
  }

  useEffect(() => {
    loadVariants();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Variantes
        </h1>

        <Link
          href="/admin/variantes/nueva"
          className="bg-pink-500 text-white px-5 py-3 rounded-lg"
        >
          Nueva Variante
        </Link>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Producto
            </th>

            <th className="text-left py-3">
              Color
            </th>

            <th className="text-left py-3">
              Talla
            </th>

            <th className="text-left py-3">
              Stock
            </th>

            <th className="text-left py-3">
              Precio
            </th>

            <th className="text-left py-3">
              SKU
            </th>

          </tr>

        </thead>

        <tbody>

          {variants.map((variant) => (

            <tr
              key={variant.id}
              className="border-b"
            >

              <td className="py-3">
                {variant.products?.name}
              </td>

              <td>
                {variant.color}
              </td>

              <td>
                {variant.size}
              </td>

              <td>
                {variant.stock}
              </td>

              <td>
                $
                {Number(
                  variant.price
                ).toLocaleString()}
              </td>

              <td>
                {variant.sku}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
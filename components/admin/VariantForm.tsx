"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
}

export default function VariantForm() {
  const [products, setProducts] = useState<Product[]>([]);

  const [productId, setProductId] =
    useState("");

  const [color, setColor] =
    useState("");

  const [size, setSize] =
    useState("");

  const [stock, setStock] =
    useState(0);

  const [price, setPrice] =
    useState(0);

  const [sku, setSku] =
    useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } =
      await supabase
        .from("products")
        .select("id,name")
        .order("name");

    setProducts(data || []);
  }

  async function saveVariant() {
    const { error } =
      await supabase
        .from("product_variants")
        .insert([
          {
            product_id: productId,
            color,
            size,
            stock,
            price,
            sku,
          },
        ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Variante creada");
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Nueva Variante
      </h1>

      <div className="space-y-4">

        <select
          value={productId}
          onChange={(e) =>
            setProductId(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
        >
          <option value="">
            Seleccione producto
          </option>

          {products.map((product) => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>

          ))}
        </select>

        <input
          value={color}
          onChange={(e) =>
            setColor(
              e.target.value
            )
          }
          placeholder="Color"
          className="border p-3 rounded-lg w-full"
        />

        <input
          value={size}
          onChange={(e) =>
            setSize(
              e.target.value
            )
          }
          placeholder="Talla"
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(
              Number(
                e.target.value
              )
            )
          }
          placeholder="Stock"
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              Number(
                e.target.value
              )
            )
          }
          placeholder="Precio"
          className="border p-3 rounded-lg w-full"
        />

        <input
          value={sku}
          onChange={(e) =>
            setSku(
              e.target.value
            )
          }
          placeholder="SKU"
          className="border p-3 rounded-lg w-full"
        />

        <button
          onClick={saveVariant}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg"
        >
          Guardar
        </button>

      </div>

    </div>
  );
}
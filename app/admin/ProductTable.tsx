"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

import ProductBulkActions from "@/app/admin/ProductBulkActions";

interface Product {
  id: string;
  name: string;
  price: number;
  compare_price: number | null;
  stock: number;
  image: string | null;
  featured: boolean;
  active: boolean;

  categories: {
    name: string;
  } | null;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState<string[]>([]);

  async function loadProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select(`
          *,
          categories (
            name
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(
      (data as Product[]) || []
    );
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function toggleProduct(id: string) {
    if (
      selectedProducts.includes(id)
    ) {
      setSelectedProducts(
        selectedProducts.filter(
          (item) => item !== id
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        id,
      ]);
    }
  }

  function toggleAllProducts() {
    if (
      selectedProducts.length ===
      products.length
    ) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(
        products.map(
          (product) => product.id
        )
      );
    }
  }

  async function deleteProduct(
    id: string
  ) {
    const confirmDelete = confirm(
      "¿Desea eliminar este producto?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadProducts();
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Productos
        </h2>

        <span className="text-sm text-gray-600">
          {products.length} productos
        </span>
      </div>

      <ProductBulkActions
        selectedProducts={
          selectedProducts
        }
        onFinish={() => {
          setSelectedProducts([]);
          loadProducts();
        }}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">

              <th className="py-3">
                <input
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedProducts.length ===
                      products.length
                  }
                  onChange={
                    toggleAllProducts
                  }
                />
              </th>

              <th className="text-left py-3">
                Imagen
              </th>

              <th className="text-left py-3">
                Nombre
              </th>

              <th className="text-left py-3">
                Categoría
              </th>

              <th className="text-left py-3">
                Precio
              </th>

              <th className="text-left py-3">
                Precio Ant.
              </th>

              <th className="text-left py-3">
                Stock
              </th>

              <th className="text-left py-3">
                Destacado
              </th>

              <th className="text-left py-3">
                Estado
              </th>

              <th className="text-left py-3">
                Acciones
              </th>

            </tr>
          </thead>

          <tbody>

            {products.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(
                        product.id
                      )}
                      onChange={() =>
                        toggleProduct(
                          product.id
                        )
                      }
                    />
                  </td>

                  <td className="py-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-16
                          h-16
                          object-cover
                          rounded-lg
                          border
                        "
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="font-medium">
                    {product.name}
                  </td>

                  <td>
                    {product
                      .categories?.name ||
                      "-"}
                  </td>

                  <td>
                    $
                    {product.price.toLocaleString()}
                  </td>

                  <td>
                    {product.compare_price
                      ? `$${product.compare_price.toLocaleString()}`
                      : "-"}
                  </td>

                  <td>
                    {product.stock}
                  </td>

                  <td>
                    {product.featured
                      ? "⭐ Sí"
                      : "No"}
                  </td>

                  <td>
                    <span
                      className={
                        product.active
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {product.active
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </td>

                  <td className="space-x-2">

                    <Link
                      href={`/admin/productos/${product.id}`}
                      className="
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        px-3
                        py-1
                        rounded
                      "
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-3
                        py-1
                        rounded
                      "
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

        {products.length === 0 && (
          <p className="text-center py-10 text-gray-600">
            No hay productos registrados
          </p>
        )}

      </div>
    </div>
  );
}
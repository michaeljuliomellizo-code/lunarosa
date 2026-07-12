"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  is_active: boolean;
}

export default function CategoryTable() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  async function loadCategories() {
    const { data } =
      await supabase
        .from("categories")
        .select("*")
        .order("name");

    setCategories(data || []);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function toggleStatus(
    category: Category
  ) {
    await supabase
      .from("categories")
      .update({
        is_active:
          !category.is_active,
      })
      .eq("id", category.id);

    loadCategories();
  }

  async function deleteCategory(
    id: string
  ) {
    if (
      !confirm(
        "¿Eliminar categoría?"
      )
    )
      return;

    await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    loadCategories();
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Categorías
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {categories.map(
            (category) => (
              <tr
                key={category.id}
              >
                <td>
                  {category.image && (
                    <img
                      src={
                        category.image
                      }
                      className="
                        w-14
                        h-14
                        object-cover
                        rounded
                      "
                    />
                  )}
                </td>

                <td>
                  {category.name}
                </td>

                <td>
                  {category.is_active
                    ? "Activa"
                    : "Inactiva"}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      toggleStatus(
                        category
                      )
                    }
                    className="
                      bg-blue-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Estado
                  </button>

                  <button
                    onClick={() =>
                      deleteCategory(
                        category.id
                      )
                    }
                    className="
                      bg-red-500
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
    </div>
  );
}
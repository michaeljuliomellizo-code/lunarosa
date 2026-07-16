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

interface Props {
  onEdit: (category: Category) => void;
  refreshKey: number;
}

export default function CategoryTable({
  onEdit,
  refreshKey,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setCategories(data || []);
  }

  useEffect(() => {
    loadCategories();
  }, [refreshKey]);

  async function toggleStatus(category: Category) {
    await supabase
      .from("categories")
      .update({
        is_active: !category.is_active,
      })
      .eq("id", category.id);

    loadCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm("¿Eliminar categoría?")) return;

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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">
                Imagen
              </th>

              <th className="py-3 text-left">
                Nombre
              </th>

              <th className="py-3 text-left">
                Estado
              </th>

              <th className="py-3 text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b"
              >
                <td className="py-4">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                </td>

                <td className="py-4 font-medium">
                  {category.name}
                </td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      category.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category.is_active
                      ? "Activa"
                      : "Inactiva"}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        onEdit(category)
                      }
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        toggleStatus(category)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Estado
                    </button>

                    <button
                      onClick={() =>
                        deleteCategory(category.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
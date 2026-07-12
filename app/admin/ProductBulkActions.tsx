"use client";

import { supabase } from "@/lib/supabase/client";

interface Props {
  selectedProducts: string[];
  onFinish: () => void;
}

export default function ProductBulkActions({
  selectedProducts,
  onFinish,
}: Props) {
  async function updateProducts(
    data: Record<string, unknown>
  ) {
    if (selectedProducts.length === 0) {
      alert("Seleccione productos");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update(data)
      .in("id", selectedProducts);

    if (error) {
      alert(error.message);
      return;
    }

    onFinish();
  }

  async function deleteProducts() {
    if (selectedProducts.length === 0) {
      alert("Seleccione productos");
      return;
    }

    const ok = confirm(
      `Eliminar ${selectedProducts.length} productos?`
    );

    if (!ok) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .in("id", selectedProducts);

    if (error) {
      alert(error.message);
      return;
    }

    onFinish();
  }

  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <button
        onClick={() =>
          updateProducts({ active: true })
        }
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Activar
      </button>

      <button
        onClick={() =>
          updateProducts({ active: false })
        }
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Desactivar
      </button>

      <button
        onClick={() =>
          updateProducts({ featured: true })
        }
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Destacar
      </button>

      <button
        onClick={deleteProducts}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Eliminar
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function uploadImage() {
    if (!imageFile) return null;

    const ext =
      imageFile.name.split(".").pop();

    const fileName =
      `${Date.now()}.${ext}`;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(fileName, imageFile);

    if (error) throw error;

    const { data } =
      supabase.storage
        .from("products")
        .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const slug =
        createSlug(name);

      const { data: exists } =
        await supabase
          .from("categories")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

      if (exists) {
        alert(
          "La categoría ya existe"
        );
        return;
      }

      const image =
        await uploadImage();

      const { error } =
        await supabase
          .from("categories")
          .insert([
            {
              name,
              slug,
              image,
            },
          ]);

      if (error)
        throw error;

      alert(
        "Categoría creada"
      );

      setName("");
      setImageFile(null);

      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Nueva Categoría
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Nombre"
          className="
            w-full
            border
            p-3
            rounded
          "
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files?.[0] ||
                null
            )
          }
        />

        <button
          disabled={loading}
          className="
            bg-pink-500
            text-white
            px-5
            py-3
            rounded
          "
        >
          {loading
            ? "Guardando..."
            : "Guardar"}
        </button>
      </form>
    </div>
  );
}
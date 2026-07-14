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
  category?: Category | null;
  onSaved: () => void;
  onCancel: () => void;
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export default function CategoryForm({
  category,
  onSaved,
  onCancel,
}: Props) {
  const [name, setName] = useState("");
  const [currentImage, setCurrentImage] =
    useState<string | null>(null);
  const [imageFile, setImageFile] =
    useState<File | null>(null);
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setCurrentImage(category.image);
    } else {
      setName("");
      setCurrentImage(null);
      setImageFile(null);
    }
  }, [category]);

  async function uploadImage() {
    if (!imageFile) return currentImage;

    const ext =
      imageFile.name.split(".").pop();

    const fileName = `categories/${Date.now()}.${ext}`;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(fileName, imageFile, {
          upsert: true,
        });

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

      const slug = createSlug(name);

      const image =
        await uploadImage();

      if (category) {
        const { error } =
          await supabase
            .from("categories")
            .update({
              name,
              slug,
              image,
            })
            .eq("id", category.id);

        if (error) throw error;

        alert(
          "Categoría actualizada correctamente."
        );
      } else {
        const { data: exists } =
          await supabase
            .from("categories")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();

        if (exists) {
          alert(
            "Ya existe una categoría con ese nombre."
          );
          return;
        }

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

        if (error) throw error;

        alert(
          "Categoría creada correctamente."
        );
      }

      onSaved();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        {category
          ? "Editar Categoría"
          : "Nueva Categoría"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Nombre"
          className="w-full border rounded-lg p-3"
          required
        />

        {currentImage && (
          <img
            src={currentImage}
            alt="Categoría"
            className="w-28 h-28 rounded-lg object-cover"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files?.[0] ?? null
            )
          }
        />

        <div className="flex gap-3">
          <button
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Guardando..."
              : category
              ? "Actualizar"
              : "Guardar"}
          </button>

          {category && (
            <button
              type="button"
              onClick={onCancel}
              className="border px-6 py-3 rounded-lg"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
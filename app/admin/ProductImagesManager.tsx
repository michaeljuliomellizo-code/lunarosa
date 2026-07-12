"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  productId: string;
}

interface ProductImage {
  id: string;
  url: string;
}

export default function ProductImagesManager({
  productId,
}: Props) {
  const [images, setImages] =
    useState<ProductImage[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function loadImages() {
    const { data } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("created_at");

    setImages(data || []);
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function uploadImage(
    file: File
  ) {
    try {
      setLoading(true);

      const extension =
        file.name.split(".").pop();

      const fileName =
        `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${extension}`;

      const { error } =
        await supabase.storage
          .from("products")
          .upload(fileName, file);

      if (error) {
        alert(error.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("products")
          .getPublicUrl(fileName);

      const { error: insertError } =
        await supabase
          .from("product_images")
          .insert([
            {
              product_id:
                productId,
              url: data.publicUrl,
            },
          ]);

      if (insertError) {
        alert(
          insertError.message
        );
        return;
      }

      loadImages();
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(
    id: string
  ) {
    const ok = confirm(
      "¿Eliminar imagen?"
    );

    if (!ok) return;

    const { error } =
      await supabase
        .from("product_images")
        .delete()
        .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadImages();
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Galería de Imágenes
      </h2>

      <input
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file)
            uploadImage(file);
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg p-2"
          >
            <img
              src={image.url}
              alt=""
              className="
                w-full
                h-40
                object-cover
                rounded
              "
            />

            <button
              onClick={() =>
                deleteImage(
                  image.id
                )
              }
              className="
                w-full
                mt-2
                bg-red-500
                text-white
                py-2
                rounded
              "
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
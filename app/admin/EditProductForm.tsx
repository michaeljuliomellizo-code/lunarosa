"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ProductImagesManager from "@/app/admin/ProductImagesManager";
import ProductVariantsManager from "@/app/admin/ProductVariantsManager";

interface Category {
  id: string;
  name: string;
}

interface Props {
  productId: string;
}

export default function EditProductForm({
  productId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [comparePrice, setComparePrice] =
    useState("");

  const [stock, setStock] = useState("");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  const [image, setImage] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("id,name")
      .order("name");

    setCategories(data || []);
  }

  async function loadProduct() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
      alert(error.message);
      return;
    }

    setName(data.name || "");
    setSlug(data.slug || "");

    setCategoryId(
      data.category_id || ""
    );

    setDescription(
      data.description || ""
    );

    setPrice(
      String(data.price || "")
    );

    setComparePrice(
      data.compare_price
        ? String(data.compare_price)
        : ""
    );

    setStock(
      String(data.stock || "")
    );

    setFeatured(
      data.featured || false
    );

    setActive(
      data.active ?? true
    );

    setImage(
      data.image || null
    );
  }

  async function uploadImage() {
    if (!imageFile) return image;

    const extension =
      imageFile.name.split(".").pop();

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(fileName, imageFile);

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
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

      const imageUrl =
        await uploadImage();

      const { error } =
        await supabase
          .from("products")
          .update({
            name,
            category_id:
              categoryId || null,
            description,
            price: Number(price),
            compare_price:
              comparePrice
                ? Number(comparePrice)
                : null,
            stock: Number(stock),
            featured,
            active,
            image: imageUrl,
          })
          .eq("id", productId);

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Producto actualizado correctamente"
      );

      router.push(
        "/admin/productos"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Error actualizando producto"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-8">
        Editar Producto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2">
            Nombre
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Slug
          </label>

          <input
            value={slug}
            readOnly
            className="
              w-full
              border
              p-3
              rounded
              bg-gray-100
            "
          />
        </div>

        <div>
          <label className="block mb-2">
            Categoría
          </label>

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          >
            <option value="">
              Seleccione
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Descripción
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Precio
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Precio Anterior
          </label>

          <input
            type="number"
            value={comparePrice}
            onChange={(e) =>
              setComparePrice(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Imagen actual */}

        <div>
          <label className="block mb-2">
            Imagen Actual
          </label>

          {image ? (
            <img
              src={image}
              alt={name}
              className="
                w-40
                h-40
                object-cover
                rounded-lg
                border
              "
            />
          ) : (
            <p>
              No tiene imagen
            </p>
          )}
        </div>

        {/* Nueva imagen */}

        <div>
          <label className="block mb-2">
            Nueva Imagen
          </label>

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
        </div>

        <div className="flex gap-8">
          <label>
            <input
              type="checkbox"
              checked={
                featured
              }
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />
            {" "}Destacado
          </label>

          <label>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) =>
                setActive(
                  e.target.checked
                )
              }
            />
            {" "}Activo
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            bg-pink-500
            hover:bg-pink-600
            text-white
            px-6
            py-3
            rounded
          "
        >
          {loading
            ? "Guardando..."
            : "Actualizar Producto"}
        </button>
      </form>

      <ProductImagesManager
        productId={productId}
      />
      <ProductVariantsManager
        productId={productId}
      />
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
}

export default function ProductForm() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");

  const [stock, setStock] = useState("");

  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  const [imageFile, setImageFile] =
    useState<File | null>(null);
  
  const [variants, setVariants] = useState([
  {
    size: "",
    color: "",
    stock: "",
    price: "",
  },
]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("id,name")
      .eq("is_active", true)
      .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setCategories(data || []);
  }
  
  function addVariant() {
    setVariants([
      ...variants,
      {
        size: "",
        color: "",
        stock: "",
        price: "",
      },
    ]);
  }

  function removeVariant(index: number) {
    setVariants(
      variants.filter((_, i) => i !== index)
    );
  }

  function updateVariant(
    index: number,
    field: "size" | "color" | "stock" | "price",
    value: string
  ) {
    const copy = [...variants];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setVariants(copy);
  }

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const { data: existingProduct } =
        await supabase
          .from("products")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

      if (existingProduct) {
        alert(
          "Ya existe un producto con ese nombre."
        );
        return;
      }

      let imageUrl: string | null = null;

      if (imageFile) {
        const extension =
          imageFile.name.split(".").pop();

        const fileName =
          `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("products")
            .upload(fileName, imageFile);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { data: product, error } =
        await supabase
          .from("products")
          .insert([
            {
              name,
              slug,
              category_id: categoryId || null,
              description,
              price: Number(price),
              compare_price: comparePrice
                ? Number(comparePrice)
                : null,
              stock: Number(stock),
              image: imageUrl,
              featured,
              active,
            },
          ])
          .select()
          .single();

      if (error) {
        alert(error.message);
        return;
      }

      if (variants.length > 0) {
        const variantsToInsert = variants
          .filter(
            (v) =>
              v.size.trim() !== "" &&
              v.stock !== ""
          )
          .map((v) => ({
            product_id: product.id,
            size: v.size,
            color: v.color,
            stock: Number(v.stock),
            price: v.price
              ? Number(v.price)
              : Number(price),
            active: true,
          }));

        if (variantsToInsert.length > 0) {
          const { error: variantError } =
            await supabase
              .from("product_variants")
              .insert(variantsToInsert);

          if (variantError) {
            alert(variantError.message);
            return;
          }
        }
      }

      alert(
        "Producto creado correctamente"
      );

      setName("");
      setSlug("");

      setCategoryId("");

      setDescription("");

      setPrice("");
      setComparePrice("");

      setStock("");

      setFeatured(false);
      setActive(true);

      setImageFile(null);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        "Error al crear el producto"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Nuevo Producto
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2 font-medium">
            Nombre
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              const value =
                e.target.value;

              setName(value);
              setSlug(
                createSlug(value)
              );
            }}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            value={slug}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Categoría
          </label>

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Seleccione una categoría
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
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
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div className="border rounded-xl p-5 bg-gray-50">

          <div className="flex items-center justify-between mb-4">

            <h3 className="text-xl font-bold">
              Tallas / Variantes
            </h3>

            <button
              type="button"
              onClick={addVariant}
              className="
                bg-pink-500
                hover:bg-pink-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Agregar talla
            </button>

          </div>

          <div className="space-y-4">

            {variants.map(
              (variant, index) => (

                <div
                  key={index}
                  className="
                    border
                    rounded-xl
                    bg-white
                    p-4
                  "
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">

                    <div>

                      <label className="block mb-1 text-sm font-medium">
                        Talla
                      </label>

                      <input
                        type="text"
                        placeholder="S"
                        value={variant.size}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "size",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          border
                          rounded-lg
                          p-3
                        "
                      />

                    </div>

                    <div>

                      <label className="block mb-1 text-sm font-medium">
                        Color
                      </label>

                      <input
                        type="text"
                        placeholder="Negro"
                        value={variant.color}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "color",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          border
                          rounded-lg
                          p-3
                        "
                      />

                    </div>

                    <div>

                      <label className="block mb-1 text-sm font-medium">
                        Precio
                      </label>

                      <input
                        type="number"
                        placeholder={price}
                        value={variant.price}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          border
                          rounded-lg
                          p-3
                        "
                      />

                    </div>

                    <div>

                      <label className="block mb-1 text-sm font-medium">
                        Stock
                      </label>

                      <input
                        type="number"
                        placeholder="0"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "stock",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          border
                          rounded-lg
                          p-3
                        "
                      />

                    </div>

                  </div>

                  <div className="mt-4 flex justify-end">

                    <button
                      type="button"
                      onClick={() =>
                        removeVariant(index)
                      }
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Eliminar
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>    

        <div>
          <label className="block mb-2 font-medium">
            Imagen
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          <label>
            Producto destacado
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
          />

          <label>
            Producto activo
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-pink-500
            hover:bg-pink-600
            text-white
            py-3
            rounded-lg
          "
        >
          {loading
            ? "Guardando..."
            : "Guardar Producto"}
        </button>
      </form>
    </div>
  );
}
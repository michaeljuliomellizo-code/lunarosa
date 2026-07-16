"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  productId: string;
}

interface Variant {
  id: string;
  color: string;
  size: string;
  sku: string | null;
  stock: number;
  price: number;
  image: string | null;
  active: boolean;
}

export default function ProductVariantsManager({
  productId,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [savingAll, setSavingAll] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [variants, setVariants] =
    useState<Variant[]>([]);

  const [color, setColor] =
    useState("");

  const [size, setSize] =
    useState("");

  const [sku, setSku] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [active, setActive] =
    useState(true);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  useEffect(() => {
    loadVariants();
  }, [productId]);

  const totalStock = useMemo(
    () =>
      variants.reduce(
        (acc, item) =>
          acc + Number(item.stock),
        0
      ),
    [variants]
  );

  const activeVariants = useMemo(
    () =>
      variants.filter(
        (v) => v.active
      ).length,
    [variants]
  );

  async function loadVariants() {
    const { data, error } =
      await supabase
        .from("product_variants")
        .select("*")
        .eq(
          "product_id",
          productId
        )
        .order("color");

    if (error) {
      console.error(error);
      return;
    }

    setVariants(
      (data || []) as Variant[]
    );
  }

  async function uploadImage() {
    if (!imageFile)
      return null;

    const extension =
      imageFile.name
        .split(".")
        .pop();

    const fileName =
      `variants/${Date.now()}-${Math.random()
        .toString(36)
        .substring(
          2,
          10
        )}.${extension}`;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(
          fileName,
          imageFile,
          {
            upsert: true,
          }
        );

    if (error)
      throw new Error(
        error.message
      );

    const { data } =
      supabase.storage
        .from("products")
        .getPublicUrl(
          fileName
        );

    return data.publicUrl;
  }

  async function uploadVariantImage(
    variantId: string,
    file: File
  ) {
    try {
      setUploadingImage(
        true
      );

      const extension =
        file.name
          .split(".")
          .pop();

      const fileName =
        `variants/${variantId}-${Date.now()}.${extension}`;

      const { error } =
        await supabase.storage
          .from("products")
          .upload(
            fileName,
            file,
            {
              upsert: true,
            }
          );

      if (error)
        throw error;

      const { data } =
        supabase.storage
          .from("products")
          .getPublicUrl(
            fileName
          );

      await supabase
        .from(
          "product_variants"
        )
        .update({
          image:
            data.publicUrl,
        })
        .eq(
          "id",
          variantId
        );

      setVariants(
        (prev) =>
          prev.map(
            (variant) =>
              variant.id ===
              variantId
                ? {
                    ...variant,
                    image:
                      data.publicUrl,
                  }
                : variant
          )
      );
    } catch (
      error: any
    ) {
      alert(
        error.message
      );
    } finally {
      setUploadingImage(
        false
      );
    }
  }

  function updateLocalVariant(
    id: string,
    field: keyof Variant,
    value: Variant[keyof Variant]
  ) {
    setVariants(
      (prev) =>
        prev.map(
          (variant) =>
            variant.id ===
            id
              ? {
                  ...variant,
                  [field]:
                    value,
                }
              : variant
        )
    );
  }
    async function createVariant() {
    if (!color.trim() || !size.trim()) {
      alert("Color y talla son obligatorios");
      return;
    }

    try {
      setLoading(true);

      const image =
        await uploadImage();

      const { error } =
        await supabase
          .from("product_variants")
          .insert([
            {
              product_id:
                productId,
              color,
              size,
              sku:
                sku || null,
              stock:
                Number(stock) ||
                0,
              price:
                Number(price) ||
                0,
              image,
              active,
            },
          ]);

      if (error)
        throw error;

      setColor("");
      setSize("");
      setSku("");
      setStock("");
      setPrice("");
      setImageFile(
        null
      );
      setActive(true);

      await loadVariants();
    } catch (
      error: any
    ) {
      alert(
        error.message
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  async function updateVariant(
    variant: Variant
  ) {
    try {
      const { error } =
        await supabase
          .from(
            "product_variants"
          )
          .update({
            color:
              variant.color,
            size:
              variant.size,
            sku:
              variant.sku,
            stock:
              variant.stock,
            price:
              variant.price,
            image:
              variant.image,
            active:
              variant.active,
          })
          .eq(
            "id",
            variant.id
          );

      if (error)
        throw error;
    } catch (
      error: any
    ) {
      alert(
        error.message
      );
    }
  }

  async function saveAllVariants() {
    try {
      setSavingAll(
        true
      );

      await Promise.all(
        variants.map(
          async (
            variant
          ) => {
            const {
              error,
            } =
              await supabase
                .from(
                  "product_variants"
                )
                .update({
                  color:
                    variant.color,
                  size:
                    variant.size,
                  sku:
                    variant.sku,
                  stock:
                    variant.stock,
                  price:
                    variant.price,
                  image:
                    variant.image,
                  active:
                    variant.active,
                })
                .eq(
                  "id",
                  variant.id
                );

            if (error)
              throw error;
          }
        )
      );

      alert(
        "Todas las variantes fueron actualizadas correctamente."
      );

      await loadVariants();
    } catch (
      error: any
    ) {
      alert(
        error.message
      );
    } finally {
      setSavingAll(
        false
      );
    }
  }

  async function deleteVariant(
    id: string
  ) {
    const ok =
      confirm(
        "¿Eliminar esta variante?"
      );

    if (!ok)
      return;

    try {
      setLoading(
        true
      );

      const { error } =
        await supabase
          .from(
            "product_variants"
          )
          .delete()
          .eq("id", id);

      if (error)
        throw error;

      setVariants(
        (
          prev
        ) =>
          prev.filter(
            (
              variant
            ) =>
              variant.id !==
              id
          )
      );
    } catch (
      error: any
    ) {
      alert(
        error.message
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <div className="mt-12">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Variantes del Producto
          </h2>

          <p className="text-gray-600 mt-1">
            Administra colores,
            tallas, inventario,
            imágenes y precios.
          </p>

        </div>

        <button
          onClick={
            saveAllVariants
          }
          disabled={
            savingAll ||
            variants.length ===
              0
          }
          className="
            bg-green-600
            hover:bg-green-700
            disabled:bg-gray-400
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          {savingAll
            ? "Guardando..."
            : "💾 Guardar Todos"}
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="bg-white rounded-xl border shadow-sm p-5">

          <p className="text-sm text-gray-600">
            Variantes
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {variants.length}
          </h3>

        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">

          <p className="text-sm text-gray-600">
            Activas
          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-600">
            {
              activeVariants
            }
          </h3>

        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">

          <p className="text-sm text-gray-600">
            Inventario
          </p>

          <h3 className="text-3xl font-bold mt-2 text-pink-600">
            {totalStock}
          </h3>

        </div>

      </div>

      <div className="bg-white border rounded-2xl shadow-md p-8 mb-12">

        <h3 className="font-semibold text-xl mb-6">
          Nueva Variante
        </h3>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">

                  <div>

            <label className="block mb-2 font-medium">
              Color
            </label>

            <input
              value={color}
              onChange={(e) =>
                setColor(
                  e.target.value
                )
              }
              placeholder="Ej: Negro"
              className="
                w-full
                rounded-xl
                border
                p-3
                focus:ring-2
                focus:ring-pink-400
                outline-none
              "
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Talla
            </label>

            <input
              value={size}
              onChange={(e) =>
                setSize(
                  e.target.value
                )
              }
              placeholder="Ej: M"
              className="
                w-full
                rounded-xl
                border
                p-3
                focus:ring-2
                focus:ring-pink-400
                outline-none
              "
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              SKU
            </label>

            <input
              value={sku}
              onChange={(e) =>
                setSku(
                  e.target.value
                )
              }
              placeholder="SKU"
              className="
                w-full
                rounded-xl
                border
                p-3
                focus:ring-2
                focus:ring-pink-400
                outline-none
              "
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
              placeholder="0"
              className="
                w-full
                rounded-xl
                border
                p-3
                focus:ring-2
                focus:ring-pink-400
                outline-none
              "
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
              placeholder="0"
              className="
                w-full
                rounded-xl
                border
                p-3
                focus:ring-2
                focus:ring-pink-400
                outline-none
              "
            />

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
                  e.target.files?.[0] ??
                    null
                )
              }
              className="
                w-full
                rounded-xl
                border
                p-2
              "
            />

          </div>

          <div className="flex flex-col justify-end">

            <label className="font-medium mb-3">
              Estado
            </label>

            <button
              type="button"
              onClick={() =>
                setActive(
                  !active
                )
              }
              className={`
                relative
                w-16
                h-9
                rounded-full
                transition-all
                duration-300
                ${
                  active
                    ? "bg-green-500"
                    : "bg-gray-300"
                }
              `}
            >

              <span
                className={`
                  absolute
                  top-1
                  h-7
                  w-7
                  rounded-full
                  bg-white
                  shadow-md
                  transition-all
                  duration-300
                  ${
                    active
                      ? "left-8"
                      : "left-1"
                  }
                `}
              />

            </button>

            <span
              className={`
                mt-3
                text-sm
                font-medium
                ${
                  active
                    ? "text-green-600"
                    : "text-red-500"
                }
              `}
            >
              {active
                ? "Visible en tienda"
                : "Oculta"}
            </span>

          </div>

          <div className="flex items-end">

            <button
              onClick={
                createVariant
              }
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-pink-600
                hover:bg-pink-700
                disabled:bg-gray-400
                text-white
                py-3
                font-semibold
                transition
              "
            >
              {loading
                ? "Creando..."
                : "➕ Agregar Variante"}
            </button>

          </div>

        </div>

        {imageFile && (

          <div className="mt-8">

            <p className="font-medium mb-3">
              Vista previa
            </p>

            <img
              src={URL.createObjectURL(
                imageFile
              )}
              alt="Preview"
              className="
                w-44
                h-44
                rounded-2xl
                object-cover
                border
                shadow-lg
              "
            />

          </div>

        )}

      </div>
    
      <div className="space-y-8">
        
  {variants.map((variant) => {

    const lowStock =
      variant.stock <= 5;

    return (

      <div
        key={variant.id}
        className="
          bg-white
          rounded-2xl
          border
          shadow-md
          hover:shadow-xl
          transition-all
          overflow-hidden
        "
      >

        <div className="bg-gray-50 border-b px-8 py-5 flex justify-between items-center">

          <div>

            <h3 className="text-xl font-bold">
              {variant.color} · {variant.size}
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              SKU: {variant.sku || "-"}
            </p>

          </div>

          <div className="flex gap-3">

            <span
              className={`
                px-4
                py-1
                rounded-full
                text-sm
                font-semibold
                ${
                  variant.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }
              `}
            >
              {variant.active
                ? "Activa"
                : "Oculta"}
            </span>

            <span
              className={`
                px-4
                py-1
                rounded-full
                text-sm
                font-semibold
                ${
                  lowStock
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >
              {lowStock
                ? "Stock Bajo"
                : "Disponible"}
            </span>

          </div>

        </div>

        <div className="grid xl:grid-cols-6 lg:grid-cols-3 gap-8 p-8">

          <div className="flex flex-col items-center">

            {variant.image ? (

              <img
                src={variant.image}
                alt={variant.color}
                className="
                  w-36
                  h-36
                  rounded-2xl
                  object-cover
                  border
                  shadow
                "
              />

            ) : (

              <div
                className="
                  w-36
                  h-36
                  rounded-2xl
                  border-2
                  border-dashed
                  flex
                  items-center
                  justify-center
                  text-gray-500
                "
              >
                Sin imagen
              </div>

            )}

            <input
              type="file"
              accept="image/*"
              id={`image-${variant.id}`}
              className="hidden"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (!file)
                  return;

                uploadVariantImage(
                  variant.id,
                  file
                );

              }}
            />

            <label
              htmlFor={`image-${variant.id}`}
              className="
                mt-5
                cursor-pointer
                bg-pink-600
                hover:bg-pink-700
                text-white
                px-5
                py-2
                rounded-xl
                transition
              "
            >
              Cambiar Imagen
            </label>

          </div>

          <div>

            <label className="font-semibold">
              Color
            </label>

            <input
              value={variant.color}
              onChange={(e) =>
                updateLocalVariant(
                  variant.id,
                  "color",
                  e.target.value
                )
              }
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <div>

            <label className="font-semibold">
              Talla
            </label>

            <input
              value={variant.size}
              onChange={(e) =>
                updateLocalVariant(
                  variant.id,
                  "size",
                  e.target.value
                )
              }
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <div>

            <label className="font-semibold">
              SKU
            </label>

            <input
              value={variant.sku || ""}
              onChange={(e) =>
                updateLocalVariant(
                  variant.id,
                  "sku",
                  e.target.value
                )
              }
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <div>

            <label className="font-semibold">
              Precio
            </label>

            <input
              type="number"
              value={variant.price}
              onChange={(e) =>
                updateLocalVariant(
                  variant.id,
                  "price",
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
              "
            />

            <label className="font-semibold block mt-6">
              Stock
            </label>

            <input
              type="number"
              value={variant.stock}
              onChange={(e) =>
                updateLocalVariant(
                  variant.id,
                  "stock",
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <div>

            <label className="font-semibold block mb-5">
              Visible
            </label>

            <button
              type="button"
              onClick={() =>
                updateLocalVariant(
                  variant.id,
                  "active",
                  !variant.active
                )
              }
              className={`
                relative
                w-16
                h-9
                rounded-full
                transition-all
                duration-300
                ${
                  variant.active
                    ? "bg-green-500"
                    : "bg-gray-300"
                }
              `}
            >

              <span
                className={`
                  absolute
                  top-1
                  h-7
                  w-7
                  rounded-full
                  bg-white
                  shadow
                  transition-all
                  duration-300
                  ${
                    variant.active
                      ? "left-8"
                      : "left-1"
                  }
                `}
              />

            </button>

            <p
              className={`
                mt-4
                text-sm
                font-medium
                ${
                  variant.active
                    ? "text-green-600"
                    : "text-red-500"
                }
              `}
            >
              {variant.active
                ? "Disponible en la tienda"
                : "Oculta para clientes"}
            </p>

            <button
              disabled={loading}
              onClick={() =>
                deleteVariant(
                  variant.id
                )
              }
              className="
                mt-8
                w-full
                bg-red-600
                hover:bg-red-700
                disabled:bg-gray-400
                text-white
                rounded-xl
                py-3
                transition
              "
            >
              🗑 Eliminar Variante
            </button>

          </div>

        </div>

      </div>

    );

  })}
        {variants.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          No existen variantes para este producto.
        </div>
      )}

    </div>

  </div>

);
}
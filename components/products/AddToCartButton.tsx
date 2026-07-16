"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string | null;
  };

  variantId?: string;

  color?: string;

  size?: string;

  sku?: string;
}

export default function AddToCartButton({
  product,
  variantId,
  color,
  size,
  sku,
}: Props) {
  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const [added, setAdded] =
    useState(false);

  function handleAdd() {
    console.log({
      productId: product.id,
      variantId: variantId,
      color: color,
      size: size,
    });
    addItem({
      id: product.id,
      variant_id:
        variantId || undefined,
      name: product.name,
      color,
      size,
      sku,
      price: Number(
        product.price
      ),
      quantity: 1,
      image:
        product.image || "",
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className="
        w-full
        bg-pink-500
        hover:bg-pink-600
        active:bg-pink-700
        text-white
        py-3
        px-4
        rounded-xl
        transition-all
        duration-300
        text-sm
        sm:text-base
        font-semibold
        hover:scale-[1.02]
        disabled:opacity-60
      "
    >
      {added
        ? "✓ Agregado"
        : "Agregar al carrito"}
    </button>
  );
}
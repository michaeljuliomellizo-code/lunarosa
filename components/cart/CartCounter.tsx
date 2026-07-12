"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartCounter() {
  const count =
    useCartStore(
      (state) =>
        state.getItemsCount()
    );

  return (
    <span
      className="
        bg-pink-500
        text-white
        text-xs
        px-2
        py-1
        rounded-full
      "
    >
      {count}
    </span>
  );
}
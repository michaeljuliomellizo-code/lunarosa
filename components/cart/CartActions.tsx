"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartActions() {

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  return (
    <div className="flex gap-4 mt-8">

      <button
        onClick={clearCart}
        className="border border-red-500 text-red-500 px-6 py-3 rounded-full"
      >
        Vaciar carrito
      </button>

      <button className="bg-black text-white px-6 py-3 rounded-full">
        Actualizar carrito
      </button>
    </div>
  );
}
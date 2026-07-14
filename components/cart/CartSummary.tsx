"use client";

import { useCartStore } from "@/store/cartStore";
import CartTotals from "./CartTotals"
import CartCheckoutButton from "./CartCheckoutButton";

export default function CartSummary() {

  const total = useCartStore(
    (state) => state.getTotal()
  );

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-5
        md:p-8
        lg:sticky
        lg:top-24
      "
    >

      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        Resumen
      </h2>

      <CartTotals />

      <div className="border-t mt-6 pt-6">

        <div className="flex justify-between text-xl md:text-2xl font-bold">

          <span>Total</span>

          <span className="text-pink-500">
            ${total}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <CartCheckoutButton />
      </div>
    </div>
  );
}
"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartTotals() {
  const subtotal =
    useCartStore(
      (state) =>
        state.getSubtotal()
    );

  const discount =
    useCartStore(
      (state) =>
        state.getDiscountAmount()
    );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Subtotal</span>

        <span>
          $
          {subtotal.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Descuento</span>

        <span>
          -$
          {discount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
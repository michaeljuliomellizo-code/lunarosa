"use client";

import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";

export default function CartList() {

  const items = useCartStore(
    (state) => state.items
  );

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div
      className="
        space-y-4
        sm:space-y-6
      "
    >

      {items.map((item, index) => (
        <CartItem
          key={`${item.id}-${item.variant_id}-${index}`}
          item={item}
        />
      ))}
    </div>
  );
}
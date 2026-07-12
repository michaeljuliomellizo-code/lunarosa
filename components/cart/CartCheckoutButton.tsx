"use client";

import { useRouter } from "next/navigation";

export default function CartCheckoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push("/checkout")
      }
      className="
        w-full
        bg-pink-500
        text-white
        py-4
        rounded-lg
      "
    >
      Ir al Checkout
    </button>
  );
}
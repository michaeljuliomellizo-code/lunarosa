"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function CartCoupon() {

  const { isDark } =
  useTheme();
  
  return (
    <div className="bg-white border rounded-3xl p-6">
      <h3 className="text-xl font-bold mb-4">
        Cupón de descuento
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Código"
          className="
            w-full
            flex-1
            border
            rounded-full
            px-5
            py-3
          "
        />

        <button
          className="
            w-full
            sm:w-auto
            bg-pink-400
            hover:bg-pink-500
            text-white
            px-6
            py-3
            rounded-full
            transition
          "
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
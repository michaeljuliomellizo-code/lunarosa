"use client";

import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

interface Props {
  item: {
    id: string;
    variant_id?: string;
    name: string;
    color?: string;
    size?: string;
    sku?: string;
    price: number;
    quantity: number;
    image?: string;
  };
}

export default function CartItem({
  item,
}: Props) {
 

  const removeItem =
    useCartStore(
      (state) =>
        state.removeItem
    );

  const increaseQuantity =
    useCartStore(
      (state) =>
        state.increaseQuantity
    );

  const decreaseQuantity =
    useCartStore(
      (state) =>
        state.decreaseQuantity
    );

  return (
    <div className="
      bg-white
      border
      rounded-2xl
      p-4
      sm:p-6
      flex
      flex-col
      md:flex-row
      gap-4
      sm:gap-6
    ">
      <div className="
        relative
        w-full
        sm:w-64
        md:w-40
        h-60
        sm:h-72
        md:h-40
        mx-auto
        md:mx-0
        rounded-2xl
        overflow-hidden
        bg-pink-50
      ">
        <Image
          src={
            item.image ||
            "/placeholder.jpg"
          }
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="
          text-xl
          sm:text-2xl
          lg:text-3xl
          font-semibold
        ">
          {item.name}
        </h2>

        {item.color && (
          <p className="
            text-gray-600
            mt-3
            text-sm
            sm:text-base
          ">
            Color:{" "}
            <span className="font-medium">
              {item.color}
            </span>
          </p>
        )}

        {item.size && (
          <p className="
            text-pink-600
            text-2xl
            sm:text-3xl
            font-bold
            mt-4
          ">
            Talla:{" "}
            <span className="font-medium">
              {item.size}
            </span>
          </p>
        )}

        {item.sku && (
          <p className="
            text-gray-600
            mt-4
            text-sm
            sm:text-base
          ">
            SKU:{" "}
            <span className="font-medium">
              {item.sku}
            </span>
          </p>
        )}

        <p className="
          text-pink-600
          text-2xl
          sm:text-3xl
          font-bold
          mt-4
        ">
          $
          {Number(
            item.price
          ).toLocaleString()}
        </p>

        <div
          className="
            flex
            items-center
            justify-center
            md:justify-start
            gap-4
            mt-6
          "
        >
          <button
            type="button"
            onClick={() =>
              decreaseQuantity(
                item.id,
                item.variant_id ?? undefined
              )
            }
            className="
              w-11
              h-11
              sm:w-10
              sm:h-10
              border
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-pink-50
              transition
            "
          >
            <Minus size={18} />
          </button>
          <motion.span
            key={item.quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="font-bold text-lg"
          >
            {item.quantity}
          </motion.span>
          <button
            type="button"
            onClick={() =>
              increaseQuantity(
                item.id,
                item.variant_id ?? undefined
              )
            }
            className="
              w-10
              h-10
              border
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-pink-50
              transition
            "
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="mt-6">
          <p className="font-semibold">
            Subtotal:
          </p>

          <p className="
            text-2xl
            font-bold
            text-pink-600
          ">
            $
            {(
              item.price *
              item.quantity
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div
        className="
          flex
          justify-center
          md:justify-start
        "
      >
        <button
          onClick={() =>
            removeItem(
              item.id
            )
          }
          className="
            text-red-500
            hover:text-red-700
            p-2
            transition
          "
        >
          <Trash2 size={22} />
        </button>
      </div>
    </div>
  );
}
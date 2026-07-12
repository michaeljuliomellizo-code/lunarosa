"use client";

import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";

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
    <div className="bg-white border rounded-3xl p-6 flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-40 h-40 rounded-2xl overflow-hidden bg-pink-50">
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

      <div className="flex-1">
        <h2 className="text-2xl font-semibold">
          {item.name}
        </h2>

        {item.color && (
          <p className="text-gray-500 mt-2">
            Color:{" "}
            <span className="font-medium">
              {item.color}
            </span>
          </p>
        )}

        {item.size && (
          <p className="text-gray-500">
            Talla:{" "}
            <span className="font-medium">
              {item.size}
            </span>
          </p>
        )}

        {item.sku && (
          <p className="text-gray-500">
            SKU:{" "}
            <span className="font-medium">
              {item.sku}
            </span>
          </p>
        )}

        <p className="text-pink-600 text-2xl font-bold mt-4">
          $
          {Number(
            item.price
          ).toLocaleString()}
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() =>
              decreaseQuantity(
                item.id
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
            "
          >
            <Minus size={18} />
          </button>

          <span className="font-bold text-lg">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQuantity(
                item.id
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
            "
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="mt-4">
          <p className="font-semibold">
            Subtotal:
          </p>

          <p className="text-xl font-bold text-pink-600">
            $
            {(
              item.price *
              item.quantity
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={() =>
            removeItem(
              item.id
            )
          }
          className="
            text-red-500
            hover:text-red-700
          "
        >
          <Trash2 size={22} />
        </button>
      </div>
    </div>
  );
}
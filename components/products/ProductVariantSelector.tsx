"use client";

import { useMemo, useState } from "react";
import AddToCartButton from "./AddToCartButton";

interface Variant {
  id: string;
  color: string;
  size: string;
  sku: string;
  stock: number;
  price: number;
  image: string | null;
  active: boolean;
}

interface Props {
  product: {
    id: string;
    name: string;
    image: string | null;
    price: number;
  };

  variants: Variant[];
}

export default function ProductVariantSelector({
  product,
  variants,
}: Props) {
  const activeVariants = useMemo(
    () => variants.filter((v) => v.active),
    [variants]
  );

  const colors = useMemo(
    () => [...new Set(activeVariants.map((v) => v.color))],
    [activeVariants]
  );

  const [selectedColor, setSelectedColor] = useState(
    colors[0] ?? ""
  );

  const sizes = useMemo(() => {
    return [
      ...new Set(
        activeVariants
          .filter((v) => v.color === selectedColor)
          .map((v) => v.size)
      ),
    ];
  }, [activeVariants, selectedColor]);

  const [selectedSize, setSelectedSize] = useState("");

  const variant = activeVariants.find(
    (v) =>
      v.color === selectedColor &&
      v.size === selectedSize
  );

  return (
    <div className="space-y-5 sm:space-y-6">

      <div>
        <h3
          className="
            font-semibold
            text-base
            sm:text-lg
            mb-3
          "
        >
          Color
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                setSelectedColor(color);
                setSelectedSize("");
              }}
              className={`
                min-w-[90px]
                sm:min-w-[110px]
                px-4
                py-2
                rounded-xl
                border
                text-sm
                sm:text-base
                transition-all
                duration-200
                ${
                  selectedColor === color
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white hover:border-pink-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {selectedColor && (
        <div>
          <h3 className="font-semibold mb-3">
            Talla
          </h3>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setSelectedSize(size)
                }
                className={`
                  min-w-[90px]
                  sm:min-w-[110px]
                  px-4
                  py-2
                  rounded-xl
                  border
                  text-sm
                  sm:text-base
                  transition-all
                  duration-200
                  ${
                    selectedSize === size
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white hover:border-pink-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">

        {variant ? (
          <>
            <p
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-pink-600
              "
            >
              $
              {Number(
                variant.price > 0
                  ? variant.price
                  : product.price
              ).toLocaleString()}
            </p>

            <p
              className="
                text-green-600
                text-sm
                sm:text-base
                font-medium
              "
            >
              Stock: {variant.stock}
            </p>

            <p
              className="
                text-gray-500
                text-sm
                break-all
              "
            >
              SKU: {variant.sku}
            </p>

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                image:
                  variant.image ??
                  product.image,
                price:
                  variant.price > 0
                    ? variant.price
                    : product.price,
              }}
              variantId={variant.id}
              color={variant.color}
              size={variant.size}
              sku={variant.sku}
            />
          </>
        ) : (
          <button
            disabled
            className="
              w-full
              bg-gray-300
              text-gray-600
              py-3
              rounded-xl
              font-semibold
              cursor-not-allowed
            "
          >
            Selecciona color y talla
          </button>
        )}

      </div>

    </div>
  );
}
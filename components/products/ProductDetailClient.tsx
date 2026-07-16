"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import WishlistButton from "@/components/products/WishlistButton";
import AddToCartButton from "@/components/products/AddToCartButton";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  sku?: string;
  stock?: number;
  description?: string;
  compare_price?: number | null;
}

interface Variant {
  id: string;
  color?: string | null;
  size?: string | null;
  sku?: string | null;
  stock: number;
  price: number;
  image?: string | null;
  active: boolean;
}

interface Props {
  product: Product;
  variants: Variant[];
}

export default function ProductDetailClient({
  product,
  variants,
}: Props) {

  const colors = useMemo(
    () =>
      [...new Set(
        variants
          .filter(v => v.active)
          .map(v => v.color)
      )].filter(Boolean) as string[],
    [variants]
  );

  const [selectedColor, setSelectedColor] =
    useState(
      colors.length > 0
        ? colors[0]
        : ""
    );

  const availableSizes =
    useMemo(
      () =>
        variants.filter(
          v =>
            v.active &&
            v.color === selectedColor
        ),
      [variants, selectedColor]
    );

  const [selectedSize, setSelectedSize] =
    useState("");

  useEffect(() => {

    if (
      availableSizes.length > 0
    ) {

      setSelectedSize(
        availableSizes[0].size ?? ""
      );

    }

  }, [availableSizes]);

  const selectedVariant =
    useMemo(
      () =>
        variants.find(
          v =>
            v.active &&
            v.color === selectedColor &&
            v.size === selectedSize
        ) ?? null,
      [
        variants,
        selectedColor,
        selectedSize,
      ]
    );

  const currentImage =
    selectedVariant?.image &&
    selectedVariant.image.length > 0
      ? selectedVariant.image
      : product.image;

  const currentPrice =
    selectedVariant?.price ??
    product.price;

  const currentStock =
    selectedVariant?.stock ??
    product.stock ??
    0;

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div>

        <div className="relative w-full overflow-hidden rounded-3xl border bg-pink-50">

          <Image
            src={currentImage}
            alt={product.name}
            width={700}
            height={900}
            priority
            className="w-full h-auto object-cover"
          />

        </div>

      </div>

      <div className="flex flex-col">

        <h1 className="text-3xl lg:text-4xl font-bold">

          {product.name}

        </h1>

        {product.description && (

          <p className="mt-5 text-gray-700 leading-7">

            {product.description}

          </p>

        )}

        <div className="mt-8">

          <p className="text-4xl font-bold text-pink-600">

            $

            {Number(currentPrice).toLocaleString(
              "es-CO"
            )}

          </p>

          {product.compare_price && (

            <p className="text-lg text-gray-500 line-through">

              $

              {Number(
                product.compare_price
              ).toLocaleString("es-CO")}

            </p>

          )}

        </div>

        <div className="mt-4">

          {currentStock > 0 ? (

            <span className="font-semibold text-green-600">

              Disponible

            </span>

          ) : (

            <span className="font-semibold text-red-600">

              Agotado

            </span>

          )}

        </div>

        <div className="mt-8">

          <h3 className="font-semibold mb-3">

            Color

          </h3>

          <div className="flex flex-wrap gap-3">

            {colors.map((color) => (

              <button
                key={color}
                type="button"
                onClick={() =>
                  setSelectedColor(color)
                }
                className={`
                  px-5
                  py-2
                  rounded-full
                  border
                  transition-all
                  ${
                    selectedColor === color
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white border-gray-300 hover:border-pink-500"
                  }
                `}
              >

                {color}

              </button>

            ))}

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-semibold mb-3">

            Talla

          </h3>

          <div className="flex flex-wrap gap-3">

            {availableSizes.map((variant) => (

              <button
                key={variant.id}
                type="button"
                onClick={() =>
                  setSelectedSize(
                    variant.size ?? ""
                  )
                }
                disabled={
                  variant.stock <= 0
                }
                className={`
                  w-14
                  h-14
                  rounded-xl
                  border
                  font-semibold
                  transition-all
                  ${
                    selectedSize ===
                    variant.size
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white border-gray-300"
                  }
                  ${
                    variant.stock <= 0
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:border-pink-500"
                  }
                `}
              >

                {variant.size}

              </button>

            ))}

          </div>

        </div>
                <div className="mt-10">

          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              image: currentImage,
              price: currentPrice,
            }}
            variantId={
              selectedVariant?.id ?? ""
            }
            color={
              selectedVariant?.color ?? ""
            }
            size={
              selectedVariant?.size ?? ""
            }
            sku={
              selectedVariant?.sku ??
              product.sku ??
              ""
            }
          />

        </div>

        <div className="mt-6">

          <WishlistButton
            productId={product.id}
          />

        </div>

        {selectedVariant && (

          <div className="mt-8 rounded-xl border bg-gray-50 p-4 space-y-2 text-sm">

            {selectedVariant.sku && (

              <p>

                <span className="font-semibold">

                  SKU:

                </span>{" "}

                {selectedVariant.sku}

              </p>

            )}

            <p>

              <span className="font-semibold">

                Color:

              </span>{" "}

              {selectedVariant.color}

            </p>

            <p>

              <span className="font-semibold">

                Talla:

              </span>{" "}

              {selectedVariant.size}

            </p>

            <p>

              <span className="font-semibold">

                Stock:

              </span>{" "}

              {selectedVariant.stock}

            </p>

          </div>

        )}

      </div>

    </div>

  );

}
"use client";

import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden hover:shadow-xl transition">
      <Link
        href={`/producto/${product.slug}`}
      >
        <div className="relative h-80 bg-pink-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />

          <div className="absolute top-4 right-4 z-10">
            <WishlistButton
              productId={product.id}
            />
          </div>
        </div>
      </Link>

      <div className="p-6">
        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p className="text-pink-500 text-2xl font-bold mt-2">
          $
          {Number(
            product.price
          ).toLocaleString()}
        </p>

        <div className="mt-6">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>
    </div>
  );
}
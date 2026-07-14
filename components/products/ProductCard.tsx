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
    <div
      className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
        hover:shadow-xl
        transition-all
        duration-300
        h-full
        flex
        flex-col
      "
    >
      <Link
        href={`/producto/${product.slug}`}
      >
        <div
          className="
            relative
            h-48
            sm:h-60
            md:h-72
            lg:h-80
            bg-pink-50
          "
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw,
                  (max-width:1024px) 33vw,
                  25vw"
            className="
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />

          <div
            className="
              absolute
              top-2
              right-2
              sm:top-4
              sm:right-4
              z-10
            "
          >
            <WishlistButton
              productId={product.id}
            />
          </div>
        </div>
      </Link>

      <div
        className="
          p-4
          md:p-6
          flex
          flex-col
          flex-1
        "
      >
        <h3
          className="
            text-base
            sm:text-lg
            md:text-xl
            font-semibold
            line-clamp-2
            min-h-[3rem]
          "
        >
          {product.name}
        </h3>

        <p
          className="
            text-pink-500
            text-lg
            sm:text-xl
            md:text-2xl
            font-bold
            mt-2
          "
        >
          $
          {Number(
            product.price
          ).toLocaleString()}
        </p>

        <div
          className="
            mt-auto
            pt-4
          "
        >
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
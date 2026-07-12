"use client";

import Image from "next/image";

interface Props {
  product: any;
}

export default function ProductCard({
  product,
}: Props) {

  return (
    <div className="bg-white border rounded-3xl overflow-hidden">

      <div className="relative h-80">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <h2 className="text-2xl font-semibold">
          {product.name}
        </h2>

        <p className="text-pink-500 text-xl font-bold mt-3">
          ${product.price}
        </p>

        <button className="w-full mt-6 bg-pink-400 text-white py-4 rounded-full">

          Agregar al carrito

        </button>
      </div>
    </div>
  );
}
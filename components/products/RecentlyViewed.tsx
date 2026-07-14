"use client";

import Link from "next/link";

import { useRecentlyViewedStore }
from "@/store/recentlyViewedStore";

export default function RecentlyViewed() {

  const products =
    useRecentlyViewedStore(
      (state) =>
        state.products
    );

  if (
    products.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-6">
        Vistos Recientemente
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        {products.map(
          (product) => (
            <Link
              key={product.id}
              href={`/producto/${product.slug}`}
            >
              <div className="border rounded-xl p-3">

                <img
                  src={
                    product.image
                  }
                  alt={
                    product.name
                  }
                  className="
                    h-52
                    w-full
                    object-cover
                  "
                />

                <p className="mt-2">
                  {
                    product.name
                  }
                </p>

              </div>
            </Link>
          )
        )}

      </div>

    </div>
  );
}
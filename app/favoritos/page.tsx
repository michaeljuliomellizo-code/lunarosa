"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase/client";


export default function FavoritosPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } =
      await supabase
        .from("wishlist")
        .select(`
          product_id,
          products (*)
        `)
        .eq("user_id", user.id);

    const list =
      data?.map(
        (item: any) =>
          item.products
      ) || [];

    setProducts(list);
    setLoading(false);
  }

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-10
        lg:py-12
      "
    >
      <h1
        className="
          text-3xl
          sm:text-4xl
          font-bold
          mb-8
          sm:mb-10
        "
      >
        Mis Favoritos
      </h1>

      {loading && (
        <p className="text-center py-12">
          Cargando...
        </p>
      )}

      {!loading &&
        products.length === 0 && (
          <div
            className="
              bg-white
              rounded-3xl
              shadow
              p-10
              text-center
            "
          >
            <p className="text-lg text-gray-600">
              No tienes productos favoritos.
            </p>

            <Link
              href="/catalogo"
              className="
                inline-block
                mt-6
                bg-pink-500
                hover:bg-pink-600
                text-white
                px-6
                py-3
                rounded-full
                transition
              "
            >
              Ir al catálogo
            </Link>
          </div>
        )}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
          sm:gap-6
        "
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/producto/${product.slug}`}
            className="
              bg-white
              border
              rounded-2xl
              overflow-hidden
              hover:shadow-xl
              transition
            "
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="
                  w-full
                  aspect-[3/4]
                  object-cover
                "
              />
            )}

            <div className="p-4">
              <h2
                className="
                  font-semibold
                  text-sm
                  sm:text-base
                  line-clamp-2
                "
              >
                {product.name}
              </h2>

              <p
                className="
                  text-pink-600
                  font-bold
                  mt-2
                  text-lg
                "
              >
                $
                {Number(product.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
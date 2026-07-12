"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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
    <>


      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">
          Mis Favoritos
        </h1>

        {loading && (
          <p>Cargando...</p>
        )}

        {!loading &&
          products.length === 0 && (
            <p>
              No tienes productos
              favoritos.
            </p>
          )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(
            (product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="border rounded-xl overflow-hidden bg-white"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={
                      product.name
                    }
                    className="w-full h-72 object-cover"
                  />
                )}

                <div className="p-4">
                  <h2 className="font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-pink-600 font-bold mt-2">
                    $
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
      </main>

    </>
  );
}
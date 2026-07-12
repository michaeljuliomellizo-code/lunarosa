import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import ProductCard from "@/components/products/ProductCard";

export default async function FeaturedProducts() {
  const supabase =
    await createClient();

  const { data: products } =
    await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", {
        ascending: false,
      })
      .limit(8);

  return (
    <section className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold">
              Productos Destacados
            </h2>

            <p className="text-gray-600 mt-2">
              Los favoritos de
              nuestras clientes
            </p>
          </div>

          <Link
            href="/catalogo"
            className="
              text-pink-500
              font-semibold
            "
          >
            Ver todos →
          </Link>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
        >
          {products?.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: Number(
                    product.price
                  ),
                  image:
                    product.image ||
                    "",
                }}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import ProductCard from "@/components/products/ProductCard";
import { useTheme } from "../providers/ThemeProvider";


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
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:justify-between
            sm:items-center
            gap-4
            mb-12
          "
        >
          <div>
            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
              "
            >
              Productos Destacados
            </h2>

            <p
              className="
                text-gray-700
                mt-2
                text-sm
                md:text-base
              "
            >
              Los favoritos de
              nuestras clientes
            </p>
          </div>

          <Link
            href="/catalogo"
            className="
              text-pink-500
              font-semibold
              self-start
              sm:self-auto
            "
          >
            Ver todos →
          </Link>
        </div>

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-4
            md:gap-6
            lg:gap-8
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
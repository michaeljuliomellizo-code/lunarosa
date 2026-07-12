import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/server";

export default async function Categories() {
  const supabase =
    await createClient();

  const { data: categories } =
    await supabase
      .from("categories")
      .select("*")
      .eq(
        "is_active",
        true
      )
      .eq(
        "featured",
        true
      )
      .order(
        "sort_order",
        {
          ascending: true,
        }
      )
      .limit(8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold">
            Categorías
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Descubre nuestras colecciones exclusivas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categories?.map(
            (category: any) => (
              <Link
                key={category.id}
                href={`/catalogo?categoria=${category.slug}`}
              >
                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-md
                    hover:shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >

                  <div className="relative h-[420px] overflow-hidden">

                    <Image
                      src={
                        category.image
                      }
                      alt={
                        category.name
                      }
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/20
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        justify-end
                        p-6
                      "
                    >

                      <h3
                        className="
                          text-white
                          text-3xl
                          font-bold
                          transition-all
                          duration-300
                          group-hover:-translate-y-1
                        "
                      >
                        {category.name}
                      </h3>

                      <span
                        className="
                          mt-3
                          inline-flex
                          items-center
                          text-white
                          font-medium
                          opacity-0
                          translate-y-4
                          transition-all
                          duration-500
                          group-hover:opacity-100
                          group-hover:translate-y-0
                        "
                      >
                        Ver colección →
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            )
          )}

        </div>

      </div>
    </section>
  );
}
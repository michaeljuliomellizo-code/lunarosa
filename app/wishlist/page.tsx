import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function WishlistPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("wishlist")
    .select(`
      id,
      products (
        id,
        name,
        slug,
        price,
        image
      )
    `)
    .eq("user_id", user.id);

  return (
    <main
      className="
        min-h-screen
        bg-pink-50
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-10
        lg:py-16
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
        Mi Wishlist
      </h1>

      {!data?.length && (
        <div
          className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow
          "
        >
          <p className="text-lg text-gray-500">
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
          sm:gap-8
        "
      >
        {data?.map((item: any) => (
          <Link
            key={item.id}
            href={`/producto/${item.products.slug}`}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              shadow
              hover:shadow-xl
              transition
            "
          >
            {item.products.image && (
              <img
                src={item.products.image}
                alt={item.products.name}
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
                {item.products.name}
              </h2>

              <p
                className="
                  text-pink-500
                  font-bold
                  mt-2
                  text-lg
                "
              >
                $
                {Number(item.products.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
import Link from "next/link";
import { redirect } from "next/navigation";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10">
          Mi Wishlist
        </h1>

        {!data?.length && (
          <div className="bg-white rounded-xl p-8">
            No tienes favoritos.
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-8">
          {data?.map((item: any) => (
            <Link
              key={item.id}
              href={`/producto/${item.products.slug}`}
              className="
                bg-white
                rounded-xl
                overflow-hidden
                shadow
              "
            >
              {item.products.image && (
                <img
                  src={item.products.image}
                  alt={item.products.name}
                  className="
                    w-full
                    h-72
                    object-cover
                  "
                />
              )}

              <div className="p-4">
                <h2 className="font-semibold">
                  {item.products.name}
                </h2>

                <p className="text-pink-500 font-bold mt-2">
                  $
                  {Number(
                    item.products.price
                  ).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
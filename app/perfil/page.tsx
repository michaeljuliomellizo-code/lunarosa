import Link from "next/link";
import { redirect } from "next/navigation";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { createClient } from "@/lib/supabase/server";

export default async function PerfilPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  const { count } = await supabase
    .from("orders")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  return (
    <div className="min-h-screen bg-pink-50">
      

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-lg p-10">
          <div className="flex items-center gap-6">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="
                  w-28
                  h-28
                  rounded-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-pink-200
                "
              />
            )}

            <div>
              <h1 className="text-4xl font-bold">
                Mi Perfil
              </h1>

              <p className="text-gray-500 mt-2">
                Gestiona tu cuenta y pedidos
              </p>

              <p className="mt-3 font-medium">
                {profile?.email}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="font-semibold">
                Órdenes
              </h3>

              <p className="text-4xl font-bold mt-3 text-pink-500">
                {count || 0}
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="font-semibold">
                Cuenta
              </h3>

              <p className="mt-3">
                {profile?.role ||
                  "cliente"}
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="font-semibold">
                Estado
              </h3>

              <p className="mt-3">
                {profile?.active
                  ? "Activa"
                  : "Inactiva"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Información Personal
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Nombre
                  </label>

                  <input
                    value={
                      profile?.full_name ||
                      ""
                    }
                    disabled
                    className="
                      w-full
                      border
                      rounded-full
                      px-6
                      py-4
                      bg-gray-50
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Correo
                  </label>

                  <input
                    value={
                      profile?.email ||
                      ""
                    }
                    disabled
                    className="
                      w-full
                      border
                      rounded-full
                      px-6
                      py-4
                      bg-gray-50
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Teléfono
                  </label>

                  <input
                    value={
                      profile?.phone ||
                      ""
                    }
                    disabled
                    className="
                      w-full
                      border
                      rounded-full
                      px-6
                      py-4
                      bg-gray-50
                    "
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Mi Cuenta
              </h2>

              <div className="space-y-4">
                <Link
                  href="/perfil/ordenes"
                  className="
                    block
                    w-full
                    text-center
                    bg-pink-500
                    hover:bg-pink-600
                    text-white
                    py-4
                    rounded-full
                    transition
                  "
                >
                  Mis Compras
                </Link>

                <Link
                  href="/wishlist"
                  className="
                    block
                    w-full
                    text-center
                    border
                    py-4
                    rounded-full
                    hover:bg-gray-50
                  "
                >
                  Mi Wishlist
                </Link>

                <Link
                  href="/catalogo"
                  className="
                    block
                    w-full
                    text-center
                    border
                    py-4
                    rounded-full
                    hover:bg-gray-50
                  "
                >
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
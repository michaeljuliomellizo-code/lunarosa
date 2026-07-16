import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders } =
    await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Mis Compras
      </h1>

      {!orders?.length && (
        <div className="bg-white p-8 rounded-xl border">
          No tienes órdenes todavía.
        </div>
      )}

      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="
              bg-white
              border
              rounded-xl
              p-6
              flex
              justify-between
              items-center
            "
          >
            <div>
              <p className="font-semibold">
                Orden #{order.id.slice(0, 8)}
              </p>

              <p className="text-gray-600">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>

              <p className="mt-2">
                Estado:
                <strong className="ml-2">
                  {order.status}
                </strong>
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-pink-600">
                $
                {Number(
                  order.total
                ).toLocaleString()}
              </p>

              <Link
                href={`/perfil/ordenes/${order.id}`}
                className="
                  mt-2
                  inline-block
                  bg-pink-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
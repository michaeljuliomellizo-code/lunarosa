import OrderCard from "@/components/orders/OrderCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

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
    <div
      className="
        max-w-6xl
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
        Mis Pedidos
      </h1>

      {orders && orders.length > 0 ? (
        <div className="grid gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            bg-white
            rounded-3xl
            shadow
            p-8
            text-center
          "
        >
          <p className="text-lg text-gray-600">
            Aún no tienes pedidos realizados.
          </p>
        </div>
      )}
    </div>
  );
}
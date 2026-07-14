import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function TrackingPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const supabase =
    await createClient();

  const { data: order } =
    await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

  if (!order) {
    notFound();
  }

  const {
    data: history,
  } = await supabase
    .from(
      "order_status_history"
    )
    .select("*")
    .eq(
      "order_id",
      id
    )
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  return (
    <div
      className="
        max-w-4xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-10
        lg:py-12
      "
    >

      <div
        className="
          bg-white
          rounded-xl
          shadow
          p-5
          sm:p-8
        "
      >

        <h1
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            mb-8
          "
        >
          Seguimiento de Pedido
        </h1>

        <div className="space-y-4">

          <div className="break-all">
            <strong>Pedido:</strong> {order.id}
          </div>

          <div>
            <strong>Cliente:</strong> {order.customer_name}
          </div>

          <div>
            <strong>Estado:</strong> {order.status}
          </div>

          <div>
            <strong>Pago:</strong> {order.payment_status}
          </div>

          <div>
            <strong>Total:</strong>
            {" "}
            $
            {Number(order.total).toLocaleString()}
          </div>

          {order.carrier && (
            <div>
              <strong>Transportadora:</strong> {order.carrier}
            </div>
          )}

          {order.tracking_number && (
            <div className="break-all">
              <strong>Guía:</strong> {order.tracking_number}
            </div>
          )}

        </div>

      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          p-5
          sm:p-8
          mt-6
          sm:mt-8
        "
      >

        <h2
          className="
            text-xl
            sm:text-2xl
            font-bold
            mb-6
          "
        >
          Historial
        </h2>

        <div className="space-y-6">

          {history?.map((item) => (
            <div
              key={item.id}
              className="
                border-l-4
                border-pink-500
                pl-4
              "
            >
              <h3 className="font-bold">
                {item.status}
              </h3>

              <p className="text-gray-700">
                {item.notes}
              </p>

              <p className="text-sm text-gray-500 break-words">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
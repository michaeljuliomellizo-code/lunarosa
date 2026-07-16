import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import OrderItems from "@/components/orders/OrderItems";
import OrderTimeline from "@/components/orders/OrderTimeline";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase =
    await createClient();

  const {
    data: order,
  } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) {
    notFound();
  }

  const { data: items } =
    await supabase
      .from("order_items")
      .select(`
        *,
        products(
          name,
          image
        )
      `)
      .eq("order_id", id);

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
        "
      >
        Pedido
      </h1>

      <OrderTimeline
        status={order.status}
      />

      <div
        className="
          mt-10
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          lg:gap-10
        "
      >
        <div>

          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              mb-6
            "
          >
            Productos
          </h2>

          <OrderItems
            items={items || []}
          />

        </div>

        <div
          className="
            border
            rounded-2xl
            p-5
            sm:p-6
            bg-white
            shadow-sm
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
            Resumen
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                $
                {Number(order.subtotal).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Envíooooo</span>

              <span>
                $
                {Number(order.shipping).toLocaleString()}
              </span>
            </div>

            <div
              className="
                flex
                justify-between
                text-lg
                font-bold
                text-pink-600
                pt-3
                border-t
              "
            >
              <span>Total</span>

              <span>
                $
                {Number(order.total).toLocaleString()}
              </span>
            </div>

          </div>

          <div className="mt-6 space-y-2">

            <p className="break-words">
              <strong>Estado:</strong> {order.status}
            </p>

            <p className="break-words">
              <strong>Pago:</strong> {order.payment_status}
            </p>

          </div>

          {order.carrier && (
            <>
              <hr className="my-6" />

              <div className="space-y-2">

                <p className="break-words">
                  <strong>Transportadora:</strong> {order.carrier}
                </p>

                <p className="break-all">
                  <strong>Tracking:</strong> {order.tracking_number}
                </p>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}
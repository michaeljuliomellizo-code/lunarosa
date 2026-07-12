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
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">
        Pedido
      </h1>

      <OrderTimeline
        status={order.status}
      />

      <div className="mt-10 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Productos
          </h2>

          <OrderItems
            items={items || []}
          />
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Resumen
          </h2>

          <p>
            Subtotal:
            $
            {Number(
              order.subtotal
            ).toLocaleString()}
          </p>

          <p>
            Envío:
            $
            {Number(
              order.shipping
            ).toLocaleString()}
          </p>

          <p>
            Total:
            $
            {Number(
              order.total
            ).toLocaleString()}
          </p>

          <p className="mt-4">
            Estado:
            {order.status}
          </p>

          <p>
            Pago:
            {
              order.payment_status
            }
          </p>

          {order.carrier && (
            <>
              <hr className="my-4" />

              <p>
                Transportadora:
                {order.carrier}
              </p>

              <p>
                Tracking:
                {
                  order.tracking_number
                }
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
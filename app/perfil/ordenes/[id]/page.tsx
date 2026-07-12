import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: order } =
    await supabase
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
        products (
          name,
          image
        )
      `)
      .eq("order_id", id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Orden
      </h1>

      <div className="bg-white rounded-xl border p-6 mb-8">
        <p>
          <strong>ID:</strong>{" "}
          {order.id}
        </p>

        <p>
          <strong>Estado:</strong>{" "}
          {order.status}
        </p>

        <p>
          <strong>Total:</strong>{" "}
          $
          {Number(
            order.total
          ).toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        {items?.map((item: any) => (
          <div
            key={item.id}
            className="
              bg-white
              border
              rounded-xl
              p-4
              flex
              gap-4
            "
          >
            {item.products?.image && (
              <img
                src={
                  item.products.image
                }
                alt={
                  item.products.name
                }
                className="
                  w-24
                  h-24
                  object-cover
                  rounded
                "
              />
            )}

            <div>
              <h3 className="font-semibold">
                {
                  item.products
                    ?.name
                }
              </h3>

              <p>
                Cantidad:
                {item.quantity}
              </p>

              <p>
                $
                {Number(
                  item.price
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
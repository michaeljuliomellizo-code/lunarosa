import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

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

  const { data: history } =
    await supabase
      .from(
        "order_status_history"
      )
      .select("*")
      .eq(
        "order_id",
        id
      )
      .order("created_at", {
        ascending: false,
      });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-10">
        Seguimiento Pedido
      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <h2 className="font-bold text-xl mb-4">
              Cliente
            </h2>

            <p>
              {order.customer_name}
            </p>

            <p>
              {order.customer_email}
            </p>

            <p>
              {order.phone}
            </p>

          </div>

          <div>

            <h2 className="font-bold text-xl mb-4">
              Pedido
            </h2>

            <p>
              Estado:
              {" "}
              <strong>
                {order.status}
              </strong>
            </p>

            <p>
              Pago:
              {" "}
              <strong>
                {
                  order.payment_status
                }
              </strong>
            </p>

            <p>
              Total:
              {" "}
              <strong>
                $
                {Number(
                  order.total
                ).toLocaleString()}
              </strong>
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Estado del Pedido
        </h2>

        <div className="flex flex-wrap gap-4">

          <Step
            title="Pendiente"
            active={
              order.status ===
                "ORDER_STATUS.PENDING" ||
              order.status ===
                "ORDER_STATUS.PROCESSING" ||
              order.status ===
                "ORDER_STATUS.SHIPPED" ||
              order.status ===
                "ORDER_STATUS.DELIVERED"
            }
          />

          <Step
            title="Procesando"
            active={
              order.status ===
                "ORDER_STATUS.PROCESSING" ||
              order.status ===
                "ORDER_STATUS.SHIPPED" ||
              order.status ===
                "ORDER_STATUS.DELIVERED"
            }
          />

          <Step
            title="Enviado"
            active={
              order.status ===
                "ORDER_STATUS.SHIPPED" ||
              order.status ===
                "ORDER_STATUS.DELIVERED"
            }
          />

          <Step
            title="Entregado"
            active={
              order.status ===
              "ORDER_STATUS.DELIVERED"
            }
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Envío
        </h2>

        <div className="space-y-2">

          <p>
            Transportadora:
            {" "}
            {order.carrier ||
              "Pendiente"}
          </p>

          <p>
            Guía:
            {" "}
            {order.tracking_number ||
              "Pendiente"}
          </p>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Productos
        </h2>

        <div className="space-y-5">

          {items?.map((item) => (

            <div
              key={item.id}
              className="
                flex
                gap-4
                items-center
                border-b
                pb-4
              "
            >

              {item.products
                ?.image && (
                <img
                  src={
                    item.products
                      .image
                  }
                  alt={
                    item.products
                      .name
                  }
                  className="
                    w-20
                    h-20
                    rounded
                    object-cover
                  "
                />
              )}

              <div>

                <p className="font-semibold">
                  {
                    item.products
                      ?.name
                  }
                </p>

                <p>
                  Cantidad:
                  {" "}
                  {
                    item.quantity
                  }
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

      <div className="bg-white rounded-xl shadow p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Historial
        </h2>

        <div className="space-y-4">

          {history?.map(
            (item) => (
              <div
                key={item.id}
                className="
                  border-b
                  pb-4
                "
              >
                <p className="font-semibold">
                  {item.status}
                </p>

                <p>
                  {item.notes}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}

        </div>

      </div>

    </main>
  );
}

function Step({
  title,
  active,
}: {
  title: string;
  active: boolean;
}) {
  return (
    <div
      className={`
        px-6
        py-3
        rounded-full
        text-white
        ${
          active
            ? "bg-green-500"
            : "bg-gray-300"
        }
      `}
    >
      {title}
    </div>
  );
}
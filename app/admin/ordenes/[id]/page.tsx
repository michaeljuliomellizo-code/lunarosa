import { notFound } from "next/navigation";

import { OrderQuery } from "@/lib/order/OrderQuery";

import OrderCustomerCard from "@/components/admin/orders/OrderCustomerCard";
import OrderItemsCard from "@/components/admin/orders/OrderItemsCard";
import OrderPaymentCard from "@/components/admin/orders/OrderPaymentCard";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import OrderActions from "@/components/admin/orders/OrderActions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  let order;

  try {
    order =
      await OrderQuery.findWithItems(
        id
      );
  } catch {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold">
            Pedido{" "}
            {order.order_number ??
              order.id.slice(0, 8)}
          </h1>

          <p className="text-gray-500 mt-2">
            Información completa del
            pedido
          </p>
        </div>

        <OrderActions
          order={order}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <OrderCustomerCard
            order={order}
          />

          <OrderItemsCard
            order={order}
          />

          <OrderTimeline
            orderId={order.id}
          />
        </div>

        <div className="space-y-8">
          <OrderPaymentCard
            order={order}
          />
        </div>
      </div>
    </div>
  );
}
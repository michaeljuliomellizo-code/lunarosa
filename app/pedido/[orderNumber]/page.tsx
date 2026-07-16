import { notFound } from "next/navigation";

import { OrderTrackingService } from "@/lib/order/OrderTrackingService";

import OrderHeader from "@/components/tracking/OrderHeader";
import OrderItems from "@/components/tracking/OrderItems";
import OrderStatus from "@/components/tracking/OrderStatus";
import OrderPayment from "@/components/tracking/OrderPayment";
import OrderShipping from "@/components/tracking/OrderShipping";
import OrderTimeline from "@/components/tracking/OrderTimeline";
import OrderHistory from "@/components/tracking/OrderHistory";
import OrderProgress from "@/components/tracking/OrderProgress";
import EstimatedDelivery from "@/components/tracking/EstimatedDelivery";

interface Props {
  params: Promise<{
    order_number: string;
  }>;
}

export default async function OrderTrackingPage({
  params,
}: Props) {
  const { order_number } = await params;

  const order =
    await OrderTrackingService.getByorder_number(
      order_number
    );

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <OrderHeader
        order_number={order.order_number}
        customerName={order.customer_name}
        createdAt={order.created_at}
      />

      <div className="mt-6">

        <OrderProgress
          status={order.status}
        />

        <div className="mt-6">

          <EstimatedDelivery
            department={order.department}
            municipality={order.municipality}
          />

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2">

          <OrderItems
            items={order.order_items}
          />
          <OrderHistory
            history={
              order.order_status_history ?? []
            }
          />

        </div>

        <div className="space-y-6">

          <OrderStatus
            status={order.status}
          />

          <OrderTimeline
            status={order.status}
          />

          <OrderPayment
            method={order.payment_method}
            total={order.total}
            reference={
              order.payment_reference
            }
          />

          <OrderShipping
            department={
              order.department
            }
            municipality={
              order.municipality
            }
            address={
              order.shipping_address
            }
          />

        </div>

      </div>

    </div>
  );
}
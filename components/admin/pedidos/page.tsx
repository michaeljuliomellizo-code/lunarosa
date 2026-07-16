import {
  AdminOrderService,
} from "@/lib/order/AdminOrderService";

import OrderTable from "@/components/admin/orders/OrderTable";

export default async function OrdersPage() {
  const orders =
    await AdminOrderService.getOrders();

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Pedidos

        </h1>

        <p className="text-gray-600 mt-2">

          Administra todos los pedidos realizados en la tienda.

        </p>

      </div>

      <OrderTable
        orders={orders}
      />

    </div>
  );
}
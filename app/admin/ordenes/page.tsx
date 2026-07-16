import { OrderQuery } from "@/lib/order/OrderQuery";

import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrderPagination from "@/components/admin/orders/OrderPagination";
import OrderTable from "@/components/admin/orders/OrderTable";

export default async function OrdersPage() {
  const orders =
    await OrderQuery.list(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Gestión de pedidos
        </h1>

        <p className="text-gray-600 mt-2">
          Consulta y administra los pedidos de la tienda.
        </p>
      </div>

      <OrderFilters />

      <OrderTable
        orders={orders}
      />

      <OrderPagination
        currentPage={1}
        totalPages={1}
      />
    </div>
  );
}
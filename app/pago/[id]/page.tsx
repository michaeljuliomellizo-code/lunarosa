
import OrderDetail from "@/components/admin/orders/OrderDetail";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">
          Pedido Recibido
        </h1>

        <p className="text-gray-500 mt-3">
          Gracias por tu compra.
        </p>
      </div>

      <OrderDetail orderId={id} />
    </div>
  );
}
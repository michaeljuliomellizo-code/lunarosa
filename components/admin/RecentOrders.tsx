"use client";

interface Order {
  id: string;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

function formatDate(
  value: string
) {
  const date =
    new Date(value);

  return `${date.getDate()
    .toString()
    .padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export default function RecentOrders({
  orders,
}: {
  orders: Order[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Últimos Pedidos
      </h2>

      <div className="space-y-4">
        {orders.map(
          (order) => (
            <div
              key={
                order.id
              }
              className="
                border
                rounded-lg
                p-4
              "
            >
              <p className="font-bold">
                {
                  order.customer_name
                }
              </p>

              <p>
                $
                {Number(
                  order.total
                ).toLocaleString()}
              </p>

              <p>
                {order.status}
              </p>

              <p className="text-sm text-gray-500">
                {formatDate(
                  order.created_at
                )}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
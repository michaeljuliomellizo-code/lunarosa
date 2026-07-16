interface Order {
  total: number;
  created_at: string;
}

export default function RevenueCards({
  orders,
}: {
  orders: Order[];
}) {
  const now = new Date();

  const currentMonth =
    now.getMonth();

  const currentYear =
    now.getFullYear();

  const monthRevenue =
    orders
      ?.filter((order) => {
        const date =
          new Date(
            order.created_at
          );

        return (
          date.getMonth() ===
            currentMonth &&
          date.getFullYear() ===
            currentYear
        );
      })
      .reduce(
        (sum, order) =>
          sum +
          Number(
            order.total || 0
          ),
        0
      ) || 0;

  const averageTicket =
    orders?.length
      ? monthRevenue /
        orders.length
      : 0;

  const totalRevenue =
    orders?.reduce(
      (sum, order) =>
        sum +
        Number(
          order.total || 0
        ),
      0
    ) || 0;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-600">
          Ventas del Mes
        </h3>

        <p className="text-3xl font-bold mt-2 text-green-600">
          $
          {monthRevenue.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-600">
          Ticket Promedio
        </h3>

        <p className="text-3xl font-bold mt-2 text-blue-600">
          $
          {Math.round(
            averageTicket
          ).toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-600">
          Ventas Totales
        </h3>

        <p className="text-3xl font-bold mt-2 text-pink-600">
          $
          {totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
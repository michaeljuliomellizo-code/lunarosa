"use client";

interface Order {
  total: number;
  created_at: string;
}

export default function RevenueChart({
  orders,
}: {
  orders: Order[];
}) {
  const months =
    Array.from(
      { length: 12 },
      (_, index) => {
        const total =
          orders
            ?.filter(
              (order) =>
                new Date(
                  order.created_at
                ).getMonth() ===
                index
            )
            .reduce(
              (
                sum,
                order
              ) =>
                sum +
                Number(
                  order.total ||
                    0
                ),
              0
            ) || 0;

        return {
          month:
            [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ][index],
          total,
        };
      }
    );

  const maxRevenue =
    Math.max(
      ...months.map(
        (m) => m.total
      ),
      1
    );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-8">
        Ingresos por Mes
      </h2>

      <div className="flex items-end gap-3 h-72">
        {months.map(
          (month) => (
            <div
              key={
                month.month
              }
              className="flex-1 flex flex-col items-center"
            >
              <div
                className="bg-pink-500 rounded-t w-full"
                style={{
                  height: `${
                    (month.total /
                      maxRevenue) *
                    220
                  }px`,
                }}
              />

              <span className="text-xs mt-2">
                {
                  month.month
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
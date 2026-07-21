interface Order {
  customer_email: string | null;
  customer_name: string | null;
  subtotal: number;
  payment_status: string;
  status: string;
}

interface Customer {
  id: string;
  full_name: string | null;
  email: string | null;
}

interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  totalOrders: number;
}

export default function TopCustomers({
  orders = [],
  customers = [],
}: {
  orders?: Order[];
  customers?: Customer[];
}) {
  const ranking = new Map<string, TopCustomer>();

  const validOrders = orders.filter(
    (order) =>
      order.payment_status === "paid" &&
      order.status !== "cancelled"
  );

  validOrders.forEach((order) => {
    const email =
      order.customer_email ?? "";

    if (!email) return;

    const profile = customers.find(
      (customer) =>
        customer.email === email
    );

    const id =
      profile?.id ?? email;

    const name =
      profile?.full_name ??
      order.customer_name ??
      "Cliente";

    if (!ranking.has(id)) {
      ranking.set(id, {
        id,
        name,
        email,
        totalSpent: 0,
        totalOrders: 0,
      });
    }

    const current =
      ranking.get(id)!;

    current.totalSpent += Number(
      order.subtotal ?? 0
    );

    current.totalOrders += 1;
  });

  const topCustomers = Array.from(
    ranking.values()
  )
    .sort(
      (a, b) =>
        b.totalSpent -
        a.totalSpent
    )
    .slice(0, 10);

      return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Mejores Clientes
      </h2>

      <div className="space-y-4">
        {topCustomers.map(
          (
            customer,
            index
          ) => (
            <div
              key={customer.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-semibold">
                  #{index + 1}{" "}
                  {customer.name}
                </p>

                <p className="text-sm text-gray-600">
                  {customer.email}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-600">
                  $
                  {customer.totalSpent.toLocaleString(
                    "es-CO"
                  )}
                </p>

                <p className="text-xs text-gray-600">
                  {customer.totalOrders} pedidos
                </p>
              </div>
            </div>
          )
        )}

        {topCustomers.length === 0 && (
          <p className="text-gray-600">
            No hay clientes con compras registradas.
          </p>
        )}
      </div>
    </div>
  );
}
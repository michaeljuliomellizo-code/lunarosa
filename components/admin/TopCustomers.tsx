interface Customer {
  id: string;
  name: string;
  email: string;
  total_spent: number;
}

export default function TopCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Mejores Clientes
      </h2>

      <div className="space-y-4">
        {customers.map(
          (customer) => (
            <div
              key={
                customer.id
              }
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-semibold">
                  {
                    customer.name
                  }
                </p>

                <p className="text-sm text-gray-600">
                  {
                    customer.email
                  }
                </p>
              </div>

              <p className="font-bold text-green-600">
                $
                {Number(
                  customer.total_spent
                ).toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
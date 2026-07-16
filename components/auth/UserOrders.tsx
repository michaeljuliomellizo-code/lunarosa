export default function UserOrders() {

  return (
    <div className="bg-white border rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Mis Pedidos
      </h2>

      <div className="space-y-4">

        <div className="border rounded-2xl p-5 flex justify-between">

          <div>
            <p className="font-bold">
              Pedido #1001
            </p>

            <p className="text-gray-600">
              Enviado
            </p>
          </div>

          <p className="font-bold">
            $250.000
          </p>
        </div>
      </div>
    </div>
  );
}
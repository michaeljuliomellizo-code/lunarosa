interface HistoryItem {
  id?: string;

  status: string;

  notes?: string | null;

  created_at: string;
}

interface Props {
  history: HistoryItem[];
}

const labels: Record<string, string> = {
  pending: "Pedido recibido",
  paid: "Pago confirmado",
  packed: "Pedido empacado",
  shipped: "Pedido despachado",
  delivered: "Pedido entregado",
  cancelled: "Pedido cancelado",
};

export default function OrderHistory({
  history,
}: Props) {
  if (!history?.length) {
    return (
      <div className="bg-white rounded-3xl border p-6">

        <h2 className="font-semibold text-lg mb-4">
          Historial
        </h2>

        <p className="text-gray-600">
          Aún no existen movimientos para este pedido.
        </p>

      </div>
    );
  }

  const orderedHistory = [...history].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );

  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="font-semibold text-lg mb-6">
        Historial del Pedido
      </h2>

      <div className="space-y-5">

        {orderedHistory.map((item, index) => (

          <div
            key={item.id ?? index}
            className="border-l-4 border-pink-500 pl-4"
          >

            <p className="font-semibold">

              {labels[item.status] ??
                item.status}

            </p>

            <p className="text-sm text-gray-600">

              {new Date(
                item.created_at
              ).toLocaleString("es-CO")}

            </p>

            {item.notes && (

              <p className="text-sm mt-2 text-gray-800">

                {item.notes}

              </p>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}
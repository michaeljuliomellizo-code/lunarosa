interface Props {
  status: string;
}

const steps = [
  "pending",
  "paid",
  "packed",
  "shipped",
  "delivered",
];

const labels: Record<string, string> = {
  pending: "Pedido recibido",
  paid: "Pago confirmado",
  packed: "Empacado",
  shipped: "Despachado",
  delivered: "Entregado",
};

export default function OrderProgress({
  status,
}: Props) {
  const current =
    Math.max(
      steps.indexOf(status),
      0
    );

  const percentage =
    (current /
      (steps.length - 1)) *
    100;

  return (
    <div className="bg-white rounded-3xl border p-6">

      <div className="flex justify-between items-center mb-4">

        <h2 className="font-semibold text-lg">

          Progreso del Pedido

        </h2>

        <span className="font-bold text-pink-600">

          {Math.round(percentage)}%

        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

        <div
          className="bg-gradient-to-r from-pink-500 to-fuchsia-600 h-4 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-5 flex justify-between text-xs">

        {steps.map((step) => (

          <div
            key={step}
            className="flex flex-col items-center w-full"
          >

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-2
              ${
                steps.indexOf(step) <= current
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }`}
            >

              {steps.indexOf(step) + 1}

            </div>

            <span
              className={`text-center
              ${
                steps.indexOf(step) <= current
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
            >

              {labels[step]}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
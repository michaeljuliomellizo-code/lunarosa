interface Props {
  status: string;
}

const steps = [
  {
    id: "pending",
    title: "Pedido recibido",
  },
  {
    id: "paid",
    title: "Pago confirmado",
  },
  {
    id: "packed",
    title: "Empacado",
  },
  {
    id: "shipped",
    title: "Despachado",
  },
  {
    id: "delivered",
    title: "Entregado",
  },
];

export default function OrderTimeline({
  status,
}: Props) {
  const current =
    steps.findIndex(
      (step) => step.id === status
    );

  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="font-semibold text-lg mb-6">
        Seguimiento del Pedido
      </h2>

      <div className="space-y-5">

        {steps.map((step, index) => {

          const completed =
            current >= index;

          return (

            <div
              key={step.id}
              className="flex items-start gap-4"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${
                    completed
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >

                  {completed ? "✓" : index + 1}

                </div>

                {index <
                  steps.length - 1 && (
                  <div
                    className={`w-1 h-10
                    ${
                      completed
                        ? "bg-pink-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}

              </div>

              <div>

                <p
                  className={`font-medium
                  ${
                    completed
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >

                  {step.title}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}
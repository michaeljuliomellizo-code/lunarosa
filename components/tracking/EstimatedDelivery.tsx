interface Props {
  department?: string | null;
  municipality?: string | null;
}

function addBusinessDays(
  date: Date,
  days: number
) {
  const result = new Date(date);

  while (days > 0) {
    result.setDate(result.getDate() + 1);

    const day = result.getDay();

    if (day !== 0 && day !== 6) {
      days--;
    }
  }

  return result;
}

export default function EstimatedDelivery({
  department,
  municipality,
}: Props) {
  const isBogota =
    department
      ?.toLowerCase()
      .includes("bogotá") ||
    department
      ?.toLowerCase()
      .includes("bogota");

  const start = new Date();

  const minDate = isBogota
    ? addBusinessDays(start, 1)
    : addBusinessDays(start, 3);

  const maxDate = isBogota
    ? addBusinessDays(start, 1)
    : addBusinessDays(start, 5);

  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="font-semibold text-lg mb-4">
        Entrega Estimada
      </h2>

      <p className="text-gray-800">

        {municipality}

        {municipality && department
          ? ", "
          : ""}

        {department}

      </p>

      <div className="mt-4">

        {isBogota ? (

          <p className="text-pink-600 font-semibold">

            Recibirás tu pedido aproximadamente el{" "}

            {minDate.toLocaleDateString(
              "es-CO",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
              }
            )}

          </p>

        ) : (

          <p className="text-pink-600 font-semibold">

            Entre el{" "}

            {minDate.toLocaleDateString(
              "es-CO",
              {
                day: "numeric",
                month: "long",
              }
            )}

            {" "}y el{" "}

            {maxDate.toLocaleDateString(
              "es-CO",
              {
                day: "numeric",
                month: "long",
              }
            )}

          </p>

        )}

      </div>

      <p className="text-xs text-gray-600 mt-3">

        La fecha puede variar según la transportadora.

      </p>

    </div>
  );
}
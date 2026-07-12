interface OrderStatusBadgeProps {
  status: string;
  type?: "order" | "payment";
}

export default function OrderStatusBadge({
  status,
  type = "order",
}: OrderStatusBadgeProps) {
  const normalized =
    status.toLowerCase();

  let label = status;
  let className =
    "bg-gray-100 text-gray-700";

  if (type === "order") {
    switch (normalized) {
      case "pending":
        label = "Pendiente";
        className =
          "bg-yellow-100 text-yellow-800";
        break;

      case "processing":
        label = "Procesando";
        className =
          "bg-blue-100 text-blue-800";
        break;

      case "shipped":
        label = "Enviado";
        className =
          "bg-purple-100 text-purple-800";
        break;

      case "delivered":
        label = "Entregado";
        className =
          "bg-green-100 text-green-800";
        break;

      case "cancelled":
        label = "Cancelado";
        className =
          "bg-red-100 text-red-800";
        break;
    }
  } else {
    switch (normalized) {
      case "pending":
        label = "Pendiente";
        className =
          "bg-yellow-100 text-yellow-800";
        break;

      case "waiting_validation":
        label = "Validación";
        className =
          "bg-orange-100 text-orange-800";
        break;

      case "paid":
        label = "Aprobado";
        className =
          "bg-green-100 text-green-800";
        break;

      case "rejected":
        label = "Rechazado";
        className =
          "bg-red-100 text-red-800";
        break;
    }
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${className}
      `}
    >
      {label}
    </span>
  );
}
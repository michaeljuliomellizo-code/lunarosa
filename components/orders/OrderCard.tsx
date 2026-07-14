import Link from "next/link";

interface Props {
  order: {
    id: string;
    total: number;
    status: string;
    created_at: string;
  };
}

export default function OrderCard({
  order,
}: Props) {
  return (
    <Link
      href={`/perfil/pedidos/${order.id}`}
      className="
        block
        bg-white
        border
        rounded-2xl
        p-5
        sm:p-6
        hover:shadow-lg
        transition
      "
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-2
        "
      >
        <span className="font-bold text-lg">
          Pedido
        </span>

        <span
          className="
            self-start
            sm:self-auto
            px-3
            py-1
            rounded-full
            bg-pink-100
            text-pink-600
            text-sm
            font-medium
            break-words
          "
        >
          {order.status}
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-pink-600">
        $
        {Number(order.total).toLocaleString()}
      </p>

      <p className="text-gray-500 text-sm mt-2">
        {new Date(order.created_at).toLocaleDateString()}
      </p>
    </Link>
  );
}
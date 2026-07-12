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
        border
        rounded-2xl
        p-6
        hover:shadow-lg
      "
    >
      <div className="flex justify-between">
        <span className="font-bold">
          Pedido
        </span>

        <span className="capitalize">
          {order.status}
        </span>
      </div>

      <p className="mt-2">
        $
        {Number(
          order.total
        ).toLocaleString()}
      </p>

      <p className="text-gray-500">
        {new Date(
          order.created_at
        ).toLocaleDateString()}
      </p>
    </Link>
  );
}
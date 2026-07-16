interface Props {

  status: string;

}

export default function OrderStatus({

  status,

}: Props) {

  const colors: Record<string, string> = {

    pending:

      "bg-yellow-100 text-yellow-700",

    paid:

      "bg-blue-100 text-blue-700",

    packed:

      "bg-purple-100 text-purple-700",

    shipped:

      "bg-green-100 text-green-700",

    delivered:

      "bg-emerald-100 text-emerald-700",

    cancelled:

      "bg-red-100 text-red-700",

  };

  return (

    <div className="bg-white rounded-3xl border p-6">

      <h2 className="font-semibold mb-4">

        Estado

      </h2>

      <span

        className={`px-4 py-2 rounded-full text-sm font-semibold ${colors[status] ?? "bg-gray-100"}`}

      >

        {status}

      </span>

    </div>

  );

}
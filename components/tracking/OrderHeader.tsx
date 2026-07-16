interface Props {

  order_number: string;

  customerName: string;

  createdAt: string;

}

export default function OrderHeader({

  order_number,

  customerName,

  createdAt,

}: Props) {

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h1 className="text-3xl font-bold">

        Pedido #{order_number}

      </h1>

      <p className="text-gray-600 mt-2">

        Cliente: {customerName}

      </p>

      <p className="text-sm text-gray-500 mt-1">

        {new Date(createdAt).toLocaleString("es-CO")}

      </p>

    </div>

  );

}
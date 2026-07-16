interface Props {

  method: string;

  total: number;

  reference?: string | null;

}

export default function OrderPayment({

  method,

  total,

  reference,

}: Props) {

  return (

    <div className="bg-white rounded-3xl border p-6">

      <h2 className="font-semibold mb-4">

        Pago

      </h2>

      <p>

        <strong>Método:</strong>

        {" "}

        {method}

      </p>

      <p>

        <strong>Total:</strong>

        {" "}

        $

        {Number(total).toLocaleString("es-CO")}

      </p>

      {reference && (

        <p>

          <strong>Referencia:</strong>

          {" "}

          {reference}

        </p>

      )}

    </div>

  );

}
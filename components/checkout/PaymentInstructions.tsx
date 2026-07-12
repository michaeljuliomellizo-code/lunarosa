interface Props {
  method: string;
}

export default function PaymentInstructions({
  method,
}: Props) {
  if (
    method ===
    "contraentrega"
  ) {
    return (
      <div className="bg-green-50 p-5 rounded-xl">
        Pagarás al recibir el pedido.
      </div>
    );
  }

  if (
    method === "nequi"
  ) {
    return (
      <div className="bg-purple-50 p-5 rounded-xl">
        <p>
          Número Nequi:
        </p>

        <strong>
          3123851338
        </strong>
      </div>
    );
  }

  if (
    method ===
    "daviplata"
  ) {
    return (
      <div className="bg-red-50 p-5 rounded-xl">
        <p>
          Número Daviplata:
        </p>

        <strong>
          3123851338
        </strong>
      </div>
    );
  }

  if (
    method === "llave"
  ) {
    return (
      <div className="bg-purple-50 p-5 rounded-xl">
        <p>
          Número Llave:
        </p>

        <strong>
          3204095701
        </strong>
      </div>
    );
  }

  if (
    method ===
    "lulo"
  ) {
    return (
      <div className="bg-yellow-50 p-5 rounded-xl">
        <p>
          Lulo
        </p>

        <p>
          Cuenta Ahorros
        </p>

        <strong>
          301494737327
        </strong>
      </div>
    );
  }

  return null;
}
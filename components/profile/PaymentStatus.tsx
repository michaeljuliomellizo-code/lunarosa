"use client";

interface Props {
  order: any;
}

export default function PaymentStatus({
  order,
}: Props) {
  return (
    <div className="mt-4">

      <p>
        Estado Pago:
        <strong>
          {" "}
          {order.payment_status}
        </strong>
      </p>

      {order.payment_reference && (
        <p>
          Correo electronico relacionado con el Pago:
          {" "}
          {
            order.payment_reference
          }
        </p>
      )}

      {order.payment_proof && (
        <a
          href={
            order.payment_proof
          }
          target="_blank"
          className="
            text-pink-500
            underline
          "
        >
          Ver comprobante
        </a>
      )}

    </div>
  );
}
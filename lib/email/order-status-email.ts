export function orderStatusEmail(
  orderId: string,
  status: string
) {
  const messages: Record<string, string> = {
    pending:
      "Tu pedido fue recibido correctamente.",

    processing:
      "Tu pedido está siendo preparado.",

    shipped:
      "Tu pedido fue enviado.",

    delivered:
      "Tu pedido fue entregado.",

    cancelled:
      "Tu pedido fue cancelado.",
  };

  return `
    <div style="font-family:Arial,sans-serif">

      <h2>
        Actualización de Pedido
      </h2>

      <p>
        Pedido:
        <strong>${orderId}</strong>
      </p>

      <p>
        ${messages[status] || status}
      </p>

      <br/>

      <p>
        Luna Rosa
      </p>

    </div>
  `;
}
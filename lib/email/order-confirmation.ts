export function orderConfirmationEmail(
  orderId: string,
  total: number
) {
  const trackingUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/pedido/${orderId}`
      : `http://localhost:3000/pedido/${orderId}`;

  return `
  <div
    style="
      font-family: Arial, Helvetica, sans-serif;
      max-width: 650px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    "
  >

    <div
      style="
        text-align:center;
        margin-bottom:30px;
      "
    >
      <h1
        style="
          color:#ec4899;
          margin:0;
        "
      >
        Luna Rosa
      </h1>

      <p
        style="
          color:#666;
          margin-top:10px;
        "
      >
        Confirmación de Pedido
      </p>
    </div>

    <div
      style="
        background:#fafafa;
        border:1px solid #eee;
        border-radius:12px;
        padding:24px;
      "
    >

      <h2
        style="
          margin-top:0;
          color:#111827;
        "
      >
        Gracias por tu compra 💕
      </h2>

      <p>
        Hemos recibido tu pedido correctamente.
      </p>

      <p>
        Nuestro equipo verificará la información y comenzará el procesamiento de tu orden.
      </p>

      <hr
        style="
          border:none;
          border-top:1px solid #e5e7eb;
          margin:20px 0;
        "
      />

      <p>
        <strong>Número de Pedido:</strong>
        <br/>
        ${orderId}
      </p>

      <p>
        <strong>Total:</strong>
        <br/>
        $${Number(total).toLocaleString()}
      </p>

      <p>
        <strong>Estado:</strong>
        <br/>
        Pendiente
      </p>

      <hr
        style="
          border:none;
          border-top:1px solid #e5e7eb;
          margin:20px 0;
        "
      />

      <h3>
        Seguimiento del Pedido
      </h3>

      <p>
        Puedes consultar el estado de tu pedido en cualquier momento:
      </p>

      <a
        href="${trackingUrl}"
        style="
          display:inline-block;
          background:#ec4899;
          color:white;
          text-decoration:none;
          padding:12px 20px;
          border-radius:8px;
          font-weight:bold;
        "
      >
        Ver Mi Pedido
      </a>

      <hr
        style="
          border:none;
          border-top:1px solid #e5e7eb;
          margin:25px 0;
        "
      />

      <h3>
        Métodos de Pago
      </h3>

      <p>
        Si seleccionaste pago por transferencia o billetera digital:
      </p>

      <ul>
        <li>
          Nequi: 3001234567
        </li>

        <li>
          Daviplata: 3001234567
        </li>

        <li>
          Bancolombia Ahorros:
          1234567890
        </li>
      </ul>

      <p>
        Después de realizar el pago podrás subir el comprobante desde tu perfil o desde el enlace de seguimiento del pedido.
      </p>

    </div>

    <div
      style="
        margin-top:30px;
        text-align:center;
        color:#6b7280;
        font-size:13px;
      "
    >
      <p>
        Gracias por confiar en Luna Rosa.
      </p>

      <p>
        Este correo fue generado automáticamente.
      </p>
    </div>

  </div>
  `;
}
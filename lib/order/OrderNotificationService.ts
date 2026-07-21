import { resend } from "@/lib/resend";

import { orderConfirmationEmail } from "@/lib/email/order-confirmation";

import { OrderEmailData } from "./types";

import { NotificationService } from "@/lib/notification/NotificationService";

export class OrderNotificationService {

  //--------------------------------------------------------
  // Plantilla HTML reutilizable
  //--------------------------------------------------------

  private static template(
    title: string,
    customerName: string,
    body: string,
    order_number: string
  ) {
    return `
<!DOCTYPE html>
<html lang="es">

<head>
<meta charset="UTF-8" />

<style>

body{
margin:0;
padding:0;
background:#f5f5f5;
font-family:Arial,Helvetica,sans-serif;
}

.container{
max-width:650px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
}

.header{
background:#e91e63;
padding:30px;
text-align:center;
color:white;
}

.content{
padding:35px;
color:#333;
font-size:15px;
line-height:1.7;
}

.box{
background:#fafafa;
border:1px solid #ececec;
border-radius:10px;
padding:18px;
margin:20px 0;
}

.footer{
padding:25px;
text-align:center;
font-size:13px;
color:#777;
background:#fafafa;
}

.button{
display:inline-block;
padding:14px 28px;
background:#e91e63;
color:white;
border-radius:8px;
text-decoration:none;
font-weight:bold;
margin-top:20px;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>Luna Rosa</h1>

</div>

<div class="content">

<h2>${title}</h2>

<p>
Hola
<strong>${customerName}</strong>,
</p>

${body}

<div class="box">

<strong>Pedido:</strong>

${order_number}

</div>

<p>

Gracias por comprar con
<strong>Luna Rosa</strong>.

</p>

</div>

<div class="footer">

© ${new Date().getFullYear()}
Luna Rosa

</div>

</div>

</body>

</html>
`;
  }

  //--------------------------------------------------------
  // Pedido Creado
  //--------------------------------------------------------

  static async orderCreated(
    order: OrderEmailData
  ) {
    await NotificationService.newOrder(
      order.id,
      order.customer_name
    );

    try {
      await resend.emails.send({
        from: "ventas@lunarosa.store",

        to: order.customer_email,

        bcc: [
          "michael_mellizo@hotmail.com", 
          "lizet323z@gmail.com"
        ],

       
        subject: `Hemos recibido tu pedido #${order.order_number}`,

        html: orderConfirmationEmail(order),
      });
    } catch (error) {
      console.error(
        "ORDER CREATED EMAIL",
        error
      );
    }
  }

  //--------------------------------------------------------
  // Pedido en preparación
  //--------------------------------------------------------

  static async orderProcessing(params: {

    customerEmail: string;

    customerName: string;

    order_number: string;

  }) {

    const {

      customerEmail,

      customerName,

      order_number,

    } = params;

    try {

      await resend.emails.send({

        from:
          "ventas@lunarosa.store",

        to: customerEmail,

        subject:
          `Estamos preparando tu pedido #${order_number}`,

        html: this.template(

          "Tu pedido está siendo preparado",

          customerName,

          `
<p>

Tu pedido ya fue confirmado y nuestro equipo comenzó a prepararlo.

</p>

<p>

Muy pronto será enviado.

</p>
`,

          order_number

        ),

      });

    } catch (error) {

      console.error(
        "ORDER PROCESSING EMAIL",
        error
      );

    }

  }

  //--------------------------------------------------------
  // Pago aprobado
  //--------------------------------------------------------

  static async paymentApproved(params: {

    order_number: string;

    customerEmail: string;

    customerName: string;

  }) {
    const {
      customerEmail,
      customerName,
      order_number,
    } = params;

    

    await NotificationService.paymentApproved(
      order_number
    );

    try {
      await resend.emails.send({
        from: "ventas@lunarosa.store",

        to: customerEmail,

        subject: `Pago aprobado #${order_number}`,

        html: `
          <h2>Hola ${customerName}</h2>

          <p>
            Hemos validado correctamente tu pago.
          </p>

          <p>
            Tu pedido ya ingresó al proceso de preparación.
          </p>

          <p>
            Pedido:
            <strong>${order_number}</strong>
          </p>

          <p>
            Te notificaremos nuevamente cuando sea enviado.
          </p>
        `,
      });
    } catch (error) {
      console.error(
        "PAYMENT APPROVED EMAIL",
        error
      );
    }
  }

  static async paymentRejected(params: {
    customerEmail: string;
    customerName: string;
    order_number: string;
    reason?: string;
  }) {
    const {
      customerEmail,
      customerName,
      order_number,
      reason,
    } = params;

    await NotificationService.paymentRejected(
      order_number,
      reason
    );

    try {
      await resend.emails.send({
        from: "ventas@lunarosa.store",

        to: customerEmail,

        subject: `Pago rechazado #${order_number}`,

        html: `
          <h2>Hola ${customerName}</h2>

          <p>
            No fue posible validar el pago de tu pedido.
          </p>

          <p>
            ${
              reason ??
              "Por favor comunícate con nuestro equipo o realiza nuevamente el proceso de pago."
            }
          </p>

          <p>
            Pedido:
            <strong>${order_number}</strong>
          </p>
        `,
      });
    } catch (error) {
      console.error(
        "PAYMENT REJECTED EMAIL",
        error
      );
    }
  }
      static async orderShipped(params: {
    customerEmail: string;
    customerName: string;
    order_number: string;
  }) {
    const {
      customerEmail,
      customerName,
      order_number,
    } = params;

    await NotificationService.orderShipped(
      order_number
    );

    try {
      await resend.emails.send({
        from: "ventas@lunarosa.store",

        to: customerEmail,

        subject: `Tu pedido fue enviado #${order_number}`,

        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

            <h2>¡Tu pedido ya va en camino! 🚚</h2>

            <p>
              Hola <strong>${customerName}</strong>,
            </p>

            <p>
              Nos alegra informarte que tu pedido ya fue despachado y se encuentra en camino.
            </p>

            <p>
              <strong>Número de pedido:</strong>
              ${order_number}
            </p>

            <p>
              Pronto lo recibirás en la dirección registrada durante la compra.
            </p>

            <hr>

            <p style="color:#777">
              Gracias por comprar en <strong>Luna Rosa</strong>.
            </p>

          </div>
        `,
      });
    } catch (error) {
      console.error(
        "ORDER SHIPPED EMAIL",
        error
      );
    }
  }

  static async orderDelivered(params: {
    customerEmail: string;
    customerName: string;
    order_number: string;
  }) {
    const {
      customerEmail,
      customerName,
      order_number,
    } = params;

    await NotificationService.orderDelivered(
      order_number
    );

    try {
      await resend.emails.send({
        from: "ventas@lunarosa.store",

        to: customerEmail,

        subject: `Pedido entregado #${order_number}`,

        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

            <h2>Pedido entregado ✅</h2>

            <p>
              Hola <strong>${customerName}</strong>,
            </p>

            <p>
              Confirmamos que tu pedido fue entregado correctamente.
            </p>

            <p>
              <strong>Número de pedido:</strong>
              ${order_number}
            </p>

            <p>
              Esperamos que disfrutes tu compra y vuelvas muy pronto.
            </p>

            <hr>

            <p style="color:#777">
              Gracias por confiar en <strong>Luna Rosa</strong>.
            </p>

          </div>
        `,
      });
    } catch (error) {
      console.error(
        "ORDER DELIVERED EMAIL",
        error
      );
    }
  }

  static async orderCancelled(params: {
    customerEmail: string;
    customerName: string;
    order_number: string;
    reason?: string;
  }) {
    const {
      customerEmail,
      customerName,
      order_number,
      reason,
    } = params;

    await NotificationService.orderCancelled(
      order_number
    );

    try {
      await resend.emails.send({
        from: "ventas@lunarosa.store",

        to: customerEmail,

        subject: `Pedido cancelado #${order_number}`,

        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

            <h2>Pedido cancelado</h2>

            <p>
              Hola <strong>${customerName}</strong>,
            </p>

            <p>
              Tu pedido ha sido cancelado.
            </p>

            <p>
              <strong>Número de pedido:</strong>
              ${order_number}
            </p>

            ${
              reason
                ? `<p><strong>Motivo:</strong> ${reason}</p>`
                : ""
            }

            <p>
              Si tienes alguna duda puedes comunicarte con nuestro equipo de atención.
            </p>

          </div>
        `,
      });
    } catch (error) {
      console.error(
        "ORDER CANCELLED EMAIL",
        error
      );
    }
  }
}
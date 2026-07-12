import { resend } from "@/lib/resend";

import { orderConfirmationEmail } from "@/lib/email/order-confirmation";

import { NotificationService } from "@/lib/notification/NotificationService";

export class OrderNotificationService {

  //--------------------------------------------------------
  // Plantilla HTML reutilizable
  //--------------------------------------------------------

  private static template(
    title: string,
    customerName: string,
    body: string,
    orderNumber: string
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

${orderNumber}

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

  static async orderCreated(params: {
    orderId: string;
    orderNumber?: string;
    customerName: string;
    customerEmail: string;
    total: number;
  }) {

    const {
      orderId,
      orderNumber,
      customerName,
      customerEmail,
      total,
    } = params;

    await NotificationService.newOrder(
      orderId,
      customerName
    );

    try {

      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to: customerEmail,

        subject:
          `Hemos recibido tu pedido #${orderNumber ?? orderId}`,

        html: orderConfirmationEmail(
          orderId,
          total
        ),

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

    orderNumber: string;

  }) {

    const {

      customerEmail,

      customerName,

      orderNumber,

    } = params;

    try {

      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to: customerEmail,

        subject:
          `Estamos preparando tu pedido #${orderNumber}`,

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

          orderNumber

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

    orderNumber: string;

    customerEmail: string;

    customerName: string;

  }) {
    const {
      customerEmail,
      customerName,
      orderNumber,
    } = params;

    

    await NotificationService.paymentApproved(
      orderNumber
    );

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",

        to: customerEmail,

        subject: `Pago aprobado #${orderNumber}`,

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
            <strong>${orderNumber}</strong>
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
    orderNumber: string;
    reason?: string;
  }) {
    const {
      customerEmail,
      customerName,
      orderNumber,
      reason,
    } = params;

    await NotificationService.paymentRejected(
      orderNumber,
      reason
    );

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",

        to: customerEmail,

        subject: `Pago rechazado #${orderNumber}`,

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
            <strong>${orderNumber}</strong>
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
    orderNumber: string;
  }) {
    const {
      customerEmail,
      customerName,
      orderNumber,
    } = params;

    await NotificationService.orderShipped(
      orderNumber
    );

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",

        to: customerEmail,

        subject: `Tu pedido fue enviado #${orderNumber}`,

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
              ${orderNumber}
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
    orderNumber: string;
  }) {
    const {
      customerEmail,
      customerName,
      orderNumber,
    } = params;

    await NotificationService.orderDelivered(
      orderNumber
    );

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",

        to: customerEmail,

        subject: `Pedido entregado #${orderNumber}`,

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
              ${orderNumber}
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
    orderNumber: string;
    reason?: string;
  }) {
    const {
      customerEmail,
      customerName,
      orderNumber,
      reason,
    } = params;

    await NotificationService.orderCancelled(
      orderNumber
    );

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",

        to: customerEmail,

        subject: `Pedido cancelado #${orderNumber}`,

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
              ${orderNumber}
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
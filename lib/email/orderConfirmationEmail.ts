import { emailLayout } from "./email-layout";
import { OrderEmailData } from "@/lib/order/types";


export function orderConfirmationEmail(
  order: OrderEmailData
) {
  const trackingUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/pedido/${order.order_number}`
      : `http://localhost:3000/pedido/${order.order_number}`;

  const paymentInfo =
    order.payment_method === "contraentrega"
      ? `
<div
style="
background:#FDF2F8;
border:1px solid #F9A8D4;
padding:18px;
border-radius:12px;
margin-top:25px;
">

<h3
style="
margin-top:0;
color:#DB2777;
">
Pago Contra Entrega
</h3>

<p>
Podrás realizar el pago cuando recibas tu pedido.
</p>

</div>
`
      : `
<div
style="
background:#FDF2F8;
border:1px solid #F9A8D4;
padding:18px;
border-radius:12px;
margin-top:25px;
">

<h3
style="
margin-top:0;
color:#DB2777;
">
Información para realizar el pago
</h3>

<p><strong>Nequi:</strong> 3123851338</p>

<p><strong>Daviplata:</strong> 3123851338</p>

<p><strong>Llave:</strong> 3204095701</p>

${
  order.payment_reference
    ? `
<p>
<strong>Referencia:</strong>
${order.payment_reference}
</p>
`
    : ""
}

<p
style="
margin-bottom:0;
">
Una vez realizado el pago podrás cargar el comprobante desde el seguimiento del pedido.
</p>

</div>
`;

  const productsHtml =
    order.order_items
      .map(
        (item) => `
<tr>

<td
style="
padding:14px;
border-bottom:1px solid #F3F4F6;
">

<table cellpadding="0" cellspacing="0">

<tr>

<td width="70">

${
  item.product_variants?.image ||
  item.products?.image
    ? `
<img
src="${
  item.product_variants?.image ??
  item.products?.image
}"
width="60"
height="60"
style="
display:block;
border-radius:8px;
object-fit:cover;
"
/>
`
    : `
<div
style="
width:60px;
height:60px;
background:#F3F4F6;
border-radius:8px;
display:flex;
align-items:center;
justify-content:center;
font-size:11px;
color:#9CA3AF;
">
Sin imagen
</div>
`
}

width="60"
height="60"
style="
display:block;
border-radius:8px;
object-fit:cover;
"
/>

</td>

<td style="padding-left:12px;">

<strong>
${item.products.name}
</strong>

</td>

</tr>

</table>

</td> 

<td
style="
padding:14px;
border-bottom:1px solid #F3F4F6;
text-align:center;
">
${item.product_variants?.color ?? "-"}
</td>

<td
style="
padding:14px;
border-bottom:1px solid #F3F4F6;
text-align:center;
">
${item.product_variants?.size ?? "-"}
</td>

<td
style="
padding:14px;
border-bottom:1px solid #F3F4F6;
text-align:center;
">
${item.quantity}
</td>

<td
style="
padding:14px;
border-bottom:1px solid #F3F4F6;
text-align:right;
">
$${Number(
  item.price
).toLocaleString("es-CO")}
</td>

</tr>
`
      )
      .join("");

  const body = `
  <div
style="
background:#ffffff;
border:1px solid #F3F4F6;
border-radius:16px;
padding:28px;
">

<p
style="
font-size:18px;
margin-top:0;
">
Hola <strong>${order.customer_name}</strong>,
</p>

<p>
¡Gracias por comprar en <strong>Luna Rosa</strong>! 💕
</p>

<p>
Hemos recibido correctamente tu pedido y muy pronto comenzaremos a prepararlo.
</p>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:25px;
">

<tr>

<td
style="
padding:10px 0;
font-weight:bold;
width:180px;
">
Pedido
</td>

<td>
${order.order_number}
</td>

</tr>

<tr>

<td
style="
padding:10px 0;
font-weight:bold;
">
Estado
</td>

<td>
Pendiente
</td>

</tr>

<tr>

<td
style="
padding:10px 0;
font-weight:bold;
">
Departamento
</td>

<td>
${order.department ?? "-"}
</td>

</tr>

<tr>

<td
style="
padding:10px 0;
font-weight:bold;
">
Municipio
</td>

<td>
${order.municipality ?? "-"}
</td>

</tr>

<tr>

<td
style="
padding:10px 0;
font-weight:bold;
vertical-align:top;
">
Dirección
</td>

<td>
${order.shipping_address}
</td>

</tr>

</table>

${paymentInfo}

<h2
style="
margin-top:40px;
color:#DB2777;
">
Productos del pedido
</h2>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border-collapse:collapse;
margin-top:20px;
">

<thead>

<tr
style="
background:#FDF2F8;
">

<th
align="left"
style="padding:14px;">
Producto
</th>

<th
align="center"
style="padding:14px;">
Color
</th>

<th
align="center"
style="padding:14px;">
Talla
</th>

<th
align="center"
style="padding:14px;">
Cant.
</th>

<th
align="right"
style="padding:14px;">
Precio
</th>

</tr>

</thead>

<tbody>

${productsHtml}

</tbody>

</table>

<div
style="
margin-top:35px;
background:#FAFAFA;
padding:22px;
border-radius:14px;
">
<table
width="100%"
cellpadding="0"
cellspacing="0">

<tr>

<td
style="
padding:8px 0;
">
Subtotal
</td>

<td
align="right"
style="
padding:8px 0;
font-weight:bold;
">
$${Number(order.subtotal).toLocaleString("es-CO")}
</td>

</tr>

<tr>

<td
style="
padding:8px 0;
">
Envío
</td>

<td
align="right"
style="
padding:8px 0;
font-weight:bold;
">
$${Number(order.shipping).toLocaleString("es-CO")}
</td>

</tr>

<tr>

<td
style="
padding-top:18px;
font-size:20px;
font-weight:bold;
color:#DB2777;
">
TOTAL
</td>

<td
align="right"
style="
padding-top:18px;
font-size:22px;
font-weight:bold;
color:#DB2777;
">
$${Number(order.total).toLocaleString("es-CO")}
</td>

</tr>

</table>

</div>

<div
style="
text-align:center;
margin-top:40px;
">

<a
href="${trackingUrl}"
style="
display:inline-block;
background:#EC4899;
color:#ffffff;
text-decoration:none;
padding:16px 34px;
border-radius:10px;
font-size:16px;
font-weight:bold;
">

Ver seguimiento del pedido

</a>

</div>

<p
style="
margin-top:40px;
">

Si tienes alguna duda puedes responder este correo o comunicarte con nuestro equipo de atención.

</p>

<p>

¡Gracias por confiar en
<strong>Luna Rosa</strong>!

</p>
`;

return emailLayout({
  title: "Pedido recibido correctamente",
  content: body,
});
}
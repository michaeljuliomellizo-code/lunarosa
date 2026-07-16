interface EmailLayoutProps {
  title: string;
  content: string;
}

export function emailLayout({
  title,
  content,
}: EmailLayoutProps) {
  return `
<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>${title}</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#fff7fb;
    font-family:Arial,Helvetica,sans-serif;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#fff7fb;
    padding:40px 20px;
  "
>

<tr>

<td align="center">

<table
  width="650"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 12px 40px rgba(0,0,0,.08);
  "
>

<tr>

<td
  align="center"
  style="
    background:linear-gradient(135deg,#ff4f93,#ff7ab8);
    padding:35px;
  "
>

<img
  src="https://lunarosa.store/LunaRosa.png"
  alt="Luna Rosa"
  width="130"
  style="display:block;margin:auto"
/>

<h1
  style="
    color:#ffffff;
    margin:20px 0 0;
    font-size:34px;
    font-weight:700;
  "
>
Luna Rosa
</h1>

<p
  style="
    color:#ffe6f2;
    margin-top:10px;
    font-size:15px;
  "
>
Moda femenina • Elegancia • Estilo
</p>

</td>

</tr>

<tr>

<td
  style="
    padding:40px;
    color:#374151;
    font-size:16px;
    line-height:1.8;
  "
>

<h2
  style="
    margin-top:0;
    color:#ec4899;
    font-size:28px;
  "
>
${title}
</h2>

${content}

</td>

</tr>

<tr>

<td
  style="
    background:#fafafa;
    padding:30px;
    text-align:center;
    border-top:1px solid #eee;
  "
>

<p
  style="
    margin:0;
    color:#666;
    font-size:14px;
  "
>
Gracias por confiar en
<strong>Luna Rosa</strong>.
</p>

<p
  style="
    margin-top:12px;
    color:#999;
    font-size:13px;
  "
>
www.lunarosa.store
</p>

<p
  style="
    margin-top:6px;
    color:#999;
    font-size:13px;
  "
>
WhatsApp: +57 312 385 1338
</p>

<p
  style="
    margin-top:6px;
    color:#999;
    font-size:13px;
  "
>
lunarosa.mujer10@gmail.com
</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
}
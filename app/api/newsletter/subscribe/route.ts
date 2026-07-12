import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
req: Request
) {
try {
const body =
await req.json();


const { email } =
  body;

if (!email) {
  return NextResponse.json(
    {
      error:
        "Email requerido",
    },
    {
      status: 400,
    }
  );
}

const { data: existing } =
  await supabase
    .from(
      "newsletter_subscribers"
    )
    .select("id")
    .eq("email", email)
    .maybeSingle();

if (existing) {
  return NextResponse.json({
    success: true,
    message:
      "Ya estás suscrito",
  });
}

const { error } =
  await supabase
    .from(
      "newsletter_subscribers"
    )
    .insert([
      {
        email,
        active: true,
      },
    ]);

if (error) {
  return NextResponse.json(
    {
      error:
        error.message,
    },
    {
      status: 400,
    }
  );
}

return NextResponse.json({
  success: true,
});


} catch (error: any) {
return NextResponse.json(
{
error:
error.message ||
"Error interno",
},
{
status: 500,
}
);
}
}

import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  req: Request
) {
  const body =
    await req.json();

  const {
    userId,
  } = body;

  const code =
    `LR${Math.floor(
      100000 +
        Math.random() *
          900000
    )}`;

  const { error } =
    await supabase
      .from("profiles")
      .update({
        referral_code:
          code,
      })
      .eq(
        "id",
        userId
      );

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
    code,
  });
}
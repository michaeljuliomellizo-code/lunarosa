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

  const {
    data: loyalty,
  } = await supabase
    .from(
      "loyalty_points"
    )
    .select("*")
    .eq(
      "user_id",
      userId
    )
    .single();

  if (
    !loyalty
  ) {
    return NextResponse.json(
      {
        error:
          "No existe programa VIP",
      },
      {
        status: 400,
      }
    );
  }

  let discount = 5;

  if (
    loyalty.level ===
    "gold"
  ) {
    discount = 10;
  }

  if (
    loyalty.level ===
    "platinum"
  ) {
    discount = 15;
  }

  const code =
    `VIP${Math.floor(
      Math.random() *
        100000
    )}`;

  await supabase
    .from("coupons")
    .insert({
      code,

      discount,

      active: true,
    });

  return NextResponse.json({
    code,
    discount,
  });
}
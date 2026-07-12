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

    const {
      userId,
      orderId,
      total,
    } = body;

    const earnedPoints =
      Math.floor(
        Number(total) / 10000
      );

    const {
      data: loyalty,
    } = await supabase
      .from("loyalty_points")
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .single();

    if (!loyalty) {
      await supabase
        .from(
          "loyalty_points"
        )
        .insert({
          user_id:
            userId,

          points:
            earnedPoints,

          lifetime_points:
            earnedPoints,

          level:
            "silver",
        });
    } else {
      const lifetime =
        loyalty.lifetime_points +
        earnedPoints;

      let level =
        "silver";

      if (
        lifetime >= 1000
      ) {
        level =
          "platinum";
      } else if (
        lifetime >= 500
      ) {
        level =
          "gold";
      }

      await supabase
        .from(
          "loyalty_points"
        )
        .update({
          points:
            loyalty.points +
            earnedPoints,

          lifetime_points:
            lifetime,

          level,
        })
        .eq(
          "user_id",
          userId
        );
    }

    await supabase
      .from(
        "loyalty_transactions"
      )
      .insert({
        user_id:
          userId,

        points:
          earnedPoints,

        type:
          "purchase",

        description:
          `Compra ${orderId}`,
      });

    return NextResponse.json({
      success: true,
    });
  } catch (
    error: any
  ) {
    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}
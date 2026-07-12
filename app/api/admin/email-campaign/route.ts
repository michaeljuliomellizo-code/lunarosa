import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { resend } from "@/lib/resend";

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
      subject,
      content,
    } = body;

    const { data } =
      await supabase
        .from("profiles")
        .select("email");

    for (const user of data || []) {
      if (!user.email)
        continue;

      await resend.emails.send({
        from:
          "onboarding@resend.dev",

        to: user.email,

        subject,

        html: content,
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
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
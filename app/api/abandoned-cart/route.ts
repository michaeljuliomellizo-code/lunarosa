import { NextResponse } from "next/server";

console.log(
  "SERVICE ROLE:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);
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
      email,
      customer_name,
      items,
      total,
    } = body;

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

    const { error } =
      await supabase
        .from(
          "abandoned_carts"
        )
        .upsert(
          {
            email,

            customer_name,

            items,

            total,

            updated_at:
              new Date().toISOString(),
          },
          {
            onConflict:
              "email",
          }
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
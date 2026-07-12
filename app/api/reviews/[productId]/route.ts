import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      productId: string;
    }>;
  }
) {
  const { productId } =
    await params;

  const { data, error } =
    await supabase
      .from("reviews")
      .select("*")
      .eq(
        "product_id",
        productId
      )
      .eq(
        "approved",
        true
      )
      .order(
        "created_at",
        {
          ascending: false,
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

  return NextResponse.json(
    data
  );
}
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";



const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    

    const { id } =
      await params;

    console.log("ORDER ID:", id);

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .select(`
        *,
        order_items(
          *,
          products(
            id,
            name,
            slug,
            image,
            price
          ),
          product_variants(
            id,
            size,
            color
          )
        ),
        order_status_history(
          *
        )
      `)
      .eq("id", id)
      .single();

    console.dir(order, {
        depth: null,
      });
    console.log("SUPABASE ERROR:", error);

    if (error || !order) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Pedido no encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error: any) {

    console.error(
      "GET ORDER ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ??
          "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );

  }
}
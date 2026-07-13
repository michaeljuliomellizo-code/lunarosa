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
    const { id } = await params;

    const { data: order, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        order_number,
        customer_name,
        customer_email,
        phone,
        shipping_address,
        notes,
        subtotal,
        shipping,
        total,
        status,
        payment_status,
        payment_method,
        payment_reference,
        payment_proof,
        created_at,
        shipped_at,
        delivered_at,
        tracking_number,
        carrier,
        order_items(
          id,
          product_id,
          variant_id,
          quantity,
          price,
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
          id,
          status,
          notes,
          created_at
        )
      `
      )
      .eq("id", id)
      .order("created_at", {
        foreignTable: "order_status_history",
        ascending: true,
      })
      .single();

    if (error || !order) {
      return NextResponse.json(
        {
          success: false,
          error: "Pedido no encontrado.",
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
    console.error("PUBLIC ORDER ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}
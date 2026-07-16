import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { OrderValidator } from "@/lib/order/OrderValidator";
import { OrderService } from "@/lib/order/OrderService";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    OrderValidator.validate(body);

    const {
      customer_name,
      customer_email,
      customer_phone,
      
      department,
      municipality,
      shipping_address,

      notes,
      subtotal,
      shipping,
      total,
      coupon_code,
      referral_code,
      payment_method,
      payment_reference,
      payment_proof,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "El pedido no contiene productos.",
        },
        {
          status: 400,
        }
      );
    }

    for (const item of items) {
      if (!item.id) {
        return NextResponse.json(
          {
            success: false,
            error: `Producto inválido: ${item.name}`,
          },
          {
            status: 400,
          }
        );
      }
    }

    const order = await OrderService.create({
      customer_name,
      customer_email,
      customer_phone,

      department,
      municipality,
      shipping_address,

      notes,
      subtotal,
      shipping,
      total,
      coupon_code,
      referral_code,
      payment_method,
      payment_reference,
      payment_proof,
      items,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order_number: order.order_number,
      paymentStatus: order.payment_status,
      status: order.status,
    });
  } catch (error: any) {
    console.error("ORDER API ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Error interno del servidor",
      },
      {
        status: 500,
      }
    );
  }
}
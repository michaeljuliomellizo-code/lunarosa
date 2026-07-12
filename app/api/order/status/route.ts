import { NextResponse } from "next/server";

import { OrderService } from "@/lib/order/OrderService";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await OrderService.create(body);

    return NextResponse.json(
      {
        success: true,

        orderId: order.id,

        orderNumber: order.orderNumber,

        paymentStatus: order.payment_status,

        status: order.status,
      },
      {
        status: 201,
      }
    );
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
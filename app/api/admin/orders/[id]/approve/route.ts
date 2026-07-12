import { NextRequest, NextResponse } from "next/server";

import { OrderService } from "@/lib/order/OrderService";
import { OrderHistoryService } from "@/lib/order/OrderHistoryService";
import { OrderNotificationService } from "@/lib/order/OrderNotificationService";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@/lib/order/constants";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const order =
      await OrderService.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Pedido no encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      order.payment_status ===
      PAYMENT_STATUS.PAID
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "El pedido ya fue aprobado.",
        },
        {
          status: 400,
        }
      );
    }

    await OrderService.updatePaymentStatus(
      id,
      PAYMENT_STATUS.PAID
    );

    await OrderService.updateStatus(
      id,
      ORDER_STATUS.PROCESSING
    );

    await OrderHistoryService.create(
      id,
      ORDER_STATUS.PROCESSING,
      "Pago aprobado por administrador."
    );

    await OrderNotificationService.orderProcessing({
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
    });

    return NextResponse.json({
      success: true,
      message:
        "Pago aprobado correctamente.",
    });
  } catch (error) {
    console.error(
      "APPROVE ORDER ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}
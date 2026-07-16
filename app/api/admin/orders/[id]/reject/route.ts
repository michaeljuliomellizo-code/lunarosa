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

    const body = await request.json();

    const reason =
      body.reason?.trim() ??
      "Pago rechazado por el administrador.";

    const order =
      await OrderService.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pedido no encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      order.status ===
      ORDER_STATUS.CANCELLED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pedido ya está cancelado.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      order.payment_status ===
      PAYMENT_STATUS.REJECTED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pago ya fue rechazado.",
        },
        {
          status: 400,
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
          message:
            "No es posible rechazar un pago que ya fue aprobado.",
        },
        {
          status: 400,
        }
      );
    }

    await OrderService.updatePaymentStatus(
      id,
      PAYMENT_STATUS.REJECTED
    );

    await OrderService.updateRejectionReason(
      id,
      reason
    );

    await OrderHistoryService.create(
      id,
      ORDER_STATUS.PENDING,
      reason
    );

    await OrderNotificationService.paymentRejected({
        order_number: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        reason: order.rejection_reason,
    });

    return NextResponse.json({
      success: true,
      message:
        "Pago rechazado correctamente.",
    });
  } catch (error) {
    console.error(
      "REJECT ORDER ERROR",
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
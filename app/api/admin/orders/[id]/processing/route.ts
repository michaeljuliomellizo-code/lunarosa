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
      order.status ===
      ORDER_STATUS.PROCESSING
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pedido ya se encuentra en preparación.",
        },
        {
          status: 400,
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
            "No es posible procesar un pedido cancelado.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      order.status ===
      ORDER_STATUS.DELIVERED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pedido ya fue entregado.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      order.payment_status !==
      PAYMENT_STATUS.PAID
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pedido debe tener el pago aprobado antes de iniciar la preparación.",
        },
        {
          status: 400,
        }
      );
    }

    await OrderService.updateStatus(
      id,
      ORDER_STATUS.PROCESSING
    );

    await OrderHistoryService.create(
      id,
      ORDER_STATUS.PROCESSING,
      "Pedido enviado a preparación."
    );

    await OrderNotificationService.orderProcessing({
        order_number: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
    });

    return NextResponse.json({
      success: true,
      message:
        "Pedido actualizado a preparación correctamente.",
    });
  } catch (error) {
    console.error(
      "PROCESSING ORDER ERROR",
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
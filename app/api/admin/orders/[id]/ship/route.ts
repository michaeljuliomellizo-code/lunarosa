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

    const carrier =
      body.carrier?.trim() ?? "";

    const trackingNumber =
      body.trackingNumber?.trim() ?? "";

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
      ORDER_STATUS.SHIPPED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pedido ya fue despachado.",
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
      order.status ===
      ORDER_STATUS.CANCELLED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No es posible despachar un pedido cancelado.",
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
            "El pedido debe tener el pago aprobado antes de ser despachado.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      order.status !==
      ORDER_STATUS.PROCESSING
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El pedido debe estar en preparación antes del despacho.",
        },
        {
          status: 400,
        }
      );
    }

    await OrderService.update(
      id,
      {
        carrier,
        tracking_number:
          trackingNumber,
      }
    );

    await OrderService.updateStatus(
      id,
      ORDER_STATUS.SHIPPED
    );

    await OrderService.updateShippedAt(
      id
    );

    await OrderHistoryService.create(
      id,
      ORDER_STATUS.SHIPPED,
      `Pedido despachado${
        carrier
          ? ` por ${carrier}`
          : ""
      }${
        trackingNumber
          ? ` - Guía: ${trackingNumber}`
          : ""
      }.`
    );

    await OrderNotificationService.orderShipped({
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        //trackingNumber: order.tracking_number,
        //carrier: order.carrier,
    });

    return NextResponse.json({
      success: true,
      message:
        "Pedido despachado correctamente.",
    });
  } catch (error) {
    console.error(
      "SHIP ORDER ERROR",
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
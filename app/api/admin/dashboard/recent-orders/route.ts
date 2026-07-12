import { NextResponse } from "next/server";

import { RecentOrdersService } from "@/lib/dashboard/RecentOrdersService";

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const limit = Number(
      searchParams.get("limit") ??
        "10"
    );

    const orders =
      await RecentOrdersService.getRecent(
        limit
      );

    const pendingOrders =
      await RecentOrdersService.pendingCount();

    const pendingPayments =
      await RecentOrdersService.pendingPayments();

    const todayOrders =
      await RecentOrdersService.countToday();

    return NextResponse.json({
      success: true,

      summary: {
        todayOrders,
        pendingOrders,
        pendingPayments,
      },

      data: orders,
    });
  } catch (error: any) {
    console.error(
      "RECENT ORDERS API ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Error obteniendo los pedidos recientes.",
      },
      {
        status: 500,
      }
    );
  }
}
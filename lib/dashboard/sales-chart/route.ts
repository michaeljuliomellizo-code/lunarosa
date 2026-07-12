import { NextResponse } from "next/server";

import { SalesChartService } from "@/lib/dashboard/SalesChartService";

export async function GET() {
  try {
    const chart =
      await SalesChartService.lastMonth();

    const totalSales =
      await SalesChartService.totalSales(30);

    const totalOrders =
      await SalesChartService.totalOrders(30);

    const averageTicket =
      await SalesChartService.averageTicket(30);

    return NextResponse.json({
      chart,
      summary: {
        totalSales,
        totalOrders,
        averageTicket,
      },
    });
  } catch (error: any) {
    console.error(
      "Dashboard Sales Chart",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ??
          "Error obteniendo estadísticas de ventas.",
      },
      {
        status: 500,
      }
    );
  }
}
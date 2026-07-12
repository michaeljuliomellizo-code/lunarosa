import { NextResponse } from "next/server";

import { DashboardService } from "@/lib/dashboard/DashboardService";

export async function GET() {
  try {
    const overview =
      await DashboardService.overview();

    return NextResponse.json({
      success: true,
      data: overview,
    });
  } catch (error: any) {
    console.error(
      "Dashboard Overview Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Error obteniendo el dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}
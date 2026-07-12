import { NextRequest, NextResponse } from "next/server";

import { ReportsService } from "@/lib/reports/ReportsService";

export async function GET(
  request: NextRequest
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const startDate =
      searchParams.get(
        "startDate"
      ) ?? undefined;

    const endDate =
      searchParams.get(
        "endDate"
      ) ?? undefined;

    const status =
      searchParams.get(
        "status"
      ) ?? undefined;

    const data =
      await ReportsService.salesByCategory(
        {
          startDate,
          endDate,
          status,
        }
      );

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(
      "SALES BY CATEGORY ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
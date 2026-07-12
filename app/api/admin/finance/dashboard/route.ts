import { NextRequest, NextResponse } from "next/server";

import { FinanceService } from "@/lib/finance/FinanceService";

export async function GET(
  request: NextRequest
) {
  try {
    const params =
      request.nextUrl.searchParams;

    const filters = {
      startDate:
        params.get("startDate") ??
        undefined,

      endDate:
        params.get("endDate") ??
        undefined,

      status:
        params.get("status") ??
        undefined,
    };

    const dashboard =
      await FinanceService.dashboard(
        filters
      );

    return NextResponse.json({
      success: true,
      data: dashboard,
    });
  } catch (error: any) {
    console.error(
      "FINANCE DASHBOARD ERROR",
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
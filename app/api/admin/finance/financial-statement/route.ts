import { NextRequest, NextResponse } from "next/server";
import { FinanceService } from "@/lib/finance/FinanceService";

export async function GET(
  request: NextRequest
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const filters = {
      startDate:
        searchParams.get("startDate") ??
        undefined,

      endDate:
        searchParams.get("endDate") ??
        undefined,

      status:
        searchParams.get("status") ??
        undefined,
    };

    const statement =
      await FinanceService.financialStatement(
        filters
      );

    return NextResponse.json({
      success: true,
      data: statement,
    });
  } catch (error) {
    console.error(
      "Financial Statement Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Error generating financial statement.",
      },
      {
        status: 500,
      }
    );
  }
}
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

    const paymentMethods =
      await FinanceService.paymentMethods(
        filters
      );

    const total =
      paymentMethods.reduce(
        (sum, item) =>
          sum +
          Number(item.total),
        0
      );

    const response =
      paymentMethods.map(
        (item) => ({
          ...item,
          percentage:
            total === 0
              ? 0
              : Number(
                  (
                    (Number(
                      item.total
                    ) /
                      total) *
                    100
                  ).toFixed(2)
                ),
        })
      );

    return NextResponse.json({
      success: true,
      total,
      data: response,
    });
  } catch (error: any) {
    console.error(
      "FINANCE PAYMENT METHODS ERROR",
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
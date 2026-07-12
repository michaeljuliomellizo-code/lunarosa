import { NextResponse } from "next/server";

import { FinanceService } from "@/lib/finance/FinanceService";

export async function GET() {
  try {
    const accounts =
      await FinanceService.accountsReceivable();

    const totalPending =
      accounts.reduce(
        (sum, account) =>
          sum +
          Number(account.total),
        0
      );

    const totalInvoices =
      accounts.length;

    const overdueInvoices =
      accounts.filter(
        (account) =>
          account.daysPending >
          30
      ).length;

    return NextResponse.json({
      success: true,

      summary: {
        totalPending,
        totalInvoices,
        overdueInvoices,
      },

      data: accounts,
    });
  } catch (error: any) {
    console.error(
      "FINANCE ACCOUNTS RECEIVABLE ERROR",
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
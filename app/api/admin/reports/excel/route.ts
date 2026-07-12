import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

import { ReportsService } from "@/lib/reports/ReportsService";

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

    const report =
      await ReportsService.completeReport(
        filters
      );

    const workbook =
      XLSX.utils.book_new();

    //------------------------------------
    // Resumen
    //------------------------------------

    const summarySheet =
      XLSX.utils.json_to_sheet([
        {
          "Total Ventas":
            report.summary
              .totalSales,

          "Total Pedidos":
            report.summary
              .totalOrders,

          Subtotal:
            report.summary
              .subtotal,

          Envíos:
            report.summary
              .shippingTotal,

          "Ticket Promedio":
            report.summary
              .averageTicket,
        },
      ]);

    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      "Resumen"
    );

    //------------------------------------
    // Ventas por Día
    //------------------------------------

    const salesDaySheet =
      XLSX.utils.json_to_sheet(
        report.salesByDay
      );

    XLSX.utils.book_append_sheet(
      workbook,
      salesDaySheet,
      "Ventas por Día"
    );

    //------------------------------------
    // Categorías
    //------------------------------------

    const categorySheet =
      XLSX.utils.json_to_sheet(
        report.salesByCategory
      );

    XLSX.utils.book_append_sheet(
      workbook,
      categorySheet,
      "Categorías"
    );

    //------------------------------------
    // Productos
    //------------------------------------

    const productSheet =
      XLSX.utils.json_to_sheet(
        report.salesByProduct
      );

    XLSX.utils.book_append_sheet(
      workbook,
      productSheet,
      "Productos"
    );

    //------------------------------------
    // Clientes
    //------------------------------------

    const customerSheet =
      XLSX.utils.json_to_sheet(
        report.salesByCustomer
      );

    XLSX.utils.book_append_sheet(
      workbook,
      customerSheet,
      "Clientes"
    );

    //------------------------------------

    const buffer =
      XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });

    return new NextResponse(
      buffer,
      {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

          "Content-Disposition":
            `attachment; filename=Reporte_${new Date()
              .toISOString()
              .substring(0, 10)}.xlsx`,
        },
      }
    );
  } catch (error: any) {
    console.error(
      "EXPORT EXCEL",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}
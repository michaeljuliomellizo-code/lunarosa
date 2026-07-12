import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

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

    const pdf =
      new PDFDocument({
        size: "A4",
        margin: 40,
      });

    const buffers: Buffer[] = [];

    pdf.on("data", (chunk) =>
      buffers.push(chunk)
    );

    const endPromise =
      new Promise<Buffer>(
        (resolve) => {
          pdf.on("end", () => {
            resolve(
              Buffer.concat(
                buffers
              )
            );
          });
        }
      );

    //-----------------------------------
    // Encabezado
    //-----------------------------------

    pdf
      .fontSize(24)
      .text(
        "Luna Rosa",
        {
          align: "center",
        }
      );

    pdf
      .fontSize(18)
      .text(
        "Reporte General",
        {
          align: "center",
        }
      );

    pdf.moveDown();

    pdf
      .fontSize(10)
      .text(
        `Generado: ${new Date().toLocaleString()}`
      );

    pdf.moveDown(2);

    //-----------------------------------
    // Resumen
    //-----------------------------------

    pdf
      .fontSize(16)
      .text(
        "Resumen Ejecutivo"
      );

    pdf.moveDown();

    pdf.text(
      `Ventas Totales: $${Number(
        report.summary.totalSales
      ).toLocaleString()}`
    );

    pdf.text(
      `Pedidos: ${report.summary.totalOrders}`
    );

    pdf.text(
      `Subtotal: $${Number(
        report.summary.subtotal
      ).toLocaleString()}`
    );

    pdf.text(
      `Envíos: $${Number(
        report.summary.shippingTotal
      ).toLocaleString()}`
    );

    pdf.text(
      `Ticket Promedio: $${Number(
        report.summary.averageTicket
      ).toLocaleString()}`
    );

    //-----------------------------------

    pdf.moveDown(2);

    pdf
      .fontSize(16)
      .text(
        "Productos Más Vendidos"
      );

    pdf.moveDown();

    report.salesByProduct
      .slice(0, 10)
      .forEach(
        (
          product,
          index
        ) => {
          pdf.fontSize(10);

          pdf.text(
            `${index + 1}. ${
              product.name
            }`
          );

          pdf.text(
            `Cantidad: ${
              product.quantity
            }`
          );

          pdf.text(
            `Ventas: $${Number(
              product.revenue
            ).toLocaleString()}`
          );

          pdf.moveDown();
        }
      );

    //-----------------------------------

    pdf.addPage();

    pdf
      .fontSize(16)
      .text(
        "Mejores Clientes"
      );

    pdf.moveDown();

    report.salesByCustomer
      .slice(0, 15)
      .forEach(
        (
          customer,
          index
        ) => {
          pdf.fontSize(10);

          pdf.text(
            `${index + 1}. ${
              customer.customer
            }`
          );

          pdf.text(
            customer.email
          );

          pdf.text(
            `Pedidos: ${
              customer.orders
            }`
          );

          pdf.text(
            `Compras: $${Number(
              customer.total
            ).toLocaleString()}`
          );

          pdf.moveDown();
        }
      );

    //-----------------------------------

    pdf.end();

    const buffer =
      await endPromise;

    return new NextResponse(
        new Uint8Array(buffer),
        {
            headers: {
            "Content-Type":
                "application/pdf",

            "Content-Disposition":
                `attachment; filename=Reporte_${new Date()
                .toISOString()
                .substring(
                    0,
                    10
                )}.pdf`,
            },
        }
    );
  } catch (error: any) {
    console.error(
      "EXPORT PDF",
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
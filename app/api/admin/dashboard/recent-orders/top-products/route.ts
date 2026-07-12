import { NextResponse } from "next/server";

import { TopProductsService } from "@/lib/dashboard/TopProductsService";

export async function GET() {
  try {
    const products =
      await TopProductsService.getTopTen();

    const bestSeller =
      await TopProductsService.getBestSeller();

    const totalUnitsSold =
      await TopProductsService.totalUnitsSold();

    const totalRevenue =
      await TopProductsService.totalRevenue();

    return NextResponse.json({
      products,
      summary: {
        totalProducts: products.length,
        totalUnitsSold,
        totalRevenue,
        bestSeller,
      },
    });
  } catch (error: any) {
    console.error(
      "Dashboard Top Products",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ??
          "Error obteniendo productos más vendidos.",
      },
      {
        status: 500,
      }
    );
  }
}
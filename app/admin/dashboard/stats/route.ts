import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: orders, error } =
      await supabase
        .from("orders")
        .select(`
          id,
          total,
          status,
          payment_status,
          created_at
        `);

    if (error) {
      throw new Error(error.message);
    }

    const now = new Date();

    const today =
      now.toISOString().split("T")[0];

    const currentMonth =
      now.getMonth();

    const currentYear =
      now.getFullYear();

    let totalOrders = 0;

    let pendingOrders = 0;

    let processingOrders = 0;

    let shippedOrders = 0;

    let deliveredOrders = 0;

    let cancelledOrders = 0;

    let waitingPayments = 0;

    let todaySales = 0;

    let monthSales = 0;

    let totalRevenue = 0;

    orders?.forEach((order) => {
      totalOrders++;

      const total =
        Number(order.total ?? 0);

      totalRevenue += total;

      switch (order.status) {
        case "pending":
          pendingOrders++;
          break;

        case "processing":
          processingOrders++;
          break;

        case "shipped":
          shippedOrders++;
          break;

        case "delivered":
          deliveredOrders++;
          break;

        case "cancelled":
          cancelledOrders++;
          break;
      }

      if (
        order.payment_status ===
        "waiting_validation"
      ) {
        waitingPayments++;
      }

      const orderDate =
        new Date(order.created_at);

      if (
        order.created_at.startsWith(
          today
        )
      ) {
        todaySales += total;
      }

      if (
        orderDate.getMonth() ===
          currentMonth &&
        orderDate.getFullYear() ===
          currentYear
      ) {
        monthSales += total;
      }
    });

    const averageTicket =
      totalOrders > 0
        ? Number(
            (
              totalRevenue /
              totalOrders
            ).toFixed(2)
          )
        : 0;

    return NextResponse.json({
      totalOrders,

      pendingOrders,

      processingOrders,

      shippedOrders,

      deliveredOrders,

      cancelledOrders,

      waitingPayments,

      todaySales,

      monthSales,

      averageTicket,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message:
          error.message ??
          "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}
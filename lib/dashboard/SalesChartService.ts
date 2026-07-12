import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface SalesChartItem {
  date: string;
  sales: number;
  orders: number;
}

export class SalesChartService {
  //-----------------------------------------
  // Últimos N días
  //-----------------------------------------

  static async lastDays(
    days = 30
  ): Promise<SalesChartItem[]> {
    const startDate = new Date();

    startDate.setDate(
      startDate.getDate() - days + 1
    );

    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          created_at,
          total,
          status
        `)
        .gte(
          "created_at",
          startDate.toISOString()
        )
        .neq("status", "cancelled")
        .order("created_at", {
          ascending: true,
        });

    if (error) {
      throw new Error(error.message);
    }

    const map = new Map<
      string,
      SalesChartItem
    >();

    for (let i = 0; i < days; i++) {
      const d = new Date(startDate);

      d.setDate(
        startDate.getDate() + i
      );

      const key = d
        .toISOString()
        .split("T")[0];

      map.set(key, {
        date: key,
        sales: 0,
        orders: 0,
      });
    }

    data?.forEach((order) => {
      const key =
        order.created_at
          .split("T")[0];

      const current =
        map.get(key);

      if (!current) return;

      current.sales += Number(
        order.total
      );

      current.orders += 1;
    });

    return Array.from(
      map.values()
    );
  }

  //-----------------------------------------
  // Hoy
  //-----------------------------------------

  static async today() {
    return this.lastDays(1);
  }

  //-----------------------------------------
  // Últimos 7 días
  //-----------------------------------------

  static async lastWeek() {
    return this.lastDays(7);
  }

  //-----------------------------------------
  // Últimos 30 días
  //-----------------------------------------

  static async lastMonth() {
    return this.lastDays(30);
  }

  //-----------------------------------------
  // Ticket promedio
  //-----------------------------------------

  static async averageTicket(
    days = 30
  ) {
    const chart =
      await this.lastDays(days);

    let sales = 0;
    let orders = 0;

    chart.forEach((d) => {
      sales += d.sales;
      orders += d.orders;
    });

    if (orders === 0)
      return 0;

    return sales / orders;
  }

  //-----------------------------------------
  // Total ventas
  //-----------------------------------------

  static async totalSales(
    days = 30
  ) {
    const chart =
      await this.lastDays(days);

    return chart.reduce(
      (sum, item) =>
        sum + item.sales,
      0
    );
  }

  //-----------------------------------------
  // Total pedidos
  //-----------------------------------------

  static async totalOrders(
    days = 30
  ) {
    const chart =
      await this.lastDays(days);

    return chart.reduce(
      (sum, item) =>
        sum + item.orders,
      0
    );
  }
}
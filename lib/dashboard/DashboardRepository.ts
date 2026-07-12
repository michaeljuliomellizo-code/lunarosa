import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class DashboardRepository {
  //---------------------------------------
  // Ventas de Hoy
  //---------------------------------------

  static async getTodaySales() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("orders")
      .select("total")
      .gte("created_at", today.toISOString())
      .eq("payment_status", "approved");

    if (error) {
      throw new Error(error.message);
    }

    return (
      data?.reduce(
        (sum, order) => sum + Number(order.total),
        0
      ) ?? 0
    );
  }

  //---------------------------------------
  // Ventas del Mes
  //---------------------------------------

  static async getMonthSales() {
    const firstDay = new Date();

    firstDay.setDate(1);
    firstDay.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("orders")
      .select("total")
      .gte("created_at", firstDay.toISOString())
      .eq("payment_status", "approved");

    if (error) {
      throw new Error(error.message);
    }

    return (
      data?.reduce(
        (sum, order) => sum + Number(order.total),
        0
      ) ?? 0
    );
  }

  //---------------------------------------
  // Total Pedidos
  //---------------------------------------

  static async getOrdersCount() {
    const { count, error } = await supabase
      .from("orders")
      .select("*", {
        head: true,
        count: "exact",
      });

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  }

  //---------------------------------------
  // Pedidos por Estado
  //---------------------------------------

  static async getOrdersByStatus(
    status: string
  ) {
    const { count, error } = await supabase
      .from("orders")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("status", status);

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  }

  //---------------------------------------
  // Clientes
  //---------------------------------------

  static async getCustomersCount() {
    const { count, error } = await supabase
      .from("customers")
      .select("*", {
        head: true,
        count: "exact",
      });

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  }

  //---------------------------------------
  // Ticket Promedio
  //---------------------------------------

  static async getAverageTicket() {
    const { data, error } = await supabase
      .from("orders")
      .select("total")
      .eq("payment_status", "approved");

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return 0;
    }

    const total = data.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );

    return total / data.length;
  }

  //---------------------------------------
  // Últimos Pedidos
  //---------------------------------------

  static async getRecentOrders(
    limit = 10
  ) {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_name,
        total,
        status,
        payment_status,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  //---------------------------------------
  // Clientes Recientes
  //---------------------------------------

  static async getRecentCustomers(
    limit = 10
  ) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  //---------------------------------------
  // Bajo Stock
  //---------------------------------------

  static async getLowStockProducts(
    threshold = 5
  ) {
    const { data, error } = await supabase
      .from("product_variants")
      .select(`
        id,
        stock,
        size,
        color,
        products(
          id,
          name,
          slug
        )
      `)
      .lte("stock", threshold)
      .order("stock", {
        ascending: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  //---------------------------------------
  // Movimientos recientes inventario
  //---------------------------------------

  static async getRecentInventoryMovements(
    limit = 10
  ) {
    const { data, error } = await supabase
      .from("inventory_movements")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }
}
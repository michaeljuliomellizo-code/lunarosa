import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export class ReportsRepository {
  static async getOrders(
    filters?: ReportFilters
  ) {
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    if (filters?.startDate) {
      query = query.gte(
        "created_at",
        filters.startDate
      );
    }

    if (filters?.endDate) {
      query = query.lte(
        "created_at",
        filters.endDate
      );
    }

    if (filters?.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const {
      data,
      error,
    } = await query;

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async getOrderById(
    orderId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
  }

  static async getOrderItems(
    filters?: ReportFilters
  ) {
    let ordersQuery =
      supabase
        .from("orders")
        .select("id");

    if (filters?.startDate) {
      ordersQuery =
        ordersQuery.gte(
          "created_at",
          filters.startDate
        );
    }

    if (filters?.endDate) {
      ordersQuery =
        ordersQuery.lte(
          "created_at",
          filters.endDate
        );
    }

    if (filters?.status) {
      ordersQuery =
        ordersQuery.eq(
          "status",
          filters.status
        );
    }

    const {
      data: orders,
      error: ordersError,
    } =
      await ordersQuery;

    if (ordersError) {
      throw new Error(
        ordersError.message
      );
    }

    if (
      !orders ||
      orders.length === 0
    ) {
      return [];
    }

    const orderIds =
      orders.map(
        (order) => order.id
      );

    const {
      data,
      error,
    } = await supabase
      .from("order_items")
      .select(`
        *,
        products(
          id,
          name,
          slug,
          category_id
        )
      `)
      .in(
        "order_id",
        orderIds
      );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async getOrderItemsByOrder(
    orderId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("order_items")
      .select(`
        *,
        products(
          id,
          name,
          slug,
          category_id
        )
      `)
      .eq(
        "order_id",
        orderId
      );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async getCustomers() {
    const {
      data,
      error,
    } = await supabase
      .from("customers")
      .select("*")
      .order("name");

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async getCustomerByEmail(
    email: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
  }

  static async getProducts() {
    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select(`
        *,
        categories(
          id,
          name
        )
      `)
      .order("name");

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async getCategories() {
    const {
      data,
      error,
    } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }
}
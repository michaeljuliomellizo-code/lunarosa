import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface FinanceFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export class FinanceRepository {
  static async getDashboard(
    filters: FinanceFilters = {}
  ) {
    let query = supabase
      .from("orders")
      .select("*");

    if (filters.startDate) {
      query = query.gte(
        "created_at",
        filters.startDate
      );
    }

    if (filters.endDate) {
      query = query.lte(
        "created_at",
        filters.endDate
      );
    }

    if (filters.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const { data, error } =
      await query;

    if (error) throw error;

    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const week = new Date(today);
    week.setDate(
      today.getDate() - 7
    );

    const month = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const year = new Date(
      now.getFullYear(),
      0,
      1
    );

    let salesToday = 0;
    let salesWeek = 0;
    let salesMonth = 0;
    let salesYear = 0;

    let paid = 0;
    let pending = 0;

    let totalOrders = 0;

    data?.forEach((order) => {
      const total = Number(
        order.total ?? 0
      );

      const created =
        new Date(
          order.created_at
        );

      totalOrders++;

      if (
        created >= today
      ) {
        salesToday += total;
      }

      if (
        created >= week
      ) {
        salesWeek += total;
      }

      if (
        created >= month
      ) {
        salesMonth += total;
      }

      if (
        created >= year
      ) {
        salesYear += total;
      }

      if (
        order.payment_status ===
        "paid"
      ) {
        paid += total;
      } else {
        pending += total;
      }
    });

    return {
      salesToday,
      salesWeek,
      salesMonth,
      salesYear,
      paid,
      pending,
      totalOrders,
      averageTicket:
        totalOrders === 0
          ? 0
          : salesYear /
            totalOrders,
    };
  }

  static async getCashFlow(
    filters: FinanceFilters = {}
  ) {
    let query = supabase
      .from("orders")
      .select(
        "created_at,total"
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

    if (filters.startDate) {
      query = query.gte(
        "created_at",
        filters.startDate
      );
    }

    if (filters.endDate) {
      query = query.lte(
        "created_at",
        filters.endDate
      );
    }

    if (filters.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const { data, error } =
      await query;

    if (error) throw error;

    const grouped: Record<
      string,
      number
    > = {};

    data?.forEach((order) => {
      const day =
        order.created_at.substring(
          0,
          10
        );

      grouped[day] =
        (grouped[day] ??
          0) +
        Number(order.total);
    });

    return Object.entries(
      grouped
    ).map(
      ([date, total]) => ({
        date,
        total,
      })
    );
  }

  static async getPaymentMethods(
    filters: FinanceFilters = {}
  ) {
    let query = supabase
      .from("orders")
      .select(
        "payment_method,total"
      );

    if (filters.startDate) {
      query = query.gte(
        "created_at",
        filters.startDate
      );
    }

    if (filters.endDate) {
      query = query.lte(
        "created_at",
        filters.endDate
      );
    }

    if (filters.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const { data, error } =
      await query;

    if (error) throw error;

    const grouped: Record<
      string,
      number
    > = {};

    data?.forEach((order) => {
      const method =
        order.payment_method ??
        "Sin definir";

      grouped[method] =
        (grouped[
          method
        ] ?? 0) +
        Number(order.total);
    });

    return Object.entries(
      grouped
    ).map(
      ([method, total]) => ({
        method,
        total,
      })
    );
  }

  static async getAccountsReceivable() {
    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .neq(
          "payment_status",
          "paid"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return data?.map(
      (order) => ({
        id: order.id,
        order_number:
          order.order_number,
        customer:
          order.customer_name,
        email:
          order.customer_email,
        total:
          Number(order.total),
        createdAt:
          order.created_at,
        paymentStatus:
          order.payment_status,
        status:
          order.status,
      })
    );
  }

  static async getFinancialStatement(
    filters: FinanceFilters = {}
  ) {
    let query = supabase
      .from("orders")
      .select("*");

    if (filters.startDate) {
      query = query.gte(
        "created_at",
        filters.startDate
      );
    }

    if (filters.endDate) {
      query = query.lte(
        "created_at",
        filters.endDate
      );
    }

    if (filters.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const { data, error } =
      await query;

    if (error) throw error;

    let subtotal = 0;
    let shipping = 0;
    let sales = 0;
    let cancelled = 0;
    let completed = 0;

    data?.forEach((order) => {
      subtotal += Number(
        order.subtotal ?? 0
      );

      shipping += Number(
        order.shipping ?? 0
      );

      sales += Number(
        order.total ?? 0
      );

      if (
        order.status ===
        "cancelled"
      ) {
        cancelled++;
      }

      if (
        order.status ===
        "completed"
      ) {
        completed++;
      }
    });

    return {
      subtotal,
      shipping,
      sales,
      cancelled,
      completed,
      averageTicket:
        data?.length
          ? sales /
            data.length
          : 0,
    };
  }
}
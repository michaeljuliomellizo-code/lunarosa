import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface RecentOrder {
  id: string;
  order_number: string;

  customer_name: string;
  customer_email: string;

  total: number;

  status: string;
  payment_status: string;
  payment_method: string;

  created_at: string;

  items_count: number;
}

export class RecentOrdersService {
  //-----------------------------------------
  // Últimos pedidos
  //-----------------------------------------

  static async getRecent(
    limit = 10
  ): Promise<RecentOrder[]> {
    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          customer_name,
          customer_email,
          total,
          status,
          payment_status,
          payment_method,
          created_at,
          order_items(
            id
          )
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(limit);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return (
      data?.map(
        (order: any) => ({
          id: order.id,

          order_number:
            order.id,

          customer_name:
            order.customer_name,

          customer_email:
            order.customer_email,

          total: Number(
            order.total ?? 0
          ),

          status:
            order.status,

          payment_status:
            order.payment_status,

          payment_method:
            order.payment_method,

          created_at:
            order.created_at,

          items_count:
            order.order_items
              ?.length ?? 0,
        })
      ) ?? []
    );
  }

  //-----------------------------------------
  // Buscar un pedido reciente
  //-----------------------------------------

  static async findById(
    orderId: string
  ): Promise<RecentOrder | null> {
    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          customer_name,
          customer_email,
          total,
          status,
          payment_status,
          payment_method,
          created_at,
          order_items(
            id
          )
        `)
        .eq("id", orderId)
        .single();

    if (error) {
      return null;
    }

    return {
      id: data.id,

      order_number:
        data.id,

      customer_name:
        data.customer_name,

      customer_email:
        data.customer_email,

      total: Number(
        data.total ?? 0
      ),

      status:
        data.status,

      payment_status:
        data.payment_status,

      payment_method:
        data.payment_method,

      created_at:
        data.created_at,

      items_count:
        data.order_items
          ?.length ?? 0,
    };
  }

  //-----------------------------------------
  // Contar pedidos recientes
  //-----------------------------------------

  static async countToday() {
    const start =
      new Date();

    start.setHours(
      0,
      0,
      0,
      0
    );

    const { count, error } =
      await supabase
        .from("orders")
        .select("*", {
          count: "exact",
          head: true,
        })
        .gte(
          "created_at",
          start.toISOString()
        );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return count ?? 0;
  }

  //-----------------------------------------
  // Pedidos pendientes
  //-----------------------------------------

  static async pendingCount() {
    const { count, error } =
      await supabase
        .from("orders")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "status",
          "pending"
        );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return count ?? 0;
  }

  //-----------------------------------------
  // Pagos pendientes
  //-----------------------------------------

  static async pendingPayments() {
    const { count, error } =
      await supabase
        .from("orders")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "payment_status",
          "waiting_validation"
        );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return count ?? 0;
  }
}
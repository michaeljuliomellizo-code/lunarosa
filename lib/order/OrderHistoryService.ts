import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class OrderHistoryService {
  //-----------------------------------------
  // Crear registro
  //-----------------------------------------

  static async create(
    orderId: string,
    status: string,
    notes?: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("order_status_history")
      .insert({
        order_id: orderId,
        status,
        notes: notes ?? null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  //-----------------------------------------
  // Obtener historial completo
  //-----------------------------------------

  static async timeline(
    orderId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  //-----------------------------------------
  // Último estado
  //-----------------------------------------

  static async lastStatus(
    orderId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  //-----------------------------------------
  // Verificar si existe un estado
  //-----------------------------------------

  static async hasStatus(
    orderId: string,
    status: string
  ) {
    const {
      count,
      error,
    } = await supabase
      .from("order_status_history")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("order_id", orderId)
      .eq("status", status);

    if (error) {
      throw new Error(error.message);
    }

    return (count ?? 0) > 0;
  }

  //-----------------------------------------
  // Cambiar estado del pedido
  //-----------------------------------------

  static async changeStatus(
    orderId: string,
    status: string,
    notes?: string
  ) {
    const {
      error,
    } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", orderId);

    if (error) {
      throw new Error(error.message);
    }

    await this.create(
      orderId,
      status,
      notes
    );

    return true;
  }

  //-----------------------------------------
  // Actualizar pago + estado
  //-----------------------------------------

  static async changePaymentStatus(
    orderId: string,
    paymentStatus: string,
    orderStatus: string,
    notes?: string
  ) {
    const {
      error,
    } = await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus,
        status: orderStatus,
      })
      .eq("id", orderId);

    if (error) {
      throw new Error(error.message);
    }

    await this.create(
      orderId,
      orderStatus,
      notes
    );

    return true;
  }

  //-----------------------------------------
  // Cancelar pedido
  //-----------------------------------------

  static async cancel(
    orderId: string,
    reason?: string
  ) {
    return this.changeStatus(
      orderId,
      "cancelled",
      reason ?? "Pedido cancelado"
    );
  }

  //-----------------------------------------
  // Marcar enviado
  //-----------------------------------------

  static async shipped(
    orderId: string,
    guide?: string
  ) {
    return this.changeStatus(
      orderId,
      "shipped",
      guide
        ? `Guía: ${guide}`
        : "Pedido enviado"
    );
  }

  //-----------------------------------------
  // Marcar entregado
  //-----------------------------------------

  static async delivered(
    orderId: string
  ) {
    return this.changeStatus(
      orderId,
      "completed",
      "Pedido entregado"
    );
  }
}
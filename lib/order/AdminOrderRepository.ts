import { supabase } from "@/lib/supabase/client";

import {
  OrderStatus,
  PaymentStatus,
} from "./constants";

import {
  OrderWithRelations,
} from "./types";

export class AdminOrderRepository {
  static async getAll(): Promise<OrderWithRelations[]> {
    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          *,
          order_items(
            *,
            products(
              id,
              name,
              image,
              price
            ),
            product_variants(
              id,
              color,
              size
            )
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data as OrderWithRelations[]) ?? [];
  }

  static async getById(
    id: string
  ): Promise<OrderWithRelations | null> {
    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          *,
          order_items(
            *,
            products(
              id,
              name,
              image,
              price
            ),
            product_variants(
              id,
              color,
              size
            )
          ),
          order_status_history(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }

      throw error;
    }

    return data as OrderWithRelations;
  }

  static async updateStatus(
    orderId: string,
    status: OrderStatus
  ) {
    const { error } =
      await supabase
        .from("orders")
        .update({
          status,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) throw error;
  }

  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus
  ) {
    const { error } =
      await supabase
        .from("orders")
        .update({
          payment_status:
            paymentStatus,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) throw error;
  }

  static async addHistory(
    orderId: string,
    status: OrderStatus,
    notes?: string
  ) {
    const { error } =
      await supabase
        .from("order_status_history")
        .insert({
          order_id: orderId,
          status,
          notes:
            notes ?? null,
        });

    if (error) throw error;
  }

  static async updateTracking(
    orderId: string,
    trackingNumber: string,
    carrier: string,
    trackingUrl?: string
  ) {
    const { error } =
      await supabase
        .from("orders")
        .update({
          tracking_number:
            trackingNumber,
          carrier,
          tracking_url:
            trackingUrl ?? null,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) throw error;
  }

  static async updateCarrier(
    orderId: string,
    carrier: string
  ) {
    const { error } =
      await supabase
        .from("orders")
        .update({
          carrier,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) throw error;
  }

  static async updateGuide(
    orderId: string,
    guide: string
  ) {
    const { error } =
      await supabase
        .from("orders")
        .update({
          tracking_number:
            guide,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) throw error;
  }

  static async getNotificationData(
    orderId: string
  ) {
    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          customer_name,
          customer_email
        `)
        .eq("id", orderId)
        .single();

    if (error) throw error;

    return {
      id: data.id,
      customerEmail:
        data.customer_email,
      customerName:
        data.customer_name,
      order_number:
        data.order_number,
    };
  }
}
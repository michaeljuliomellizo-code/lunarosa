import { createClient } from "@supabase/supabase-js";

import { CreateOrderInput } from "./types";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
} from "./constants";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class OrderRepository {
  static async create(
    input: CreateOrderInput
  ) {
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      notes,
      subtotal,
      shipping,
      total,
      coupon_code,
      referral_code,
      payment_method,
      payment_reference,
      payment_proof,
    } = input;

    const { data, error } =
      await supabase
        .from("orders")
        .insert({
          customer_name,
          customer_email,
          phone: customer_phone,
          shipping_address,
          notes,
          subtotal,
          shipping,
          total,
          coupon_code,
          referral_code,
          payment_method,
          payment_reference,
          payment_proof,
          status:
            ORDER_STATUS.PENDING,
          payment_status:
            payment_method ===
            PAYMENT_METHOD.CASH_ON_DELIVERY
              ? PAYMENT_STATUS.PENDING
              : PAYMENT_STATUS.WAITING_VALIDATION,
        })
        .select()
        .single();

    if (error) {
       throw new Error(error.message);
    }

    return data;
  }

  static async findById(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async findWithRelations(
    id: string
  ) {
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
              slug,
              image,
              price
            ),
            product_variants!fk_order_items_variant(
              id,
              size,
              color
            )
          ),
          order_status_history(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
  }

    static async updateStatus(
        id: string,
        status: string
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update({
            status,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }

    static async updatePaymentStatus(
    id: string,
    paymentStatus: string
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update({
            payment_status:
            paymentStatus,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }

    static async updateRejectionReason(
    id: string,
    reason: string | null
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update({
            rejection_reason:
            reason,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }

    static async updateShippedAt(
    id: string
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update({
            shipped_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }

    static async updateDeliveredAt(
    id: string
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update({
            delivered_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }

    static async cancel(
    id: string
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update({
            status:
            ORDER_STATUS.CANCELLED,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }

    static async delete(
    id: string
    ) {
    const { error } =
        await supabase
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(
        error.message
        );
    }

    return true;
    }
    static async list(
    limit = 100
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .select(`
            *,
            order_items(
            quantity,
            price
            )
        `)
        .order("created_at", {
            ascending: false,
        })
        .limit(limit);

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data ?? [];
    }

    static async exists(
    id: string
    ) {
    const { count, error } =
        await supabase
        .from("orders")
        .select("id", {
            head: true,
            count: "exact",
            
        })
        .eq("id", id);

    if (error) {
        throw new Error(
        error.message
        );
    }

    return (count ?? 0) > 0;
    }

    static async update(
    id: string,
    values: Record<string, any>
    ) {
    const { data, error } =
        await supabase
        .from("orders")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(
        error.message
        );
    }

    return data;
    }
}
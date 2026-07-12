import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  total_spent: number;
  total_orders: number;
  last_order_at: string | null;
  created_at: string;
}

interface CreateCustomerInput {
  name: string;
  email: string;
  phone?: string | null;
  total_spent?: number;
  total_orders?: number;
  last_order_at?: string | null;
}

export class CustomerRepository {
  static async create(
    data: CreateCustomerInput
  ): Promise<Customer> {
    const { data: customer, error } =
      await supabase
        .from("customers")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          total_spent: data.total_spent ?? 0,
          total_orders: data.total_orders ?? 0,
          last_order_at:
            data.last_order_at ?? null,
        })
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return customer;
  }

  static async findById(
    id: string
  ): Promise<Customer | null> {
    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async findByEmail(
    email: string
  ): Promise<Customer | null> {
    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("email", email)
        .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async list(
    limit = 100
  ): Promise<Customer[]> {
    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .range(0, limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Customer[];
  }

  static async update(
    id: string,
    values: Partial<Customer>
  ): Promise<Customer> {
    const { data, error } =
      await supabase
        .from("customers")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async delete(
    id: string
  ) {
    const { error } =
      await supabase
        .from("customers")
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}
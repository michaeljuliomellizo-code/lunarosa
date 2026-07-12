import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class LoyaltyRepository {
  static async create(data: {
    customer_id: string;
    customer_email: string;
  }) {
    const { data: account, error } =
      await supabase
        .from("loyalty_accounts")
        .insert({
          customer_id: data.customer_id,
          customer_email:
            data.customer_email,
          points: 0,
          lifetime_points: 0,
        })
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return account;
  }

  static async findById(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("loyalty_accounts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async findByCustomer(
    customerId: string
  ) {
    const { data, error } =
      await supabase
        .from("loyalty_accounts")
        .select("*")
        .eq(
          "customer_id",
          customerId
        )
        .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async findByEmail(
    email: string
  ) {
    const { data, error } =
      await supabase
        .from("loyalty_accounts")
        .select("*")
        .eq(
          "customer_email",
          email
        )
        .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async list(
    limit = 100
  ) {
    const { data, error } =
      await supabase
        .from("loyalty_accounts")
        .select("*")
        .order("points", {
          ascending: false,
        })
        .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  static async update(
    id: string,
    values: Record<
      string,
      any
    >
  ) {
    const { data, error } =
      await supabase
        .from("loyalty_accounts")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async addPoints(
    id: string,
    points: number
  ) {
    const account =
      await this.findById(id);

    return await this.update(
      id,
      {
        points:
          Number(
            account.points ?? 0
          ) + Number(points),

        lifetime_points:
          Number(
            account.lifetime_points ??
              0
          ) + Number(points),
      }
    );
  }

  static async removePoints(
    id: string,
    points: number
  ) {
    const account =
      await this.findById(id);

    const balance =
      Number(
        account.points ?? 0
      );

    if (balance < points) {
      throw new Error(
        "Puntos insuficientes."
      );
    }

    return await this.update(
      id,
      {
        points:
          balance -
          Number(points),
      }
    );
  }

  static async registerTransaction(
    data: {
      loyalty_account_id: string;
      order_id?: string | null;
      type: string;
      points: number;
      description?: string | null;
    }
  ) {
    const {
      data: transaction,
      error,
    } = await supabase
      .from(
        "loyalty_transactions"
      )
      .insert({
        loyalty_account_id:
          data.loyalty_account_id,
        order_id:
          data.order_id ?? null,
        type: data.type,
        points: data.points,
        description:
          data.description ??
          null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return transaction;
  }

  static async history(
    loyaltyAccountId: string
  ) {
    const { data, error } =
      await supabase
        .from(
          "loyalty_transactions"
        )
        .select("*")
        .eq(
          "loyalty_account_id",
          loyaltyAccountId
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  static async delete(
    id: string
  ) {
    await supabase
      .from(
        "loyalty_transactions"
      )
      .delete()
      .eq(
        "loyalty_account_id",
        id
      );

    const { error } =
      await supabase
        .from(
          "loyalty_accounts"
        )
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}
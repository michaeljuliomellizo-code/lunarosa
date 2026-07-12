import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class ReferralRepository {
  static async create(data: {
    code: string;
    customer_id?: string | null;
    customer_email?: string | null;
  }) {
    const { data: referral, error } =
      await supabase
        .from("referrals")
        .insert({
          code: data.code,
          customer_id:
            data.customer_id ?? null,
          customer_email:
            data.customer_email ?? null,
          total_uses: 0,
          total_rewards: 0,
          active: true,
        })
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return referral;
  }

  static async findById(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("referrals")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async findByCode(
    code: string
  ) {
    const { data, error } =
      await supabase
        .from("referrals")
        .select("*")
        .eq("code", code)
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
        .from("referrals")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  static async update(
    id: string,
    values: Record<string, any>
  ) {
    const { data, error } =
      await supabase
        .from("referrals")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async registerUse(
    code: string
  ) {
    const referral =
      await this.findByCode(code);

    if (!referral) {
      throw new Error(
        "Código de referido no encontrado."
      );
    }

    return await this.update(
      referral.id,
      {
        total_uses:
          Number(
            referral.total_uses ?? 0
          ) + 1,
      }
    );
  }

  static async registerReward(
    code: string,
    amount: number
  ) {
    const referral =
      await this.findByCode(code);

    if (!referral) {
      throw new Error(
        "Código de referido no encontrado."
      );
    }

    return await this.update(
      referral.id,
      {
        total_rewards:
          Number(
            referral.total_rewards ?? 0
          ) + Number(amount),
      }
    );
  }

  static async activate(
    id: string
  ) {
    return await this.update(
      id,
      {
        active: true,
      }
    );
  }

  static async deactivate(
    id: string
  ) {
    return await this.update(
      id,
      {
        active: false,
      }
    );
  }

  static async delete(
    id: string
  ) {
    const { error } =
      await supabase
        .from("referrals")
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}
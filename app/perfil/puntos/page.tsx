import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import LoyaltyCard from "@/components/loyalty/LoyaltyCard";

export default async function LoyaltyPage() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: loyalty,
  } =
    await supabase
      .from(
        "customer_loyalty"
      )
      .select("*")
      .eq(
        "email",
        user.email
      )
      .single();

  const {
    data: rewards,
  } =
    await supabase
      .from(
        "loyalty_rewards"
      )
      .select("*")
      .eq(
        "active",
        true
      )
      .order(
        "points_required"
      );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-10">
      <h1 className="text-4xl font-bold">
        Mis Puntos VIP
      </h1>

      <LoyaltyCard
        customerName={
          loyalty?.customer_name ||
          ""
        }
        points={
          loyalty?.points ||
          0
        }
        lifetimePoints={
          loyalty?.lifetime_points ||
          0
        }
        level={
          loyalty?.level ||
          "Bronze"
        }
      />

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          Recompensas
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {rewards?.map(
            (
              reward: any
            ) => (
              <div
                key={
                  reward.id
                }
                className="border rounded-xl p-6"
              >
                <h3 className="font-bold text-xl">
                  {
                    reward.name
                  }
                </h3>

                <p className="text-gray-700 mt-3">
                  {
                    reward.description
                  }
                </p>

                <p className="font-bold text-pink-600 mt-4">
                  {
                    reward.points_required
                  }{" "}
                  puntos
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
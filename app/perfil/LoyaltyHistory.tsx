"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function LoyaltyHistory({
  userId,
}: {
  userId: string;
}) {
  const [
    transactions,
    setTransactions,
  ] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data,
    } = await supabase
      .from(
        "loyalty_transactions"
      )
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );

    setTransactions(
      data || []
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Movimientos
      </h2>

      <div className="space-y-4">

        {transactions.map(
          (tx) => (
            <div
              key={tx.id}
              className="border rounded-lg p-4"
            >
              <p>
                {
                  tx.description
                }
              </p>

              <p className="text-green-600 font-bold">
                +
                {
                  tx.points
                }
                {" "}
                puntos
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
}
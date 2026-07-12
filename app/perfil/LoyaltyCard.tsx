"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function LoyaltyCard({
  userId,
}: {
  userId: string;
}) {
  const [data, setData] =
    useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: loyalty,
    } = await supabase
      .from(
        "loyalty_points"
      )
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .single();

    setData(loyalty);
  }

  if (!data)
    return null;

  return (
    <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-xl p-6">

      <h2 className="text-2xl font-bold">
        Programa VIP
      </h2>

      <p className="mt-4">
        Nivel:
        {" "}
        {data.level.toUpperCase()}
      </p>

      <p>
        Puntos:
        {" "}
        {data.points}
      </p>

      <p>
        Puntos históricos:
        {" "}
        {
          data.lifetime_points
        }
      </p>

    </div>
  );
}
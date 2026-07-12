"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function WishlistCounter() {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    loadCount();
  }, []);

  async function loadCount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { count } = await supabase
      .from("wishlist")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    setCount(count || 0);
  }

  return (
    <span
      className="
        bg-pink-500
        text-white
        text-xs
        px-2
        py-1
        rounded-full
      "
    >
      {count}
    </span>
  );
}
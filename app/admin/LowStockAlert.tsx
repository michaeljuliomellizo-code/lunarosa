"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function LowStockAlert() {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } =
      await supabase
        .from("products")
        .select("id")
        .lte("stock", 5);

    setCount(
      data?.length || 0
    );
  }

  if (count === 0) {
    return null;
  }

  return (
    <div
      className="
      bg-red-100
      border
      border-red-300
      text-red-700
      rounded-xl
      p-4
      mb-6
    "
    >
      ⚠️ Hay {count} productos
      con stock bajo
    </div>
  );
}
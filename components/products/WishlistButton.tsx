"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

interface Props {
  productId: string;
}

export default function WishlistButton({
  productId,
}: Props) {
  const [saved, setSaved] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    checkWishlist();
  }, [productId]);

  async function checkWishlist() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } =
      await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", user.id)
        .eq(
          "product_id",
          productId
        )
        .maybeSingle();

    setSaved(!!data);
  }

  async function toggleWishlist() {
    if (loading) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(
        "Debes iniciar sesión"
      );
      setLoading(false);
      return;
    }

    if (saved) {
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq(
          "product_id",
          productId
        );

      setSaved(false);
    } else {
      await supabase
        .from("wishlist")
        .insert([
          {
            user_id: user.id,
            product_id:
              productId,
          },
        ]);

      setSaved(true);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist();
      }}
      className="text-3xl hover:scale-110 transition"
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
}
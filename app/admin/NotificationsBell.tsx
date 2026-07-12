"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

export default function NotificationsBell() {

  const [
    count,
    setCount,
  ] = useState(0);

  async function load() {

    const { count } =
      await supabase
        .from(
          "notifications"
        )
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "read",
          false
        );

    setCount(count || 0);
  }

  useEffect(() => {

    load();

    const channel =
      supabase
        .channel(
          "notifications"
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema:
              "public",
            table:
              "notifications",
          },
          () => load()
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };

  }, []);

  return (
    <div className="relative">

      🔔

      {count > 0 && (

        <span
          className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            px-2
            rounded-full
          "
        >
          {count}
        </span>

      )}

    </div>
  );
}
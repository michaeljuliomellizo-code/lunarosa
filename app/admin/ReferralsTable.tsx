"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function ReferralsTable() {
  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data,
    } = await supabase
      .from("referrals")
      .select("*")
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );

    setItems(data || []);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-6">
        Referidos
      </h1>

      <table className="w-full">

        <thead>
          <tr>
            <th>Código</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>

          {items.map(
            (item) => (
              <tr
                key={item.id}
              >
                <td>
                  {
                    item.referral_code
                  }
                </td>

                <td>
                  {
                    item.status
                  }
                </td>

                <td>
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}
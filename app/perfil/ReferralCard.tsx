"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function ReferralCard({
  userId,
}: {
  userId: string;
}) {
  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setProfile(data);
  }

  async function generateCode() {
    const response =
      await fetch(
        "/api/referrals/generate-code",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
          }),
        }
      );

    const data =
      await response.json();

    setProfile({
      ...profile,
      referral_code:
        data.code,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Programa de Referidos
      </h2>

      {profile?.referral_code ? (
        <>
          <div className="bg-pink-50 border rounded-lg p-4">

            <p className="font-semibold">
              Tu código
            </p>

            <p className="text-3xl font-bold text-pink-600">
              {
                profile.referral_code
              }
            </p>

          </div>

          <p className="mt-4 text-sm">
            Comparte este código y gana recompensas.
          </p>
        </>
      ) : (
        <button
          onClick={
            generateCode
          }
          className="
            bg-pink-500
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Generar Código
        </button>
      )}
    </div>
  );
}
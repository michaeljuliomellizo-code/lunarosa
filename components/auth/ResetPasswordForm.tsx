"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordForm() {

  const [password, setPassword] =
    useState("");

  const handleUpdate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Contraseña actualizada"
    );
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white border rounded-3xl p-10"
    >

      <h1 className="text-4xl font-bold mb-8">
        Nueva contraseña
      </h1>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full border rounded-full px-6 py-4"
      />

      <button className="w-full mt-6 bg-pink-400 text-white py-4 rounded-full">
        Actualizar contraseña
      </button>
    </form>
  );
}
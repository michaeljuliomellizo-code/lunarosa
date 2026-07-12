"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordForm() {

  const [email, setEmail] =
    useState("");

  const handleReset = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:3000/reset-password",
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Correo de recuperación enviado"
    );
  };

  return (
    <form
      onSubmit={handleReset}
      className="bg-white border rounded-3xl p-10"
    >

      <h1 className="text-4xl font-bold mb-8">
        Recuperar contraseña
      </h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border rounded-full px-6 py-4"
      />

      <button className="w-full mt-6 bg-pink-400 text-white py-4 rounded-full">
        Enviar recuperación
      </button>
    </form>
  );
}
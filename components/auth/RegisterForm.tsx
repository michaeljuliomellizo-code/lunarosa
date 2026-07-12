"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterForm() {

  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Cuenta creada correctamente"
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white border rounded-3xl p-10"
    >

      <h1 className="text-4xl font-bold mb-8">
        Crear Cuenta
      </h1>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border rounded-full px-6 py-4"
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-full px-6 py-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-full px-6 py-4"
        />

        <button
          type="submit"
          className="w-full bg-pink-400 text-white py-4 rounded-full"
        >
          {loading
            ? "Creando..."
            : "Registrarme"}
        </button>
      </div>
    </form>
  );
}
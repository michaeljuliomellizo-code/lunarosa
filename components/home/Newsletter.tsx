"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function subscribe() {
    if (!email) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/newsletter/subscribe",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error
        );
      }

      setSuccess(true);

      setEmail("");
    } catch (error: any) {
      alert(
        error.message ||
          "Error al suscribirse"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="
            bg-gradient-to-r
            from-pink-500
            to-pink-400
            rounded-3xl
            p-12
            text-white
            text-center
          "
        >
          <h2 className="text-4xl font-bold">
            Obtén descuentos exclusivos
          </h2>

          <p className="mt-4 text-lg">
            Suscríbete y recibe promociones,
            lanzamientos y cupones especiales.
          </p>

          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-4
              mt-8
            "
          >
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Tu correo electrónico"
              className="
                flex-1
                px-6
                py-4
                rounded-full
                text-black
              "
            />

            <button
              onClick={subscribe}
              disabled={loading}
              className="
                bg-black
                px-8
                py-4
                rounded-full
                font-semibold
              "
            >
              {loading
                ? "Enviando..."
                : "Suscribirme"}
            </button>
          </div>

          {success && (
            <div
              className="
                mt-6
                bg-white
                text-green-600
                rounded-xl
                p-4
                font-semibold
              "
            >
              Suscripción realizada correctamente
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
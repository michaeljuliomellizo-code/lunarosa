"use client";

import { useState } from "react";

interface Props {
  productId: string;
}

export default function ReviewForm({
  productId,
}: Props) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  async function submitReview() {

    const response =
      await fetch(
        "/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            product_id:
              productId,

            customer_name:
              name,

            customer_email:
              email,

            rating,

            comment,
          }),
        }
      );

    if (response.ok) {
      setSuccess(true);

      setName("");
      setEmail("");
      setComment("");
    }
  }

  return (
    <div className="mt-12 border rounded-xl p-6">

      <h3 className="text-2xl font-bold mb-4">
        Escribe tu opinión
      </h3>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Gracias por tu opinión.
        </div>
      )}

      <div className="space-y-4">

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Nombre"
          className="w-full border rounded p-3"
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Correo"
          className="w-full border rounded p-3"
        />

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(
                e.target.value
              )
            )
          }
          className="w-full border rounded p-3"
        >
          <option value={5}>
            5 estrellas
          </option>

          <option value={4}>
            4 estrellas
          </option>

          <option value={3}>
            3 estrellas
          </option>

          <option value={2}>
            2 estrellas
          </option>

          <option value={1}>
            1 estrella
          </option>
        </select>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Tu opinión"
          rows={4}
          className="w-full border rounded p-3"
        />

        <button
          onClick={submitReview}
          className="
            bg-pink-600
            text-white
            px-6
            py-3
            rounded
          "
        >
          Enviar opinión
        </button>

      </div>
    </div>
  );
}
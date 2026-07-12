"use client";

import { useEffect, useState } from "react";

export default function ReviewsTable() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const response = await fetch(
      "/api/admin/reviews"
    );

    const data =
      await response.json();

    setReviews(data || []);
  }

  async function approveReview(
    id: string
  ) {
    await fetch(
      `/api/admin/reviews/${id}/approve`,
      {
        method: "POST",
      }
    );

    loadReviews();
  }

  async function replyReview(
    id: string
  ) {
    const response =
      await fetch(
        `/api/admin/reviews/${id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            reply:
              replyText[id],
          }),
        }
      );

    if (response.ok) {
      setReplyText((prev) => ({
        ...prev,
        [id]: "",
      }));

      loadReviews();
    }
  }

  return (
    <div className="bg-white rounded-xl border p-6">

      <h1 className="text-3xl font-bold mb-6">
        Gestión de Reviews
      </h1>

      <div className="space-y-6">

        {reviews.map(
          (review) => (
            <div
              key={review.id}
              className="
                border
                rounded-xl
                p-6
              "
            >
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <p>
                    <strong>
                      Cliente:
                    </strong>{" "}
                    {
                      review.customer_name
                    }
                  </p>

                  <p>
                    <strong>
                      Correo:
                    </strong>{" "}
                    {
                      review.customer_email
                    }
                  </p>

                  <p>
                    <strong>
                      Calificación:
                    </strong>{" "}
                    {
                      review.rating
                    }
                    ⭐
                  </p>
                </div>

                <div>
                  <p>
                    <strong>
                      Estado:
                    </strong>{" "}
                    {review.approved
                      ? "Aprobado"
                      : "Pendiente"}
                  </p>

                  <p>
                    <strong>
                      Fecha:
                    </strong>{" "}
                    {new Date(
                      review.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>

              <div className="mt-4">

                <p className="font-semibold">
                  Comentario
                </p>

                <p className="mt-2 text-gray-700">
                  {
                    review.comment
                  }
                </p>

              </div>

              {review.admin_reply && (
                <div
                  className="
                    mt-4
                    bg-pink-50
                    border
                    rounded-lg
                    p-4
                  "
                >
                  <p className="font-semibold text-pink-700">
                    Respuesta de
                    la tienda
                  </p>

                  <p className="mt-2">
                    {
                      review.admin_reply
                    }
                  </p>
                </div>
              )}

              <div className="mt-6 flex gap-3 flex-wrap">

                {!review.approved && (
                  <button
                    onClick={() =>
                      approveReview(
                        review.id
                      )
                    }
                    className="
                      bg-green-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Aprobar
                  </button>
                )}

              </div>

              <div className="mt-6">

                <textarea
                  value={
                    replyText[
                      review.id
                    ] || ""
                  }
                  onChange={(e) =>
                    setReplyText(
                      (
                        prev
                      ) => ({
                        ...prev,
                        [
                          review.id
                        ]:
                          e.target
                            .value,
                      })
                    )
                  }
                  placeholder="Escribir respuesta..."
                  rows={3}
                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                  "
                />

                <button
                  onClick={() =>
                    replyReview(
                      review.id
                    )
                  }
                  className="
                    mt-3
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Responder
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}
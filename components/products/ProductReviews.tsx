"use client";

import { useEffect, useState } from "react";

interface Props {
  productId: string;
}

export default function ProductReviews({
  productId,
}: Props) {
  const [reviews, setReviews] =
    useState<any[]>([]);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  async function loadReviews() {
    const response =
      await fetch(
        `/api/reviews/${productId}`
      );

    const data =
      await response.json();

    setReviews(data || []);
  }

  if (
    reviews.length === 0
  ) {
    return (
      <div className="text-center py-8 text-gray-600">
        Aún no hay opiniones para este producto.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map(
        (review) => (
          <div
            key={review.id}
            className="
              border
              rounded-xl
              p-5
              bg-white
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <h4 className="font-semibold">
                  {review.customer_name ||
                    "Cliente"}
                </h4>

                <p className="text-sm text-gray-600">
                  {new Date(
                    review.created_at
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="text-yellow-500">
                {"⭐".repeat(
                  review.rating
                )}
              </div>

            </div>

            <p className="mt-4 text-gray-800">
              {review.comment}
            </p>

            {review.admin_reply && (
              <div
                className="
                  mt-4
                  bg-pink-50
                  border-l-4
                  border-pink-500
                  p-4
                  rounded
                "
              >
                <p className="font-semibold text-pink-700">
                  Respuesta de Luna Rosa
                </p>

                <p className="mt-2">
                  {review.admin_reply}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
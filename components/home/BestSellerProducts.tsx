import { createClient } from "@/lib/supabase/server";

export default async function Testimonials() {
  const supabase =
    await createClient();

  const { data: reviews } =
    await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", {
        ascending: false,
      })
      .limit(6);

  return (
    <section className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Testimonios
          </h2>

          <p className="mt-4 text-gray-700">
            Opiniones reales de
            nuestras clientas
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {reviews?.map(
            (review: any) => (
              <div
                key={review.id}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-8
                  shadow-sm
                "
              >
                <div className="mb-4 text-yellow-500 text-xl">
                  {"★".repeat(
                    Number(
                      review.rating || 5
                    )
                  )}
                </div>

                <p className="text-gray-700">
                  "
                  {review.comment}
                  "
                </p>

                <div className="mt-6">
                  <h3 className="font-bold">
                    {
                      review.customer_name
                    }
                  </h3>

                  <p className="text-sm text-gray-500">
                    Cliente
                    verificado
                  </p>
                </div>
              </div>
            )
          )}

          {!reviews?.length && (
            <div
              className="
                col-span-full
                text-center
                py-10
              "
            >
              <p className="text-gray-600">
                Aún no hay
                reseñas disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
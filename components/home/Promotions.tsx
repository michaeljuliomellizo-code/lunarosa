export default function Promotions() {

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-pink-200 rounded-3xl p-10">

            <p className="uppercase font-semibold">
              Oferta Especial
            </p>

            <h2 className="text-4xl font-bold mt-4">
              30% OFF
            </h2>

            <p className="mt-4 text-gray-700">
              En pijamas y lencería seleccionada.
            </p>
          </div>

          <div className="bg-pink-100 rounded-3xl p-10">

            <p className="uppercase font-semibold">
              Black Friday
            </p>

            <h2 className="text-4xl font-bold mt-4">
              Hasta 50% OFF
            </h2>

            <p className="mt-4 text-gray-700">
              Aprovecha nuestras promociones especiales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
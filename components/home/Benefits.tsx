export default function Benefits() {

  return (
    <section className="py-20 bg-pink-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl p-8 text-center">
            🚚
            <h3 className="font-bold mt-4">
              Envíos Nacionales
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center">
            💳
            <h3 className="font-bold mt-4">
              Pago Contraentrega
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center">
            🔒
            <h3 className="font-bold mt-4">
              Compra Segura
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center">
            ❤️
            <h3 className="font-bold mt-4">
              Calidad Premium
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function SalesStats() {

  return (
    <div className="bg-white border rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Estadísticas
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-pink-50 rounded-2xl p-6">
          <p>Conversión</p>
          <h3 className="text-3xl font-bold mt-3">
            8%
          </h3>
        </div>

        <div className="bg-pink-50 rounded-2xl p-6">
          <p>Clientes Nuevos</p>
          <h3 className="text-3xl font-bold mt-3">
            120
          </h3>
        </div>
      </div>
    </div>
  );
}
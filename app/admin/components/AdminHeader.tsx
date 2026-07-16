export default function AdminHeader() {

  return (
    <header className="bg-white border-b px-10 py-6 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold">
          Panel Administrativo
        </h1>

        <p className="text-gray-600">
          Gestión completa de la tienda
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-pink-300" />

        <div>
          <p className="font-semibold">
            Administrador
          </p>

          <p className="text-sm text-gray-600">
            Luna Rosa
          </p>
        </div>
      </div>
    </header>
  );
}
"use client";

export default function ProfileForm() {

  return (
    <form className="bg-white border rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Mi Perfil
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Nombre"
          className="w-full border rounded-full px-6 py-4"
        />

        <input
          type="email"
          placeholder="Correo"
          className="w-full border rounded-full px-6 py-4"
        />

        <button className="bg-pink-400 text-white px-8 py-4 rounded-full">
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
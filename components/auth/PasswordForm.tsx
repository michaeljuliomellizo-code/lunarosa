"use client";

export default function PasswordForm() {

  return (
    <form className="bg-white border rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Cambiar contraseña
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full border rounded-full px-6 py-4"
        />

        <button className="bg-pink-400 text-white px-8 py-4 rounded-full">
          Actualizar contraseña
        </button>
      </div>
    </form>
  );
}
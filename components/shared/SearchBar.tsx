"use client";

export default function SearchBar() {

  return (
    <div className="relative">

      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full border rounded-full px-6 py-4"
      />

    </div>
  );
}
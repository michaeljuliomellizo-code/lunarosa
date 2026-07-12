"use client";

import { Search } from "lucide-react";

export default function ProductSearch() {

  return (
    <div className="relative">

      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full border rounded-full py-4 px-6 pl-14"
      />

      <Search
        className="absolute left-5 top-4 text-gray-400"
      />
    </div>
  );
}
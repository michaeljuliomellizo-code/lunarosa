"use client";

import DashboardOverview from "./components/DashboardOverview";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Bienvenido al panel administrativo de Luna Rosa.
        </p>

      </div>

      <DashboardOverview />

    </div>
  );
}
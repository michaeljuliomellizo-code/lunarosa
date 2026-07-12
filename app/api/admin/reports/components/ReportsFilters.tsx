"use client";

import { useEffect, useState } from "react";

interface ReportsFiltersProps {
  onChange?: (filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }) => void;
}

const STATUS_OPTIONS = [
  {
    value: "",
    label: "Todos",
  },
  {
    value: "pending",
    label: "Pendiente",
  },
  {
    value: "paid",
    label: "Pagado",
  },
  {
    value: "processing",
    label: "Procesando",
  },
  {
    value: "shipped",
    label: "Enviado",
  },
  {
    value: "delivered",
    label: "Entregado",
  },
  {
    value: "cancelled",
    label: "Cancelado",
  },
];

export default function ReportsFilters({
  onChange,
}: ReportsFiltersProps) {
  const today = new Date();

  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [startDate, setStartDate] =
    useState(
      firstDay
        .toISOString()
        .substring(0, 10)
    );

  const [endDate, setEndDate] =
    useState(
      today
        .toISOString()
        .substring(0, 10)
    );

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    onChange?.({
      startDate,
      endDate,
      status:
        status || undefined,
    });
  }, [
    startDate,
    endDate,
    status,
    onChange,
  ]);

  function currentMonth() {
    const now = new Date();

    const first =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

    setStartDate(
      first
        .toISOString()
        .substring(0, 10)
    );

    setEndDate(
      now
        .toISOString()
        .substring(0, 10)
    );
  }

  function last30Days() {
    const now = new Date();

    const last =
      new Date();

    last.setDate(
      now.getDate() - 30
    );

    setStartDate(
      last
        .toISOString()
        .substring(0, 10)
    );

    setEndDate(
      now
        .toISOString()
        .substring(0, 10)
    );
  }

  function currentYear() {
    const now = new Date();

    const first =
      new Date(
        now.getFullYear(),
        0,
        1
      );

    setStartDate(
      first
        .toISOString()
        .substring(0, 10)
    );

    setEndDate(
      now
        .toISOString()
        .substring(0, 10)
    );
  }

  function clearFilters() {
    currentMonth();
    setStatus("");
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex flex-col lg:flex-row gap-6 justify-between">

        <div className="flex flex-wrap gap-4">

          <div>

            <label className="block text-sm font-medium mb-1">
              Fecha Inicial
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="border rounded-lg px-3 py-2"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Fecha Final
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="border rounded-lg px-3 py-2"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Estado
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="border rounded-lg px-3 py-2"
            >

              {STATUS_OPTIONS.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        <div className="flex flex-wrap gap-2 items-end">

          <button
            onClick={
              currentMonth
            }
            className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Mes Actual
          </button>

          <button
            onClick={
              last30Days
            }
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Últimos 30 días
          </button>

          <button
            onClick={
              currentYear
            }
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Año Actual
          </button>

          <button
            onClick={
              clearFilters
            }
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Limpiar
          </button>

        </div>

      </div>

    </div>
  );
}
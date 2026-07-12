"use client";

interface ExportButtonsProps {
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
}

export default function ExportButtons({
  filters,
}: ExportButtonsProps) {
  function buildQuery() {
    const params =
      new URLSearchParams();

    if (filters?.startDate) {
      params.append(
        "startDate",
        filters.startDate
      );
    }

    if (filters?.endDate) {
      params.append(
        "endDate",
        filters.endDate
      );
    }

    if (filters?.status) {
      params.append(
        "status",
        filters.status
      );
    }

    return params.toString();
  }

  function exportExcel() {
    window.open(
      `/api/admin/reports/export/excel?${buildQuery()}`,
      "_blank"
    );
  }

  function exportPdf() {
    window.open(
      `/api/admin/reports/export/pdf?${buildQuery()}`,
      "_blank"
    );
  }

  function printReport() {
    window.print();
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h2 className="text-xl font-bold">
            Exportar Reportes
          </h2>

          <p className="text-gray-500 mt-1">
            Descarga el reporte utilizando
            los filtros actualmente
            seleccionados.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={exportExcel}
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Exportar Excel
          </button>

          <button
            onClick={exportPdf}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Exportar PDF
          </button>

          <button
            onClick={printReport}
            className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
          >
            Imprimir
          </button>

        </div>

      </div>

    </div>
  );
}
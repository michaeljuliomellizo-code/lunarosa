import ReportsDashboard from "./ReportsDashboard";

export default function ReportsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Centro de Reportes
        </h1>

        <p className="text-gray-500 mt-2">
          Reportes comerciales y estadísticas de ventas.
        </p>

      </div>

      <ReportsDashboard />

    </div>
  );
}
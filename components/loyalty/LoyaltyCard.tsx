interface Props {
  customerName: string;
  points: number;
  lifetimePoints: number;
  level: string;
}

export default function LoyaltyCard({
  customerName,
  points,
  lifetimePoints,
  level,
}: Props) {
  const levelColor =
    level === "Gold"
      ? "bg-yellow-500"
      : level === "Silver"
      ? "bg-gray-400"
      : "bg-amber-700";

  return (
    <div
      className={`${levelColor} text-white rounded-3xl p-8 shadow-xl`}
    >
      <h2 className="text-3xl font-bold">
        Club VIP Luna Rosa
      </h2>

      <p className="mt-2 text-lg">
        {customerName}
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div>
          <p className="text-sm opacity-80">
            Nivel
          </p>

          <p className="text-2xl font-bold">
            {level}
          </p>
        </div>

        <div>
          <p className="text-sm opacity-80">
            Puntos
          </p>

          <p className="text-2xl font-bold">
            {points}
          </p>
        </div>

        <div>
          <p className="text-sm opacity-80">
            Históricos
          </p>

          <p className="text-2xl font-bold">
            {lifetimePoints}
          </p>
        </div>
      </div>
    </div>
  );
}
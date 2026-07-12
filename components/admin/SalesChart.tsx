"use client";

interface Props {
  data: {
    month: string;
    total: number;
  }[];
}

export default function SalesChart({
  data,
}: Props) {
  const maxValue =
    Math.max(
      ...data.map(
        (item) =>
          item.total
      ),
      1
    );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-8">
        Ventas Mensuales
      </h2>

      <div className="flex items-end gap-4 h-80">
        {data.map(
          (item) => (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className="w-full bg-pink-500 rounded-t-lg"
                style={{
                  height: `${
                    (item.total /
                      maxValue) *
                    250
                  }px`,
                }}
              />

              <span className="mt-3 text-sm">
                {item.month}
              </span>

              <span className="text-xs text-gray-500">
                $
                {item.total.toLocaleString()}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
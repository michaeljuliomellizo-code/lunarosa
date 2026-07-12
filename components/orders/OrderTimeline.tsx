interface Props {
  status: string;
}

export default function OrderTimeline({
  status,
}: Props) {
  const steps = [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
  ];

  const current =
    steps.indexOf(status);

  return (
    <div className="flex items-center gap-4 overflow-x-auto">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex items-center gap-2"
        >
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-white
              ${
                index <= current
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }
            `}
          >
            {index + 1}
          </div>

          <span className="capitalize">
            {step}
          </span>

          {index <
            steps.length - 1 && (
            <div className="w-10 h-1 bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
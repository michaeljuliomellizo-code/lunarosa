interface Props {
  message: string;
  type?: "success" | "error";
}

export default function Alert({
  message,
  type = "success",
}: Props) {

  return (
    <div
      className={`
        p-5 rounded-2xl
        ${
          type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      {message}
    </div>
  );
}
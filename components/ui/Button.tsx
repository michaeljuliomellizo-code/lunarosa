import { ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: React.ReactNode;

  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: Props) {

  return (
    <button
      className={`
        px-6 py-4 rounded-full font-semibold transition
        ${
          variant === "primary"
            ? "bg-pink-400 text-white hover:bg-pink-500"
            : "border border-pink-400 text-pink-500"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
import { InputHTMLAttributes } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: Props) {

  return (
    <input
      className={`
        w-full border rounded-full px-6 py-4 outline-none
        focus:ring-2 focus:ring-pink-300
        ${className}
      `}
      {...props}
    />
  );
}
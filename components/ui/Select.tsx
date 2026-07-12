import { SelectHTMLAttributes } from "react";

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({
  className = "",
  children,
  ...props
}: Props) {

  return (
    <select
      className={`
        w-full border rounded-full px-6 py-4
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}
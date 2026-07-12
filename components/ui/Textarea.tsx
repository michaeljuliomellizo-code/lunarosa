import { TextareaHTMLAttributes } from "react";

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({
  className = "",
  ...props
}: Props) {

  return (
    <textarea
      className={`
        w-full border rounded-3xl px-6 py-4 outline-none
        focus:ring-2 focus:ring-pink-300
        ${className}
      `}
      {...props}
    />
  );
}
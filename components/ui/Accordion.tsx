"use client";

import { useState } from "react";

interface Props {
  title: string;
  content: string;
}

export default function Accordion({
  title,
  content,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (
    <div className="border rounded-2xl overflow-hidden">

      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left font-semibold"
      >
        {title}
      </button>

      {open && (
        <div className="p-5 border-t">
          {content}
        </div>
      )}
    </div>
  );
}
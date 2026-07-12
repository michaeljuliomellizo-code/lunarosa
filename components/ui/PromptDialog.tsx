"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface PromptDialogProps {
  open: boolean;

  title: string;

  description?: string;

  label?: string;

  placeholder?: string;

  defaultValue?: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  danger?: boolean;

  required?: boolean;

  onConfirm: (
    value: string
  ) => void;

  onCancel: () => void;
}

export default function PromptDialog({
  open,
  title,
  description,
  label = "Valor",
  placeholder = "",
  defaultValue = "",
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  loading = false,
  danger = false,
  required = true,
  onConfirm,
  onCancel,
}: PromptDialogProps) {
  const dialogRef =
    useRef<HTMLDialogElement>(
      null
    );

  const [value, setValue] =
    useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const dialog =
      dialogRef.current;

    if (!dialog) return;

    if (
      open &&
      !dialog.open
    ) {
      dialog.showModal();
    }

    if (
      !open &&
      dialog.open
    ) {
      dialog.close();
    }
  }, [open]);

  function closeDialog() {
    if (
      dialogRef.current?.open
    ) {
      dialogRef.current.close();
    }

    onCancel();
  }

  function submit() {
    const text =
      value.trim();

    if (
      required &&
      text.length === 0
    ) {
      return;
    }

    onConfirm(text);
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        closeDialog();
      }}
      className="
        rounded-xl
        p-0
        w-full
        max-w-lg
        backdrop:bg-black/40
      "
    >
      <div className="bg-white rounded-xl">
        <div className="p-6">
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          {description && (
            <p className="mt-3 text-gray-600">
              {description}
            </p>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              {label}
            </label>

            <textarea
              rows={4}
              value={value}
              placeholder={
                placeholder
              }
              onChange={(e) =>
                setValue(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />
          </div>
        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={
              closeDialog
            }
            className="
              px-4
              py-2
              rounded-lg
              border
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={
              loading ||
              (required &&
                value.trim()
                  .length === 0)
            }
            onClick={submit}
            className={`
              px-4
              py-2
              rounded-lg
              text-white
              disabled:opacity-50
              ${
                danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-pink-600 hover:bg-pink-700"
              }
            `}
          >
            {loading
              ? "Procesando..."
              : confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
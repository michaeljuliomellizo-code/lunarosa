"use client";

import {
  useEffect,
  useRef,
} from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  loading = false,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef =
    useRef<HTMLDialogElement>(
      null
    );

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
        max-w-md
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
            disabled={loading}
            onClick={
              onConfirm
            }
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
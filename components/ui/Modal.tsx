interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  children,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
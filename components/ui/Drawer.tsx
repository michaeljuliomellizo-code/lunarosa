interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Drawer({
  open,
  onClose,
  children,
}: Props) {

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-transform
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >

      <button
        onClick={onClose}
        className="p-5"
      >
        ✕
      </button>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
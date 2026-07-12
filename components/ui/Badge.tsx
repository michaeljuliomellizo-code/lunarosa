interface Props {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: Props) {

  return (
    <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">

      {children}

    </span>
  );
}
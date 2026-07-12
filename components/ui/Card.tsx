interface Props {
  children: React.ReactNode;
}

export default function Card({
  children,
}: Props) {

  return (
    <div className="bg-white border rounded-3xl p-6">

      {children}

    </div>
  );
}
interface Props {
  message: string;
}

export default function Toast({
  message,
}: Props) {

  return (
    <div className="fixed bottom-5 right-5 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl z-50">

      {message}

    </div>
  );
}
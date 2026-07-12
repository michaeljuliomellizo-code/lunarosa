interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {

  return (
    <section className="min-h-screen bg-pink-50 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {children}

      </div>
    </section>
  );
}
interface Props {
  title: string;
  description?: string;
}

export default function PageHeader({
  title,
  description,
}: Props) {

  return (
    <section className="py-16 text-center">

      <h1 className="text-5xl font-bold">
        {title}
      </h1>

      {description && (
        <p className="mt-5 text-gray-500">
          {description}
        </p>
      )}
    </section>
  );
}
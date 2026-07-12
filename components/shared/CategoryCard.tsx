import Link from "next/link";

interface Props {
  name: string;
  image: string;
}

export default function CategoryCard({
  name,
  image,
}: Props) {

  return (
    <Link
      href={`/catalogo?categoria=${name}`}
      className="relative rounded-3xl overflow-hidden h-72 block"
    >

      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30 flex items-end p-6">

        <h2 className="text-white text-3xl font-bold">
          {name}
        </h2>
      </div>
    </Link>
  );
}
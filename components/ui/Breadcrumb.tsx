import Link from "next/link";

interface Props {
  items: {
    label: string;
    href: string;
  }[];
}

export default function Breadcrumb({
  items,
}: Props) {

  return (
    <div className="flex gap-2 text-sm text-gray-500">

      {items.map((item, index) => (
        <div
          key={item.href}
          className="flex gap-2"
        >

          <Link href={item.href}>
            {item.label}
          </Link>

          {index !== items.length - 1 && "/"}
        </div>
      ))}
    </div>
  );
}
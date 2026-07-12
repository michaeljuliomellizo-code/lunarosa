import Image from "next/image";
import Link from "next/link";

export default function Logo() {

  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >

      <Image
        src="/LunaRosa.png"
        alt="Luna Rosa"
        width={70}
        height={70}
        priority
      />

      <div>
        <h1 className="text-2xl font-bold text-pink-500">
          Luna Rosa
        </h1>

        <p className="text-sm text-gray-500">
          Moda femenina
        </p>
      </div>
    </Link>
  );
}
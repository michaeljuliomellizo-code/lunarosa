"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({
  images,
}: Props) {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>

      {/* MAIN IMAGE */}
      <div className="relative h-[600px] bg-pink-50 rounded-3xl overflow-hidden">

        <Image
          src={selectedImage}
          alt="Producto"
          fill
          className="object-cover"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-4 mt-4">

        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className="relative w-24 h-24 rounded-xl overflow-hidden border"
          >

            <Image
              src={image}
              alt="Thumbnail"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
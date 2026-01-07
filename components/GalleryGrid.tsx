"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Modal from "./Modal";

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  scale?: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const rotations = [-6, 3, -2, 5, -4, 2, -5, 4, -3, 6, -1, 3];

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
        {images.map((image, index) => (
          <Reveal key={image.src}>
            <button
              onClick={() => setSelectedImage(image)}
              className="group flex w-full cursor-pointer items-center justify-center"
              style={{ transform: `rotate(${rotations[index % rotations.length]}deg) scale(${image.scale ?? 1})` }}
              aria-label={`View details: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={280}
                height={280}
                sizes="(max-width: 768px) 45vw, 22vw"
                className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                priority={index < 4}
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Modal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title ?? ""}
        description={selectedImage?.description ?? ""}
      />
    </>
  );
}

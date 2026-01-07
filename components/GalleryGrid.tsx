"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [fallenImages, setFallenImages] = useState<Set<number>>(new Set());
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartImageRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const originalPositions = useRef<{ x: number; y: number }[]>([]);

  // Capture original positions of images (only when not fallen)
  const captureOriginalPositions = useCallback(() => {
    if (!containerRef.current || fallenImages.size > 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    originalPositions.current = imageRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });
  }, [fallenImages.size]);

  const updateCartPosition = useCallback(() => {
    if (!cartImageRef.current || !containerRef.current) return;

    const cartRect = cartImageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Target the center of the cart basket (adjust y to be in the middle-upper area of cart)
    setCartPosition({
      x: cartRect.left + cartRect.width / 2 - containerRect.left,
      y: cartRect.top + cartRect.height * 0.4 - containerRect.top,
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !cartRef.current) return;

    const cartRect = cartRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Show cart when it's near the viewport
    setIsCartVisible(cartRect.top < viewportHeight + 200);

    // Update cart position for accurate targeting
    updateCartPosition();

    // All images fall together when cart enters viewport
    const cartTop = cartRect.top;
    const triggerPoint = viewportHeight - 100;

    if (cartTop < triggerPoint) {
      // Capture original positions before falling (only if not already fallen)
      if (fallenImages.size === 0) {
        captureOriginalPositions();
      }
      // All images fall at once
      const allImages = new Set<number>(images.map((_, i) => i));
      setFallenImages(allImages);
    } else {
      // All images return
      setFallenImages(new Set<number>());
    }
  }, [updateCartPosition, images, fallenImages.size, captureOriginalPositions]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCartPosition);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCartPosition);
    };
  }, [handleScroll, updateCartPosition]);

  const getFallStyle = (index: number, isFallen: boolean): React.CSSProperties => {
    const baseRotation = rotations[index % rotations.length];
    const baseScale = images[index]?.scale ?? 1;

    if (!isFallen) {
      return {
        transform: `rotate(${baseRotation}deg) scale(${baseScale})`,
        opacity: 1,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      };
    }

    // Use stored original positions for consistent fall calculation
    const originalPos = originalPositions.current[index];
    if (!originalPos) {
      return {
        transform: `rotate(${baseRotation}deg) scale(${baseScale})`,
        opacity: 1,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      };
    }

    const deltaX = cartPosition.x - originalPos.x;
    const deltaY = cartPosition.y - originalPos.y;

    // Scatter images slightly within the cart
    const scatterX = (index % 3 - 1) * 20;
    const scatterY = (index % 4 - 1.5) * 10;

    // Random rotation for fallen state
    const fallRotation = (index % 2 === 0 ? 1 : -1) * (10 + (index * 5) % 15);

    return {
      transform: `translate(${deltaX + scatterX}px, ${deltaY + scatterY}px) rotate(${fallRotation}deg) scale(0.15)`,
      opacity: 1,
      transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.04}s`,
    };
  };

  return (
    <div ref={containerRef} className="relative isolate">
      {/* Grid of images */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
        {images.map((image, index) => {
          const isFallen = fallenImages.has(index);

          return (
            <Reveal key={image.src}>
              <button
                ref={(el) => { imageRefs.current[index] = el; }}
                onClick={() => !isFallen && setSelectedImage(image)}
                className={`group relative flex w-full cursor-pointer items-center justify-center ${
                  isFallen ? "pointer-events-none" : ""
                }`}
                style={{
                  ...getFallStyle(index, isFallen),
                  zIndex: isFallen ? 15 : 30,
                  position: "relative",
                }}
                aria-label={`View details: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={280}
                  height={280}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className={`h-auto w-full object-contain transition-transform duration-300 ease-out ${
                    !isFallen ? "group-hover:scale-110" : ""
                  }`}
                  priority={index < 4}
                />
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Grocery Cart */}
      <div
        ref={cartRef}
        className={`relative mt-20 flex justify-center transition-all duration-700 ${
          isCartVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
        style={{ zIndex: 25, position: "relative" }}
      >
        <div ref={cartImageRef} className="relative">
          <Image
            src="/cart.png"
            alt="Shopping cart"
            width={200}
            height={200}
            className="h-auto w-40 object-contain sm:w-48"
          />
        </div>
      </div>

      <Modal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title ?? ""}
        description={selectedImage?.description ?? ""}
        imageSrc={selectedImage?.src}
        imageAlt={selectedImage?.alt}
      />
    </div>
  );
}

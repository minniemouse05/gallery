"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  imageSrc,
  imageAlt,
}: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 py-12"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 flex max-h-full max-w-lg flex-col items-center overflow-y-auto text-center">
        {/* Image - grows in */}
        {imageSrc && (
          <div
            className={`mb-8 w-full max-w-xs transition-all duration-700 ease-out sm:max-w-sm ${
              isAnimating
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              width={400}
              height={400}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        )}

        {/* Text - fades in after image */}
        <div
          className={`transition-all duration-500 ease-out ${
            isAnimating
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: isAnimating ? "300ms" : "0ms" }}
        >
          <h2 className="text-xl font-light tracking-tight text-neutral-900 sm:text-2xl">
            {title}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-neutral-600">
            {description}
          </p>
          <button
            onClick={onClose}
            className="mt-8 text-sm font-light tracking-wide text-neutral-400 transition-colors hover:text-neutral-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

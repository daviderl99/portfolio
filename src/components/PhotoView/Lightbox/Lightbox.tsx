"use client";

import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import type { PhotoMetadata } from "@/lib/photo-metadata";
import "./Lightbox.scss";

export default function Lightbox({
  photos,
  index,
  onClose,
  onMove,
}: {
  photos: PhotoMetadata[];
  index: number;
  onClose: () => void;
  onMove: (index: number) => void;
}) {
  const photo = photos[index];
  if (!photo) return null;

  // Labels remain visible while absent EXIF values intentionally stay blank.
  const metadata = [
    ["Focal length", photo.focalLength],
    ["ISO", photo.iso?.replace(/^ISO\s+/i, "")],
    ["Shutter", photo.shutterSpeed],
    ["Aperture", photo.aperture],
  ];

  return (
    <div className="lightbox">
      <div>
        <span>
          {String(index + 1).padStart(2, "0")} / {photos.length}
        </span>
        <button className="lightboxClose" onClick={onClose} aria-label="Close">
          <FaXmark />
        </button>
      </div>
      <div className="lightboxImage">
        <button
          className="lightboxArrow lightboxPrev"
          onClick={() => onMove((index - 1 + photos.length) % photos.length)}
          aria-label="Previous photo"
        >
          <FaChevronLeft />
        </button>
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          sizes="100vw"
          loading="lazy"
        />
        <button
          className="lightboxArrow lightboxNext"
          onClick={() => onMove((index + 1) % photos.length)}
          aria-label="Next photo"
        >
          <FaChevronRight />
        </button>
      </div>
      <footer>
        <div className="lightboxCaption">
          <strong>{photo.title}</strong>
          {photo.caption !== photo.title ? <span>{photo.caption}</span> : null}
        </div>
        <div className="lightboxMeta">
          {metadata.map(([label, value]) => (
            <span key={label}>
              <small>{label}</small>
              {value ?? ""}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

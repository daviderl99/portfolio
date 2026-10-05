import Image from "next/image";
import type { PhotoMetadata } from "@/lib/photo-metadata";
import "./Gallery.scss";

function getExifSummary(photo: PhotoMetadata) {
  return [
    photo.focalLength ?? "",
    photo.iso ?? "",
    photo.shutterSpeed ?? "",
    photo.aperture ?? "",
  ];
}

export default function Gallery({
  photos,
  onOpen,
}: {
  photos: PhotoMetadata[];
  onOpen: (index: number) => void;
}) {
  return (
    <section id="gallery" className="wideSection">
      <p className="kicker">Selected prints</p>
      <h2 className="text-section font-serif italic">Gallery</h2>
      <div className="galleryGrid">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`galleryItem gallery-${index}`}
            onClick={() => onOpen(index)}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="(max-width: 700px) 50vw, 100vw"
              loading="lazy"
            />
            <div className="galleryOverlay">
              <span className="galleryTitle">
                <em>{photo.title}</em>
              </span>
              <small className="galleryExif">
                {getExifSummary(photo).map((value, metadataIndex) => (
                  <span key={metadataIndex}>{value}</span>
                ))}
              </small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

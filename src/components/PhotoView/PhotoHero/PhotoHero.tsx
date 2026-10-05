import Image from "next/image";
import type { PhotoMetadata } from "@/lib/photo-metadata";
import "./PhotoHero.scss";

export default function PhotoHero({
  photo,
  onOpen,
}: {
  photo: PhotoMetadata;
  onOpen: () => void;
}) {
  return (
    <button className="photoHero" onClick={onOpen}>
      <Image src={photo.src} alt={photo.caption} fill sizes="100vw" priority />
      <i />
      <div>
        <p className="kicker">{photo.title}</p>
        <h1 className="text-hero font-serif italic">David Frederik Erlich</h1>
        <p>
          Photographs of streets after rain, empty architecture, and quiet
          interiors.
        </p>
      </div>
    </button>
  );
}

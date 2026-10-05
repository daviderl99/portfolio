"use client";

import type { PhotoMetadata } from "@/lib/photo-metadata";
import FilmStrip from "./FilmStrip/FilmStrip";
import Gallery from "./Gallery/Gallery";
import PhotoContact from "./PhotoContact/PhotoContact";
import PhotoHero from "./PhotoHero/PhotoHero";
import PhotoIntro from "./PhotoIntro/PhotoIntro";
import "./PhotoView.scss";

export default function PhotoView({
  photos,
  onOpen,
}: {
  photos: PhotoMetadata[];
  onOpen: (index: number) => void;
}) {
  const heroPhoto = photos[0];
  if (!heroPhoto) return null;

  return (
    <div id="top" className="photoView enter">
      <PhotoHero photo={heroPhoto} onOpen={() => onOpen(0)} />
      <PhotoIntro />
      <FilmStrip photos={photos} onOpen={onOpen} />
      <Gallery photos={photos} onOpen={onOpen} />
      <PhotoContact />
    </div>
  );
}

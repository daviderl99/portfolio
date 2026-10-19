"use client";

import { useEffect, useState } from "react";
import type { PhotoMetadata } from "@/lib/photo-metadata";
import DeveloperView from "../DeveloperView/DeveloperView";
import EntryGate from "../EntryGate/EntryGate";
import Header from "../Header/Header";
import Lightbox from "../PhotoView/Lightbox/Lightbox";
import PhotoView from "../PhotoView/PhotoView";
import type { Mode } from "./types";
import "./Portfolio.scss";

export default function Portfolio({ photos }: { photos: PhotoMetadata[] }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("portfolio-mode");
    if (stored === "dev" || stored === "photo") setMode(stored);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--progress",
        String(max > 0 ? window.scrollY / max : 0),
      );
      document.documentElement.dataset.scrolled =
        window.scrollY > 8 ? "true" : "false";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") {
        setActivePhoto((activePhoto + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activePhoto, photos.length]);

  const choose = (next: Mode) => {
    setMode(next);
    sessionStorage.setItem("portfolio-mode", next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setActivePhoto(null);
    setMode(null);
    sessionStorage.removeItem("portfolio-mode");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (!mode) return <EntryGate photos={photos} onChoose={choose} />;

  return (
    <main className="pageRoot">
      <div className="scroll-progress" aria-hidden="true" />
      <Header mode={mode} onChoose={choose} onHome={goHome} />
      {mode === "dev" ? (
        <DeveloperView />
      ) : (
        <PhotoView photos={photos} onOpen={setActivePhoto} />
      )}
      {activePhoto !== null ? (
        <Lightbox
          photos={photos}
          index={activePhoto}
          onClose={() => setActivePhoto(null)}
          onMove={setActivePhoto}
        />
      ) : null}
    </main>
  );
}

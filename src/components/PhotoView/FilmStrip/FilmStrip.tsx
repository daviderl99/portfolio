"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { PhotoMetadata } from "@/lib/photo-metadata";
import "./FilmStrip.scss";

// Three copies keep the loop seamless even on very wide screens.
const COPIES = 3;
const AUTO_SPEED = 40; // px per second, right to left
const DRAG_THRESHOLD = 5;

export default function FilmStrip({
  photos,
  onOpen,
}: {
  photos: PhotoMetadata[];
  onOpen: (index: number) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let offset = 0;
    let setWidth = 0;
    let frame = 0;
    let last = performance.now();
    let pressed = false;
    let moved = false;
    let suppressClick = false;
    let startX = 0;
    let startOffset = 0;

    const apply = () => {
      if (setWidth > 0) offset = ((offset % setWidth) + setWidth) % setWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const measure = () => {
      setWidth = track.offsetWidth / COPIES;
      apply();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!pressed && !reduceMotion) {
        offset += AUTO_SPEED * dt;
        apply();
      }
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      const unit = event.deltaMode === 1 ? 16 : 1;
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      event.preventDefault();
      offset += delta * unit;
      apply();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pressed = true;
      moved = false;
      startX = event.clientX;
      startOffset = offset;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pressed) return;
      const dx = event.clientX - startX;
      if (!moved && Math.abs(dx) > DRAG_THRESHOLD) {
        moved = true;
        // Capturing only after a real drag keeps plain clicks on the buttons.
        strip.setPointerCapture(event.pointerId);
        strip.classList.add("filmStripDragging");
      }
      if (moved) {
        offset = startOffset - dx;
        apply();
      }
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (moved) {
        suppressClick = true;
        window.setTimeout(() => {
          suppressClick = false;
        }, 0);
        if (strip.hasPointerCapture(event.pointerId)) {
          strip.releasePointerCapture(event.pointerId);
        }
      }
      moved = false;
      strip.classList.remove("filmStripDragging");
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    };

    // Focusing a button must not scroll the clipped strip.
    const onScroll = () => {
      strip.scrollLeft = 0;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    frame = requestAnimationFrame(tick);

    strip.addEventListener("wheel", onWheel, { passive: false });
    strip.addEventListener("pointerdown", onPointerDown);
    strip.addEventListener("pointermove", onPointerMove);
    strip.addEventListener("pointerup", onPointerEnd);
    strip.addEventListener("pointercancel", onPointerEnd);
    strip.addEventListener("click", onClickCapture, true);
    strip.addEventListener("scroll", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      strip.removeEventListener("wheel", onWheel);
      strip.removeEventListener("pointerdown", onPointerDown);
      strip.removeEventListener("pointermove", onPointerMove);
      strip.removeEventListener("pointerup", onPointerEnd);
      strip.removeEventListener("pointercancel", onPointerEnd);
      strip.removeEventListener("click", onClickCapture, true);
      strip.removeEventListener("scroll", onScroll);
    };
  }, [photos.length]);

  return (
    <div ref={stripRef} className="filmStrip">
      <div ref={trackRef} className="filmStripTrack">
        {Array.from({ length: COPIES }, (_, copy) =>
          photos.map((photo, index) => (
            <button
              key={`${copy}-${photo.id}`}
              onClick={() => onOpen(index)}
              aria-hidden={copy > 0 || undefined}
              tabIndex={copy > 0 ? -1 : undefined}
            >
              <Image
                src={photo.src}
                alt={copy > 0 ? "" : photo.caption}
                fill
                sizes="208px"
                loading="lazy"
                draggable={false}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          )),
        )}
      </div>
    </div>
  );
}

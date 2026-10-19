"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import type { PhotoMetadata } from "@/lib/photo-metadata";
import type { Mode } from "../Portfolio/types";
import "./EntryGate.scss";

export default function EntryGate({
  photos,
  onChoose,
}: {
  photos: PhotoMetadata[];
  onChoose: (mode: Mode) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [locked, setLocked] = useState<Mode | null>(null);

  useEffect(() => {
    // Keyboard shortcuts use the same commit path as clicking either side.
    const onKey = (event: KeyboardEvent) => {
      if (locked) return;
      if (event.key === "1" || event.key.toLowerCase() === "c") commit("dev");
      if (event.key === "2" || event.key.toLowerCase() === "l") commit("photo");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked]);

  const setFromClientX = (clientX: number) => {
    const element = wrapRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    // Keep the handle away from the edges so both choices remain discoverable.
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setSplit(Math.min(78, Math.max(22, next)));
  };

  const commit = (next: Mode) => {
    if (locked) return;
    // Lock the slider while its 620ms CSS transition completes.
    setLocked(next);
    setSplit(next === "dev" ? 100 : 0);
    window.setTimeout(() => onChoose(next), 620);
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (locked) return;
    if (event.pointerType === "touch" && !dragging) return;
    setFromClientX(event.clientX);
  };

  const entryImage = photos[0]?.src ?? "/photos/tram.jpg";

  return (
    <>
      <h1 className="sr-only">
        David Frederik Erlich - developer and photographer
      </h1>
      <div className="entryMobile">
        <button
          type="button"
          className="entryMobileCode"
          onClick={() => commit("dev")}
        >
          <span>01 / Code</span>
          <div>
            <b>Developer</b>
            <strong>
              Build
              <span className="cursor-blink" />
            </strong>
            <p>Code, design, and things for the web.</p>
          </div>
        </button>
        <button
          type="button"
          className="entryMobileLens"
          onClick={() => commit("photo")}
        >
          <Image
            src={entryImage}
            alt="Featured portfolio photograph"
            fill
            sizes="100vw"
            priority
          />
          <i />
          <span>02 / Lens</span>
          <div>
            <b>Photographer</b>
            <strong>Look</strong>
            <p>Streets, nature, and everyday moments.</p>
          </div>
        </button>
      </div>
      <div
        ref={wrapRef}
        className={`entrySlider ${locked ? "entrySliderLocked" : ""}`}
        onPointerMove={onMove}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") {
            setDragging(true);
            setFromClientX(event.clientX);
          }
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <div
          className="entrySliderCode"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          onClick={() => commit("dev")}
        >
          <div className="entrySliderContent entrySliderCodeContent">
            <div className="entrySliderTop">
              <span>01 / Code</span>
            </div>
            <div>
              <b>Developer</b>
              <strong>
                Build
                <span className="cursor-blink" />
              </strong>
              <p>Code, design, and things for the web.</p>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                commit("dev");
              }}
            >
              Enter studio
            </button>
          </div>
        </div>
        <div
          className="entrySliderLens"
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
          onClick={() => commit("photo")}
        >
          <Image
            src={entryImage}
            alt="Featured portfolio photograph"
            fill
            sizes="100vw"
            priority
          />
          <i />
          <div className="entrySliderContent entrySliderLensContent">
            <div className="entrySliderTop">
              <span></span>
              <span>02 / Lens</span>
            </div>
            <div>
              <b>Photographer</b>
              <strong>Look</strong>
              <p>Streets, nature, and everyday moments.</p>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                commit("photo");
              }}
            >
              Enter field
            </button>
          </div>
        </div>
        <div className="entrySliderHandle" style={{ left: `${split}%` }}>
          <div className="entrySliderLine" />
          <div className="entrySliderKnob">↔</div>
        </div>
      </div>
    </>
  );
}

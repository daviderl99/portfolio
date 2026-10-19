import { readdir } from "node:fs/promises";
import path from "node:path";
import { parse } from "exifr";

const supportedImage = /\.(jpe?g|png|webp)$/i;

export type PhotoMetadata = {
  id: string;
  src: string;
  filename: string;
  title: string;
  caption: string;
  camera?: string;
  lens?: string;
  focalLength?: string;
  iso?: string;
  shutterSpeed?: string;
  aperture?: string;
  date?: string;
};

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function formatShutterSpeed(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }
  if (value >= 1) return `${value}s`;
  return `1/${Math.round(1 / value)}s`;
}

function formatAperture(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? `f/${value}`
    : undefined;
}

function formatFocalLength(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? `${value}mm`
    : undefined;
}

function formatDate(value: unknown) {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export async function getPhotoMetadata(): Promise<PhotoMetadata[]> {
  const directory = path.join(process.cwd(), "public", "photos");
  const filenames = (await readdir(directory))
    .filter((filename) => supportedImage.test(filename))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return Promise.all(
    filenames.map(async (filename) => {
      const title = titleFromFilename(filename);
      const fallback = {
        id: filename,
        src: `/photos/${encodeURIComponent(filename)}`,
        filename,
        title,
        caption: title,
      } satisfies PhotoMetadata;

      try {
        const exif = await parse(path.join(directory, filename), {
          pick: [
            "ImageDescription",
            "Make",
            "Model",
            "LensModel",
            "FocalLength",
            "ISO",
            "ExposureTime",
            "FNumber",
            "DateTimeOriginal",
          ],
        });

        if (!exif) return fallback;

        return {
          ...fallback,
          caption:
            typeof exif.ImageDescription === "string" &&
            exif.ImageDescription.trim()
              ? exif.ImageDescription.trim()
              : title,
          camera: exif.Model || exif.Make || undefined,
          lens: exif.LensModel || undefined,
          focalLength: formatFocalLength(exif.FocalLength),
          iso: typeof exif.ISO === "number" ? `ISO ${exif.ISO}` : undefined,
          shutterSpeed: formatShutterSpeed(exif.ExposureTime),
          aperture: formatAperture(exif.FNumber),
          date: formatDate(exif.DateTimeOriginal),
        } satisfies PhotoMetadata;
      } catch {
        return fallback;
      }
    }),
  );
}

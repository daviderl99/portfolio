import Portfolio from "@/components/Portfolio/Portfolio";
import { getPhotoMetadata } from "@/lib/photo-metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function Home() {
  const photos = await getPhotoMetadata();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David Frederik Erlich",
    jobTitle: "Frontend Web Developer",
    url: siteUrl,
    sameAs: [
      "https://github.com/daviderl99",
      "https://www.linkedin.com/in/david-frederik-erlich",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Portfolio photos={photos} />
    </>
  );
}

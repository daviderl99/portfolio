"use client";

import { useEffect, useState } from "react";
import {
  FaArrowUpRightFromSquare,
  FaGithub,
  FaLinkedin,
  FaXmark,
} from "react-icons/fa6";

type Mode = "dev" | "photo";

const projects = [
  {
    id: "01",
    name: "AI Video Subtitler",
    tag: "Platform",
    summary:
      "An end-to-end video subtitle pipeline for transcription, translation, SRT export, and burned-in captions.",
    stack: ["Angular", "TypeScript", "Python", "FastAPI"],
    href: "https://video-subtitler-fe.vercel.app",
  },
  {
    id: "02",
    name: "File Storage Drive",
    tag: "Product",
    summary:
      "A Google Drive-inspired storage interface with nested folders, uploads, and secure Firebase authentication.",
    stack: ["React", "Firebase", "SCSS"],
    href: "https://daviderl99.github.io/Storage-Drive/#/login",
  },
  {
    id: "03",
    name: "Chatter",
    tag: "Realtime",
    summary:
      "A room-based chat application with authentication, Firestore messaging, image uploads, and profiles.",
    stack: ["React", "Vite", "Firebase"],
    href: "https://daviderl99.github.io/chatter-firebase",
  },
  {
    id: "04",
    name: "Another ToDo List",
    tag: "Interface",
    summary:
      "A focused task manager with drag and drop, real-time updates, and a minimalist responsive interface.",
    stack: ["Svelte", "TypeScript", "Tailwind CSS"],
    href: "https://another-to-do-list-two.vercel.app",
  },
];

const photos = [
  [
    "salt",
    "Mirror, late",
    "Rio Maior, PT",
    "A salt flat at dusk with a tiny figure walking across mirrored water",
  ],
  [
    "tram",
    "Line 28",
    "Lisbon, PT",
    "A yellow tram turning a steep cobbled Lisbon street at golden hour",
  ],
  [
    "window",
    "West window",
    "Lisbon, PT",
    "A woman in a linen shirt sitting by a tall window in late light",
  ],
  [
    "rain",
    "After the sign",
    "Shinjuku, JP",
    "A rain-soaked city street at night with neon reflecting in puddles",
  ],
  [
    "oranges",
    "Blood orange",
    "Studio, Lisbon",
    "Sliced blood oranges and a brass knife in hard sunlight on marble",
  ],
  [
    "pool",
    "Closed for winter",
    "Estoril, PT",
    "An empty mid-century swimming pool with pale turquoise tiles",
  ],
  [
    "stairs",
    "Landings",
    "Lisbon, PT",
    "A brutalist concrete stairwell photographed from below",
  ],
  [
    "forest",
    "Eucalyptus",
    "Sintra, PT",
    "Tall eucalyptus trunks in misty green hillside light",
  ],
  [
    "laundry",
    "Monday",
    "Alfama, PT",
    "White sheets on rooftop laundry lines above terracotta roofs",
  ],
  [
    "coast",
    "Lookout",
    "Azenhas do Mar, PT",
    "Foggy Atlantic cliffs with a lone concrete lookout over a silver sea",
  ],
] as const;

export default function PortfolioShell() {
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
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight")
        setActivePhoto((activePhoto + 1) % photos.length);
      if (event.key === "ArrowLeft")
        setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activePhoto]);

  const choose = (next: Mode) => {
    setMode(next);
    sessionStorage.setItem("portfolio-mode", next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mode) {
    return <EntryGate onChoose={choose} />;
  }

  return (
    <main className="pageRoot">
      <div className="scroll-progress" aria-hidden="true" />
      <header className="siteHeader">
        <a
          href="#top"
          className={mode === "photo" ? "font-serif italic" : "font-display"}
        >
          David Frederik Erlich
        </a>
        <nav aria-label="Sections">
          {(mode === "photo"
            ? [
                ["#gallery", "Gallery"],
                ["#contact", "Contact"],
              ]
            : [
                ["#intro", "Intro"],
                ["#work", "Work"],
                ["#stack", "Stack"],
                ["#contact", "Contact"],
              ]
          ).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="modeToggle" role="group" aria-label="Portfolio mode">
          <button
            className={mode === "dev" ? "selected" : ""}
            onClick={() => choose("dev")}
          >
            Code
          </button>
          <button
            className={mode === "photo" ? "selected photoSelected" : ""}
            onClick={() => choose("photo")}
          >
            Lens
          </button>
        </div>
      </header>
      {mode === "dev" ? (
        <DeveloperView onChoosePhoto={() => choose("photo")} />
      ) : (
        <PhotoView onOpen={setActivePhoto} />
      )}
      {activePhoto !== null ? (
        <Lightbox
          index={activePhoto}
          onClose={() => setActivePhoto(null)}
          onMove={setActivePhoto}
        />
      ) : null}
    </main>
  );
}

function EntryGate({ onChoose }: { onChoose: (mode: Mode) => void }) {
  return (
    <section className="entryGate">
      <button className="entryCode" onClick={() => onChoose("dev")}>
        <span>01 / Code</span>
        <div>
          <b>Developer</b>
          <strong>
            Build
            <span className="cursor-blink" />
          </strong>
          <p>Accessible, thoughtful interfaces for the browser.</p>
        </div>
        <small>Enter studio</small>
      </button>
      <button className="entryLens" onClick={() => onChoose("photo")}>
        <img src="/photos/tram.jpg" alt="A yellow tram in Lisbon" />
        <i />
        <span>02 / Lens</span>
        <div>
          <b>Photographer</b>
          <strong>Look</strong>
          <p>Streets after rain, quiet rooms, changing light.</p>
        </div>
        <small>Enter field</small>
      </button>
    </section>
  );
}

function DeveloperView({ onChoosePhoto }: { onChoosePhoto: () => void }) {
  return (
    <div id="top" className="enter devView">
      <section className="devHero">
        <p className="kicker">Studio / 2016 - now</p>
        <h1 className="text-display">
          David
          <br />
          Erlich
          <span className="cursor-blink" />
        </h1>
        <p className="heroLead">
          Building accessible, user-friendly websites that are fast, modern, and
          intuitive.
        </p>
        <div className="heroActions">
          <a href="#work" className="solidButton">
            See work
          </a>
          <a href="#contact" className="outlineButton">
            Get in touch
          </a>
          <button className="outlineButton" onClick={onChoosePhoto}>
            Open lens
          </button>
        </div>
      </section>
      <section id="intro" className="wideSection twoColumn">
        <p className="kicker">Brief</p>
        <div>
          <p className="largeCopy">
            I&apos;m a frontend developer based in Tallinn who enjoys building
            clean, intuitive, and accessible web experiences. I work at the
            intersection of design and development, turning complex requirements
            into practical interfaces.
          </p>
          <p className="monoMeta">
            daviderlich75@gmail.com <span>/</span> Tallinn, Estonia
          </p>
        </div>
      </section>
      <section id="work" className="wideSection">
        <div className="sectionHeading">
          <div>
            <p className="kicker">Selected work</p>
            <h2 className="text-section">Projects</h2>
          </div>
          <p className="monoMeta">2023 - 2025</p>
        </div>
        <ul className="projectGrid">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="mockWindow">
                <div className="mockChrome">
                  <i />
                  <i />
                  <i />
                  <span>
                    {project.tag} · {project.id}
                  </span>
                </div>
                <div className="projectBody">
                  <div className="projectIndex">{project.id}</div>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                    <small>{project.stack.join("  ·  ")}</small>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name}`}
                    >
                      <FaArrowUpRightFromSquare />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section id="stack" className="wideSection">
        <p className="kicker">Toolkit</p>
        <h2 className="text-section">Technical range</h2>
        <ul className="stackGrid">
          {[
            "React",
            "Angular",
            "TypeScript",
            "Next.js",
            "Svelte",
            "Python",
            "Firebase",
            "SCSS",
            "Tailwind",
            "Git",
          ].map((item) => (
            <li key={item}>
              <strong>{item}</strong>
              <span>Used to make interfaces clear, quick, and resilient.</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="contact" className="wideSection contactSection">
        <p className="kicker">Available for thoughtful work</p>
        <h2 className="text-hero">
          Let&apos;s make
          <br />
          <em>something useful.</em>
        </h2>
        <a className="contactEmail" href="mailto:daviderlich75@gmail.com">
          daviderlich75@gmail.com <FaArrowUpRightFromSquare />
        </a>
        <div className="socials">
          <a
            href="https://github.com/daviderl99"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/david-frederik-erlich"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </section>
      <footer className="siteFooter">
        © {new Date().getFullYear()} David Frederik Erlich{" "}
        <span>Built with Next.js</span>
      </footer>
    </div>
  );
}

function PhotoView({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div id="top" className="photoView enter">
      <button className="photoHero" onClick={() => onOpen(0)}>
        <img src="/photos/salt.jpg" alt={photos[0][3]} />
        <i />
        <div>
          <p className="kicker">Salt Light · 2025</p>
          <h1 className="text-hero font-serif italic">David Frederik Erlich</h1>
          <p>
            Photographs of streets after rain, empty architecture, and quiet
            interiors.
          </p>
        </div>
      </button>
      <section className="wideSection photoIntro twoColumn">
        <p className="kicker">Field notes / analog &amp; digital</p>
        <p className="largeCopy font-serif">
          The hour between work and night. Shot on 35mm when possible, digital
          when necessary. Prints on request.
        </p>
      </section>
      <div className="filmStrip">
        {photos.map((photo, index) => (
          <button key={photo[0]} onClick={() => onOpen(index)}>
            <img src={`/photos/${photo[0]}.jpg`} alt="" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <section id="gallery" className="wideSection">
        <p className="kicker">Selected prints</p>
        <h2 className="text-section font-serif italic">Gallery</h2>
        <div className="galleryGrid">
          {photos.map((photo, index) => (
            <button
              key={photo[0]}
              className={`galleryItem gallery-${index}`}
              onClick={() => onOpen(index)}
            >
              <img src={`/photos/${photo[0]}.jpg`} alt={photo[3]} />
              <span>
                <em>{photo[1]}</em>
                <small>{photo[2]}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
      <section id="contact" className="wideSection photoContact">
        <p className="kicker">Prints &amp; commissions</p>
        <h2 className="text-hero font-serif italic">Get in touch</h2>
        <a
          className="contactEmail font-serif italic"
          href="mailto:daviderlich75@gmail.com"
        >
          daviderlich75@gmail.com <FaArrowUpRightFromSquare />
        </a>
      </section>
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onMove,
}: {
  index: number;
  onClose: () => void;
  onMove: (index: number) => void;
}) {
  const photo = photos[index];
  return (
    <div className="lightbox">
      <div>
        <span>
          {String(index + 1).padStart(2, "0")} / {photos.length}
        </span>
        <button onClick={onClose} aria-label="Close">
          <FaXmark />
        </button>
      </div>
      <button
        className="lightboxImage"
        onClick={() => onMove((index + 1) % photos.length)}
      >
        <img src={`/photos/${photo[0]}.jpg`} alt={photo[3]} />
      </button>
      <footer>
        <strong>{photo[1]}</strong>
        <span>{photo[2]} · 2025</span>
      </footer>
    </div>
  );
}

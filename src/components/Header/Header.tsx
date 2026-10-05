"use client";

import type { Mode } from "../Portfolio/types";
import "./Header.scss";

export default function Header({
  mode,
  onChoose,
  onHome,
}: {
  mode: Mode;
  onChoose: (mode: Mode) => void;
  onHome: () => void;
}) {
  const links =
    mode === "photo"
      ? [
          ["#gallery", "Gallery"],
          ["#contact", "Contact"],
        ]
      : [
          ["#intro", "Intro"],
          ["#work", "Work"],
          ["#stack", "Stack"],
          ["#contact", "Contact"],
        ];

  return (
    <header className={`siteHeader${mode === "photo" ? " photoHeader" : ""}`}>
      <a
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          onHome();
        }}
        className={mode === "photo" ? "font-serif italic" : "font-display"}
        aria-label="Return to portfolio home"
      >
        David Frederik Erlich
      </a>
      <nav aria-label="Sections">
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="modeToggle" role="group" aria-label="Portfolio mode">
        <button
          className={mode === "dev" ? "selected" : ""}
          onClick={() => onChoose("dev")}
        >
          Code
        </button>
        <button
          className={mode === "photo" ? "selected photoSelected" : ""}
          onClick={() => onChoose("photo")}
        >
          Lens
        </button>
      </div>
    </header>
  );
}

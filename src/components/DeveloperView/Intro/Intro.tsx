import "./Intro.scss";

export default function Intro() {
  return (
    <section id="intro" className="wideSection">
      <p className="kicker">Brief</p>
      <div className="introCopy">
        <p className="largeCopy">
          I&apos;m a web developer based in Tallinn who enjoys building clean,
          intuitive, and accessible web experiences. I like working where design
          meets code, and I enjoy taking complicated requirements and turning
          them into interfaces that are simple to use.
        </p>
        <p className="monoMeta">
          daviderlich75@gmail.com <span>/</span> Tallinn, Estonia
        </p>
      </div>
    </section>
  );
}

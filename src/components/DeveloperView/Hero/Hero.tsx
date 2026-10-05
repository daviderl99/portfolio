import "./Hero.scss";

export default function Hero() {
  return (
    <section className="devHero">
      <p className="kicker">Studio / 2016 - now</p>
      <h1 className="text-display">
        David
        <br />
        Frederik
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
      </div>
    </section>
  );
}

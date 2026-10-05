import {
  FaArrowUpRightFromSquare,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import "./Contact.scss";

export default function Contact() {
  return (
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
  );
}

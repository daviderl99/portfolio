import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./PhotoContact.scss";

export default function PhotoContact() {
  return (
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
  );
}

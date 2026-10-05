import { stackItems } from "../content";
import "./Stack.scss";

export default function Stack() {
  return (
    <section id="stack" className="wideSection">
      <p className="kicker">Toolkit</p>
      <h2 className="text-section">Technical range</h2>
      <ul className="stackGrid">
        {stackItems.map((item) => (
          <li key={item}>
            <strong>{item}</strong>
            <span>Used to make interfaces clear, quick, and resilient.</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

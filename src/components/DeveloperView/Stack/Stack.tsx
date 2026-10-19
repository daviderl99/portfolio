import { stackItems } from "../content";
import "./Stack.scss";

export default function Stack() {
  return (
    <section id="stack" className="wideSection">
      <p className="kicker">Toolkit</p>
      <h2 className="text-section">Technical range</h2>
      <ul className="stackGrid">
        {stackItems.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

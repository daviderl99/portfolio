import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="siteFooter">
      © {new Date().getFullYear()} David Frederik Erlich{" "}
      <span>Built with Next.js</span>
    </footer>
  );
}

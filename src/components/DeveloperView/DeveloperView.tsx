import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Intro from "./Intro/Intro";
import Projects from "./Projects/Projects";
import Stack from "./Stack/Stack";

export default function DeveloperView() {
  return (
    <div id="top" className="enter devView">
      <Hero />
      <Intro />
      <Projects />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}

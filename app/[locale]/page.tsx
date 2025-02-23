import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Skills from "./components/Skills";


export default function Home() {
  return (
    <main className="overflow-hidden w-full h-full">
      <Hero />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}

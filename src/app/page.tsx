import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/projects/Projects";
import { Services } from "@/components/services/Services";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/contact/Contact";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip introduction
      </a>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Skills />
        <Contact />
      </main>
      <SmoothScroll />
    </>
  );
}

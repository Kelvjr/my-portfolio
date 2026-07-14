"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    number: "01",
    title: "Aegis Alerts",
    type: "Product design / Custom development",
    year: "2026",
    image: "/work/aegis-mockup.webp",
    href: "https://aegisalerts.online/",
    alt: "Aegis Alerts consumer verification website shown on a desktop monitor",
  },
  {
    number: "02",
    title: "Leti Arts",
    type: "Website / Interactive experience",
    year: "2026",
    image: "/work/leti-mockup.webp",
    href: "https://www.letiarts.com/",
    alt: "Leti Arts website displayed in desktop and mobile presentation mockups",
  },
  {
    number: "03",
    title: "586Designs Collection",
    type: "Brand identity / Web & mobile design",
    year: "2024—25",
    image: "/work/design-mockup.webp",
    href: "https://www.instagram.com/586designs_/",
    alt: "Three 586Designs projects presented as premium editorial prints",
  },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.body.classList.add("is-loading");

      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => document.body.classList.remove("is-loading"),
      });

      intro
        .from(".loader-word span", {
          yPercent: 120,
          duration: 0.9,
          stagger: 0.06,
        })
        .to(".loader-meta", { opacity: 1, duration: 0.35 }, "-=0.4")
        .to(".loader", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "+=0.25")
        .from(".hero-line span", { yPercent: 110, duration: 1, stagger: 0.08 }, "-=0.35")
        .from(".hero-detail", { opacity: 0, y: 18, duration: 0.7, stagger: 0.1 }, "-=0.55");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const visual = card.querySelector(".project-visual");
        gsap.fromTo(
          visual,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.25,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 78%" },
          },
        );
      });

      gsap.to(".orb-one", {
        yPercent: 38,
        xPercent: 12,
        scrollTrigger: { trigger: ".about", scrub: 1, start: "top bottom", end: "bottom top" },
      });
      gsap.to(".orb-two", {
        yPercent: -30,
        xPercent: -16,
        scrollTrigger: { trigger: ".about", scrub: 1, start: "top bottom", end: "bottom top" },
      });
    }, root);

    const cursor = document.querySelector<HTMLElement>(".cursor");
    const cursorLabel = document.querySelector<HTMLElement>(".cursor-label");
    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.35, ease: "power3.out" });
    };
    const enlarge = () => cursor?.classList.add("is-active");
    const shrink = () => cursor?.classList.remove("is-active");
    const showView = () => { if (cursorLabel) cursorLabel.textContent = "View"; };
    const hideView = () => { if (cursorLabel) cursorLabel.textContent = ""; };

    window.addEventListener("mousemove", moveCursor);
    const interactive = document.querySelectorAll("a, button");
    const cards = document.querySelectorAll(".project-visual");
    interactive.forEach((element) => {
      element.addEventListener("mouseenter", enlarge);
      element.addEventListener("mouseleave", shrink);
    });
    cards.forEach((element) => {
      element.addEventListener("mouseenter", showView);
      element.addEventListener("mouseleave", hideView);
    });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", moveCursor);
      interactive.forEach((element) => {
        element.removeEventListener("mouseenter", enlarge);
        element.removeEventListener("mouseleave", shrink);
      });
      cards.forEach((element) => {
        element.removeEventListener("mouseenter", showView);
        element.removeEventListener("mouseleave", hideView);
      });
      document.body.classList.remove("is-loading");
    };
  }, []);

  return (
    <main ref={root}>
      <div className="cursor" aria-hidden="true"><span className="cursor-label" /></div>

      <div className="loader" aria-hidden="true">
        <div className="loader-word" aria-label="Loading portfolio">
          {"KELVIN".split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
        </div>
        <div className="loader-meta">Portfolio / 2026</div>
      </div>

      <header className="site-header">
        <a className="brand magnetic" href="#top" aria-label="Kelvin Kyere, back to top">Kelvin Kyere<span>®</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="availability"><i /> Tema, Ghana / Available worldwide</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker hero-detail">Kelvin Kyere <span>—</span> Developer &amp; designer</div>
        <h1 aria-label="Code, design and ideas made tangible">
          <span className="hero-line"><span>Code, design &amp; ideas</span></span>
          <span className="hero-line italic"><span>made tangible.</span></span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-detail">I build thoughtful websites, custom digital products and visual identities that help ambitious ideas move with clarity.</p>
          <a className="round-link hero-detail" href="#work" aria-label="Scroll to selected work">
            <span>Explore work</span><b>↓</b>
          </a>
          <div className="hero-index hero-detail">4+ years / 586Designs</div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div>WEBSITES ✦ CUSTOM DEVELOPMENT ✦ GRAPHIC DESIGN ✦ MOBILE APP DESIGN ✦ WEBSITES ✦ CUSTOM DEVELOPMENT ✦ GRAPHIC DESIGN ✦ MOBILE APP DESIGN ✦&nbsp;</div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <p className="eyebrow" data-reveal>(A little about me)</p>
        <div className="about-grid">
          <h2 data-reveal>I turn ambitious ideas into <em>useful, beautiful</em> digital products.</h2>
          <figure className="portrait" data-reveal>
            <Image src="/kelvin-kyere.jpg" alt="Portrait of Kelvin Kyere" width={1200} height={1200} sizes="(max-width: 820px) 72vw, 24vw" />
            <figcaption>Kelvin Kyere / Tema, Ghana</figcaption>
          </figure>
          <div className="about-copy" data-reveal>
            <p>I’m Kelvin Kyere, a web developer and graphic designer based in Tema, Ghana. I graduated from the University of Professional Studies, Accra, and have spent more than four years building solutions for brands, businesses and bold new ideas.</p>
            <p>I work across strategy, interface design, development and visual identity—bridging creative direction and engineering from the first sketch through launch.</p>
            <a href="#services">What I can do <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">(Selected work)</p>
          <h2>Projects with <em>purpose.</em></h2>
          <span>2024—2026</span>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <a className="project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                <Image src={project.image} alt={project.alt} fill sizes="(max-width: 820px) 94vw, 72vw" />
              </a>
              <div className="project-meta">
                <span>{project.number}</span>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
                <time>{project.year}</time>
              </div>
              {project.number === "03" && (
                <div className="case-links" aria-label="586Designs case studies">
                  <a href="https://www.instagram.com/p/DIBZycjIeYR/" target="_blank" rel="noreferrer">Grains Depot ↗</a>
                  <a href="https://www.instagram.com/p/DCjInItobO3/" target="_blank" rel="noreferrer">FormaFrame ↗</a>
                  <a href="https://www.instagram.com/p/C9fuGfmou1d/" target="_blank" rel="noreferrer">Smart Home App ↗</a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-intro">
          <p className="eyebrow" data-reveal>(Capabilities)</p>
          <h2 data-reveal>From first sketch<br />to final <em>interaction.</em></h2>
        </div>
        <div className="service-list">
          {[
            ["01", "Website design", "Responsive UI & UX / Interactive prototypes / Design systems / Conversion-focused experiences"],
            ["02", "Custom development", "Frontend & backend builds / Creative coding / GSAP motion / CMS and API integrations"],
            ["03", "Graphic design", "Brand identity / Campaigns / Social content / Editorial and marketing assets"],
            ["04", "Mobile app design", "Product strategy / User flows / Interface design / High-fidelity prototypes"],
          ].map(([number, title, copy]) => (
            <article data-reveal key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p><b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-track" aria-hidden="true">DESIGN WITH INTENT — BUILD WITH CARE —&nbsp;</div>
        <div className="manifesto-note" data-reveal>
          <span>Currently</span>
          <p>Independent creative<br />Based in Tema, Ghana<br />Working worldwide</p>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <p className="eyebrow">(Let’s make something good)</p>
          <h2>Have a project<br />in mind? <em>Say hello.</em></h2>
        </div>
        <a className="email-link" href="mailto:kelvinkwasikyere5@gmail.com">kelvinkwasikyere5@gmail.com <span>↗</span></a>
        <div className="footer-bottom">
          <span>© 2026 Kelvin Kyere</span>
          <div>
            <a href="https://www.linkedin.com/in/kelvinkyere" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/586designs_/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/586Designs" target="_blank" rel="noreferrer">Facebook</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

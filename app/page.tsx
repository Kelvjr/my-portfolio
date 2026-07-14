"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    number: "01",
    title: "Aegis Alerts",
    type: "Product design · Custom development",
    year: "2026",
    image: "/work/aegis-mockup.webp",
    href: "https://aegisalerts.online/",
    alt: "Aegis Alerts consumer verification platform on a desktop display",
    featured: true,
  },
  {
    number: "02",
    title: "Leti Arts",
    type: "Website · Interactive experience",
    year: "2026",
    image: "/work/leti-mockup.webp",
    href: "https://www.letiarts.com/",
    alt: "Leti Arts website presented on desktop and mobile screens",
  },
  {
    number: "03",
    title: "Grains Depot",
    type: "Brand identity · Graphic design",
    year: "2025",
    image: "/work/grains-depot-mockup.webp",
    href: "https://www.instagram.com/p/DIBZycjIeYR/?igsh=MWV3MXBiZ3pvcmhrbw==",
    alt: "Grains Depot brand identity applied to stationery, a tote bag and T-shirt",
  },
  {
    number: "04",
    title: "FormaFrame",
    type: "Website design · Art direction",
    year: "2024",
    image: "/work/formaframe-mockup.webp",
    href: "https://www.instagram.com/p/DCjInItobO3/?igsh=bGVkaXVudjY0c241",
    alt: "FormaFrame architecture website displayed on a laptop and tablet",
  },
  {
    number: "05",
    title: "Smart Home App",
    type: "Mobile app design · UI/UX",
    year: "2024",
    image: "/work/smart-home-mockup.webp",
    href: "https://www.instagram.com/p/C9fuGfmou1d/?img_index=1&igsh=ZWhocGpsc2ZwYmZ5",
    alt: "Smart Home mobile app screens presented in a sculptural stone environment",
  },
];

const services = [
  {
    number: "01",
    title: "Website design",
    summary: "Clear, responsive interfaces built around your audience and business goals.",
    details: ["UI & UX design", "Responsive systems", "Interactive prototypes", "Design systems"],
  },
  {
    number: "02",
    title: "Custom development",
    summary: "Fast, maintainable digital products with thoughtful motion and integrations.",
    details: ["Frontend & backend", "CMS integration", "API development", "GSAP interaction"],
  },
  {
    number: "03",
    title: "Graphic design",
    summary: "Distinctive visual systems that make brands easier to recognize and remember.",
    details: ["Brand identity", "Campaign design", "Social content", "Marketing assets"],
  },
  {
    number: "04",
    title: "Mobile app design",
    summary: "Useful mobile experiences shaped from user flows through polished prototypes.",
    details: ["Product strategy", "User flows", "Interface design", "High-fidelity prototypes"],
  },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.body.classList.add("is-loading");

      gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => document.body.classList.remove("is-loading"),
      })
        .from(".loader-word span", { yPercent: 120, duration: 0.7, stagger: 0.05 })
        .to(".loader-meta", { opacity: 1, duration: 0.25 }, "-=0.25")
        .to(".loader", { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "+=0.15")
        .from(".hero-line span", { yPercent: 110, duration: 0.85, stagger: 0.08 }, "-=0.25")
        .from(".hero-detail", { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, "-=0.45");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const image = card.querySelector(".project-image");
        gsap.fromTo(
          image,
          { scale: 1.08, yPercent: 4 },
          {
            scale: 1,
            yPercent: -2,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.7 },
          },
        );
      });
    }, root);

    const cursor = document.querySelector<HTMLElement>(".cursor");
    const cursorLabel = document.querySelector<HTMLElement>(".cursor-label");
    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.25, ease: "power3.out" });
    };
    const enlarge = () => cursor?.classList.add("is-active");
    const shrink = () => cursor?.classList.remove("is-active");
    const showView = () => { if (cursorLabel) cursorLabel.textContent = "View"; };
    const hideView = () => { if (cursorLabel) cursorLabel.textContent = ""; };

    window.addEventListener("mousemove", moveCursor);
    const interactive = document.querySelectorAll("a, button");
    const projectLinks = document.querySelectorAll(".project-link");
    interactive.forEach((element) => {
      element.addEventListener("mouseenter", enlarge);
      element.addEventListener("mouseleave", shrink);
    });
    projectLinks.forEach((element) => {
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
      projectLinks.forEach((element) => {
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
        <div className="loader-word">
          {"KELVIN".split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
        </div>
        <div className="loader-meta">Portfolio / 2026</div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kelvin Kyere, back to top">Kelvin Kyere<span>®</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="availability"><i /> Tema, Ghana / Available worldwide</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker hero-detail">Web developer <span>+</span> graphic designer</div>
        <h1 aria-label="Ideas made clear, useful and memorable">
          <span className="hero-line"><span>Ideas made clear,</span></span>
          <span className="hero-line italic"><span>useful &amp; memorable.</span></span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-detail">I’m Kelvin Kyere. I design and build thoughtful websites, custom products, visual identities and mobile experiences.</p>
          <a className="round-link hero-detail" href="#work" aria-label="Explore selected work"><span>Explore work</span><b>↓</b></a>
          <div className="hero-index hero-detail">4+ years / 586Designs</div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span className="marquee-group">WEBSITES ✦ CUSTOM DEVELOPMENT ✦ GRAPHIC DESIGN ✦ MOBILE APP DESIGN ✦</span>
            <span className="marquee-group">WEBSITES ✦ CUSTOM DEVELOPMENT ✦ GRAPHIC DESIGN ✦ MOBILE APP DESIGN ✦</span>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-heading" data-reveal>
          <p className="eyebrow">(About Kelvin)</p>
          <h2>Designer’s eye.<br /><em>Developer’s mind.</em></h2>
        </div>
        <div className="about-layout">
          <figure className="portrait" data-reveal>
            <Image src="/kelvin-kyere.jpg" alt="Portrait of Kelvin Kyere" width={1200} height={1200} sizes="(max-width: 820px) 92vw, 36vw" priority />
            <figcaption><span>Kelvin Kyere</span><span>Tema, Ghana</span></figcaption>
          </figure>
          <div className="about-story" data-reveal>
            <p className="about-lead">I build digital work that looks considered and works without friction.</p>
            <p>A graduate of the University of Professional Studies, Accra, I’ve spent more than four years helping brands and businesses turn early ideas into reliable digital products and clear visual systems.</p>
            <p>Because I work across both design and development, the idea stays intact from the first sketch through launch.</p>
            <a className="text-link" href="#contact">Start a conversation <span>↗</span></a>
          </div>
          <div className="about-facts" data-reveal>
            <div><strong>4+</strong><span>Years building solutions</span></div>
            <div><strong>05</strong><span>Featured projects</span></div>
            <div><strong>02</strong><span>Disciplines, one process</span></div>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">(Selected work)</p>
          <h2>Built to be <em>used.</em><br />Designed to be remembered.</h2>
          <span>Five projects / 2024—26</span>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <article className={`project-card${project.featured ? " project-featured" : ""}`} key={project.title} data-reveal>
              <a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} project`}>
                <div className="project-image"><Image src={project.image} alt={project.alt} fill sizes={project.featured ? "(max-width: 820px) 92vw, 94vw" : "(max-width: 820px) 92vw, 46vw"} /></div>
                <span className="project-open">View project ↗</span>
              </a>
              <div className="project-meta">
                <span>{project.number}</span>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
                <time>{project.year}</time>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-heading" data-reveal>
          <div>
            <p className="eyebrow">(Capabilities)</p>
            <h2>One partner from<br /><em>concept to launch.</em></h2>
          </div>
          <p>Choose a capability to see what’s included. Each engagement is shaped around the outcome—not a fixed package.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => {
            const isOpen = activeService === index;
            return (
              <article className={`service-card${isOpen ? " is-open" : ""}`} data-reveal key={service.number}>
                <button type="button" onClick={() => setActiveService(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <b aria-hidden="true">+</b>
                </button>
                <p>{service.summary}</p>
                <div className="service-details" aria-hidden={!isOpen}>
                  <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-track" aria-hidden="true">
          <span className="manifesto-group">DESIGN WITH INTENT — BUILD WITH CARE —</span>
          <span className="manifesto-group">DESIGN WITH INTENT — BUILD WITH CARE —</span>
        </div>
        <div className="manifesto-note" data-reveal><span>Currently</span><p>Independent creative<br />Based in Tema, Ghana<br />Working worldwide</p></div>
      </section>

      <footer id="contact">
        <div className="footer-top"><p className="eyebrow">(Let’s make something good)</p><h2>Have a project in mind?<br /><em>Say hello.</em></h2></div>
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

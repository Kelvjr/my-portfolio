import Image from "next/image";
import { HeroMotion } from "./HeroMotion";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="ribbon-sr-only">
        Kelvin Kyere — Half Design, Half Development
      </h1>
      <div className="hero-fg-content">
        <div className="gradient-canvas"></div>

        <div className="hero-fg-header">
          <div className="hero-top-labels">
            <span>Frontend</span>
            <span>Designer</span>
          </div>
          <div className="hero-line-1">
            <span>Half</span>
            <span>Design</span>
            <span>Half</span>
          </div>
          <div className="hero-line-2">
            <span>Development</span>
          </div>
          <div className="hero-divider"></div>
          <div className="hero-bottom-info">
            <span>V2.0</span>
            <span>Scroll to explore</span>
            <span>Tema, Ghana</span>
          </div>
        </div>

        <div className="hero-fg-overlay-dark"></div>
        <div className="hero-fg-overlay"></div>
      </div>

      <div className="hero-bg-content">
        <div className="hero-bg-content-col">
          <div className="hero-bg-content-copy">
            <h3>Kelvin</h3>
            <p>
              CURIOUS ENOUGH TO START THINGS, <br />
              STUBBORN ENOUGH TO FINISH THEM, <br />
              DISTRACTED ENOUGH TO OPEN 14 TABS.
            </p>
          </div>
        </div>
        <div className="hero-bg-content-col">
          <div className="hero-bg-content-copy">
            <h3>Kyere</h3>
            <p>
              DESIGN, CODE, BRANDING, &amp; RANDOM IDEAS <br />
              MOST DAYS I’M JUST TRYING TO MAKE <br />
              THEM ALL GET ALONG.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-outro-content" id="about">
        <div className="hero-outro-img">
          <Image
            src="/media/images/me.jpg"
            alt="Kelvin Kyere"
            draggable="false"
            loading="eager"
            width={1242}
            height={2208}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
        </div>
        <div className="hero-outro-about">
          <h2 className="about-reveal">About Me</h2>
          <div className="about-copy-reveal">
            <p>
              My name is Kelvin Kyere, a frontend-focused developer based in
              Tema, Ghana, with a thing for clean interfaces, thoughtful
              details, and turning rough ideas into working digital experiences.
            </p>
            <p>
              I work across websites, web applications, WordPress, branding, and
              digital products, with a growing focus on building polished
              frontend experiences backed by solid development.
            </p>
            <p>Got something that might challenge me? I&apos;m listening.</p>
          </div>
          <div className="hero-outro-about-links about-reveal-links">
            <a href="mailto:kelvinkwasikyere5@gmail.com">
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Contact Me
            </a>
            <a href="/media/documents/cv.pdf" download>
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
      <HeroMotion></HeroMotion>
    </section>
  );
}

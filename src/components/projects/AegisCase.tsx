import Image from "next/image";
import {
  CaseCallouts,
  CaseEditorial,
  CaseMeta,
  CaseTags,
} from "./CaseSections";
import { content } from "@/data/aegis-case";
export function AegisCase() {
  return (
    <article className="aegis-case">
      <div className="aegis-intro">
        <div className="aegis-eyebrow">Selected work — 01 / 2026</div>
        <h2 id="aegis-case-title">AEGIS</h2>
        <div className="aegis-deck">
          <p id="aegis-case-description">
            Consumer safety.
            <br />A clearer place to start.
          </p>
          <div>
            <p>
              A web and mobile platform for discovering safety alerts, checking
              potential risks, and reporting concerns for review.
            </p>
            <a
              className="aegis-live"
              href="https://www.aegisalerts.online/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View live project <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <CaseMeta theme="aegis" items={content.meta1} />
      </div>
      <div className="aegis-hero-visual">
        <span className="aegis-visual-label">
          One system. Two everyday experiences.
        </span>
        <div className="aegis-browser">
          <div className="aegis-browser-bar">
            <i></i>
            <i></i>
            <i></i>
            <span>aegisalerts.online</span>
          </div>
          <Image
            src="/media/images/projects/aegis/web-verify.png"
            alt="AEGIS web verification interface with six categories and a search field"
            width={1265}
            height={712}
            loading="lazy"
            sizes="(max-width: 760px) 100vw, 80vw"
          />
        </div>
        <figure className="aegis-phone">
          <div>
            <Image
              src="/media/images/projects/aegis/mobile-verify.jpg"
              alt="Mobile verification"
              loading="lazy"
              width={211}
              height={424}
              sizes="(max-width: 760px) 100vw, 80vw"
            />
          </div>
          <figcaption>Mobile verification</figcaption>
        </figure>
        <span className="aegis-visual-foot">AEGIS / Consumer Alert System</span>
      </div>
      <CaseEditorial theme="aegis" section={content.editorial1}></CaseEditorial>
      <CaseCallouts theme="aegis" items={content.callouts1} />
      <figure className="aegis-web-showcase">
        <div className="aegis-browser">
          <div className="aegis-browser-bar">
            <i></i>
            <i></i>
            <i></i>
            <span>aegisalerts.online</span>
          </div>
          <Image
            src="/media/images/projects/aegis/web-home.png"
            alt="Live AEGIS homepage with search categories and official-source advisory cards"
            width={1265}
            height={712}
            loading="lazy"
            sizes="(max-width: 760px) 100vw, 80vw"
          />
        </div>
        <figcaption>01 — The public website / Check before you act</figcaption>
      </figure>
      <CaseEditorial theme="aegis" section={content.editorial2}>
        <CaseTags theme="aegis" items={content.tags1} />
      </CaseEditorial>
      <div className="aegis-solution">
        <CaseEditorial
          theme="aegis"
          section={content.editorial3}
        ></CaseEditorial>
        <div className="aegis-feature-grid">
          <div>
            <span>Verification</span>
            <p>
              Choose a product, phone number, business, organization, website or
              app before starting a check.
            </p>
          </div>
          <div>
            <span>Source-led alerts</span>
            <p>
              Browse advisories with source attribution and visible status
              information.
            </p>
          </div>
          <div>
            <span>Consumer reporting</span>
            <p>
              Provide the category, incident details and supporting evidence
              through a focused reporting flow.
            </p>
          </div>
          <div>
            <span>Review before publication</span>
            <p>
              Reports go through moderation before they can inform public-facing
              information.
            </p>
          </div>
        </div>
        <div className="aegis-browser">
          <div className="aegis-browser-bar">
            <i></i>
            <i></i>
            <i></i>
            <span>aegisalerts.online</span>
          </div>
          <Image
            src="/media/images/projects/aegis/web-report.png"
            alt="AEGIS reporting page with anonymous tip and signed-in report options"
            width={1265}
            height={712}
            loading="lazy"
            sizes="(max-width: 760px) 100vw, 80vw"
          />
        </div>
      </div>
      <div className="aegis-mobile-story">
        <CaseEditorial
          theme="aegis"
          section={content.editorial4}
        ></CaseEditorial>
        <div className="aegis-phone-grid">
          <figure className="aegis-phone">
            <div>
              <Image
                src="/media/images/projects/aegis/mobile-verify.jpg"
                alt="01 / Run a safety check"
                loading="lazy"
                width={211}
                height={424}
                sizes="(max-width: 760px) 100vw, 80vw"
              />
            </div>
            <figcaption>01 / Run a safety check</figcaption>
          </figure>
          <figure className="aegis-phone">
            <div>
              <Image
                src="/media/images/projects/aegis/mobile-categories.jpg"
                alt="02 / Choose a category"
                loading="lazy"
                width={186}
                height={371}
                sizes="(max-width: 760px) 100vw, 80vw"
              />
            </div>
            <figcaption>02 / Choose a category</figcaption>
          </figure>
          <figure className="aegis-phone">
            <div>
              <Image
                src="/media/images/projects/aegis/mobile-details.jpg"
                alt="03 / Describe the incident"
                loading="lazy"
                width={188}
                height={376}
                sizes="(max-width: 760px) 100vw, 80vw"
              />
            </div>
            <figcaption>03 / Describe the incident</figcaption>
          </figure>
          <figure className="aegis-phone">
            <div>
              <Image
                src="/media/images/projects/aegis/mobile-evidence.jpg"
                alt="04 / Attach evidence"
                loading="lazy"
                width={186}
                height={371}
                sizes="(max-width: 760px) 100vw, 80vw"
              />
            </div>
            <figcaption>04 / Attach evidence</figcaption>
          </figure>
        </div>
      </div>
      <CaseEditorial theme="aegis" section={content.editorial5}></CaseEditorial>
      <div className="aegis-design-grid">
        <div className="aegis-type-card">
          <span className="aegis-eyebrow">Hierarchy / Interface study</span>
          <strong>Aa</strong>
          <h4>Check first.</h4>
          <p>
            Clear headings.
            <br />
            Quiet supporting details.
            <br />A visible next step.
          </p>
        </div>
        <div className="aegis-colors">
          <div style={{ background: "#194f50", color: "#fff" }}>
            <span>Deep teal</span>
            <span>#194F50</span>
          </div>
          <div style={{ background: "#e9f3f1" }}>
            <span>Soft mint</span>
            <span>#E9F3F1</span>
          </div>
          <div style={{ background: "#f7f9f8" }}>
            <span>Off-white</span>
            <span>#F7F9F8</span>
          </div>
          <small>
            Presentation palette drawn from the supplied app screens.
          </small>
        </div>
      </div>
      <CaseEditorial theme="aegis" section={content.editorial6}>
        <dl className="aegis-stack">
          <div>
            <dt>Web</dt>
            <dd>Next.js</dd>
          </div>
          <div>
            <dt>Backend</dt>
            <dd>Node.js</dd>
          </div>
          <div>
            <dt>Database</dt>
            <dd>PostgreSQL</dd>
          </div>
          <div>
            <dt>Mobile</dt>
            <dd>Flutter</dd>
          </div>
        </dl>
      </CaseEditorial>
      <div className="aegis-outcome">
        <span className="aegis-eyebrow">07 / Outcome &amp; reflection</span>
        <h3>
          A complete project.
          <br />A broader perspective.
        </h3>
        <p>
          AEGIS became one of my most comprehensive university projects,
          bringing together frontend, backend, database and mobile work. It
          reinforced how much thoughtful interface design matters when people
          need to understand information quickly.
        </p>
        <div className="aegis-lessons">
          <p>
            <span>01</span>Design the system before the screens.
          </p>
          <p>
            <span>02</span>Let the data structure inform the interface.
          </p>
          <p>
            <span>03</span>Learn from the product beyond the mockup.
          </p>
        </div>
        <a
          className="aegis-live"
          href="https://www.aegisalerts.online/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View live project <span aria-hidden="true">↗</span>
        </a>
        <div className="aegis-endnote">
          AEGIS — Consumer Alert System / 2026
        </div>
      </div>
    </article>
  );
}

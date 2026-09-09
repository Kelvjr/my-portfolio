import Image from "next/image";
import {
  CaseCallouts,
  CaseEditorial,
  CaseMeta,
  CaseTags,
} from "./CaseSections";
import { content } from "@/data/kasvin-case";
export function KasvinCase() {
  return (
    <article className="kasvin-case">
      <div className="kasvin-intro">
        <div className="kasvin-eyebrow">Selected work — 02 / 2026</div>
        <h2 id="kasvin-case-title">
          KASVIN
          <br />
          HOMES
        </h2>
        <div className="kasvin-deck">
          <p id="kasvin-case-description">
            Brand Identity for a<br />
            Modern Hospitality Brand
          </p>
          <div>
            <p>
              A refined identity for a short-stay apartment brand designed
              around comfort, simplicity and a sense of home away from home.
            </p>
          </div>
        </div>
        <CaseMeta theme="kasvin" items={content.meta1} />
      </div>

      <div className="kasvin-hero-visual">
        <span className="kasvin-visual-label">
          Brand identity / Visual system
        </span>
        <Image
          className="kasvin-hero-img"
          src="/media/images/kasvin/logo-dark.png"
          alt="Kasvin Homes brand mark on dark green background"
          loading="lazy"
          width={9084}
          height={4500}
          sizes="(max-width: 760px) 100vw, 80vw"
        />
        <span className="kasvin-visual-foot">
          KASVIN HOMES — Brand Identity
        </span>
      </div>

      <CaseEditorial
        theme="kasvin"
        section={content.editorial1}
      ></CaseEditorial>

      <CaseCallouts theme="kasvin" items={content.callouts1} />

      <CaseEditorial theme="kasvin" section={content.editorial2}>
        <CaseTags theme="kasvin" items={content.tags1} />
      </CaseEditorial>

      <div className="kasvin-logo-showcase">
        <div className="kasvin-logo-grid">
          <Image
            src="/media/images/kasvin/branding.png"
            alt="Kasvin Homes brand guidelines"
            loading="lazy"
            width={8000}
            height={4500}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
        </div>
      </div>

      <CaseEditorial
        theme="kasvin"
        section={content.editorial3}
      ></CaseEditorial>

      <div className="kasvin-design-grid">
        <div className="kasvin-type-card">
          <span className="kasvin-eyebrow">Typography / Primary typeface</span>
          <strong>Aa</strong>
          <h4>Satoshi</h4>
          <p>
            A Swiss-style modernist sans-serif.
            <br />
            Geometric / Modern / Clean / Confident.
          </p>
        </div>
        <div className="kasvin-colors">
          <div style={{ background: "#1E3B34", color: "#FAE3AF" }}>
            <span>Pine Green</span>
            <span>#1E3B34</span>
          </div>
          <div style={{ background: "#FAE3AF", color: "#1E3B34" }}>
            <span>Sand</span>
            <span>#FAE3AF</span>
          </div>
          <div style={{ background: "#F2F1EB", color: "#1E3B34" }}>
            <span>Off-White</span>
            <span>#F2F1EB</span>
          </div>
          <small>Primary palette from brand exploration.</small>
        </div>
      </div>

      <CaseEditorial
        theme="kasvin"
        section={content.editorial4}
      ></CaseEditorial>

      <div className="kasvin-showcase-duo">
        <div className="kasvin-showcase-item">
          <Image
            src="/media/images/kasvin/grid.png"
            alt="Kasvin Homes K mark grid construction"
            loading="lazy"
            width={4500}
            height={4500}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
          <span>Grid construction</span>
        </div>
        <div className="kasvin-showcase-item">
          <Image
            src="/media/images/kasvin/icon.png"
            alt="Kasvin Homes K mark icon"
            loading="lazy"
            width={4500}
            height={4500}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
          <span>Icon only</span>
        </div>
      </div>

      <CaseEditorial
        theme="kasvin"
        section={content.editorial5}
      ></CaseEditorial>

      <div className="kasvin-experience-grid">
        <div className="kasvin-experience-card">
          <span className="kasvin-eyebrow">Arrival</span>
          <h4>Signage / Welcome</h4>
          <p>
            The first impression. Illuminated exterior signage sets the tone
            before guests even step inside.
          </p>
        </div>
        <div className="kasvin-experience-card">
          <span className="kasvin-eyebrow">Stay</span>
          <h4>Room collateral / Guest materials</h4>
          <p>
            Everything a guest needs — welcome cards, door hangers, key cards,
            coasters, and scented candles.
          </p>
        </div>
        <div className="kasvin-experience-card">
          <span className="kasvin-eyebrow">Booking</span>
          <h4>Website / Airbnb / Social</h4>
          <p>
            Digital presence that converts. From listing cover to Instagram, the
            brand stays consistent.
          </p>
        </div>
      </div>

      <div className="kasvin-showcase-full">
        <Image
          src="/media/images/kasvin/signage.png"
          alt="Kasvin Homes exterior signage mockup"
          loading="lazy"
          width={1122}
          height={1402}
          sizes="(max-width: 760px) 100vw, 80vw"
        />
        <span>Exterior signage — first impression</span>
      </div>

      <div className="kasvin-showcase-duo">
        <div className="kasvin-showcase-item">
          <Image
            src="/media/images/kasvin/room.png"
            alt="Kasvin Homes room collateral mockup"
            loading="lazy"
            width={1122}
            height={1402}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
          <span>Room collateral / Guest materials</span>
        </div>
        <div className="kasvin-showcase-item">
          <Image
            src="/media/images/kasvin/welcome.png"
            alt="Kasvin Homes welcome experience mockup"
            loading="lazy"
            width={1122}
            height={1402}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
          <span>Welcome experience / Digital display</span>
        </div>
      </div>

      <div className="kasvin-showcase-full">
        <Image
          src="/media/images/kasvin/social.png"
          alt="Kasvin Homes social media template"
          loading="lazy"
          width={4500}
          height={5625}
          sizes="(max-width: 760px) 100vw, 80vw"
        />
        <span>Social presence — Instagram / Airbnb</span>
      </div>

      <div className="kasvin-outcome">
        <span className="kasvin-eyebrow">06 / Closing</span>
        <h3>
          A brand designed to feel
          <br />
          like home before you
          <br />
          even arrive.
        </h3>
        <p>
          Kasvin Homes gave the company a visual language that matches their
          approach — personal, considered, and built to last. The geometric mark
          provides a flexible foundation that works across every context, from
          favicon to facade.
        </p>
        <div className="kasvin-lessons">
          <p>
            <span>01</span>Great brands start with understanding the people
            behind them.
          </p>
          <p>
            <span>02</span>Restraint is a design decision — what you leave out
            matters.
          </p>
          <p>
            <span>03</span>A good mark works at every scale, from favicon to
            facade.
          </p>
        </div>
        <div className="kasvin-endnote">
          KASVIN HOMES — Brand Identity / 2026
        </div>
      </div>
    </article>
  );
}

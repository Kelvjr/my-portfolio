import Image from "next/image";
import {
  CaseCallouts,
  CaseEditorial,
  CaseMeta,
  CaseTags,
} from "./CaseSections";
import { content } from "@/data/grains-case";
export function GrainsCase() {
  return (
    <article className="grains-case">
      <div className="grains-intro">
        <div className="grains-eyebrow">Selected work — 03 / 2026</div>
        <h2 id="grains-case-title">
          GRAINS
          <br />
          DEPOT
        </h2>
        <div className="grains-deck">
          <p id="grains-case-description">
            Brand Identity /<br />
            Retail &amp; Wholesale
          </p>
          <div>
            <p>
              A visual identity created for a provisions business offering
              everyday food and household essentials, from rice and cooking oil
              to sugar and other staple goods.
            </p>
          </div>
        </div>
        <CaseMeta theme="grains" items={content.meta1} />
      </div>

      <div className="grains-hero-visual">
        <span className="grains-visual-label">
          Brand identity / Visual system
        </span>
        <Image
          className="grains-hero-img"
          src="/media/images/grains/logo-dark.png"
          alt="Grains Depot brand mark on dark background"
          loading="lazy"
          width={3669}
          height={3372}
          sizes="(max-width: 760px) 100vw, 80vw"
        />
        <span className="grains-visual-foot">
          GRAINS DEPOT — Brand Identity
        </span>
      </div>

      <CaseEditorial
        theme="grains"
        section={content.editorial1}
      ></CaseEditorial>

      <CaseCallouts theme="grains" items={content.callouts1} />

      <CaseEditorial theme="grains" section={content.editorial2}>
        <CaseTags theme="grains" items={content.tags1} />
      </CaseEditorial>

      <div className="grains-logo-showcase">
        <div className="grains-logo-grid">
          <Image
            src="/media/images/grains/logo-light.png"
            alt="Grains Depot brand guidelines"
            loading="lazy"
            width={4321}
            height={4321}
            sizes="(max-width: 760px) 100vw, 80vw"
          />
        </div>
      </div>

      <CaseEditorial
        theme="grains"
        section={content.editorial3}
      ></CaseEditorial>

      <div className="grains-design-grid">
        <div className="grains-type-card">
          <span className="grains-eyebrow">Typography / Wordmark</span>
          <strong>GD</strong>
          <h4>Grains Depot</h4>
          <p>
            Bold, clean, and unmistakable.
            <br />
            Designed for shelf and storefront.
          </p>
        </div>
        <div className="grains-colors">
          <div style={{ background: "#4CAF50", color: "#fff" }}>
            <span>Vibrant Green</span>
            <span>#4CAF50</span>
          </div>
          <div style={{ background: "#1a1a1a", color: "#fff" }}>
            <span>Deep Black</span>
            <span>#1A1A1A</span>
          </div>
          <div style={{ background: "#f5f5f5", color: "#1a1a1a" }}>
            <span>Off-White</span>
            <span>#F5F5F5</span>
          </div>
          <small>Primary palette for retail and wholesale applications.</small>
        </div>
      </div>

      <CaseEditorial
        theme="grains"
        section={content.editorial4}
      ></CaseEditorial>

      <div className="grains-showcase-full">
        <Image
          src="/media/images/grains/branding.webp"
          alt="Grains Depot brand collateral mockup"
          loading="lazy"
          width={1080}
          height={676}
          sizes="(max-width: 760px) 100vw, 80vw"
        />
        <span>Brand collateral — tote, tee, business cards</span>
      </div>

      <div className="grains-experience-grid">
        <div className="grains-experience-card">
          <span className="grains-eyebrow">Retail</span>
          <h4>Storefront / Packaging</h4>
          <p>
            Signage, branded bags, rice sacks, cooking oil labels, and cartons
            that stand out on the shelf.
          </p>
        </div>
        <div className="grains-experience-card">
          <span className="grains-eyebrow">Wholesale</span>
          <h4>Delivery / Invoices</h4>
          <p>
            Delivery vans, aprons, receipts, and price lists that keep the brand
            consistent at scale.
          </p>
        </div>
        <div className="grains-experience-card">
          <span className="grains-eyebrow">Digital</span>
          <h4>Social / WhatsApp</h4>
          <p>
            Catalogue posts, social media templates, and digital presence that
            converts.
          </p>
        </div>
      </div>

      <div className="grains-outcome">
        <span className="grains-eyebrow">05 / Closing</span>
        <h3>
          Built for the shelf,
          <br />
          the store and everything
          <br />
          in between.
        </h3>
        <p>
          Grains Depot now has a visual language that matches their approach —
          dependable, accessible, and built to work across every context from
          storefront signage to the bag a customer carries home.
        </p>
        <div className="grains-lessons">
          <p>
            <span>01</span>Retail brands need to work hardest at every scale.
          </p>
          <p>
            <span>02</span>Familiar doesn&apos;t mean forgettable — it means
            trusted.
          </p>
          <p>
            <span>03</span>A good identity works on a sack of rice as well as a
            business card.
          </p>
        </div>
        <div className="grains-endnote">
          GRAINS DEPOT — Brand Identity / 2026
        </div>
      </div>
    </article>
  );
}

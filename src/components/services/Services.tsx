import Image from "next/image";
import { services } from "@/data/services";
import { ServicesMotion } from "./ServicesMotion";

export function Services() {
  return (
    <section
      className="expertise"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="expertise-edge expertise-edge-left" aria-hidden="true" />
      <div className="expertise-paper" aria-hidden="true" />
      <div className="expertise-edge expertise-edge-right" aria-hidden="true" />
      <h2 id="expertise-title">What I Do</h2>
      <div className="expertise-stage">
        {services.map((service, index) => (
          <article
            key={service.title}
            className={`expertise-service expertise-service-${index}`}
            id={`service-${index}`}
            style={{ backgroundColor: service.color }}
          >
            <div className="expertise-copy">
              <span className="expertise-number">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(services.length).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <ul>
                {service.capabilities.map((text) => (
                  <li key={text}>/ {text}</li>
                ))}
              </ul>
            </div>
            <div className="expertise-art" aria-hidden="true">
              {service.images.map((src, i) => (
                <Image
                  key={src}
                  className={`expertise-image expertise-image-${i}`}
                  src={src}
                  alt=""
                  width={1600}
                  height={1000}
                  sizes="(max-width: 760px) 88vw, 50vw"
                />
              ))}
            </div>
          </article>
        ))}
      </div>
      <nav className="expertise-nav" aria-label="Explore services">
        {services.map((service, i) => (
          <button
            key={service.title}
            type="button"
            aria-controls={`service-${i}`}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>{" "}
            <span className="expertise-nav-label">{service.short}</span>
          </button>
        ))}
      </nav>
      <div className="expertise-track" aria-hidden="true">
        <div />
      </div>
      <ServicesMotion />
    </section>
  );
}

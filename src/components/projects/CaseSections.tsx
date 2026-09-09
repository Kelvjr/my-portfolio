import { Fragment, type ReactNode } from "react";

type Theme = "aegis" | "kasvin" | "grains";

export function CaseEditorial({
  theme,
  section,
  children,
}: {
  theme: Theme;
  section: { label: string; title: string; paragraphs: string[] };
  children?: ReactNode;
}) {
  return (
    <div className={`${theme}-editorial`}>
      <span className={`${theme}-eyebrow`}>{section.label}</span>
      <div>
        <h3>
          {section.title.split("\n").map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h3>
        {section.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {children}
      </div>
    </div>
  );
}

export function CaseMeta({
  theme,
  items,
}: {
  theme: Theme;
  items: { label: string; value: string }[];
}) {
  return (
    <dl className={`${theme}-meta`}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseCallouts({
  theme,
  items,
}: {
  theme: Theme;
  items: { number: string; title: string; body: string }[];
}) {
  return (
    <div className={`${theme}-callouts`}>
      {items.map((item) => (
        <div key={item.number}>
          <span>{item.number}</span>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseTags({ theme, items }: { theme: Theme; items: string[] }) {
  return (
    <div className={`${theme}-tags`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

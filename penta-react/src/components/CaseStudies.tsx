import Reveal from "./Reveal";

const CASES = [
  {
    tag: "Logistics SaaS",
    name: "AirDrive",
    metric: "41%",
    metricLabel: "lower cloud spend",
    text: "Re-architected a struggling MVP into a multi-tenant platform, cutting infrastructure cost while tripling release frequency.",
  },
  {
    tag: "Fintech",
    name: "Meridian",
    metric: "SOC 2",
    metricLabel: "audit-ready in one quarter",
    text: "Hardened security controls, access management, and evidence collection so the team could pass enterprise procurement.",
  },
  {
    tag: "HR Tech",
    name: "Narrato",
    metric: "34%",
    metricLabel: "faster onboarding",
    text: "Rebuilt the core onboarding flow and data model, turning a demo-grade prototype into a product customers could rely on.",
  },
];

export default function CaseStudies() {
  return (
    <section className="section section--navy" id="proof">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">Selected work</span>
            <h2 className="h-section">
              Outcomes that <span className="accent">compound</span>
            </h2>
            <p className="lede">
              A few representative engagements. Every result depends on scope,
              team, and starting point, and we'll tell you honestly what's realistic
              for yours.
            </p>
          </div>
        </Reveal>

        <div className="cases">
          {CASES.map((c, i) => (
            <Reveal key={c.name} delay={(i + 1) as 1 | 2 | 3}>
              <article className="case">
                <span className="case__tag">{c.tag}</span>
                <h3 className="case__name">{c.name}</h3>
                <p className="case__metric">{c.metric}</p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 14,
                  }}
                >
                  {c.metricLabel}
                </p>
                <p className="case__text">{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <p className="cases__note">
            Representative engagements. Details available under NDA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

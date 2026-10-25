import Reveal from "./Reveal";
import { ArrowRight, Rocket, Server, Shield } from "./Icons";

const SERVICES = [
  {
    icon: Rocket,
    tag: "MVP Build",
    title: "Ship the core product",
    text: "A production-grade B2B SaaS application: authentication, billing, dashboards, integrations, and CI/CD, built to survive real users.",
    points: ["12-week fixed scope", "Weekly demos", "Full code ownership"],
  },
  {
    icon: Shield,
    tag: "Security & Compliance",
    title: "Pass the review, win the deal",
    text: "Security architecture, access controls, encryption, and SOC 2 readiness so enterprise buyers and investors can say yes.",
    points: ["SOC 2 readiness", "Secure SDLC", "Audit support"],
  },
  {
    icon: Server,
    tag: "Scale & DevOps",
    title: "Grow without breaking",
    text: "Cloud architecture, observability, and cost control that keep the product fast and reliable as usage climbs.",
    points: ["Zero-downtime deploys", "Monitoring & alerts", "Cloud cost reduction"],
  },
];

export default function Solutions() {
  return (
    <section className="section section--white" id="solutions">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">What we build</span>
            <h2 className="h-section">
              Engineering that <span className="accent">holds up</span>
            </h2>
            <p className="lede">
              Three focused engagements for funded B2B SaaS teams. Each one is
              scoped, priced, and delivered by senior engineers.
            </p>
          </div>
        </Reveal>

        <div className="grid-3">
          {SERVICES.map(({ icon: Icon, tag, title, text, points }, i) => (
            <Reveal key={tag} delay={(i + 1) as 1 | 2 | 3}>
              <article className="card" style={{ height: "100%" }}>
                <span className="card__icon">
                  <Icon size={22} />
                </span>
                <span
                  className="eyebrow eyebrow--plain"
                  style={{ marginBottom: 10 }}
                >
                  {tag}
                </span>
                <h3 className="card__title">{title}</h3>
                <p className="card__text" style={{ marginBottom: 18 }}>
                  {text}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: 8,
                  }}
                >
                  {points.map((p) => (
                    <li
                      key={p}
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        fontSize: 13.5,
                        color: "var(--ink-soft)",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "var(--teal)",
                          flex: "none",
                        }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#contact" className="btn btn--ghost-dark">
              Discuss Your Build
              <ArrowRight size={15} className="btn__arrow" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

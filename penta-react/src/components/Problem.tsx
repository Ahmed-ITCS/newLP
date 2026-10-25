import Reveal from "./Reveal";
import { AlertTriangle, Clock, Users } from "./Icons";

const CARDS = [
  {
    icon: AlertTriangle,
    title: "Investor-ready, not demo-ready",
    text: "Your prototype proves the idea but can't survive real users, real load, or a security review. The next conversation is a rewrite.",
  },
  {
    icon: Clock,
    title: "Hiring a team takes months",
    text: "You need senior engineers now, not after three months of recruiting, offers, and onboarding. Your deadline won't wait.",
  },
  {
    icon: Users,
    title: "Contractors left a fragile build",
    text: "Cheap builds become expensive technical debt right when growth matters most, and nobody is left to maintain them.",
  },
];

export default function Problem() {
  return (
    <section className="section section--white" id="problem">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">The gap</span>
            <h2 className="h-section">
              A demo is not a <span className="accent">product</span>
            </h2>
            <p className="lede">
              Most funded founders get stuck between a working prototype and a
              launchable product. The gap is engineering depth, security, and
              delivery discipline, exactly what we bring.
            </p>
          </div>
        </Reveal>

        <div className="grid-3">
          {CARDS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i + 1) as 1 | 2 | 3}>
              <article className="card">
                <span className="card__icon">
                  <Icon size={22} />
                </span>
                <h3 className="card__title">{title}</h3>
                <p className="card__text">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <div
            className="grid-2"
            style={{ marginTop: "clamp(36px, 5vw, 64px)" }}
          >
            <div>
              <h3
                className="h-section"
                style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
              >
                Ship the version that <span className="accent">earns trust</span>
              </h3>
            </div>
            <p className="lede" style={{ marginLeft: "auto" }}>
              We are a senior product engineering team for B2B SaaS. You get
              architecture, delivery, and security from people who have launched
              products before, not a rotating cast of juniors.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

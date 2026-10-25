import Reveal from "./Reveal";
import { ArrowRight, Check } from "./Icons";

const PLANS = [
  {
    name: "MVP Sprint",
    price: "From $15k",
    meta: "6–8 weeks · one core workflow",
    featured: false,
    list: [
      "Focused build around your riskiest workflow",
      "Production-ready codebase",
      "Auth, data model, and CI/CD",
      "Handover with documentation",
    ],
  },
  {
    name: "Full MVP Build",
    price: "From $35k",
    meta: "12 weeks · end-to-end product",
    featured: true,
    list: [
      "Complete B2B SaaS product build",
      "Billing, dashboards, and integrations",
      "Security and SOC 2-ready foundations",
      "Launch support and team handover",
    ],
  },
  {
    name: "Embedded Pod",
    price: "From $12k/mo",
    meta: "Ongoing · dedicated senior squad",
    featured: false,
    list: [
      "Dedicated engineers inside your team",
      "Continuous delivery and iteration",
      "Scaling, DevOps, and reliability",
      "Flexible month-to-month capacity",
    ],
  },
];

export default function Engagements() {
  return (
    <section className="section section--mint" id="engagements">
      <div className="wrap">
        <Reveal>
          <div className="sec-head sec-head--center">
            <span className="eyebrow">Engagements</span>
            <h2 className="h-section">
              Flexible scope, <span className="accent">fixed</span> pricing
            </h2>
            <p className="lede">
              Pick the shape that matches where you are. Every engagement is scoped
              after your free review, so you know the price before you commit.
            </p>
          </div>
        </Reveal>

        <div className="plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={(i + 1) as 1 | 2 | 3}>
              <article
                className={`plan ${p.featured ? "plan--featured" : ""}`}
              >
                <p className="plan__name">{p.name}</p>
                <p className="plan__price">
                  {p.price} <small>fixed scope</small>
                </p>
                <p className="plan__meta">{p.meta}</p>
                <ul className="plan__list">
                  {p.list.map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn ${
                    p.featured ? "btn--primary" : "btn--ghost-dark"
                  }`}
                  style={{ width: "100%" }}
                >
                  Start Here
                  <ArrowRight size={14} className="btn__arrow" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <p className="plans__note">
            Not sure which fits? The free review will tell you, including if the
            answer is "none of these yet."
          </p>
        </Reveal>
      </div>
    </section>
  );
}

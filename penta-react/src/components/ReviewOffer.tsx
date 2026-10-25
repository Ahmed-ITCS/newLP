import Reveal from "./Reveal";
import { ArrowRight, Check, Compass, FileText, Gauge, Target } from "./Icons";

const DELIVERABLES = [
  {
    icon: Compass,
    title: "Architecture & risk review",
    text: "A senior engineer maps your product, stack, and the risks that could derail launch.",
  },
  {
    icon: FileText,
    title: "Realistic 12-week plan",
    text: "Scope, milestones, and what can realistically ship, with no fantasy timelines.",
  },
  {
    icon: Gauge,
    title: "Scope & cost estimate",
    text: "A fixed-scope proposal with pricing, so you can decide with numbers.",
  },
  {
    icon: Target,
    title: "Honest go / no-go call",
    text: "If we're not the right fit, we'll say so and point you in a better direction.",
  },
];

const FIT = [
  "You have a validated concept or an incomplete MVP.",
  "You're funded or financially ready to invest $10k+.",
  "You need to launch within the next 3–6 months.",
  "You want production quality, not another throwaway demo.",
];

export default function ReviewOffer() {
  return (
    <section className="section section--soft" id="review">
      <div className="wrap offer">
        <div>
          <Reveal>
            <span className="eyebrow">Start here</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Free 30-minute
              <br />
              <span className="accent">Product Architecture</span>
              <br />
              &amp; Delivery Review
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede" style={{ marginTop: 18 }}>
              No pitch deck, no pressure. A working session with a senior engineer
              to pressure-test your plan and tell you exactly what it takes to
              launch.
            </p>
          </Reveal>

          <div className="offer__list">
            {DELIVERABLES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i + 1) as 1 | 2 | 3 | 4}>
                <div className="offer__item">
                  <Icon size={20} />
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={1}>
            <div style={{ marginTop: 30 }}>
              <a href="#contact" className="btn btn--ghost-dark">
                Claim Your Free Review
                <ArrowRight size={15} className="btn__arrow" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <aside className="qualify">
            <p className="qualify__title">This is a fit if…</p>
            <ul className="qualify__list">
              {FIT.map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="qualify__foot">
              Prefer email? Write to{" "}
              <a
                href="mailto:hello@pentacipher.com"
                style={{ color: "var(--teal)", fontWeight: 600 }}
              >
                hello@pentacipher.com
              </a>
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

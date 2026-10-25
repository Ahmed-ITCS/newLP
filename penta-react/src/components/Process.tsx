import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

const STEPS = [
  {
    num: "01",
    title: "Diagnose",
    text: "A free architecture review. We map goals, constraints, and the fastest credible path to launch.",
  },
  {
    num: "02",
    title: "Architect",
    text: "You get a fixed-scope plan: system design, milestones, risks, and a delivery date you can hold us to.",
  },
  {
    num: "03",
    title: "Build",
    text: "Weekly shipping in a dedicated squad. You see working software every week, with no black-box development.",
  },
  {
    num: "04",
    title: "Harden & launch",
    text: "Security, testing, monitoring, and documentation. We hand over a product your team can own.",
  },
];

export default function Process() {
  return (
    <section className="section section--mint" id="process">
      <div className="wrap">
        <Reveal>
          <div className="sec-head sec-head--center">
            <span className="eyebrow">How it works</span>
            <h2 className="h-section">
              From idea to <span className="accent">launch</span> in 12 weeks
            </h2>
            <p className="lede">
              A predictable delivery process built for founders who need certainty,
              not another open-ended agency retainer.
            </p>
          </div>
        </Reveal>

        <div className="process">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <article className="step">
                <div className="step__num">{s.num}</div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#contact" className="btn btn--primary">
              Start With the Free Review
              <ArrowRight size={15} className="btn__arrow" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

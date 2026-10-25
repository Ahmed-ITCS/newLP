import { useState } from "react";
import Reveal from "./Reveal";
import { ChevronDown } from "./Icons";

const FAQS = [
  {
    q: "Do you work with non-technical founders?",
    a: "Yes. Most of our clients are founders without an in-house engineering team. We handle architecture, delivery, and technical decisions, and explain trade-offs in plain language so you can lead the product.",
  },
  {
    q: "What if I already have a prototype or codebase?",
    a: "That's common. We start with a technical audit, keep what's solid, and rebuild only what's holding you back. You won't pay to rewrite things that already work.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do. You get full ownership of the source code and intellectual property, with a clean handover: repositories, documentation, infrastructure access, and a walkthrough with your team.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "Security is built in from week one: least-privilege access, encryption, secure SDLC, dependency scanning, and audit logging. For teams selling to enterprises, we prepare SOC 2 readiness and support the audit process.",
  },
  {
    q: "What happens after launch?",
    a: "You can take the product in-house with full documentation, or keep us on an Embedded Pod for ongoing iteration, scaling, and support. There's no lock-in either way.",
  },
  {
    q: "How much does an MVP cost?",
    a: "Focused MVP sprints start around $15k; full 12-week builds typically start at $35k. The free architecture review ends with a fixed-scope quote, so you're never guessing.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section section--white" id="faq">
      <div className="wrap">
        <Reveal>
          <div className="sec-head sec-head--center">
            <span className="eyebrow">FAQ</span>
            <h2 className="h-section">
              Questions, <span className="accent">answered</span>
            </h2>
          </div>
        </Reveal>

        <div className="faq">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={(Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5)}>
                <div className={`faq__item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <span className="faq__icon">
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  <div
                    className="faq__a"
                    style={{ maxHeight: isOpen ? 320 : 0 }}
                  >
                    <div className="faq__a-inner">{f.a}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

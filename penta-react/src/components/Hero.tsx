import Reveal from "./Reveal";
import Logo from "./Logo";
import { ArrowRight, Check, Clock, Server, Shield } from "./Icons";

const CHIPS = [
  { icon: Clock, label: "12-week delivery" },
  { icon: Server, label: "Production-ready code" },
  { icon: Shield, label: "SOC 2-ready foundations" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__content">
          <Reveal>
            <span className="hero__pill">
              <span className="bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </span>
              <span>Built for funded B2B SaaS founders</span>
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="h-hero hero__title">
              Launch a production-ready MVP in <em>12 weeks</em> without hiring an engineering team.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="hero__sub">
              Penta Cipher turns validated ideas into secure, scalable products your
              investors, first customers, and security reviews can all take seriously.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="hero__ctas">
              <a href="#contact" className="btn btn--primary">
                Book Free Architecture Review
                <ArrowRight size={15} className="btn__arrow" />
              </a>
              <a href="#process" className="btn btn--ghost-light">
                See How It Works
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="hero__chips">
              {CHIPS.map(({ icon: Icon, label }) => (
                <span className="chip" key={label}>
                  <Icon size={14} />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__ring" />
          <div className="hero__ring hero__ring--inner" />
          <div className="hero__emblem">
            <svg
              className="hero__emblem-frame"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="emblemFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(16,209,210,0.20)" />
                  <stop offset="100%" stopColor="rgba(7,31,41,0.78)" />
                </linearGradient>
              </defs>
              <polygon
                points="51,3 97,41 88,72 21,96 3,41"
                fill="url(#emblemFill)"
                stroke="#10d1d2"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <Logo size={150} variant="light" />
          </div>
          <span className="hero__node hero__node--1">
            <Shield size={20} />
          </span>
          <span className="hero__node hero__node--2">
            <Server size={20} />
          </span>
          <span className="hero__node hero__node--3">
            <Check size={20} />
          </span>
        </div>
      </div>
    </section>
  );
}

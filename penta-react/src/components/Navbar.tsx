import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowRight, Close, Menu } from "./Icons";

const LINKS = [
  { href: "#problem", label: "The Gap" },
  { href: "#review", label: "Free Review" },
  { href: "#process", label: "Process" },
  { href: "#solutions", label: "What We Build" },
  { href: "#engagements", label: "Engagements" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="brand" aria-label="Penta Cipher home">
          <Logo className="brand__mark" size={38} />
          <span>
            <span className="brand__name">
              Penta<span className="brand__cipher">Cipher</span>
            </span>
            <span className="brand__sub">Technologies</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a href="#contact" className="btn btn--primary btn--sm">
            Book Free Review <ArrowRight size={14} className="btn__arrow" />
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          style={{ color: "var(--teal)" }}
        >
          Book Free Review →
        </a>
      </div>
    </header>
  );
}

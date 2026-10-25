import Logo from "./Logo";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "./Icons";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pentaciphertechnologies/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/penta-cipher",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/PentaCipherTechnologies",
    icon: Facebook,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <a href="#top" className="brand" aria-label="Penta Cipher home">
              <Logo className="brand__mark" size={36} />
              <span>
                <span className="brand__name">
                  Penta<span className="brand__cipher">Cipher</span>
                </span>
                <span className="brand__sub">Technologies</span>
              </span>
            </a>
            <p className="footer__desc">
              Senior product engineering for funded B2B SaaS founders. We turn
              validated ideas into secure, scalable products in 12 weeks.
            </p>

            <div className="footer__social">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer__title">Explore</p>
            <nav className="footer__links" aria-label="Footer">
              <a href="#problem">The Gap</a>
              <a href="#review">Free Review</a>
              <a href="#process">Process</a>
              <a href="#solutions">What We Build</a>
              <a href="#engagements">Engagements</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>

          <div>
            <p className="footer__title">Contact</p>
            <div className="footer__links">
              <a href="mailto:hello@pentacipher.com">
                <Mail size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                hello@pentacipher.com
              </a>
              <a href="tel:+923106423029">
                <Phone size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                +923106423029
              </a>
              <span style={{ fontSize: 13.5 }}>
                <MapPin size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                Remote-first · Global delivery
              </span>
              <a href="#contact" style={{ color: "var(--teal)" }}>
                Book a free review →
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} Penta Cipher Technologies. All rights
            reserved.
          </span>
          <span>
            Built for founders who need to ship, securely.
          </span>
        </div>
      </div>
    </footer>
  );
}

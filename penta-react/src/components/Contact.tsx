import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import {
  ArrowRight,
  Calendar,
  Check,
  Mail,
  Phone,
  Shield,
  Sparkles,
} from "./Icons";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  situation: string;
  need: string;
  timeline: string;
  budget: string;
  assets: string;
  approver: string;
  message: string;
  website: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  situation: "",
  need: "",
  timeline: "",
  budget: "",
  assets: "",
  approver: "",
  message: "",
  website: "",
};

const SITUATIONS = [
  "Validated idea, no build yet",
  "Incomplete or demo-grade MVP",
  "Live product that needs scaling",
  "Just exploring for now",
];

const NEEDS = [
  "Build a production-ready MVP",
  "Security & SOC 2 readiness",
  "Scale, DevOps & reliability",
  "Not sure yet",
];

const TIMELINES = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

const BUDGETS = [
  "$75k+",
  "$35k–$75k",
  "$15k–$35k",
  "$10k–$15k",
  "Under $10k",
];

const ASSETS = [
  "Nothing yet",
  "Designs / specs",
  "Clickable prototype",
  "Existing codebase",
];

const APPROVERS = [
  "I decide",
  "Co-founder / small team",
  "Board / investors",
  "Not sure yet",
];

function scoreOf(f: FormState) {
  let score = 0;
  if (f.budget === "$75k+" || f.budget === "$35k–$75k") score += 3;
  else if (f.budget === "$15k–$35k") score += 2;
  else if (f.budget === "$10k–$15k") score += 1;

  if (f.timeline === "Within 3 months" || f.timeline === "3–6 months") score += 3;
  else if (f.timeline === "6–12 months") score += 1;

  if (f.situation !== "Just exploring for now" && f.situation) score += 2;
  if (f.need !== "Not sure yet" && f.need) score += 2;

  return Math.min(score, 10);
}

function bandOf(score: number) {
  if (score >= 8) return "High priority";
  if (score >= 5) return "Qualified";
  return "Nurture";
}

function buildMessage(f: FormState) {
  const lines = [
    `Company: ${f.company || "N/A"}`,
    `Situation: ${f.situation || "N/A"}`,
    `Primary need: ${f.need || "N/A"}`,
    `Timeline: ${f.timeline || "N/A"}`,
    `Budget: ${f.budget || "N/A"}`,
    `Existing assets: ${f.assets || "N/A"}`,
    `Decision maker: ${f.approver || "N/A"}`,
  ];
  if (f.message.trim()) {
    lines.push("", "Additional context:", f.message.trim());
  }
  return lines.join("\n").slice(0, 4900);
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [submitError, setSubmitError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "done") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const score = useMemo(() => scoreOf(form), [form]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    if (!form.situation) e.situation = "Select where you are today.";
    if (!form.need) e.need = "Select what you need most.";
    if (!form.timeline) e.timeline = "Select your target timeline.";
    if (!form.budget) e.budget = "Select an investment range.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setSubmitError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>(".field.has-error input, .field.has-error select");
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: buildMessage(form),
          website: form.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          typeof data?.error === "string" ? data.error : "Request failed",
        );
      }

      setStatus("done");
    } catch {
      setStatus("idle");
      setSubmitError(
        "We couldn't send that just now. Please email hello@pentacipher.com directly and we'll reply within one business day.",
      );
    }
  }

  const mailtoHref = `mailto:hello@pentacipher.com?subject=${encodeURIComponent(
    "Free Architecture & Delivery Review",
  )}&body=${encodeURIComponent(buildMessage(form))}`;

  return (
    <section className="section section--navy" id="contact">
      <div className="wrap contact__grid">
        <div className="contact__aside">
          <Reveal>
            <div>
              <span className="eyebrow">Book your review</span>
              <h2 className="h-section" style={{ marginTop: 16 }}>
                Let's pressure-test
                <br />
                your <span className="accent">launch plan</span>
              </h2>
              <p
                className="lede"
                style={{ marginTop: 18, color: "rgba(255,255,255,0.74)" }}
              >
                30 minutes with a senior engineer. You'll leave with a clearer
                architecture, a realistic timeline, and an honest recommendation,
                whether or not we work together.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div style={{ display: "grid", gap: 22 }}>
              <div className="contact__point">
                <Calendar size={20} />
                <div>
                  <strong>30 minutes, no pitch</strong>
                  <span>A working session, not a sales call.</span>
                </div>
              </div>
              <div className="contact__point">
                <Shield size={20} />
                <div>
                  <strong>Confidential by default</strong>
                  <span>NDA available before we talk details.</span>
                </div>
              </div>
              <div className="contact__point">
                <Phone size={20} />
                <div>
                  <strong>
                    <a href="tel:+923106423029">+923106423029</a>
                  </strong>
                  <span>Call or WhatsApp during business hours.</span>
                </div>
              </div>
              <div className="contact__point">
                <Mail size={20} />
                <div>
                  <strong>hello@pentacipher.com</strong>
                  <span>Prefer email? That works too.</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          {status === "done" ? (
            <div className="success" ref={successRef}>
              <div className="success__icon">
                <Check size={30} strokeWidth={2.4} />
              </div>
              <h3>Request received</h3>
              <p>
                Thanks, {form.name.split(" ")[0] || "there"}. We'll review your
                details and reply within one business day to schedule your free
                30-minute architecture review.
              </p>
              <div className="score">
                <span className="score__num">{score}/10</span>
                <span className="score__label">
                  Fit score
                  <b>{bandOf(score)}</b>
                </span>
              </div>
              <div style={{ marginTop: 24 }}>
                <button
                  type="button"
                  className="btn btn--ghost-dark"
                  onClick={() => {
                    setForm(EMPTY);
                    setStatus("idle");
                    setTimeout(
                      () =>
                        formRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        }),
                      60,
                    );
                  }}
                >
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
              <div className="form__row">
                <div className={`field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="name">
                    Full name<span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                  {errors.name && <span className="field__err">{errors.name}</span>}
                </div>
                <div className={`field ${errors.email ? "has-error" : ""}`}>
                  <label htmlFor="email">
                    Work email<span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {errors.email && (
                    <span className="field__err">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+92 300 0000000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className={`field ${errors.situation ? "has-error" : ""}`}>
                  <label htmlFor="situation">
                    Where are you today?<span className="req">*</span>
                  </label>
                  <select
                    id="situation"
                    name="situation"
                    value={form.situation}
                    onChange={(e) => set("situation", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {SITUATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.situation && (
                    <span className="field__err">{errors.situation}</span>
                  )}
                </div>
                <div className={`field ${errors.need ? "has-error" : ""}`}>
                  <label htmlFor="need">
                    What do you need most?<span className="req">*</span>
                  </label>
                  <select
                    id="need"
                    name="need"
                    value={form.need}
                    onChange={(e) => set("need", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {NEEDS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.need && <span className="field__err">{errors.need}</span>}
                </div>
              </div>

              <div className="form__row">
                <div className={`field ${errors.timeline ? "has-error" : ""}`}>
                  <label htmlFor="timeline">
                    Target timeline<span className="req">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={(e) => set("timeline", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {TIMELINES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.timeline && (
                    <span className="field__err">{errors.timeline}</span>
                  )}
                </div>
                <div className={`field ${errors.budget ? "has-error" : ""}`}>
                  <label htmlFor="budget">
                    Investment range<span className="req">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {BUDGETS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <span className="field__err">{errors.budget}</span>
                  )}
                </div>
              </div>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="assets">What exists already?</label>
                  <select
                    id="assets"
                    name="assets"
                    value={form.assets}
                    onChange={(e) => set("assets", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {ASSETS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="approver">Who decides?</label>
                  <select
                    id="approver"
                    name="approver"
                    value={form.approver}
                    onChange={(e) => set("approver", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {APPROVERS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Anything else?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about the product, the deadline, or the risk that keeps you up at night."
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </div>

              {submitError && (
                <div className="form__error">
                  {submitError}{" "}
                  <a href={mailtoHref}>Open email draft</a>
                </div>
              )}

              <button
                type="submit"
                className="btn btn--primary form__submit"
                disabled={status === "sending"}
                style={status === "sending" ? { opacity: 0.7 } : undefined}
              >
                {status === "sending" ? "Sending…" : "Request My Free Review"}
                {status !== "sending" && (
                  <ArrowRight size={15} className="btn__arrow" />
                )}
              </button>

              <p className="form__note">
                <Sparkles size={12} style={{ verticalAlign: "-2px" }} /> No spam, no
                obligation. We reply within one business day.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

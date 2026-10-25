import { Check } from "./Icons";

const ITEMS = [
  "Funded B2B SaaS",
  "2–30 person teams",
  "Pre-seed to Series A",
  "US · UK · EU · UAE · KSA",
];

export default function ProofBar() {
  return (
    <div className="proof">
      <div className="wrap proof__inner">
        <span className="proof__label">Built for teams that need to ship</span>
        <div className="proof__items">
          {ITEMS.map((item) => (
            <span className="proof__item" key={item}>
              <Check size={15} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A financial change value.
 *
 * WCAG 2.2 AA, and the spec's own rule: "Financial status must never rely on
 * green/red alone; include +, −, labels, or directional indicators."
 *
 * So every value renders three independent signals:
 *   1. colour (positive / negative),
 *   2. a visible sign character, and
 *   3. a screen-reader-only word ("up" / "down" / "unchanged").
 *
 * The visible sign is enough on its own in greyscale or for a colour-blind
 * reader; the spoken word is enough for a screen reader.
 */

interface ChangeProps {
  /** Fractional change, e.g. 0.0024 for +0.24%. */
  value: number;
  className?: string;
}

export function Change({ value, className }: ChangeProps) {
  const rounded = Number((value * 100).toFixed(2));
  const direction = rounded > 0 ? 'positive' : rounded < 0 ? 'negative' : 'flat';
  const sign = rounded > 0 ? '+' : rounded < 0 ? '−' : '';
  const spoken = rounded > 0 ? 'up' : rounded < 0 ? 'down' : 'unchanged';
  const tone = direction === 'positive' ? 'positive' : direction === 'negative' ? 'negative' : '';

  return (
    <span className={[tone, 'tabular', className].filter(Boolean).join(' ')}>
      <span className="visuallyHidden">{spoken} </span>
      <span aria-hidden="true">{sign}</span>
      {Math.abs(rounded).toFixed(2)}%
    </span>
  );
}

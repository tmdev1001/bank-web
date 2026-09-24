'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Discreet number tween for marketing/stats figures.
 *
 * Parses values like "50+", "500K+", "$10B+", or "1.23", animates the numeric
 * portion over ~200ms, and skips the tween when the user prefers reduced
 * motion.
 */

const DURATION_MS = 200;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parseFigure(value: string): { prefix: string; amount: number; decimals: number; suffix: string } | null {
  const match = value.match(/^([^0-9.-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const decimals = raw.includes('.') ? (raw.split('.')[1]?.length ?? 0) : 0;
  return { prefix, amount: Number(raw), decimals, suffix };
}

function formatAmount(amount: number, decimals: number): string {
  if (decimals > 0) return amount.toFixed(decimals);
  return String(Math.round(amount));
}

export function AnimatedValue({
  value,
  className,
  as: Tag = 'span',
}: {
  value: string | number;
  className?: string;
  as?: 'span' | 'p' | 'dt' | 'td';
}) {
  const target = typeof value === 'number' ? value.toFixed(2) : value;
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(frameRef.current);
    const parsed = parseFigure(target);

    if (!parsed || prefersReducedMotion()) {
      setDisplay(target);
      if (parsed) fromRef.current = parsed.amount;
      return undefined;
    }

    const from = fromRef.current;
    const { prefix, amount: to, decimals, suffix } = parsed;
    const started = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION_MS);
      const eased = 1 - (1 - t) * (1 - t);
      const current = from + (to - from) * eased;
      setDisplay(`${prefix}${formatAmount(current, decimals)}${suffix}`);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  return (
    <Tag className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </Tag>
  );
}

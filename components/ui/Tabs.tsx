'use client';

import { useState } from 'react';
import styles from './ui.module.css';

/**
 * A tablist. Selection is exposed through `aria-selected` rather than only a
 * background colour, and each tab is a real button so keyboard users reach it.
 */
export function Tabs({
  items,
  label,
  onChange,
  initial,
}: {
  items: string[];
  label: string;
  onChange?: (value: string) => void;
  initial?: string;
}) {
  const [active, setActive] = useState(initial ?? items[0]);
  return (
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={item === active}
          className={styles.tab}
          data-active={item === active}
          onClick={() => {
            setActive(item);
            onChange?.(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

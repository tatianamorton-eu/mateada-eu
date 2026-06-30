export const ease = {
  premium: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
} as const;

export const duration = {
  fast: 0.45,
  base: 0.9,
  slow: 1.4,
} as const;

export const stagger = {
  lines: 0.09,
  words: 0.035,
  cards: 0.12,
} as const;

export const distance = {
  /** vertical travel for text/image reveals, desktop */
  base: 48,
  /** shorter travel used on touch/mobile per the "real reflow" requirement */
  compact: 20,
} as const;

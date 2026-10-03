export interface Focus {
  x: number;
  y: number;
}

export const CENTER: Focus = { x: 50, y: 50 };

// Focus is stored as whole percentages (0–100). Rounding here keeps saved values
// tidy and matches what the backend accepts.
export function clampFocus(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n)));
}

// `null` means "never adjusted" — the surface's own default crop applies, which is
// what every image looked like before focus points existed.
export function focusStyle(
  x: number | null | undefined,
  y: number | null | undefined,
  fallback: Focus = CENTER,
): { objectPosition: string } {
  return { objectPosition: `${x ?? fallback.x}% ${y ?? fallback.y}%` };
}

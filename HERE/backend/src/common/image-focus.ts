import { BadRequestException } from '@nestjs/common';

// Focus point = the percentage of the image (0–100 on each axis) that stays
// centred when the image is cropped into a card. null means "use the surface's
// default crop", which is what every image had before focus points existed.
export function parseFocusCoord(value: unknown, field: string): number | null {
  if (value === undefined || value === null || value === '') return null;
  const n = typeof value === 'string' ? Number(value) : value;
  if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
    throw new BadRequestException(`${field} must be a number between 0 and 100`);
  }
  return n;
}

// Applies focus fields from an update DTO. Swapping in a different photo resets
// the focus to centre unless the client explicitly sent a new one.
export function applyFocus(
  data: Record<string, unknown>,
  currentUrl: string | null,
  dto: { image?: string | null; imageFocusX?: number | null; imageFocusY?: number | null },
) {
  const sentFocus = dto.imageFocusX !== undefined || dto.imageFocusY !== undefined;
  if (dto.imageFocusX !== undefined) data.imageFocusX = parseFocusCoord(dto.imageFocusX, 'imageFocusX');
  if (dto.imageFocusY !== undefined) data.imageFocusY = parseFocusCoord(dto.imageFocusY, 'imageFocusY');
  if (!sentFocus && dto.image !== undefined && dto.image !== currentUrl) {
    data.imageFocusX = null;
    data.imageFocusY = null;
  }
}

export type EventImage = {
  url: string;
  focusX: number | null;
  focusY: number | null;
};

function readCoord(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100
    ? value
    : null;
}

// Events stored gallery images as plain URL strings before per-image focus
// existed. Reads accept both shapes, so old rows keep working without a
// data migration; they are rewritten into the object shape on the next save.
export function normalizeEventImages(raw: unknown): EventImage[] {
  if (!Array.isArray(raw)) return [];
  const out: EventImage[] = [];
  for (const item of raw) {
    if (typeof item === 'string') {
      if (item) out.push({ url: item, focusX: null, focusY: null });
    } else if (item && typeof item === 'object' && typeof (item as { url?: unknown }).url === 'string') {
      const o = item as { url: string; focusX?: unknown; focusY?: unknown };
      if (o.url) out.push({ url: o.url, focusX: readCoord(o.focusX), focusY: readCoord(o.focusY) });
    }
  }
  return out;
}

// Strict version for incoming writes: rejects malformed focus values instead of
// silently dropping them.
export function parseEventImagesInput(raw: unknown): EventImage[] {
  if (!Array.isArray(raw)) throw new BadRequestException('images must be an array');
  return raw.map((item, i) => {
    if (typeof item === 'string') return { url: item, focusX: null, focusY: null };
    if (item && typeof item === 'object' && typeof (item as { url?: unknown }).url === 'string') {
      const o = item as { url: string; focusX?: unknown; focusY?: unknown };
      return {
        url: o.url,
        focusX: parseFocusCoord(o.focusX, `images[${i}].focusX`),
        focusY: parseFocusCoord(o.focusY, `images[${i}].focusY`),
      };
    }
    throw new BadRequestException(`images[${i}] must be a URL or { url, focusX, focusY }`);
  });
}

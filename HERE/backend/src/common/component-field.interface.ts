// Mirrors frontend/src/api/components.ts's ComponentField — shared shape for
// both a dynamic Component's `schema` and a Collection's `fields`.

export type ComponentFieldType = 'text' | 'textarea' | 'image' | 'url' | 'color' | 'number';

export interface ComponentField {
  key: string;
  label: string;
  type: ComponentFieldType;
  placeholder?: string;
  required?: boolean;
}

const VALID_FIELD_TYPES: ComponentFieldType[] = ['text', 'textarea', 'image', 'url', 'color', 'number'];

export function assertValidFields(fields: unknown, label: string): void {
  if (!Array.isArray(fields)) throw new Error(`${label} must be an array`);
  for (const f of fields) {
    if (!f || typeof f !== 'object') throw new Error(`${label} entries must be objects`);
    if (typeof (f as ComponentField).key !== 'string' || !(f as ComponentField).key.trim()) {
      throw new Error(`${label} entries must have a non-empty string "key"`);
    }
    if ((f as ComponentField).type && !VALID_FIELD_TYPES.includes((f as ComponentField).type)) {
      throw new Error(`${label} entry "${(f as ComponentField).key}" has an invalid type`);
    }
  }
}

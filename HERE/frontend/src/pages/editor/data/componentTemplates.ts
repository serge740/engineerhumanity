import { uid } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';
import type { ComponentFieldType } from '../../../api/components';

export interface ComponentTemplateField {
  key:      string;
  label:    string;
  type:     ComponentFieldType;
  required?: boolean;
}

export interface ComponentTemplate {
  id:          string;
  name:        string;
  description: string;
  category:    string;
  fields:      ComponentTemplateField[];
  make:        () => PageElement;
}

// Fluid by default (width: 100% of whatever contains it — a grid cell, a flex
// column, or the page itself) rather than a fixed pixel width, so cards adapt
// naturally in a Collection List grid at any column count/viewport size.
const cardBase = {
  width: '100%',
  minWidth: '0',
  boxSizing: 'border-box',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  overflow: 'hidden',
};

export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  // ── Image top ────────────────────────────────────────────────────────────
  {
    id: 'image-top', name: 'Image top', description: 'Image on top, content stacked below — the classic team/profile card', category: 'Card',
    fields: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'link', label: 'Link URL', type: 'url' },
      { key: 'buttonText', label: 'Button text', type: 'text' },
    ],
    make: (): PageElement => ({
      id: uid(), tag: 'div', class: 'card',
      style: { display: 'flex', flexDirection: 'column', ...cardBase },
      children: [
        { id: uid(), tag: 'img', src: '{{image}}', alt: '{{title}}', style: { width: '100%', height: '180px', objectFit: 'cover', display: 'block' } },
        {
          id: uid(), tag: 'div', class: 'card-content',
          style: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px' },
          children: [
            { id: uid(), tag: 'h3', class: 'card-title', text: '{{title}}', style: { margin: '0', fontSize: '18px', fontWeight: '700', color: '#111827' } },
            { id: uid(), tag: 'p', class: 'card-text', text: '{{description}}', style: { margin: '0', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' } },
            {
              id: uid(), tag: 'a', class: 'card-button', href: '{{link}}', text: '{{buttonText}}',
              style: { marginTop: '8px', padding: '10px 16px', background: '#6366f1', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textAlign: 'center', textDecoration: 'none' },
            },
          ],
        },
      ],
    }),
  },

  // ── Image left ───────────────────────────────────────────────────────────
  {
    id: 'image-left', name: 'Image left', description: 'Image fixed on the left, content flexing on the right', category: 'Card',
    fields: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'link', label: 'Link URL', type: 'url' },
      { key: 'buttonText', label: 'Button text', type: 'text' },
    ],
    make: (): PageElement => ({
      id: uid(), tag: 'div', class: 'card',
      style: { display: 'flex', flexDirection: 'row', alignItems: 'stretch', ...cardBase },
      children: [
        { id: uid(), tag: 'img', src: '{{image}}', alt: '{{title}}', style: { width: '140px', minWidth: '140px', height: 'auto', objectFit: 'cover', display: 'block' } },
        {
          id: uid(), tag: 'div', class: 'card-content',
          style: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px', flex: '1' },
          children: [
            { id: uid(), tag: 'h3', class: 'card-title', text: '{{title}}', style: { margin: '0', fontSize: '17px', fontWeight: '700', color: '#111827' } },
            { id: uid(), tag: 'p', class: 'card-text', text: '{{description}}', style: { margin: '0', fontSize: '13px', color: '#6b7280', lineHeight: '1.6', flex: '1' } },
            {
              id: uid(), tag: 'a', class: 'card-button', href: '{{link}}', text: '{{buttonText}}',
              style: { alignSelf: 'flex-start', padding: '8px 14px', background: '#111827', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '600', textDecoration: 'none' },
            },
          ],
        },
      ],
    }),
  },

  // ── Minimal, no image ────────────────────────────────────────────────────
  {
    id: 'minimal', name: 'Minimal (no image)', description: 'Just a heading, text, and a link — good for simple list-style items', category: 'Card',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'link', label: 'Link URL', type: 'url' },
      { key: 'buttonText', label: 'Button text', type: 'text' },
    ],
    make: (): PageElement => ({
      id: uid(), tag: 'div', class: 'card',
      style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', ...cardBase },
      children: [
        { id: uid(), tag: 'h3', class: 'card-title', text: '{{title}}', style: { margin: '0', fontSize: '18px', fontWeight: '700', color: '#111827' } },
        { id: uid(), tag: 'p', class: 'card-text', text: '{{description}}', style: { margin: '0', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' } },
        {
          id: uid(), tag: 'a', class: 'card-link', href: '{{link}}', text: '{{buttonText}}',
          style: { marginTop: '4px', fontSize: '13px', fontWeight: '700', color: '#6366f1', textDecoration: 'none' },
        },
      ],
    }),
  },

  // ── Testimonial quote ────────────────────────────────────────────────────
  {
    id: 'testimonial', name: 'Testimonial quote', description: 'A quote with an author avatar, name, and role', category: 'Testimonial',
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea', required: true },
      { key: 'author', label: 'Author name', type: 'text', required: true },
      { key: 'role', label: 'Author role', type: 'text' },
      { key: 'avatar', label: 'Avatar', type: 'image' },
    ],
    make: (): PageElement => ({
      id: uid(), tag: 'div', class: 'card',
      style: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', ...cardBase },
      children: [
        {
          id: uid(), tag: 'p', class: 'card-quote', text: '“{{quote}}”',
          style: { margin: '0', fontSize: '15px', fontStyle: 'italic', color: '#374151', lineHeight: '1.6' },
        },
        {
          id: uid(), tag: 'div', class: 'card-author-row',
          style: { display: 'flex', alignItems: 'center', gap: '10px' },
          children: [
            { id: uid(), tag: 'img', src: '{{avatar}}', alt: '{{author}}', style: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', display: 'block' } },
            {
              id: uid(), tag: 'div',
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                { id: uid(), tag: 'span', class: 'card-author', text: '{{author}}', style: { fontSize: '13px', fontWeight: '700', color: '#111827' } },
                { id: uid(), tag: 'span', class: 'card-role', text: '{{role}}', style: { fontSize: '12px', color: '#9ca3af' } },
              ],
            },
          ],
        },
      ],
    }),
  },

  // ── Pricing / feature card ───────────────────────────────────────────────
  {
    id: 'pricing', name: 'Pricing / feature', description: 'Title, price, description, and a full-width call-to-action button', category: 'Pricing',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'price', label: 'Price', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'buttonText', label: 'Button text', type: 'text' },
      { key: 'link', label: 'Link URL', type: 'url' },
    ],
    make: (): PageElement => ({
      id: uid(), tag: 'div', class: 'card',
      style: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '26px', ...cardBase },
      children: [
        { id: uid(), tag: 'h3', class: 'card-title', text: '{{title}}', style: { margin: '0', fontSize: '15px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.04em' } },
        { id: uid(), tag: 'span', class: 'card-price', text: '{{price}}', style: { fontSize: '34px', fontWeight: '800', color: '#111827' } },
        { id: uid(), tag: 'p', class: 'card-text', text: '{{description}}', style: { margin: '0', fontSize: '13px', color: '#6b7280', lineHeight: '1.6', flex: '1' } },
        {
          id: uid(), tag: 'a', class: 'card-button', href: '{{link}}', text: '{{buttonText}}',
          style: { padding: '11px 0', background: '#111827', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textAlign: 'center', textDecoration: 'none' },
        },
      ],
    }),
  },
];

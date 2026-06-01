import { useState } from 'react';
import { useEditorStore, uid, findById } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';
import { VOID_TAGS } from '../canvas/ElementView';

// ── Element library ───────────────────────────────────────────────────────────
interface LibItem {
  label:    string;
  icon:     string;
  make:     () => PageElement;
}

const LIBRARY: LibItem[] = [
  {
    label: 'Heading 1', icon: 'H1',
    make: () => ({ id: uid(), tag: 'h1', text: 'Your Heading', style: { margin: '0 0 16px', fontSize: '32px', fontWeight: '700', lineHeight: '1.2' } }),
  },
  {
    label: 'Heading 2', icon: 'H2',
    make: () => ({ id: uid(), tag: 'h2', text: 'Section Title', style: { margin: '0 0 12px', fontSize: '24px', fontWeight: '700', lineHeight: '1.25' } }),
  },
  {
    label: 'Paragraph', icon: 'P',
    make: () => ({ id: uid(), tag: 'p', text: 'Your paragraph text goes here.', style: { margin: '0 0 12px', lineHeight: '1.6', color: '#374151' } }),
  },
  {
    label: 'Span', icon: 'S',
    make: () => ({ id: uid(), tag: 'span', text: 'Inline text', style: {} }),
  },
  {
    label: 'Link', icon: 'A',
    make: () => ({ id: uid(), tag: 'a', text: 'Click here', style: { color: '#6366f1', textDecoration: 'none' } }),
  },
  {
    label: 'Button', icon: 'BTN',
    make: () => ({ id: uid(), tag: 'button', text: 'Click me', style: { padding: '10px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' } }),
  },
  {
    label: 'Div', icon: 'DIV',
    make: () => ({ id: uid(), tag: 'div', children: [], style: { padding: '20px', minHeight: '60px' } }),
  },
  {
    label: 'Section', icon: 'SEC',
    make: () => ({ id: uid(), tag: 'section', children: [], style: { padding: '60px 40px' } }),
  },
  {
    label: 'Header', icon: 'HDR',
    make: () => ({ id: uid(), tag: 'header', children: [], style: { padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb' } }),
  },
  {
    label: 'Footer', icon: 'FTR',
    make: () => ({ id: uid(), tag: 'footer', children: [], style: { padding: '32px', background: '#f9fafb', textAlign: 'center', borderTop: '1px solid #e5e7eb' } }),
  },
  {
    label: 'Nav', icon: 'NAV',
    make: () => ({ id: uid(), tag: 'nav', children: [], style: { display: 'flex', gap: '24px', alignItems: 'center' } }),
  },
  {
    label: 'Main', icon: 'MAIN',
    make: () => ({ id: uid(), tag: 'main', children: [], style: { padding: '40px 20px' } }),
  },
  {
    label: 'Image', icon: 'IMG',
    make: () => ({ id: uid(), tag: 'img', src: 'https://placehold.co/600x400/eef0f4/6366f1?text=Image', alt: 'Image', style: { maxWidth: '100%', display: 'block' } }),
  },
  {
    label: 'Input', icon: 'INP',
    make: () => ({ id: uid(), tag: 'input', text: '', style: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%', boxSizing: 'border-box', fontSize: '14px' } }),
  },
  {
    label: 'Textarea', icon: 'TXT',
    make: () => ({ id: uid(), tag: 'textarea', style: { padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%', boxSizing: 'border-box', minHeight: '100px', resize: 'vertical', fontSize: '14px' } }),
  },
  {
    label: 'Select', icon: 'SEL',
    make: () => ({
      id: uid(), tag: 'select',
      children: [
        { id: uid(), tag: 'option', text: 'Option 1' },
        { id: uid(), tag: 'option', text: 'Option 2' },
      ],
      style: { padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%', fontSize: '14px' },
    }),
  },
  {
    label: 'Form', icon: 'FRM',
    make: () => ({ id: uid(), tag: 'form', children: [], style: { display: 'flex', flexDirection: 'column', gap: '12px' } }),
  },
  {
    label: 'Label', icon: 'LBL',
    make: () => ({ id: uid(), tag: 'label', text: 'Field label', style: { display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' } }),
  },
  {
    label: 'Divider', icon: 'HR',
    make: () => ({ id: uid(), tag: 'hr', style: { border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' } }),
  },
  {
    label: 'List', icon: 'UL',
    make: () => ({
      id: uid(), tag: 'ul',
      children: [
        { id: uid(), tag: 'li', text: 'List item 1' },
        { id: uid(), tag: 'li', text: 'List item 2' },
        { id: uid(), tag: 'li', text: 'List item 3' },
      ],
      style: { paddingLeft: '20px', margin: '0' },
    }),
  },
  {
    label: 'Ordered List', icon: 'OL',
    make: () => ({
      id: uid(), tag: 'ol',
      children: [
        { id: uid(), tag: 'li', text: 'First item' },
        { id: uid(), tag: 'li', text: 'Second item' },
      ],
      style: { paddingLeft: '20px', margin: '0' },
    }),
  },
  {
    label: 'Table', icon: 'TBL',
    make: () => ({
      id: uid(), tag: 'table',
      children: [
        { id: uid(), tag: 'thead', children: [
          { id: uid(), tag: 'tr', children: [
            { id: uid(), tag: 'th', text: 'Header 1', style: { padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600' } },
            { id: uid(), tag: 'th', text: 'Header 2', style: { padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600' } },
          ]},
        ]},
        { id: uid(), tag: 'tbody', children: [
          { id: uid(), tag: 'tr', children: [
            { id: uid(), tag: 'td', text: 'Cell 1', style: { padding: '8px 12px', borderBottom: '1px solid #f3f4f6' } },
            { id: uid(), tag: 'td', text: 'Cell 2', style: { padding: '8px 12px', borderBottom: '1px solid #f3f4f6' } },
          ]},
        ]},
      ],
      style: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
    }),
  },
  {
    label: 'Blockquote', icon: 'BQ',
    make: () => ({ id: uid(), tag: 'blockquote', text: 'A meaningful quote goes here.', style: { borderLeft: '4px solid #6366f1', paddingLeft: '16px', margin: '0', color: '#6b7280', fontStyle: 'italic' } }),
  },
  {
    label: 'Code', icon: 'CODE',
    make: () => ({ id: uid(), tag: 'code', text: 'const x = 42;', style: { background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px' } }),
  },
  {
    label: 'Pre', icon: 'PRE',
    make: () => ({ id: uid(), tag: 'pre', text: 'function hello() {\n  return "world";\n}', style: { background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto' } }),
  },
];

const ISearch = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

// ── Panel ─────────────────────────────────────────────────────────────────────
export function AddElementsPanel() {
  const [q, setQ] = useState('');
  const selectedId = useEditorStore(s => s.selectedId);
  const elements   = useEditorStore(s => s.elements);
  const addChild   = useEditorStore(s => s.addChild);

  const filtered = LIBRARY.filter(l => l.label.toLowerCase().includes(q.toLowerCase()));

  const handleAdd = (item: LibItem) => {
    const el = item.make();
    // Add as child of selected element if it can have children; else at root
    const canParent = selectedId
      ? (() => {
          const found = findById(elements, selectedId);
          return found ? !VOID_TAGS.has(found.el.tag) : false;
        })()
      : false;
    addChild(canParent ? selectedId : null, el);
  };

  return (
    <div className="l-panel-scroll">
      <div className="l-lib-search">
        <ISearch />
        <input
          placeholder="Search elements"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="l-sect-head">HTML Elements</div>

      <div className="l-lib-grid">
        {filtered.map(item => (
          <div
            key={item.label}
            className="l-lib-card"
            onClick={() => handleAdd(item)}
            title={`Add <${item.make().tag}>`}
          >
            <div className="l-lib-glyph" style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: '#6366f1' }}>
              {item.icon}
            </div>
            <div className="l-lib-lbl">{item.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 8px 0', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
        Click to add element. Select a container first to add inside it.
      </div>
    </div>
  );
}

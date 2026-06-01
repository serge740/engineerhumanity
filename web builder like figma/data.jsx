/* ============ Icons (minimal UI glyphs) ============ */
const I = {
  cursor: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 2.5l9.5 4-4 1.2-1.2 4L3 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  hand: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 7V4.2a1 1 0 112 0V7m0 0V3.2a1 1 0 112 0V7m0 0V4.5a1 1 0 112 0V8.5c0 2.6-1.6 4.5-4 4.5-1.6 0-2.6-.7-3.4-2L3 8.4a1 1 0 011.6-1.2L5 7.6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  text: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3.5 4h9M8 4v8.5M5.7 12.5h4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  square: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  image: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2.5" y="3" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="6" cy="6.5" r="1.1" fill="currentColor"/><path d="M3 11.5l3-3 2.2 2 2-2.2L13.2 11" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  button: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2.5" y="5.5" width="11" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  frame: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 2v12M11 2v12M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.3"/></svg>,
  input: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2.5" y="5" width="11" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  divider: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  icon: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2.5l1.6 3.4 3.7.5-2.7 2.6.7 3.7L8 11.5 4.7 12.7l.7-3.7L2.7 6.4l3.7-.5L8 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  nav: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2.5" y="4" width="11" height="3.2" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><path d="M4.3 5.6h2M9.5 5.6h2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,

  undo: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5.5 6H10a3 3 0 010 6H6.5M5.5 6l2-2M5.5 6l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  redo: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M10.5 6H6a3 3 0 100 6h3.5M10.5 6l-2-2M10.5 6l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  minus: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  close: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  search: (p) => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  eye: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>,
  eyeOff: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M6.2 4A6.6 6.6 0 018 3.5C12 3.5 14.5 8 14.5 8a11 11 0 01-1.7 2.1M3.4 5.4A11 11 0 001.5 8S4 12.5 8 12.5c.6 0 1.2-.1 1.7-.3M2 2l12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  lock: (p) => <svg width="13" height="13" viewBox="0 0 16 16" fill="none" {...p}><rect x="3.5" y="7" width="9" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" strokeWidth="1.2"/></svg>,
  trash: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M3.5 4.5h9M6.5 4.5V3.5a1 1 0 011-1h1a1 1 0 011 1v1M5 4.5l.5 8a1 1 0 001 1h3a1 1 0 001-1l.5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  copy: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M3 11V4a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2"/></svg>,
  chevron: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  desktop: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 13.5h4M8 11.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  tablet: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="3.5" y="2" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7 12h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  mobile: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="4.5" y="2" width="7" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7.2 12h1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  play: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 3.5l7 4.5-7 4.5v-9z" fill="currentColor"/></svg>,
  share: (p) => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...p}><circle cx="11.5" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.3"/><circle cx="4.5" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/><circle cx="11.5" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.3"/><path d="M6 7l4-2M6 9l4 2" stroke="currentColor" strokeWidth="1.3"/></svg>,
  alignL: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 2.5v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="5" y="4.5" width="7" height="2.4" rx=".6" fill="currentColor"/><rect x="5" y="9" width="4.5" height="2.4" rx=".6" fill="currentColor"/></svg>,
  alignCx: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2.5v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="4.5" y="4.5" width="7" height="2.4" rx=".6" fill="currentColor"/><rect x="5.7" y="9" width="4.5" height="2.4" rx=".6" fill="currentColor"/></svg>,
  alignR: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M13 2.5v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="4" y="4.5" width="7" height="2.4" rx=".6" fill="currentColor"/><rect x="6.5" y="9" width="4.5" height="2.4" rx=".6" fill="currentColor"/></svg>,
  alignT: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2.5 3h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="4.5" y="5" width="2.4" height="7" rx=".6" fill="currentColor"/><rect x="9" y="5" width="2.4" height="4.5" rx=".6" fill="currentColor"/></svg>,
  alignM: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="4.5" y="4.5" width="2.4" height="7" rx=".6" fill="currentColor"/><rect x="9" y="5.7" width="2.4" height="4.5" rx=".6" fill="currentColor"/></svg>,
  alignB: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2.5 13h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="4.5" y="4" width="2.4" height="7" rx=".6" fill="currentColor"/><rect x="9" y="6.5" width="2.4" height="4.5" rx=".6" fill="currentColor"/></svg>,
  distH: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2" y="4.5" width="2.2" height="7" rx=".6" fill="currentColor"/><rect x="6.9" y="4.5" width="2.2" height="7" rx=".6" fill="currentColor"/><rect x="11.8" y="4.5" width="2.2" height="7" rx=".6" fill="currentColor"/></svg>,
  tmpl: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 6.5h11M6.5 6.5v7" stroke="currentColor" strokeWidth="1.3"/></svg>,
};

/* ============ Element library (drag sources) ============ */
const LIBRARY = [
  { type: "heading",   label: "Heading",   icon: "text" },
  { type: "text",      label: "Text",      icon: "text" },
  { type: "button",    label: "Button",    icon: "button" },
  { type: "image",     label: "Image",     icon: "image" },
  { type: "container", label: "Container", icon: "square" },
  { type: "input",     label: "Input",     icon: "input" },
  { type: "navbar",    label: "Navbar",    icon: "nav" },
  { type: "divider",   label: "Divider",   icon: "divider" },
  { type: "badge",     label: "Badge",     icon: "icon" },
  { type: "icon",      label: "Icon",      icon: "icon" },
];

const TYPE_ICON = {
  heading: "text", text: "text", button: "button", image: "image",
  container: "square", input: "input", navbar: "nav", divider: "divider",
  badge: "icon", icon: "icon", section: "frame",
};

let __uid = 100;
const uid = () => "el-" + (++__uid);

/* defaults when dropping a new element */
function makeElement(type, x, y) {
  const base = { id: uid(), type, x: Math.round(x), y: Math.round(y), hidden: false, locked: false };
  const presets = {
    heading:   { w: 360, h: 52,  name: "Heading",   text: "Your headline here", fontSize: 40, fontWeight: 750, color: "#16181d", align: "left", lineHeight: 1.1, letter: -0.02 },
    text:      { w: 320, h: 56,  name: "Text",       text: "A short paragraph of supporting copy that explains the value.", fontSize: 16, fontWeight: 400, color: "#6b7280", align: "left", lineHeight: 1.5, letter: 0 },
    button:    { w: 150, h: 44,  name: "Button",     text: "Get started", fontSize: 15, fontWeight: 600, color: "#ffffff", bg: "#6366f1", radius: 9, align: "center" },
    image:     { w: 280, h: 180, name: "Image",      bg: "#eef0f4", radius: 10, label: "image" },
    container: { w: 300, h: 160, name: "Container",  bg: "#ffffff", radius: 12, border: 1, borderColor: "#e9e9ee" },
    input:     { w: 240, h: 42,  name: "Input",      text: "Email address", fontSize: 14, color: "#9ca3af", bg: "#ffffff", radius: 8, border: 1, borderColor: "#e9e9ee" },
    navbar:    { w: 1080, h: 60, name: "Navbar",     bg: "#ffffff", radius: 0, brand: "Lumen" },
    divider:   { w: 320, h: 1,   name: "Divider",    bg: "#e9e9ee" },
    badge:     { w: 120, h: 28,  name: "Badge",      text: "New", fontSize: 12, fontWeight: 600, color: "#4f46e5", bg: "#eef2ff", radius: 999, align: "center" },
    icon:      { w: 44,  h: 44,  name: "Icon",       bg: "#eef2ff", color: "#6366f1", radius: 10 },
  };
  return { ...base, ...(presets[type] || presets.container) };
}

/* ============ Sample landing page ============ */
function heroPage() {
  const e = (o) => ({ id: uid(), hidden: false, locked: false, ...o });
  return [
    e({ type: "section",   name: "Hero BG",      x: 0,   y: 0,   w: 1200, h: 620, bg: "#fbfbfd" }),
    e({ type: "navbar",    name: "Navbar",       x: 0,   y: 0,   w: 1200, h: 64,  bg: "#ffffff", brand: "Lumen" }),
    e({ type: "badge",     name: "Eyebrow",      x: 120, y: 150, w: 188, h: 30,  text: "✦  New in 2026", fontSize: 13, fontWeight: 600, color: "#4f46e5", bg: "#eef2ff", radius: 999, align: "center" }),
    e({ type: "heading",   name: "Hero Title",   x: 120, y: 198, w: 540, h: 132, text: "Build websites, visually.", fontSize: 60, fontWeight: 780, color: "#15171c", align: "left", lineHeight: 1.05, letter: -0.025 }),
    e({ type: "text",      name: "Hero Sub",     x: 120, y: 350, w: 470, h: 64,  text: "Drag, drop and ship responsive pages in minutes — no code, no handoff, no friction.", fontSize: 18, fontWeight: 400, color: "#6b7280", align: "left", lineHeight: 1.55, letter: 0 }),
    e({ type: "button",    name: "CTA Primary",  x: 120, y: 446, w: 168, h: 50,  text: "Start building", fontSize: 16, fontWeight: 600, color: "#ffffff", bg: "#6366f1", radius: 10, align: "center" }),
    e({ type: "button",    name: "CTA Ghost",    x: 300, y: 446, w: 150, h: 50,  text: "Watch demo", fontSize: 16, fontWeight: 600, color: "#15171c", bg: "#ffffff", radius: 10, align: "center", border: 1, borderColor: "#e5e5ec" }),
    e({ type: "image",     name: "Hero Visual",  x: 700, y: 150, w: 380, h: 340, bg: "#eef0f6", radius: 16, label: "product shot" }),

    e({ type: "heading",   name: "Feat Title",   x: 120, y: 700, w: 520, h: 44,  text: "Everything you need to launch", fontSize: 34, fontWeight: 720, color: "#15171c", align: "left", lineHeight: 1.1, letter: -0.02 }),
    e({ type: "container", name: "Card 1",       x: 120, y: 778, w: 340, h: 196, bg: "#ffffff", radius: 14, border: 1, borderColor: "#ececf1" }),
    e({ type: "container", name: "Card 2",       x: 480, y: 778, w: 340, h: 196, bg: "#ffffff", radius: 14, border: 1, borderColor: "#ececf1" }),
    e({ type: "container", name: "Card 3",       x: 840, y: 778, w: 340, h: 196, bg: "#ffffff", radius: 14, border: 1, borderColor: "#ececf1" }),
    e({ type: "icon",      name: "Icon 1",       x: 144, y: 802, w: 40, h: 40, bg: "#eef2ff", color: "#6366f1", radius: 10 }),
    e({ type: "icon",      name: "Icon 2",       x: 504, y: 802, w: 40, h: 40, bg: "#ecfdf5", color: "#10b981", radius: 10 }),
    e({ type: "icon",      name: "Icon 3",       x: 864, y: 802, w: 40, h: 40, bg: "#fff1f2", color: "#f43f5e", radius: 10 }),
    e({ type: "heading",   name: "Card 1 Title", x: 144, y: 858, w: 240, h: 28, text: "Visual canvas", fontSize: 19, fontWeight: 680, color: "#15171c", align: "left", lineHeight: 1.2, letter: -0.01 }),
    e({ type: "heading",   name: "Card 2 Title", x: 504, y: 858, w: 240, h: 28, text: "Responsive by default", fontSize: 19, fontWeight: 680, color: "#15171c", align: "left", lineHeight: 1.2, letter: -0.01 }),
    e({ type: "heading",   name: "Card 3 Title", x: 864, y: 858, w: 240, h: 28, text: "One-click publish", fontSize: 19, fontWeight: 680, color: "#15171c", align: "left", lineHeight: 1.2, letter: -0.01 }),
    e({ type: "text",      name: "Card 1 Body",  x: 144, y: 894, w: 288, h: 60, text: "Design directly on an infinite canvas with pixel control.", fontSize: 14.5, fontWeight: 400, color: "#6b7280", align: "left", lineHeight: 1.5, letter: 0 }),
    e({ type: "text",      name: "Card 2 Body",  x: 504, y: 894, w: 288, h: 60, text: "Every layout adapts cleanly to tablet and mobile.", fontSize: 14.5, fontWeight: 400, color: "#6b7280", align: "left", lineHeight: 1.5, letter: 0 }),
    e({ type: "text",      name: "Card 3 Body",  x: 864, y: 894, w: 288, h: 60, text: "Go from draft to live URL without leaving the editor.", fontSize: 14.5, fontWeight: 400, color: "#6b7280", align: "left", lineHeight: 1.5, letter: 0 }),
  ];
}

function ctaTemplate() {
  const e = (o) => ({ id: uid(), hidden: false, locked: false, ...o });
  return [
    e({ type: "section", name: "BG", x: 0, y: 0, w: 1200, h: 520, bg: "#15171c" }),
    e({ type: "badge", name: "Eyebrow", x: 451, y: 120, w: 160, h: 30, text: "Limited offer", fontSize: 13, fontWeight: 600, color: "#a5b4fc", bg: "#23252e", radius: 999, align: "center" }),
    e({ type: "heading", name: "Title", x: 270, y: 178, w: 660, h: 110, text: "Ready to ship something great?", fontSize: 52, fontWeight: 760, color: "#ffffff", align: "center", lineHeight: 1.08, letter: -0.02 }),
    e({ type: "text", name: "Sub", x: 380, y: 300, w: 440, h: 50, text: "Join 40,000 builders shipping faster with Lumen.", fontSize: 18, fontWeight: 400, color: "#9aa0ad", align: "center", lineHeight: 1.5, letter: 0 }),
    e({ type: "button", name: "CTA", x: 510, y: 376, w: 180, h: 52, text: "Start free trial", fontSize: 16, fontWeight: 600, color: "#15171c", bg: "#ffffff", radius: 10, align: "center" }),
  ];
}

function pricingTemplate() {
  const e = (o) => ({ id: uid(), hidden: false, locked: false, ...o });
  const card = (x, name, color) => ([
    e({ type: "container", name: name + " card", x, y: 220, w: 300, h: 360, bg: "#ffffff", radius: 16, border: 1, borderColor: "#ececf1" }),
    e({ type: "heading", name: name + " tier", x: x + 28, y: 252, w: 200, h: 26, text: name, fontSize: 18, fontWeight: 680, color: "#15171c", align: "left", lineHeight: 1.2, letter: 0 }),
    e({ type: "heading", name: name + " price", x: x + 28, y: 288, w: 200, h: 50, text: color, fontSize: 44, fontWeight: 780, color: "#15171c", align: "left", lineHeight: 1, letter: -0.02 }),
    e({ type: "button", name: name + " btn", x: x + 28, y: 510, w: 244, h: 46, text: "Choose plan", fontSize: 15, fontWeight: 600, color: "#ffffff", bg: "#6366f1", radius: 9, align: "center" }),
  ]);
  return [
    e({ type: "heading", name: "Title", x: 360, y: 110, w: 480, h: 50, text: "Simple, fair pricing", fontSize: 40, fontWeight: 760, color: "#15171c", align: "center", lineHeight: 1.1, letter: -0.02 }),
    ...card(150, "Starter", "$0"),
    ...card(470, "Pro", "$24"),
    ...card(790, "Team", "$80"),
  ];
}

const TEMPLATES = [
  { id: "hero", name: "SaaS Landing", desc: "Hero + features", make: heroPage, accent: "#6366f1" },
  { id: "cta", name: "Dark CTA", desc: "Centered call to action", make: ctaTemplate, accent: "#15171c" },
  { id: "pricing", name: "Pricing", desc: "3-tier comparison", make: pricingTemplate, accent: "#10b981" },
  { id: "blank", name: "Blank", desc: "Empty canvas", make: () => [], accent: "#9ca3af" },
];

Object.assign(window, { I, LIBRARY, TYPE_ICON, makeElement, uid, heroPage, ctaTemplate, pricingTemplate, TEMPLATES });

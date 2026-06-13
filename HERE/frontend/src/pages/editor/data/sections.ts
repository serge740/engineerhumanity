import { uid } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';

export interface SectionTemplate {
  id:          string;
  name:        string;
  description: string;
  category:    string;
  make:        () => PageElement;
}

export const SECTIONS: SectionTemplate[] = [
  // ── Hero ──────────────────────────────────────────────────────────────────
  {
    id: 'hero', name: 'Hero', description: 'Full-width hero with headline, subtext, and CTA button', category: 'Marketing',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' },
      children: [
        { id: uid(), tag: 'h1', text: 'Build Something Amazing', style: { fontSize: '48px', fontWeight: '800', color: '#fff', margin: '0', lineHeight: '1.15' } },
        { id: uid(), tag: 'p',  text: 'The fastest way to launch your next big idea. No code required.', style: { fontSize: '18px', color: 'rgba(255,255,255,0.85)', margin: '0', maxWidth: '540px', lineHeight: '1.6' } },
        {
          id: uid(), tag: 'div',
          style: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' },
          children: [
            { id: uid(), tag: 'button', text: 'Get Started Free', style: { padding: '14px 28px', background: '#fff', color: '#6366f1', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' } },
            { id: uid(), tag: 'button', text: 'See Demo', style: { padding: '14px 28px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' } },
          ],
        },
        { id: uid(), tag: 'img', src: 'https://placehold.co/800x360/ffffff/6366f1?text=Product+Screenshot', alt: 'Product screenshot', style: { maxWidth: '100%', borderRadius: '12px', marginTop: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } },
      ],
    }),
  },

  // ── Navbar ────────────────────────────────────────────────────────────────
  {
    id: 'navbar', name: 'Navbar', description: 'Sticky top navigation with logo and links', category: 'Navigation',
    make: () => ({
      id: uid(), tag: 'header',
      style: { padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: '0', zIndex: '100' },
      children: [
        { id: uid(), tag: 'span', text: '⚡ MyBrand', style: { fontSize: '18px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' } },
        {
          id: uid(), tag: 'nav',
          style: { display: 'flex', gap: '28px', alignItems: 'center' },
          children: [
            { id: uid(), tag: 'a', text: 'Features', style: { fontSize: '14px', color: '#6b7280', textDecoration: 'none', fontWeight: '500' } },
            { id: uid(), tag: 'a', text: 'Pricing',  style: { fontSize: '14px', color: '#6b7280', textDecoration: 'none', fontWeight: '500' } },
            { id: uid(), tag: 'a', text: 'About',    style: { fontSize: '14px', color: '#6b7280', textDecoration: 'none', fontWeight: '500' } },
            { id: uid(), tag: 'button', text: 'Sign Up', style: { padding: '8px 18px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' } },
          ],
        },
      ],
    }),
  },

  // ── Feature Grid ─────────────────────────────────────────────────────────
  {
    id: 'features', name: 'Feature Grid', description: '3-column grid of feature cards with icon, title, and description', category: 'Content',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#f9fafb' },
      children: [
        { id: uid(), tag: 'h2', text: 'Everything You Need', style: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 12px', color: '#111827' } },
        { id: uid(), tag: 'p',  text: 'Powerful features to help you grow faster.', style: { textAlign: 'center', color: '#6b7280', fontSize: '16px', margin: '0 0 48px', lineHeight: '1.6' } },
        {
          id: uid(), tag: 'div',
          style: { display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' },
          children: [
            ['🚀', 'Lightning Fast', 'Optimized for speed and performance from the ground up.'],
            ['🔒', 'Secure by Default', 'Enterprise-grade security with end-to-end encryption.'],
            ['📊', 'Deep Analytics', 'Understand your users with powerful built-in analytics.'],
          ].map(([icon, title, desc]) => ({
            id: uid(), tag: 'div',
            style: { background: '#fff', borderRadius: '12px', padding: '28px', flex: '1', minWidth: '220px', maxWidth: '320px', boxShadow: '0 1px 4px rgba(0,0,0,.06)', border: '1px solid #e5e7eb' },
            children: [
              { id: uid(), tag: 'div', text: icon as string, style: { fontSize: '32px', marginBottom: '12px' } },
              { id: uid(), tag: 'h3', text: title as string, style: { fontSize: '17px', fontWeight: '700', margin: '0 0 8px', color: '#111827' } },
              { id: uid(), tag: 'p',  text: desc  as string, style: { fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.6' } },
            ],
          })),
        },
      ],
    }),
  },

  // ── Testimonial ──────────────────────────────────────────────────────────
  {
    id: 'testimonial', name: 'Testimonial', description: 'Customer quote with avatar and attribution', category: 'Social Proof',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#fff', textAlign: 'center' },
      children: [
        { id: uid(), tag: 'p', text: '"This product completely changed how our team operates. We moved 3× faster after switching."', style: { fontSize: '22px', fontStyle: 'italic', color: '#111827', maxWidth: '640px', margin: '0 auto 32px', lineHeight: '1.6', fontWeight: '500' } },
        {
          id: uid(), tag: 'div',
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' },
          children: [
            { id: uid(), tag: 'div', text: 'AJ', style: { width: '48px', height: '48px', borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', flexShrink: '0' } },
            {
              id: uid(), tag: 'div',
              style: { textAlign: 'left' },
              children: [
                { id: uid(), tag: 'p', text: 'Alex Johnson',    style: { fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0' } },
                { id: uid(), tag: 'p', text: 'CEO, StartupCo', style: { fontSize: '13px', color: '#6b7280', margin: '2px 0 0' } },
              ],
            },
          ],
        },
      ],
    }),
  },

  // ── Contact Form ─────────────────────────────────────────────────────────
  {
    id: 'contact', name: 'Contact Form', description: 'Simple contact form with name, email, message, and submit button', category: 'Forms',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#f9fafb', display: 'flex', justifyContent: 'center' },
      children: [{
        id: uid(), tag: 'div',
        style: { background: '#fff', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '520px', boxShadow: '0 2px 16px rgba(0,0,0,.08)' },
        children: [
          { id: uid(), tag: 'h2', text: 'Get in Touch', style: { fontSize: '24px', fontWeight: '700', margin: '0 0 4px', color: '#111827' } },
          { id: uid(), tag: 'p',  text: "We'd love to hear from you. Fill in the form below.", style: { color: '#6b7280', fontSize: '14px', margin: '0 0 24px' } },
          {
            id: uid(), tag: 'form',
            style: { display: 'flex', flexDirection: 'column', gap: '16px' },
            children: [
              { id: uid(), tag: 'div', style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [
                { id: uid(), tag: 'label', text: 'Name', style: { fontSize: '13px', fontWeight: '600', color: '#374151' } },
                { id: uid(), tag: 'input', text: '', style: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' } },
              ]},
              { id: uid(), tag: 'div', style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [
                { id: uid(), tag: 'label', text: 'Email', style: { fontSize: '13px', fontWeight: '600', color: '#374151' } },
                { id: uid(), tag: 'input', text: '', style: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' } },
              ]},
              { id: uid(), tag: 'div', style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [
                { id: uid(), tag: 'label', text: 'Message', style: { fontSize: '13px', fontWeight: '600', color: '#374151' } },
                { id: uid(), tag: 'textarea', style: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', minHeight: '120px', resize: 'vertical' } },
              ]},
              { id: uid(), tag: 'button', text: 'Send Message', style: { padding: '12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' } },
            ],
          },
        ],
      }],
    }),
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  {
    id: 'pricing', name: 'Pricing Table', description: 'Three-tier pricing cards side by side', category: 'Marketing',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#fff' },
      children: [
        { id: uid(), tag: 'h2', text: 'Simple, Transparent Pricing', style: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 8px', color: '#111827' } },
        { id: uid(), tag: 'p',  text: 'No hidden fees. Cancel anytime.', style: { textAlign: 'center', color: '#6b7280', fontSize: '16px', margin: '0 0 48px' } },
        {
          id: uid(), tag: 'div',
          style: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
          children: [
            { name: 'Starter', price: '$9', desc: 'Perfect for individuals', featured: false, cta: 'Get Started' },
            { name: 'Pro',     price: '$29', desc: 'Best for growing teams', featured: true,  cta: 'Start Free Trial' },
            { name: 'Enterprise', price: '$99', desc: 'For large organisations', featured: false, cta: 'Contact Sales' },
          ].map(({ name, price, desc, featured, cta }) => ({
            id: uid(), tag: 'div',
            style: {
              borderRadius: '14px', padding: '32px 28px', flex: '1', minWidth: '220px', maxWidth: '280px',
              background: featured ? '#6366f1' : '#f9fafb',
              border: featured ? 'none' : '1px solid #e5e7eb',
              boxShadow: featured ? '0 8px 32px rgba(99,102,241,0.3)' : 'none',
            },
            children: [
              { id: uid(), tag: 'p', text: name, style: { fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: featured ? 'rgba(255,255,255,0.8)' : '#6b7280', margin: '0 0 8px' } },
              { id: uid(), tag: 'h3', text: price + '/mo', style: { fontSize: '36px', fontWeight: '800', margin: '0 0 8px', color: featured ? '#fff' : '#111827' } },
              { id: uid(), tag: 'p', text: desc, style: { fontSize: '14px', color: featured ? 'rgba(255,255,255,0.7)' : '#6b7280', margin: '0 0 24px', lineHeight: '1.5' } },
              { id: uid(), tag: 'button', text: cta, style: { width: '100%', padding: '11px', background: featured ? '#fff' : '#6366f1', color: featured ? '#6366f1' : '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' } },
            ],
          })),
        },
      ],
    }),
  },

  // ── CTA Banner ────────────────────────────────────────────────────────────
  {
    id: 'cta', name: 'CTA Banner', description: 'Centered call-to-action with heading and two buttons', category: 'Marketing',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#111827', textAlign: 'center' },
      children: [
        { id: uid(), tag: 'h2', text: 'Ready to get started?', style: { fontSize: '40px', fontWeight: '800', color: '#fff', margin: '0 0 16px', lineHeight: '1.2' } },
        { id: uid(), tag: 'p',  text: 'Join 10,000+ teams already using our platform.', style: { fontSize: '18px', color: '#9ca3af', margin: '0 0 36px', lineHeight: '1.6' } },
        {
          id: uid(), tag: 'div',
          style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
          children: [
            { id: uid(), tag: 'button', text: 'Start for Free', style: { padding: '14px 32px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' } },
            { id: uid(), tag: 'button', text: 'Talk to Sales',  style: { padding: '14px 32px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' } },
          ],
        },
      ],
    }),
  },

  // ── Image + Text ──────────────────────────────────────────────────────────
  {
    id: 'image-text', name: 'Image + Text', description: 'Two-column layout with image on left, text on right', category: 'Content',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#fff', display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' },
      children: [
        { id: uid(), tag: 'img', src: 'https://placehold.co/520x380/eef0f4/6366f1?text=Image', alt: 'Feature image', style: { flex: '1', minWidth: '280px', maxWidth: '520px', borderRadius: '12px', objectFit: 'cover' } },
        {
          id: uid(), tag: 'div',
          style: { flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '16px' },
          children: [
            { id: uid(), tag: 'p',  text: '✦ WHY CHOOSE US', style: { fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#6366f1', margin: '0' } },
            { id: uid(), tag: 'h2', text: 'Designed for the modern web', style: { fontSize: '32px', fontWeight: '800', margin: '0', color: '#111827', lineHeight: '1.25' } },
            { id: uid(), tag: 'p',  text: 'Our platform gives you the tools you need to build beautiful, fast, and scalable products without writing a single line of code.', style: { fontSize: '16px', color: '#6b7280', margin: '0', lineHeight: '1.7' } },
            { id: uid(), tag: 'button', text: 'Learn More →', style: { alignSelf: 'flex-start', padding: '12px 24px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' } },
          ],
        },
      ],
    }),
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  {
    id: 'footer', name: 'Footer', description: 'Site footer with logo, links, and copyright', category: 'Navigation',
    make: () => ({
      id: uid(), tag: 'footer',
      style: { padding: '48px 40px 32px', background: '#111827', color: '#9ca3af' },
      children: [
        {
          id: uid(), tag: 'div',
          style: { display: 'flex', gap: '48px', flexWrap: 'wrap', marginBottom: '40px' },
          children: [
            {
              id: uid(), tag: 'div',
              style: { flex: '2', minWidth: '200px' },
              children: [
                { id: uid(), tag: 'p', text: '⚡ MyBrand', style: { fontSize: '18px', fontWeight: '800', color: '#fff', margin: '0 0 12px' } },
                { id: uid(), tag: 'p', text: 'Building the future of the web, one site at a time.', style: { fontSize: '14px', lineHeight: '1.6', margin: '0', color: '#9ca3af' } },
              ],
            },
            ...['Product', 'Company'].map(col => ({
              id: uid(), tag: 'div',
              style: { flex: '1', minWidth: '120px' },
              children: [
                { id: uid(), tag: 'p', text: col, style: { fontSize: '13px', fontWeight: '700', color: '#fff', letterSpacing: '0.5px', margin: '0 0 12px' } },
                ...['Features', 'Pricing', 'Docs', 'Blog'].map(link => (
                  { id: uid(), tag: 'a', text: link, style: { display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '8px' } }
                )),
              ],
            })),
          ],
        },
        { id: uid(), tag: 'p', text: `© ${new Date().getFullYear()} MyBrand. All rights reserved.`, style: { fontSize: '13px', textAlign: 'center', margin: '0', borderTop: '1px solid #1f2937', paddingTop: '24px' } },
      ],
    }),
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  {
    id: 'faq', name: 'FAQ', description: 'Accordion-style FAQ with native <details> elements', category: 'Content',
    make: () => ({
      id: uid(), tag: 'section',
      style: { padding: '80px 40px', background: '#f9fafb' },
      children: [
        { id: uid(), tag: 'h2', text: 'Frequently Asked Questions', style: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 8px', color: '#111827' } },
        { id: uid(), tag: 'p',  text: "Can't find what you're looking for? Reach out to our team.", style: { textAlign: 'center', color: '#6b7280', fontSize: '15px', margin: '0 0 48px' } },
        {
          id: uid(), tag: 'div',
          style: { maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' },
          children: [
            ['How do I get started?', 'Sign up for a free account and follow the onboarding steps. You can build your first site in under 5 minutes.'],
            ['Is there a free plan?', 'Yes! Our free plan includes up to 3 sites and 1 GB of storage. No credit card required.'],
            ['Can I use my own domain?', 'Absolutely. Connect any custom domain from your account settings with a simple CNAME record.'],
            ['What support options are available?', 'We offer live chat, email support, and extensive documentation for all plan levels.'],
          ].map(([q, a]) => ({
            id: uid(), tag: 'details',
            style: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0', overflow: 'hidden' },
            children: [
              { id: uid(), tag: 'summary', text: q as string, style: { padding: '16px 20px', fontSize: '15px', fontWeight: '600', color: '#111827', cursor: 'pointer', listStyle: 'none' } },
              { id: uid(), tag: 'p',       text: a as string, style: { padding: '0 20px 16px', fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.7' } },
            ],
          })),
        },
      ],
    }),
  },
];

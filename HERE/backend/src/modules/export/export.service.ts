import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import AdmZip = require('adm-zip');
import * as fs from 'fs';
import * as path from 'path';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PageElement {
  id:       string;
  tag:      string;
  text?:    string;
  alt?:     string;
  class?:   string;
  style?:   Record<string, string>;
  children?: PageElement[];
  [key: string]: unknown;
}

const VOID_TAGS = new Set([
  'area','base','br','col','embed','hr','img','input',
  'link','meta','param','source','track','wbr',
]);

// ── Pure helpers ──────────────────────────────────────────────────────────────

function camelToKebab(s: string): string {
  return s.replace(/([A-Z])/g, m => '-' + m.toLowerCase());
}

function rewriteAssetUrls(val: string): string {
  return val.replace(
    /(?:https?:\/\/[^/'")\s]+)?\/uploads\/([^'") \t\n]+)/g,
    (_m, file) => `./assets/${file}`,
  );
}

function rewritePageLinks(val: string, slugs: Set<string>): string {
  return val.replace(/^\/([\w-]+)$/, (_m, slug) =>
    slugs.has(slug) ? `./${slug}.html` : _m,
  );
}

function buildAttrs(el: PageElement, slugs: Set<string>): string {
  const SKIP = new Set(['id','tag','text','children','innerHTML','class','style','assetRef','_frameType','_frameName']);
  const parts: string[] = [];

  if (el.class) parts.push(`class="${el.class}"`);
  if (el.style && Object.keys(el.style).length) {
    const css = Object.entries(el.style)
      .map(([k, v]) => `${camelToKebab(k)}:${rewriteAssetUrls(String(v))}`)
      .join(';');
    parts.push(`style="${css}"`);
  }
  for (const [k, v] of Object.entries(el)) {
    if (SKIP.has(k)) continue;
    if (typeof v !== 'string' && typeof v !== 'number' && typeof v !== 'boolean') continue;
    let sv = rewriteAssetUrls(String(v));
    if (k === 'href') sv = rewritePageLinks(sv, slugs);
    parts.push(`${k}="${sv.replace(/"/g, '&quot;')}"`);
  }
  return parts.length ? ' ' + parts.join(' ') : '';
}

function renderEl(el: PageElement, slugs: Set<string>, depth = 0): string {
  if (!el.tag) return '';
  const pad   = '  '.repeat(depth);
  const attrs = buildAttrs(el, slugs);
  const rec   = el as Record<string, unknown>;

  if (el.tag === 'style')  return `${pad}<style>${rewriteAssetUrls(el.text ?? '')}</style>`;
  if (el.tag === 'script') return `${pad}<script${attrs}>${el.text ?? ''}</script>`;
  if (el.tag === 'link')   return `${pad}<link${attrs}>`;
  if (el.tag === 'meta')   return `${pad}<meta${attrs}>`;
  if (VOID_TAGS.has(el.tag)) return `${pad}<${el.tag}${attrs}>`;

  const inner = typeof rec.innerHTML === 'string' ? rec.innerHTML : null;
  let html = `${pad}<${el.tag}${attrs}>`;

  if (inner) {
    html += rewriteAssetUrls(inner);
  } else if (el.children?.length) {
    html += '\n' + el.children.map(c => renderEl(c, slugs, depth + 1)).join('\n') + `\n${pad}`;
  } else if (el.text) {
    html += el.text;
  }
  return html + `</${el.tag}>`;
}

const HEAD_TAGS = new Set(['style','link','meta','script','noscript','template']);

function splitHeadBody(els: PageElement[]) {
  return {
    head: els.filter(e => HEAD_TAGS.has(e.tag)),
    body: els.filter(e => !HEAD_TAGS.has(e.tag)),
  };
}

function buildHtmlDoc(
  page:      { title: string; description: string | null; html: unknown },
  slugs:     Set<string>,
  globalCSS: string,
  globalJS:  string,
): string {
  const elements = (Array.isArray(page.html) ? page.html : []) as PageElement[];
  const { head, body } = splitHeadBody(elements);

  const descTag     = page.description ? `\n    <meta name="description" content="${page.description}">` : '';
  const cssLink     = globalCSS.trim()  ? '\n    <link rel="stylesheet" href="./site.css">'            : '';
  const jsScript    = globalJS.trim()   ? '\n    <script src="./site.js" defer></script>'              : '';
  const headContent = head.map(e => renderEl(e, slugs, 2)).join('\n');
  const bodyContent = body.map(e => renderEl(e, slugs, 2)).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title || 'Page'}</title>${descTag}${cssLink}${jsScript}
${headContent}
  </head>
  <body>
${bodyContent}
  </body>
</html>`;
}

function collectUploadedFiles(els: PageElement[]): Set<string> {
  const found = new Set<string>();
  const RE = /\/uploads\/([^'") \t\n]+)/g;
  function scan(val: unknown) {
    if (typeof val === 'string') {
      let m: RegExpExecArray | null;
      RE.lastIndex = 0;
      while ((m = RE.exec(val)) !== null) found.add(m[1]);
    } else if (val && typeof val === 'object') {
      for (const v of Object.values(val as object)) scan(v);
    }
  }
  for (const el of els) scan(el);
  return found;
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable()
export class ExportService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({ where: { id: siteId, adminId } });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  async streamSiteZip(siteId: string, adminId: string, res: Response): Promise<void> {
    const site  = await this.assertOwner(siteId, adminId);
    const pages = await this.prisma.page.findMany({ where: { siteId }, orderBy: { createdAt: 'asc' } });

    const siteRec    = site as Record<string, unknown>;
    const globalCSS  = (siteRec.globalCSS as string) ?? '';
    const globalJS   = (siteRec.globalJS  as string) ?? '';
    const uploadsDir = path.join(process.cwd(), 'Uploads');
    const safeName   = (site.name || 'site').replace(/[^a-z0-9]/gi, '_');
    const slugSet    = new Set(pages.map(p => p.slug));

    // ── Collect asset filenames ──────────────────────────────────────────────
    const allAssetFiles = new Set<string>();
    const assetUrlRe    = /\/uploads\/([^'") \t\n]+)/g;
    for (const page of pages) {
      const els = (Array.isArray(page.html) ? page.html : []) as PageElement[];
      collectUploadedFiles(els).forEach(f => allAssetFiles.add(f));
    }
    for (const text of [globalCSS, globalJS]) {
      let m: RegExpExecArray | null;
      assetUrlRe.lastIndex = 0;
      while ((m = assetUrlRe.exec(text)) !== null) allAssetFiles.add(m[1]);
    }

    // ── site.css ─────────────────────────────────────────────────────────────
    const pageStyleBlocks = pages
      .flatMap(p => (Array.isArray(p.html) ? p.html : []) as PageElement[])
      .filter(el => el.tag === 'style')
      .map(el => (el.text ?? '').trim())
      .filter(Boolean)
      .join('\n\n');

    const siteCss = [globalCSS.trim(), pageStyleBlocks].filter(Boolean).join('\n\n/* ── page styles ── */\n\n');

    // ── Build ZIP ────────────────────────────────────────────────────────────
    const zip = new AdmZip();

    for (const page of pages) {
      const isIndex = (page as Record<string, unknown>).isLanding === true || page.slug === 'home' || page.slug === 'index';
      const filename = isIndex ? 'index.html' : `${page.slug}.html`;
      const html     = buildHtmlDoc(
        { title: page.title, description: page.description, html: page.html },
        slugSet, globalCSS, globalJS,
      );
      zip.addFile(filename, Buffer.from(html, 'utf8'));
    }

    if (siteCss.trim()) zip.addFile('site.css', Buffer.from(rewriteAssetUrls(siteCss), 'utf8'));
    if (globalJS.trim()) zip.addFile('site.js', Buffer.from(globalJS, 'utf8'));

    for (const filename of allAssetFiles) {
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) zip.addLocalFile(filePath, 'assets');
    }

    const zipBuffer = zip.toBuffer();
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}-export.zip"`);
    res.setHeader('Content-Length', zipBuffer.length);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.end(zipBuffer);
  }
}

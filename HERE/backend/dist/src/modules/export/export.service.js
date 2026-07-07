"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const collection_expansion_1 = require("../../common/collection-expansion");
const VOID_TAGS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
]);
function camelToKebab(s) {
    return s.replace(/([A-Z])/g, m => '-' + m.toLowerCase());
}
function rewriteAssetUrls(val) {
    return val.replace(/(?:https?:\/\/[^/'")\s]+)?\/uploads\/([^'") \t\n]+)/g, (_m, file) => `./assets/${file}`);
}
function rewritePageLinks(val, slugs) {
    return val.replace(/^\/([\w-]+)$/, (_m, slug) => slugs.has(slug) ? `./${slug}.html` : _m);
}
function buildAttrs(el, slugs) {
    const SKIP = new Set(['id', 'tag', 'text', 'children', 'innerHTML', 'class', 'style', 'assetRef', '_frameType', '_frameName', '_collection', '_modalTarget', '_modalClose']);
    const parts = [];
    parts.push(`data-el-id="${el.id}"`);
    if (el.class)
        parts.push(`class="${el.class}"`);
    if (el.style && Object.keys(el.style).length) {
        const css = Object.entries(el.style)
            .map(([k, v]) => `${camelToKebab(k)}:${rewriteAssetUrls(String(v))}`)
            .join(';');
        parts.push(`style="${css}"`);
    }
    if (typeof el._modalTarget === 'string') {
        parts.push(`onclick="event.preventDefault();var m=document.querySelector('[data-el-id=&quot;${el._modalTarget}&quot;]');if(m&&m.showModal)m.showModal();"`);
    }
    if (el._modalClose === true) {
        parts.push(`onclick="var d=this.closest('dialog');if(d)d.close();"`);
    }
    for (const [k, v] of Object.entries(el)) {
        if (SKIP.has(k))
            continue;
        if (typeof v !== 'string' && typeof v !== 'number' && typeof v !== 'boolean')
            continue;
        let sv = rewriteAssetUrls(String(v));
        if (k === 'href')
            sv = rewritePageLinks(sv, slugs);
        parts.push(`${k}="${sv.replace(/"/g, '&quot;')}"`);
    }
    return parts.length ? ' ' + parts.join(' ') : '';
}
function renderEl(el, slugs, depth = 0) {
    if (!el.tag)
        return '';
    const pad = '  '.repeat(depth);
    const attrs = buildAttrs(el, slugs);
    const rec = el;
    if (el.tag === 'style')
        return `${pad}<style>${rewriteAssetUrls(el.text ?? '')}</style>`;
    if (el.tag === 'script')
        return `${pad}<script${attrs}>${el.text ?? ''}</script>`;
    if (el.tag === 'link')
        return `${pad}<link${attrs}>`;
    if (el.tag === 'meta')
        return `${pad}<meta${attrs}>`;
    if (VOID_TAGS.has(el.tag))
        return `${pad}<${el.tag}${attrs}>`;
    const inner = typeof rec.innerHTML === 'string' ? rec.innerHTML : null;
    let html = `${pad}<${el.tag}${attrs}>`;
    if (inner) {
        html += rewriteAssetUrls(inner);
    }
    else if (el.children?.length) {
        html += '\n' + el.children.map(c => renderEl(c, slugs, depth + 1)).join('\n') + `\n${pad}`;
    }
    else if (el.text) {
        html += el.text;
    }
    return html + `</${el.tag}>`;
}
const HEAD_TAGS = new Set(['style', 'link', 'meta', 'script', 'noscript', 'template']);
function splitHeadBody(els) {
    return {
        head: els.filter(e => HEAD_TAGS.has(e.tag)),
        body: els.filter(e => !HEAD_TAGS.has(e.tag)),
    };
}
function buildHtmlDoc(page, slugs, globalCSS, globalJS) {
    const elements = (Array.isArray(page.html) ? page.html : []);
    const { head, body } = splitHeadBody(elements);
    const descTag = page.description ? `\n    <meta name="description" content="${page.description}">` : '';
    const cssLink = globalCSS.trim() ? '\n    <link rel="stylesheet" href="./site.css">' : '';
    const jsScript = globalJS.trim() ? '\n    <script src="./site.js" defer></script>' : '';
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
function collectUploadedFiles(els) {
    const found = new Set();
    const RE = /\/uploads\/([^'") \t\n]+)/g;
    function scan(val) {
        if (typeof val === 'string') {
            let m;
            RE.lastIndex = 0;
            while ((m = RE.exec(val)) !== null)
                found.add(m[1]);
        }
        else if (val && typeof val === 'object') {
            for (const v of Object.values(val))
                scan(v);
        }
    }
    for (const el of els)
        scan(el);
    return found;
}
let ExportService = class ExportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertOwner(siteId, adminId) {
        const site = await this.prisma.site.findFirst({ where: { id: siteId, adminId } });
        if (!site)
            throw new common_1.NotFoundException('Site not found');
        return site;
    }
    async streamSiteZip(siteId, adminId, res) {
        const site = await this.assertOwner(siteId, adminId);
        const pages = await this.prisma.page.findMany({ where: { siteId }, orderBy: { createdAt: 'asc' } });
        const siteRec = site;
        const globalCSS = siteRec.globalCSS ?? '';
        const globalJS = siteRec.globalJS ?? '';
        const uploadsDir = path.join(process.cwd(), 'Uploads');
        const safeName = (site.name || 'site').replace(/[^a-z0-9]/gi, '_');
        const slugSet = new Set(pages.map(p => p.slug));
        const [collectionsRaw, componentsRaw] = await Promise.all([
            this.prisma.collection.findMany({
                where: { siteId },
                include: { items: { orderBy: { order: 'asc' } } },
            }),
            this.prisma.component.findMany({ where: { siteId, type: 'dynamic' } }),
        ]);
        const collectionsById = new Map(collectionsRaw.map(c => [
            c.id,
            {
                id: c.id,
                fields: c.fields,
                items: c.items.map(i => ({ data: i.data })),
            },
        ]));
        const componentsById = new Map(componentsRaw.map(c => [
            c.id,
            {
                id: c.id,
                html: (Array.isArray(c.html) ? c.html : []),
                modalHtml: (Array.isArray(c.modalHtml) ? c.modalHtml : null),
            },
        ]));
        const expandedByPageId = new Map(pages.map(p => [
            p.id,
            (0, collection_expansion_1.expandCollectionNodes)((Array.isArray(p.html) ? p.html : []), collectionsById, componentsById),
        ]));
        const allAssetFiles = new Set();
        const assetUrlRe = /\/uploads\/([^'") \t\n]+)/g;
        for (const page of pages) {
            collectUploadedFiles(expandedByPageId.get(page.id) ?? []).forEach(f => allAssetFiles.add(f));
        }
        for (const text of [globalCSS, globalJS]) {
            let m;
            assetUrlRe.lastIndex = 0;
            while ((m = assetUrlRe.exec(text)) !== null)
                allAssetFiles.add(m[1]);
        }
        const pageStyleBlocks = pages
            .flatMap(p => expandedByPageId.get(p.id) ?? [])
            .filter(el => el.tag === 'style')
            .map(el => (el.text ?? '').trim())
            .filter(Boolean)
            .join('\n\n');
        const siteCss = [globalCSS.trim(), pageStyleBlocks].filter(Boolean).join('\n\n/* ── page styles ── */\n\n');
        const zip = new AdmZip();
        for (const page of pages) {
            const isIndex = page.isLanding === true || page.slug === 'home' || page.slug === 'index';
            const filename = isIndex ? 'index.html' : `${page.slug}.html`;
            const html = buildHtmlDoc({ title: page.title, description: page.description, html: expandedByPageId.get(page.id) ?? [] }, slugSet, globalCSS, globalJS);
            zip.addFile(filename, Buffer.from(html, 'utf8'));
        }
        if (siteCss.trim())
            zip.addFile('site.css', Buffer.from(rewriteAssetUrls(siteCss), 'utf8'));
        if (globalJS.trim())
            zip.addFile('site.js', Buffer.from(globalJS, 'utf8'));
        for (const filename of allAssetFiles) {
            const filePath = path.join(uploadsDir, filename);
            if (fs.existsSync(filePath))
                zip.addLocalFile(filePath, 'assets');
        }
        const zipBuffer = zip.toBuffer();
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${safeName}-export.zip"`);
        res.setHeader('Content-Length', zipBuffer.length);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        res.end(zipBuffer);
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExportService);
//# sourceMappingURL=export.service.js.map
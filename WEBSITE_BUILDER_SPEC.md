# Website Builder — Full Specification

> **Stack:** NestJS · Prisma · MySQL · ReactJS  
> **Type:** Admin-only, single-team website management tool  
> **Primary users:** Non-technical team members  
> **No AI features anywhere in this system**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Non-Technical User Guide (PRIMARY)](#3-non-technical-user-guide-primary)
4. [Technical User Guide (SECONDARY)](#4-technical-user-guide-secondary)
5. [Database Schema — Prisma + MySQL](#5-database-schema--prisma--mysql)
6. [NestJS Backend — All Modules & Endpoints](#6-nestjs-backend--all-modules--endpoints)
7. [ReactJS Frontend — Architecture & Components](#7-reactjs-frontend--architecture--components)
8. [Drag & Drop Engine — Deep Dive](#8-drag--drop-engine--deep-dive)
9. [Publishing Pipeline](#9-publishing-pipeline)
10. [Media Management](#10-media-management)
11. [Forms System](#11-forms-system)
12. [Authentication & Roles](#12-authentication--roles)
13. [SEO System](#13-seo-system)
14. [All Known Problems, Edge Cases & Solutions](#14-all-known-problems-edge-cases--solutions)
15. [Security Checklist](#15-security-checklist)
16. [Implementation Roadmap](#16-implementation-roadmap)
17. [Folder Structure](#17-folder-structure)
18. [Environment Variables](#18-environment-variables)

---

## 1. Project Overview

### What Is This?

A private, admin-only website builder. A small team logs in through a secure admin panel and builds, edits, and publishes a website visually — without writing any HTML, CSS, or JavaScript. The result is a fully functional public website hosted on your server.

Think of it as your team's own private Wix — but running on your infrastructure, owned by you, with no monthly fees.

### Who Uses It?

| User Type | Who They Are | What They Do |
|---|---|---|
| **Super Admin** | The developer/owner | Manages all accounts, can do everything |
| **Admin** | Trusted team lead | Can create/edit/publish pages, manage media, settings |
| **Editor** | Non-technical team member | Can edit page content and upload media, cannot publish |

There is no public user registration. Accounts are created only by the Super Admin.

### Core Philosophy

1. A non-technical person should be able to make any change to the website without asking a developer.
2. No change is permanent until published — editors can experiment freely.
3. Every action is reversible — undo, version history, restore.
4. The system should explain everything in plain English — no technical jargon in the UI.

### Tech Stack Rationale

| Technology | Why |
|---|---|
| **NestJS** | Structured, modular backend with TypeScript. Built-in guards, interceptors, pipes make auth and validation easy. |
| **Prisma** | Type-safe ORM. Auto-generates types from schema. Migrations are version-controlled. Works great with MySQL. |
| **MySQL** | Reliable, widely supported relational database. JSON column support for flexible block content. |
| **ReactJS** | Component-based UI ideal for a complex editor. Large ecosystem. Works perfectly for drag-and-drop interactions. |
| **No AI** | Predictable, controllable, no third-party dependencies, no usage costs, works offline. |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│                                                             │
│  ┌──────────────────┐        ┌──────────────────────────┐  │
│  │  Admin Panel     │        │   Public Website         │  │
│  │  (React App)     │        │   (Static HTML served    │  │
│  │  /admin/*        │        │    by NestJS or nginx)   │  │
│  └────────┬─────────┘        └──────────────────────────┘  │
│           │ REST API                    ▲                   │
└───────────┼─────────────────────────────┼───────────────────┘
            │                             │
┌───────────▼─────────────────────────────┼───────────────────┐
│                   NestJS Server                             │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐ │
│  │   Auth   │  │  Pages   │  │   Media    │  │  Render  │ │
│  │  Module  │  │  Module  │  │   Module   │  │  Module  │ │
│  └──────────┘  └──────────┘  └────────────┘  └──────────┘ │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐ │
│  │  Blocks  │  │  Forms   │  │  Settings  │  │  Users   │ │
│  │  Module  │  │  Module  │  │   Module   │  │  Module  │ │
│  └──────────┘  └──────────┘  └────────────┘  └──────────┘ │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │     Prisma ORM      │  │  /uploads  (static files)   │  │
│  └──────────┬──────────┘  └─────────────────────────────┘  │
│             │                                               │
└─────────────┼───────────────────────────────────────────────┘
              │
┌─────────────▼───────────────┐
│        MySQL Database        │
│                             │
│  users, pages, blocks,      │
│  media, forms, submissions, │
│  page_versions, settings,   │
│  redirects, site_config     │
└─────────────────────────────┘
```

### How the Two Apps Relate

- The **admin panel** is a React SPA served from `/admin` (or a separate port in development).
- The **public website** is served by NestJS from the root `/` path — it reads published page data from MySQL and renders HTML.
- Media files live in `/uploads` and are served as static assets.
- When a page is published, NestJS either renders HTML on-the-fly or writes static HTML files to a `/public` folder.

---

## 3. Non-Technical User Guide (PRIMARY)

This section describes every feature from the perspective of a non-technical team member. This is the primary design target.

---

### 3.1 Logging In

**Screen:** Login page at `/admin/login`

- Single email + password form
- "Forgot password?" link sends a reset email
- No "Create Account" button — accounts are created by the Super Admin only
- After login, user lands on the Dashboard
- Session lasts 7 days (refresh token) — user stays logged in

**What can go wrong:**
- Wrong password → show "Incorrect email or password" (never say which one is wrong)
- Account locked after 5 failed attempts → show "Too many attempts. Try again in 15 minutes."
- Forgot password → email must be verified, link expires in 1 hour

---

### 3.2 The Dashboard

**Screen:** `/admin/dashboard`

The dashboard gives a bird's-eye view of the website:

| Section | What It Shows |
|---|---|
| **Site Status** | "Published" or "Has unpublished changes" badge |
| **Pages** | List of all pages with their published status |
| **Recent Changes** | Last 5 edits with editor name and timestamp |
| **Media** | Storage used / total quota (e.g., "120 MB / 500 MB") |
| **Form Submissions** | Count of new unread submissions |
| **Quick Actions** | Buttons: "Add New Page", "Upload Image", "View Live Site" |

The dashboard is read-only — no editing happens here. It is the starting point for navigation.

---

### 3.3 Page Manager

**Screen:** `/admin/pages`

A list of all website pages:

```
┌──────────────────────────────────────────────────────┐
│  Pages                              [+ Add New Page]  │
├──────────────────────────────────────────────────────┤
│  ≡  Home          /           ✅ Published   [Edit]  │
│  ≡  About         /about      ✅ Published   [Edit]  │
│  ≡  Programs      /programs   ⚠ Draft        [Edit]  │
│  ≡  Contact       /contact    ✅ Published   [Edit]  │
│  ≡  Gallery       /gallery    ✅ Published   [Edit]  │
└──────────────────────────────────────────────────────┘
```

**What non-tech users can do:**
- **Add a page** — type a name (e.g., "Our Team"), system auto-generates the URL slug (`/our-team`)
- **Rename a page** — click the name to edit it inline
- **Change the URL slug** — with a warning: "Changing this may break links from other websites"
- **Reorder pages** — drag the `≡` handle to change menu order
- **Set as Homepage** — right-click or kebab menu option
- **Duplicate a page** — creates a copy as a draft
- **Delete a page** — requires confirmation, shows which navigation links will break
- **See publish status** — green ✅ means live, yellow ⚠ means draft or has unpublished changes

**Constraints:**
- Cannot delete the homepage unless another page is set as homepage first
- Minimum 1 page must exist at all times
- Slug must be unique — system warns if duplicate

---

### 3.4 The Visual Editor

**Screen:** `/admin/editor/:pageId`

This is the heart of the builder. Everything the non-technical user needs to edit a page is here.

#### Editor Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  TOOLBAR: [← Dashboard] [Page: Home ▾] [Device: 🖥 📱 📟]      │
│           [Undo] [Redo] [Saved ✓]     [Preview] [Publish]       │
├──────────────┬──────────────────────────────────┬───────────────┤
│              │                                  │               │
│  LEFT PANEL  │         CANVAS                   │  RIGHT PANEL  │
│              │                                  │               │
│  + Add Block │  ┌─────────────────────────┐    │  Properties   │
│              │  │  [Hero Block]           │    │  of selected  │
│  Text        │  │  Click to edit text...  │    │  block        │
│  Image       │  └─────────────────────────┘    │               │
│  Button      │  ┌─────────────────────────┐    │  Title: [__]  │
│  Gallery     │  │  [Text Block]           │    │  Color: [__]  │
│  Video       │  │  Your content here...   │    │  Align: [__]  │
│  Form        │  └─────────────────────────┘    │               │
│  Divider     │  ┌─────────────────────────┐    │               │
│  Spacer      │  │  [+ Add Block here]     │    │               │
│  Map         │  └─────────────────────────┘    │               │
│  Testimonial │                                  │               │
│  FAQ         │                                  │               │
│  CTA Banner  │                                  │               │
│  Columns     │                                  │               │
│              │                                  │               │
└──────────────┴──────────────────────────────────┴───────────────┘
```

#### How the Canvas Works

- The canvas shows the page exactly as it will appear when published
- Each "block" is a distinct section of the page (a row, a card, a heading, etc.)
- Blocks stack vertically — the page is a vertical list of blocks
- Clicking a block selects it (shows a blue outline + handles)
- The right panel shows that block's settings

#### Adding a Block

1. Click `+ Add Block` in the left panel
2. A drawer slides out showing all available block types with thumbnails
3. Click a block type — it appears at the bottom of the page
4. Drag it to the right position
5. Edit its content in the right panel or click directly on text

#### Editing Text

- Click any text on the canvas → it becomes editable (like clicking inside a Word document)
- A small floating toolbar appears: **Bold**, *Italic*, Underline, Link, Font size, Text color
- Press `Escape` to finish editing
- Changes are reflected live on the canvas

#### Uploading an Image

1. Click an image block on the canvas
2. Right panel shows: current image + "Change Image" button
3. Click "Change Image" → file picker opens
4. Select image from computer (JPG, PNG, WebP, GIF supported)
5. System auto-compresses images over 2MB
6. Image appears on canvas immediately
7. Optionally crop, adjust width, set alt text (described as "Image description for screen readers and Google")

**Or:** Drag an image file directly from Windows Explorer onto the canvas.

#### Moving a Block

- Hover over a block → see a move handle (⣿) appear on the left
- Drag the handle up/down to reorder the block
- Blue line shows where the block will land

#### Deleting a Block

- Select a block → press `Delete` key on keyboard
- Or: right-click the block → "Delete Block"
- A confirmation appears: "Delete this block? This cannot be undone unless you use Undo."
- Undo (Ctrl+Z) restores it within the current session

#### The Properties Panel (Right Side)

When a block is selected, the right panel shows plain-English controls:

**Example — Hero Block:**
```
Block: Hero Section
─────────────────────────
Heading:        [Welcome to Our Site      ]
Sub-heading:    [We help communities grow ]
Button Text:    [Learn More               ]
Button Link:    [/about                   ]
Background:     [Image ▾] [Upload image]
Text Color:     [● White ▾]
Text Position:  [Center ▾]
Height:         [Large ▾]
─────────────────────────
[Duplicate Block] [Delete Block]
```

Every control has a tooltip explaining what it does in plain English.

#### Undo / Redo

- `Ctrl+Z` — undo last change (up to 50 steps)
- `Ctrl+Y` or `Ctrl+Shift+Z` — redo
- Undo/redo history is per-session (clears on page reload)
- Autosave saves to database every 30 seconds — undo can still go back before autosave

#### Autosave

- A "Saving..." spinner appears in the toolbar 30 seconds after any change
- Becomes "Saved ✓" when complete
- If connection is lost: "Cannot save — check your internet connection"
- If user tries to close the tab with unsaved changes: browser shows "Leave page? Changes may not be saved."

#### Device Preview

- Three buttons in toolbar: 🖥 Desktop (1280px), 📟 Tablet (768px), 📱 Mobile (375px)
- Canvas resizes to show how the page looks on each device
- In mobile view, blocks restack automatically (no manual mobile layout needed)
- User can see if text is too small, images overflow, etc.

#### Page Preview

- "Preview" button opens the current page in a new tab as it would appear when published
- Preview uses a special URL: `/preview/:pageId?token=...` (requires auth)
- Not the same as publishing — no one else can see it

#### Publishing a Page

- "Publish" button in the top-right of the editor
- If user is an Editor role: button says "Request Publish" — sends notification to Admin
- If user is Admin or Super Admin: page publishes immediately
- After publishing: "Live ✅" indicator appears
- If there are unpublished changes: button glows orange "Publish Changes"
- A banner appears: "Your changes are now live!"

---

### 3.5 Block Library — All Available Block Types

| Block | What It Does | Key Settings |
|---|---|---|
| **Hero** | Full-width banner with heading, subheading, button, background image | Heading, subheading, button text/link, background image, text color, height (small/medium/large/full-screen) |
| **Text** | A paragraph or rich text area | Content (rich text editor), max width, alignment |
| **Heading** | An H1, H2, or H3 heading | Text, heading level, alignment, color |
| **Image** | A single image, full-width or contained | Image upload, alt text, caption, link on click, width (full/large/medium/small) |
| **Image + Text** | Image on one side, text on the other | Image, text content, layout (image left or right), vertical alignment |
| **Button** | A clickable button | Label, link (internal page or external URL), style (filled/outline/text), color, size, alignment |
| **Gallery** | A grid of photos | Multiple image uploads, columns (2/3/4), gap size, click behavior (lightbox or link) |
| **Video** | Embedded video | YouTube/Vimeo URL, autoplay, muted, caption |
| **Columns** | Two or three columns side by side | Number of columns (2 or 3), each column can contain Text, Image, Button, Heading |
| **Quote** | A blockquote with attribution | Quote text, author name, author role/title, author photo (optional) |
| **Testimonial** | One or multiple testimonials with photos | Name, role, quote, photo, layout (cards or list) |
| **Stats** | A row of numbers with labels | Up to 6 stat entries (number + label), background color |
| **FAQ** | Accordion-style questions and answers | Question/answer pairs, initially collapsed, expand on click |
| **Team Cards** | Grid of people with photos | Photo, name, title, short bio, optional social links |
| **CTA Banner** | A call-to-action strip | Heading, body text, button, background color or image |
| **Contact Form** | A form users can fill out | Select an existing form or create a new one |
| **Map** | An embedded Google Map | Address input — system generates embed URL |
| **Divider** | A horizontal line | Style (line/dots/wave), color, width, vertical spacing |
| **Spacer** | Blank vertical space | Height (small 24px / medium 48px / large 96px / custom) |
| **HTML Embed** | Raw HTML / iframe | Code textarea (technical users only) |
| **Logo Bar** | A row of partner/sponsor logos | Logo images + optional links |
| **Timeline** | A vertical list of dated events | Date, title, description per step |
| **Pricing Table** | Comparison table | Columns with title, price, features list, button |
| **Announcement Bar** | A sticky top banner | Text, background color, dismissible toggle |
| **404 Page** | Custom not-found page | Heading, message, button back to home |

---

### 3.6 Brand Kit

**Screen:** `/admin/settings/brand`

One place to control the look of the entire website:

```
Brand Kit
──────────────────────────────────────
Primary Color:    [████ #2563EB]  (used for buttons, links, accents)
Secondary Color:  [████ #10B981]  (used for highlights, badges)
Background:       [████ #FFFFFF]
Text Color:       [████ #111827]

Font:
  Heading Font:   [Playfair Display  ▾]  (Google Fonts list)
  Body Font:      [DM Sans           ▾]
  Base Size:      [16px              ▾]

Logo:
  Light version:  [Upload image]  (used on dark backgrounds)
  Dark version:   [Upload image]  (used on light backgrounds)
  Favicon:        [Upload image]  (32x32 px, shown in browser tab)
──────────────────────────────────────
[Save Brand Kit]
```

When Brand Kit is saved, all blocks using `primary-color`, `heading-font`, etc. update automatically across the whole site.

---

### 3.7 Navigation Editor

**Screen:** `/admin/settings/navigation`

Control what appears in the website's menu:

```
Main Navigation
──────────────────────────────────────
≡  Home          /             [Edit] [Delete]
≡  About         /about        [Edit] [Delete]
≡  Programs      /programs ▾   [Edit] [Delete]
     ≡  Overview     /programs/overview
     ≡  Education    /programs/education
≡  Contact       /contact      [Edit] [Delete]
──────────────────────────────────────
[+ Add Link]   [+ Add Dropdown]
```

**Features:**
- Drag `≡` handles to reorder
- Add a link to an internal page (dropdown of all pages) or external URL
- Create dropdowns (nested menus) up to 2 levels deep
- Rename the label separately from the page title (e.g., page title is "Our Programs" but nav label is "Programs")
- Toggle a link as visible or hidden without deleting it
- Footer navigation is separate (same interface, second tab)

---

### 3.8 Media Library

**Screen:** `/admin/media`

All uploaded images and files in one place:

```
Media Library                    [Upload Files]  [🔍 Search]
──────────────────────────────────────────────────────────
Filter: [All ▾]  Sort: [Newest ▾]   Storage: 120 MB / 500 MB
──────────────────────────────────────────────────────────
[img] hero.jpg         1.2 MB   Jun 1 2026   [Copy URL] [Delete]
[img] about-team.png   800 KB   May 28 2026  [Copy URL] [Delete]
[img] logo-dark.svg    12 KB    May 15 2026  [Copy URL] [Delete]
[pdf] report-2025.pdf  2.4 MB   Apr 10 2026  [Copy URL] [Delete]
──────────────────────────────────────────────────────────
```

**Features:**
- Upload by clicking "Upload Files" or dragging from Windows Explorer
- Accepted types: JPG, PNG, WebP, GIF, SVG, PDF, MP4 (video)
- Max file size per upload: 10 MB (configurable by admin)
- Auto-compress JPG/PNG above 2 MB on upload (quality 85%)
- Search by filename
- Filter by type (Images / PDFs / Videos)
- Copy URL — for use in custom HTML blocks or external tools
- Delete — warns if image is currently used on any page
- Quota bar shows how much storage is used

---

### 3.9 Site Settings

**Screen:** `/admin/settings`

```
General Settings
──────────────────────────────────────
Site Name:         [Engineer for Humanity        ]
Site Tagline:      [Building futures together    ]
Language:          [English (US) ▾]
Timezone:          [Africa/Kigali ▾]
Contact Email:     [info@engineer4humanity.org   ]
──────────────────────────────────────

Custom Domain
──────────────────────────────────────
Current URL:       https://engineer4humanity.com
Status:            ✅ Domain verified
──────────────────────────────────────

Social Media Links
──────────────────────────────────────
Facebook:   [https://facebook.com/...           ]
Twitter:    [                                   ]
Instagram:  [https://instagram.com/...          ]
LinkedIn:   [                                   ]
YouTube:    [                                   ]
──────────────────────────────────────
[Save Settings]
```

---

### 3.10 Version History

**Screen:** Accessible from the editor via "History" button in toolbar

```
Version History — Home Page
──────────────────────────────────────
Today, 2:34 PM    Serge (Admin)       [Restore]
Today, 11:20 AM   Marie (Editor)      [Restore]
Yesterday, 4:05 PM  Serge (Admin)     [Restore]
May 30, 9:15 AM   Serge (Admin)       [Restore]
...
(30 versions max, oldest deleted automatically)
──────────────────────────────────────
```

- Click any version to preview it (in a side-by-side view with current)
- "Restore" replaces the current draft with that version
- Restore creates a new version entry — nothing is permanently deleted
- Published versions are marked with a green dot

---

### 3.11 Form Submissions

**Screen:** `/admin/forms`

When a visitor fills out a contact form, the submission appears here:

```
Contact Form Submissions                        [Export CSV]
──────────────────────────────────────────────────────────
Jun 1 2026  John Smith      john@gmail.com      [View] [Delete]
May 31 2026 Marie Dubois    marie@org.org       [View] [Delete]
──────────────────────────────────────────────────────────
```

- "View" opens a modal with all form field values
- "Export CSV" downloads all submissions as a spreadsheet
- New submissions are shown in bold until viewed
- Admins can also configure an email notification for each form submission (plain email address — no SMTP setup by the non-tech user)

---

### 3.12 Team / User Management

**Screen:** `/admin/users` (Super Admin only)

```
Team Members                                  [+ Invite User]
──────────────────────────────────────────────
Serge Niyomugabo   serge@e4h.org   Super Admin   [Edit] [—]
Marie Uwera        marie@e4h.org   Editor        [Edit] [Remove]
──────────────────────────────────────────────
```

- "Invite User" → enter email + choose role → system sends email with one-time setup link
- Roles: Super Admin, Admin, Editor
- Cannot remove the last Super Admin

---

## 4. Technical User Guide (SECONDARY)

These features are hidden from Editors by default and shown only to Admins/Super Admins under an "Advanced" section.

---

### 4.1 Custom CSS

**Screen:** `/admin/settings/custom-css`

A code editor (Monaco or CodeMirror) with:
- Global CSS panel: applies to every page
- Per-page CSS: applies only to that page (accessible from the editor toolbar → "Page Settings" → "Custom CSS")
- Live preview as you type (debounced 500ms)
- Syntax highlighting
- Error indicator (red underline for obvious CSS syntax errors)
- "Revert" button to restore last saved version

**Warning shown to non-tech users if they accidentally open this:**
> "This area is for developers. Adding incorrect code here can break the website's appearance. Please ask your technical contact."

---

### 4.2 Custom JavaScript

**Screen:** `/admin/settings/custom-js`

- Global JS panel (runs on every page)
- Per-page JS (runs only on that page)
- Injected into `<body>` end tag in published HTML only
- **NOT executed in the editor canvas** — prevents breaking the admin UI
- Warning: "Custom JavaScript is powerful and can cause security issues. Only add code from trusted sources."

---

### 4.3 Custom HTML Blocks

In the block library, the "HTML Embed" block allows:
- Raw HTML textarea
- Sanitized on preview (dangerous tags stripped), but saved as-is for publishing
- Iframe embeds (YouTube, Stripe, Calendly, any `<iframe>`) work here
- Shows a grey placeholder in the editor canvas — actual rendering visible only in Preview mode

---

### 4.4 API Keys

**Screen:** `/admin/settings/api-keys`

Allows reading site data (pages, content) via REST API from external tools:

```
API Keys
──────────────────────────────────────────────────────────
Name            Key (hidden)      Scopes          Created
──────────────────────────────────────────────────────────
Mobile App      sk_live_••••••••  read:pages       Jun 1
Analytics Tool  sk_live_••••••••  read:forms       May 20
──────────────────────────────────────────────────────────
[+ Create New Key]
```

- Scopes: `read:pages`, `read:forms`, `read:media`, `write:pages` (dangerous — documented)
- Keys are shown ONCE on creation, then hidden forever (show "copy" dialog on creation)
- Revoke at any time
- Last-used timestamp shown

---

### 4.5 Webhooks

**Screen:** `/admin/settings/webhooks`

Fire HTTP POST requests to an external URL when events happen:

| Event | Trigger |
|---|---|
| `page.published` | A page is published |
| `form.submitted` | A contact form is filled out |
| `media.uploaded` | A file is uploaded |

Webhook payload example for `form.submitted`:
```json
{
  "event": "form.submitted",
  "timestamp": "2026-06-01T14:32:00Z",
  "data": {
    "formId": "clx...",
    "formName": "Contact Form",
    "fields": {
      "name": "John Smith",
      "email": "john@gmail.com",
      "message": "Hello!"
    }
  }
}
```

- Optional HMAC-SHA256 signature for payload verification
- Retry up to 3 times on failure (exponential backoff: 5s, 30s, 5min)
- Delivery log visible in admin panel (last 50 attempts)

---

### 4.6 Meta Tag Injection

**Screen:** Page Settings → SEO → Advanced

Add any `<meta>` tag to a specific page's `<head>`:

```html
<meta name="robots" content="noindex, nofollow">
<meta property="article:author" content="John Smith">
```

Text input — one meta tag per line. Validated on save (must be valid HTML).

---

### 4.7 Robots.txt Editor

**Screen:** `/admin/settings/advanced/robots`

```
User-agent: *
Disallow: /admin/
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

Plain text editor. Saved to file, served at `GET /robots.txt`.

---

### 4.8 Sitemap

- Auto-generated XML sitemap at `GET /sitemap.xml`
- Includes all published pages with their last-modified date
- Manual override: exclude specific pages from sitemap via Page Settings → SEO → "Exclude from sitemap"

---

### 4.9 Page Redirects

**Screen:** `/admin/settings/advanced/redirects`

```
From Path          To Path           Type     Status
──────────────────────────────────────────────────
/old-about         /about            301      Active
/team              /about#team       302      Active
──────────────────────────────────────────────────
[+ Add Redirect]
```

- 301 = permanent (use when renaming pages)
- 302 = temporary
- Handled at the NestJS middleware level (before route matching)
- Circular redirect detection: system warns if A→B→A

---

### 4.10 Export Site

**Screen:** `/admin/settings/advanced/export`

- "Export as ZIP" → generates a static HTML/CSS/JS zip of the published site
- Asynchronous: shows "Generating..." then a download link
- Includes all media files in `/assets/` folder
- Good for backup or migrating to another host

---

## 5. Database Schema — Prisma + MySQL

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ─── USERS ────────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  name          String
  role          Role      @default(EDITOR)
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  pageVersions  PageVersion[]
  apiKeys       ApiKey[]

  @@map("users")
}

enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
}

// ─── SITE CONFIG ──────────────────────────────────────────────

model SiteConfig {
  id             String   @id @default(cuid())
  siteName       String
  tagline        String?
  language       String   @default("en")
  timezone       String   @default("UTC")
  contactEmail   String?
  logoLight      String?  // URL to uploaded file
  logoDark       String?
  favicon        String?
  primaryColor   String   @default("#2563EB")
  secondaryColor String   @default("#10B981")
  bgColor        String   @default("#FFFFFF")
  textColor      String   @default("#111827")
  headingFont    String   @default("Inter")
  bodyFont       String   @default("Inter")
  baseFontSize   Int      @default(16)
  socialLinks    Json?    // { facebook, twitter, instagram, linkedin, youtube }
  customCss      String?  @db.LongText
  customJs       String?  @db.LongText
  robotsTxt      String?  @db.Text
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@map("site_config")
}

// ─── PAGES ────────────────────────────────────────────────────

model Page {
  id             String    @id @default(cuid())
  title          String
  slug           String    @unique
  isHome         Boolean   @default(false)
  isPublished    Boolean   @default(false)
  hasChanges     Boolean   @default(false)  // draft differs from published
  order          Int       @default(0)
  passwordHash   String?   // null = not password protected
  seoTitle       String?
  seoDescription String?   @db.Text
  ogImage        String?   // URL
  excludeSitemap Boolean   @default(false)
  customCss      String?   @db.LongText
  customJs       String?   @db.LongText
  customMeta     String?   @db.Text  // raw <meta> tags
  publishedAt    DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  blocks         Block[]
  publishedBlocks PublishedBlock[]
  versions       PageVersion[]
  redirectsFrom  Redirect[] @relation("RedirectFrom")

  @@map("pages")
}

// ─── BLOCKS (DRAFT) ───────────────────────────────────────────

model Block {
  id        String   @id @default(cuid())
  pageId    String
  page      Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  type      String   // "hero", "text", "image", "gallery", "form", etc.
  order     Int
  props     Json     // all block-specific configuration
  styles    Json?    // optional style overrides
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([pageId, order])
  @@map("blocks")
}

// ─── PUBLISHED BLOCKS (SNAPSHOT) ──────────────────────────────
// A frozen copy of blocks at the time of publishing.
// The public site reads from here, not from `blocks`.

model PublishedBlock {
  id      String @id @default(cuid())
  pageId  String
  page    Page   @relation(fields: [pageId], references: [id], onDelete: Cascade)
  type    String
  order   Int
  props   Json
  styles  Json?

  @@index([pageId, order])
  @@map("published_blocks")
}

// ─── PAGE VERSIONS ────────────────────────────────────────────

model PageVersion {
  id          String   @id @default(cuid())
  pageId      String
  page        Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  savedById   String
  savedBy     User     @relation(fields: [savedById], references: [id])
  blocksJson  Json     // full snapshot of all blocks at save time
  note        String?  // "Auto-save" | "Manual save" | "Pre-publish"
  createdAt   DateTime @default(now())

  @@index([pageId, createdAt])
  @@map("page_versions")
}

// ─── NAVIGATION ───────────────────────────────────────────────

model NavItem {
  id        String    @id @default(cuid())
  location  NavArea   @default(HEADER)
  label     String
  href      String?   // null for dropdown parents
  pageId    String?   // internal page reference
  external  Boolean   @default(false)
  target    String?   // "_blank" for new tab
  order     Int
  parentId  String?   // null = top level
  parent    NavItem?  @relation("NavChildren", fields: [parentId], references: [id])
  children  NavItem[] @relation("NavChildren")
  isHidden  Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@map("nav_items")
}

enum NavArea {
  HEADER
  FOOTER
}

// ─── MEDIA ────────────────────────────────────────────────────

model MediaFile {
  id        String   @id @default(cuid())
  filename  String   // stored filename (uuid.ext)
  original  String   // original filename
  url       String   // /uploads/filename
  mimeType  String
  size      Int      // bytes
  width     Int?
  height    Int?
  altText   String?
  createdAt DateTime @default(now())

  @@map("media_files")
}

// ─── FORMS ────────────────────────────────────────────────────

model Form {
  id          String   @id @default(cuid())
  name        String
  fields      Json     // array of field definitions
  emailTo     String?  // notification email
  emailSubject String?
  successMsg  String?  // shown after submit
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  submissions FormSubmission[]

  @@map("forms")
}

// Form field definition (stored in fields JSON):
// {
//   id: string,
//   type: "text" | "email" | "textarea" | "select" | "checkbox" | "phone",
//   label: string,
//   placeholder?: string,
//   required: boolean,
//   options?: string[]  // for select/checkbox
// }

model FormSubmission {
  id          String   @id @default(cuid())
  formId      String
  form        Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  data        Json     // { fieldLabel: value }
  isRead      Boolean  @default(false)
  ipAddress   String?
  userAgent   String?
  submittedAt DateTime @default(now())

  @@index([formId, submittedAt])
  @@map("form_submissions")
}

// ─── REDIRECTS ────────────────────────────────────────────────

model Redirect {
  id           String   @id @default(cuid())
  fromPath     String   @unique
  toPath       String
  statusCode   Int      @default(301)  // 301 or 302
  isActive     Boolean  @default(true)
  fromPage     Page?    @relation("RedirectFrom", fields: [fromPath], references: [slug])
  createdAt    DateTime @default(now())

  @@map("redirects")
}

// ─── API KEYS ─────────────────────────────────────────────────

model ApiKey {
  id         String    @id @default(cuid())
  userId     String
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  name       String
  keyHash    String    @unique  // bcrypt hash of actual key
  keyPrefix  String    // first 8 chars, for display
  scopes     Json      // string[]
  lastUsedAt DateTime?
  expiresAt  DateTime?
  isActive   Boolean   @default(true)
  createdAt  DateTime  @default(now())

  @@map("api_keys")
}

// ─── WEBHOOKS ─────────────────────────────────────────────────

model Webhook {
  id        String   @id @default(cuid())
  name      String
  url       String
  events    Json     // string[] of event names
  secret    String?  // for HMAC signing
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  deliveries WebhookDelivery[]

  @@map("webhooks")
}

model WebhookDelivery {
  id          String   @id @default(cuid())
  webhookId   String
  webhook     Webhook  @relation(fields: [webhookId], references: [id], onDelete: Cascade)
  event       String
  payload     Json
  responseCode Int?
  responseBody String? @db.Text
  attempts    Int      @default(1)
  success     Boolean  @default(false)
  createdAt   DateTime @default(now())

  @@map("webhook_deliveries")
}

// ─── INVITE TOKENS ────────────────────────────────────────────

model InviteToken {
  id        String   @id @default(cuid())
  email     String
  role      Role
  token     String   @unique  // random UUID
  usedAt    DateTime?
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@map("invite_tokens")
}

// ─── PASSWORD RESET TOKENS ────────────────────────────────────

model PasswordResetToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  usedAt    DateTime?
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@map("password_reset_tokens")
}
```

---

## 6. NestJS Backend — All Modules & Endpoints

### Project Structure

```
src/
├── main.ts
├── app.module.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/           (jwt.strategy.ts, local.strategy.ts)
│   │   ├── guards/               (jwt-auth.guard.ts, roles.guard.ts)
│   │   └── dto/
│   ├── users/
│   ├── pages/
│   ├── blocks/
│   ├── media/
│   ├── forms/
│   ├── navigation/
│   ├── settings/
│   ├── api-keys/
│   ├── webhooks/
│   ├── redirects/
│   └── render/                   (serves the public website)
├── common/
│   ├── decorators/
│   ├── filters/                  (global exception filter)
│   ├── interceptors/             (logging, transform response)
│   └── pipes/                    (validation pipe)
└── prisma/
    ├── prisma.module.ts
    └── prisma.service.ts
```

---

### Auth Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Login with email + password. Returns access + refresh tokens. |
| POST | `/auth/logout` | Authenticated | Invalidates refresh token. |
| POST | `/auth/refresh` | Public (with refresh token) | Returns new access token. |
| POST | `/auth/forgot-password` | Public | Sends reset email if email exists. |
| POST | `/auth/reset-password` | Public (with token) | Sets new password. |
| GET | `/auth/me` | Authenticated | Returns current user info. |

**Login request:**
```json
{ "email": "user@example.com", "password": "mypassword" }
```

**Login response:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": { "id": "clx...", "name": "Serge", "email": "...", "role": "SUPER_ADMIN" }
}
```

Access token: 15 minutes. Refresh token: 7 days (stored in httpOnly cookie).

---

### Users Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/users` | SUPER_ADMIN | List all users |
| POST | `/users/invite` | SUPER_ADMIN | Send invite email to new user |
| PATCH | `/users/:id` | SUPER_ADMIN | Update name, role |
| DELETE | `/users/:id` | SUPER_ADMIN | Deactivate user |
| POST | `/users/accept-invite` | Public (with token) | Complete registration from invite |

---

### Pages Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/pages` | ADMIN+ | List all pages (id, title, slug, isPublished, order) |
| POST | `/pages` | ADMIN+ | Create new page |
| GET | `/pages/:id` | EDITOR+ | Get page with all draft blocks |
| PATCH | `/pages/:id` | EDITOR+ | Update page metadata (title, slug, SEO, etc.) |
| DELETE | `/pages/:id` | ADMIN+ | Delete page (cannot delete homepage) |
| POST | `/pages/:id/publish` | ADMIN+ | Snapshot draft blocks → published blocks |
| POST | `/pages/:id/duplicate` | ADMIN+ | Clone page as new draft |
| POST | `/pages/reorder` | ADMIN+ | Update order of all pages |
| GET | `/pages/:id/versions` | EDITOR+ | List last 30 versions |
| POST | `/pages/:id/restore/:versionId` | ADMIN+ | Restore a version as current draft |

**Create page request:**
```json
{ "title": "Our Team", "slug": "our-team" }
```

**Publish flow (server-side logic):**
1. Load all current `Block` records for pageId
2. Delete all `PublishedBlock` records for pageId
3. Insert new `PublishedBlock` records (copy from blocks)
4. Create a `PageVersion` record (snapshot)
5. Set `page.isPublished = true`, `page.hasChanges = false`, `page.publishedAt = now()`
6. Trigger any active `page.published` webhooks (async)

---

### Blocks Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| POST | `/pages/:pageId/blocks` | EDITOR+ | Add a block to a page |
| PATCH | `/pages/:pageId/blocks/:blockId` | EDITOR+ | Update block props/styles |
| DELETE | `/pages/:pageId/blocks/:blockId` | EDITOR+ | Delete a block |
| POST | `/pages/:pageId/blocks/reorder` | EDITOR+ | Reorder all blocks (array of { id, order }) |

After any block mutation, set `page.hasChanges = true`.

**Add block request:**
```json
{
  "type": "hero",
  "order": 0,
  "props": {
    "heading": "Welcome",
    "subheading": "We help communities",
    "buttonText": "Learn More",
    "buttonLink": "/about",
    "backgroundImage": null,
    "textColor": "white",
    "height": "large"
  }
}
```

---

### Media Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| POST | `/media/upload` | EDITOR+ | Upload file (multipart/form-data) |
| GET | `/media` | EDITOR+ | List all media files |
| DELETE | `/media/:id` | ADMIN+ | Delete file (with usage check) |
| GET | `/media/usage/:id` | ADMIN+ | Check which pages/blocks use this file |

**Upload processing pipeline:**
1. Receive file via Multer
2. Validate mime type and size
3. Generate UUID filename: `{uuid}.{ext}`
4. If image > 2MB: compress with Sharp (quality 85, strip EXIF)
5. Save to `/uploads/{filename}`
6. Create `MediaFile` record in DB
7. Return `{ id, url, filename, size, width, height }`

---

### Forms Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/forms` | ADMIN+ | List all forms |
| POST | `/forms` | ADMIN+ | Create a form |
| GET | `/forms/:id` | ADMIN+ | Get form with field definitions |
| PATCH | `/forms/:id` | ADMIN+ | Update form fields/settings |
| DELETE | `/forms/:id` | ADMIN+ | Delete form |
| GET | `/forms/:id/submissions` | ADMIN+ | List submissions (paginated) |
| DELETE | `/forms/:id/submissions/:subId` | ADMIN+ | Delete a submission |
| GET | `/forms/:id/submissions/export` | ADMIN+ | Download CSV |
| POST | `/public/forms/:id/submit` | Public | Submit a form (rate limited) |

**Public submit validation:**
- Honeypot field: if `_hp` field is non-empty → reject silently (it's a bot)
- Rate limit: 5 submissions per IP per hour
- CSRF token: checked against session
- All field values sanitized (XSS strip) before saving
- Trigger `form.submitted` webhook events asynchronously
- Send notification email to `form.emailTo` asynchronously

---

### Navigation Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/navigation/:area` | EDITOR+ | Get nav items (area: HEADER or FOOTER) |
| POST | `/navigation` | ADMIN+ | Add a nav item |
| PATCH | `/navigation/:id` | ADMIN+ | Update label, href, visibility |
| DELETE | `/navigation/:id` | ADMIN+ | Delete nav item |
| POST | `/navigation/reorder` | ADMIN+ | Reorder (array of { id, order, parentId }) |

---

### Settings Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/settings` | ADMIN+ | Get all site config |
| PATCH | `/settings` | ADMIN+ | Update site config fields |
| PATCH | `/settings/css` | ADMIN+ | Update global custom CSS |
| PATCH | `/settings/js` | ADMIN+ | Update global custom JS |
| PATCH | `/settings/robots` | SUPER_ADMIN | Update robots.txt |
| GET | `/public/sitemap.xml` | Public | Serve auto-generated sitemap |
| GET | `/public/robots.txt` | Public | Serve robots.txt |

---

### API Keys Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/api-keys` | ADMIN+ | List all API keys (prefix only, no full key) |
| POST | `/api-keys` | ADMIN+ | Create key (returns full key ONCE) |
| DELETE | `/api-keys/:id` | ADMIN+ | Revoke key |

---

### Webhooks Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/webhooks` | ADMIN+ | List webhooks |
| POST | `/webhooks` | ADMIN+ | Create webhook |
| PATCH | `/webhooks/:id` | ADMIN+ | Update URL/events/active status |
| DELETE | `/webhooks/:id` | ADMIN+ | Delete webhook |
| GET | `/webhooks/:id/deliveries` | ADMIN+ | See last 50 delivery attempts |
| POST | `/webhooks/:id/test` | ADMIN+ | Send a test payload |

---

### Redirects Module

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/redirects` | ADMIN+ | List all redirects |
| POST | `/redirects` | ADMIN+ | Create redirect |
| PATCH | `/redirects/:id` | ADMIN+ | Update |
| DELETE | `/redirects/:id` | ADMIN+ | Delete |

---

### Render Module (Public Website)

This module serves the live public website. No authentication required.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Serve homepage |
| GET | `/:slug` | Serve page by slug |
| GET | `/sitemap.xml` | Auto-generated sitemap |
| GET | `/robots.txt` | robots.txt |

**Render pipeline:**
1. Look up redirect table — if match found, return 301/302
2. Find page by slug in DB (`isPublished = true`)
3. If page has `passwordHash` → serve password prompt page
4. Load `PublishedBlock` records for page
5. Assemble full HTML using block renderers
6. Inject SEO meta tags, brand CSS variables, custom CSS, custom JS
7. Return complete HTML response

---

## 7. ReactJS Frontend — Architecture & Components

### Tech Choices

| Need | Solution |
|---|---|
| Routing | React Router v6 |
| State (editor) | Zustand (lightweight, no boilerplate) |
| Drag-and-drop | `dnd-kit` (lightweight, accessible, no jQuery) |
| Rich text | TipTap (no AI, extensible, great UX) |
| HTTP client | Axios with interceptors (auto-attach JWT, auto-refresh) |
| Forms | react-hook-form + zod validation |
| Toasts | react-hot-toast |
| Icons | lucide-react |
| Code editor | CodeMirror 6 (for CSS/JS/robots.txt panels) |
| Image upload | FilePond (drag-drop upload with preview and compression) |
| Color picker | react-colorful (tiny, no dependencies) |
| Build | Vite |

---

### Route Structure

```
/admin/login              → LoginPage
/admin/forgot-password    → ForgotPasswordPage
/admin/reset-password     → ResetPasswordPage
/admin/accept-invite      → AcceptInvitePage

/admin/dashboard          → DashboardPage          (requires EDITOR+)
/admin/pages              → PagesListPage           (requires EDITOR+)
/admin/editor/:pageId     → EditorPage              (requires EDITOR+)
/admin/media              → MediaLibraryPage        (requires EDITOR+)
/admin/forms              → FormsPage               (requires ADMIN+)
/admin/forms/:formId      → FormSubmissionsPage     (requires ADMIN+)
/admin/navigation         → NavigationPage          (requires ADMIN+)
/admin/settings           → SettingsPage            (requires ADMIN+)
/admin/settings/brand     → BrandKitPage            (requires ADMIN+)
/admin/settings/css       → CustomCssPage           (requires ADMIN+)
/admin/settings/js        → CustomJsPage            (requires ADMIN+)
/admin/settings/advanced  → AdvancedSettingsPage    (requires SUPER_ADMIN)
/admin/users              → UsersPage               (requires SUPER_ADMIN)
```

---

### Component Tree

```
App
├── AuthProvider           (loads current user, handles token refresh)
│   └── Router
│       ├── AuthGuard      (redirects to /login if not authenticated)
│       │   └── AdminLayout
│       │       ├── Sidebar         (navigation links, user info)
│       │       ├── TopBar          (breadcrumbs, notifications)
│       │       └── <page content>
│       │
│       └── PublicLayout           (for login, forgot password)
│           └── <auth pages>
│
└── EditorProvider         (loaded only on /admin/editor/:pageId)
    ├── EditorCanvas
    │   ├── BlockList
    │   │   └── BlockWrapper (x N)
    │   │       ├── BlockRenderer   (renders the actual block UI)
    │   │       ├── DragHandle      (⣿ icon, initiates drag)
    │   │       ├── SelectionBorder (shows when block is selected)
    │   │       └── BlockToolbar    (quick actions: duplicate, delete)
    │   └── DropZone               (where new blocks can be dropped)
    │
    ├── LeftPanel
    │   └── BlockPicker            (list of block types with thumbnails)
    │
    ├── RightPanel
    │   └── PropertyEditor         (form fields for selected block props)
    │
    ├── EditorToolbar
    │   ├── DeviceToggle           (desktop/tablet/mobile)
    │   ├── UndoRedoButtons
    │   ├── SaveStatus             (Saving... / Saved ✓ / Error)
    │   ├── PreviewButton
    │   └── PublishButton
    │
    └── HistoryPanel               (slide-in drawer with versions)
```

---

### Editor State (Zustand Store)

```typescript
interface EditorState {
  // Current page
  pageId: string
  pageTitle: string
  hasChanges: boolean
  isSaving: boolean
  lastSavedAt: Date | null

  // Blocks (working copy)
  blocks: Block[]

  // Selection
  selectedBlockId: string | null
  selectedBlock: Block | null  // derived

  // History (undo/redo)
  history: Block[][]  // array of block snapshots
  historyIndex: number

  // Device preview
  device: 'desktop' | 'tablet' | 'mobile'

  // Actions
  setBlocks: (blocks: Block[]) => void
  addBlock: (type: string, afterId?: string) => void
  updateBlock: (id: string, props: Partial<BlockProps>) => void
  deleteBlock: (id: string) => void
  reorderBlocks: (activeId: string, overId: string) => void
  selectBlock: (id: string | null) => void
  undo: () => void
  redo: () => void
  save: () => Promise<void>  // debounced, auto-called
  publish: () => Promise<void>
}
```

---

### Block Renderer System

Each block type has a corresponding React component:

```
src/
└── editor/
    └── blocks/
        ├── HeroBlock.tsx
        ├── TextBlock.tsx
        ├── ImageBlock.tsx
        ├── GalleryBlock.tsx
        ├── VideoBlock.tsx
        ├── FormBlock.tsx
        ├── ColumnsBlock.tsx
        ├── TestimonialBlock.tsx
        ├── FAQBlock.tsx
        ├── CTABannerBlock.tsx
        ├── StatsBlock.tsx
        ├── TeamCardsBlock.tsx
        ├── QuoteBlock.tsx
        ├── DividerBlock.tsx
        ├── SpacerBlock.tsx
        ├── MapBlock.tsx
        ├── HtmlEmbedBlock.tsx
        └── index.ts  // registry: { [type]: Component }
```

Each block component receives:
```typescript
interface BlockProps {
  props: Record<string, any>     // the block's configuration
  isSelected: boolean
  isEditing: boolean             // inline text being edited
  onSelect: () => void
  onPropsChange: (newProps: Partial<BlockProps>) => void  // called from PropertyEditor
  device: 'desktop' | 'tablet' | 'mobile'
}
```

The **PropertyEditor** in the right panel is also block-specific:
```
src/editor/properties/
├── HeroProperties.tsx
├── TextProperties.tsx
├── ImageProperties.tsx
...
└── index.ts  // registry: { [type]: PropertyComponent }
```

---

## 8. Drag & Drop Engine — Deep Dive

### Library Choice: `dnd-kit`

`dnd-kit` is chosen over `react-beautiful-dnd` (archived), `react-dnd` (complex API), or raw HTML5 drag events (poor touch support and ghost image limitations). `dnd-kit` is:
- Framework-agnostic core
- Accessible (keyboard drag support)
- Touch-friendly
- Small (~10KB)
- No jQuery

---

### How Block Reordering Works

```
1. User grabs the ⣿ DragHandle on a block
2. dnd-kit fires onDragStart → mark block as "being dragged"
3. A semi-transparent "ghost" follows the cursor
4. A blue line shows the drop position between other blocks
5. onDragOver → update drop position indicator
6. User releases → onDragEnd fires
7. Call reorderBlocks(activeId, overId) in Zustand store
8. Store recomputes `order` values for all blocks
9. React re-renders with new order
10. Mark page as hasChanges = true
11. Autosave triggers
```

### How Block Resizing Works (Width)

Some blocks (Image, Columns, Button) allow width control:
- User selects block → right panel shows Width slider
- Width is stored as a CSS class or a percentage value in block props
- No drag-handle resize — it's a sidebar control only (simpler and more reliable)

### How Inline Text Editing Works (TipTap)

For Text blocks, Heading blocks, and text fields within other blocks:

1. Block renders read-only initially
2. User double-clicks text area → TipTap editor mounts in place
3. Floating toolbar appears above: B, I, U, Link, Align, Font Size, Color
4. Text changes update block props in real time via `onPropsChange`
5. User clicks outside or presses Escape → TipTap unmounts, block re-renders in read-only mode
6. Change is immediately pushed to history stack

### Undo/Redo Implementation

```typescript
// On every state change that should be undoable:
function pushToHistory(newBlocks: Block[]) {
  const { history, historyIndex } = get()
  // Trim forward history if user has undone steps
  const newHistory = history.slice(0, historyIndex + 1)
  // Add new snapshot (cap at 50)
  newHistory.push(deepClone(newBlocks))
  if (newHistory.length > 50) newHistory.shift()
  set({
    history: newHistory,
    historyIndex: newHistory.length - 1,
    blocks: newBlocks
  })
}

function undo() {
  const { history, historyIndex } = get()
  if (historyIndex <= 0) return
  const newIndex = historyIndex - 1
  set({ historyIndex: newIndex, blocks: deepClone(history[newIndex]) })
}

function redo() {
  const { history, historyIndex } = get()
  if (historyIndex >= history.length - 1) return
  const newIndex = historyIndex + 1
  set({ historyIndex: newIndex, blocks: deepClone(history[newIndex]) })
}
```

### Autosave

```typescript
// In EditorProvider, after every blocks change:
const debouncedSave = useMemo(
  () => debounce(() => editorStore.save(), 30_000),
  []
)

useEffect(() => {
  if (editorStore.hasChanges) {
    debouncedSave()
  }
}, [editorStore.blocks])
```

Save calls `PATCH /pages/:pageId/blocks` with the full blocks array.

---

## 9. Publishing Pipeline

### What "Publishing" Means

When a page is published, the `blocks` (working draft) are copied to `published_blocks`. The public-facing render endpoint reads `published_blocks` — so edits to the draft never affect the live site until the admin explicitly publishes.

### Server-Side Rendering (SSR) Approach

The NestJS Render Module assembles HTML from `published_blocks` at request time:

```typescript
async renderPage(slug: string): Promise<string> {
  const page = await prisma.page.findUnique({ where: { slug, isPublished: true } })
  const blocks = await prisma.publishedBlock.findMany({
    where: { pageId: page.id },
    orderBy: { order: 'asc' }
  })
  const config = await prisma.siteConfig.findFirst()
  const nav = await prisma.navItem.findMany({ where: { location: 'HEADER' }, orderBy: { order: 'asc' } })

  const blocksHtml = blocks.map(b => renderBlock(b.type, b.props)).join('\n')

  return `<!DOCTYPE html>
<html lang="${config.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seoTitle || page.title} — ${config.siteName}</title>
  <meta name="description" content="${page.seoDescription || ''}">
  <style>${generateCssVariables(config)}</style>
  <style>${config.customCss || ''}</style>
  ${page.customCss ? `<style>${page.customCss}</style>` : ''}
  ${page.customMeta || ''}
</head>
<body>
  ${renderNav(nav, config)}
  <main>${blocksHtml}</main>
  ${renderFooter(config)}
  ${config.customJs ? `<script>${config.customJs}</script>` : ''}
  ${page.customJs ? `<script>${page.customJs}</script>` : ''}
</body>
</html>`
}
```

### CSS Variables from Brand Kit

```css
:root {
  --color-primary: #2563EB;
  --color-secondary: #10B981;
  --color-bg: #FFFFFF;
  --color-text: #111827;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-size-base: 16px;
}
```

All block HTML uses these CSS variables — changing the brand kit automatically updates the entire site on next render.

### Block Renderers (Server Side)

Each block type has a server-side HTML renderer:

```typescript
// Example: Hero block renderer
function renderHeroBlock(props: HeroProps): string {
  return `
<section class="block-hero" style="
  background-image: ${props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  color: ${props.textColor === 'white' ? '#fff' : 'var(--color-text)'};
  min-height: ${heightMap[props.height]};
">
  <div class="hero-content hero-${props.textPosition}">
    <h1>${escapeHtml(props.heading)}</h1>
    <p>${escapeHtml(props.subheading)}</p>
    ${props.buttonText ? `<a href="${escapeHtml(props.buttonLink)}" class="btn btn-primary">${escapeHtml(props.buttonText)}</a>` : ''}
  </div>
</section>`
}
```

All user-provided text is always passed through `escapeHtml()` before output.

---

## 10. Media Management

### Upload Flow

```
Browser                    NestJS                     Disk
  │                          │                          │
  │  POST /media/upload       │                          │
  │  (multipart/form-data)    │                          │
  ├──────────────────────────►│                          │
  │                          │  Validate MIME + size     │
  │                          │  Generate UUID filename   │
  │                          │  If image > 2MB: compress │
  │                          ├─────────────────────────►│
  │                          │  Write file               │
  │                          │◄─────────────────────────┤
  │                          │  Create MediaFile in DB   │
  │◄──────────────────────────│                          │
  │  { id, url, size, w, h } │                          │
```

### File Storage Structure

```
uploads/
├── images/
│   ├── a1b2c3d4.jpg
│   ├── e5f6g7h8.webp
│   └── ...
├── documents/
│   ├── i9j0k1l2.pdf
│   └── ...
└── videos/
    └── m3n4o5p6.mp4
```

Served by NestJS as static files: `app.useStaticAssets('uploads', { prefix: '/uploads' })`

### Storage Quota

- Default quota: 500 MB (configurable in `.env`)
- Check on each upload: if `totalSize + newFileSize > quota` → reject with friendly error
- Dashboard shows quota bar

### Image Compression

Using **Sharp** library:
```typescript
import sharp from 'sharp'

if (isImage && file.size > 2_000_000) {
  const compressed = await sharp(file.buffer)
    .jpeg({ quality: 85, progressive: true })
    .withMetadata({})  // strips EXIF (privacy)
    .toBuffer()
  // save compressed buffer instead of original
}
```

### Delete Safety Check

Before deleting a media file:
1. Search all `Block.props` (JSON) for the file URL
2. Search `SiteConfig` fields for the file URL
3. If found: warn user with list of pages using this file
4. User can force-delete anyway (image becomes broken on those pages)

---

## 11. Forms System

### Form Builder

Non-technical users can create forms without any code:

```
Form Builder — Contact Form
──────────────────────────────────────────────────────────
Fields:
  1. Full Name       [Text field]  Required  [Edit] [Delete]
  2. Email Address   [Email field] Required  [Edit] [Delete]
  3. Phone           [Phone field] Optional  [Edit] [Delete]
  4. Message         [Textarea]    Required  [Edit] [Delete]
  5. How did you hear about us?
                     [Dropdown]   Optional  [Edit] [Delete]
     Options: Google, Social Media, Friend, Other

  [+ Add Field]
──────────────────────────────────────────────────────────
On submit:
  Send email to:   [info@e4h.org                        ]
  Subject:         [New Contact Form Submission          ]
  Success message: [Thank you! We'll get back to you.   ]
──────────────────────────────────────────────────────────
[Save Form]
```

### Available Field Types

| Type | Input Element | Notes |
|---|---|---|
| Text | `<input type="text">` | Short single-line text |
| Email | `<input type="email">` | Validates email format |
| Phone | `<input type="tel">` | Phone number |
| Textarea | `<textarea>` | Multi-line text |
| Dropdown | `<select>` | User defines options |
| Checkbox | `<input type="checkbox">` | Single checkbox |
| Checkbox Group | Multiple checkboxes | User defines options |
| Number | `<input type="number">` | Numeric only |
| Date | `<input type="date">` | Date picker |
| Hidden | Not visible | Pre-filled value (useful for tracking which page the form is on) |

### Spam Protection (No CAPTCHA Needed)

1. **Honeypot field:** A hidden input `<input name="_hp" style="display:none">`. Bots fill it; humans don't. If `_hp` has a value → submission rejected silently.
2. **Rate limiting:** Max 5 submissions per IP per hour per form.
3. **Minimum time check:** If form was submitted in < 2 seconds of page load → likely a bot. Reject silently. (Time set via hidden field on form render.)

### Email Notifications

Using **Nodemailer** (configured with SMTP in `.env`). The admin only needs to enter their email address in the form settings — no SMTP knowledge required. The SMTP server is configured once by the Super Admin in environment variables.

---

## 12. Authentication & Roles

### Role Permissions Matrix

| Action | Editor | Admin | Super Admin |
|---|---|---|---|
| View dashboard | ✅ | ✅ | ✅ |
| Edit page content | ✅ | ✅ | ✅ |
| Upload media | ✅ | ✅ | ✅ |
| Delete media | ❌ | ✅ | ✅ |
| Publish pages | ❌ | ✅ | ✅ |
| Delete pages | ❌ | ✅ | ✅ |
| Manage forms | ❌ | ✅ | ✅ |
| View form submissions | ❌ | ✅ | ✅ |
| Manage navigation | ❌ | ✅ | ✅ |
| Edit brand kit | ❌ | ✅ | ✅ |
| Custom CSS/JS | ❌ | ✅ | ✅ |
| Manage API keys | ❌ | ✅ | ✅ |
| Manage webhooks | ❌ | ✅ | ✅ |
| Invite/remove users | ❌ | ❌ | ✅ |
| Advanced settings | ❌ | ❌ | ✅ |

### JWT Flow

```
Login → access token (15 min) stored in memory (not localStorage)
      + refresh token (7 days) stored in httpOnly cookie

Every API request → Bearer: access token in Authorization header

When access token expires:
  → Axios interceptor catches 401
  → Silently POST /auth/refresh (sends refresh cookie)
  → Gets new access token
  → Retries original request

When refresh token expires:
  → User redirected to /admin/login
```

**Why not localStorage for access token?**  
httpOnly cookies cannot be read by JavaScript — XSS attacks cannot steal the token.

### Account Lockout

- 5 failed login attempts → account locked for 15 minutes
- Tracked in memory (Redis in production) or in DB (`failedAttempts`, `lockUntil` fields)
- Super Admin can manually unlock accounts

---

## 13. SEO System

### Per-Page SEO Settings

Accessible from editor toolbar → "Page Settings":

```
SEO Settings — Home Page
──────────────────────────────────────────────────────────────
Page Title:         [Engineer for Humanity — Building Futures ]
                    ← 60 characters | [████████████░░░] Good

Meta Description:   [We provide education, vocational training,
                     and healthcare to refugee communities in
                     Rwanda and beyond.]
                    ← 155 characters | [████████████░░] Good

Social Share Image: [Upload image]  (1200×630px recommended)
                    Preview: [Facebook preview box] [Twitter preview box]

Canonical URL:      [https://engineer4humanity.org/] (auto-filled)

Exclude from sitemap: [ ] Yes

Advanced:
  Custom meta tags: [textarea]
──────────────────────────────────────────────────────────────
```

Character counters are shown with color coding:
- Green: good length
- Yellow: too short or slightly long
- Red: too long (exceeds limits Google/social platforms use)

### Auto-Generated Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://engineer4humanity.org/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://engineer4humanity.org/about</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 14. All Known Problems, Edge Cases & Solutions

### Non-Technical User Problems

| Problem | When It Happens | Solution |
|---|---|---|
| User deletes a block by accident | Pressing Delete key | Undo (Ctrl+Z) restores it. Confirmation dialog before delete. |
| User uploads a 50MB image | Trying to upload large photo | Server rejects > 10MB. Frontend warns > 2MB ("This image will be compressed"). |
| Site looks broken on mobile | Added fixed-width elements | Mobile preview mode shows the issue immediately. Mobile-first block defaults. |
| User forgets to publish | Made edits, closed browser | "⚠ Unpublished changes" badge on dashboard + editor. |
| Two admins edit the same page | Both have page open | Last-write-wins on save. Warning toast: "Another user recently saved this page. Your version may differ from theirs." |
| User enters a duplicate page slug | Creating two "about" pages | Slug field shows red error: "This URL is already in use." System suggests "about-2". |
| User can't find a block they deleted | Deleted it last session | Version history lets them restore a previous version. |
| Published page 404s after renaming slug | Changed slug after publishing | System prompts: "Do you want to add a redirect from the old URL?" |
| User's contact form gets no emails | Email to field left blank, or SMTP misconfigured | Show "Form submission received" in admin panel regardless of email. Admin can configure email separately. |
| Non-tech user accidentally opens CSS editor | Navigating advanced settings | Warning overlay: "This is a developer area. Please don't edit unless you know CSS." With "Go Back" button prominent. |
| Page order doesn't match navigation | Pages reordered but nav not updated | Navigation is separate from page order. Dashboard shows "Your navigation may be out of date" if pages were reordered. |
| User wants to add video background | No native video background support | Workaround: use HTML Embed block with iframe, or use a hosted video URL. Document this in a tooltip. |
| Rich text editor shows strange characters | Pasted from Word | TipTap's paste handler strips Word formatting. Show a "Paste as plain text" button. |

---

### Technical User Problems

| Problem | When It Happens | Solution |
|---|---|---|
| Injected JS breaks the admin editor | JS errors in custom JS panel | Custom JS is NOT executed in the editor canvas. It's injected only in published HTML. |
| Custom HTML contains XSS | `<script>` in HTML Embed block | HTML Embed sanitizes on preview (strips scripts). On publish: user is warned, raw HTML goes through unchanged (they're authenticated admins). |
| Webhook endpoint is down | Target URL not responding | Retry 3 times: 5s, 30s, 5min. Log result. Mark delivery as failed after 3 attempts. |
| API key is leaked | Key shared accidentally | Admin can revoke instantly. Old key becomes invalid within 1 minute (short cache TTL). |
| CSS cascade conflict | Custom CSS overrides brand kit | Custom CSS loads AFTER brand kit CSS. Document this in the UI. |
| Page JSON grows very large | Page with 50+ blocks, complex gallery | Pagination of blocks in editor (load all for editing, lazy render blocks outside viewport). |
| Export ZIP contains broken image paths | Images on different server | ZIP generation rewrites all image paths to relative. Test on generation. |
| Redirect loop | A→B, B→A | Server checks for cycles before saving a redirect. Error: "This would create a redirect loop." |

---

### Infrastructure Problems

| Problem | When It Happens | Solution |
|---|---|---|
| MySQL connection pool exhausted | High traffic or leaked connections | Prisma connection pool size set via `DATABASE_URL?connection_limit=10`. Monitor with health endpoint. |
| Uploads folder fills disk | Many large files uploaded | Storage quota per admin (default 500MB). Cron job to find and warn about unused media. |
| Server restarts lose in-memory state | Deployment, crash | All state is in MySQL. In-memory only holds the JWT revocation list (short-lived, acceptable to lose). |
| Node.js process runs out of memory | Large image processing | Sharp streams (doesn't load full file into memory). Set `--max-old-space-size=512` for Node. |
| SSL certificate expires | Let's Encrypt cert | Auto-renew via certbot cron. Alert if cert expires within 14 days. |
| Admin panel accessible from internet | Should be private | Add IP whitelist or HTTP basic auth at nginx level for `/admin` routes if needed. |
| DDOS on public form endpoint | Bot traffic | Rate limiting (5 submissions/IP/hour). Nginx rate limit at load balancer level. |
| Database migration fails in production | Running `prisma migrate deploy` | Always test migration on staging first. Keep a pre-migration DB backup. |
| Two processes write to uploads at same time | Scaled horizontally | Local disk storage is single-server only. Document: for multi-server, migrate to S3. |

---

### Data Integrity Problems

| Problem | When It Happens | Solution |
|---|---|---|
| Block props reference deleted media | Image deleted after used in block | `DELETE /media/:id` endpoint checks all blocks for URL usage. Warns before deleting. |
| Page deleted but redirect points to it | Admin deletes page without redirect | When deleting a page, prompt: "Add a redirect from /slug to another page?" |
| Version restore causes conflict | Another user edited after the version was saved | Restore creates a new version (not a true git-merge). Show "Restored from [date]" note. User can compare and manually merge. |
| NavItem points to deleted page | Page deleted without updating nav | When deleting a page, system automatically removes/flags any nav items pointing to that slug. |
| Form deleted but block still uses it | Admin deletes form | FormBlock shows "⚠ Form not found" in editor and renders a "Form is unavailable" message on the live site. |

---

## 15. Security Checklist

### Authentication
- [x] Passwords hashed with bcrypt (cost factor 12)
- [x] JWT access tokens expire in 15 minutes
- [x] Refresh tokens stored in httpOnly, SameSite=Strict cookies
- [x] Account lockout after 5 failed attempts
- [x] Rate limiting on /auth/login (10 req/min per IP)
- [x] Password reset tokens are one-time use, expire in 1 hour
- [x] Invite tokens are one-time use, expire in 48 hours

### Authorization
- [x] Every API endpoint protected by JWT guard
- [x] Role check (`@Roles()` decorator) on every endpoint
- [x] User cannot escalate their own role via PATCH /users/:id (checked server-side)

### Input Validation
- [x] All DTO inputs validated via class-validator + ValidationPipe (global)
- [x] File uploads: MIME type checked (not just extension), max size enforced
- [x] Slugs: sanitized to lowercase alphanumeric + hyphens only
- [x] HTML in custom fields: `sanitize-html` library strips dangerous tags on preview renders
- [x] SQL injection: impossible — Prisma uses parameterized queries only

### Output Security
- [x] All user-provided text in SSR HTML passed through `escapeHtml()`
- [x] Content-Security-Policy header set (restricts external scripts)
- [x] X-Frame-Options: DENY (no clickjacking)
- [x] Helmet.js applied globally on NestJS app

### API Security
- [x] API key hashed in DB (bcrypt) — if DB is breached, keys cannot be recovered
- [x] Webhook payloads signed with HMAC-SHA256
- [x] CORS restricted to known admin origin

### Media
- [x] Uploaded files served from `/uploads` — no PHP, no executable files
- [x] File extension + MIME type must both be in allowlist
- [x] File content scanned: not trusting Content-Type header alone

---

## 16. Implementation Roadmap

### Phase 1 — Foundation (Weeks 1–2)
- NestJS project setup, Prisma, MySQL connection
- `users`, `site_config` tables
- Auth module: login, logout, refresh, JWT guards
- React admin shell: login page, layout, routing, Axios setup

**Deliverable:** Team can log in and see an empty dashboard.

---

### Phase 2 — Pages & Empty Editor (Weeks 3–4)
- `pages`, `blocks`, `published_blocks` tables
- Pages CRUD API
- Pages list screen in React
- Empty editor canvas (no drag yet — just a scrollable list of placeholder blocks)
- Autosave stub

**Deliverable:** Admin can create, rename, delete, and reorder pages.

---

### Phase 3 — Block System & Drag-and-Drop (Weeks 5–7)
- Implement 5 blocks: Hero, Text, Image, Button, Divider
- Block CRUD API
- dnd-kit integration for drag-to-reorder
- Property panel for each block
- TipTap inline text editing
- Undo/redo (Zustand history)
- Autosave (debounced 30s)

**Deliverable:** Admin can build a basic page by adding, editing, and reordering blocks.

---

### Phase 4 — Full Block Library (Weeks 8–9)
- Remaining 20+ block types
- Property panels for all blocks
- Block picker UI with thumbnails
- Columns block (nested blocks)

**Deliverable:** Full block library available.

---

### Phase 5 — Publishing & Public Site (Weeks 10–11)
- Publish API (draft → published snapshot)
- NestJS render module (SSR HTML from published blocks)
- CSS variables from brand kit
- Block HTML renderers for all block types
- Basic global CSS for responsive layout

**Deliverable:** Published site is live and viewable in browser.

---

### Phase 6 — Media, Brand Kit, Navigation (Weeks 12–13)
- Media upload API + library UI
- Sharp compression
- Brand kit settings page
- Navigation editor
- Site settings page

**Deliverable:** Admin can upload images, set brand colors/fonts, manage navigation.

---

### Phase 7 — Forms, SEO, Version History (Weeks 14–15)
- Form builder + submission storage
- Email notifications (Nodemailer)
- SEO settings per page
- Sitemap.xml auto-generation
- Version history panel + restore

**Deliverable:** Contact forms work, SEO settings editable, versions restorable.

---

### Phase 8 — Technical Features (Weeks 16–17)
- Custom CSS/JS panels (CodeMirror)
- Robots.txt editor
- Page redirects
- API keys
- Webhooks

**Deliverable:** Technical users have full control.

---

### Phase 9 — Polish & Edge Cases (Week 18)
- Mobile device preview
- Conflict warning when two users edit same page
- Media usage checker before delete
- Page slug change → prompt for redirect
- Empty states for all lists
- Error boundaries in React
- 404 page customization
- Password-protect page feature

**Deliverable:** All edge cases handled. UI is polished.

---

### Phase 10 — Security & Production (Week 19)
- Full security review (run through checklist above)
- Performance: cache published page HTML for 60 seconds
- Set up nginx reverse proxy + SSL (Let's Encrypt)
- Set up cron for cert renewal, DB backups
- Load test with k6
- Write runbook for deployments

**Deliverable:** Production-ready, deployed, monitored.

---

### Summary Timeline

| Phase | Scope | Weeks |
|---|---|---|
| 1 | Foundation: auth, DB, login | 1–2 |
| 2 | Pages CRUD + empty editor | 3–4 |
| 3 | Block system + drag-and-drop | 5–7 |
| 4 | Full block library | 8–9 |
| 5 | Publishing + public site | 10–11 |
| 6 | Media, brand kit, navigation | 12–13 |
| 7 | Forms, SEO, version history | 14–15 |
| 8 | Technical features | 16–17 |
| 9 | Polish + edge cases | 18 |
| 10 | Security + production | 19 |

**Solo developer: ~19 weeks. 2 developers: ~10–11 weeks.**

---

## 17. Folder Structure

### Full Project Structure

```
website-builder/
├── backend/                        # NestJS application
│   ├── src/
│   │   ├── main.ts                 # Bootstrap, global pipes, Helmet, CORS
│   │   ├── app.module.ts           # Root module
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   ├── forgot-password.dto.ts
│   │   │   │   │   └── reset-password.dto.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   │   └── roles.guard.ts
│   │   │   │   └── strategies/
│   │   │   │       └── jwt.strategy.ts
│   │   │   ├── users/
│   │   │   ├── pages/
│   │   │   ├── blocks/
│   │   │   ├── media/
│   │   │   ├── forms/
│   │   │   ├── navigation/
│   │   │   ├── settings/
│   │   │   ├── api-keys/
│   │   │   ├── webhooks/
│   │   │   ├── redirects/
│   │   │   └── render/             # Public website SSR
│   │   └── common/
│   │       ├── decorators/         # @Roles(), @CurrentUser()
│   │       ├── filters/            # GlobalExceptionFilter
│   │       ├── interceptors/       # TransformResponseInterceptor
│   │       └── pipes/              # ValidationPipe config
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── uploads/                    # Media file storage
│   │   ├── images/
│   │   ├── documents/
│   │   └── videos/
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/                       # ReactJS admin panel
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── api/
│   │   │   └── axios.ts            # Axios instance + interceptors
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useEditor.ts
│   │   ├── stores/
│   │   │   └── editorStore.ts      # Zustand editor state
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── ForgotPasswordPage.tsx
│   │   │   │   └── ResetPasswordPage.tsx
│   │   │   ├── dashboard/
│   │   │   ├── pages-list/
│   │   │   ├── editor/
│   │   │   ├── media/
│   │   │   ├── forms/
│   │   │   ├── navigation/
│   │   │   ├── settings/
│   │   │   └── users/
│   │   ├── editor/
│   │   │   ├── EditorLayout.tsx
│   │   │   ├── EditorCanvas.tsx
│   │   │   ├── EditorToolbar.tsx
│   │   │   ├── LeftPanel/
│   │   │   │   └── BlockPicker.tsx
│   │   │   ├── RightPanel/
│   │   │   │   └── PropertyEditor.tsx
│   │   │   ├── blocks/             # Block renderer components
│   │   │   │   ├── HeroBlock.tsx
│   │   │   │   ├── TextBlock.tsx
│   │   │   │   └── ... (all block types)
│   │   │   └── properties/         # Property panel components
│   │   │       ├── HeroProperties.tsx
│   │   │       └── ... (per block type)
│   │   ├── components/
│   │   │   ├── ui/                 # Reusable UI (Button, Input, Modal, etc.)
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   └── types/
│   │       └── index.ts            # Shared TypeScript types
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## 18. Environment Variables

### Backend `.env`

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/website_builder"

# JWT
JWT_SECRET="your-super-secret-key-min-32-chars"
JWT_REFRESH_SECRET="another-secret-key-min-32-chars"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

# Server
PORT=3001
NODE_ENV="development"
ADMIN_ORIGIN="http://localhost:5173"  # React dev server

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="yourapp@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Website Builder <yourapp@gmail.com>"

# Media
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE_MB=10
STORAGE_QUOTA_MB=500

# App URL (used for sitemap, links in emails)
APP_URL="https://yoursite.com"
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME="Website Builder"
```

---

*End of specification — total sections: 18 | estimated implementation: 19 weeks solo*

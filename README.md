# BIM Builders

**Precision BIM that makes your designs build-ready.**

The official marketing and lead-generation website for **BIM Builders** — a professional Building Information Modeling (BIM) services company serving the Architecture, Engineering & Construction (AEC) industry across **India, the Middle East, Europe, and the US**.

- **Live contact:** [info@bimbuilders.in](mailto:info@bimbuilders.in) · +91 79810 72411
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion
- **Integrations:** Groq (AI assistant) · EmailJS (contact workflow)

---

## 1. Who is BIM Builders?

BIM Builders is a team of BIM specialists that turns design intent into coordinated, clash-free, build-ready models. The company produces data-rich Revit models, multi-discipline coordination, and construction documentation that integrate cleanly into how clients actually build — from concept through fabrication and into lifecycle operations.

- **Mission:** Empower the AEC industry with precise, data-driven BIM that cuts rework and sharpens every decision.
- **Vision:** Become the BIM partner teams trust globally — where design, data, and delivery meet.
- **Core values:** Accuracy · Innovation · Transparency · Collaboration.
- **Track record (as presented on site):** 50+ projects completed · 10+ clients · 5 countries.

## 2. Why this website exists

The website is a **business-development engine**, not a brochure. Its purpose is to:

1. **Establish credibility** with architects, structural engineers, contractors, fabricators, and real-estate developers through a clear, professional presentation of capabilities.
2. **Educate visitors** on BIM services and where they fit in the project lifecycle.
3. **Convert visitors into qualified leads** via an always-on AI sales assistant and a validated, dual-confirmation contact workflow.
4. **Route every inquiry** straight into the team's inbox while sending the prospect an automatic confirmation — so no lead is dropped and every enquiry gets an immediate, professional response.

## 3. Problems it solves for stakeholders

| Stakeholder | Pain point | How BIM Builders helps |
|---|---|---|
| **Architects & designers** | Design intent gets lost or misinterpreted on site | LOD-ready Revit models and shop drawings that are coordination- and construction-ready |
| **Structural / MEP engineers** | Cross-discipline conflicts discovered during construction | Navisworks clash detection, issue tracking, and pre-construction resolution |
| **Contractors & site teams** | Ambiguous documentation causes rework and delays | Dimensioned, annotated, build-from-it shop & masonry drawings |
| **Fabricators (LGS / modular)** | Models aren't fabrication- or panelization-ready | Light Gauge Steel and modular/prefab BIM built for manufacturing |
| **Owners & real-estate developers** | No reliable as-built or lifecycle data | Scan-to-BIM as-builts, quantity take-offs/BOMs, and digital-twin-grade models |
| **Estimators & procurement** | Manual, error-prone quantity counts | Model-driven BOQs and bills of materials extracted directly from BIM |

## 4. Services offered

All ten services are defined in [`lib/site/services-data.ts`](lib/site/services-data.ts) and surfaced on the homepage and `/services` page:

1. **BIM Modeling (Architectural & Structural)** — 3D BIM from CAD/PDF/concepts, parametric Revit, LOD 100–500.
2. **BIM Coordination & Clash Detection** — multi-discipline integration in Navisworks with clash reports and resolution support.
3. **Shop Drawings** — construction-ready architectural & structural drawings with dimensions and annotations.
4. **Masonry Shop Drawings (CMU / Block Work)** — layouts, reinforcement, lintels, sections, schedules, control joints.
5. **Light Gauge Steel (LGS) Modeling & Detailing** — cold-formed framing, panelization, fabrication-ready shop drawings.
6. **Scan to BIM (Point Cloud Services)** — RCP/RCS/E57/LAS conversion into accurate as-built and retrofit models.
7. **Quantity Take-Off & Bill of Materials (BOM)** — model-driven BOQs for estimation and procurement.
8. **Modular & Prefabrication BIM** — modular coordination, feasibility, and design-to-manufacturing translation.
9. **Digital Twin & Advanced BIM** — lifecycle-grade, highly coordinated models with constructability and permitting support.
10. **BIM Automation (Dynamo)** — scripting to cut repetitive Revit tasks and lock in standards and consistency.

## 5. AI Assistant & contact workflow

### AI Assistant (`/api/chat`)
A floating chat assistant ([`components/site/AIAssistant.tsx`](components/site/AIAssistant.tsx)) acts as a 24/7 BIM consultant that educates visitors and steers them toward sharing project details.

- Backed by **Groq** (`llama-3.3-70b-versatile`) through a server-side proxy — the API key never reaches the browser.
- A purpose-built sales **system prompt** ([`lib/chat/system-prompt.ts`](lib/chat/system-prompt.ts)) keeps replies short, focused, and conversion-oriented (one guiding question at a time).
- The server fully controls the system prompt; client messages are validated and any non-`user`/`assistant` roles are rejected, so the prompt cannot be overridden.

### Contact workflow (`/api/contact`)
The contact form ([`components/site/Contact.tsx`](components/site/Contact.tsx)) drives a **dual-email** lead pipeline via EmailJS:

1. **Admin notification** → sent to `info@bimbuilders.in` with the prospect's name, email, company, project type, and message.
2. **User confirmation** → an automatic acknowledgement to the prospect.

If the admin email fails, the full submission is written to structured logs so the lead can be recovered. A honeypot field silently absorbs bots, and submissions are validated and rate-limited before any email is sent.

## 6. How it generates & manages customer inquiries

- **Two capture channels:** the conversational AI assistant (top-of-funnel education → qualification) and the structured contact form (high-intent leads).
- **Qualification built in:** the assistant collects project type, inputs (CAD/PDF/concepts), scale, and disciplines before nudging toward a formal enquiry; the form normalizes project type against the actual service catalog.
- **Zero-loss delivery:** every valid submission notifies the team *and* confirms to the prospect; failures are logged with full lead detail for manual recovery.
- **Abuse-resistant:** same-origin checks, per-IP rate limiting, payload-size caps, and a honeypot keep spam and scraping out of the inbox.

## 7. Technology stack & architecture

| Layer | Choice |
|---|---|
| Framework | **Next.js 16.2.2** (App Router, React Server Components, `output: "standalone"`) |
| UI runtime | **React 19.2.4** |
| Language | **TypeScript 5** (strict) |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/postcss`), dark theme |
| Animation | **Framer Motion 12** (reduced-motion aware) |
| Icons | **lucide-react** |
| Fonts | **Google Sans / Google Sans Flex** (`@fontsource`) + Inter (`next/font`) |
| AI | **Groq** chat completions (server-side proxy) |
| Email | **EmailJS** transactional templates (server-side, private-key signed) |
| Build target | Server runtime via Next.js **standalone** output (Docker-ready) |

### Project structure

```
app/
  layout.tsx              # Root layout: fonts, dark theme, metadata, theme-init
  (site)/                 # Public site (shared layout, loading, error, template)
    page.tsx              # Homepage (Hero, services, achievements, process, etc.)
    about/  services/  projects/  contact/
  api/
    chat/route.ts         # Groq proxy (hardened)
    contact/route.ts      # EmailJS dual-send (hardened)
components/site/          # Page sections & UI (Hero, Services, AIAssistant, Contact, ...)
lib/
  site/                   # Content & config: services, nav, social, metadata
  chat/                   # System prompt + chat request validation
  contact/                # EmailJS config, send logic, validation, error mapping
  api/                    # same-origin guard, rate limiter, fetch timeout, logging
  hooks.ts  motion.ts     # Hydration-safe hooks + shared motion presets
scripts/                  # Dev-cache verification + image conversion utilities
public/images/            # Optimized (AVIF) site imagery
Dockerfile                # Multi-stage production image
```

**Routes:** `/` · `/about` · `/services` · `/projects` · `/contact` (+ API: `/api/chat`, `/api/contact`).

## 8. Key features

- Fully responsive, animated dark-theme marketing site with cinematic, accessible section design.
- Hydration-safe client logic via `useSyncExternalStore`-based hooks ([`lib/hooks.ts`](lib/hooks.ts)).
- Reduced-motion support throughout (animations respect user OS preferences).
- Route-level and global error boundaries, custom `not-found`, and loading states.
- Centralized content model — services, navigation, and contact details have a single source of truth in `lib/site/`.
- SEO-ready metadata and Open Graph tags per page.

## 9. Performance optimizations

- **Image pipeline:** all photographic assets converted to **AVIF** and served through `next/image` with explicit `sizes`/`quality`; large hero/background masters were re-encoded for ~96% size reduction.
- **Lazy loading:** below-the-fold imagery is `loading="lazy"`; only the LCP hero image is prioritized.
- **Standalone output:** minimal production server bundle for fast cold starts and small container images.
- **Scoped remote images:** only `images.unsplash.com` is allowed via `next.config.ts` `remotePatterns`.
- **Lean dependency set** and Turbopack-powered local development.

## 10. Security & production hardening

Implemented in [`lib/api/`](lib/api/) and [`next.config.ts`](next.config.ts), and verified against a production build:

- **Security headers on every response:** Content-Security-Policy (with a hashed inline theme script and `connect-src` scoped to `api.groq.com` / `api.emailjs.com`), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.
- **Same-origin guard** on both API routes — cross-origin POSTs are rejected with `403` (relaxed in development for tooling).
- **Per-route, per-IP rate limiting** — contact: 5 requests / 15 min; chat: 10 requests / min. *(In-memory/per-instance by design — swap for Vercel KV / Upstash before scaling horizontally.)*
- **Input validation** on every request: message-array shape/role/length caps for chat; field validation, length limits, and project-type allow-listing for contact.
- **Payload-size limits** (413 before parsing): 32 KiB body cap on both routes.
- **Upstream fetch timeouts** (12 s on Groq) to prevent hung serverless functions.
- **Sanitized responses & structured logging** — the chat route returns only `{ message }` (never raw upstream errors); both routes emit JSON logs without leaking secrets.
- **Secrets stay server-side** — `GROQ_API_KEY` and `EMAILJS_PRIVATE_KEY` are never exposed to client bundles (verified by static-bundle scan). Only intentionally public EmailJS IDs/public key may appear in the client, by EmailJS design.
- **Bot mitigation** — hidden honeypot field on the contact form.

---

## Getting started

### Prerequisites
- **Node.js 20+** and npm
- API credentials: a **Groq** API key and an **EmailJS** account with two templates (admin notification + user confirmation)

### 1. Install

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable | Scope | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Server only | Authenticates `/api/chat` with Groq. Get one at <https://console.groq.com/keys>. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Public | EmailJS service ID. |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public | EmailJS public key. |
| `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID` | Public | Template for the team's lead notification. |
| `NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID` | Public | Template for the prospect's confirmation. |
| `EMAILJS_PRIVATE_KEY` | **Server only** | Required when "Use Private Key" is enabled in EmailJS security settings. **Never** prefix with `NEXT_PUBLIC_`. |

> `.env` is git-ignored. Never commit real secrets. Rotate any key that may have been shared or exposed.

### 3. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>.

**Dev cache note:** `npm run dev` runs a `predev` check ([`scripts/verify-dev-cache.mjs`](scripts/verify-dev-cache.mjs)) that clears a stale `.next/dev` cache (which can cause 404s on slow/network drives). If issues persist:

```bash
npm run dev:clean    # force-clear cache, then start (Turbopack)
npm run dev:reset    # full dev-cache reset
npm run dev:webpack  # start with the Webpack dev server instead of Turbopack
```

### 4. Build & run in production

```bash
npm run build        # produces the standalone server in .next/standalone
node .next/standalone/server.js
```

> **Important:** the production entrypoint is `node .next/standalone/server.js` (as used in the Dockerfile). Do **not** use `next start` — it is incompatible with `output: "standalone"`.

### 5. Lint

```bash
npm run lint
```

## Deployment

The repo ships a multi-stage [`Dockerfile`](Dockerfile) (Node 20 Alpine) that installs dependencies, builds, and runs the standalone server as a non-root user on port `3000`:

```bash
docker build -t bimbuilders .
docker run -p 3000:3000 --env-file .env bimbuilders
```

The app can also be deployed to any Node-compatible host or platform (e.g. Vercel). Ensure all environment variables above are configured in the target environment.

**Pre-launch checklist** (see `audit.txt` for the full report):
- [ ] All environment variables set in the target environment
- [ ] Secrets rotated if previously shared/committed
- [ ] EmailJS templates verified end-to-end (admin + user emails)
- [ ] Run production via `node server.js` (not `next start`)
- [ ] Consider a durable rate-limit store (Vercel KV / Upstash) before scaling to multiple instances

---

## Maintainer notes

- **Content lives in `lib/site/`** — update services in `services-data.ts`, navigation in `nav.ts`, and contact/social details in `social.ts`. These are the single sources of truth consumed across pages, the contact validator, and the AI assistant's allowed project types.
- **The AI assistant's behavior** is controlled entirely by `lib/chat/system-prompt.ts` (server-side).
- **If you edit the inline theme-init script** in `app/layout.tsx`, recompute its SHA-256 and update `THEME_INIT_SCRIPT_HASH` in `next.config.ts`, or the CSP will block it (instructions are in the config comments).

_© BIM Builders. All rights reserved._

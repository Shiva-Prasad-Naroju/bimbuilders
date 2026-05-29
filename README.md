# BIM Builders

**Precision BIM that makes your designs build-ready.**

The official website for **BIM Builders** — a professional Building Information Modeling (BIM) company serving the Architecture, Engineering & Construction (AEC) industry across India, the Middle East, Europe, and the US.

🌐 [info@bimbuilders.in](mailto:info@bimbuilders.in) · +91 79810 72411

---

## Who we are

BIM Builders is a team of BIM specialists that turns design intent into coordinated, clash-free, build-ready models. We create data-rich Revit models, multi-discipline coordination, and construction documentation that fit cleanly into how our clients actually build — from early concept through fabrication and lifecycle operations.

- **Mission:** Empower the AEC industry with precise, data-driven BIM that cuts rework and sharpens every decision.
- **Vision:** Become the BIM partner teams trust globally — where design, data, and delivery meet.
- **Values:** Accuracy · Innovation · Transparency · Collaboration.

## Why this website exists

This site is the company's storefront and primary point of contact. It exists to:

- Present BIM Builders' capabilities clearly and professionally.
- Help visitors understand which services fit their project.
- Make it effortless to start a conversation and request a quote.

In short, it helps potential clients learn what we do — and get in touch quickly.

## How it helps our clients

The website is built around the people who hire us:

- **Architects & designers** — see how design intent becomes coordinated, build-ready models.
- **Structural & MEP engineers** — understand our coordination and clash-detection workflow.
- **Contractors & site teams** — find the construction-ready drawings they can build from.
- **Developers & owners** — explore as-built, quantity, and lifecycle-grade BIM services.
- **Fabricators** — review our Light Gauge Steel and modular/prefabrication capabilities.

Every visitor gets a clear path from "what does this company do?" to "let's talk about my project."

## Key services

- **BIM Modeling** — architectural & structural Revit models (LOD 100–500) from CAD, PDF, or concepts.
- **BIM Coordination & Clash Detection** — multi-discipline coordination with clash reports and resolution support.
- **Shop Drawings** — construction-ready architectural & structural documentation.
- **Masonry Shop Drawings** — CMU/block-work layouts, reinforcement, and details.
- **Light Gauge Steel (LGS)** — fabrication-ready cold-formed steel framing and detailing.
- **Scan to BIM** — accurate as-built models from point-cloud data.
- **Quantity Take-Off & BOM** — model-driven quantities for estimation and procurement.
- **Modular & Prefabrication BIM** — design-to-manufacturing coordination.
- **Digital Twin & Advanced BIM** — lifecycle-grade, highly coordinated models.
- **BIM Automation (Dynamo)** — automation that speeds delivery and keeps standards consistent.

## Website features

- **AI Assistant** — a built-in chat assistant that answers questions about our services and helps visitors describe their project and get pointed in the right direction, any time of day.
- **Contact form** — a simple enquiry form that notifies our team and sends the visitor an automatic confirmation, so no message goes unanswered.
- **Service pages** — clear, detailed pages for every service we offer.
- **Project showcase** — a dedicated projects page highlighting our work.
- **Polished experience** — a fast, fully responsive, animated design that works beautifully on every device.

## Technology stack

Built with a modern, well-supported web stack:

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animation
- **Groq** powers the AI assistant; **EmailJS** powers the contact emails

---

## Getting started

**Prerequisites:** Node.js 20+ and npm.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables** (see below)

   ```bash
   cp .env.example .env
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

> If pages don't load after adding routes, run `npm run dev:clean` for a fresh start.

## Environment variables

Copy `.env.example` to `.env` and fill in your own values:

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Powers the AI assistant. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID. |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key. |
| `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID` | Template for team notifications. |
| `NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID` | Template for visitor confirmations. |
| `EMAILJS_PRIVATE_KEY` | EmailJS private key (server only). |

> `.env` is never committed. Keep your keys private.

## Build & deployment

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
node .next/standalone/server.js
```

The project also includes a `Dockerfile` for containerized deployment:

```bash
docker build -t bimbuilders .
docker run -p 3000:3000 --env-file .env bimbuilders
```

It can be deployed to any Node-compatible host. Just make sure the environment variables above are set in your hosting environment.

---

_© BIM Builders. All rights reserved._

/**
 * Runs before `npm run dev` (see the `predev` script in package.json).
 *
 * Why this exists
 * ---------------
 * Next.js 16 enables Turbopack's persistent dev filesystem cache by default
 * (`experimental.turbopackFileSystemCacheForDev`, on since v16.1). The cache is
 * stored in `.next/dev`. When the *route graph* changes between sessions — a
 * page is added, moved, or deleted (e.g. relocating `app/(site)/(internal)/about`
 * to `app/(site)/about`) — a stale cache can keep resolving the old tree and
 * serve `404` for routes that now exist on disk. On slow or synced drives the
 * cache is also more prone to landing in an inconsistent state.
 *
 * What it does
 * ------------
 * 1. Fails fast if a required route file is missing (clear message > cryptic 404).
 * 2. Records a signature of the *set* of route-defining files. If that set has
 *    changed since the last dev session (or no signature exists), it clears
 *    `.next/dev` so Turbopack rebuilds the route graph from scratch.
 *
 * Editing the *contents* of a route file does NOT invalidate the cache — Fast
 * Refresh handles that — so this never over-clears on ordinary edits.
 *
 * Use `npm run dev:clean` (passes --force) to clear unconditionally.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

/** Always the repo root (parent of scripts/), not the shell cwd. */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");

if (
  !fs.existsSync(path.join(root, "package.json")) ||
  !fs.existsSync(path.join(root, "next.config.ts"))
) {
  console.error("[dev] Could not locate project root from scripts/verify-dev-cache.mjs");
  process.exit(1);
}

if (process.cwd() !== root) {
  console.warn(
    `[dev] Shell cwd is ${process.cwd()} — using project root ${root} for route checks and cache.`
  );
  console.warn("[dev] Prefer: cd to bimbuilders/ before npm run dev");
}

const appDir = path.join(root, "app");
const devCacheDir = path.join(root, ".next", "dev");
const signatureFile = path.join(devCacheDir, ".route-graph-signature");

// These files define which routes exist. Their presence/location — not their
// contents — is what the Turbopack route cache must stay in sync with.
const ROUTE_FILE_RE =
  /^(page|route|layout|template|default|not-found|loading|error|global-error)\.(tsx?|jsx?|mdx)$/;

const requiredRouteFiles = [
  "app/(site)/page.tsx",
  "app/(site)/about/page.tsx",
  "app/(site)/contact/page.tsx",
  "app/(site)/services/page.tsx",
  "app/(site)/projects/page.tsx",
];

for (const file of requiredRouteFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`[dev] Missing required route file: ${file}`);
    console.error("[dev] Aborting before next dev to avoid confusing 404s.");
    console.error(
      "[dev] If you started dev from app/, stop the server and run from the project root instead."
    );
    process.exit(1);
  }
}

/** Recursively collect the relative paths of all route-defining files under app/. */
function collectRouteGraph(dir, acc) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    // Skip dotfiles and nested node_modules; route groups like "(site)" are kept.
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectRouteGraph(full, acc);
    } else if (ROUTE_FILE_RE.test(entry.name)) {
      acc.push(path.relative(root, full).split(path.sep).join("/"));
    }
  }
  return acc;
}

function currentSignature() {
  const files = collectRouteGraph(appDir, []).sort();
  return crypto.createHash("sha1").update(files.join("\n")).digest("hex");
}

function clearDevCache(reason) {
  console.warn(`[dev] ${reason}`);
  console.warn("[dev] Clearing .next/dev — first compile may take a little longer.");
  fs.rmSync(devCacheDir, { recursive: true, force: true });
}

const signature = currentSignature();

if (force) {
  clearDevCache("Clean dev start requested (--force).");
} else if (fs.existsSync(devCacheDir)) {
  let stored = null;
  try {
    stored = fs.readFileSync(signatureFile, "utf8").trim();
  } catch {
    /* signature file absent or unreadable — treat as changed */
  }
  if (stored !== signature) {
    clearDevCache(
      stored
        ? "Route graph changed since last dev session — refreshing Turbopack cache."
        : "No route-graph signature found — refreshing Turbopack cache once."
    );
  }
}

// Persist the current signature for the next session (recreate the dir if we
// just cleared it; Next will populate the rest on first compile).
fs.mkdirSync(devCacheDir, { recursive: true });
fs.writeFileSync(signatureFile, `${signature}\n`);

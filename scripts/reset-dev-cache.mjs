/**
 * Full Turbopack dev cache reset. Use when you see:
 * - 404 on / or /contact with routes present on disk
 * - SST / ENOENT / TurbopackInternalError / "Compaction failed"
 *
 * Stop all `next dev` processes first (Ctrl+C in every terminal).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

if (!fs.existsSync(path.join(root, "package.json"))) {
  console.error("[dev] Project root not found:", root);
  process.exit(1);
}

console.warn("[dev] Removing .next (Turbopack + build cache)...");
console.warn("[dev] Stop all `npm run dev` terminals first (Ctrl+C), or deletion may fail on Windows.");
try {
  fs.rmSync(nextDir, {
    recursive: true,
    force: true,
    maxRetries: 12,
    retryDelay: 250,
  });
} catch (err) {
  console.error("[dev] Could not delete .next — is `next dev` still running?");
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
console.warn("[dev] Done. Stop all other next dev processes, then from project root: npm run dev");
console.warn("[dev] Default dev uses webpack (stable on Windows). Use npm run dev:turbo to try Turbopack.");
console.warn(`[dev]   cd ${root}`);

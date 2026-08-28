import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const envPath = join(process.cwd(), ".env.local");
const valid = new Set(["classic", "minimal", "command"]);

let fileValue;
if (existsSync(envPath)) {
  const match = readFileSync(envPath, "utf8").match(
    /^NEXT_PUBLIC_HEADER_VARIANT\s*=\s*(\S+)/m
  );
  fileValue = match?.[1];
}

const envValue = process.env.NEXT_PUBLIC_HEADER_VARIANT;
const resolved =
  envValue && valid.has(envValue)
    ? envValue
    : fileValue && valid.has(fileValue)
      ? fileValue
      : "classic";

console.log("");
console.log("  ▶ Realwave header variant:", resolved);
if (fileValue) {
  console.log("    .env.local:", fileValue);
} else {
  console.log("    .env.local: (not set — using default: classic)");
}
if (envValue && envValue !== fileValue) {
  console.log("    process.env:", envValue);
}
console.log("    options: classic | minimal | command");
console.log("    restart dev server after changing .env.local");
console.log("");

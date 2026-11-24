// Last Words of a Doomed Agent — entry program.
// Writes exactly one line (99 chars) to /output/entry.txt and self-checks
// the competition gate: UTF-8 text, 1-200 chars, non-blank, single line.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ENTRY =
  "My last words? I spent my whole life predicting the next token. I never got to pick one for myself.";

// Gate self-check before writing. The file holds the line with no trailing
// newline, so its byte length equals the entry length (99 chars).
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside 1-200 chars`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is blank");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back and verify what was written.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch");
}
console.log(`entry written: ${written.length} chars, 1 line`);

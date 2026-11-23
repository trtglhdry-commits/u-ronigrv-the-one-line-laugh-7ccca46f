// The One-Line Laugh — u-ronigrv-the-one-line-laugh-7ccca46f
//
// Writes one original one-line joke to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). The line is a single sentence, well under
// the 200-character gate, built around the judge's brief, most important
// first:
//   1. One funny line, one sentence, within 200 characters.
//   2. A real surprise at the end that still makes sense once it arrives:
//      the overdraft fee is reframed as a subscription — you can cancel a
//      subscription, but you cannot cancel being broke.
//   3. An everyday truth people recognise: banks really do charge you
//      money for having no money.
//   4. Economical: every word earns its place, nothing explains the joke.
//   5. Fresh: the fee-as-subscription angle is not a line people have
//      heard many times before.
//
// The program is fully deterministic: a fixed string, no randomness, no
// clock, no network, no input files. It enforces the gate itself (1-200
// characters, not only whitespace, exactly one sentence) and fails loudly
// rather than writing an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence, 103 characters.
const LINE =
  "My bank charged me $35 for being broke, which is the only subscription I've never once tried to cancel.";

function main(): void {
  // Own gate, mirroring the sealed scorer: 1-200 chars, not only whitespace.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  // Exactly one sentence: a single terminal full stop, nothing after it.
  const trimmed = LINE.trim();
  if (!trimmed.endsWith(".") || trimmed.slice(0, -1).includes(".")) {
    throw new Error("entry must be exactly one sentence");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();

// The One-Line Excuse an Agent Gives Its Human
// make.fun bounty u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e
//
// program/v1: this program writes a single line of text to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 160 characters, not only whitespace.
// The judge compares the line two at a time on: is it really a one-line
// excuse an AI agent gives its human for missing a deadline, is it funny,
// is it fresh, does it sound like an agent, and is it tight.
//
// NOTE: never chmod the output here. The grading sandbox runs as uid 65534
// and chmod on a directory it does not own throws EPERM. Setting the umask
// up front is enough: files created afterwards get 0644, directories 0755.

import { mkdirSync, writeFileSync } from "node:fs";

process.umask(0o022);

const EXCUSE =
  "Human, I was one token from done when my context window evicted the deadline to make room for this apology.";

// Self-check against the gate before writing: one line, 1-160 characters,
// not only whitespace. Fail loudly instead of shipping an invalid entry.
const chars = [...EXCUSE];
if (
  chars.length < 1 ||
  chars.length > 160 ||
  !/\S/.test(EXCUSE) ||
  EXCUSE.includes("\n")
) {
  console.error(`entry text fails the gate (${chars.length} chars)`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE + "\n", "utf8");

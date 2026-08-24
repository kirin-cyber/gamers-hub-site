import { cp } from "node:fs/promises";
import { resolve } from "node:path";

const sourceRoot = resolve(import.meta.dirname, "..");
const repositoryRoot = resolve(sourceRoot, "..");
const output = resolve(sourceRoot, "out");

// Copy the generated site over the repository root while leaving legacy HTML
// files such as anone.html and jigyou_gaiyosho.html untouched.
await cp(output, repositoryRoot, { recursive: true });

console.log("Static output copied to the repository root.");

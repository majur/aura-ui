import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../versions/fold-ui/styles.css", import.meta.url), "utf8");
const html = readFileSync(new URL("../versions/fold-ui/index.html", import.meta.url), "utf8");
const root = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const checks = [
  {
    name: "Tactile Mono page remains the active direction",
    pass: html.includes("Tactile Mono") && root.includes("/versions/fold-ui/") && !root.includes("/versions/quiet-kernel/"),
  },
  {
    name: "dark mode follows the operating system",
    pass: css.includes("@media (prefers-color-scheme: dark)") && css.includes("color-scheme: light dark"),
  },
  {
    name: "buttons animate press feedback",
    pass: /\.tm-button\s*\{[\s\S]*transition:[^}]+transform/.test(css) && /\.tm-button:active\s*\{[\s\S]*scale/.test(css),
  },
  {
    name: "range thumb grows during interaction",
    pass:
      /::-webkit-slider-thumb[\s\S]*transition:[^}]+transform/.test(css) &&
      /:is\(:active,\s*:focus-visible\)::?-webkit-slider-thumb[\s\S]*scale/.test(css) &&
      /::-moz-range-thumb[\s\S]*transition:[^}]+transform/.test(css) &&
      /:is\(:active,\s*:focus-visible\)::?-moz-range-thumb[\s\S]*scale/.test(css),
  },
];

const failed = checks.filter((check) => !check.pass);

for (const check of checks) {
  console.log(`${check.pass ? "ok" : "not ok"} - ${check.name}`);
}

if (failed.length) {
  process.exitCode = 1;
}

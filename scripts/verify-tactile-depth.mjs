import { existsSync, readFileSync } from "node:fs";

const root = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const htmlUrl = new URL("../versions/tactile-depth/index.html", import.meta.url);
const cssUrl = new URL("../versions/tactile-depth/styles.css", import.meta.url);
const htmlExists = existsSync(htmlUrl);
const cssExists = existsSync(cssUrl);
const html = htmlExists ? readFileSync(htmlUrl, "utf8") : "";
const css = cssExists ? readFileSync(cssUrl, "utf8") : "";

const checks = [
  {
    name: "root links both Tactile Mono and Tactile Depth for comparison",
    pass: root.includes("/versions/fold-ui/") && root.includes("/versions/tactile-depth/"),
  },
  {
    name: "Tactile Depth page and CSS exist",
    pass: htmlExists && cssExists && html.includes("Tactile Depth"),
  },
  {
    name: "Tactile Depth follows operating system dark mode",
    pass: css.includes("color-scheme: light dark") && css.includes("@media (prefers-color-scheme: dark)"),
  },
  {
    name: "components use spatial physical depth tokens",
    pass: css.includes("--lift-1") && css.includes("--lift-2") && css.includes("--press-depth") && css.includes("perspective:"),
  },
  {
    name: "buttons have deeper physical press animation",
    pass: /\.td-button\s*\{[\s\S]*transition:[^}]+transform/.test(css) && /\.td-button:active\s*\{[\s\S]*translateY\([^)]*px\)[\s\S]*scale/.test(css),
  },
  {
    name: "range thumb enlarges during interaction",
    pass:
      /::-webkit-slider-thumb[\s\S]*transition:[^}]+transform/.test(css) &&
      /:is\(:active,\s*:focus-visible\)::-webkit-slider-thumb[\s\S]*scale/.test(css) &&
      /::-moz-range-thumb[\s\S]*transition:[^}]+transform/.test(css) &&
      /:is\(:active,\s*:focus-visible\)::-moz-range-thumb[\s\S]*scale/.test(css),
  },
];

const failed = checks.filter((check) => !check.pass);

for (const check of checks) {
  console.log(`${check.pass ? "ok" : "not ok"} - ${check.name}`);
}

if (failed.length) {
  process.exitCode = 1;
}

// Makes WebP variants of every image under static/work and records them in static/img.json, which
// src/build.mjs reads to emit src/srcset. Run it after adding or replacing images:
//   node scripts/images.mjs            (only images without variants)
//   node scripts/images.mjs --all      (redo everything)
// Needs no packages: macOS `sips` reads image sizes and Google Chrome encodes WebP (createImageBitmap
// resizes, OffscreenCanvas encodes), driven over the DevTools protocol. The originals stay in place
// for og:image and the "Open full size" links.
import { spawn, execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";

const STATIC = new URL("../static/", import.meta.url).pathname;
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const QUALITY = 0.82; // UI screenshots with small text: lower values blur type
const WIDTHS = [800, 1200, 1600, 2400];
const all = process.argv.includes("--all");

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
// Skip the top-level work/*.png originals (not published) and the older -900.jpg cuts.
const sources = walk(STATIC + "work").filter((f) => /\.(jpe?g|png)$/i.test(f) && !/-\d+\.\w+$/.test(f) && relative(STATIC + "work", f).includes("/"));
const manifestPath = STATIC + "img.json";
const manifest = existsSync(manifestPath) && !all ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

const size = (f) => execFileSync("sips", ["-g", "pixelWidth", f], { encoding: "utf8" }).match(/pixelWidth: (\d+)/)[1] | 0;
const todo = sources.filter((f) => !manifest[relative(STATIC, f)]);
if (!todo.length) { console.log("All images have WebP variants."); process.exit(0); }

const dir = mkdtempSync(join(tmpdir(), "img-"));
const port = 9500 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
for (let i = 0; i < 50 && !ws; i++) {
  await sleep(200);
  const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json()).catch(() => null);
  const page = list && list.find((t) => t.type === "page");
  if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const evaluate = (expression) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: "Runtime.evaluate", params: { expression, awaitPromise: true, returnByValue: true } })); });

let before = 0, after = 0;
for (const f of todo) {
  const rel = relative(STATIC, f), w = size(f);
  const widths = [...WIDTHS.filter((x) => x < w), Math.min(w, WIDTHS.at(-1))].filter((x, i, a) => a.indexOf(x) === i);
  const b64 = readFileSync(f).toString("base64");
  const r = await evaluate(`(async () => {
    const src = await (await fetch("data:image/*;base64,${b64}")).blob(), out = {};
    for (const w of ${JSON.stringify(widths)}) {
      const bmp = await createImageBitmap(src, { resizeWidth: w, resizeQuality: "high" });
      const c = new OffscreenCanvas(bmp.width, bmp.height); c.getContext("2d").drawImage(bmp, 0, 0);
      const blob = await c.convertToBlob({ type: "image/webp", quality: ${QUALITY} });
      const bytes = new Uint8Array(await blob.arrayBuffer()); let s = "";
      for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode(...bytes.subarray(i, i + 32768));
      out[w] = btoa(s);
    }
    return out;
  })()`);
  if (r.result.exceptionDetails || !r.result.result.value) { console.error("failed:", rel, JSON.stringify(r.result.exceptionDetails || r.result).slice(0, 200)); continue; }
  for (const [vw, data] of Object.entries(r.result.result.value)) {
    const out = f.replace(/\.\w+$/, `-${vw}.webp`);
    writeFileSync(out, Buffer.from(data, "base64"));
    if (+vw === widths.at(-1)) after += statSync(out).size;
  }
  before += statSync(f).size;
  manifest[rel] = widths;
  console.log(`${rel}  ${w}px → ${widths.join(", ")}`);
}
writeFileSync(manifestPath, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 1) + "\n");
console.log(`${todo.length} images: ${(before / 1048576).toFixed(1)}MB originals → ${(after / 1048576).toFixed(1)}MB at the largest WebP width`);
ws.close(); chrome.kill(); await sleep(300); rmSync(dir, { recursive: true, force: true });

// Encrypts the private interview assignment so the public site holds only ciphertext.
//   node scripts/lock.mjs <password>
// The assignment's data and images live in private/assignment/ (ignored by git; keep your own backup).
// It renders the page through the normal build (EXPORT_PRIVATE=1), inlines the images, and writes
// static/private/assignment.enc (PBKDF2-SHA256 + AES-256-GCM) and a tiny blurred cover for the home page card
// (static/private/assignment-blur.txt). The password is never stored.
// Run `npm run build` afterwards; the card is in src/build.mjs and the unlock dialog in static/main.js.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomBytes, pbkdf2Sync, createCipheriv } from "node:crypto";

const ROOT = new URL("../", import.meta.url).pathname;
const DIR = ROOT + "private/assignment/";
const password = process.argv[2];
if (!password) { console.error("Usage: node scripts/lock.mjs <password>"); process.exit(1); }

execFileSync("node", [ROOT + "src/build.mjs"], { env: { ...process.env, EXPORT_PRIVATE: "1" }, stdio: "inherit" });
let html = readFileSync(DIR + "export.html", "utf8");

// show everything at once: nothing observes elements added after the page loads
html = html.replace(/\sclass="([^"]*)"/g, (m, c) => ` class="${c.split(/\s+/).filter((x) => x && x !== "reveal" && x !== "rise").join(" ")}"`);
// full-size links would open a data: URL, which browsers block, so keep only the images
html = html.replace(/<a href="\.\.\/work\/[^"]*"[^>]*title="Open full size">(<img[^>]*>)<span class="sr">[^<]*<\/span><\/a>/g, "$1");

const dataUri = (rel) => {
  const base = DIR + "files/" + rel.replace(/^\.\.\//, "");
  const wide = base.replace(/\.\w+$/, rel.includes("covers/") ? "-1200.webp" : "-1600.webp");
  const file = existsSync(wide) ? wide : base;
  return `data:image/${file.endsWith(".webp") ? "webp" : "jpeg"};base64,${readFileSync(file).toString("base64")}`;
};
html = html.replace(/\ssrcset="[^"]*"/g, "").replace(/\ssizes="[^"]*"/g, "");
html = html.replace(/src="(\.\.\/work\/[^"]+\.(?:jpg|png))"/g, (_, rel) => `src="${dataUri(rel)}"`);
// the case opens in a dialog on the home page (src/main.js), so links are written for the site root, and the
// duplicate id of the page's own <main> is renamed
html = html.replace(/href="\.\.\/(?!work\/)/g, 'href="').replace(/href="([a-z0-9-]+\.html)"/g, 'href="work/$1"').replace('id="main"', 'id="private-main"');
const left = [...html.matchAll(/(?:src|href)="(\.\.\/work\/[^"]+)"/g)].map((m) => m[1]);
if (left.length) { console.error("Unresolved asset links:", left.slice(0, 5)); process.exit(1); }

// the card on the home page shows the cover as a 40px-wide thumbnail, blurred further in CSS: colour and mood only
const cover = DIR + "files/work/covers/assignment.jpg", tiny = ROOT + "private/blur.jpg";
execFileSync("sips", ["-Z", "40", "-s", "format", "jpeg", "-s", "formatOptions", "50", cover, "--out", tiny], { stdio: "ignore" });
writeFileSync(ROOT + "static/private/assignment-blur.txt", `data:image/jpeg;base64,${readFileSync(tiny).toString("base64")}`);

const iter = 600000, salt = randomBytes(16), iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", pbkdf2Sync(password, salt, iter, 32, "sha256"), iv);
const data = Buffer.concat([cipher.update(html, "utf8"), cipher.final(), cipher.getAuthTag()]); // WebCrypto expects the tag at the end
writeFileSync(ROOT + "static/private/assignment.enc", JSON.stringify({ v: 1, iter, salt: salt.toString("base64"), iv: iv.toString("base64"), data: data.toString("base64") }));
console.log(`Encrypted ${(html.length / 1024).toFixed(0)}KB of page into static/private/assignment.enc (${(data.length / 1024).toFixed(0)}KB)`);

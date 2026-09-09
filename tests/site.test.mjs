import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}

test("page server-renders portfolio content, metadata, and all navigation targets", async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const id of [
    "about",
    "projects",
    "expertise",
    "skills",
    "contact",
    "aegis-case-title",
    "kasvin-case-title",
    "grains-case-title",
  ])
    assert.ok(html.includes(`id="${id}"`), id);
  for (const text of [
    "Kelvin Kyere | Portfolio",
    "Website Development",
    "Kasvin Homes",
    "Grains Depot",
    "PostgreSQL",
  ])
    assert.ok(html.includes(text), text);
  assert.match(html, /<main>/);
  assert.match(html, /name="description"/);
  assert.match(html, /property="og:title"/);
});

test("CV is a PDF and original CV URL redirects to the same document", async () => {
  const response = await fetch(`${base}/media/documents/cv.pdf`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/pdf/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  assert.deepEqual(bytes, await readFile("public/media/documents/cv.pdf"));
  const old = await fetch(`${base}/Kelvin%20Kwasi%20Kyere.pdf`, {
    redirect: "manual",
  });
  assert.equal(old.status, 308);
  assert.ok(old.headers.get("location").endsWith("/media/documents/cv.pdf"));
});

test("every media file serves successfully and images have no byte-identical duplicates", async () => {
  const hashes = new Map();
  for (const file of await files("public/media")) {
    if (file.endsWith(".gitkeep")) continue;
    const digest = createHash("sha256")
      .update(await readFile(file))
      .digest("hex");
    assert.ok(!hashes.has(digest), `${file} duplicates ${hashes.get(digest)}`);
    hashes.set(digest, file);
    const response = await fetch(
      `${base}/${file.replaceAll(path.sep, "/").replace(/^public\//, "")}`,
      { method: "HEAD" },
    );
    assert.equal(response.status, 200, file);
  }
});

test("source media references resolve and public directory stays centralized", async () => {
  const publicEntries = await readdir("public");
  assert.deepEqual(publicEntries, ["media"]);
  const sources = (await files("src")).filter((file) =>
    /\.(tsx?|css)$/.test(file),
  );
  const media = new Set();
  for (const file of sources) {
    const source = await readFile(file, "utf8");
    for (const match of source.matchAll(/(?:"|')((?:\/media\/)[^"']+)(?:"|')/g))
      media.add(match[1]);
  }
  assert.ok(media.size > 20);
  for (const url of media)
    await assert.doesNotReject(readFile(`public${url}`), url);
  for (const file of await files("public/media/images")) {
    const url = "/" + file.replaceAll(path.sep, "/").replace(/^public\//, "");
    assert.ok(media.has(url), `Unreferenced image: ${file}`);
  }
});

test("Next image optimizer returns an image and missing routes return 404", async () => {
  const optimized = await fetch(
    `${base}/_next/image?url=%2Fmedia%2Fimages%2Fme.jpg&w=640&q=75`,
  );
  assert.equal(optimized.status, 200);
  assert.match(optimized.headers.get("content-type"), /^image\//);
  assert.equal((await fetch(`${base}/does-not-exist`)).status, 404);
});

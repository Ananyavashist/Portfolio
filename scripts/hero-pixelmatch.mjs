import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "pixel-diff");
const referenceSrc = join(root, "public", "reference.png");
const VIEW_W = 1689;
const VIEW_H = 931;
const BASE = process.env.HERO_LOCK_URL ?? "http://localhost:3000/hero-lock/";

function readPng(path) {
  return new Promise((resolve, reject) => {
    createReadStream(path)
      .pipe(new PNG())
      .on("parsed", function parsed() {
        resolve(this);
      })
      .on("error", reject);
  });
}

function resizeWithSips(input, output, width, height) {
  const result = spawnSync(
    "sips",
    [
      "-s",
      "format",
      "png",
      "--resampleHeightWidth",
      String(height),
      String(width),
      input,
      "--out",
      output,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(result.stderr || "sips failed");
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const actualPath = join(outDir, "actual.png");
  const actualComparePath = join(outDir, "actual-1024.png");
  const referencePng = join(outDir, "reference.png");
  const diffPath = join(outDir, "diff.png");

  if (!existsSync(referenceSrc)) {
    throw new Error("Missing public/reference.png");
  }

  const native = spawnSync(
    "sips",
    ["-g", "pixelWidth", "-g", "pixelHeight", referenceSrc],
    { encoding: "utf8" },
  );
  const nativeW = Number(/pixelWidth: (\d+)/.exec(native.stdout)?.[1] ?? VIEW_W);
  const nativeH = Number(/pixelHeight: (\d+)/.exec(native.stdout)?.[1] ?? VIEW_H);

  spawnSync("sips", ["-s", "format", "png", referenceSrc, "--out", referencePng], {
    encoding: "utf8",
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: VIEW_H },
    deviceScaleFactor: 1,
  });

  await page.addInitScript(() => {
    const style = document.createElement("style");
    style.textContent =
      "*, *::before, *::after { animation: none !important; transition: none !important; } nextjs-portal { display: none !important; }";
    document.documentElement.appendChild(style);
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: actualPath, animations: "disabled" });
  await browser.close();

  resizeWithSips(actualPath, actualComparePath, nativeW, nativeH);

  const img1 = await readPng(referencePng);
  const img2 = await readPng(actualComparePath);
  const width = Math.min(img1.width, img2.width);
  const height = Math.min(img1.height, img2.height);
  const diff = new PNG({ width, height });
  const mismatch = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
  });
  await new Promise((resolve, reject) => {
    diff
      .pack()
      .pipe(createWriteStream(diffPath))
      .on("finish", resolve)
      .on("error", reject);
  });

  const total = width * height;
  const percent = ((mismatch / total) * 100).toFixed(3);
  const report = `viewport: ${VIEW_W}x${VIEW_H} dpr=1
mismatched: ${mismatch} / ${total} (${percent}%)
actual: ${actualPath}
diff: ${diffPath}
`;
  await writeFile(join(outDir, "report.txt"), report);
  console.log(report);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

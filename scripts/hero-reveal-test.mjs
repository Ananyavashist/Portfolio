import { chromium } from "playwright";

const BASE = process.env.HERO_REVEAL_URL ?? "http://localhost:3000/";
const VIEWPORTS = [
  [1689, 931],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [834, 1194],
  [390, 844],
  [375, 812],
  [320, 800],
];
const REVEAL_PROGRESS = [0, 0.25, 0.5, 0.75, 1];
const REVEAL_SVH = 0.9;

function parseInset(clipPath) {
  const match =
    /inset\(\s*([\d.]+)(%|px)(?:\s+([\d.]+)(%|px))?(?:\s+([\d.]+)(%|px))?(?:\s+([\d.]+)(%|px))?/.exec(
      clipPath,
    );
  if (!match) return null;
  const a = Number(match[1]);
  const b = Number(match[3] ?? match[1]);
  const c = Number(match[5] ?? match[1]);
  const d = Number(match[7] ?? match[3] ?? match[1]);
  return [a, b, c, d];
}

async function sample(page) {
  return page.evaluate(() => {
    const shell = document.getElementById("HeroShell");
    const artboard = document.getElementById("HeroArtboard");
    const action = document.getElementById("HeroBuildAction");
    const link = document.getElementById("HeroBuildLink");
    const frame = document.getElementById("ProjectMediaFrame");
    const track = document.getElementById("ProjectImageTrack");
    const scaleNode = document.querySelector("[data-hero-stage-scale]");
    const identity = document.getElementById("HeroIdentity");
    const crafting = [...document.querySelectorAll("#HeroArtboard p")].find(
      (node) => node.textContent === "Crafting",
    );
    if (!shell || !artboard) {
      return { error: "missing-shell" };
    }
    const rect = shell.getBoundingClientRect();
    return {
      shell: {
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      },
      clipPath: getComputedStyle(shell).clipPath,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      scale: Number(scaleNode?.getAttribute("data-hero-stage-scale") ?? "NaN"),
      craftingSize: crafting ? getComputedStyle(crafting).fontSize : "",
      actionTabIndex: action?.tabIndex ?? null,
      actionDisabled: action?.getAttribute("aria-disabled") === "true",
      viewWork: link?.textContent?.trim() ?? "",
      identity: identity?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      slideCount: track ? track.querySelectorAll("figure").length : 0,
      framePresent: Boolean(frame),
    };
  });
}

function assertReveal(shot, failures, label) {
  const dw = Math.abs(shot.shell.width - shot.viewport.width);
  const dh = Math.abs(shot.shell.height - shot.viewport.height);
  if (dw > 1 || dh > 1) {
    failures.push(
      `${label}: shell not full viewport (${shot.shell.width}x${shot.shell.height} vs ${shot.viewport.width}x${shot.viewport.height})`,
    );
  }

  const dx = Math.abs(shot.shell.centerX - shot.viewport.width / 2);
  const dy = Math.abs(shot.shell.centerY - shot.viewport.height / 2);
  if (dx > 1 || dy > 1) {
    failures.push(
      `${label}: mask center drift dx=${dx.toFixed(2)} dy=${dy.toFixed(2)}`,
    );
  }

  const inset = parseInset(shot.clipPath);
  if (!inset) {
    failures.push(`${label}: could not parse clip-path ${shot.clipPath}`);
  } else {
    const [t, r, b, l] = inset;
    if (
      Math.abs(t - r) > 0.05 ||
      Math.abs(r - b) > 0.05 ||
      Math.abs(b - l) > 0.05
    ) {
      failures.push(`${label}: asymmetric inset ${inset.join(",")}`);
    }
  }

  if (shot.overflowX) {
    failures.push(`${label}: horizontal overflow`);
  }
}

async function runViewport(browser, width, height) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });

  await page.addInitScript(() => {
    sessionStorage.setItem("portfolio:pending-dock-target", "HeroTrack");
    const style = document.createElement("style");
    style.textContent =
      "*, *::before, *::after { animation: none !important; transition: none !important; } nextjs-portal { display: none !important; }";
    document.documentElement.appendChild(style);
  });

  await page.goto(BASE, { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector("#HeroShell");
  await page.waitForSelector("#ProjectMediaFrame");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);

  const failures = [];
  const scales = [];
  const fonts = [];

  for (const progress of REVEAL_PROGRESS) {
    const y = progress * REVEAL_SVH * height;
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(80);
    const shot = await sample(page);
    const label = `${width}x${height} reveal=${progress}`;
    if (shot.error) {
      failures.push(`${label}: ${shot.error}`);
      continue;
    }

    assertReveal(shot, failures, label);
    scales.push(shot.scale);
    fonts.push(shot.craftingSize);

    if (progress < 1 && shot.actionTabIndex === 0 && !shot.actionDisabled) {
      failures.push(`${label}: action focusable before reveal complete`);
    }

    if (shot.slideCount !== 2) {
      failures.push(`${label}: expected 2 slides, got ${shot.slideCount}`);
    }

    if (shot.viewWork !== "view work") {
      failures.push(`${label}: expected view work, got "${shot.viewWork}"`);
    }

    if (!shot.identity.includes("Ananya @2026")) {
      failures.push(`${label}: missing identity copy "${shot.identity}"`);
    }
  }

  const uniqueScales = new Set(scales.map((value) => value.toFixed(4)));
  if (uniqueScales.size > 1) {
    failures.push(
      `${width}x${height}: artboard scale changed during scroll (${[...uniqueScales].join(", ")})`,
    );
  }

  const uniqueFonts = new Set(fonts);
  if (uniqueFonts.size > 1) {
    failures.push(
      `${width}x${height}: Crafting font-size changed during scroll (${[...uniqueFonts].join(", ")})`,
    );
  }

  await page.close();
  return failures;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  for (const [width, height] of VIEWPORTS) {
    failures.push(...(await runViewport(browser, width, height)));
  }
  await browser.close();

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log(
    `hero reveal checks passed for ${VIEWPORTS.length} viewports × ${REVEAL_PROGRESS.length} progress values`,
  );
}

main().catch((event) => {
  console.error(event);
  process.exit(1);
});

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const executablePath =
  process.env.BROWSER_PATH ??
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const artifactDir = path.resolve("qa-artifacts");

const routes = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/projects", name: "projects" },
  { path: "/projects/private-villa-emirates-hills", name: "project-emirates-hills" },
  { path: "/projects/opus-tower-terrace", name: "project-opus-tower" },
  { path: "/projects/palm-jumeirah-residence", name: "project-palm" },
  { path: "/projects/downtown-executive-office", name: "project-office" },
  { path: "/projects/jumeirah-outdoor-retreat", name: "project-outdoor" },
  { path: "/projects/dubai-marina-penthouse", name: "project-marina" },
  { path: "/custom-furniture", name: "custom-furniture" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/missing-page", name: "not-found", expectedStatus: 404 },
];

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--disable-gpu"],
});

const results = [];

async function auditRoute(route, viewport, label, colorScheme = "light") {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];

  page.on("console", (message) => {
    const expectedNotFound = (route.expectedStatus ?? 200) === 404;
    const isExpectedDocument404 =
      expectedNotFound &&
      message.text().includes("Failed to load resource") &&
      message.text().includes("404");
    if (message.type() === "error" && !isExpectedDocument404) {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    const failure = request.failure();
    if (failure?.errorText !== "net::ERR_ABORTED") {
      failedRequests.push(`${failure?.errorText ?? "failed"} ${request.url()}`);
    }
  });
  page.on("response", (response) => {
    const expectedStatus = route.expectedStatus ?? 200;
    const isExpectedRouteResponse =
      response.url() === `${baseUrl}${route.path}` &&
      response.status() === expectedStatus;
    if (response.status() >= 400 && !isExpectedRouteResponse) {
      badResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto(`${baseUrl}${route.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});

  const images = page.locator("img");
  const imageCount = await images.count();
  for (let index = 0; index < imageCount; index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded().catch(() => {});
  }
  await page.waitForTimeout(700);

  const dom = await page.evaluate(() => ({
    title: document.title,
    h1Count: document.querySelectorAll("h1").length,
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    brokenImages: [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    imagesWithoutAlt: [...document.images]
      .filter((image) => !image.hasAttribute("alt"))
      .map((image) => image.currentSrc || image.src),
    emptyLinks: [...document.querySelectorAll("a")]
      .filter((link) => !link.getAttribute("href"))
      .map((link) => link.textContent?.trim() ?? ""),
    brokenAnchors: [...document.querySelectorAll('a[href^="#"]')]
      .filter((link) => {
        const href = link.getAttribute("href");
        return href && href !== "#" && !document.querySelector(href);
      })
      .map((link) => link.getAttribute("href")),
    mainCount: document.querySelectorAll("main").length,
  }));

  await page.screenshot({
    path: path.join(artifactDir, `${route.name}-${label}.png`),
    fullPage: true,
  });

  const result = {
    route: route.path,
    viewport: label,
    expectedStatus: route.expectedStatus ?? 200,
    status: response?.status() ?? null,
    ...dom,
    horizontalOverflow:
      dom.scrollWidth > dom.viewportWidth + 1 ||
      dom.bodyScrollWidth > dom.viewportWidth + 1,
    consoleErrors,
    pageErrors,
    failedRequests,
    badResponses,
  };

  results.push(result);
  await context.close();
}

try {
  for (const route of routes) {
    await auditRoute(route, { width: 1440, height: 1000 }, "desktop");
  }

  for (const route of routes) {
    await auditRoute(route, { width: 390, height: 844 }, "mobile");
  }

  const homeRoute = routes.find((route) => route.path === "/");
  if (homeRoute) {
    await auditRoute(homeRoute, { width: 375, height: 812 }, "mobile-375");
    await auditRoute(homeRoute, { width: 430, height: 932 }, "mobile-430");
  }

  const furnitureRoute = routes.find((route) => route.path === "/custom-furniture");
  if (furnitureRoute) {
    await auditRoute(furnitureRoute, { width: 375, height: 812 }, "mobile-375");
    await auditRoute(furnitureRoute, { width: 430, height: 932 }, "mobile-430");
  }

  const servicesRoute = routes.find((route) => route.path === "/services");
  for (const darkRoute of [homeRoute, servicesRoute, furnitureRoute]) {
    if (darkRoute) {
      await auditRoute(darkRoute, { width: 390, height: 844 }, "dark-mobile", "dark");
    }
  }
} finally {
  await browser.close();
}

await writeFile(
  path.join(artifactDir, "report.json"),
  `${JSON.stringify(results, null, 2)}\n`,
  "utf8",
);

const failures = results.filter(
  (result) =>
    result.status !== result.expectedStatus ||
    result.h1Count !== 1 ||
    result.mainCount !== 1 ||
    result.horizontalOverflow ||
    result.brokenImages.length > 0 ||
    result.imagesWithoutAlt.length > 0 ||
    result.emptyLinks.length > 0 ||
    result.brokenAnchors.length > 0 ||
    result.consoleErrors.length > 0 ||
    result.pageErrors.length > 0 ||
    result.failedRequests.length > 0 ||
    result.badResponses.length > 0,
);

console.log(JSON.stringify({ routesChecked: results.length, failures }, null, 2));
if (failures.length > 0) process.exitCode = 1;

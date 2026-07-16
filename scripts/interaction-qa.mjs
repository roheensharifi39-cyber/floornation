import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const executablePath =
  process.env.BROWSER_PATH ??
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const artifactDir = path.resolve("qa-artifacts");
await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const results = [];

async function check(name, test) {
  try {
    await test();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({
      name,
      passed: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

await check("mobile navigation traps and restores focus", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await dialog.waitFor({ state: "visible" });
  if ((await page.locator("body").getAttribute("data-menu-open")) !== "true") {
    throw new Error("Body scrolling was not locked while the menu was open.");
  }
  const focusInside = await page.evaluate(() => {
    const panel = document.querySelector('[role="dialog"][aria-label="Site navigation"]');
    return Boolean(panel?.contains(document.activeElement));
  });
  if (!focusInside) throw new Error("Focus did not move into the mobile menu.");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  if (!(await menuButton.evaluate((button) => button === document.activeElement))) {
    throw new Error("Focus was not restored to the menu button.");
  }
  await context.close();
});

await check("consultation drawer validates and focuses success", async () => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Request a Consultation" }).first().click();
  const dialog = page.getByRole("dialog", { name: /Tell us about the space/ });
  await dialog.waitFor({ state: "visible" });
  await dialog.getByLabel("Full name").fill("Demo Client");
  await dialog.getByLabel("Phone or WhatsApp").fill("+971 50 123 4567");
  await dialog.getByLabel("Email address").fill("demo@example.com");
  await dialog.getByLabel("What can we help with?").selectOption({ label: "Interior flooring" });
  await dialog.getByRole("button", { name: "Prepare my request" }).click();
  const success = page.getByRole("heading", {
    name: "Your brief is ready for a conversation.",
  });
  await success.waitFor({ state: "visible" });
  if (!(await success.evaluate((heading) => heading === document.activeElement))) {
    throw new Error("Success feedback did not receive focus.");
  }
  await context.close();
});

await check("service deep links select and reveal the right service", async () => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/services?service=wpc-decking`, {
    waitUntil: "networkidle",
  });
  const outdoorFilter = page.getByRole("button", { name: /Outdoor Living/ });
  await page.waitForFunction(() => window.scrollY > 100);
  if ((await outdoorFilter.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Outdoor Living filter was not selected from the service URL.");
  }
  if (!(await page.locator("#wpc-decking").isVisible())) {
    throw new Error("Requested WPC service was not visible.");
  }
  await context.close();
});

await check("project filters update the visible portfolio", async () => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/projects`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /^Outdoor/ }).click();
  await page.getByText("2 projects in Outdoor", { exact: true }).waitFor();
  await page.waitForTimeout(550);
  const visibleCards = await page
    .locator('a[aria-label^="View case study:"]:visible')
    .count();
  if (visibleCards !== 2) {
    throw new Error(`Expected 2 visible Outdoor projects, found ${visibleCards}.`);
  }
  await context.close();
});

await check("custom furniture builder completes all six steps", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/custom-furniture`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Living Room/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: /Sofa/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: /^Contemporary/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel(/Approximate dimensions/).fill("240 x 95 x 75 cm");
  await page.getByRole("button", { name: "Residential" }).click();
  await page.getByLabel(/Estimated budget/).selectOption({ index: 1 });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue without upload" }).click();
  await page.getByLabel(/Full name/).fill("Demo Client");
  await page.getByLabel(/^Email/).fill("demo@example.com");
  await page.getByLabel(/Phone or WhatsApp/).fill("+971 50 123 4567");
  await page.getByLabel(/Emirate or location/).fill("Dubai");
  await page.getByRole("button", { name: "WhatsApp" }).click();
  await page.getByRole("button", { name: "Request My Custom Proposal" }).click();
  const reference = page.getByText(/^FN-CF-\d{8}-[A-Z0-9]{5}$/);
  await reference.waitFor({ state: "visible" });
  await page.screenshot({
    path: path.join(artifactDir, "custom-furniture-success-mobile.png"),
    fullPage: true,
  });
  await context.close();
});

await check("each primary route emits its own canonical URL", async () => {
  const expected = new Map([
    ["/", "https://floornation.ae"],
    ["/services", "https://floornation.ae/services"],
    ["/projects", "https://floornation.ae/projects"],
    [
      "/projects/private-villa-emirates-hills",
      "https://floornation.ae/projects/private-villa-emirates-hills",
    ],
    ["/custom-furniture", "https://floornation.ae/custom-furniture"],
  ]);
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  for (const [route, canonical] of expected) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    const actual = await page.locator('link[rel="canonical"]').getAttribute("href");
    if (actual !== canonical) {
      throw new Error(`${route} canonical was ${actual}, expected ${canonical}.`);
    }
  }
  await context.close();
});

await browser.close();
await writeFile(
  path.join(artifactDir, "interaction-report.json"),
  `${JSON.stringify(results, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => !result.passed)) process.exitCode = 1;

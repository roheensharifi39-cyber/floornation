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

await check("theme toggle switches modes and persists the choice", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Toggle light and dark color theme" });
  await toggle.click();
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark") {
    throw new Error("Theme toggle did not activate dark mode.");
  }
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark") {
    throw new Error("Dark theme did not persist after reload.");
  }
  await toggle.click();
  if ((await page.locator("html").getAttribute("data-theme")) !== "light") {
    throw new Error("Theme toggle did not return to light mode.");
  }
  await context.close();
});

await check("hero exposes direct WhatsApp and Instagram actions", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const hero = page.locator("main section").first();
  const whatsapp = hero.getByRole("link", { name: "WhatsApp" });
  const instagram = hero.getByRole("link", { name: "Instagram" });
  if (!(await whatsapp.getAttribute("href"))?.startsWith("https://wa.me/971569178686")) {
    throw new Error("Hero WhatsApp action is not connected to Floor Nation.");
  }
  if (
    (await instagram.getAttribute("href")) !==
    "https://www.instagram.com/floornation.ae?igsh=dnRmbWdvajZxamtu"
  ) {
    throw new Error("Hero Instagram action does not use the supplied profile URL.");
  }
  await context.close();
});

await check("custom furniture inquiry reaches the builder in two taps", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

  const mobileDock = page.locator("aside");
  const firstTap = mobileDock.getByRole("link", { name: "Upload Your Furniture Idea" });
  await firstTap.waitFor({ state: "visible" });
  await firstTap.click();
  await page.waitForURL(/\/custom-furniture#quick-start$/);

  const quickStart = page.locator("#quick-start");
  await quickStart.getByRole("heading", { name: /picture or rough idea/i }).waitFor();
  await quickStart.getByRole("link", { name: "Start My Furniture Request" }).click();
  await page.waitForURL(/\/custom-furniture#request-builder$/);
  await page
    .locator("#request-builder")
    .getByRole("heading", { name: "Start with what you know." })
    .waitFor();
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

await check("custom furniture builder preserves answers, handles uploads, and completes", async () => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/custom-furniture`, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("alert").getByText("Choose one space to continue.").waitFor();

  await page.getByRole("button", { name: /^Other/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("alert")
    .getByText("Briefly describe the space so we can frame the request.")
    .waitFor();
  await page.getByLabel(/Describe the space/).fill("Clinic waiting area");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.getByRole("button", { name: /Sofa/ }).click();
  await page.getByRole("button", { name: /^Other/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("alert")
    .getByText("Tell us what other furniture you have in mind.")
    .waitFor();
  await page
    .getByLabel(/What should we source or create/)
    .fill("Curved welcome bench with integrated planters");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page
    .getByRole("heading", { name: "Which direction feels closest?" })
    .waitFor({ timeout: 5_000 });
  await page.getByRole("button", { name: /Fully Custom/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.getByText(/Have only a picture or rough idea/).waitFor();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("heading", { name: "Show us what caught your eye." }).waitFor();
  await page.getByRole("button", { name: "Back" }).click();
  if ((await page.getByLabel("Quantity").inputValue()) !== "1") {
    throw new Error("Project details were not preserved when moving backward.");
  }
  await page.getByRole("button", { name: "Back" }).click();
  if (
    (await page.getByRole("button", { name: /Fully Custom/ }).getAttribute("aria-pressed")) !==
    "true"
  ) {
    throw new Error("Design direction was not preserved when moving backward.");
  }
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  const tinyPng = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2n9sAAAAASUVORK5CYII=",
    "base64",
  );
  await page.locator("#inspiration-files").setInputFiles([
    { name: "chair-reference.png", mimeType: "image/png", buffer: tinyPng },
    {
      name: "floor-plan.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4\n%%EOF"),
    },
  ]);
  await page.getByText("chair-reference.png", { exact: true }).waitFor();
  await page.getByRole("img", { name: "Preview of chair-reference.png" }).waitFor();
  await page.getByRole("button", { name: "Remove floor-plan.pdf" }).click();
  if (await page.getByText("floor-plan.pdf", { exact: true }).isVisible().catch(() => false)) {
    throw new Error("Uploaded files could not be removed.");
  }
  await page.getByRole("button", { name: "Review request" }).click();

  await page.getByLabel(/Full name/).fill("Demo Client");
  await page.getByLabel(/^Email/).fill("demo@example.com");
  await page.getByLabel(/Phone or WhatsApp/).fill("+971 50 123 4567");
  await page.getByLabel(/Emirate or location/).fill("Dubai");
  await page.getByRole("button", { name: "WhatsApp" }).click();
  await page
    .getByLabel(/Additional message/)
    .fill("Please contact me in the afternoon.");
  await page.getByText("Clinic waiting area", { exact: false }).waitFor();
  await page.getByText("Curved welcome bench", { exact: false }).waitFor();
  await page.getByText("chair-reference.png", { exact: true }).last().waitFor();
  await page.getByText("Demo Client", { exact: true }).waitFor();
  await page
    .locator("p")
    .filter({ hasText: "Please contact me in the afternoon." })
    .waitFor();
  await page.getByRole("button", { name: "Request My Custom Proposal" }).click();
  const reference = page.getByText(/^FN-CF-\d{8}-[A-Z0-9]{5}$/);
  await reference.waitFor({ state: "visible" });
  await page.getByText(/Floor Nation team would review your reference/).waitFor();
  await page.locator('section[aria-labelledby="success-title"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({
    path: path.join(artifactDir, "custom-furniture-success-mobile.png"),
    fullPage: false,
  });
  await context.close();
});

await check("contact paths are real and placeholder-free", async () => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  for (const href of [
    "tel:+971569178686",
    "tel:+97142387786",
    "mailto:info@floornation.ae",
  ]) {
    if ((await page.locator(`a[href="${href}"]`).count()) === 0) {
      throw new Error(`Missing contact path: ${href}`);
    }
  }
  if ((await page.locator('a[href^="https://wa.me/971569178686"]').count()) === 0) {
    throw new Error("Missing Floor Nation WhatsApp path.");
  }
  if ((await page.locator('a[href="https://www.instagram.com/"]').count()) > 0) {
    throw new Error("Generic Instagram placeholder link is still present.");
  }
  if ((await page.locator('a[href="https://www.facebook.com/"]').count()) > 0) {
    throw new Error("Generic Facebook placeholder link is still present.");
  }
  await context.close();
});

await check("404 and reduced-motion experiences remain functional", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const response = await page.goto(`${baseUrl}/missing-page`, {
    waitUntil: "domcontentloaded",
  });
  if (response?.status() !== 404) throw new Error("Missing routes did not return 404.");
  await page.getByRole("heading", { name: /right surface/ }).waitFor();
  const reduced = await page.evaluate(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  if (!reduced) throw new Error("Reduced-motion preference was not applied.");
  await context.close();
});

await check("each primary route emits its own canonical URL", async () => {
  const expected = new Map([
    ["/", "https://floornation.ae"],
    ["/services", "https://floornation.ae/services"],
    ["/projects", "https://floornation.ae/projects"],
    ["/projects/private-villa-emirates-hills", "https://floornation.ae/projects/private-villa-emirates-hills"],
    ["/projects/opus-tower-terrace", "https://floornation.ae/projects/opus-tower-terrace"],
    ["/projects/palm-jumeirah-residence", "https://floornation.ae/projects/palm-jumeirah-residence"],
    ["/projects/downtown-executive-office", "https://floornation.ae/projects/downtown-executive-office"],
    ["/projects/jumeirah-outdoor-retreat", "https://floornation.ae/projects/jumeirah-outdoor-retreat"],
    ["/projects/dubai-marina-penthouse", "https://floornation.ae/projects/dubai-marina-penthouse"],
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

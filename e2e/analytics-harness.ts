import type { BrowserContext, Page, Request } from "@playwright/test";
import { test as base, expect } from "@playwright/test";

export { expect } from "@playwright/test";

export const GA_ID = "G-TEST000000";

type TProvider = "ga" | "gtag-js";

export interface IGaHit {
  event: string;
  location: string;
  params: Record<string, string>;
}

interface ITraffic {
  provider: TProvider;
  method: string;
  path: string;
  gaHit?: IGaHit;
}

const GA_HOSTS = /(^|\.)(google-analytics\.com|analytics\.google\.com)$/;
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

/**
 * Minimal stand-in for gtag.js. Like the real script it consumes dataLayer
 * Arguments objects (existing and future), honours Consent Mode, and reports
 * each event to google-analytics.com/g/collect with the page_location it was
 * given, falling back to the raw browser URL (what the real script does).
 */
const GTAG_STUB = `
(function () {
  var layer = (window.dataLayer = window.dataLayer || []);
  var consent = {};
  var configured = false;
  var tid = "";
  window.__gtagStubLoads = (window.__gtagStubLoads || 0) + 1;
  function collect(name, params) {
    var query = new URLSearchParams({ v: "2", tid: tid, en: name });
    query.set("dl", params.page_location || window.location.href);
    Object.keys(params).forEach(function (key) {
      query.set("ep." + key, String(params[key]));
    });
    fetch("https://www.google-analytics.com/g/collect?" + query.toString(), {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
    }).catch(function () {});
  }
  function handle(entry) {
    var command = Array.prototype.slice.call(entry);
    if (command[0] === "consent") {
      Object.assign(consent, command[2]);
    } else if (command[0] === "config") {
      tid = command[1];
      configured = true;
      if (consent.analytics_storage === "granted") {
        document.cookie = "_ga=GA1.1.111.222; path=/";
        document.cookie = "_ga_TEST000000=GS2.1.s1; path=/";
      }
    } else if (command[0] === "event") {
      if (configured && consent.analytics_storage === "granted") {
        collect(command[1], command[2] || {});
      }
    }
  }
  layer.slice().forEach(handle);
  var push = layer.push;
  layer.push = function () {
    Array.prototype.slice.call(arguments).forEach(handle);
    return push.apply(layer, arguments);
  };
})();
`;

export class AnalyticsRecorder {
  readonly traffic: ITraffic[] = [];
  readonly errors: string[] = [];
  /** While set, gtag.js waits for `release()`. */
  private gate: { promise: Promise<void>; open: () => void } | null = null;
  private blocked = new Set<TProvider>();

  get ga(): IGaHit[] {
    return this.traffic.flatMap((t) => (t.gaHit ? [t.gaHit] : []));
  }

  get providerRequests(): ITraffic[] {
    return this.traffic;
  }

  gaPageViews(): IGaHit[] {
    return this.ga.filter((hit) => hit.event === "page_view");
  }

  gaNamed(event: string): IGaHit[] {
    return this.ga.filter((hit) => hit.event === event);
  }

  hold(): void {
    let open = () => {};
    const promise = new Promise<void>((resolve) => {
      open = resolve;
    });
    this.gate = { promise, open };
  }

  release(): void {
    this.gate?.open();
    this.gate = null;
  }

  block(...providers: TProvider[]): void {
    for (const provider of providers) this.blocked.add(provider);
  }

  async waitGate(): Promise<void> {
    await this.gate?.promise;
  }

  isBlocked(provider: TProvider): boolean {
    return this.blocked.has(provider);
  }

  redactedLog(): string {
    return JSON.stringify(this.traffic, null, 2);
  }
}

function toGaHit(url: URL): IGaHit {
  const params: Record<string, string> = {};
  for (const [key, value] of url.searchParams) {
    if (key.startsWith("ep.")) params[key.slice(3)] = value;
  }
  return {
    event: url.searchParams.get("en") ?? "",
    location: url.searchParams.get("dl") ?? "",
    params,
  };
}

function toTraffic(request: Request): ITraffic | null {
  const url = new URL(request.url());
  const method = request.method();
  if (url.hostname === "www.googletagmanager.com") {
    return { provider: "gtag-js", method, path: url.pathname };
  }
  if (GA_HOSTS.test(url.hostname)) {
    return { provider: "ga", method, path: url.pathname, gaHit: toGaHit(url) };
  }
  return null;
}

async function installRoutes(
  context: BrowserContext,
  recorder: AnalyticsRecorder,
): Promise<void> {
  context.on("request", (request: Request) => {
    const entry = toTraffic(request);
    if (entry) recorder.traffic.push(entry);
  });

  await context.route("https://www.googletagmanager.com/**", async (route) => {
    if (recorder.isBlocked("gtag-js")) return route.abort();
    await recorder.waitGate();
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: GTAG_STUB,
    });
  });
  await context.route(
    (url) => GA_HOSTS.test(url.hostname),
    (route) => route.fulfill({ status: 204, headers: CORS }),
  );
}

function watchPage(page: Page, recorder: AnalyticsRecorder): void {
  page.on("pageerror", (error) =>
    recorder.errors.push(`pageerror: ${error.message}`),
  );
  page.on("console", (message) => {
    if (/content security policy/i.test(message.text())) {
      recorder.errors.push(`csp: ${message.text()}`);
    }
  });
}

export const test = base.extend<{ analytics: AnalyticsRecorder }>({
  analytics: async ({ context }, use, testInfo) => {
    const recorder = new AnalyticsRecorder();
    await installRoutes(context, recorder);
    context.on("page", (page) => watchPage(page, recorder));
    await use(recorder);
    await testInfo.attach("provider-requests.json", {
      body: recorder.redactedLog(),
      contentType: "application/json",
    });
    expect(recorder.errors, "page errors and CSP violations").toEqual([]);
  },
  page: async ({ context, analytics: _analytics }, use) => {
    await use(await context.newPage());
  },
});

export async function openPreferences(page: Page) {
  await page
    .getByRole("button", { name: "Cookie Settings", exact: true })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Cookie Preferences",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  return dialog;
}

export async function acceptAll(page: Page): Promise<void> {
  const dialog = await openPreferences(page);
  await dialog.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(dialog).not.toBeVisible();
}

export async function rejectAll(page: Page): Promise<void> {
  const dialog = await openPreferences(page);
  await dialog
    .getByRole("button", { name: "Reject non-essential", exact: true })
    .click();
  await expect(dialog).not.toBeVisible();
}

/** Wait past any late send before asserting absence. */
export const FLUSH_WAIT_MS = 2000;

export async function settle(page: Page): Promise<void> {
  await page.waitForTimeout(FLUSH_WAIT_MS);
}

/** Waits for the expected counts, then past a flush to prove nothing extra follows. */
export async function expectPageViews(
  page: Page,
  recorder: AnalyticsRecorder,
  expected: number,
): Promise<void> {
  await expect
    .poll(() => recorder.gaPageViews().length, { timeout: 15_000 })
    .toBe(expected);
  await settle(page);
  expect(recorder.gaPageViews()).toHaveLength(expected);
}

/** Cookies and web storage keys that belong to the provider. */
export async function providerStorage(page: Page): Promise<string[]> {
  const stored = await page.evaluate(() => {
    const keys: string[] = [];
    for (const area of [window.localStorage, window.sessionStorage]) {
      for (let i = 0; i < area.length; i += 1) {
        const key = area.key(i);
        if (key) keys.push(key);
      }
    }
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0]?.trim();
      if (name) keys.push(name);
    }
    return keys;
  });
  return stored.filter((key) => /^(_ga|_gid|_gat|app_utm)/i.test(key));
}

/** Keeps tel: and mailto: from invoking an external handler; React onClick still runs. */
export async function suppressNavigationOfLinks(page: Page): Promise<void> {
  await page.evaluate(() => {
    document.addEventListener(
      "click",
      (event) => {
        const link = (event.target as Element | null)?.closest("a");
        if (/^(tel|mailto):/.test(link?.getAttribute("href") ?? "")) {
          event.preventDefault();
        }
      },
      true,
    );
  });
}

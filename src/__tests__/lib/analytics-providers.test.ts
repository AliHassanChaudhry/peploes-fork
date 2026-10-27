import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { installFakeBrowser } from "../helpers/browser";

const envState = vi.hoisted(() => ({
  live: true,
  gaId: "G-TEST" as string | undefined,
}));
vi.mock("@/lib/env", () => ({
  env: {
    get NEXT_PUBLIC_GA_MEASUREMENT_ID() {
      return envState.gaId;
    },
  },
  isLiveSiteClient: () => envState.live,
}));

const sentry = vi.hoisted(() => ({ captureException: vi.fn() }));
vi.mock("@sentry/nextjs", () => sentry);

const GA_SCRIPT = "https://www.googletagmanager.com/gtag/js?id=G-TEST";
const ACCEPTED = { analytics: true, performance: true, marketing: true };
const DENIED = { analytics: false, performance: false, marketing: false };

interface ILoadOptions {
  browser?: Parameters<typeof installFakeBrowser>[0];
}

async function load(options: ILoadOptions = {}) {
  vi.resetModules();
  const browser = installFakeBrowser(options.browser);
  browser.removeGtag();
  const lifecycle = await import("@/lib/analytics/lifecycle");
  const client = await import("@/lib/analytics/client");
  const consent = await import("@/lib/cookie-consent");
  return { browser, lifecycle, client, consent };
}

function gaEvents(
  browser: ReturnType<typeof installFakeBrowser>,
  name: string,
) {
  return browser
    .dataLayer()
    .filter((entry) => entry[0] === "event" && entry[1] === name)
    .map((entry) => entry[2]);
}

beforeEach(() => {
  envState.live = true;
  envState.gaId = "G-TEST";
  sentry.captureException.mockClear();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("before consent and without configuration", () => {
  it("loads nothing, stores nothing and sends nothing without consent", async () => {
    const { browser, lifecycle } = await load();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    expect(browser.scripts).toHaveLength(0);
    expect(browser.dataLayer()).toEqual([]);
    expect(browser.cookieNames()).toEqual([]);
  });

  it("stays inert when GA4 is not configured", async () => {
    envState.gaId = undefined;
    const { browser, lifecycle } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    expect(browser.scripts).toHaveLength(0);
  });

  it("does nothing outside the live site", async () => {
    envState.live = false;
    const { browser, lifecycle } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    expect(browser.scripts).toHaveLength(0);
  });
});

describe("GA4 loading", () => {
  it("sets Consent Mode defaults to denied before loading gtag.js", async () => {
    const { browser, lifecycle } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    expect(browser.scripts.map((script) => script.src)).toEqual([GA_SCRIPT]);
    expect(browser.scripts[0]?.async).toBe(true);
    expect(browser.dataLayer()).toEqual([
      [
        "consent",
        "default",
        {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        },
      ],
    ]);
    expect(window.gtag).toBeUndefined();
  });

  it("grants analytics only, then configures without an automatic page view", async () => {
    const { browser, lifecycle } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    browser.loadScript();
    const layer = browser.dataLayer();
    expect(layer.map((entry) => entry[0])).toEqual([
      "consent",
      "consent",
      "js",
      "config",
    ]);
    expect(layer[1]).toEqual([
      "consent",
      "update",
      { analytics_storage: "granted" },
    ]);
    expect(layer[3]).toEqual(["config", "G-TEST", { send_page_view: false }]);
    expect(typeof window.gtag).toBe("function");
  });

  it("sends the queued page view once after the script loads", async () => {
    const { browser, lifecycle } = await load({
      browser: { href: "https://peploes.test/menus/dinner" },
    });
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/menus/dinner");
    expect(gaEvents(browser, "page_view")).toEqual([]);
    browser.loadScript();
    expect(gaEvents(browser, "page_view")).toEqual([
      {
        page_location: "https://peploes.test/menus/dinner",
        page_path: "/menus/dinner",
      },
    ]);
  });

  it("starts collecting when consent is granted after mount, from that moment", async () => {
    const { browser, lifecycle, consent } = await load();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    expect(browser.scripts).toHaveLength(0);
    consent.saveCookiePreferences(ACCEPTED);
    expect(browser.scripts).toHaveLength(1);
    browser.loadScript();
    expect(gaEvents(browser, "page_view")).toHaveLength(1);
  });

  it("keeps the site working when the script fails, and never retries", async () => {
    const { browser, lifecycle, consent, client } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    expect(() => browser.failScript()).not.toThrow();
    expect(browser.scripts[0]?.removed).toBe(true);
    consent.saveCookiePreferences(ACCEPTED);
    client.trackCustomEvent("booking_click", { placement: "hero" });
    expect(browser.scripts).toHaveLength(1);
    expect(window.gtag).toBeUndefined();
    expect(sentry.captureException).not.toHaveBeenCalled();
  });

  it("gives up on a script that never answers", async () => {
    vi.useFakeTimers();
    const { browser, lifecycle } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    vi.advanceTimersByTime(30_000);
    browser.loadScript();
    expect(window.gtag).toBeUndefined();
    expect(gaEvents(browser, "page_view")).toEqual([]);
  });
});

describe("page views", () => {
  it("counts each navigation once, including a revisit, and ignores a repeat of the same one", async () => {
    const { browser, lifecycle } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    browser.loadScript();
    lifecycle.recordNavigation("/");
    lifecycle.recordNavigation("/");
    lifecycle.recordNavigation("/menus");
    lifecycle.recordNavigation("/");
    expect(
      gaEvents(browser, "page_view").map(
        (p) => (p as { page_path: string }).page_path,
      ),
    ).toEqual(["/", "/menus", "/"]);
  });

  it("sends one page view however often consent is granted", async () => {
    const { browser, lifecycle, consent } = await load();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/menus");
    consent.saveCookiePreferences(ACCEPTED);
    consent.saveCookiePreferences(ACCEPTED);
    // Another tab granting writes the same choice and fires a storage event.
    browser.local.set(
      "peploes.cookie-preferences.v1",
      JSON.stringify(ACCEPTED),
    );
    browser.fireStorageEvent("peploes.cookie-preferences.v1");
    browser.loadScript();
    expect(gaEvents(browser, "page_view")).toHaveLength(1);
  });

  it("leaks no query, hash or email to the provider", async () => {
    const { browser, lifecycle } = await load({
      browser: {
        href: "https://peploes.test/menus?email=jane@example.com&token=abc#frag",
        referrer: "https://search.example/results?q=jane@example.com",
      },
    });
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    browser.loadScript();
    lifecycle.recordNavigation("/menus");
    const sent = JSON.stringify(browser.dataLayer());
    expect(sent).not.toMatch(/jane|token|frag|email=|q=/);
    expect(sent).toContain("https://search.example");
  });
});

describe("event routing", () => {
  it("sends catalog events and drops others", async () => {
    const { browser, lifecycle, client } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    browser.loadScript();
    client.trackCustomEvent("booking_click", { placement: "hero" });
    client.trackCustomEvent("contact_click", {
      placement: "footer",
      destination: "phone",
    });
    client.trackCustomEvent("purchase", { value: 10 });
    expect(gaEvents(browser, "booking_click")).toEqual([{ placement: "hero" }]);
    expect(gaEvents(browser, "purchase")).toEqual([]);
  });

  it("drops events while denied and never replays them after a grant", async () => {
    const { browser, lifecycle, client, consent } = await load();
    lifecycle.startAnalytics();
    client.trackCustomEvent("booking_click", { placement: "hero" });
    consent.saveCookiePreferences(ACCEPTED);
    browser.loadScript();
    expect(gaEvents(browser, "booking_click")).toEqual([]);
  });
});

describe("withdrawal", () => {
  async function granted() {
    const loaded = await load();
    const { browser, lifecycle } = loaded;
    browser.grantAnalytics();
    browser.setCookie("_ga", "GA1.1.1");
    browser.setCookie("_ga_ABC123", "GS1.1.1", ".peploes.test");
    browser.setCookie("_gid", "GA1.1.2");
    browser.setCookie("keep", "1");
    browser.local.set("unrelated", "x");
    lifecycle.startAnalytics();
    browser.loadScript();
    lifecycle.recordNavigation("/menus");
    return loaded;
  }

  it("denies GA consent, stops sends and clears Google cookies", async () => {
    const { browser, consent, client } = await granted();
    const before = browser.dataLayer().length;
    consent.saveCookiePreferences(DENIED);
    const after = browser.dataLayer().slice(before);
    expect(after[0]).toEqual([
      "consent",
      "update",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(window.gtag).toBeUndefined();
    client.trackCustomEvent("booking_click", { placement: "hero" });
    expect(browser.dataLayer().slice(before + 1)).toEqual([]);
    expect(browser.cookieNames().filter((n) => n.startsWith("_g"))).toEqual([]);
    expect(browser.cookieNames()).toContain("keep");
  });

  it("reacts to a withdrawal made in another tab", async () => {
    const { browser } = await granted();
    browser.local.set("peploes.cookie-preferences.v1", JSON.stringify(DENIED));
    browser.fireStorageEvent("peploes.cookie-preferences.v1");
    expect(window.gtag).toBeUndefined();
  });

  it("collects again after re-consent and reuses gtag.js", async () => {
    const { browser, consent } = await granted();
    consent.saveCookiePreferences(DENIED);
    const scriptCount = browser.scripts.length;
    consent.saveCookiePreferences(ACCEPTED);
    expect(browser.scripts).toHaveLength(scriptCount);
    expect(gaEvents(browser, "page_view")).toHaveLength(2);
  });

  it("sends no GA page view after withdrawal during load", async () => {
    const { browser, lifecycle, consent } = await load();
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    lifecycle.recordNavigation("/");
    consent.saveCookiePreferences(DENIED);
    browser.loadScript();
    expect(window.gtag).toBeUndefined();
    expect(JSON.stringify(browser.dataLayer())).not.toContain("granted");
    expect(gaEvents(browser, "page_view")).toEqual([]);
  });
});

describe("GA4 failure is not a consent teardown", () => {
  it("keeps stored campaign attribution when gtag.js times out", async () => {
    vi.useFakeTimers();
    const { browser, lifecycle, client } = await load({
      browser: { href: "https://peploes.test/?utm_source=newsletter" },
    });
    browser.grantAnalytics();
    lifecycle.startAnalytics();
    client.trackCustomEvent("booking_click", { placement: "hero" });
    expect(browser.session.size).toBe(1);
    vi.advanceTimersByTime(30_000);
    expect(browser.session.size).toBe(1);
  });
});

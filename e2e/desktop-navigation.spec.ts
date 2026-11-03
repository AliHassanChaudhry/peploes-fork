import { expect, test } from "./menu-test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("reduced motion keeps dropdowns usable during switching and resizing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const navigation = page.locator("[data-navbar-primary]");
  const menus = navigation.getByRole("link", { name: "Menus", exact: true });
  const groups = navigation.getByRole("link", {
    name: "Private Dining & Events",
    exact: true,
  });
  for (const trigger of [menus, groups, menus, groups]) {
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    navigation.locator('[data-navigation-id="Private Dining & Events"]'),
  ).toHaveAttribute("aria-expanded", "false");
  await page.mouse.move(0, 800);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(groups).toHaveAttribute("aria-expanded", "false");
});

test("desktop Menus opens Lunch by pointer and keyboard", async ({ page }) => {
  const menus = page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Menus", exact: true });

  await expect(menus).toHaveAttribute("href", "/menus");
  await menus.click();
  await expect(page).toHaveURL("/menus");
  await expect(
    page.getByRole("heading", { name: "Lunch Menu", exact: true }),
  ).toBeVisible();
  await expect(menus).toHaveAttribute("aria-expanded", "false");

  await page.goto("/menus?menu=dinner");
  await menus.focus();
  await menus.press("Enter");
  await expect(page).toHaveURL("/menus");
  await expect(
    page.getByRole("heading", { name: "Lunch Menu", exact: true }),
  ).toBeVisible();
});

for (const shelf of [
  {
    trigger: "Menus",
    role: "link",
    crossedLink: "Menus",
    destination: "Lunch",
    path: "/menus?menu=lunch",
  },
  {
    trigger: "Private Dining & Events",
    role: "link",
    crossedLink: "What’s On",
    destination: "Celebrations & Gatherings",
    path: "/private-dining/groups-celebrations",
  },
] as const) {
  test(`${shelf.trigger} stays open during diagonal pointer travel into its panel`, async ({
    page,
  }) => {
    const navigation = page.getByRole("navigation", {
      name: "Main navigation",
      exact: true,
    });
    const trigger = navigation.getByRole(shelf.role, {
      name: shelf.trigger,
      exact: true,
    });
    const crossedLink = navigation.getByRole("link", {
      name: shelf.crossedLink,
      exact: true,
    });
    const navigationBox = await navigation.boundingBox();
    const crossedBox = await crossedLink.boundingBox();
    if (!navigationBox || !crossedBox) {
      throw new Error("Desktop navigation must have visible bounds.");
    }

    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 1000));

    const crossedX = crossedBox.x + crossedBox.width / 2;
    const panelTop = navigationBox.y + navigationBox.height;
    await page.mouse.move(crossedX, panelTop - 6, { steps: 8 });
    await page.mouse.move(crossedX + 60, panelTop + 24, { steps: 8 });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.clock.runFor(1000);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.mouse.move(0, 800);
    await page.clock.runFor(1000);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.hover();
    await navigation
      .getByRole("link", { name: shelf.destination, exact: true })
      .click();
    await expect(page).toHaveURL(shelf.path);
  });
}

test("switching shelves cancels a pending close and keeps keyboard and outside-click dismissal", async ({
  page,
}) => {
  const navigation = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  const menus = navigation.getByRole("link", { name: "Menus", exact: true });
  const groups = navigation.getByRole("link", {
    name: "Private Dining & Events",
    exact: true,
  });
  const celebration = navigation.getByRole("link", {
    name: "Celebrations & Gatherings",
    exact: true,
  });

  await menus.hover();
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 1000));
  await page.mouse.move(0, 800);
  await groups.hover();
  await page.clock.runFor(1000);
  await expect(menus).toHaveAttribute("aria-expanded", "false");
  await expect(groups).toHaveAttribute("aria-expanded", "true");

  await groups.press("ArrowDown");
  await page.keyboard.press("Tab");
  await expect(
    navigation.getByRole("link", { name: "Explore", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(celebration).toBeFocused();
  await page.mouse.move(0, 800);
  await page.clock.runFor(1000);
  await expect(groups).toHaveAttribute("aria-expanded", "true");
  await page.clock.resume();
  await page.keyboard.press("Escape");
  await expect(groups).toBeFocused();
  await expect(groups).toHaveAttribute("aria-expanded", "false");

  await menus.hover();
  await page.mouse.click(0, 800);
  await expect(menus).toHaveAttribute("aria-expanded", "false");
  await menus.press("ArrowDown");
  await expect(menus).toHaveAttribute("aria-expanded", "true");
  await expect(
    navigation.getByRole("link", { name: "Lunch", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    navigation.getByRole("link", { name: "Lunch", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menus).toBeFocused();
  await expect(menus).toHaveAttribute("aria-expanded", "false");
});

test("desktop shelves keep menu links and the private dining overview reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  const menus = navigation.getByRole("link", { name: "Menus", exact: true });
  await menus.press("ArrowDown");
  await expect(menus).toHaveAttribute("aria-expanded", "true");

  for (const [name, href] of [
    ["Lunch", "/menus?menu=lunch"],
    ["Dinner", "/menus?menu=dinner"],
    ["Pre-Theatre", "/menus?menu=pre-theatre"],
    ["Wine", "/menus?menu=wine"],
    ["Cocktails", "/menus?menu=cocktails"],
    ["Seasonal", "/menus?menu=seasonal"],
  ]) {
    const link = navigation.getByRole("link", { name, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", href);
  }

  const dining = navigation.getByRole("link", {
    name: "Private Dining & Events",
    exact: true,
  });
  await dining.press("ArrowDown");
  await expect(dining).toHaveAttribute("aria-expanded", "true");
  await expect(menus).toHaveAttribute("aria-expanded", "false");
  for (const [name, href] of [
    ["Celebrations & Gatherings", "/private-dining/groups-celebrations"],
    ["Corporate & Exclusive Hire", "/private-dining/corporate-events"],
    ["Weddings", "/private-dining/weddings"],
  ]) {
    const link = navigation.getByRole("link", { name, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", href);
  }

  const explore = navigation.getByRole("link", {
    name: "Explore",
    exact: true,
  });
  await expect(explore).toHaveAttribute("href", "/private-dining");
  await explore.click();
  await expect(page).toHaveURL("/private-dining");
  await expect(dining).toHaveAttribute("aria-expanded", "false");
});

test("short desktop shelves keep keyboard destinations reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 240 });
  const navigation = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  const dining = navigation.getByRole("link", {
    name: "Private Dining & Events",
    exact: true,
  });
  await dining.press("ArrowDown");
  const weddings = navigation.getByRole("link", {
    name: "Weddings",
    exact: true,
  });
  await weddings.focus();
  await expect(weddings).toBeInViewport();
  await weddings.press("Enter");
  await expect(page).toHaveURL("/private-dining/weddings");
});

import { expect, test } from "./menu-test";

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`public content remains reachable with ${reducedMotion} motion`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    for (const path of ["/", "/journal", "/seasonal", "/our-story"]) {
      await page.goto(path);
      const heading = page.getByRole("main").getByRole("heading", { level: 1 });
      await expect(heading).toBeVisible();
      await expect
        .poll(() =>
          heading.evaluate((element) =>
            element.checkVisibility({
              opacityProperty: true,
              visibilityProperty: true,
            }),
          ),
        )
        .toBe(true);
      const footer = page.getByRole("contentinfo");
      const contact = footer.locator('a[href^="tel:"]');
      await contact.scrollIntoViewIfNeeded();
      await expect(contact).toBeVisible();
      await expect
        .poll(() =>
          contact.evaluate((element) =>
            element.checkVisibility({
              opacityProperty: true,
              visibilityProperty: true,
            }),
          ),
        )
        .toBe(true);
      await contact.focus();
      await expect(contact).toBeFocused();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "The Journal", exact: true })
      .click();
    await expect(page).toHaveURL("/journal");
    const article = page.getByRole("main").getByRole("heading", { level: 1 });
    await expect
      .poll(() =>
        article.evaluate((element) =>
          element.checkVisibility({
            opacityProperty: true,
            visibilityProperty: true,
          }),
        ),
      )
      .toBe(true);
  });
}

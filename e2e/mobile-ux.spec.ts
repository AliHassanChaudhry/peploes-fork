import { expect, test } from "./menu-test";

test("guests open menus from the homepage and use the full mobile tab target", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    const menus = page
      .getByRole("region", {
        name: "Good food, fine wine and a room worth being in.",
      })
      .getByRole("link", { name: "Menus", exact: true });
    await expect(menus).toBeInViewport();
    await menus.click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name: "Menus", exact: true })
      .click();
  }
  const navigation = page.getByRole("navigation", {
    name: "Restaurant menus",
    exact: true,
  });
  const dinner = navigation.getByRole("link", { name: "Dinner", exact: true });
  if (isMobile) {
    // Padding is part of the visible touch target, not just the text label.
    await dinner.click({ position: { x: 4, y: 4 } });
  } else {
    await dinner.click();
  }
  await expect(page).toHaveURL(/menu=dinner/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Dinner Menu", exact: true }),
  ).toBeVisible();
});

test("private dining enquiry shortcut reaches its form", async ({ page }) => {
  await page.goto("/private-dining");
  await page
    .getByRole("link", { name: "Make an enquiry", exact: true })
    .click();
  await expect(page).toHaveURL(/#enquire$/);
  await expect(
    page.getByRole("form", { name: "Plan your gathering", exact: true }),
  ).toBeInViewport();
});

test("keyboard visitors can open the final story in the homepage browse row", async ({
  page,
}) => {
  await page.goto("/");
  const stories = page.getByRole("region", {
    name: "The people, produce, art and stories that shape Peploe’s.",
  });
  const action = stories
    .getByRole("link", { name: "Read the Story", exact: true })
    .last();
  await stories
    .getByRole("link", { name: "Discover Our Story", exact: true })
    .focus();
  for (
    let tabs = 0;
    tabs < 20 &&
    !(await action.evaluate((link) => link === document.activeElement));
    tabs += 1
  ) {
    await page.keyboard.press("Tab");
  }
  await expect(action).toBeInViewport({ ratio: 1 });
  await expect(action).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/journal\/the-art-of-peploes$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

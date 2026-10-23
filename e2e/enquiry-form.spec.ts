import { expect, test } from "@playwright/test";

for (const path of [
  "/private-dining",
  "/private-dining/groups-celebrations",
  "/private-dining/corporate-events",
  "/private-dining/weddings",
]) {
  test(`${path} enquiry controls share rounded styling and subtle focus`, async ({
    page,
  }) => {
    await page.goto(path);
    const form = page.locator("#enquire").getByRole("form");
    const fields = form.locator(
      'input:not([type="checkbox"]), select, textarea',
    );
    for (const field of await fields.all()) {
      await expect(field).toHaveCSS("border-radius", "4px");
      await field.focus();
      await expect(field).toBeFocused();
      await expect(field).toHaveCSS("outline-style", "none");
      await expect(field).not.toHaveCSS("box-shadow", "none");
    }
    const selects = form.getByRole("combobox");
    for (const select of await selects.all()) {
      await expect(select).toHaveCSS("cursor", "pointer");
      await expect(select).toHaveCSS("appearance", "base-select");
    }
    await form.getByLabel("Number of guests").selectOption("12");
    await expect(form.getByLabel("Number of guests")).toHaveValue("12");
    await expect(form.getByLabel("Preferred date")).toHaveCSS(
      "cursor",
      "pointer",
    );
    const consent = form.getByRole("checkbox");
    if (await consent.count()) {
      await expect(consent).toHaveCSS("cursor", "pointer");
      await consent.check();
      await expect(consent).toBeChecked();
    }
    await expect(
      form.getByRole("button", { name: "Send Enquiry" }),
    ).toBeDisabled();
    await page.emulateMedia({ forcedColors: "active" });
    await form.getByLabel("Email address").focus();
    await expect(form.getByLabel("Email address")).toHaveCSS(
      "outline-style",
      "solid",
    );
    await expect(form.getByLabel("Email address")).toHaveCSS(
      "outline-width",
      "2px",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

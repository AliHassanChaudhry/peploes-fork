import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";

import { DateCalendar } from "@/components/app/atoms/date-calendar";

it("keeps the calendar usable when a typed year exceeds the supported range", () => {
  const html = renderToStaticMarkup(
    <DateCalendar
      id="test-calendar"
      value="20266-12-01"
      min="2026-07-02"
      onChange={() => {}}
    />,
  );

  expect(html).toContain("July 2026");
  expect(html).toContain('aria-label="Thursday, 2 July 2026"');
  expect(html).not.toContain('aria-pressed="true"');
});

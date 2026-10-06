# Menu pages

The menu routes are `/menus/lunch`, `/menus/dinner`, `/menus/pre-theatre`,
`/menus/wine`, `/menus/cocktails`, `/menus/group-set-menu` and `/menus/seasonal`.
`/menus` redirects to Lunch. The shared layout contains the hero and sticky menu
navigation. Each page supplies its closing photograph and copy. The site header
and footer remain shared with the homepage. Booking and enquiry actions remain
inactive until their integration exists.

## Design and approved comments

Reference: [Peploe’s Figma, Lunch desktop](https://www.figma.com/design/0fEgisdlNBr23CuWHJOTNC/Peploe-s?node-id=3345-534)
and [Lunch mobile](https://www.figma.com/design/0fEgisdlNBr23CuWHJOTNC/Peploe-s?node-id=3384-11229).

Dinner follows [desktop](https://www.figma.com/design/0fEgisdlNBr23CuWHJOTNC/Peploe-s?node-id=3347-3831)
and [mobile](https://www.figma.com/design/0fEgisdlNBr23CuWHJOTNC/Peploe-s?node-id=3387-12594).
It retains individual dish prices, the 5pm service time, its own food photograph,
eight sides and the group-size note. The Lunch and Pre-Theatre comments about
removing prices do not apply to Dinner. Dinner has no set-menu offer.

- The Menu navigation note (`3347:3824`) keeps the hero consistent between menus
  and the navigation accessible while scrolling. Phones scroll the links horizontally.
- The CMS note calls for editable headings, dishes, descriptions, prices, service
  times and notes. The allergen note calls for optional, editable expanding content.
- Comment #17 removes individual starter and main-course prices from Lunch.
  Small bites and sides retain prices. The offer is two courses for €42 or three
  for €48. Optional prices allow future individual pricing without changing the UI.
- Comment #22 removes the introductory prose for each course. Dish descriptions
  remain part of the menu.
- Comment #15 approves the food photograph with an option to remove it later.
  The introductory image is optional and its removal leaves no empty image panel.

### Remaining menu references and decisions

| Menu | Desktop node | Mobile node |
| --- | --- | --- |
| Pre-Theatre | `3367:6480` | `3387:12944` |
| Wine | `3356:7861` | `3388:14050` |
| Cocktails | `3380:9952` | `3392:16854` |
| Group Set Menu | `3399:18287` | `3407:21690` |
| Seasonal | `3402:20164` | `3407:22064` |

- Comment #24 confirms that Pre-Theatre starters, mains and desserts never need
  individual prices. Only small bites and sides have editable prices. The rib-eye
  supplement remains part of its description.
- The final reply to #26 keeps “Start Here” in the wine index. Comment #27 requires
  editable categories, subcategories and their contents, including new countries.
- The wine navigation note specifies scrolling to sections on the same page,
  without filtering the list or loading another page. The index and tables use
  the same available content so hidden bottles cannot leave empty jump targets.
- The wine CMS note requires editable names, vintages, regions, glass/bottle
  prices and availability. The current Figma list demonstrates layout only.
- Comment #34 requests Classic and Peploe’s Signature Cocktail sections between
  Aperitifs and Spirits. Their ordered entries are prepared but empty because the
  promised cocktail list is not present in the comments. Empty sections are hidden.
- Comment #43 adds included bread and main-course sides to both group menus and
  both Christmas menus. Seasonal tea/coffee appears once in its own course,
  removing the frame’s duplicated entry under Dessert.
- Comment #44 asks about future lobster-week and wine-pairing menus. Seasonal
  entries are an ordered collection, with navigation generated from that same
  collection; they are not a fixed Christmas enum.
- Comment #23 proposes a restaurant illustration but has no approved replacement
  attached. The current frame illustration is retained and remains editable.

The Figma aperitif pound symbols are treated as placeholder errors: all prices
use euro, consistent with the Dublin restaurant and the rest of its menus.
The duplicate Grey Goose entries, wine prices/vintages and the Christmas 2025
service date are retained as local design preview copy. Confirm these with the
restaurant before publishing current menus. Seasonal group eligibility follows
the menu headers (“greater than 7”) rather than the contradictory “7 or more” footer.

## Local preview and future Sanity connection

The contributor selected local preview data. No Sanity project, Studio, SDK,
credentials or remote fetching is configured. Figma menu copy is preview content;
the restaurant must approve dishes, prices and service times before launch.

The following preview content remains pending restaurant approval:

- House White and House Red bottle prices differ between By the Glass and House Wines.
- Two Grey Goose entries have the same label but different prices.
- Lunch service ends at 4:30pm while last orders are shown as 4:45pm.
- The three-course lunch offer has no dessert options or third-course explanation.

Keep these as content questions until the restaurant supplies confirmed details;
do not invent prices, service times or dishes.

`src/lib/constants/menu-page.ts` owns the shared page content. The `*-menu.ts`
catalogs in the same directory hold independently editable menu data.
`IMenuContent` in `src/lib/types.ts` is the rendering contract. The UI receives
this content as a server-rendered prop and has no dependency on Sanity transport
objects. Course and dish arrays use stable `_key` values and preserve editor order.
An empty course is omitted. Missing prices, descriptions, images, offers or allergen
information do not create placeholders. Lunch and Pre-Theatre offers appear
once in the introduction. A course's optional `firstColumnCount` sets the first
desktop column; remaining dishes are distributed across the later columns.
A one-column course always includes every dish.

When connecting Sanity, use these document fields:

| Content | Suggested Sanity field |
| --- | --- |
| Shared hero, navigation and booking banner | A singleton `menusPage` document |
| Menu title and SEO description | Required strings on a `restaurantMenu` document |
| Menu identifier | Required unique `slug`, projected as `slug.current` |
| Service times and set-menu offer | String fields; offer optional |
| Introductory image | Optional `image` with alt text and desktop crop scale |
| Courses | Ordered object array: heading, one/two/three-column layout and dishes |
| Dishes | Ordered object array: name, optional description and optional price |
| Price | Optional non-negative number in euro, at most two decimal places |
| Notes | Ordered string array |
| Allergens | Optional object with heading and description |

Wine uses `IWineMenuContent`, with ordered sections, columns, categories and wine
entries. Columns control desktop grouping; categories read across rows on phones
and in the index. An unavailable wine is omitted; absent availability means shown.
Vintage, glass and bottle fields are independent, and category flags determine
which price columns appear. No country names are embedded in components.

Cocktails uses `IDrinksMenuContent`: ordered cocktail sections and spirit
categories, each with optional descriptions and prices. Group and Seasonal use
`ISetMenuCollection`: ordered menus with stable keys, titles, prices per person,
inclusions and courses. Each `ISetMenu` carries optional `serviceTimes` text,
a required `summary`, and an optional `cardDescription`. The preview catalogs
put service dates in `serviceTimes` and group eligibility in descriptive text;
there are no separate structured date or eligibility fields. These collections
generate the navigation dropdowns and section cards. Store inclusions as editable
text; do not infer them from prices or share one menu’s dishes with another document.

For Sanity, model these as separate document shapes with reusable dish, course,
image, notes and booking-banner objects. Validate unique, URL-safe section keys
for anchors, non-negative prices, Pre-Theatre pricing restrictions and required
image alt text. Preserve editor ordering when projecting content into these types.
The local catalogs are preview inputs, not a configured Studio or CMS integration.

Keep price absent for set-menu dishes; do not use zero to mean missing. The
content adapter should project Sanity slugs and image assets into the rendering
contract, validate external content, and return typed failures through the
repository's provider/service boundaries. Do not silently replace a failed CMS
request with the preview menu. Configure approved Sanity image origins in both
Next image settings and CSP when that connection is implemented.

Before release, verify desktop and phone image crops, reading order, sticky
navigation below the header, keyboard access, allergen expansion, optional
content and overflow at narrow widths. Check all menu links from both header
menus and the homepage, the footer Menus link, Wine index anchors, and Group and
Seasonal dropdowns. Validate two desktop wine columns and the mobile reading order.

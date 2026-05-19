# Ruthless UX/UI + CSS/JS Audit (Page-Wise)

Scope: this repo’s static site under `docs/` (Bulma + your overrides).

This is intentionally blunt. It’s also intentionally specific: file/line references, the concrete smell, and what to change.

---

## Global CSS: `docs/assets/css/theme.css`

### 1) You mixed “theme tokens”, “Bulma overrides”, and “utility classes” into one file
Where:
- `theme.css` is not just tokens; it overrides Bulma components and defines new utilities (ex: `.hero.*`, `.has-text-*`, `.tag.*`, `.menu-list a`, etc). See `theme.css` lines 26+.

Why it’s a problem:
- This guarantees stylesheet-layer confusion and “which file wins” debugging. It also makes it impossible to reason about intent: tokens vs. component rules vs. utilities are three different responsibilities.

What to do:
- Split into:
  1. `tokens.css` (only `:root` variables),
  2. `bulma-overrides.css` (component overrides),
  3. `utilities.css` (if you truly need custom utilities).
  If you refuse multiple files, at least hard-separate by sections and stop redefining the same concepts in `site.css`.

### 2) Duplicate / contradictory palette naming and comments (sloppy + misleading)
Where:
- `theme.css` line 16: `--color-bg-dark: #848a8e;` comment says “Light backgrounds”. That is flat-out wrong.
- Palette naming is long (`--color-primary-lighter`) but not used consistently across the site.

Why it’s a problem:
- Bad comments are worse than no comments because they actively mislead.

What to do:
- Fix the comment or rename the token to match reality.
- Prefer role-based tokens over “lighter/medium/dark” sprawl, for example:
  - `--surface-0/1/2`, `--text-0/1/2`, `--border-0`, `--accent-0/1`, plus semantic roles (`--success`, `--warning`, `--danger`) if you use them.

### 3) You destroyed semantic color meaning across the UI
Where:
- `theme.css` lines 168–172: `.has-text-success`, `.has-text-warning`, `.has-text-danger` are all remapped to the same color.
- `theme.css` lines 174–180: `.tag.is-success`, `.tag.is-warning`, `.tag.is-danger` are all remapped to the same background/color.

Why it’s a problem:
- You’re using these semantics for **difficulty** and **status** (ex: LeetCode difficulty tags in `leetcode.js` and benchmark tags in `technology-comparison.html`). With this override, Easy/Medium/Hard can become visually indistinguishable or at least “same family, low signal”.
- This is not “aesthetic preference”. It’s broken information design.

What to do:
- Stop overriding Bulma’s semantic classes into one palette.
- If you want a unified aesthetic, create *your own* classes (ex: `.tag.is-difficulty-hard`) and map them to meaningful, distinct hues with real contrast.

### 4) You override Bulma’s utility classes with `!important` (CSS debt)
Where:
- `theme.css` lines 139–172: utility overrides use `!important`.

Why it’s a problem:
- Once you start, you won’t stop. `!important` wars are how design systems rot.
- It also makes local component styling harder because utilities can’t be overridden naturally.

What to do:
- Don’t override Bulma’s global utilities. If you need custom text colors, create a dedicated naming set and use it explicitly (`.u-text-muted`, `.u-text-accent`, etc.) without hijacking Bulma semantics.

### 5) Dead / unused styling: `.hero.*` is defined but you don’t use heroes
Where:
- `theme.css` lines 51–65 define `.hero` gradients.
- None of your pages use `<section class="hero ...">`.

Why it’s a problem:
- Dead CSS is a maturity smell. It implies copy/paste theming rather than a curated system.

What to do:
- Delete dead rules or actually use them. Pick one.

---

## Global CSS: `docs/assets/css/site.css`

### 1) Second set of tokens redefined in `:root` = inconsistent system
Where:
- `site.css` lines 1–18 define `--site-*` tokens plus Bulma hooks.
- `theme.css` also defines an entirely separate `--color-*` palette.

Why it’s a problem:
- You now have *two* design token systems fighting. Which one is canonical? No one knows. Your future self won’t either.

What to do:
- Pick one token namespace. Delete the other. No compromise.

### 2) Forced smooth scrolling without reduced-motion fallback
Where:
- `site.css` line 21: `scroll-behavior: smooth;`

Why it’s a problem:
- Users with motion sensitivity explicitly request reduced motion. You’re ignoring that.

What to do:
- Add:
  - `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`

### 3) Your focus states are basically nonexistent
Where:
- `site.css` has hover rules but no explicit `:focus-visible` for links/buttons/inputs.

Why it’s a problem:
- Keyboard users lose track of focus. That’s basic accessibility failure and “cheap” UX.

What to do:
- Add a consistent `:focus-visible` ring for `.button`, `a`, `.input`, and `[tabindex]`.

### 4) `.section + .section` is a spacing hack that guarantees inconsistencies
Where:
- `site.css` lines 39–46.

Why it’s a problem:
- It creates “magic” spacing rules depending on DOM adjacency, not intent. The same section component will space differently depending on what’s next to it. That’s fragile and hard to maintain.

What to do:
- Remove adjacency hacks. Define a spacing scale and use explicit layout containers/gaps.

### 5) Menu active state is a full blue fill, but hover state is subtle; the interaction model is inconsistent
Where:
- Hover: `site.css` lines 143–146.
- Active: `site.css` lines 148–151.

Why it’s a problem:
- Users go from “barely-there hover” to “full solid blue active” which feels jumpy and visually loud.

What to do:
- Use one consistent model:
  - either keep active as a left border + tinted background,
  - or keep both hover/active as tinted surfaces with a border accent.

### 6) `iframe` min-height is a fixed desktop assumption
Where:
- `site.css` lines 161–176.

Why it’s a problem:
- `min-height: 720px` is random and will be too tall/short depending on viewport. Your mobile rule uses `70vh`, but you still get awkward “giant framed content” behavior.

What to do:
- If you keep the iframe (you probably shouldn’t), size it relative to viewport and surrounding UI intentionally.

---

## Page: `docs/index.html`

### 1) No real navigation / orientation pattern
Where:
- Page has no top nav, no persistent site identity, no global layout. It’s a title + 4 boxes (lines 13–57).

Why it’s a problem:
- Looks like a doc stub. Low trust and low “product maturity” signal.

What to do:
- Add a simple top bar with:
  - site name (left),
  - 2–4 key sections (right),
  - consistent across pages.

### 2) CTA hierarchy is flat: all actions are identical `.button.is-primary`
Where:
- Lines 28, 36, 44, 52.

Why it’s a problem:
- When everything is “primary”, nothing is primary. Users don’t get direction.

What to do:
- Make one primary action, the rest secondary (`is-light` / outline style). Or add icons + short labels so scanning is faster.

### 3) Footer is decorative, not useful
Where:
- Lines 59–74.

Why it’s a problem:
- You have space but no helpful links, no repo/source link, no “about”, no content indexing.

What to do:
- Add actual utility in the footer or delete it.

---

## Page: `docs/leetcode-questions.html`

### 1) Sidebar anchors depend on JS-generated IDs, but you don’t enforce parity
Where:
- Sidebar uses hardcoded `href="#..."` (lines 42–56).
- IDs are created in JS via `slugify(category)` in `leetcode.js` (see `docs/assets/js/leetcode.js`, lines 111–118 and 143–146).

Why it’s a problem:
- If you rename a category key in JS (data), the sidebar silently breaks. There’s no compile-time coupling and no runtime validation.

What to do:
- Generate the sidebar from the same source of truth (the JS roadmap keys), or maintain a structured config and render both.

### 2) The filter bar UI is “Bulma default”, but behavior is brute-force
Where:
- Filters: buttons with `data-difficulty` (lines 100–105).
- JS re-renders the entire content on every keypress (see `leetcode.js` lines 122–199, plus `searchInput.addEventListener('input', render)` at 210).

Why it’s a problem:
- For large datasets this will stutter and feel cheap. You’re nuking and rebuilding DOM rather than updating.

What to do:
- Add a debounce (150–250ms).
- Consider incremental update or at least avoid rebuilding category sections that didn’t change.

### 3) Accessibility gaps: no label for search input, no filter state announced
Where:
- Search input has placeholder only (line 95). No `<label>` and no `aria-label`.
- Filter buttons toggle class visually but no `aria-pressed`.

Why it’s a problem:
- Screen reader users get a worse experience; keyboard users don’t get state signals.

What to do:
- Add `<label class="is-sr-only" for="searchInput">Search</label>` or `aria-label`.
- Add `aria-pressed="true|false"` to filter buttons.

---

## JS: `docs/assets/js/leetcode.js`

### 1) Data and rendering logic are welded together (unmaintainable blob)
Where:
- The `roadmap` object is huge at the top (lines 2+).

Why it’s a problem:
- You can’t maintain content without touching logic. Diff noise gets insane.

What to do:
- Move roadmap data into a separate JSON file and fetch it, or at least into a separate JS module.

### 2) `innerHTML` template rendering everywhere
Where:
- `section.innerHTML = ...` (lines 147+).

Why it’s a problem:
- If any data ever becomes user-controlled, you’ve created an XSS hole. Today it’s static, but the pattern is still a smell.
- Also makes event binding harder and encourages fragile string templates.

What to do:
- Use DOM APIs for the repeated pieces, or sanitize if you insist on template strings.

### 3) Filtering logic has minor correctness/clarity issues
Where:
- `problems.filter(([title, difficulty, note]) => { ... })` (line 131).

Why it’s a problem:
- Your tuple is `[title, difficulty, reason, url]`. Naming the third field `note` and later calling it `reason` (line 174) is sloppy and makes mistakes more likely.

What to do:
- Normalize the tuple or convert to objects.

---

## Page: `docs/technology-comparison.html`

### 1) “Color Legend” is not a color legend
Where:
- Legend tags are plain `.tag.is-light` with text (lines 41–53).

Why it’s a problem:
- A legend must encode visual mapping. Right now it’s just prose in pill shapes. There’s no color mapping presented to the user.

What to do:
- Use actual color swatches (small inline blocks) and ensure they match the table tag tones.

### 2) Table semantics + scanning is weak (too many identical pills)
Where:
- Most cells are wrapped in `.tag is-light` (lines 73+).

Why it’s a problem:
- You’ve turned the table into a wall of same-looking badges. This destroys scan-ability and makes the page feel noisy.

What to do:
- Use plain text for most values.
- Use tags sparingly for the one thing you want users to notice (ex: latency band).

### 3) Responsive behavior is “hope the browser scrolls”
Where:
- Tables are wrapped in `.table-container`, but you provide no explicit mobile strategy.

Why it’s a problem:
- Mobile will become horizontal-scroll purgatory with no cues.

What to do:
- Below a breakpoint: convert rows to stacked cards OR hide low-priority columns behind a toggle.

---

## Page: `docs/fulfillment-load-comparison.html`

### 1) You use semantic classes that you later override into nonsense
Where:
- Difficulty/status tags: `tag is-warning is-light`, `tag is-success` (lines 98, 110, 128).
- Your CSS (`theme.css` lines 174–180) remaps semantic tags into the same palette. That risks making “warning/success” visually indistinct.

Why it’s a problem:
- This page is data storytelling. If the status colors don’t mean anything, the story is mush.

What to do:
- Don’t remap success/warning/danger to the same styling. If you want only one hue family, use intensity + iconography and keep distinct signals.

### 2) “Divider row” uses an empty table row (layout hack)
Where:
- `<td colspan="4" class="has-background-light"></td>` (line 113).

Why it’s a problem:
- Screen readers see an empty row. It’s also fragile and can break striping/hover expectations.

What to do:
- Use `<tr aria-hidden="true" role="presentation">` if you insist.
- Better: split the table into two tables with separate headings, or add a `<tbody>` break.

---

## Page: `docs/tech-issues.html`

### 1) Core architecture problem: iframe-based navigation
Where:
- `<iframe id="contentFrame"...>` (line 49) plus JS sets `contentFrame.src` (line 205).

Why it’s a problem:
- Iframes are a “cheap docs portal” pattern: they break find-in-page, make deep links feel weird, complicate accessibility, and create duplicated CSS downloads in every subpage.

What to do:
- Render content in-page (fetch + inject sanitized HTML/JSON).
- Or navigate to real pages (no iframe) and keep a consistent sidebar across pages.

### 2) Navigation links are fake links (`href="#"`) and rely on JS to work
Where:
- `a.href = '#';` (line 183) + `e.preventDefault()` (line 188).

Why it’s a problem:
- This is poor semantics. If JS fails, everything collapses. Keyboard/screen reader expectations are also worse than real navigation.

What to do:
- Use real links: `a.href = 'tech-issues/<page>#...'` or similar.
- If you want SPA behavior, use `<button>` and manage focus properly.

### 3) No error handling for iframe loads
Where:
- You only listen to `load` (lines 214–216). No `error` handler.

Why it’s a problem:
- On a missing/404 page, the spinner can lie to the user (and the content just fails silently).

What to do:
- Add timeout + error UI. At minimum, stop loading and show a message when the iframe fails.

### 4) `dataset.category` is dead state
Where:
- `a.dataset.category = topic.type;` (line 185). Not used.

Why it’s a problem:
- Dead code is how UI code becomes a junk drawer.

What to do:
- Remove it or use it for filtering/grouping.

---

## JS: `docs/assets/js/tech-issue-renderer.js`

### 1) Inline `onclick` handlers inside HTML strings
Where:
- Buttons use `onclick="showLayer(${index})"` (line 33).

Why it’s a problem:
- Harder to maintain, harder to test, breaks encapsulation, and invites global namespace collisions.

What to do:
- Render buttons with `data-index` and attach one event listener (event delegation).

### 2) Over-broad selectors that can match unintended elements
Where:
- `document.querySelectorAll('[id^="layer-"]')` (line 107).

Why it’s a problem:
- Any element whose id starts with `layer-` anywhere in the doc will be toggled. That’s an avoidable footgun.

What to do:
- Scope to the `root` container (or the current page section) before querying.

### 3) `innerHTML` injection pattern repeated (XSS smell)
Where:
- `root.innerHTML = ...` (line 9).

Why it’s a problem:
- Same as LeetCode page: safe today because `pageData` is local, unsafe the moment you source data externally.

What to do:
- Use DOM APIs or sanitize.

---

## Pages: `docs/tech-issues/*.html` (all the individual issue pages)

These pages are structurally identical: they load Bulma + your CSS, mount a `#root`, and call `renderTechIssuePage(pageData)`.

### 1) Each issue page re-downloads Bulma + CSS (wasteful, slow, inconsistent caching assumptions)
Where:
- Example: `docs/tech-issues/api-gateway-traffic.html` loads Bulma + `../assets/css/theme.css` + `../assets/css/site.css` in its `<head>`.

Why it’s a problem:
- When used inside the iframe, you’re loading the same CSS again and again. It’s needless overhead and makes styling drift more likely.

What to do:
- If you keep iframe: consider minimal CSS inside iframe or use a shared, bundled stylesheet and strong caching.
- Better: remove iframe and make these real pages that share a single layout shell.

### 2) Visual hierarchy inside the rendered page is “section spam”
Where:
- Renderer outputs multiple `<section class="section">` blocks stacked with `pt-0` (see `tech-issue-renderer.js` lines 10–103).

Why it’s a problem:
- It’s Bulma-default spacing, not intentional composition. It reads like a template dump rather than a designed page.

What to do:
- Replace repeated `.section` blocks with one page layout container and consistent internal spacing (`gap`, `block + block` rules, or a spacing utility that you control).

---

## Misc Page: `test.html`

### 1) It’s a stray stub with different CSS loading behavior
Where:
- Loads only `docs/assets/css/site.css` (line 8), not `theme.css`.

Why it’s a problem:
- It doesn’t represent the real site styling and becomes a maintenance trap.

What to do:
- Delete it or make it a real, intentionally styled redirect page that uses the same CSS stack as `docs/`.


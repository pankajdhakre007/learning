# Consolidated Component Library

This doc consolidates the component set used across all pages (from `new.md`) and maps each to the CSS “library” layer used by this site.

CSS files (load order):
- `docs/assets/css/tokens.css` (design tokens)
- `docs/assets/css/bulma-overrides.css` (Bulma normalization + base component overrides)
- `docs/assets/css/components.css` (reusable custom components / layout primitives)
- `docs/assets/css/utilities.css` (small explicit utilities)

## Components (Styled)

### Box / Card
CSS: Bulma `.box` override in `bulma-overrides.css` (border/radius/shadow).

### Button
CSS: Bulma `.button` / `.buttons` with overrides in `bulma-overrides.css`.

### Button Group
CSS: Bulma `.button` / `.buttons` with overrides in `bulma-overrides.css`.

### Column
CSS: Bulma primitives with light normalization in `bulma-overrides.css`.

### Columns / Grid
CSS: Bulma primitives with light normalization in `bulma-overrides.css`.

### Comparisons Table
CSS: Bulma `.table` / `.table-container` overrides in `bulma-overrides.css` + responsive rules.

### Container
CSS: Bulma primitives with light normalization in `bulma-overrides.css`.

### Details / Summary (Disclosure)
CSS: `details.panel` behaviors in `components.css`.

### Doc Layout (Custom)
CSS: `.doc`, `.doc-section*` in `components.css`; Bulma `.content` for rich text.

### Footer
CSS: see `bulma-overrides.css` and `components.css`.

### Form Control
CSS: Bulma form primitives with overrides in `bulma-overrides.css`.

### Form Layout
CSS: Bulma form primitives with overrides in `bulma-overrides.css`.

### IFrame
CSS: `.iframe-shell` in `components.css` + base `iframe {}` in `bulma-overrides.css`.

### IFrame Shell (Custom)
CSS: `.iframe-shell` in `components.css` + base `iframe {}` in `bulma-overrides.css`.

### Insight Callout
CSS: see `bulma-overrides.css` and `components.css`.

### Layer Tabs (Buttons as Tabs)
CSS: see `bulma-overrides.css` and `components.css`.

### Legend + Swatches (Custom)
CSS: `.legend`, `.legend-row`, `.swatch` in `components.css`.

### Level (Horizontal Layout)
CSS: Bulma primitives with light normalization in `bulma-overrides.css`.

### Menu
CSS: Bulma `.menu` / `.menu-list` overrides in `bulma-overrides.css`.

### Message
CSS: Bulma `.notification` / `.message` overrides in `bulma-overrides.css` (semantic mapping + borders).

### Message Blocks (Symptoms/Causes/Effects/Mitigations)
CSS: see `bulma-overrides.css` and `components.css`.

### Navbar
CSS: `.topbar`, `.brand-mark`, `.brand-dot` in `components.css` + Bulma `.navbar` base.

### Notification
CSS: Bulma `.notification` / `.message` overrides in `bulma-overrides.css` (semantic mapping + borders).

### Page Header (Custom)
CSS: `.page-header`, `.page-header__*` in `components.css`.

### Panel (Custom)
CSS: `.panel`, `.panel__body`, `details.panel` behaviors in `components.css`.

### Prose Content
CSS: `.doc`, `.doc-section*` in `components.css`; Bulma `.content` for rich text.

### Section
CSS: Bulma primitives with light normalization in `bulma-overrides.css`.

### Skip Link (A11y)
CSS: `.skip-link` in `bulma-overrides.css`.

### Sticky Sidebar (Custom)
CSS: `.page-grid`, `.sidebar` in `components.css`.

### Table
CSS: Bulma `.table` / `.table-container` overrides in `bulma-overrides.css` + responsive rules.

### Table Container (Scrollable)
CSS: Bulma `.table` / `.table-container` overrides in `bulma-overrides.css` + responsive rules.

### Tag / Badge
CSS: Bulma `.tag` / `.tags` overrides in `bulma-overrides.css` (semantic mapping).

### Tag Group
CSS: Bulma `.tag` / `.tags` overrides in `bulma-overrides.css` (semantic mapping).

### Top Bar (Custom Navbar Skin)
CSS: `.topbar`, `.brand-mark`, `.brand-dot` in `components.css` + Bulma `.navbar` base.

### Two-Column Page Grid (Custom)
CSS: `.page-grid`, `.sidebar` in `components.css`.

### Typography (Title/Subtitle/Heading)
CSS: Bulma primitives with light normalization in `bulma-overrides.css`.

## Non-Visual / Structural Items

- Footer Landmark
- Header Landmark
- Main Landmark
- Nav Landmark
- Script Includes
- Tech-Issue Runtime UI (Rendered via JS)

## Notes

- This repo still uses Bulma’s class API as the “public component interface” for baseline components (buttons, tables, tags, menu, etc.).
- Custom cross-page components live in `components.css` with stable class names (page header, grid, panels, legend, iframe shell).
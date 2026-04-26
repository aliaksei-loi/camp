# Plan: Light / System / Dark modes

> Source PRD: `.ship/implement-light-system-dark-modes/context.md`

## Architectural decisions

Durable across all phases:

- **HTML state model**:
  - `<html data-theme="light|dark">` — *resolved* theme. All dark CSS hangs off `[data-theme="dark"]`.
  - `<html data-theme-mode="light|system|dark">` — *chosen* mode. Toggle reads/writes; CSS does not depend on it.
- **Persistence**: `localStorage` key `belcreation-theme-mode`, value is the literal mode (`"light"`, `"system"`, or `"dark"`). Absence of key = treat as `"system"` (the default).
- **Pre-hydration**: synchronous inline `<script>` at top of `<body>` (after `<html>` opens). Reads localStorage, resolves `system` via `matchMedia('(prefers-color-scheme: dark)')`, writes both attrs before first paint. No FOUC.
- **CSS pattern**: token-driven. Dark mode redefines `--c-*` and semantic tokens (`--primary`, `--accent`, etc.) inside `[data-theme="dark"]` in `app/globals.css`. Components continue to use `var(--token)` only. **Single dark variant** — independent of `data-palette`.
- **Toggle**: `ThemeToggle.tsx` client component. Single button. Click cycles `light → system → dark → light`. Icon reflects current *mode* (sun / system-glyph / moon). Russian aria-labels.
- **Live OS response**: when chosen mode is `system`, register a `matchMedia` change listener that updates `data-theme` (resolved) without page reload. Remove listener when leaving `system` mode.
- **Placement**: Nav (desktop) + mirror in mobile drawer.
- **Scope (in)**: all `(frontend)/*` routes, nav, drawer, footer, `<meta name="theme-color">`.
- **Scope (out)**: Payload admin (built-in dark), email templates, photographic/illustrated content (renders unchanged), third-party widgets.

---

## Phase 1: Foundation + base surfaces

**User stories**:
- As a visitor, when I first land on belcreation, the page respects my OS color scheme.
- As a visitor, I can click a single button in the nav to override OS preference (light or dark).
- As a returning visitor, my chosen mode persists across reloads with no FOUC.

### What to build

The full mechanism end-to-end on a minimal set of surfaces. Wire `data-theme` + `data-theme-mode` attrs on `<html>`, the synchronous pre-hydration script, and the `ThemeToggle` cycle button in the Nav. Define dark token overrides in `globals.css` for body background, body text, primary/accent, and the most common container surfaces. matchMedia listener active while in system mode.

The architecture is the deliverable here. Some downstream components (Schedule, Booking, drawer) may show light-mode-styled chrome against dark surfaces — that's expected and gets fixed in phase 2.

### Acceptance criteria

- [ ] On first visit (empty localStorage), `<html data-theme>` matches OS `prefers-color-scheme` and `<html data-theme-mode="system">`.
- [ ] Cycle button in Nav flips through `light → system → dark → light`. Icon reflects current mode.
- [ ] Chosen mode persists in `localStorage` under `belcreation-theme-mode`. Reload preserves both `data-theme` and `data-theme-mode`.
- [ ] No FOUC on hard refresh in any mode (verify by throttling network and watching for color flash).
- [ ] While in `system` mode, switching the OS theme (via `prefers-color-scheme` simulation) updates the page within ~1s without reload.
- [ ] Body background, body text, primary, and accent visibly change between light and dark.
- [ ] Existing `data-palette` and `data-type` attributes still work — they are independent of dark mode.

---

## Phase 2: Component coverage

**User stories**:
- As a visitor in dark mode, every page on the site looks intentional — no light-mode chrome floating in a dark layout.

### What to build

Apply dark token overrides and any per-component dark rules needed across all `(frontend)` surfaces. Touch (non-exhaustive — implementer reads each component to decide):

- Nav: logo, links, active/pinned states, mobile-trigger
- Mobile drawer: backdrop, panel, link rows
- Footer
- ScheduleAccordion: card, expanded panel, segmented tabs, themed pills, handwritten times
- BookingPage and forms: inputs, labels, focus rings, validation
- Buttons (primary, secondary, link variants)
- Cards / surfaces shared across pages

Where token redefinition is enough → no per-component CSS. Where a component uses hardcoded color → either move to a token or add a targeted `[data-theme="dark"] .component { … }` block.

### Acceptance criteria

- [ ] Every `(frontend)/*` route renders with no visibly-broken chrome in dark mode at 375 / 390 / 428 / 1440px.
- [ ] Text contrast on every surface meets WCAG AA (visual-qa flags any failure).
- [ ] No light-mode chrome (e.g. white nav background, white card surfaces) leaks through in dark mode.
- [ ] No regressions in light mode — every route still passes visual-qa screenshots in light.
- [ ] Form focus states and button hover states remain clearly visible in dark.
- [ ] Mobile drawer dark variant covers backdrop, panel, link list, close button, and the nav-mirrored ThemeToggle.

---

## Phase 3: Polish + edge cases

**User stories**:
- As a mobile visitor, the address-bar color matches the page theme.
- As a Russian-speaking visitor, the toggle's accessible labels are in Russian and accurate to the current mode.
- As a visitor, any visual issues caught during phase 2 are resolved before merge.

### What to build

- Wire `<meta name="theme-color">` — value flips with the resolved theme. Likely managed via a small client effect (or a dedicated `<meta>` synced to `data-theme` via the pre-hydration script + a hydration update).
- Finalize Russian aria-labels on the toggle for each mode (e.g. *Светлая тема / Авто / Тёмная тема*) and ensure `aria-pressed` / `aria-label` are accurate per current mode.
- Optional: short CSS transition (≤200ms) on `background-color`, `color`, and `border-color` properties when `data-theme` changes — only if it does not cause perceptible jank.
- Address any `critical` visual-qa findings from phase 2.
- Sanity check: matchMedia not supported (very old browsers) → silent fallback to light, toggle still works.

### Acceptance criteria

- [ ] On iOS Safari, the address bar tint matches the resolved theme; flips when toggling.
- [ ] On Android Chrome, the system bar tint matches.
- [ ] Toggle's `aria-label` and visible label (if any) are in Russian and correctly describe the current state.
- [ ] All `critical` findings from phase 2 visual-qa are resolved.
- [ ] No regressions in light mode after phase 3.
- [ ] If transition animation is included, it runs in <200ms and does not cause repaint thrash on slower devices (verified at 4× CPU throttle).
- [ ] Browser without `matchMedia` (or with it stubbed out) falls back to light gracefully — no console errors, toggle still cycles.

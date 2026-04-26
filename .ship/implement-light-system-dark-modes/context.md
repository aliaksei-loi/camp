# Ship context: implement-light-system-dark-modes

## Idea
implement light/system/dark modes

## Stack background
- Next.js 16 (App Router) + Payload 3.83
- Plain CSS, NO Tailwind. Tokens in `app/globals.css` (`--c-*`, `--primary`, `--accent`, etc.)
- Existing layered theming: `[data-palette]` and `[data-type]` attributes on `<html>`
- Site language: Russian
- Building fresh — `orchestrate/dark-theme-mvp` branch (with prior 2-state work) is intentionally ignored

## Resolved decisions

### Behavior
- **Default mode for new visitors**: `system` (respects `prefers-color-scheme`)
- **Toggle UI**: single cycle button. One click cycles `light → system → dark → light`. Lives in Nav (desktop) and mirror in mobile drawer.
- **Live OS response**: yes — `matchMedia('(prefers-color-scheme: dark)')` listener updates resolved theme on the fly while in `system` mode

### State model
- `<html data-theme="light|dark">` — *resolved* theme (always concrete, never "system"). All dark CSS hangs off this selector.
- `<html data-theme-mode="light|system|dark">` — *chosen* mode. The toggle reads/writes this; CSS does not depend on it.
- Pre-hydration inline script reads localStorage, resolves `system` via `matchMedia`, writes both attrs before paint (no FOUC).
- localStorage stores the mode literal (`"light" | "system" | "dark"`).

### Visual / palette
- **Single dark variant** — dark mode looks the same regardless of `data-palette`. Dark CSS overrides palette tokens; palette switching effectively only affects light mode for v1.
- **Color values**: implementer picks dark values by inverting the existing `--c-*` tokens (paper → near-black, ink → near-white) and slightly desaturating the brand accents (rust, coral) for dark contrast.
- **CSS approach**: token-driven. Components keep using `var(--token)`; `[data-theme="dark"] { … }` redefines the tokens.

### Scope (in)
- All `(frontend)/*` routes — homepage, schedule, booking, footer, nav, drawer
- `<meta name="theme-color">` flips with resolved theme (mobile address-bar tinting)

### Scope (out)
- Payload admin — has its own dark mode
- Email templates — different rendering context
- Photographic / illustrated content — render as-is against dark surfaces (camp-site convention; no `filter`, no alt assets for v1)
- Cookie banners / third-party widgets

## Implementer's discretion (sensible defaults)
- Icon for "system" mode — pick a system/auto glyph from the sprite (or add one if none fits)
- Storage key + value naming — pick conventional (e.g. `belcreation-theme-mode`)
- Russian aria-labels — match site language pattern (e.g. `Светлая | Авто | Тёмная`)
- matchMedia fallback for very old browsers — default to light
- Toggle placement: Nav (desktop) + mobile drawer

## Validation expectations
- Visual-qa flags any contrast failures at 375 / 390 / 428 / 1440px in both themes
- No FOUC on hard refresh in either mode (pre-hydration script must be inline + synchronous)
- Switching modes via the toggle persists across reloads
- Switching OS theme while in `system` mode updates the page within ~1 second, no reload

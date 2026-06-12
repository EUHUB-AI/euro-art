# NOTES

## Content & Assets Usage
- All textual content was extracted faithfully from `docs/content/all.md`. No new business details were invented.
- All images are sourced from `docs/images/` and copied to `public/images/`.

## Neutral Placeholders
Because the original content file did not provide specific contact details (only "Dohodnite si stretnutie, ... za opýtanie nič nedáte :)"), the following neutral placeholders were added in the "Kontakt" section:
- **Email**: `info@euroart-placeholder.sk`
- **Phone**: `+421 900 000 000`

A small footnote was added stating `* Kontaktné údaje sú momentálne ilustračné.` (Contact details are illustrative for now).

## Tech Stack Decisions
- **Tailwind v4**: We used the newly released Tailwind CSS v4 alongside its `@tailwindcss/vite` plugin instead of `postcss` and `autoprefixer` because Vite 6 and the newest versions of Tailwind default to this newer, faster architecture.
- **CSS-First Interactions**: Hover interactions are built using pure CSS in Tailwind's utility layer and explicitly scoped away from touch interfaces using `@media (hover: none)`.
- **Pre-Reduced Motion**: Global `@media (prefers-reduced-motion: reduce)` was applied in `src/index.css` to respect user OS accessibility settings.

# FID & Co. — Creative Direction (Master Reference)
*This is a running document. New notes get ADDED here, not used to replace what's already confirmed. Update this file instead of writing a fresh prompt from scratch each time.*

## Confirmed — Hero video / motion graphic
- Punchy but corporate — not playful, not chaotic. "Bustle" energy.
- Reference: Burson Global (bursonglobal.com) — confident, high-contrast, brand-color-driven motion.
- Kinetic type used sparingly (2-3 moments max, not constant) — words enter from screen edges, merge/overlap at center, then reveal imagery through the letterforms (mask effect).
- Color shifts tied strictly to brand palette — no generic/rainbow color cycling.
- Real logo (SVG, client-provided) used ONLY at the very end, on a clean neutral/white canvas so it's legible.
- No logo anywhere in the top ~15% of frame (reserved for real site header).
- Seamless loop — end state fades/resolves back into the opening state, no visible cut.
- Because brand colors are muted/subdued, smoothness of motion has to carry the "premium" feeling — slow ease-in-out easing throughout, no linear motion, no snaps, no jitter. Motion should feel weighted, like slow-motion luxury film pacing.

## Confirmed — "Who we are" section wireframe
- Split two-column layout: copy left, visual right.
- No CTA in this section (informational, not conversion).
- No photography here — icons instead, representing service pillars.
- Scroll-triggered reveal: heading first, body copy staggered line-by-line, icons staggered in with scale+fade, subtle idle motion after (float/rotate), stat row last.
- Respect prefers-reduced-motion; animate once per session, not on every scroll pass.

## Confirmed — Photography style/mood (reference: theme.madsparrow.me/most)
**Client liked the photography treatment specifically — NOT the site layout or slider structure.**
- Editorial, cinematic feel — moody lighting, shallow depth of field, intentional composition.
- Muted, filmic color grading — not bright/flat stock-photo coloring.
- When people are featured: natural, candid-feeling poses — not stiff corporate stock photography.
- Overall mood: polished, slightly dramatic, high-end.
- This is a photo-treatment reference only — existing page layouts stay as-is.

## Confirmed — Stock photography
- Source: Pexels API (free, no attribution required, higher rate limits than Unsplash).
- Key stored in `.env.local` as `PEXELS_API_KEY` (server-only, gitignored).
- Apply to: Page 2, Our Services, Our Work, Our Expertise.
- Search terms should be specific and on-brand (e.g. "corporate press conference," "African business meeting") — not generic ("business," "office").
- Apply the photography style/mood direction above to whichever images get selected — this is the filter for choosing among stock results, not a separate style.

## Confirmed — Abstract graphics
- Subtle geometric shapes / line work / soft gradient forms, in brand palette only.
- Used sparingly — 1-2 abstract elements per section, not repeated as a pattern across a whole page.
- Should feel intentional/premium, not decorative filler.

## Confirmed — Background imagery on plain/white pages
- Blurred or low-opacity photo behind content on pages that feel too empty/white.
- Should read as atmospheric depth, not a literal photo placement.
- Pull from the same stock source, filtered through the photography mood direction above.

## Process rule (client-requested)
- Claude Design should propose 2-3 directions and get sign-off before generating final versions — no blanket application across multiple pages without review.

---
*Next update: add anything new here as a new dated note below, don't rewrite the sections above unless the client explicitly reverses something.*

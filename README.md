# Cross Designs

One-stop web studio site: websites, SEO, and paid ads for local and service businesses.

- Build date: 2026-06-03
- Repo: cross-designs (user crossfiber)
- Live URL: https://crossfiber.github.io/cross-designs/
- Target site: n/a (net-new agency site, no prior site)

## Fonts
- Space Grotesk (headlines + body) - https://fonts.google.com/specimen/Space+Grotesk
- Caveat (hand-drawn annotations + wordmark) - https://fonts.google.com/specimen/Caveat

## Palette (monochrome per brief)
- Ink #181613 (warm near-black)
- Paper #F7F4EC (warm off-white)
- Card white #FFFFFF
- Pencil gray #75726B
- Line #DEDACF
Source: defined from the brief's black-ink-on-paper sketchbook direction. No color accent;
"clickable" is signaled by filled-ink pills and hand-drawn boxed buttons.

## Design direction (one paragraph)
A designer's sketchbook as a website: ruled notebook paper with a left margin rule and a soft
desk vignette, black ink, one pencil gray, hand-drawn
marker underlines, circled words, and sketched arrows. Signature element is a hand-drawn
"site sketch" in the hero (an ink browser wireframe taped at an angle with margin notes),
something only a studio that draws sites by hand would use.

## Assets
- assets/cross-photo.jpg - Cross's headshot, converted to grayscale to fit the monochrome
  brand, cropped 4:5 for the About polaroid. Sourced from client-provided headshot_black.png.
- Portfolio previews are HOTLINKED from Cross's own live builds:
  - https://redlinegolfacademy.com/assets/ryan-followthrough-monitor-hero.webp
  - https://casicamacho.com/assets/book-cover.png
  Both are GitHub-Pages hosted, so no referrer blocking. onerror fallbacks show the URL if a
  preview ever fails. Re-host into assets/ later if you want the repo fully self-contained.

## Placeholders / still to do
- Logo: currently the hand-drawn Caveat "Cross Designs" wordmark (fits the brand). Drop
  assets/cross-logo.png and swap if you want your mark instead.
- [LOCATION NEEDED FOR LOCAL SEO]: site is positioned as remote/US-wide. If you want to rank
  for a specific city, give me the city and I will add LocalBusiness geo + local keywords.
- No phone number provided: contact is email + form only. Add a number and I will wire tel: links.
- Social profiles: none provided; footer omits social icons. Send handles to add them.

## Reference builds consulted
Builda reference builds were not accessible in this environment (Downloads-only mount). Built
from prompt standards: solid-from-load nav, single-open max-height accordion, novalidate JS
form validation, body scroll lock + safe-area drawer, anchor smooth-scroll with hash strip,
dvh-safe full-height surfaces.

## Notes
- Single index.html, all CSS/JS inline. Only external deps: Google Fonts. (No Font Awesome:
  all icons are inline hand-drawn SVG line art.)
- Zero em dashes, zero emojis, monochrome only.

# Cross Designs - Portfolio v1

Single-page portfolio for **Aiden Camacho** / Cross Designs. Y2K-cyber + grungy aesthetic, built end-to-end as a single hand-coded `index.html`.

## Live URL (after deploy)
- https://crossfiber.github.io/cross-designs/

## Stack
- Single `index.html` with all CSS and JS inline
- Google Fonts: Rubik Glitch, Monoton, Space Mono, Space Grotesk
- Font Awesome 6 (CDN)
- Live `<iframe>` previews of redlinegolfacademy.com and casicamacho.com on desktop, mobile-friendly CTA card swap below 768px

## Color palette (with sources)
- Background `#08090C` - deep cyber-canvas dark, derived from Y2K mood board
- Surface `#13151D` - lifted near-black for cards/surfaces
- Chrome `#C5CAD2` / `#EAEDF2` - Y2K chrome motif
- Electric blue `#2945FF` - Frutiger Aero / Y2K anchor (primary brand)
- Acid lime `#C8FF1F` - accent reserved for CTAs and clickable elements only

## Fonts
- Rubik Glitch - display wordmark
- Monoton - section H2 / chrome headlines
- Space Mono - UI labels, terminal text
- Space Grotesk - body

## Outstanding placeholders to swap before going public
- `[ HEADSHOT NEEDED ]` - drop in real Aiden headshot in the WEBCAM_01.JPG window in the About section
- `[ ADD PHONE / SOCIALS / CALENDLY HERE ]` - contact sidebar placeholder
- `og-card.png` - designed share card (1200x630) for social previews; place at `/assets/og-card.png`

## Deployment
Run `deploy.ps1` from PowerShell to create the GitHub repo and push:
```
powershell -ExecutionPolicy Bypass -File deploy.ps1
```
The script reads the token from `credentials.md` (kept local), creates `crossfiber/cross-designs` via the GitHub API, uploads `index.html` + `README.md`, and enables GitHub Pages on `main`.

## Folder
```
cross-designs/
├── index.html              the build
├── README.md               this file
├── design-direction.md     diagnosis, palette, signature element, blacklist avoidance
├── credentials.md          LOCAL ONLY - gitignored, never pushed
├── deploy.ps1              one-shot PowerShell deployer
├── .gitignore
└── assets/                 (empty for v1; drop og-card.png + headshot here)
```

## Build date
2026-05-06

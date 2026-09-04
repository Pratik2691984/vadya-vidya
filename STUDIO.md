# Standalone studio map

One HTML file, no React, no Tailwind, no keys.

```
standalone/vadya-vidya-complete-classical.html
├── gate        tap → AudioContext.resume()
├── Studio      Q A/B, rāga, tāla, chips, lyrics
├── Harmonics   wave + 8 partial sliders f_n = n·f0
├── Tuning      22-śruti / Athan / 17-parda / 12-TET
├── Generate    style≤1000 · lyrics≤5000 · neg≤200
├── Formulae    live cents, Δt, f_inharm, cycle
└── How         map + security
```

Modular originals stay at repo root:
`index.html` `app.js` `data.js` `FORMULAE.md` `GUIDE.md`

Security: no fetch, no cookies, no tokens. localStorage key `vv_complete_v15` only.

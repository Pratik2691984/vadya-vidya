# Universal Vādya Vidyā v15 — Complete Guide

V15 is a **constrained generation engine**. It prepares prompts that fit inside AI model fields, instead of dumping analysis that would overflow or confuse the model.

The app is the cockpit. This file is the chart book for what the engine will and will not emit.

---

## v13 vs v15 — what actually changed

| What | v13 and earlier | v15 (this repo) |
|---|---|---|
| Lyrics sent to models | Often carried `[mātrā:]`, `[Guru:]`, `[script:]` | Those tags are **stripped**. Only `[Sthayi]` `[Antara]` `[Sanchari]` `[Abhog]` survive |
| Style block | Long, unbounded | Hard cap **1000** characters |
| Negative block | Informal | Hard cap **200** characters |
| Acoustics | Described | Bumbung cavity **Q** is compiled into the style line |
| Grids in UI | Mostly Hindustani | Hindustani 22-śruti **plus** Burmese Athan and Shashmaqam 17-parda |

---

## Quick start

1. Open the studio (this actually runs):  
   https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/index.html
2. On a phone: Chrome or Samsung Internet. Tap **Enter Studio** once to start Web Audio.
3. **Meta AI cannot run this HTML** — it will look blank. Use the browser for the studio. Paste only the three copied prompt blocks into Meta AI / Suno / Udio / Stable Audio.
4. GitHub Pages (`pratik2691984.github.io/vadya-vidya`) stays **404** until  
   **Settings → Pages → Source = GitHub Actions**, then run the workflow.  
   The CDN link does not wait for that.

Repo: https://github.com/Pratik2691984/vadya-vidya  
This guide: https://github.com/Pratik2691984/vadya-vidya/blob/main/GUIDE.md

---

## What v15 actually ships

Two tabs.

### 1. Master Studio

- Tradition switch: Burmese (Athan + Si Wa), Shashmaqam Rast + Usul Saraxbor, Bhoopali + Keherwa, Yaman + Tīntāl
- Pitch chips on the active grid (tap to audition from Sa = 130.81 Hz)
- Bumbung A/B: Q = 14 tuned tube vs Q = 1.2 uncoupled slab
- Cavity Q slider 1.0–25.0
- Tānpurā drone (Sa–Pa 3/2)
- Lyrics input (any script)

### 2. Clean Prompts

- Style dispatch ≤ 1000
- Clean structured lyrics ≤ 5000
- Negative prompt ≤ 200
- Copy buttons

---

## Not in the current public studio

Do not promise these in a v15 paste. They are atlas / later wiring:

- Tabla / scale MIDI download
- Per-line Pingala tags inside lyrics sent to the model
- Separate Saves / Rasa / Vādya instrument rack tabs
- Selectable Sundanese / Javanese / Balinese buttons

---

## How to dispatch to a model

1. Choose tradition (this selects rāga/athan **and** default tāla/usul).
2. Set Q if the resonator matters (14 for tube, 1.2 to demonstrate clang).
3. Paste source text.
4. Open **Clean Prompts**.
5. Copy three blocks into the model as:
   - style / tags field ← block 1
   - lyrics field ← block 2
   - negative / exclude field ← block 3

Do not concatenate the three blocks into one Meta AI message if the tool has separate style and lyrics fields. If it has only one box, paste style, then a blank line, then lyrics, then `Negative: ` + block 3.

---

## Engine rules (what the copy buttons emit)

### Style ≤ 1000

Compiled, then sliced to 1000:

- Tradition + rāga / athan / parda + thaat
- Vadi, samvadi, rasa
- Tāla / usul, beat count, BPM
- 22-śruti JI or the active non-tempered grid
- Tānpurā Sa–Pa, Bumbung `Q=x.x`, avanaddha theka, bamboo lead
- Microtonal inflection, meend, Euler–Bernoulli transient rejection (`f_inharm ≈ 2.756 · f1`)

Do not hand-edit the block back over 1000.

### Lyrics ≤ 5000

Strip `[...]` `(...)` `{...}` `<...>`, Piṅgala `।` `ऽ` `|`, then rebuild:

```
[Sthayi]
<first up-to-4 source lines>

[Antara]
<rest, or a repeat of Sthayi>

[Sanchari 2]
...
[Abhog 2]
...
```

Forbidden in the export: `[mātrā:13]`, `[script:devanagari]`, `[Guru:5]`, `[Laghu:3]`, `[Gaṇa]`, `[Vadi:G]`.

### Negative ≤ 200

electronic, autotune, synth, modern pop drums, 808 bass, EDM riser, distorted guitar, artificial reverb, lo-fi hiss, Western tempered chords, clipping

---

## Live grids

Reference Sa = 130.81 Hz.

- **22-śruti JI** — `data.js` `SRUTI_22_MAP`. Chip row: S, R2 9/8, G1 5/4, P 3/2, D1 5/3, S'. Yaman still names tīvra Ma (`m2` 729/512) in style.
- **Burmese Athan** + Si Wa — 0 / 165 / 360 / 510 / 690 / 850 / 1030 / 1200 ¢
- **Shashmaqam 17-parda** + Usul Saraxbor — Rast 0, Dugah 204, Zalzal ~350, Nava 498, Panjgah 702, Awj ~1050, Gerdaniya 1200 ¢

A glossonym is not a scale. Sanskrit → rāga. Burmese → Athan. Uzbek/Tajik suite → parda. No treatise → scientific JI.

Atlas-only (hand-written style, no UI button): Javanese bedantara ~266¢, Sundanese padantara ~240¢, degung / madenda / mataram kept separate, Balinese Gender Wayang ~275¢ / ~1220¢ octave / ombak 5–7 Hz by register. Ombak is Hertz, not cents.

Default dispatch tempo: **76 BPM**.

---

## File map

| File | Role |
|---|---|
| `index.html` | Shell, tokens, import map |
| `app.js` | Studio UI + cleaners + Web Audio |
| `data.js` | `SRUTI_22_MAP`, `WORLD_GRIDS`, `TALA_LIBRARY`, `RAGA_LIBRARY` |
| `GUIDE.md` | This document |
| `.github/workflows/pages.yml` | Pages deploy |

---

## Links

- Studio (works): https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/index.html
- Repo: https://github.com/Pratik2691984/vadya-vidya
- Guide: https://github.com/Pratik2691984/vadya-vidya/blob/main/GUIDE.md
- Pages (after Actions setup): https://pratik2691984.github.io/vadya-vidya/

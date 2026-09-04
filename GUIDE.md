# Universal Vādya Vidyā v15 — Complete Guide

Vādya Vidyā v15 is a browser studio plus a **constrained generation engine**.  
The app is the cockpit. This guide is the chart book for what the engine will and will not emit.

Version split:

| | v13 and earlier | v15 (this repo) |
|---|---|---|
| Lyrics sent to models | Often carried `[mātrā:]`, `[Guru:]`, `[script:]` | Those tags are **stripped** |
| Style block | Long, unbounded | Hard cap **1000** characters |
| Negative block | Informal | Hard cap **200** characters |
| Structure | Mixed | Only `[Sthayi]` `[Antara]` `[Sanchari]` `[Abhog]` |
| Acoustics | Described | Bumbung cavity **Q** is compiled into the style line |
| Grids in UI | Mostly Hindustani | Hindustani 22-śruti **plus** Burmese Athan and Shashmaqam 17-parda |

---

## Open it

- Studio (works without Pages): https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/index.html
- Repo: https://github.com/Pratik2691984/vadya-vidya
- This guide: https://github.com/Pratik2691984/vadya-vidya/blob/main/GUIDE.md
- Pages (only after Settings → Pages → GitHub Actions): https://pratik2691984.github.io/vadya-vidya/

On a phone: open the CDN link in Chrome or Samsung Internet, tap **Enter Studio** once so Web Audio can start.

**Meta AI cannot run this HTML.** It will look blank. Use the browser for the studio; paste only the three copied prompt blocks into Meta AI / Suno / Udio / Stable Audio.

---

## What v15 actually ships

Two tabs.

1. **Master Studio**
   - Tradition switch: Burmese (Athan + Si Wa), Shashmaqam Rast + Usul Saraxbor, Bhoopali + Keherwa, Yaman + Tīntāl
   - Pitch chips on the active grid (tap to audition from Sa = 130.81 Hz)
   - Bumbung A/B: Q = 14 tuned tube vs Q = 1.2 uncoupled slab
   - Cavity Q slider 1.0–25.0
   - Tānpurā drone (Sa–Pa 3/2)
   - Lyrics input (any script)
2. **Clean Prompts**
   - Style dispatch ≤ 1000
   - Clean structured lyrics ≤ 5000
   - Negative prompt ≤ 200
   - Copy buttons

Not in the current public studio (atlas / later wiring, do not promise them in a v15 paste):

- Tabla / scale MIDI download
- Per-line Pingala tags inside lyrics sent to the model
- Separate Saves / Rasa / Vādya instrument rack tabs
- Selectable Sundanese / Javanese / Balinese buttons (those grammars are specified below; they are not UI presets yet)

---

## Generation engine — hard rules

### 1. Style dispatch ≤ 1000 characters

Compiled in this order, then sliced to 1000:

- Tradition label and rāga / athan / parda name + thaat
- Vadi, samvadi, rasa
- Tāla / usul name, beat count, BPM
- Intonation: 22-śruti JI or the active non-tempered grid
- Instruments: tānpurā Sa–Pa drone, Bumbung cavity `Q=x.x`, avanaddha theka, bamboo lead
- Performance: microtonal inflection, meend, Euler–Bernoulli transient rejection

If a sentence would overflow 1000, it is cut. Do not hand-edit the block back over the cap.

### 2. Clean structured lyrics ≤ 5000 characters

The cleaner deletes, line by line:

- `[...]` `(...)` `{...}` `<...>`
- Piṅgala marks `।` `ऽ` and `|`
- Empty lines after strip

It then rebuilds:

```
[Sthayi]
<first up-to-4 source lines>

[Antara]
<remaining source lines, or a repeat of Sthayi>

[Sanchari 2]
...
[Abhog 2]
...
```

Allowed structural markers only.  
**Forbidden in the export:** `[mātrā:13]`, `[script:devanagari]`, `[Guru:5]`, `[Laghu:3]`, `[Gaṇa]`, `[Vadi:G]`.

Those belong in analysis UI, not in the model lyrics field. v13 prompts that embedded them are invalid for v15.

### 3. Negative prompt ≤ 200 characters

Default family (trimmed to 200):

electronic, autotune, synth, modern pop drums, 808 bass, EDM riser, distorted guitar, artificial reverb, lo-fi hiss, Western tempered chords, clipping

---

## Physical layer (compiled, not decorative)

```
¢ = 1200 · log2(f / f0)
f = f0 · (n / d)                 # just ratio
f = f0 · 2^(cents/1200)          # grid from cents
Δt = 60 / BPM
f_inharm ≈ 2.756 · f1            # free-free bronze / Euler-Bernoulli
```

**Bumbung Q-filter**

- Slot A, Q ≈ 14: bandpass at f1; 2.756·f1 strike is gated in ~35 ms
- Slot B, Q ≈ 1.2: the inharmonic clang leaks
- Style line always carries the live `Q=` so the audio model is told which resonator you chose

**Ombak is Hertz, not cents.**  
The same Δf (5–8.5 Hz) is a wide beat on a low jegogan and a tight beat on a high kantil. Register-scaled ombak is an atlas rule for Balinese grids. The v15 UI does not yet expose kebyar / Gender Wayang as a preset; if you write a manual style for those, state ombak in Hz and name the register.

---

## Modal lattices in the live UI

### 22-śruti just intonation (Bhoopali, Yaman, and the śruti map)

Reference Sa = 130.81 Hz. Named śruti ratios live in `data.js` (`SRUTI_22_MAP`): 1/1, 256/243, 16/15, 10/9, 9/8, 32/27, 6/5, 5/4, 81/64, 4/3, 27/20, 45/32, 729/512, 3/2, 128/81, 8/5, 5/3, 27/16, 16/9, 9/5, 15/8, 243/128, 2/1.

Chip row for pentatonic / Kalyan presets: S, R2 (9/8), G1 (5/4), P (3/2), D1 (5/3), S'.

Yaman uses tīvra Ma (`m2`, 729/512) in the style grammar even when the short chip row is pentatonic.

### Burmese Athan (Than-yoe / Hsaing Waing family)

Heptatonic, non-tempered neutrals. Meter preset: Si Wa.

| Degree | Role | ¢ |
|---|---|---|
| 1 Than-hman | tonic | 0 |
| 2 Hna-pauk | neutral 2nd | 165 |
| 3 Thone-pauk | neutral 3rd | 360 |
| 4 Lay-pauk | subdominant | 510 |
| 5 Nga-pau | dominant pillar | 690 |
| 6 Chauk-pauk | major 6th | 850 |
| 7 Khun-pau | neutral 7th | 1030 |
| 1' | octave | 1200 |

### Shashmaqam 17-parda (Safi al-Din lineage)

Limma / apotome / Zalzal. Meter preset: Usul Saraxbor (doira).

Pillars: Asos/Rast 0¢, Dugah 204¢ (9/8), Wusta Zalzal ~350¢, Nava 498¢ (4/3), Panjgah 702¢ (3/2), Awj ~1050¢, Gerdaniya 1200¢.

A glossonym is not a scale. Sanskrit → rāga grammar. Burmese → Athan. Uzbek/Tajik suite → parda. English with no treatise → scientific JI, not a fake rāga.

---

## Atlas grammars (specified, not UI-preset in v15)

Use these only in a hand-written style if you leave the four studio buttons.

| Tradition | Characteristic | Octave | Ombak |
|---|---|---|---|
| Javanese bedantara | ~266¢ step 3→5 | 1200 | off |
| Sundanese padantara | ~240¢ | 1200 | off |
| Sundanese degung / madenda / mataram | treat separately; do not collapse to “sléndro” | 1200 | off |
| Balinese Gender Wayang | ~275¢ | ~1220 | 5–7 Hz, scale by register |
| Gong Kebyar selisir | pelog-family; name selisir | — | register-scaled Hz |

Kepatihan (ji ro lu pat ma nem pi) and Machjar Sundanese numbering are **labels**. The oscillator row is always low → high.

---

## Tāla / usul library (style compiler)

| Id | Beats | Use |
|---|---|---|
| Tīntāl | 16 | Yaman / khyāl gat |
| Keherwa | 8 | Bhoopali, bhajan |
| Dādrā | 6 | light / romantic |
| Jhaptal | 10 | meditative |
| Rūpak | 7 | sam on khālī feel |
| Ektāl | 12 | vilambit |
| Si Wa | 8 | Burmese binary clapper / bell |
| Usul Saraxbor | 8 | Bukhara Shashmaqam doira |

Default studio tempo for dispatch: **76 BPM** unless you change it.

---

## Worked paste examples

Put **only the verse** in the lyrics box. Do not pre-tag mātrā.

### Gāyatrī — Bhoopali + Keherwa

```
ॐ भूर्भुवः स्वः
तत्सवितुर्वरे⏣्यम्
भर्गो देवस्य धीमहि
धियो यो नः प्रचोदयात्
```

Expected lyrics export shape:

```
[Sthayi]
ॐ भूर्भुवः स्वः
तत्सवितुर्वरे⏣्यम्
भर्गो देवस्य धीमहि
धियो यो नः प्रचोदयात्

[Antara]
…
```

### Guru stotra — same path

```
गुरु ब्रह्मा गुरु विष्⏣ुः
गुरु देवो महेश्वरः
गुरु साक्षात् परब्रह्म
तस्मै श्री गुरवे नमः
```

### Mixed-script recital (default studio seed family)

Burmese line + Shashmaqam line + Hindi śāyari can sit in one box. The cleaner keeps the words and assigns Sthayi / Antara by line order. Switch the tradition button to the grid you want the **style** block to name.

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

## GitHub Actions / Pages (why the other URL is blank)

`pages.yml` deploys the repo root after each push to `main`. It cannot create the Pages site the first time. Enable once:

https://github.com/Pratik2691984/vadya-vidya/settings/pages  
Source = **GitHub Actions** → Save → Actions → Run workflow.

Until that run is green, `*.github.io/vadya-vidya/` is 404. The jsDelivr studio link does not depend on Pages.

---

## File map

| File | Role |
|---|---|
| `index.html` | Shell, tokens, import map |
| `app.js` | Studio UI + cleaners + Web Audio |
| `data.js` | `SRUTI_22_MAP`, `WORLD_GRIDS`, `TALA_LIBRARY`, `RAGA_LIBRARY` |
| `GUIDE.md` | This document |
| `.github/workflows/pages.yml` | Pages deploy |

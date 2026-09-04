# Universal Vādya Vidyā — The Complete Guide

Welcome to the Vādya Vidyā universe – an interactive studio for sacred sound, world music traditions, and AI-assisted composition.

This is a living ontology: ancient acoustic science, modern music technology, and pedagogical clarity.

## Open the studio

- Studio (CDN, works now): https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/index.html
- Repo: https://github.com/Pratik2691984/vadya-vidya
- This guide: https://github.com/Pratik2691984/vadya-vidya/blob/main/GUIDE.md
- GitHub Pages (after you enable Pages): https://pratik2691984.github.io/vadya-vidya/

Meta AI cannot run the studio HTML. Open the studio in a browser, copy the Clean Prompts, then paste those texts into Meta AI.

## What is Vādya Vidyā?

Vādya Vidyā (वाद्य विद्या — the science of instruments) is a browser audio laboratory that:

- Analyses text (mantra, śloka, bhajan, poetry) with Piṅgala prosody — Guru / Laghu akṣara parsing.
- Recommends rāga, tāla, tempo, and ornaments.
- Generates constrained AI prompts: style ≤1000 chars, lyrics ≤5000 chars, negative ≤200 chars.
- Plays 22-śruti just intonation, tānpurā drone, Bumbung cavity Q-filter, and modal pitch chips (Burmese Athan, Shashmaqam 17-parda).
- Keeps lyrics clean under [Sthayi] / [Antara] / [Sanchari] / [Abhog] with analysis tags stripped.

No install. No account.

## Live examples — copy into Lyrics

### 1. Gāyatrī

```
ॐ भूर्भुवः स्वः
तत्सवितुर्वरेण्यम्
भर्गो देवस्य धीमहि
धियो यो नः प्रचोदयात्
```

Mood: serene. Typical dispatch: Bhoopali + Keherwa, ~76 BPM.

### 2. Guru Stotra

```
॥ गुरु ब्रह्मा गुरु विष्⏣ुः ॥
गुरु देवो महेश्वरः।
गुरु साक्षात् परब्रह्म
तस्मै श्री गुरवे नमः॥
```

### 3. Śiva bhajan

```
शिव के प्रिय भोले नाथ,
तुम हो संसार के दाता।
भक्त जनों के रखवाले,
हर लो सबके संकट माता॥
```

### 4. Kṛṣṇa viraha

```
काहे मोहे बिसारो सजनवा,
मुरली की धुन सुनाओ री।
राधा मन हरि बिन व्याकुल,
नैनन में बरसै सावन री।
```

Then tap **Generate Prompts** and copy the three blocks.

## Prompt constraints (generation engine)

| Block | Limit | Rule |
|---|---|---|
| Style | 1000 chars | Acoustic + modal + tāla + Q-factor |
| Lyrics | 5000 chars | Clean text only; [Sthayi] [Antara] [Sanchari] [Abhog] |
| Negative | 200 chars | No synth / autotune / 12-TET pop kit |

Do not ship analysis tags such as `[mātrā:16]` or `[Laghu:4]` inside the lyrics block. The studio strips those.

## Engine pillars

### A. Invariant physical layer

- Cents: `1200 * log2(f / f0)`
- Just ratio: `f = f0 * n / d`
- Beat period: `60 / BPM`
- Ombak is Hertz, not cents: same `Δf` is wide on jegogan, tight on kantil
- Bumbung / bronze bar: first inharmonic near `2.756 * f1`, rejected by high-Q cavity

### B. Tradition tree

A glossonym is not a scale.

- Harmonic / 5-limit: Hindustani, Carnatic, maqām, dastgāh, makam, 22-śruti JI
- Non-12-TET grids: Burmese Athan, Shashmaqam 17-parda, Thai 7-TET, Javanese bedantara, Sundanese padantara / degung / madenda / mataram, Balinese kebyar & Gender Wayang
- Physical stacks: Andean baguala 4:5:6 + tara; Tibetan dzo-kay partials

### C. Three sléndro grammars

| Tradition | Characteristic step | Octave | Ombak |
|---|---|---|---|
| Javanese bedantara | ~266¢ | 1200 | off |
| Sundanese padantara | ~240¢ | 1200 | off |
| Balinese Gender Wayang | ~275¢ | ~1220 | 5–7 Hz |

### D. Pedagogy

Kepatihan cipher (ji ro lu pat ma nem pi) and Machjar Sundanese numbering are labels, not frequencies. The oscillator row stays low → high.

## How to use

1. Open the CDN studio link above in Chrome / Samsung Internet.
2. Tap **Enter Studio** (required once for Web Audio on phones).
3. Choose tradition (Burmese / Shashmaqam / Bhoopali / Yaman).
4. Paste lyrics. Generate Prompts. Copy style + lyrics + negative.
5. Paste those three texts into Suno, Udio, Stable Audio, or Meta AI.

## GitHub Pages (optional permanent URL)

1. https://github.com/Pratik2691984/vadya-vidya/settings/pages
2. Source = GitHub Actions
3. Save. Then Actions → Deploy GitHub Pages → Run workflow.

Until that switch is on, Pages stays 404. The CDN link already works.

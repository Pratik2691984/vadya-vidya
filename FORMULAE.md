# Vādya Vidyā v15 — Formulae, Symbols, Matrix

Paste-block for DeepSeek (first free version, 2024–2026 lineage). Engine = constrained dispatch, not analysis dump.

## 0. Dispatch caps (non-negotiable)

| Block | Cap | Survive |
|---|---|---|
| Style | 1000 chars | tradition, vadi/samvadi, tāla, BPM, grid, Q, instruments |
| Lyrics | 5000 chars | clean text + [Sthayi] [Antara] [Sanchari] [Abhog] only |
| Negative | 200 chars | anti-synth / anti-12-TET pop |

STRIP from lyrics: [mātrā:] [Guru:] [Laghu:] [script:] [Gaṇa:] [Vadi:] ( ) { } < > । ऽ |

Default Sa f0 = 130.81 Hz. Default BPM = 76.

---

## 1. Symbols

| Symbol | Meaning |
|---|---|
| f, f0, f1 | frequency; tonic; first mode |
| n/d | just ratio |
| ¢ | cents |
| N | steps per octave (ET) |
| Δt | beat duration (s) |
| f_B | BPM |
| L_p | sound pressure level (dB) |
| A | linear amplitude |
| Δf | frequency difference (Hz) |
| f_beat | beating rate (Hz) = |Δf| |
| Q | cavity / filter quality factor |
| ऽ Guru | 2 mātrā |
| । Laghu | 1 mātrā |
| vadi / samvadi | sonant / consonant |
| nyāsa | rest tone |
| theka | tāla stroke cycle |
| ombak | acoustic beating in Hz, NOT cents |
| parda / athan | Central Asian / Burmese degree |

---

## 2. Short formulae

Pitch

    ¢ = 1200 * log2(f / f0)
    f  = f0 * 2^(¢/1200)
    f  = f0 * (n/d)                 # just intonation
    f_i = f0 * 2^(i/N)              # N-ET

Time / level

    Δt = 60 / f_B
    A  = 10^((L_p - 85) / 20)

Beating / ombak

    f_beat = |Δf|
    ¢_pair = 1200 * log2(1 + Δf/f)   # cents-width of same Hz beat; WIDENS as f falls

Bronze / Bumbung

    f_inharm ≈ 2.756 * f1           # Euler-Bernoulli free-free bar, mode-2 / mode-1
    Slot A: Q ≈ 14  → gate 2.756 f1 in ~35 ms
    Slot B: Q ≈ 1.2 → clang leaks
    Style MUST compile live Q=x.x

Piṅgala (analyse locally; DO NOT emit tags to the model)

    Guru if long vowel OR next unit is conjunct; else Laghu
    line_mātrā = 2*Guru + 1*Laghu

---

## 3. Decision gate (language ≠ scale)

IF treatise exists for that language → use THAT grid.
ELSE → scientific 5-limit JI. Never invent a rāga for Quechua / English / Balinese.

Family A  harmonic 5-limit: Hindustani, Carnatic, maqām, dastgāh, makam, nūba, ēchos, nusaḥ, 22-śruti
Family B  non-12-TET grids: Burmese Athan, Shashmaqam 17, Thai 7-TET, Javanese bedantara, Sundanese padantara/degung/madenda/mataram, Balinese kebyar + Gender Wayang
Family C  partial stacks: Andean baguala 4:5:6 + tara 2–8 Hz; Tibetan dzo-kay f0+5f0+6f0

---

## 4. Matrix — 22 śruti (JI)

key | n/d | ¢ | 12-TET Δ |
---|---|---|---
S | 1/1 | 0.00 | 0
r1 | 256/243 | 90.22 | −9.78
r2 | 16/15 | 111.73 | +11.73
R1 | 10/9 | 182.40 | −17.60
R2 | 9/8 | 203.91 | +3.91
g1 | 32/27 | 294.13 | −5.87
g2 | 6/5 | 315.64 | +15.64
G1 | 5/4 | 386.31 | −13.69
G2 | 81/64 | 407.82 | +7.82
M1 | 4/3 | 498.04 | −1.96
M2 | 27/20 | 519.55 | +19.55
m1 | 45/32 | 590.22 | −9.78
m2 | 729/512 | 611.73 | +11.73
P | 3/2 | 701.96 | +1.96
d1 | 128/81 | 792.18 | −7.82
d2 | 8/5 | 813.69 | +13.69
D1 | 5/3 | 884.36 | −15.64
D2 | 27/16 | 905.87 | +5.87
n1 | 16/9 | 996.09 | −3.91
n2 | 9/5 | 1017.60 | +17.60
N1 | 15/8 | 1088.27 | −11.73
N2 | 243/128 | 1109.78 | +9.78
S' | 2/1 | 1200.00 | 0

Chip row (Bhoopali): S R2 G1 P D1 S'
Yaman style still names m2 even if chips stay pentatonic.

---

## 5. Matrix — Burmese Athan (Than-yoe)

key | role | ¢
---|---|---
1 Than-hman | tonic | 0
2 Hna-pauk | neu 2nd | 165
3 Thone-pauk | neu 3rd | 360
4 Lay-pauk | 4th | 510
5 Nga-pau | pillar | 690
6 Chauk-pauk | maj 6 | 850
7 Khun-pau | neu 7 | 1030
1' | oct | 1200

Meter: Si Wa 8 = Wa · Si · Wa · Si ·

---

## 6. Matrix — Shashmaqam 17-parda

key | name | ¢ | ratio-or-cents
---|---|---|---
1 | Asos/Rast | 0 | 1/1
z2 | Mujannab | 145 | 2^(145/1200)
M2 | Dugah | 204 | 9/8
m3 | Segah | 294 | 32/27
z3 | Wusta Zalzal | 350 | 2^(350/1200)
M3 | Chorgah | 408 | 81/64
4 | Nava | 498 | 4/3
d5 | Gharib | 588 | 2^(588/1200)
5 | Panjgah | 702 | 3/2
m6 | Saba | 792 | 128/81
z6 | Hisor | 852 | 2^(852/1200)
M6 | Uzzal | 906 | 27/16
m7 | Buzruk | 996 | 16/9
z7 | Awj | 1050 | 2^(1050/1200)
M7 | Mukhayyar | 1110 | 243/128
1' | Gerdaniya | 1200 | 2/1

Meter: Usul Saraxbor 8 = Gup · Bak · Gup Gup Bak ·

---

## 7. Matrix — three sléndro grammars (atlas; no v15 UI button)

tradition | step 3→5 | octave ¢ | ombak
---|---|---|---
Javanese bedantara | ~266 | 1200 | off
Sundanese padantara | ~240 | 1200 | off
Balinese Gender Wayang | ~275 | ~1220 | 5–7 Hz, scale by register

Sundanese degung / madenda / mataram are THREE grids. Do not collapse to one word "sléndro".
Kepatihan 1 2 3 4 5 6 7 = ji ro lu pat ma nem pi = LABELS. Oscillator row always low→high.
Machjar Sundanese 1 = highest pitch label, still map frequency low→high.

---

## 8. Matrix — tāla / usul

id | beats | default pairing
---|---|---
Tintal | 16 | Yaman
Keherwa | 8 | Bhoopali / bhajan
Dadra | 6 | light
Jhaptal | 10 | meditative
Rupak | 7 | sam-on-khālī
Ektal | 12 | vilambit
SiWa | 8 | Burmese
UsulSaraxbor | 8 | Shashmaqam

---

## 9. Style compile order (then slice 1000)

1 tradition + rāga/athan/parda + thaat
2 vadi, samvadi, rasa
3 tāla/usul + beats + BPM
4 grid name (22-śruti JI | Athan | 17-parda)
5 tānpurā Sa-Pa 3/2, Bumbung Q=x.x, avanaddha theka, bamboo lead
6 meend + Euler-Bernoulli transient rejection

Negative default:
electronic, autotune, synth, modern pop drums, 808 bass, EDM riser, distorted guitar, artificial reverb, lo-fi hiss, Western tempered chords, clipping

---

## 10. v15 public studio vs first-free DeepSeek scope

SHIPPED UI: two tabs (Studio, Clean Prompts); four presets above; Q A/B; tanpura; chips; three copy blocks.

NOT SHIPPED (do not promise in a paste): MIDI export, per-line Pingala tags in lyrics, Saves/Rasa/Vādya tabs, sléndro/kebyar buttons.

DeepSeek task for first free version: keep this matrix invariant; emit only the three capped blocks; never invent a rāga for a non-treatised language; ombak stays Hz.

# Meta AI + GitHub — stress-free split

Meta AI (meta.ai share links) **does not execute** Web Audio, sliders, or localStorage.
A shared `.html` there is only a poster. That is why the studio looked blank.

## Correct split (do this every time)

| Place | What lives there | What you do |
|---|---|---|
| GitHub `vadya-vidya` | formulas, algorithms, data, code | source of truth |
| jsDelivr / browser | the real standalone | tap Enter Studio, hear, generate |
| Meta AI share | 4-line card + live URL | merch / Facebook only |
| Song models (Suno etc.) | 3 copied blocks | style / lyrics / negative |

## Live studio (runs)

https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/standalone/vadya-vidya-complete-classical.html

Also the original modular studio:
https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/index.html

Repo: https://github.com/Pratik2691984/vadya-vidya

## Paste this into Meta AI or Facebook (not the HTML)

```
Vādya Vidyā — Complete Classical Studio
Free. No sign-up. Client-side.

Tap once — drone, rāga, tāla, Q stay on your phone.
Hear harmonics n·f₀ and compare 22-śruti to Athan.
Generate three clean blocks, paste into any song tool.

Open the studio in the browser (Meta cannot play the audio):
https://cdn.jsdelivr.net/gh/Pratik2691984/vadya-vidya@main/standalone/vadya-vidya-complete-classical.html
```

## What Meta must never be asked to run

- AudioContext / oscillators / tanpura
- Q sliders, pitch chips
- localStorage
- clipboard generation engine

Meta only receives **text**. Copy the three Generate blocks from the live page.

## Dispatch caps (invariant)

- Style ≤ 1000
- Clean lyrics ≤ 5000 — only [Sthayi] [Antara] [Sanchari] [Abhog]
- Negative ≤ 200
- Default Sa = 130.81 Hz, BPM = 76
- f_inharm ≈ 2.756 · f1
- Ombak is Hz, not cents

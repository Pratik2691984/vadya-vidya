# Vādya Vidyā v15

Standalone classical studio: 22-Śruti just intonation, Burmese Athan / Hsaing Waing, Central Asian Shashmaqam 17-parda, and Bumbung cavity Q-filter. Generates constrained style / lyrics / negative prompts for external audio models.

## Open the studio

| Purpose | URL |
|---|---|
| GitHub repo | https://github.com/Pratik2691984/vadya-vidya |
| Live app (GitHub Pages) | https://pratik2691984.github.io/vadya-vidya/ |
| Instant HTML preview | https://htmlpreview.github.io/?https://github.com/Pratik2691984/vadya-vidya/blob/main/index.html |
| Raw file | https://raw.githubusercontent.com/Pratik2691984/vadya-vidya/main/index.html |

If Pages is still warming up, use the htmlpreview link.

## Enable GitHub Pages (one-time)

1. Open https://github.com/Pratik2691984/vadya-vidya/settings/pages
2. Source: **GitHub Actions**  
   **or** Deploy from a branch → `main` / `/ (root)`
3. Save. Live URL: `https://pratik2691984.github.io/vadya-vidya/`

## Meta AI (`meta.ai`) — important limit

Meta AI chat sessions cannot run this app. They do not execute custom JavaScript or Web Audio, and they flatten HTML. iframes stay blank.

**Correct workflow**

1. Open the studio in a normal browser (Pages or htmlpreview).
2. Use **Clean Prompts**.
3. Copy the three blocks (style ≤1000, lyrics ≤5000, negative ≤200).
4. Paste those text blocks into Meta AI or any audio generator.

## Prompt constraints

- Style dispatch: 1000 characters
- Clean structured lyrics: 5000 characters, `[Sthayi]` / `[Antara]` / `[Sanchari]` / `[Abhog]`
- Negative prompt: 200 characters

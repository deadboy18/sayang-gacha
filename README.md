# For My Sayang — Documentation

A gacha machine web app where your partner redeems secret coupon codes for tokens, then pulls capsules to reveal love messages you wrote. No server, no database — everything runs locally.

---

## Quick Start (Windows)

1. Install **Node.js** from <https://nodejs.org> (LTS version).
2. Extract the project zip.
3. Double-click **`START.bat`**.
4. A browser tab opens at `http://localhost:5173` — done.

Press `Ctrl+C` in the terminal window to stop the app.

---

## How It Works — The Full Flow

```
WELCOME  ──▸  REDEEM CODE  ──▸  GACHA PLAY
                  ▲                  │
                  └──────────────────┘
                   "redeem more codes"
```

1. **Welcome** — She sees "For My Sayang 💌", reads your love letter intro, clicks "Open My Surprise".
2. **Redeem** — She types a secret code you gave her. Valid code = tokens added. Each code is single-use.
3. **Gacha** — She clicks the machine. Each pull costs 1 token. A capsule drops, she taps it, reads your message in handwriting font with a heart burst animation.
4. **Out of tokens** — A "Redeem Another Code" button appears. She can also go back any time via "+ Redeem More Codes".
5. **Restock** — When all capsules are pulled, a "Restock" button refills them (doesn't cost tokens).
6. **Secret message** — After she reads ALL messages, a special bonus message appears with a glowing card.

---

## The Config File — `src/config.js`

This is the **only file you need to edit**. Save the file and the browser hot-reloads instantly.

### Names

```js
herName:    "Mabel",       // Her real name. Used in "a little note for mabel",
                           // and anywhere you write {name} in messages.
petName:    "Sayang",      // Pet name. Used in titles: "For My Sayang".
senderName: "Me",          // Your sign-off. Shown as "— Me" on message cards.
```

### Welcome Screen

```js
welcomeEmoji:    "💌",                              // Big bouncing emoji at top
welcomeSubtitle: "you have a love letter",           // Small text above title
welcomeBody:     `Hi Mabel 🤍\n\nI hid love notes...`, // Main paragraph (\n = line break)
```

### Coupon Codes

```js
codes: [
  { code: "SAYANG",   tokens: 3 },
  { code: "ILOVEYOU", tokens: 3 },
  { code: "MWAH",     tokens: 3 },
  { code: "FOREVER",  tokens: 5 },
],
```

| Field    | What it does                                         |
|----------|------------------------------------------------------|
| `code`   | The text she types in. Case-insensitive.             |
| `tokens` | How many tokens she gets from this code.             |

**Add a code:** add a new `{ code: "NEWCODE", tokens: 3 },` line.
**Remove a code:** delete that line or comment it out with `//`.

### Messages

```js
messages: [
  "{name}, you're the reason I smile for no reason 💕",
  "I wish I could wrap you in a hug right now 🤗",
],
```

- Each string = one capsule message. No limit on how many.
- **`{name}`** is replaced with `herName` automatically. Use it anywhere in any message.
- They auto-cycle through capsule colours: pink → blue → green → purple → repeat.
- Emojis work.

### Secret Message

```js
secretMessage: "You found them all! 🥺\nEvery word was true, {name}.\nI love you. Always. 💕",
```

Shown after she reads ALL messages. Set to `""` to disable.

---

## Common Tasks

### Add a new code

```js
codes: [
  { code: "SAYANG", tokens: 3 },
  { code: "MYBABY", tokens: 5 },   // ← new
],
```

### Add a new message

```js
messages: [
  "Existing message 💕",
  "{name}, this one is brand new ✨",   // ← new
],
```

### Change her name

```js
herName: "Sarah",
```

All `{name}` placeholders and "for you, sarah" text update automatically.

### Change the page title

Edit `index.html`:
```html
<title>For My Baby 💕</title>
```

### Change colours

Edit `src/styles.css` at the top:
```css
:root {
  --love: #e8567f;    /* buttons, accents, glows */
  --bg:   #fce4ec;    /* page background */
}
```

---

## Project Structure

```
sayang-gacha/
├── START.bat              ← double-click to run
├── index.html             ← HTML shell
├── package.json           ← dependencies
├── vite.config.js         ← build config
├── public/pictures/       ← machine + capsule PNGs
└── src/
    ├── config.js          ← ⭐ THE ONE FILE YOU EDIT
    ├── main.jsx           ← entry point
    ├── App.jsx            ← all screens & UI logic
    ├── Machine.jsx        ← physics engine
    └── styles.css         ← all visual styling
```

---

## Visual Features

| Feature                | Where                                              |
|------------------------|-----------------------------------------------------|
| Floating hearts        | Background — 20 hearts drift upward continuously    |
| Bouncing envelope      | Welcome screen — the emoji gently bounces           |
| Glowing button         | Primary CTA buttons pulse with a pink glow          |
| Heart burst            | 12 emoji particles explode when you open a capsule  |
| Handwriting font       | Messages display in Caveat (Google Font)             |
| Signed note            | "— Me" (your senderName) under every message        |
| Love note counter      | "💌 3 love notes read" on the gacha screen           |
| Secret card            | Special glowing pink card after reading ALL messages |
| Card entrance          | All cards fade-slide in on screen transition         |
| Pop-in animation       | Result card springs in with a bounce                 |

---

## Technical Stack

| Tech       | Role                                              |
|------------|---------------------------------------------------|
| React 19   | UI framework                                      |
| Vite 6     | Dev server & bundler (hot-reload on save)         |
| Matter.js  | 2D physics (balls in the dome)                    |
| Caveat     | Google Font for handwritten message style         |

---

## State & Persistence

There is **no persistence**. Refreshing resets everything (tokens, used codes, read count). This is intentional — no server needed.

If you want persistence, ask an LLM to add `localStorage` support for `tokens`, `usedCodes`, and `readCount` in `App.jsx`.

---

## Deployment Options

### Local (same Wi-Fi)
Run `START.bat`. Find your IP with `ipconfig`. She opens `http://YOUR_IP:5173` on her phone.

### Static hosting
Run `npm run build`. Upload the `dist/` folder to Netlify (drag-and-drop), Vercel, or GitHub Pages.

---

## Customisation Prompts for LLMs

Paste the README + `src/config.js` + `src/App.jsx` into your LLM with one of these:

**Add localStorage persistence:**
> Make tokens, usedCodes, and readCount persist across page refreshes using localStorage.

**Add sound effects:**
> Add a coin sound on code redeem, a rattle on machine shake, and a pop on capsule open. I'll put .mp3 files in public/sounds/.

**Add a countdown/date reveal:**
> I want the app locked until a specific date (e.g. her birthday). Show a countdown timer before that date, then unlock automatically.

**Add custom capsule images:**
> I want to replace the capsule PNGs with my own. What dimensions and format should they be?
> (Answer: transparent PNG, roughly square, 200–400px wide.)

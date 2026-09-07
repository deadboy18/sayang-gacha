# For My Sayang — Documentation

A gacha machine web app where your partner redeems secret coupon codes for tokens, then pulls capsules to reveal love messages you wrote. Built with React + Matter.js physics, deployed on GitHub Pages. No server, no database — everything runs in the browser.

**Live:** [https://deadboy18.github.io/sayang-gacha/](https://deadboy18.github.io/sayang-gacha/)

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
                  ▲               │  ┌─────────┐
                  └───────────────┘  │ Machine  │
                   "redeem more"     │ Our Story│
                                     └─────────┘
```
1. **Welcome** — She sees "For My Sayang 💌" with a live-ticking counter showing how long you've been talking (months, days, hours, minutes, seconds). Clicks "Open My Surprise".
2. **Redeem** — She types a secret code you gave her. Valid code = tokens added. Each code is single-use.
3. **Gacha** — Two tabs: **🎰 Machine** (pull capsules, costs 1 token each) and **💬 Our Story** (your first DM recreation + milestone timeline).
4. **Out of tokens** — A "Redeem Another Code" button appears. She can also go back any time via "+ Redeem More Codes".
5. **Restock** — When all capsules are pulled, a "Restock" button refills them (doesn't cost tokens).
6. **Secret message** — After she reads ALL messages, a special bonus message appears with a glowing card.

---

## Features

### 🎰 Gacha Machine
- Matter.js 2D physics — capsules bounce and collide realistically inside the dome
- Shake your phone to rattle the capsules (DeviceMotion API, works on iOS/Android)
- Turn the dial to eject a random capsule
- Tap the capsule to reveal your love note with a heart burst animation
- Sound effects for every interaction (Web Audio API synthesis — no mp3 files needed)

### 💬 Our Story Tab
- **First DM Recreation** — Reddit-style chat UI showing your actual first messages, with avatars, usernames, and timestamps
- **Milestone Timeline** — Vertical timeline with emoji dots marking key relationship moments (first lunch, first call, first "sayang", etc.)

### 🌙 Dark Mode
- Toggle button (top-right corner) switches between light and dark themes
- Full CSS custom property system — every colour adapts cleanly
### ⏱️ Live Counter
- Welcome screen shows a real-time ticking counter since your first message date
- Displays months, days, hours, minutes, and seconds in styled boxes
- Seconds pulse with a tick animation

### 🔊 Sound Effects (Web Audio API)
All sounds are synthesized in the browser — no audio files to load:
| Sound     | When                        |
|-----------|-----------------------------|
| Coin      | Code redeemed successfully  |
| Rattle    | Machine shakes              |
| Drop      | Capsule lands in tray       |
| Pop       | Capsule opened              |
| Secret    | Bonus message revealed      |
| Error     | Wrong code entered          |
| Click     | Button press                |

### 📱 Shake to Rattle
- Uses DeviceMotion API to detect phone shaking
- Threshold-based detection with cooldown to prevent spam
- Shakes the physics capsules inside the dome

---

## The Config File — `src/config.js`

This is the **only file you need to edit**. Save the file and the browser hot-reloads instantly.
### Names

```js
herName:    "Mabel",          // Her real name. Used in "a little note for mabel",
                              // and anywhere you write {name} in messages.
petName:    "Sayang",         // Pet name. Used in titles: "For My Sayang".
senderName: "Your Chihuahua", // Your sign-off. Shown as "~ Your Chihuahua" on cards.
```

### Welcome Screen

```js
welcomeEmoji:    "💌",                              // Big bouncing emoji at top
welcomeSubtitle: "you have a love letter",           // Small text above title
welcomeBody:     `Hi Mabel 🤍\n\nI hid love notes...`, // Main paragraph (\n = line break)
```

### First Message Date (Live Counter)

```js
firstMessageDate: "2026-06-29",  // The date you first messaged. Counter ticks from this.
```

### Coupon Codes

```js
codes: [
  { code: "SAYANG",    tokens: 3 },
  { code: "ILOVEYOU",  tokens: 3 },
  { code: "MWAH",      tokens: 3 },
  { code: "FOREVER",   tokens: 5 },
  // ... up to 14 codes configured
],
```
| Field    | What it does                                         |
|----------|------------------------------------------------------|
| `code`   | The text she types in. Case-insensitive.             |
| `tokens` | How many tokens she gets from this code.             |

### Messages

```js
messages: [
  "{name}, you're the reason I smile for no reason 💕",
  "I wish I could wrap you in a hug right now 🤗",
  // ... up to 30 messages configured
],
```

- Each string = one capsule message. No limit on how many.
- **`{name}`** is replaced with `herName` automatically.
- They auto-cycle through capsule colours: pink → blue → green → purple → repeat.

### First DM Recreation

```js
firstDM: [
  { user: "him", name: "deadboy69420", time: "Jun 29, 4:52 PM", text: "hey! saw your post..." },
  { user: "her", name: "Flimsy-Dog-5043", time: "Jul 3, 9:11 AM", text: "hiii sorry..." },
  // ...
],
```

- `user`: `"him"` (left-aligned, 💀 avatar) or `"her"` (right-aligned, 🐶 avatar)
- Rendered as a Reddit DM-style chat thread in the "Our Story" tab
### Milestone Timeline

```js
milestones: [
  { emoji: "💬", date: "Jun 29", title: "First DM", sub: "deadboy69420 slid in" },
  { emoji: "🍣", date: "Jul 15", title: "First Lunch", sub: "Sushi Zanmai 🤤" },
  { emoji: "💕", date: "Aug 4",  title: "Mutual Confession", sub: "" },
  // ...
],
```

- `emoji`: displayed as the timeline dot
- `date`: short date label
- `title`: milestone name
- `sub`: optional subtitle (Caveat font, italic)

### Secret Message

```js
secretMessage: "You found them all! 🥺\nEvery word was true, {name}.\nI love you. Always. 💕",
```

Shown after she reads ALL messages. Set to `""` to disable.

---

## Project Structure

```
sayang-gacha/
├── .github/workflows/
│   └── deploy.yml         ← GitHub Pages auto-deploy├── START.bat              ← double-click to run locally
├── index.html             ← HTML shell
├── package.json           ← dependencies
├── vite.config.js         ← build config (base: /sayang-gacha/)
├── public/pictures/       ← machine + capsule PNGs
└── src/
    ├── config.js          ← ⭐ THE ONE FILE YOU EDIT
    ├── main.jsx           ← entry point
    ├── App.jsx            ← all screens, tabs, DM, timeline
    ├── Machine.jsx        ← physics engine + shake detection
    ├── sounds.js          ← Web Audio API sound effects
    └── styles.css         ← all styling + dark mode
```

---

## Visual Features

| Feature                | Where                                                  |
|------------------------|--------------------------------------------------------|
| Floating hearts        | Background — 20 hearts drift upward continuously       |
| Bouncing envelope      | Welcome screen — the emoji gently bounces              |
| Live ticking counter   | Welcome screen — months/days/hrs/min/sec since first DM|
| Glowing button         | Primary CTA buttons pulse with a pink glow             |
| Heart burst            | 12 emoji particles explode when you open a capsule     |
| Handwriting font       | Messages display in Caveat (Google Font)               |
| Signed note            | "~ Your Chihuahua" under every message                 |
| Love note counter      | "💌 3 love notes read" on the gacha screen             |
| Secret card            | Special glowing pink card after reading ALL messages   || Dark mode toggle     | Top-right moon/sun button — full dark theme            |
| Tabbed gacha screen  | 🎰 Machine / 💬 Our Story tabs                        |
| Reddit DM recreation | Chat bubbles with avatars, usernames, timestamps       |
| Milestone timeline   | Vertical timeline with emoji dots and hover effects    |
| Shake to rattle      | Phone shake detection rattles the physics capsules     |
| Card entrance        | All cards fade-slide in on screen transition           |
| Pop-in animation     | Result card springs in with a bounce                   |
| Tick pulse           | Seconds counter pulses on the welcome screen           |

---

## Technical Stack

| Tech            | Role                                              |
|-----------------|---------------------------------------------------|
| React 19        | UI framework                                      |
| Vite 6          | Dev server & bundler (hot-reload on save)         |
| Matter.js       | 2D physics (balls in the dome)                    |
| Web Audio API   | Synthesized sound effects (no audio files)        |
| DeviceMotion API| Phone shake detection                             |
| Caveat          | Google Font for handwritten message style         |
| GitHub Actions  | Auto-deploy to GitHub Pages on push               |

---

## State & Persistence

There is **no persistence**. Refreshing resets everything (tokens, used codes, read count). This is intentional — no server needed.
If you want persistence, add `localStorage` support for `tokens`, `usedCodes`, and `readCount` in `App.jsx`.

---

## Deployment

### GitHub Pages (current setup)
Push to `main` — the GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

### Local (same Wi-Fi)
Run `START.bat`. Find your IP with `ipconfig`. She opens `http://YOUR_IP:5173` on her phone.

### Static hosting
Run `npm run build`. Upload the `dist/` folder to Netlify (drag-and-drop) or Vercel.

---

## License

Made with love. 💕
# Sayang Gacha 🎰💕

A gacha machine web app you customize for your partner. They redeem secret codes you give them to earn tokens, pull capsules from a physics-enabled machine, and read personalized love messages hidden inside each one.

No server, no database, no sign-up. Fork it, edit one config file, deploy to GitHub Pages. Done.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## How It Works

```
WELCOME SCREEN ──> REDEEM CODE ──> GACHA PLAY
                       ▲               │
                       └───────────────┘
                      "redeem more codes"
```

1. **Welcome** - They see a love letter intro you wrote, then tap "Open My Surprise"
2. **Redeem** - They type a secret code you gave them (in person, in a card, over text). Valid code = tokens added. Each code is single-use per session
3. **Gacha** - Each pull costs 1 token. A capsule drops with real physics (Matter.js), they tap it, and your message appears in handwriting font with a heart burst animation
4. **Secret ending** - After reading ALL messages, a special glowing card appears with your final message

## Quick Start

### Run locally (Windows)

1. Install [Node.js](https://nodejs.org) (LTS)
2. Clone this repo or download the zip
3. Double-click `START.bat`
4. Browser opens at `http://localhost:5173`

### Run locally (Mac/Linux)

```bash
npm install
npm run dev
```

### Deploy to GitHub Pages (free hosting)

1. Fork this repo
2. Edit `vite.config.js` and change the `base` to your repo name:
   ```js
   base: '/your-repo-name/',
   ```
3. The included GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on every push to `main`
4. Go to your repo Settings > Pages > make sure Source is set to "GitHub Actions"
5. Your site will be live at `https://yourusername.github.io/your-repo-name/`

## Customization

Everything lives in **one file**: `src/config.js`

### Names

```js
herName:    "Mabel",          // Her real name, used wherever you write {name}
petName:    "Sayang",         // Pet name, used in "For My Sayang" title
senderName: "Your Chihuahua", // Your sign-off on message cards
```

### Coupon Codes

```js
codes: [
  { code: "SAYANG",   tokens: 3 },
  { code: "ILOVEYOU", tokens: 3 },
  { code: "HOTGF",    tokens: 5 },
],
```

Each code can only be redeemed once per session. Case-insensitive. Add as many as you want.

### Messages

```js
messages: [
  "{name}, you're the reason I smile for no reason 💕",
  "I still think about that first lunch together 🍣",
],
```

Use `{name}` anywhere and it auto-replaces with `herName`. Emojis work. No limit on how many messages you can add. They cycle through capsule colors (pink, blue, green, purple) automatically.

### Secret Message

```js
secretMessage: "You found them all! 🥺\nI love you. Always. 💕",
```

Shown after every message has been read. Set to `""` to disable.

### Welcome Screen

```js
welcomeEmoji:    "💌",
welcomeSubtitle: "you have a love letter",
welcomeBody:     `Your intro message here...`,
```

### Colors

Edit the CSS variables at the top of `src/styles.css`:

```css
:root {
  --love: #e8567f;    /* buttons, accents, glows */
  --bg:   #fce4ec;    /* page background */
}
```

## Project Structure

```
sayang-gacha/
├── START.bat                  # Windows one-click launcher
├── index.html                 # HTML shell
├── package.json               # Dependencies
├── vite.config.js             # Build config (set base path here)
├── .github/workflows/
│   └── deploy.yml             # Auto-deploy to GitHub Pages
├── public/pictures/           # Machine + capsule PNGs
│   ├── machine-front.png
│   ├── machine-back.png
│   ├── dial.png
│   ├── capsule-blue.png
│   ├── capsule-green.png
│   ├── capsule-pink.png
│   └── capsule-purple.png
└── src/
    ├── config.js              # ⭐ THE ONE FILE YOU EDIT
    ├── main.jsx               # App entry point
    ├── App.jsx                # All screens and UI logic
    ├── Machine.jsx            # Physics engine (Matter.js)
    └── styles.css             # All visual styling
```

## Tech Stack

| Tech | Role |
|------|------|
| React 19 | UI framework |
| Vite 6 | Dev server + bundler with hot reload |
| Matter.js | 2D physics for capsules bouncing in the dome |
| Caveat | Google Font for handwritten message style |

## State and Persistence

There is no persistence by default. Refreshing the page resets everything (tokens, used codes, read messages). This is intentional so she can replay it.

If you want persistence, add `localStorage` support for `tokens`, `usedCodes`, and `readCount` in `App.jsx`.

## Ideas for Extending

- **Date lock** - Lock the app until a specific date (birthday, anniversary) with a countdown timer
- **Custom capsule art** - Replace the PNGs in `public/pictures/` (transparent PNG, ~200-400px wide)
- **localStorage** - Persist state across refreshes so she can come back to it
- **Background music** - Auto-play a song that means something to both of you

## License

MIT. Do whatever you want with it. Make someone smile.

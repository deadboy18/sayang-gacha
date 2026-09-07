/*  ╔═══════════════════════════════════════════════════════════╗
    ║         FOR MY SAYANG — CONFIGURATION FILE               ║
    ║                                                           ║
    ║  This is the ONLY file you need to edit.                  ║
    ║  Change names, codes, messages, then save — the app       ║
    ║  hot-reloads automatically, no restart needed.            ║
    ╚═══════════════════════════════════════════════════════════╝  */

const CONFIG = {

  /* ── Who is this for? ──────────────────────── */

  herName:    "Mabel",          // Her real name — used for personal touches
  petName:    "Sayang",         // Pet name — used in titles like "For My Sayang"
  senderName: "Kesh",             // Your name / sign-off — shown on message cards

  /* ── Welcome screen ────────────────────────── */

  welcomeEmoji: "💌",
  welcomeSubtitle: "you have a love letter",
  welcomeBody:
    `Hi Mabel 🤍\n\n` +
    `I hid little love notes inside this gacha machine just for you.\n` +
    `Use the secret codes I gave you to get tokens,\n` +
    `then turn the dial to discover what's inside each capsule.\n\n` +
    `Every single one is from my heart to yours.`,

  /* ── Coupon codes ──────────────────────────── *
   *  Add as many as you want.                    *
   *  She types the code → gets that many tokens. *
   *  Each code can only be redeemed ONCE.        */

  codes: [
    { code: "SAYANG",    tokens: 3 },
    { code: "ILOVEYOU",  tokens: 3 },
    { code: "MWAH",      tokens: 3 },
    { code: "FOREVER",   tokens: 5 },
    // { code: "NEWCODE", tokens: 3 },   ← add more like this
  ],

  /* ── Messages inside the capsules ──────────── *
   *  Add as many as you want (no limit).         *
   *  They cycle through capsule colours auto.    *
   *  Use {name} anywhere to insert her name.     */

  messages: [
    "{name}, you're the reason I smile for no reason 💕",
    "I wish I could wrap you in a hug right now 🤗",
    "You make even the most boring days feel magical ✨",
    "My heart does a little flip every time I see your name pop up 💓",
    "You're my favourite notification, {name} 📱💗",
    "I love the way you laugh — please never stop 😊",
    "Being with you feels like coming home 🏠💕",
    "You deserve all the good things in this world, and I'll make sure of it 🌸",
    "I'm so incredibly lucky that you chose me 🍀",
    "{name}, you're not just my sayang — you're my everything 💖",
    "I fall for you a little more every single day 🌙",
    "Thank you for being exactly who you are. I love every bit of it 💝",
  ],

  /* ── Secret message ────────────────────────── *
   *  Shown after she reads ALL messages.          *
   *  Set to "" to disable.                       */

  secretMessage: "You found them all! 🥺\nEvery word was true, {name}.\nI love you. Always. 💕",
};

export default CONFIG;

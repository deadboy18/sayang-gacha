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
  senderName: "Your Chihuahua", // Your name / sign-off — shown on message cards

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
    { code: "SAYANG",       tokens: 3 },
    { code: "ILOVEYOU",     tokens: 3 },
    { code: "MWAH",         tokens: 3 },
    { code: "FOREVER",      tokens: 5 },
    { code: "CHIHUAHUA",    tokens: 3 },
    { code: "YAPQUEEN",     tokens: 3 },
    { code: "MILOCUBES",    tokens: 2 },
    { code: "WICKEDGAME",   tokens: 3 },
    { code: "HOTGF",        tokens: 5 },
    { code: "SPARKS",       tokens: 2 },
    { code: "CRAZYDOGLADY", tokens: 3 },
    { code: "SAFEWITHYOU",  tokens: 5 },
    { code: "BUDAK",        tokens: 2 },
    { code: "ISYANGYOU",    tokens: 5 },
  ],

  /* ── Messages inside the capsules ──────────── *
   *  Add as many as you want (no limit).         *
   *  They cycle through capsule colours auto.    *
   *  Use {name} anywhere to insert her name.     */

  messages: [
    // the real ones — from your story
    "You told me first. Before anyone else. That night, I knew this was real. 🤍",
    "I still think about that first lunch at Sushi Zanmai. You paid and I fell. 🍣",
    "{name}, you called me sayang for the first time on the 12th. I replayed it in my head all day. 💗",
    "Remember when you wore high-neck tops trying not to attract me? Didn't work. Not even a little bit. 😏",
    "\"I felt safe.\" You said that in my arms. I'll spend forever making sure you always do. 🏠",
    "41 minutes at 1AM because you couldn't sleep. 35 more at 7:40AM because neither could I. Those calls meant everything. 📞",
    "You sent me Wicked Game, Sparks, and Messy. I made a whole playlist just from songs that remind me of you. 🎵",
    "\"Why got so many things to talk?\" Because it's you, woman. It's always going to be you. 💬",
    "The Milo cubes hit different because you'd never tried them before. Your face was priceless. 🧊",
    "You once said none of my sane friends would tell me to pursue this. Good thing I never listen. 😌",
    "\"You make me dont wanna work and just wanna cuddle you all day.\" Same, {name}. Every single day. 🤗",
    "I love that you feed Bear and Lucy every night at 10. My crazy dog lady. 🐕",
    "You asked \"I'm your hot gf?\" Yes. The answer was always yes. 🔥",
    "I noticed you laugh like a hyena and I wouldn't change a single thing about it. 😂💕",
    "{name}, you said \"I want this. I really do.\" I want this too. More than you know.",
    "That night at Chulia after you left, I called you drunk and you still picked up. You always pick up. 🌙",
    "You said you wanted to hold my hand in public without fear or shame. That day is coming. I promise. 🤝",
    "\"You've always let me spiral safely.\" And I always will. No judgment. Just arms open. 🌀",
    "You wore that black dress and sent me the preview. Not him. Me. I don't take that lightly. 🖤",
    "Pokka green tea, no sugar, cold. Cottage fries. Kuey teow soup when you're sad. I remember everything. 🍵",
    "You said happiness has a cost. I'm here to prove it doesn't. Not with me. Never with me. 🌸",
    "\"There's no one, Kesh. Not even my husband.\" I carry that with me every day. 💛",
    "You called me budak, bhai, chihuahua, sweet boy, naughty boy, silly. I answer to all of them. 🐶",
    "I built you an entire gacha machine because a text felt too small for what I feel. 🎰💖",
    "{name}, you said \"I'll be here when you need me.\" I need you. Today and every day after. 💝",
    "60% of Linger by The Cranberries. One day we're singing the other 40% together. 🎤",
    "\"I miss smelling you. I felt really safe and soft in your arms.\" Come back soon. I'll hold you tighter. 🫂",
    "Every Wednesday I spiral a bit. But you noticed. You always notice. 🤭",
    "You're the woman who screams Messy by Lola Young when she's emo and I think that's the most beautiful thing ever. 🎶",
    "From that first DM in July to right now, I have never once looked at anyone else the same way I look at you. 👀💗",
  ],

  /* ── Secret message ────────────────────────── *
   *  Shown after she reads ALL messages.          *
   *  Set to "" to disable.                       */

  secretMessage:
    "You found them all, {name}. 🥺\n\n" +
    "Every word in here is something I've felt but couldn't always say out loud.\n" +
    "You made me believe that love doesn't have to be perfect to be real.\n\n" +
    "I sayang you. Always.\n" +
    "Your Chihuahua 🐶💕",
};

export default CONFIG;

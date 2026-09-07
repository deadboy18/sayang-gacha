/*  ╔═══════════════════════════════════════════════════════════╗
    ║  Sound effects — Web Audio API synthesis (no files needed) ║
    ╚═══════════════════════════════════════════════════════════╝  */

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/* ── helpers ── */

function osc(ac, type, freq, gain, start, end, dest) {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.001, end);
  o.connect(g).connect(dest || ac.destination);
  o.start(start);
  o.stop(end + 0.05);
}

function noise(ac, duration, gain, start, dest) {
  const len = ac.sampleRate * duration;
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1);
  const src = ac.createBufferSource();
  src.buffer = buf;
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  const filt = ac.createBiquadFilter();
  filt.type = 'bandpass';
  filt.frequency.value = 3000;
  filt.Q.value = 0.5;
  src.connect(filt).connect(g).connect(dest || ac.destination);
  src.start(start);
  src.stop(start + duration + 0.05);
}

/* ═══════════════════════════════════════════
   PUBLIC API — import { playCoin } from ...
   ═══════════════════════════════════════════ */

/** Bright two-tone coin chime (code redeemed) */
export function playCoin() {
  const ac = getCtx();
  const t = ac.currentTime;
  osc(ac, 'sine', 880, 0.18, t, t + 0.12);
  osc(ac, 'sine', 1320, 0.15, t + 0.08, t + 0.25);
  osc(ac, 'sine', 1760, 0.08, t + 0.14, t + 0.35);
}

/** Quick rattle/shake (machine shaking) */
export function playRattle() {
  const ac = getCtx();
  const t = ac.currentTime;
  // three short noise bursts
  for (let i = 0; i < 4; i++) {
    noise(ac, 0.06, 0.12, t + i * 0.08);
  }
  // subtle metallic ping
  osc(ac, 'triangle', 420, 0.04, t, t + 0.15);
}

/** Soft thud when capsule lands in tray */
export function playDrop() {
  const ac = getCtx();
  const t = ac.currentTime;
  // low thump
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(200, t);
  o.frequency.exponentialRampToValueAtTime(60, t + 0.15);
  g.gain.setValueAtTime(0.25, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  o.connect(g).connect(ac.destination);
  o.start(t);
  o.stop(t + 0.25);
  // light click on top
  noise(ac, 0.03, 0.08, t);
}

/** Satisfying pop + sparkle (capsule opened, message revealed) */
export function playPop() {
  const ac = getCtx();
  const t = ac.currentTime;
  // the pop
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(600, t);
  o.frequency.exponentialRampToValueAtTime(150, t + 0.08);
  g.gain.setValueAtTime(0.22, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  o.connect(g).connect(ac.destination);
  o.start(t);
  o.stop(t + 0.15);
  // sparkle notes
  osc(ac, 'sine', 1200, 0.06, t + 0.05, t + 0.2);
  osc(ac, 'sine', 1600, 0.05, t + 0.1, t + 0.28);
  osc(ac, 'sine', 2000, 0.04, t + 0.15, t + 0.35);
}

/** Magical ascending chime (secret message reveal) */
export function playSecret() {
  const ac = getCtx();
  const t = ac.currentTime;
  const notes = [523, 659, 784, 1047, 1319]; // C5 E5 G5 C6 E6
  notes.forEach((freq, i) => {
    const start = t + i * 0.12;
    osc(ac, 'sine', freq, 0.12, start, start + 0.4);
    osc(ac, 'triangle', freq * 2, 0.03, start + 0.02, start + 0.3);
  });
  // final shimmer
  osc(ac, 'sine', 2637, 0.06, t + 0.6, t + 1.4);
}

/** Error buzz (wrong code) */
export function playError() {
  const ac = getCtx();
  const t = ac.currentTime;
  osc(ac, 'square', 180, 0.06, t, t + 0.08);
  osc(ac, 'square', 140, 0.06, t + 0.1, t + 0.18);
}

/** Soft click (button press, UI interaction) */
export function playClick() {
  const ac = getCtx();
  const t = ac.currentTime;
  osc(ac, 'sine', 800, 0.08, t, t + 0.05);
}

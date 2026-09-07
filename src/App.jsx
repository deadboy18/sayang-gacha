import { useEffect, useMemo, useRef, useState } from 'react';
import CONFIG from './config.js';
import Machine from './Machine.jsx';
import { playCoin, playPop, playSecret, playError, playClick } from './sounds.js';

const P = import.meta.env.BASE_URL;
const CAPSULES = [
  `${P}pictures/capsule-pink.png`,
  `${P}pictures/capsule-blue.png`,
  `${P}pictures/capsule-green.png`,
  `${P}pictures/capsule-purple.png`,
];

/* replace {name} tokens in any string */
function personalise(text) {
  return text.replace(/\{name\}/gi, CONFIG.herName);
}

/* build machine data from config */
const MACHINE_DATA = {
  title: `For My ${CONFIG.petName}`,
  messages: CONFIG.messages.map((text, i) => ({
    text: personalise(text),
    capsule: CAPSULES[i % 4],
  })),
};

/* normalise codes → uppercase map */
const CODE_MAP = {};
CONFIG.codes.forEach(({ code, tokens }) => {
  CODE_MAP[code.toUpperCase().trim()] = tokens;
});

/* ══════════════════════════════════════════════ */

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [tokens, setTokens] = useState(0);
  const [usedCodes, setUsedCodes] = useState([]);
  const [result, setResult] = useState(null);
  const [readCount, setReadCount] = useState(0);
  const [seenAll, setSeenAll] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  function handlePull() {
    if (tokens > 0) setTokens((t) => t - 1);
  }

  function handleResult(msg) {
    playPop();
    setResult(msg);
    setReadCount((c) => {
      const next = c + 1;
      if (next >= CONFIG.messages.length && CONFIG.secretMessage && !seenAll) {
        setSeenAll(true);
      }
      return next;
    });
  }

  function closeResult() {
    setResult(null);
    if (seenAll && CONFIG.secretMessage && !showSecret) {
      setTimeout(() => {
        playSecret();
        setShowSecret(true);
      }, 400);
    }
  }

  return (
    <>
      <FloatingHearts />

      <div className={`screen-fade ${screen === 'welcome' ? 'screen-fade--in' : 'screen-fade--out'}`}>
        {screen === 'welcome' && <WelcomeScreen onStart={() => { playClick(); setScreen('redeem'); }} />}
      </div>

      {screen === 'redeem' && (
        <RedeemScreen
          tokens={tokens}
          usedCodes={usedCodes}
          onRedeem={(code, amount) => {
            setUsedCodes((prev) => [...prev, code]);
            setTokens((t) => t + amount);
          }}
          onPlay={() => { playClick(); setScreen('gacha'); }}
        />
      )}

      {screen === 'gacha' && (
        <GachaScreen
          tokens={tokens}
          onPull={handlePull}
          result={result}
          setResult={handleResult}
          closeResult={closeResult}
          onRedeem={() => setScreen('redeem')}
          readCount={readCount}
        />
      )}

      {showSecret && (
        <SecretOverlay
          onClose={() => setShowSecret(false)}
        />
      )}
    </>
  );
}

/* ── Floating Hearts Background ── */

function FloatingHearts() {
  const hearts = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: ['💕', '💗', '💖', '🩷', '♥', '✿', '❀', '💌'][i % 8],
      left: Math.random() * 100,
      delay: Math.random() * 14,
      duration: 10 + Math.random() * 16,
      size: 12 + Math.random() * 18,
      drift: -50 + Math.random() * 100,
    })), []);

  return (
    <div className="hearts-bg" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
            '--drift': `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

/* ── Heart Burst (plays when capsule message opens) ── */

function HeartBurst() {
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: ['💗', '💕', '💖', '🩷', '♥', '✨'][i % 6],
      angle: (i / 12) * 360,
      distance: 60 + Math.random() * 80,
      size: 16 + Math.random() * 14,
      duration: 0.6 + Math.random() * 0.4,
    })), []);

  return (
    <div className="heart-burst" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="burst-particle"
          style={{
            fontSize: `${p.size}px`,
            '--angle': `${p.angle}deg`,
            '--dist': `${p.distance}px`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

/* ── Welcome Screen ── */

function WelcomeScreen({ onStart }) {
  const [show, setShow] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setShow(true)); }, []);

  return (
    <main className="page">
      <section className={`card welcome-card ${show ? 'card--in' : ''}`}>
        <div className="welcome-envelope">{CONFIG.welcomeEmoji}</div>
        <p className="eyebrow eyebrow--love">{CONFIG.welcomeSubtitle}</p>
        <h1>For My {CONFIG.petName}</h1>
        <p className="welcome-body">{personalise(CONFIG.welcomeBody)}</p>
        <button className="btn-primary btn-glow" onClick={onStart}>
          Open My Surprise 🎁
        </button>
      </section>
    </main>
  );
}

/* ── Redeem Screen ── */

function RedeemScreen({ tokens, usedCodes, onRedeem, onPlay }) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setShow(true)); }, []);

  function redeem() {
    const code = input.trim().toUpperCase();
    setFeedback(null);

    if (!code) {
      playError();
      setFeedback({ type: 'err', msg: `Type a code first, ${CONFIG.petName.toLowerCase()} 💭` });
      return;
    }
    if (usedCodes.includes(code)) {
      playError();
      setFeedback({ type: 'err', msg: 'Already used this one! Try another 😋' });
      return;
    }
    const amount = CODE_MAP[code];
    if (!amount) {
      playError();
      setFeedback({ type: 'err', msg: "Hmm, that doesn't work… check again? 🤔" });
      return;
    }

    playCoin();
    onRedeem(code, amount);
    setFeedback({ type: 'ok', msg: `+${amount} tokens! 🎉` });
    setInput('');
  }

  const remaining = CONFIG.codes.length - usedCodes.length;

  return (
    <main className="page">
      <section className={`card redeem-card ${show ? 'card--in' : ''}`}>
        <p className="eyebrow eyebrow--love">enter your secret code</p>
        <h1>Redeem Tokens</h1>

        <TokenBadge count={tokens} />

        <div className="code-row">
          <input
            className="code-input"
            type="text"
            placeholder="Secret code…"
            value={input}
            onChange={(e) => { setInput(e.target.value); setFeedback(null); }}
            onKeyDown={(e) => e.key === 'Enter' && redeem()}
            autoFocus
          />
          <button className="btn-primary redeem-btn" onClick={redeem}>Redeem</button>
        </div>

        {feedback && (
          <p className={`feedback ${feedback.type === 'ok' ? 'feedback--ok' : 'feedback--err'}`}>
            {feedback.msg}
          </p>
        )}

        <p className="hint">
          {remaining > 0
            ? `${remaining} code${remaining === 1 ? '' : 's'} left to discover`
            : "You've found all the codes ✅"}
        </p>

        <button
          className="btn-primary btn-glow btn-full"
          onClick={onPlay}
          disabled={tokens === 0}
        >
          {tokens > 0 ? `Let's Play! 🎰` : 'Redeem a code first 💭'}
        </button>
      </section>
    </main>
  );
}

/* ── Gacha Screen ── */

function GachaScreen({ tokens, onPull, result, setResult, closeResult, onRedeem, readCount }) {
  return (
    <main className="page">
      <section className="gacha-section">
        <p className="eyebrow eyebrow--love">for you, {CONFIG.herName.toLowerCase()}</p>
        <h1>Turn the Dial 💕</h1>

        <div className="gacha-topbar">
          <TokenBadge count={tokens} />
          {readCount > 0 && (
            <div className="read-counter">
              💌 {readCount} love note{readCount === 1 ? '' : 's'} read
            </div>
          )}
        </div>

        <div className="machine-area">
          <Machine
            data={MACHINE_DATA}
            tokens={tokens}
            onPull={onPull}
            onResult={setResult}
            resultVisible={!!result}
          />
        </div>

        {tokens === 0 && !result && (
          <div className="no-tokens-nudge">
            <p>Out of tokens! 🥺</p>
            <p className="nudge-sub">Got another code from your special someone?</p>
            <button className="btn-primary" onClick={onRedeem}>
              Redeem Another Code 🪙
            </button>
          </div>
        )}

        {tokens > 0 && (
          <button className="btn-secondary" onClick={onRedeem}>
            + Redeem More Codes
          </button>
        )}
      </section>

      {result && (
        <div className="overlay" onClick={closeResult}>
          <article className="result-card" onClick={(e) => e.stopPropagation()}>
            <HeartBurst />
            <div className="result-inner">
              <span className="result-deco">💌</span>
              <p className="eyebrow eyebrow--love">a little note for {CONFIG.herName.toLowerCase()}</p>
              <p className="result-msg">{result.text}</p>
              <p className="result-sign">~ {CONFIG.senderName}</p>
              <button className="btn-primary btn-full" onClick={closeResult}>
                Close 💗
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}

/* ── Secret Message Overlay (after reading ALL messages) ── */

function SecretOverlay({ onClose }) {
  return (
    <div className="overlay overlay--secret" onClick={onClose}>
      <article className="secret-card" onClick={(e) => e.stopPropagation()}>
        <HeartBurst />
        <div className="result-inner">
          <span className="result-deco secret-deco">🥺💕</span>
          <p className="eyebrow eyebrow--love">a secret message</p>
          <p className="secret-msg">{personalise(CONFIG.secretMessage)}</p>
          <p className="result-sign">~ {CONFIG.senderName} 💕</p>
          <button className="btn-primary btn-full" onClick={onClose}>
            I Love You Too 💗
          </button>
        </div>
      </article>
    </div>
  );
}

/* ── Token Badge ── */

function TokenBadge({ count }) {
  return (
    <div className={`token-badge ${count === 0 ? 'token-badge--empty' : ''}`}>
      <span className="tb-icon">🪙</span>
      <span className="tb-num">{count}</span>
      <span className="tb-label">{count === 1 ? 'token' : 'tokens'}</span>
    </div>
  );
}

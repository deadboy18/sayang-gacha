import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const P = import.meta.env.BASE_URL;
const SETTLE_MS = 900, SHAKE_MS = 600, EJECT_MS = 700;

export default function Machine({ data, tokens = Infinity, onPull, onResult, resultVisible = false }) {
  const areaRef = useRef(null);
  const bodiesRef = useRef([]);
  const imgsRef = useRef([]);
  const rafRef = useRef(null);
  const engineRef = useRef(null);
  const removedRef = useRef(new Set());
  const ejectTimer = useRef(null);
  const shakeTimer = useRef(null);

  const [pullCount, setPullCount] = useState(0);
  const [remaining, setRemaining] = useState(() => data.messages.map((_, i) => i));
  const [turning, setTurning] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [falling, setFalling] = useState(null);
  const [landed, setLanded] = useState(null);

  const canPull = !pulling && remaining.length > 0 && !landed && tokens > 0;
  const canRestock = !pulling && remaining.length === 0 && !landed && !resultVisible;

  /* ── physics world ── */
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    removedRef.current = new Set();

    const w = el.clientWidth, h = el.clientHeight;
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.8 }, enableSleeping: true });
    engineRef.current = engine;
    const runner = Matter.Runner.create();

    const wall = { isStatic: true, friction: 0.5, restitution: 0.05 };
    const walls = [
      Matter.Bodies.rectangle(w / 2, -10, w, 20, wall),
      Matter.Bodies.rectangle(w / 2, h + 10, w, 20, wall),
      Matter.Bodies.rectangle(-10, h / 2, 20, h, wall),
      Matter.Bodies.rectangle(w + 10, h / 2, 20, h, wall),
    ];

    const bodies = data.messages.map((_, i) => {
      const r = Math.max(16, Math.min(w, h) * 0.19);
      const jx = (Math.random() - 0.5) * r * 0.8;
      const jy = Math.random() * r * 0.5;
      return Matter.Bodies.circle(
        w * (0.2 + (i % 5) * 0.14) + jx,
        h * (0.22 + Math.floor(i / 5) * 0.28) + jy,
        r,
        { restitution: 0.18, friction: 1, frictionStatic: 1,
          frictionAir: 0.06, density: 0.002, sleepThreshold: 12 },
      );
    });

    Matter.Composite.add(engine.world, [...walls, ...bodies]);
    bodiesRef.current = bodies;
    Matter.Runner.run(runner, engine);

    const settle = setTimeout(() => {
      bodies.forEach((b) => {
        Matter.Body.setVelocity(b, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(b, 0);
        Matter.Sleeping.set(b, true);
      });
    }, SETTLE_MS);

    const sync = () => {
      bodies.forEach((b, i) => {
        const img = imgsRef.current[i];
        if (!img) return;
        if (removedRef.current.has(i)) { img.style.display = 'none'; return; }
        img.style.display = '';
        img.style.transform =
          `translate3d(${b.position.x}px, ${b.position.y}px, 0) rotate(${b.angle}rad)`;
      });
      rafRef.current = requestAnimationFrame(sync);
    };
    sync();

    return () => {
      clearTimeout(settle);
      clearTimeout(ejectTimer.current);
      clearTimeout(shakeTimer.current);
      cancelAnimationFrame(rafRef.current);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, [data.messages, pullCount]);

  /* ── shake the balls ── */
  function shake() {
    bodiesRef.current.forEach((b, i) => {
      if (removedRef.current.has(i)) return;
      Matter.Sleeping.set(b, false);
      Matter.Body.applyForce(b, b.position, {
        x: (Math.random() - 0.5) * 0.005,
        y: -Math.random() * 0.003,
      });
    });
    shakeTimer.current = setTimeout(() => {
      bodiesRef.current.forEach((b, i) => {
        if (removedRef.current.has(i)) return;
        Matter.Body.setVelocity(b, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(b, 0);
        Matter.Sleeping.set(b, true);
      });
    }, SHAKE_MS);
  }

  /* ── pull a capsule ── */
  function pull() {
    if (!canPull) return;
    const target = remaining[Math.floor(Math.random() * remaining.length)];
    const msg = data.messages[target];
    if (onPull) onPull();

    setPulling(true); setTurning(true); setLanded(null); setFalling(null);
    shake();

    ejectTimer.current = setTimeout(() => {
      const b = bodiesRef.current[target];
      if (b && engineRef.current) Matter.Composite.remove(engineRef.current.world, b);
      removedRef.current.add(target);
      setRemaining((prev) => prev.filter((i) => i !== target));
      setTurning(false);
      setFalling(msg);
    }, EJECT_MS);
  }

  function open() {
    if (!landed) return;
    if (onResult) onResult(landed);
    setLanded(null);
  }

  function restock() {
    setRemaining(data.messages.map((_, i) => i));
    setFalling(null); setLanded(null);
    setPullCount((c) => c + 1);
  }

  const tray = falling || landed;

  return (
    <div className="machine-wrap">
      <div className="machine-stage">
        <img className="machine-back" src={`${P}pictures/machine-back.png`} alt="" />

        <div className="window-physics-area" ref={areaRef}>
          {data.messages.map((m, i) => (
            <img key={i} ref={(el) => (imgsRef.current[i] = el)}
                 className="physics-capsule" src={m.capsule} alt="" />
          ))}
        </div>

        <div className="poster-overlay" />
        <img className="machine-front" src={`${P}pictures/machine-front.png`} alt="" />

        <button className={`dial-button ${turning ? 'turning' : ''}`}
                onClick={pull} disabled={!canPull}>
          <img src={`${P}pictures/dial.png`} alt="Turn handle" />
        </button>

        <div className="output-capsule-area">
          {tray && (
            <img className={`output-capsule${landed ? ' output-capsule--landed'
                                                    : ' output-capsule--falling'}`}
                 src={tray.capsule} alt=""
                 onAnimationEnd={falling ? () => {
                   setLanded(falling); setFalling(null); setPulling(false);
                 } : undefined} />
          )}
        </div>

        {landed && (
          <button className="output-click-target" onClick={open} aria-label="Open capsule" />
        )}
      </div>

      <div className="restock-row" style={{ visibility: canRestock ? 'visible' : 'hidden' }}>
        <button className="btn-primary restock-btn" onClick={restock}>Restock Capsules 🔄</button>
      </div>
    </div>
  );
}

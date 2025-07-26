import React, { useEffect, useRef } from "react";

/* Matrix-like animated letter background with smooth color transitions */
const LetterGlitch = ({
  glitchColors = ["#0b1220", "#132036", "#1d2e4a", "#254055", "#2f5168"],
  className = "",
  glitchSpeed = 80,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  opacity = 0.95,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const ctxRef = useRef(null);
  const lastGlitchTime = useRef(Date.now());

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const lettersAndSymbols = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    ..."0123456789",
  ];

  const randChar = () =>
    lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  const randHex = () =>
    glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const hexToRgb = (hex) => {
    const s = hex.replace(/^#/, "");
    if (s.length === 3) {
      const r = parseInt(s[0] + s[0], 16);
      const g = parseInt(s[1] + s[1], 16);
      const b = parseInt(s[2] + s[2], 16);
      return { r, g, b };
    }
    if (s.length === 6) {
      const bigint = parseInt(s, 16);
      if (!Number.isNaN(bigint)) {
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255,
        };
      }
    }
    return null;
  };

  const toRgb = (obj) => `rgb(${obj.r}, ${obj.g}, ${obj.b})`;

  const lerpColor = (startHex, endHex, t) => {
    const a = hexToRgb(startHex);
    const b = hexToRgb(endHex);
    if (!a || !b) return endHex;
    const mix = {
      r: Math.round(a.r + (b.r - a.r) * t),
      g: Math.round(a.g + (b.g - a.g) * t),
      b: Math.round(a.b + (b.b - a.b) * t),
    };
    return toRgb(mix);
  };

  const calcGrid = (width, height) => ({
    columns: Math.ceil(width / charWidth),
    rows: Math.ceil(height / charHeight),
  });

  const initLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const total = columns * rows;
    letters.current = Array.from({ length: total }, () => ({
      char: randChar(),
      baseColor: randHex(), // hex
      targetColor: randHex(), // hex
      progress: 1, // 0..1
    }));
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (ctxRef.current) {
      ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calcGrid(rect.width, rect.height);
    initLetters(columns, rows);
    draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || letters.current.length === 0) return;

    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((cell, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      const color = smooth
        ? lerpColor(cell.baseColor, cell.targetColor, cell.progress)
        : cell.targetColor;
      ctx.fillStyle = color;
      ctx.fillText(cell.char, x, y);
    });
  };

  const tick = () => {
    const now = Date.now();

    if (now - lastGlitchTime.current >= glitchSpeed) {
      const count = Math.max(1, Math.floor(letters.current.length * 0.05));
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * letters.current.length);
        const cell = letters.current[idx];
        if (!cell) continue;

        if (smooth) {
          if (cell.progress >= 1) {
            cell.baseColor = cell.targetColor;
          }
          cell.targetColor = randHex();
          cell.progress = 0;
        } else {
          cell.targetColor = randHex();
          cell.progress = 1;
        }
        cell.char = randChar();
      }
      lastGlitchTime.current = now;
    }

    if (smooth) {
      let needsDraw = false;
      for (const cell of letters.current) {
        if (cell.progress < 1) {
          cell.progress = Math.min(1, cell.progress + 0.05);
          needsDraw = true;
        }
      }
      if (needsDraw) draw();
    } else {
      draw();
    }

    animationRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");

    resize();
    tick();

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        resize();
        tick();
      }, 120);
    };

    window.addEventListener("resize", onResize);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  return (
    <div
      className={`fixed inset-0 ${className}`}
      style={{ backgroundColor: "#000", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          opacity,
          filter: "contrast(1.1) brightness(1.05)",
        }}
      />
      {outerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0) 75%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 55%)",
          }}
        />
      )}
    </div>
  );
};

export default LetterGlitch;

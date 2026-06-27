/**
 * Generates lib/lottie/payment-flow.json — ambient RUB → QR → THB hero animation.
 * Run: node scripts/generate-payment-lottie.mjs
 */

import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../lib/lottie/payment-flow.json");

const W = 640;
const H = 640;
const FR = 60;
const DURATION = 180; // 3s loop

// Asiru brand (0–1 RGB)
const PRIMARY = [55 / 255, 108 / 255, 213 / 255];
const ACCENT = [6 / 255, 102 / 255, 235 / 255];
const SOFT = [227 / 255, 235 / 255, 252 / 255];
const WHITE = [1, 1, 1];

function rgba([r, g, b], a = 1) {
  return [r, g, b, a];
}

function easeKeyframes(frames, prop, from, to, startT = 0) {
  const keys = [];
  const steps = frames.length - 1;
  frames.forEach((value, i) => {
    const t = startT + (i / steps) * (DURATION / (steps > 0 ? 1 : 1));
    const prev = i > 0 ? frames[i - 1] : value;
    keys.push({
      t: Math.round((i / steps) * DURATION),
      s: Array.isArray(prop) ? prop.map((_, j) => (i === 0 ? from[j] : prev[j] ?? from[j])) : [i === 0 ? from : prev],
      ...(i < steps
        ? {
            e: Array.isArray(value) ? value : [value],
            i: { x: [0.42], y: [1] },
            o: { x: [0.58], y: [0] },
          }
        : {}),
    });
  });
  if (keys.length === 1) keys[0].s = Array.isArray(from) ? from : [from];
  return { a: 1, k: keys };
}

function pulseOpacity(phase = 0, min = 35, max = 75) {
  const k = [];
  for (let t = 0; t <= DURATION; t += DURATION / 2) {
    k.push({
      t: (t + phase) % DURATION,
      s: [t % DURATION === 0 ? min : max],
      e: [t % DURATION === 0 ? max : min],
      i: { x: [0.45], y: [1] },
      o: { x: [0.55], y: [0] },
    });
  }
  k.push({ t: DURATION, s: [min] });
  return { a: 1, k };
}

function pulseScale(phase = 0, min = 92, max = 108) {
  const k = [];
  for (let t = 0; t <= DURATION; t += DURATION / 2) {
    const atStart = t === 0;
    k.push({
      t: (t + phase) % DURATION,
      s: [atStart ? min : max, atStart ? min : max, 100],
      e: [atStart ? max : min, atStart ? max : min, 100],
      i: { x: [0.45], y: [1] },
      o: { x: [0.55], y: [0] },
    });
  }
  k.push({ t: DURATION, s: [min, min, 100] });
  return { a: 1, k };
}

function ellipseLayer({
  ind,
  nm,
  cx,
  cy,
  size,
  color,
  opacity = pulseOpacity(0, 18, 42),
  scale = pulseScale(0, 94, 106),
  stroke,
}) {
  const shapes = [
    {
      ty: "gr",
      it: [
        {
          ty: "el",
          s: { a: 0, k: [size, size] },
          p: { a: 0, k: [0, 0] },
        },
        {
          ty: "fl",
          c: { a: 0, k: rgba(color, 1) },
          o: { a: 0, k: 100 },
        },
        ...(stroke
          ? [
              {
                ty: "st",
                c: { a: 0, k: rgba(stroke, 1) },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 },
              },
            ]
          : []),
        {
          ty: "tr",
          p: { a: 0, k: [0, 0] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: 0 },
          o: { a: 0, k: 100 },
        },
      ],
    },
  ];

  return {
    ddd: 0,
    ind,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: opacity,
      r: { a: 0, k: 0 },
      p: { a: 0, k: [cx, cy, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: scale,
    },
    ao: 0,
    shapes,
    ip: 0,
    op: DURATION,
    st: 0,
    bm: 0,
  };
}

function arcPathLayer({ ind, nm }) {
  // Cubic bezier arc from RUB node to THB node
  const path = {
    ty: "sh",
    ks: {
      a: 0,
      k: {
        c: false,
        v: [
          [120, 340],
          [200, 220],
          [440, 220],
          [520, 340],
        ],
        i: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        o: [
          [40, -60],
          [80, -40],
          [-80, -40],
          [-40, 60],
        ],
      },
    },
  };

  const trimEnd = {
    a: 1,
    k: [
      { t: 0, s: [0], e: [100], i: { x: [0.42], y: [1] }, o: { x: [0.58], y: [0] } },
      { t: DURATION - 1, s: [100], e: [0], i: { x: [0.42], y: [1] }, o: { x: [0.58], y: [0] } },
      { t: DURATION, s: [0] },
    ],
  };

  return {
    ddd: 0,
    ind,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [0, 0, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          path,
          {
            ty: "st",
            c: { a: 0, k: rgba(ACCENT, 1) },
            o: { a: 0, k: 85 },
            w: { a: 0, k: 4 },
            lc: 2,
            lj: 2,
            d: [{ n: "d", nm: "dash", v: { a: 0, k: 12 } }, { n: "g", nm: "gap", v: { a: 0, k: 10 } }],
          },
          { ty: "tm", s: { a: 0, k: 0 }, e: trimEnd, o: { a: 0, k: 0 }, m: 1 },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
    ip: 0,
    op: DURATION,
    st: 0,
    bm: 0,
  };
}

function qrGridLayer({ ind, nm, cx, cy }) {
  const cell = 12;
  const gap = 5;
  const pattern = [
    [0, 0],
    [1, 0],
    [0, 1],
    [2, 2],
    [2, 0],
    [0, 2],
    [2, 1],
    [1, 2],
  ];

  const cellGroups = pattern.map(([col, row]) => {
    const x = (col - 1) * (cell + gap);
    const y = (row - 1) * (cell + gap);
    return {
      ty: "gr",
      it: [
        {
          ty: "rc",
          p: { a: 0, k: [x - cell / 2, y - cell / 2] },
          s: { a: 0, k: [cell, cell] },
          r: { a: 0, k: 3 },
        },
        {
          ty: "fl",
          c: { a: 0, k: rgba(PRIMARY, 1) },
          o: { a: 0, k: 100 },
        },
        {
          ty: "tr",
          p: { a: 0, k: [0, 0] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: 0 },
          o: { a: 0, k: 100 },
        },
      ],
    };
  });

  return {
    ddd: 0,
    ind,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: pulseOpacity(15, 55, 95),
      r: { a: 0, k: 0 },
      p: { a: 0, k: [cx, cy, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: pulseScale(15, 96, 104),
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            p: { a: 0, k: [-36, -36] },
            s: { a: 0, k: [72, 72] },
            r: { a: 0, k: 12 },
          },
          {
            ty: "fl",
            c: { a: 0, k: rgba(WHITE, 1) },
            o: { a: 0, k: 100 },
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      },
      ...cellGroups,
      {
        ty: "tr",
        p: { a: 0, k: [0, 0] },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] },
        r: { a: 0, k: 0 },
        o: { a: 0, k: 100 },
      },
    ],
    ip: 0,
    op: DURATION,
    st: 0,
    bm: 0,
  };
}

function particleLayer({ ind, nm, phase }) {
  const position = {
    a: 1,
    k: [
      {
        t: 0,
        s: [120, 340, 0],
        e: [320, 250, 0],
        i: { x: [0.33], y: [1] },
        o: { x: [0.67], y: [0] },
      },
      {
        t: DURATION / 2,
        s: [320, 250, 0],
        e: [520, 340, 0],
        i: { x: [0.33], y: [1] },
        o: { x: [0.67], y: [0] },
      },
      { t: DURATION, s: [520, 340, 0] },
    ],
  };

  return {
    ddd: 0,
    ind,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: pulseOpacity(phase, 30, 90),
      r: { a: 0, k: 0 },
      p: position,
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", s: { a: 0, k: [16, 16] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: rgba(WHITE, 1) }, o: { a: 0, k: 100 } },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
    ip: 0,
    op: DURATION,
    st: phase,
    bm: 0,
  };
}

function rubSymbolLayer({ ind }) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: "RUB mark",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [120, 340, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: pulseScale(0, 100, 108),
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", s: { a: 0, k: [72, 72] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: rgba(PRIMARY, 1) }, o: { a: 0, k: 100 } },
          { ty: "el", s: { a: 0, k: [52, 52] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: rgba(WHITE, 1) }, o: { a: 0, k: 100 } },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
    ip: 0,
    op: DURATION,
    st: 0,
    bm: 0,
  };
}

function thbSymbolLayer({ ind }) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: "THB mark",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [520, 340, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: pulseScale(30, 100, 108),
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", s: { a: 0, k: [72, 72] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: rgba(ACCENT, 1) }, o: { a: 0, k: 100 } },
          { ty: "el", s: { a: 0, k: [52, 52] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: rgba(WHITE, 1) }, o: { a: 0, k: 100 } },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
    ip: 0,
    op: DURATION,
    st: 0,
    bm: 0,
  };
}

const animation = {
  v: "5.7.4",
  fr: FR,
  ip: 0,
  op: DURATION,
  w: W,
  h: H,
  nm: "asiru-payment-flow",
  ddd: 0,
  assets: [],
  layers: [
    ellipseLayer({
      ind: 1,
      nm: "Ambient glow",
      cx: W / 2,
      cy: H / 2 + 10,
      size: 480,
      color: SOFT,
      opacity: pulseOpacity(0, 25, 45),
      scale: { a: 0, k: [100, 100, 100] },
    }),
    arcPathLayer({ ind: 2, nm: "Payment arc" }),
    ellipseLayer({
      ind: 3,
      nm: "RUB halo",
      cx: 120,
      cy: 340,
      size: 120,
      color: PRIMARY,
      opacity: pulseOpacity(0, 30, 55),
    }),
    ellipseLayer({
      ind: 4,
      nm: "THB halo",
      cx: 520,
      cy: 340,
      size: 120,
      color: ACCENT,
      opacity: pulseOpacity(30, 30, 55),
    }),
    rubSymbolLayer({ ind: 5 }),
    qrGridLayer({ ind: 6, nm: "QR hub", cx: 320, cy: 280 }),
    thbSymbolLayer({ ind: 7 }),
    particleLayer({ ind: 8, nm: "Particle A", phase: 0 }),
    particleLayer({ ind: 9, nm: "Particle B", phase: 60 }),
    particleLayer({ ind: 10, nm: "Particle C", phase: 120 }),
  ],
};

writeFileSync(OUT, JSON.stringify(animation, null, 2));
console.log(`Wrote ${OUT} (${(JSON.stringify(animation).length / 1024).toFixed(1)} KB)`);

// Procedural forest/camp "photographs" — multilayer gradients to canvas data URLs.
// Seeded so each element renders deterministically.

export type Mood =
  | "forest"
  | "lake"
  | "sunset"
  | "campfire"
  | "tent"
  | "kids"
  | "meadow"
  | "dune"
  | "mountain";

type Palette = {
  sky: [string, string];
  far: [string, string];
  mid: [string, string];
  near: [string, string];
  fog: string;
  ground: string;
  water?: [string, string];
  warm?: string;
  fire?: [string, string, string];
  hasWater?: boolean;
  hasFire?: boolean;
  hasTent?: boolean;
  hasFlowers?: boolean;
};

const MOODS: Record<Mood, Palette> = {
  forest: {
    sky: ["#d8e3c8", "#b8cfa6"],
    far: ["#6b7f5a", "#4e6448"],
    mid: ["#3e5438", "#2c3f2a"],
    near: ["#1e2a1c", "#12180f"],
    fog: "#e4ebd6",
    ground: "#4a3a22",
  },
  lake: {
    sky: ["#cfe4f2", "#a9ccde"],
    far: ["#7c9aa0", "#4f6b74"],
    mid: ["#6a8a72", "#3f5a4d"],
    near: ["#2a3a2a", "#151f18"],
    fog: "#e9f2f6",
    water: ["#8fb3c4", "#5f8294"],
    ground: "#3a2e1c",
    hasWater: true,
  },
  sunset: {
    sky: ["#f3b58b", "#d97a62"],
    far: ["#6a3a2e", "#3e1f18"],
    mid: ["#2a1a12", "#160c08"],
    near: ["#0f0806", "#0a0504"],
    fog: "#f6c49a",
    warm: "#efa36a",
    ground: "#1a0f0a",
  },
  campfire: {
    sky: ["#1a130e", "#0b0806"],
    far: ["#2a1f16", "#1a120c"],
    mid: ["#14100b", "#0c0806"],
    near: ["#080604", "#040302"],
    fog: "#1e1610",
    fire: ["#f4a85a", "#d95a2a", "#9a2a14"],
    ground: "#0a0604",
    hasFire: true,
  },
  tent: {
    sky: ["#dfe8d6", "#b2c7a0"],
    far: ["#607a5a", "#3f5640"],
    mid: ["#2f4230", "#1f2c20"],
    near: ["#182016", "#0e130d"],
    fog: "#ecf1de",
    ground: "#3a2c18",
    hasTent: true,
  },
  kids: {
    sky: ["#e2ecd5", "#c1d6a8"],
    far: ["#8aa176", "#6a8a5a"],
    mid: ["#9eb86c", "#7aa352"],
    near: ["#5f7f3d", "#3d5826"],
    fog: "#eef3dd",
    ground: "#6a4e2a",
    hasFlowers: true,
  },
  meadow: {
    sky: ["#dae7cb", "#b4cca1"],
    far: ["#7b9160", "#576e44"],
    mid: ["#8faa5f", "#67854a"],
    near: ["#3f5a2a", "#253a17"],
    fog: "#edf2db",
    ground: "#5a4020",
    hasFlowers: true,
  },
  dune: {
    sky: ["#f1e2b8", "#dcc58c"],
    far: ["#c6a96a", "#977d4a"],
    mid: ["#8a6d3a", "#604a22"],
    near: ["#3a2d14", "#1e160a"],
    fog: "#f6ebc6",
    ground: "#8a6a3a",
  },
  mountain: {
    sky: ["#d7e4ec", "#a6c1d4"],
    far: ["#6a7e8c", "#3f5360"],
    mid: ["#2d3b46", "#1b242c"],
    near: ["#13191d", "#0a0d10"],
    fog: "#e4edf2",
    ground: "#20241e",
  },
};

function rng(seed: number): () => number {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function hexToRgb(h: string): [number, number, number] {
  const v = h.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
function rgb(r: number, g: number, b: number, a = 1) {
  return `rgba(${r | 0},${g | 0},${b | 0},${a})`;
}
function mix(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgb(lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t));
}

function drawTreeRidge(
  ctx: CanvasRenderingContext2D,
  rnd: () => number,
  w: number,
  h: number,
  yBase: number,
  heightRange: [number, number],
  color: string,
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, yBase);
  let x = 0;
  while (x < w) {
    const treeW = 6 + rnd() * 18;
    const treeH = heightRange[0] + rnd() * (heightRange[1] - heightRange[0]);
    const top = yBase - treeH;
    ctx.lineTo(x, yBase - treeH * 0.1);
    ctx.lineTo(x + treeW * 0.5, top);
    ctx.lineTo(x + treeW, yBase - treeH * 0.08);
    x += treeW - rnd() * 4;
  }
  ctx.lineTo(w, yBase);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
}

function drawConifer(
  ctx: CanvasRenderingContext2D,
  x: number,
  yBase: number,
  height: number,
  color: string,
  rnd: () => number,
) {
  const tiers = 6 + Math.floor(rnd() * 3);
  ctx.fillStyle = color;
  for (let i = 0; i < tiers; i++) {
    const t = i / (tiers - 1);
    const tierY = yBase - height * (0.15 + t * 0.85);
    const tierW = height * 0.5 * (1 - t * 0.85);
    ctx.beginPath();
    ctx.moveTo(x, tierY - height * 0.12);
    ctx.lineTo(x - tierW, tierY + height * 0.02);
    ctx.lineTo(x + tierW, tierY + height * 0.02);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "#0a0806";
  ctx.fillRect(x - height * 0.02, yBase - height * 0.15, height * 0.04, height * 0.15);
}

function drawLightRays(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rnd: () => number,
  tint: string,
) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const originX = -w * 0.2;
  const originY = -h * 0.3;
  for (let i = 0; i < 8; i++) {
    const angle = 0.3 + rnd() * 0.4;
    const grd = ctx.createLinearGradient(
      originX,
      originY,
      originX + Math.cos(angle) * w * 2,
      originY + Math.sin(angle) * h * 2,
    );
    grd.addColorStop(0, tint + "00");
    grd.addColorStop(0.3, tint + "33");
    grd.addColorStop(0.7, tint + "11");
    grd.addColorStop(1, tint + "00");
    ctx.fillStyle = grd;
    ctx.save();
    ctx.translate(originX, originY);
    ctx.rotate(angle + (rnd() - 0.5) * 0.05);
    ctx.fillRect(0, -20 - rnd() * 40, w * 2.5, 60 + rnd() * 100);
    ctx.restore();
  }
  ctx.restore();
}

function drawFog(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  strength = 0.3,
  band: [number, number] = [0.4, 0.85],
) {
  const grd = ctx.createLinearGradient(0, h * band[0], 0, h * band[1]);
  const [r, g, b] = hexToRgb(color);
  grd.addColorStop(0, `rgba(${r},${g},${b},0)`);
  grd.addColorStop(0.5, `rgba(${r},${g},${b},${strength})`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
}

function drawVignette(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const grd = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.8);
  grd.addColorStop(0, "rgba(0,0,0,0)");
  grd.addColorStop(1, "rgba(10,8,4,0.5)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
}

function drawGrain(ctx: CanvasRenderingContext2D, w: number, h: number, strength = 12) {
  const d = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < d.data.length; i += 4) {
    const n = (Math.random() - 0.5) * strength;
    d.data[i] = Math.max(0, Math.min(255, d.data[i] + n));
    d.data[i + 1] = Math.max(0, Math.min(255, d.data[i + 1] + n));
    d.data[i + 2] = Math.max(0, Math.min(255, d.data[i + 2] + n));
  }
  ctx.putImageData(d, 0, 0);
}

export type MakeOpts = { w?: number; h?: number; mood?: Mood; seed?: number };

export function makePlaceholder(opts: MakeOpts = {}): string {
  const { w = 1200, h = 900, mood = "forest", seed = 1 } = opts;
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext("2d");
  if (!ctx) return "";
  const rnd = rng(seed);
  const P = MOODS[mood] ?? MOODS.forest;

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
  sky.addColorStop(0, P.sky[0]);
  sky.addColorStop(1, P.sky[1]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Clouds
  if (mood !== "campfire") {
    for (let i = 0; i < 6; i++) {
      const cx = rnd() * w;
      const cy = rnd() * h * 0.35;
      const cr = 50 + rnd() * 140;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      cg.addColorStop(0, "rgba(255,255,255,0.35)");
      cg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // Water
  if (P.hasWater && P.water) {
    const waterY = h * 0.55;
    const wg = ctx.createLinearGradient(0, waterY, 0, h * 0.85);
    wg.addColorStop(0, P.water[0]);
    wg.addColorStop(1, P.water[1]);
    ctx.fillStyle = wg;
    ctx.fillRect(0, waterY, w, h * 0.35);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const y = waterY + rnd() * h * 0.3;
      ctx.beginPath();
      const rx = rnd() * w;
      ctx.ellipse(rx, y, 20 + rnd() * 40, 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Distant ridge
  const ridgeY1 = h * (P.hasWater ? 0.55 : 0.55 + rnd() * 0.08);
  drawTreeRidge(ctx, rnd, w, h, ridgeY1, [h * 0.06, h * 0.14], mix(P.far[0], P.far[1], 0.3));
  drawFog(ctx, w, h, P.fog, 0.55, [0.42, 0.62]);

  // Mid ridge
  const ridgeY2 = h * (P.hasWater ? 0.6 : 0.7);
  drawTreeRidge(ctx, rnd, w, h, ridgeY2, [h * 0.1, h * 0.22], mix(P.mid[0], P.mid[1], 0.4));

  // Ground
  const groundY = h * 0.82;
  if (!P.hasWater) {
    const gg = ctx.createLinearGradient(0, groundY, 0, h);
    gg.addColorStop(0, P.ground);
    gg.addColorStop(1, "#0a0604");
    ctx.fillStyle = gg;
    ctx.fillRect(0, groundY, w, h - groundY);
    if (P.hasFlowers) {
      for (let i = 0; i < 80; i++) {
        const x = rnd() * w;
        const y = groundY + rnd() * (h - groundY);
        const c = ["#efd780", "#f38081", "#f79977", "#fbf3d9"][Math.floor(rnd() * 4)];
        ctx.fillStyle = c + "cc";
        ctx.beginPath();
        ctx.arc(x, y, 2 + rnd() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Foreground conifers
  const numFg = 2 + Math.floor(rnd() * 3);
  for (let i = 0; i < numFg; i++) {
    const side = rnd() > 0.5 ? 1 : -1;
    const x = side === 1 ? w * (0.8 + rnd() * 0.25) : w * (-0.1 + rnd() * 0.2);
    const height = h * (0.5 + rnd() * 0.35);
    drawConifer(ctx, x, h, height, mix(P.near[0], P.near[1], rnd()), rnd);
  }

  // Tent
  if (P.hasTent) {
    const tx = w * 0.45 + rnd() * 0.1 * w;
    const ty = groundY;
    const tw = w * 0.22;
    const th = h * 0.28;
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(tx, ty + 4, tw * 0.6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#F38081";
    ctx.beginPath();
    ctx.moveTo(tx, ty - th);
    ctx.lineTo(tx + tw / 2, ty);
    ctx.lineTo(tx - tw / 2, ty);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FBF3D9";
    ctx.beginPath();
    ctx.moveTo(tx - tw * 0.15, ty - th * 0.85);
    ctx.lineTo(tx + tw * 0.15, ty - th * 0.85);
    ctx.lineTo(tx + tw * 0.22, ty);
    ctx.lineTo(tx - tw * 0.22, ty);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.moveTo(tx, ty - th * 0.75);
    ctx.lineTo(tx + tw * 0.18, ty);
    ctx.lineTo(tx - tw * 0.18, ty);
    ctx.closePath();
    ctx.fill();
  }

  // Campfire
  if (P.hasFire && P.fire) {
    const fx = w * 0.5;
    const fy = h * 0.78;
    const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, h * 0.5);
    glow.addColorStop(0, "rgba(244,168,90,0.7)");
    glow.addColorStop(0.3, "rgba(217,90,42,0.3)");
    glow.addColorStop(1, "rgba(217,90,42,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#2a1810";
    ctx.save();
    ctx.translate(fx, fy);
    ctx.rotate(0.2);
    ctx.fillRect(-40, -6, 80, 10);
    ctx.rotate(-0.5);
    ctx.fillRect(-40, -6, 80, 10);
    ctx.restore();
    for (let i = 0; i < 5; i++) {
      const fw = 10 + rnd() * 14;
      const fh = 40 + rnd() * 60;
      const ox = (rnd() - 0.5) * 20;
      const c = P.fire[Math.floor(rnd() * 3)];
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.moveTo(fx + ox, fy - 4);
      ctx.quadraticCurveTo(fx + ox + fw, fy - fh * 0.5, fx + ox, fy - fh);
      ctx.quadraticCurveTo(fx + ox - fw, fy - fh * 0.5, fx + ox, fy - 4);
      ctx.fill();
    }
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = "#efd780";
      ctx.globalAlpha = rnd();
      ctx.fillRect(fx + (rnd() - 0.5) * 100, fy - rnd() * h * 0.4, 1, 2);
    }
    ctx.globalAlpha = 1;
  }

  drawFog(ctx, w, h, P.fog, 0.28, [0.55, 0.78]);

  if (["forest", "kids", "meadow", "mountain", "tent"].includes(mood)) {
    drawLightRays(ctx, w, h, rnd, P.fog);
  }

  if (mood === "sunset") {
    const warm = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, w * 0.6);
    warm.addColorStop(0, "rgba(239, 163, 106, 0.35)");
    warm.addColorStop(1, "rgba(239, 163, 106, 0)");
    ctx.fillStyle = warm;
    ctx.fillRect(0, 0, w, h);
  }

  drawVignette(ctx, w, h);
  drawGrain(ctx, w, h, 10);

  return cv.toDataURL("image/jpeg", 0.85);
}

// Dev-time asset prep: takes the raw brand kit in src/assets/new_page and
// produces optimized, web-ready files in src/assets/brand. Re-run with
// `node scripts/prepare-assets.mjs` whenever new_page assets change.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = new URL("../src/assets/new_page/", import.meta.url);
const OUT = new URL("../src/assets/brand/", import.meta.url);

await mkdir(OUT, { recursive: true });

const src = (name) => new URL(name, SRC).pathname;
const out = (name) => new URL(name, OUT).pathname;

/**
 * Several source PNGs (stick.png, logo.png) have no real transparency —
 * their background was flattened to solid RGB (a checkerboard placeholder
 * for stick.png, a soft cream vignette for logo.png). Flood-fill from the
 * image borders across near-neutral/near-background pixels and either
 * paint them a flat fill color or cut true alpha transparency there,
 * without touching disconnected foreground pixels (e.g. white text printed
 * on the dark green package, which flood-fill can't reach).
 */
async function isolateForeground(
  inputPath,
  {
    mode,
    maxLightness = 232,
    maxChroma = 14,
    growPasses = 0,
    growMaxLightness = 205,
    growMaxChroma = 26,
  },
) {
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info; // channels === 4 after ensureAlpha
  const visited = new Uint8Array(width * height);

  const apply = (idx) => {
    if (mode === "transparent") {
      data[idx + 3] = 0;
    } else {
      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
    }
  };

  const floodFill = (seeds, predicate) => {
    const stack = [...seeds];
    while (stack.length) {
      const y = stack.pop();
      const x = stack.pop();
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      const pos = y * width + x;
      if (visited[pos]) continue;
      const idx = pos * channels;
      if (!predicate(idx)) continue;
      visited[pos] = 1;
      apply(idx);
      stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
    }
  };

  const borderSeeds = [];
  for (let x = 0; x < width; x++) borderSeeds.push(x, 0, x, height - 1);
  for (let y = 0; y < height; y++) borderSeeds.push(0, y, width - 1, y);

  // Pass 1: strict — only pixels reachable from the border that are clearly background.
  floodFill(borderSeeds, (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max > maxLightness && max - min < maxChroma;
  });

  // Pass 2+: grow from the now-cut region with a looser threshold to eat
  // antialiased fringe pixels and small background islands the strict pass
  // couldn't reach (they sit one shade outside the strict cutoff).
  for (let p = 0; p < growPasses; p++) {
    const seeds = [];
    for (let pos = 0; pos < visited.length; pos++) {
      if (visited[pos]) {
        const x = pos % width;
        const y = Math.floor(pos / width);
        seeds.push(x, y);
      }
    }
    floodFill(seeds, (idx) => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max > growMaxLightness && max - min < growMaxChroma;
    });
  }

  return sharp(data, { raw: { width, height, channels } });
}

async function webp(pipeline, outPath, { width, quality = 82 } = {}) {
  let p = pipeline;
  if (width) p = p.resize({ width, withoutEnlargement: true });
  await p.webp({ quality }).toFile(outPath);
  console.log("wrote", outPath);
}

// Logo lockup — decorative, contained use (keeps its real wall/leaf-shadow background).
await webp(sharp(src("logo_banner.png")), out("logo-banner.webp"), { width: 1400, quality: 85 });

// Hero background — the powder-mound/leaf-shadow photography from the same
// shot, cropped above the baked-in wordmark so our own animated headline
// can sit over it instead.
const heroCrop = () =>
  sharp(src("logo_banner.png")).extract({ left: 0, top: 0, width: 1672, height: 540 });
await webp(heroCrop(), out("hero-lg.webp"), { width: 1920, quality: 80 });
await webp(heroCrop(), out("hero-sm.webp"), { width: 1000, quality: 76 });

// Header mark — cut true transparency from the cream background so it sits
// cleanly on the header bar at any scroll state.
const logoTransparent = await isolateForeground(src("logo.png"), {
  mode: "transparent",
  maxLightness: 140,
  maxChroma: 55,
  growPasses: 2,
});
await webp(logoTransparent, out("logo.webp"), { width: 620, quality: 95 });

// Product cutouts.
const stickFixed = await isolateForeground(src("stick.png"), { mode: "white" });
await webp(stickFixed, out("product-stick.webp"), { width: 700, quality: 92 });
await webp(sharp(src("box.png")), out("product-box.webp"), { width: 1000, quality: 90 });
// product-bag.webp is now processed with transparency below (CAJA section).

// Heritage / lifestyle photography — desktop + mobile widths.
const responsive = [
  ["farm.png", "heritage-farm"],
  ["horses.png", "heritage-horses"],
  ["women_example.png", "ritual-women"],
  ["men_example.png", "ritual-men"],
];
for (const [file, name] of responsive) {
  await webp(sharp(src(file)), out(`${name}-lg.webp`), { width: 1600, quality: 76 });
  await webp(sharp(src(file)), out(`${name}-sm.webp`), { width: 900, quality: 72 });
}

// Powder macro texture — used as a subtle section-divider background.
await webp(sharp(src("inspo_path_0.png")), out("texture-powder.webp"), {
  width: 1400,
  quality: 68,
});

// CAJA.png — Box of 20 Sachets, white bg removed so product floats on any surface.
const cajaTransparent = await isolateForeground(src("CAJA.png"), {
  mode: "transparent",
  maxLightness: 240,
  maxChroma: 10,
  growPasses: 1,
});
await webp(cajaTransparent, out("product-caja.webp"), { width: 1200, quality: 92 });

// 100g_bag.png — show the full bag (crop only the bottom 10% cast-shadow from
// the photography surface; the bag base sits at ~87% of the original height).
const bagMeta = await sharp(src("100g_bag.png")).metadata();
const bagCropBuffer = await sharp(src("100g_bag.png"))
  .extract({
    left: 0,
    top: 0,
    width: bagMeta.width,
    height: Math.floor(bagMeta.height * 0.90),
  })
  .toBuffer();

// ERASE FIRST, ISOLATE SECOND.
// Two pre-erase zones (both run before flood-fill so the isolateForeground
// border-fill can't accidentally be confused by them):
//
//  A. Full-width bottom strip (y≥93%): the cast-shadow on the photography
//     surface below the bag base. "100 g" label sits at y≈90%, so y≥93% is safe.
//     Threshold min-RGB > 200 targets only near-pure-white reflection pixels;
//     the dark olive bag body (min-RGB ≈ 40–80) is untouched.
//
//  B. Bottom-right corner (x≥78%, y≥80%): any residual specular highlight on
//     the bag's lower-right material surface that is enclosed by dark pixels and
//     therefore unreachable by the border flood-fill.
//     x≥78% is safe because all centred text ends by x≈68%.
const { data: bagRaw, info: bagRawInfo } = await sharp(bagCropBuffer)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: brw, height: brh, channels: brc } = bagRawInfo;

// Zone A — full-width bottom strip: cast-shadow on the photography surface.
// "100 g" label sits at ~85% of crop height, so y≥88% is safe.
// Shadow is a warm gradient; min-RGB > 100 catches even the dark fringe while
// leaving the dark olive bag body (min-RGB ≈ 40–70) untouched.
const stripY = Math.floor(brh * 0.88);
for (let y = stripY; y < brh; y++) {
  for (let x = 0; x < brw; x++) {
    const base = (y * brw + x) * brc;
    if (Math.min(bagRaw[base], bagRaw[base + 1], bagRaw[base + 2]) > 100) {
      bagRaw[base + 3] = 0;
    }
  }
}

// Zone B — bottom-right corner: enclosed specular / shadow on the bag material.
// x≥70% is past all centred text (~x 68% max), and covers the gap between
// Zone A's y start (88%) and the artifact at y≈85-88% on the right side.
const szX = Math.floor(brw * 0.70);
const szY = Math.floor(brh * 0.78);
for (let y = szY; y < brh; y++) {
  for (let x = szX; x < brw; x++) {
    const base = (y * brw + x) * brc;
    if (Math.min(bagRaw[base], bagRaw[base + 1], bagRaw[base + 2]) > 100) {
      bagRaw[base + 3] = 0;
    }
  }
}

// Encode as PNG so isolateForeground's sharp(buffer) can detect the format.
const bagPreErased = await sharp(bagRaw, {
  raw: { width: brw, height: brh, channels: brc },
}).png().toBuffer();

// Flood-fill removes the main white background (all border-connected neutral pixels).
const bagTransparent = await isolateForeground(bagPreErased, {
  mode: "transparent",
  maxLightness: 248,
  maxChroma: 15,
  growPasses: 2,
});
await webp(bagTransparent, out("product-bag.webp"), { width: 760, quality: 92 });

// New hero assets (July 2026 redesign).
// LOGO.png is already fully transparent — just compress/resize for header.
await webp(sharp(src("LOGO.png")), out("logo-header.webp"), { width: 600, quality: 95 });
// PATH.png — new hero background, vivid green powder macro.
await webp(sharp(src("PATH.png")), out("hero-path-lg.webp"), { width: 1920, quality: 78 });
await webp(sharp(src("PATH.png")), out("hero-path-sm.webp"), { width: 900, quality: 75 });
// stick_banner.png — hero hover state, shows the product with benefits callouts.
await webp(sharp(src("stick_banner.png")), out("hero-stick-lg.webp"), { width: 1920, quality: 78 });
await webp(sharp(src("stick_banner.png")), out("hero-stick-sm.webp"), { width: 900, quality: 75 });

console.log("done");

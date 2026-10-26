import { type Project, statusLabel } from "@/content/projects";

// Until real screenshots land in /public, each phone screen is drawn from
// the project's own data: brand colour, name, status, tagline. Clearly a
// title card, never a fake UI.

export const SCREEN_W = 540;
export const SCREEN_H = 1170;

const statusColour = { live: "#22A45D", testing: "#E0A100", prerelease: "#E0A100", cooking: "#E0569A", archived: "#9A9A9A" };

function textOn(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? "#121212" : "#F2EEE6";
}

export const brandOf = (p: Project) => p.brand ?? "#121212";

export function drawScreen(ctx: CanvasRenderingContext2D, p: Project, image?: HTMLImageElement | null) {
  const bg = brandOf(p);
  const fg = textOn(bg);
  const root = getComputedStyle(document.documentElement);
  const family = root.getPropertyValue("--font-valley").trim() || getComputedStyle(document.body).fontFamily;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

  if (image) {
    const scale = Math.max(SCREEN_W / image.width, SCREEN_H / image.height);
    ctx.drawImage(image, 0, 0, image.width * scale, image.height * scale);
    return;
  }

  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.7;
  ctx.font = `600 22px ui-monospace, monospace`;
  ctx.fillText("400 · " + p.platforms.join(" · ").toUpperCase(), 44, 110);
  ctx.globalAlpha = 1;

  ctx.fillStyle = statusColour[p.status];
  ctx.beginPath();
  ctx.arc(56, 180, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.font = `700 24px ui-monospace, monospace`;
  ctx.fillText(statusLabel[p.status], 82, 189);

  const words = p.name.split(/\s*\/\s*|\s+/).filter(Boolean).slice(0, 3).map((w) => w.toUpperCase());
  // Shrink the name until its longest word fits the screen.
  let size = 92;
  ctx.font = `900 ${size}px ${family}`;
  const widest = Math.max(...words.map((w) => ctx.measureText(w).width));
  if (widest > SCREEN_W - 80) size = Math.floor((size * (SCREEN_W - 80)) / widest);
  ctx.font = `900 ${size}px ${family}`;
  let y = 560;
  for (const w of words) {
    ctx.fillText(w, 40, y);
    y += size * 0.95;
  }

  ctx.font = `500 30px ${family}`;
  wrap(ctx, p.tagline, 44, y + 30, SCREEN_W - 88, 40);

  ctx.globalAlpha = 0.6;
  ctx.font = `500 18px ui-monospace, monospace`;
  ctx.fillText("SCREENSHOTS COMING", 44, SCREEN_H - 60);
  ctx.globalAlpha = 1;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > max && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lh;
    } else line = test;
  }
  ctx.fillText(line, x, y);
}

export { textOn };

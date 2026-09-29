// GeoScout IQ thumbnail: an illustration of the app's output (H3-style hex heatmap over a
// city map, competitor and own-store pins, and the top site's score card). The live demo
// needs Google Maps, so this is drawn rather than screenshotted.
// Run: node scripts/make-geoscout-thumb.mjs  (make-thumbnails.mjs skips this project)
import sharp from 'sharp'

const W = 1280, H = 720
const FONT = 'DejaVu Sans, Helvetica, Arial, sans-serif'

// small seeded random, so the picture is the same on every run
let seed = 7
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646

// suitability field: a few demand hot spots minus competitor pressure
const hot = [[440, 300, 95, 1], [690, 240, 80, 0.75], [300, 540, 90, 0.65], [820, 500, 85, 0.6], [590, 470, 70, 0.55], [180, 300, 80, 0.45], [480, 640, 70, 0.45]]
const competitors = [[640, 300], [360, 250], [790, 430], [520, 580], [250, 420], [880, 300]]
const own = [[310, 330], [720, 600]]
const field = (x, y) => {
  let v = 0
  for (const [cx, cy, r, w] of hot) v += w * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * r * r))
  for (const [cx, cy] of competitors) v -= 0.28 * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * 45 * 45))
  return Math.max(0, Math.min(1, 0.1 + v * 0.9 + (rnd() - 0.5) * 0.12))
}

// dim teal -> amber -> green
const ramp = [[0, [42, 63, 62]], [0.35, [14, 116, 144]], [0.62, [234, 179, 8]], [1, [34, 197, 94]]]
const color = (t) => {
  for (let i = 1; i < ramp.length; i++) {
    if (t <= ramp[i][0]) {
      const [t0, c0] = ramp[i - 1], [t1, c1] = ramp[i]
      const k = (t - t0) / (t1 - t0)
      return `rgb(${c0.map((c, j) => Math.round(c + (c1[j] - c) * k)).join(',')})`
    }
  }
  return `rgb(${ramp.at(-1)[1].join(',')})`
}

// roads and a river under the hexes
let roads = ''
for (let i = 0; i < 12; i++) {
  const horizontal = i % 2 === 0
  const base = horizontal ? 60 + (i / 2) * 110 + rnd() * 40 : 60 + ((i - 1) / 2) * 170 + rnd() * 50
  const p = (t) => {
    const wob = Math.sin(t * 2.2 + i) * 35 + (rnd() - 0.5) * 20
    return horizontal ? `${t * 1050 - 20} ${base + wob}` : `${base + wob} ${t * 760 - 20}`
  }
  roads += `<path d="M ${p(0)} Q ${p(0.25)} ${p(0.5)} T ${p(1)}" fill="none" stroke="#2B3D3C" stroke-width="${i < 4 ? 5 : 2.5}" stroke-linecap="round"/>`
}
const river = `<path d="M -20 140 C 200 110 330 190 520 150 S 820 80 1000 130" fill="none" stroke="#18323B" stroke-width="22" stroke-linecap="round"/>`

// pointy-top hex grid over the map area (x < 990)
const R = 30, hw = Math.sqrt(3) * R
let hexes = ''
let best = { v: -1 }
for (let row = 0; row * 1.5 * R < H + R; row++) {
  for (let col = 0; col * hw < 1000; col++) {
    const cx = col * hw + (row % 2 ? hw / 2 : 0), cy = row * 1.5 * R
    const v = field(cx, cy)
    if (v < 0.2) continue
    const pts = [...Array(6)].map((_, i) => {
      const a = Math.PI / 180 * (60 * i - 30)
      return `${(cx + (R - 1.5) * Math.cos(a)).toFixed(1)},${(cy + (R - 1.5) * Math.sin(a)).toFixed(1)}`
    }).join(' ')
    hexes += `<polygon points="${pts}" fill="${color(v)}" fill-opacity="${(0.35 + v * 0.5).toFixed(2)}" stroke="#0F1717" stroke-width="1.5"/>`
    if (v > best.v && cx > 120 && cx < 900 && cy > 120 && cy < 640) best = { v, cx, cy, pts }
  }
}
const bestHex = `<polygon points="${best.pts}" fill="none" stroke="#FDE047" stroke-width="4" filter="url(#glow)"/>`

const pin = (x, y, fill) => `<g transform="translate(${x},${y})"><path d="M0 0 C -11 -14 -11 -30 0 -30 C 11 -30 11 -14 0 0 Z" fill="${fill}" stroke="#0B1111" stroke-width="2"/><circle cy="-20" r="4.5" fill="#0B1111"/></g>`
const pins = competitors.map(([x, y]) => pin(x, y, '#F87171')).join('') + own.map(([x, y]) => pin(x, y, '#60A5FA')).join('')
const bestPin = `<g transform="translate(${best.cx},${best.cy - 4})"><path d="M0 0 C -16 -20 -16 -44 0 -44 C 16 -44 16 -20 0 -20 Z" fill="#FDE047" stroke="#0B1111" stroke-width="2.5"/><text y="-26" text-anchor="middle" font-size="15" font-weight="bold" fill="#0B1111">1</text></g>`

// score card (numbers from a real GeoScout report)
const bars = [['Demand', 65], ['Whitespace', 79], ['Access', 42], ['Growth', 80]]
const cx0 = 1010, cy0 = 150
const card = `
  <rect x="${cx0}" y="${cy0}" width="236" height="420" rx="18" fill="#0B1111" fill-opacity=".92" stroke="#2F4442" stroke-width="2"/>
  <rect x="${cx0 + 20}" y="${cy0 + 22}" width="92" height="30" rx="15" fill="#FDE047"/>
  <text x="${cx0 + 66}" y="${cy0 + 43}" text-anchor="middle" font-size="15" font-weight="bold" fill="#0B1111">Site #1</text>
  <text x="${cx0 + 20}" y="${cy0 + 118}" font-size="60" font-weight="bold" fill="#E5E7EB">65</text>
  <text x="${cx0 + 104}" y="${cy0 + 118}" font-size="22" fill="#9CA3AF">/ 100</text>
  ${bars.map(([n, v], i) => {
    const y = cy0 + 168 + i * 56
    return `<text x="${cx0 + 20}" y="${y}" font-size="15" fill="#9CA3AF">${n}</text>
      <text x="${cx0 + 216}" y="${y}" font-size="15" fill="#E5E7EB" text-anchor="end">${v}</text>
      <rect x="${cx0 + 20}" y="${y + 10}" width="196" height="8" rx="4" fill="#213130"/>
      <rect x="${cx0 + 20}" y="${y + 10}" width="${196 * v / 100}" height="8" rx="4" fill="${color(v / 100)}"/>`
  }).join('')}
  <circle cx="${cx0 + 28}" cy="${cy0 + 396}" r="6" fill="#F87171"/><text x="${cx0 + 42}" y="${cy0 + 401}" font-size="14" fill="#9CA3AF">Rival</text>
  <circle cx="${cx0 + 112}" cy="${cy0 + 396}" r="6" fill="#60A5FA"/><text x="${cx0 + 126}" y="${cy0 + 401}" font-size="14" fill="#9CA3AF">Own store</text>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="${FONT}">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <radialGradient id="vig" cx=".4" cy=".5" r=".75"><stop offset=".6" stop-color="#0F1717" stop-opacity="0"/><stop offset="1" stop-color="#0B1111" stop-opacity=".85"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0F1717"/>
  ${river}${roads}${hexes}<g opacity=".35">${roads.replaceAll('#2B3D3C', '#5B7370')}</g>${bestHex}${pins}${bestPin}
  <rect width="100%" height="100%" fill="url(#vig)"/>
  ${card}
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile('src/assets/projects/thumbs/geoscout-iq.jpg')
console.log('geoscout thumbnail written')

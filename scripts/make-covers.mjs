// Generates cover thumbnails (1280x720 JPG) for projects that have no public screenshot.
// Run: node scripts/make-covers.mjs  (app icons are read from ./scripts/cover-icons/)
import sharp from 'sharp'

const W = 1280, H = 720
const FONT = 'DejaVu Sans, Helvetica, Arial, sans-serif'
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// Lucide icon paths (ISC licence), drawn at 24x24
const GLYPHS = {
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
  compare: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/>',
  package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>',
}

function card({ title, sub, chips, from, to }) {
  const chipEls = []
  let x = 440
  for (const c of chips) {
    const w = c.length * 11 + 36
    chipEls.push(`<rect x="${x}" y="470" width="${w}" height="44" rx="22" fill="#ffffff" fill-opacity=".14" stroke="#ffffff" stroke-opacity=".35"/><text x="${x + w / 2}" y="499" font-size="19" fill="#fff" text-anchor="middle">${esc(c)}</text>`)
    x += w + 12
  }
  const subLines = sub.map((l, i) => `<text x="440" y="${376 + i * 38}" font-size="28" fill="#fff" fill-opacity=".85">${esc(l)}</text>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="${FONT}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="1180" cy="80" r="260" fill="#fff" fill-opacity=".06"/>
    <text x="440" y="${sub.length > 1 ? 300 : 320}" font-size="60" font-weight="bold" fill="#fff">${esc(title)}</text>
    ${subLines}${chipEls.join('')}</svg>`
}

async function iconTile(icon) {
  if (icon.file) {
    return sharp(icon.file).resize(300, 300)
      .composite([{ input: Buffer.from('<svg width="300" height="300"><rect width="300" height="300" rx="66"/></svg>'), blend: 'dest-in' }]).png().toBuffer()
  }
  return sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" rx="66" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-opacity=".4"/>
    <g transform="translate(66 66) scale(7)" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[icon.glyph]}</g></svg>`)).png().toBuffer()
}

const covers = [
  { out: 'kothari-electric', title: 'Shop Inventory', sub: ['Stock in / stock out web app', 'for an electrical shop'], chips: ['JavaScript', 'Firestore'], from: '#374151', to: '#6b7280', icon: { glyph: 'package' } },
]

for (const c of covers) {
  const tile = await iconTile(c.icon)
  await sharp(Buffer.from(card(c))).composite([{ input: tile, left: 90, top: 210 }]).jpeg({ quality: 85, mozjpeg: true }).toFile(`src/assets/projects/${c.out}.jpg`)
}

// OCR study: results chart instead of document images (they contain personal data)
const engines = [['AWS Textract', 104], ['Tesseract 5.4', 103], ['RapidOCR', 101], ['PaddleOCR', 99]]
const x0 = 230, maxW = 400 // bar length for 108
const bars = engines.map(([n, v], i) => {
  const y = 220 + i * 70, w = Math.round((v / 108) * maxW), hot = n.startsWith('Tesseract')
  return `<text x="${x0 - 16}" y="${y + 30}" font-size="22" fill="#E5E7EB" text-anchor="end">${n}</text>
  <rect x="${x0}" y="${y}" width="${w}" height="44" rx="6" fill="${hot ? '#EAB308' : '#3E5654'}"/>
  <text x="${x0 + w + 12}" y="${y + 30}" font-size="22" fill="#E5E7EB" font-weight="bold">${v}/108</text>`
}).join('')
const costMax = 142.5, cx = 900, cw = 200
const cost = [['Textract', 142.5, '₹142.50'], ['Tesseract on Lambda', 4.9, '₹4.90']].map(([n, v, l], i) => {
  const y = 250 + i * 110, w = Math.max(6, Math.round((v / costMax) * cw)), hot = i === 1
  return `<text x="${cx}" y="${y - 10}" font-size="20" fill="#9CA3AF">${n}</text>
  <rect x="${cx}" y="${y}" width="${w}" height="44" rx="6" fill="${hot ? '#EAB308' : '#3E5654'}"/>
  <text x="${cx + w + 12}" y="${y + 30}" font-size="22" fill="#E5E7EB" font-weight="bold">${l}</text>`
}).join('')
const ocr = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="${FONT}">
  <rect width="100%" height="100%" fill="#162121"/>
  <text x="60" y="80" font-size="40" font-weight="bold" fill="#E5E7EB">OCR Engine Benchmark</text>
  <text x="60" y="120" font-size="22" fill="#9CA3AF">Indian education-loan documents · 108 checked values · 4 Indian scripts · tables</text>
  <text x="${x0}" y="195" font-size="18" fill="#EAB308" font-weight="bold" letter-spacing="1">VALUES FOUND</text>
  ${bars}
  <text x="${cx}" y="195" font-size="18" fill="#EAB308" font-weight="bold" letter-spacing="1">COST PER 1,000 PAGES</text>
  ${cost}
  <text x="60" y="600" font-size="22" fill="#E5E7EB">Tesseract was the only engine that read Telugu, Tamil, Devanagari and Kannada.</text>
  <text x="60" y="640" font-size="22" fill="#E5E7EB">Tables: Tesseract + Qwen3-VL got 178/183 values right vs Textract Tables 163/183.</text>
</svg>`
await sharp(Buffer.from(ocr)).jpeg({ quality: 85, mozjpeg: true }).toFile('src/assets/projects/ocr-benchmark.jpg')
console.log('covers written')

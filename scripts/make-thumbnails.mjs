// One thumbnail style for every project, with no text added: the architecture diagram
// (title cropped off) where the project has one, otherwise the screenshot in a
// browser or phone frame on the site's dark background.
// Sources live in scripts/thumb-sources/<slug>.jpg. Entries marked `custom` are skipped. Run: node scripts/make-thumbnails.mjs
import fs from 'node:fs'
import sharp from 'sharp'
import { projects } from './thumb-data.mjs'

const W = 1280, H = 720
const C = { bg: '#162121', accent: '#EAB308', frame: '#0B1111', line: '#2F4442' }

async function diagramImage(p) {
  const img = await sharp(`src/assets/diagrams/${p.diagram}.svg`, { density: 144 })
    .resize(W, H).extract({ left: 0, top: 110, width: W, height: H - 110 }).png().toBuffer()
  return { svg: '', img, left: 0, top: 55 }
}

async function frameImage(p) {
  if (p.diagram) return diagramImage(p)
  const src = `scripts/thumb-sources/${p.slug}.jpg`
  if (p.frame === 'phone') {
    const sw = 300, sh = 624
    const screen = await sharp(src).resize(sw, sh, { fit: 'cover', position: 'top' })
      .composite([{ input: Buffer.from(`<svg width="${sw}" height="${sh}"><rect width="${sw}" height="${sh}" rx="28"/></svg>`), blend: 'dest-in' }]).png().toBuffer()
    const fw = sw + 20, fh = sh + 20, fx = Math.round((W - fw) / 2), fy = Math.round((H - fh) / 2)
    return { svg: `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="38" fill="${C.frame}" stroke="${C.line}" stroke-width="2"/>`, img: screen, left: fx + 10, top: fy + 10 }
  }
  const bw = 1100, bh = 620, bar = 40, bx = Math.round((W - bw) / 2), by = Math.round((H - bh) / 2)
  const shot = await sharp(src).resize(bw, bh - bar, { fit: 'cover', position: 'top' })
    .composite([{ input: Buffer.from(`<svg width="${bw}" height="${bh - bar}"><rect y="-20" width="${bw}" height="${bh - bar + 20}" rx="14"/></svg>`), blend: 'dest-in' }]).png().toBuffer()
  const dots = [0, 1, 2].map((i) => `<circle cx="${bx + 26 + i * 22}" cy="${by + bar / 2}" r="7" fill="${['#F87171', '#FBBF24', '#34D399'][i]}" fill-opacity=".8"/>`).join('')
  return { svg: `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="14" fill="${C.frame}" stroke="${C.line}" stroke-width="2"/>${dots}`, img: shot, left: bx, top: by + bar }
}

fs.mkdirSync('src/assets/projects/thumbs', { recursive: true })
for (const p of projects) {
  if (p.custom) continue // drawn by its own script, e.g. make-geoscout-thumb.mjs
  const f = await frameImage(p)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><radialGradient id="r" cx=".85" cy=".1" r=".8"><stop offset="0" stop-color="${C.accent}" stop-opacity=".10"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></radialGradient></defs>
    <rect width="100%" height="100%" fill="${C.bg}"/><rect width="100%" height="100%" fill="url(#r)"/>
    ${f.svg}</svg>`
  await sharp(Buffer.from(svg)).composite([{ input: f.img, left: f.left, top: f.top }])
    .jpeg({ quality: 84, mozjpeg: true }).toFile(`src/assets/projects/thumbs/${p.slug}.jpg`)
}
console.log(`${projects.length} thumbnails written`)

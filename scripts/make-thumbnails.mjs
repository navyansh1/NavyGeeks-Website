// One thumbnail style for every project: dark card, title / type / tags on the left,
// the project's screenshot or diagram in a browser or phone frame on the right.
// Sources live in scripts/thumb-sources/<slug>.jpg. Run: node scripts/make-thumbnails.mjs
import fs from 'node:fs'
import sharp from 'sharp'
import { projects } from './thumb-data.mjs'

const W = 1280, H = 720
const FONT = 'DejaVu Sans, Helvetica, Arial, sans-serif'
const C = { bg: '#162121', text: '#F3F4F6', muted: '#9CA3AF', accent: '#EAB308', frame: '#0B1111', line: '#2F4442' }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// naive word wrap by estimated character width
function wrap(text, size, maxWidth) {
  const perLine = Math.floor(maxWidth / (size * 0.58))
  const lines = []
  let cur = ''
  for (const word of text.split(' ')) {
    if ((cur + ' ' + word).trim().length > perLine) { lines.push(cur.trim()); cur = word } else cur += ' ' + word
  }
  if (cur.trim()) lines.push(cur.trim())
  return lines
}

function textPanel(p) {
  const size = p.title.length > 22 ? 46 : 54
  const lines = wrap(p.title, size, 470).slice(0, 3)
  const blockH = 40 + lines.length * (size + 8) + 70
  let y = Math.round((H - blockH) / 2) + 20
  let out = `<text x="64" y="${y}" font-size="20" font-weight="bold" fill="${C.accent}" letter-spacing="2">${esc(p.kind.toUpperCase())}</text>`
  y += size + 22
  for (const l of lines) { out += `<text x="64" y="${y}" font-size="${size}" font-weight="bold" fill="${C.text}">${esc(l)}</text>`; y += size + 8 }
  y += 26
  let x = 64
  const chips = [...(p.isPrivate ? ['Private code'] : []), ...p.stack.slice(0, 3)]
  for (const c of chips) {
    const w = Math.round(c.length * 11.5 + 30)
    if (x + w > 540) break
    const priv = c === 'Private code'
    out += `<rect x="${x}" y="${y - 28}" width="${w}" height="40" rx="20" fill="${priv ? '#2A3434' : 'none'}" stroke="${priv ? '#3A4747' : C.accent}" stroke-opacity="${priv ? 1 : 0.55}"/>
      <text x="${x + w / 2}" y="${y - 1}" font-size="19" fill="${priv ? '#D1D5DB' : C.accent}" text-anchor="middle">${esc(c)}</text>`
    x += w + 10
  }
  return out
}

async function frameImage(p) {
  const src = `scripts/thumb-sources/${p.slug}.jpg`
  if (p.frame === 'phone') {
    const sw = 240, sh = 500
    const screen = await sharp(src).resize(sw, sh, { fit: 'cover', position: 'top' })
      .composite([{ input: Buffer.from(`<svg width="${sw}" height="${sh}"><rect width="${sw}" height="${sh}" rx="28"/></svg>`), blend: 'dest-in' }]).png().toBuffer()
    const fw = sw + 20, fh = sh + 20, fx = 600 + Math.round((620 - fw) / 2), fy = Math.round((H - fh) / 2)
    return { svg: `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="38" fill="${C.frame}" stroke="${C.line}" stroke-width="2"/>`, img: screen, left: fx + 10, top: fy + 10 }
  }
  const bw = 620, bh = 420, bar = 34, bx = 596, by = Math.round((H - bh) / 2)
  const shot = await sharp(src).resize(bw, bh - bar, { fit: 'cover', position: 'top' })
    .composite([{ input: Buffer.from(`<svg width="${bw}" height="${bh - bar}"><rect y="-20" width="${bw}" height="${bh - bar + 20}" rx="14"/></svg>`), blend: 'dest-in' }]).png().toBuffer()
  const dots = [0, 1, 2].map((i) => `<circle cx="${bx + 22 + i * 18}" cy="${by + bar / 2}" r="5.5" fill="${['#F87171', '#FBBF24', '#34D399'][i]}" fill-opacity=".8"/>`).join('')
  return { svg: `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="14" fill="${C.frame}" stroke="${C.line}" stroke-width="2"/>${dots}`, img: shot, left: bx, top: by + bar }
}

fs.mkdirSync('src/assets/projects/thumbs', { recursive: true })
for (const p of projects) {
  const f = await frameImage(p)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="${FONT}">
    <defs><radialGradient id="r" cx=".85" cy=".1" r=".8"><stop offset="0" stop-color="${C.accent}" stop-opacity=".10"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></radialGradient></defs>
    <rect width="100%" height="100%" fill="${C.bg}"/><rect width="100%" height="100%" fill="url(#r)"/>
    ${textPanel(p)}${f.svg}</svg>`
  await sharp(Buffer.from(svg)).composite([{ input: f.img, left: f.left, top: f.top }])
    .jpeg({ quality: 84, mozjpeg: true }).toFile(`src/assets/projects/thumbs/${p.slug}.jpg`)
}
console.log(`${projects.length} thumbnails written`)

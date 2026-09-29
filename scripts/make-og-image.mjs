// Generates public/og-image.png (1200x630 link-preview card). Run: node scripts/make-og-image.mjs
import sharp from 'sharp'

const W = 1200
const H = 630
const photoSize = 400

const photo = await sharp('src/assets/profile/profpic.png')
  .resize(photoSize, photoSize, { fit: 'cover', position: 'top' })
  .composite([{
    input: Buffer.from(`<svg width="${photoSize}" height="${photoSize}"><rect width="${photoSize}" height="${photoSize}" rx="36"/></svg>`),
    blend: 'dest-in',
  }])
  .png()
  .toBuffer()

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#2f4f4f"/>
  <circle cx="1050" cy="80" r="330" fill="#b213ca" fill-opacity="0.18"/>
  <text x="70" y="190" font-family="DejaVu Sans, Arial, sans-serif" font-size="30" fill="#e5e7eb">hey, I am</text>
  <text x="70" y="270" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="76" fill="#eab308">Navyansh</text>
  <text x="70" y="352" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="76" fill="#eab308">Kothari</text>
  <text x="70" y="425" font-family="DejaVu Sans, Arial, sans-serif" font-size="28" fill="#f3f4f6">Data Scientist · Gen AI Engineer</text>
  <text x="70" y="468" font-family="DejaVu Sans, Arial, sans-serif" font-size="28" fill="#f3f4f6">App Developer · IEEE Researcher</text>
  <text x="70" y="560" font-family="DejaVu Sans, Arial, sans-serif" font-size="28" fill="#eab308">navygeeks.in</text>
</svg>`)

await sharp(text)
  .composite([{ input: photo, left: W - photoSize - 60, top: (H - photoSize) / 2 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png')
console.log('wrote public/og-image.png')

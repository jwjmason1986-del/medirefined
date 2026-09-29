// Builds the favicon/app-icon set and the OG share card from the logo artwork in public/images/.
// Run after the logo changes (then bump ?v= in nuxt.config app.head.link + site.webmanifest):
//   docker compose exec web node scripts/brand-assets.mjs
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const PAPER = { r: 249, g: 247, b: 241, alpha: 1 }
const GOLD = '#A8895F'
const NAVY = '#231D6F'

// Icon: the face-profile line from the logo (right-hand part of the artwork), gold on a navy tile with a fine gold ring.
async function icon(size) {
  const face = await sharp('public/images/medirefined-logo.png')
    .extract({ left: 440, top: 276, width: 220, height: 336 })
    .resize({ height: Math.round(size * 0.72), fit: 'inside' })
    .toBuffer()
  const ring = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" rx="${size * 0.22}" fill="${NAVY}"/><rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.9}" height="${size * 0.9}" rx="${size * 0.18}" fill="none" stroke="${GOLD}" stroke-width="${Math.max(1.5, size * 0.03)}"/></svg>`)
  return sharp(ring).composite([{ input: face, gravity: 'center' }]).png().toBuffer()
}

for (const [file, size] of [['favicon-48.png', 48], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]])
  await writeFile(`public/${file}`, await icon(size))

// favicon.ico = a single 48px PNG wrapped in an ICO container (browsers request /favicon.ico by default).
const png = await icon(48)
const head = Buffer.alloc(22)
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4) // reserved, type=icon, count=1
head.writeUInt8(48, 6); head.writeUInt8(48, 7); head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12) // 48×48, 1 plane, 32bpp
head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18) // image size, offset
await writeFile('public/favicon.ico', Buffer.concat([head, png]))

// OG card 1200×630: paper ground, gold double frame, full logo centred. (No SVG <text>: the container has no
// fonts, so text would render as boxes.)
const logo = await sharp('public/images/medirefined-logo.png').resize({ width: 720 }).toBuffer()
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#F9F7F1"/>
  <rect x="22" y="22" width="1156" height="586" fill="none" stroke="${GOLD}" stroke-width="4"/>
  <rect x="34" y="34" width="1132" height="562" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
</svg>`)
await sharp(card).flatten({ background: PAPER }).composite([{ input: logo, gravity: 'center' }]).jpeg({ quality: 86 }).toFile('public/og/home.jpg')
console.log('icons + og card written')

// WebP versions of the page images (served via <picture> with the PNG/JPG as fallback). The hero logo is the LCP.
for (const w of [520, 1000])
  await sharp('public/images/medirefined-logo.png').resize({ width: w }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(`public/images/medirefined-logo-${w}.webp`)
await sharp('public/images/face.jpg').webp({ quality: 78, effort: 6 }).toFile('public/images/face.webp')
console.log('webp images written')

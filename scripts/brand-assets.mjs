// Builds the favicon/app-icon set and the OG share card from the logo artwork in public/images/.
// Run after the logo changes (then bump ?v= in nuxt.config app.head.link + site.webmanifest):
//   docker compose exec web node scripts/brand-assets.mjs
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const PAPER = { r: 249, g: 247, b: 241, alpha: 1 }
const GOLD = '#A8895F'

// Icon: "MR" monogram cut straight from the logo artwork (navy serif "M" from "Medi", gold script "R" from
// "Refined", at the logo's own proportions) on white. Coordinates are in medirefined-logo.png (1000×626).
const LOGO = 'public/images/medirefined-logo.png'
async function monogram() {
  const M = await sharp(LOGO).extract({ left: 10, top: 103, width: 116, height: 96 }).toBuffer()
  // The script R is joined to the "e"; clear the e's zone (right of the R, below its bowl).
  const W = 152
  const H = 270
  const { data } = await sharp(LOGO).extract({ left: 300, top: 8, width: W, height: H }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if ((x >= 136 && y >= 80 && y < 215) || (x >= 146 && y >= 80))
        data[(y * W + x) * 4 + 3] = 0
    }
  }
  const R = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer()
  const gapX = 104 // R tucked in beside the M; M sits 95px below the R's top, as in the logo
  return sharp({ create: { width: gapX + W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: M, left: 0, top: 95 }, { input: R, left: gapX, top: 0 }])
    .png()
    .toBuffer()
}
const mono = await monogram()

async function icon(size) {
  const pad = size <= 64 ? 0.03 : 0.1 // small favicons: letters fill more of the square
  const inner = Math.round(size * (1 - 2 * pad))
  let m = sharp(mono).resize({ width: inner, height: inner, fit: 'inside' })
  if (size <= 64)
    m = m.sharpen()
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: await m.toBuffer(), gravity: 'center' }])
    .png()
    .toBuffer()
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

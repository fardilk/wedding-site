import { createCanvas, loadImage } from 'canvas'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const W = 1200
const H = 630

const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')

// Background image (cover)
const img = await loadImage(join(publicDir, 'images', 'image-8.jpeg'))
const scale = Math.max(W / img.width, H / img.height)
const iw = img.width * scale
const ih = img.height * scale
ctx.drawImage(img, (W - iw) / 2, (H - ih) * 0.12, iw, ih) // shift down 25% — show upper-center

// Gradient overlay — right half darker for text contrast
const grad = ctx.createLinearGradient(W * 0.35, 0, W, 0)
grad.addColorStop(0, 'transparent')
grad.addColorStop(0.4, 'rgba(20,20,30,0.82)')
grad.addColorStop(1, 'rgba(20,20,30,0.95)')
ctx.fillStyle = grad
ctx.fillRect(0, 0, W, H)

// Subtle dark vignette overall
const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9)
vignette.addColorStop(0, 'transparent')
vignette.addColorStop(1, 'rgba(0,0,0,0.35)')
ctx.fillStyle = vignette
ctx.fillRect(0, 0, W, H)

ctx.textAlign = 'right'
const rightX = W - 64

// WALIMATUL URSY label
ctx.fillStyle = 'rgba(255,255,255,0.45)'
ctx.font = '500 22px sans-serif'
ctx.fillText('W A L I M A T U L   U R S Y', rightX, H * 0.32)

// Divider line
ctx.strokeStyle = 'rgba(255,255,255,0.2)'
ctx.lineWidth = 1
ctx.beginPath()
ctx.moveTo(rightX - 320, H * 0.37)
ctx.lineTo(rightX, H * 0.37)
ctx.stroke()

// Names — using system serif fallback (Great Vibes not available in Node)
ctx.fillStyle = 'rgba(255,255,255,0.95)'
ctx.font = 'italic 900 96px Georgia, serif'
ctx.fillText('Iin & Bintang', rightX, H * 0.58)

// Date
ctx.fillStyle = 'rgba(255,255,255,0.5)'
ctx.font = '400 26px Georgia, serif'
ctx.fillText('Ahad  ·  22 Maret 2026  ·  Cilacap', rightX, H * 0.70)

// Domain watermark
ctx.textAlign = 'left'
ctx.fillStyle = 'rgba(255,255,255,0.25)'
ctx.font = '400 18px sans-serif'
ctx.fillText('wedding-iin-bintang.fardil.cloud', 40, H - 28)

const buffer = canvas.toBuffer('image/jpeg', 92)
writeFileSync(join(publicDir, 'og-image.jpg'), buffer)
console.log('✅ OG image generated: public/og-image.jpg')

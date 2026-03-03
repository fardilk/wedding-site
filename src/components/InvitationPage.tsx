import { Calendar, ChevronLeft, ChevronRight, Download, Heart, MapPin, Monitor, Music2, QrCode, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { GuestMessage } from '../lib/messages'

const FONTS = {
  script: { fontFamily: 'Great Vibes, cursive' },
  heading: { fontFamily: 'Cinzel, serif' },
  body: { fontFamily: 'Cormorant, serif' },
}

const NAV_ITEMS = [
  { label: 'Couple', href: '#couple', icon: (active: boolean) => <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} /> },
  { label: 'Acara',  href: '#acara',  icon: (_active: boolean) => <Calendar className="w-4 h-4" /> },
  { label: 'Kisah',  href: '#kisah',  icon: (active: boolean) => <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} /> },
  { label: 'Lokasi', href: '#acara',  icon: (active: boolean) => <MapPin className={`w-4 h-4 ${active ? 'fill-current' : ''}`} /> },
  { label: 'Galeri', href: '#galeri', icon: (_active: boolean) => <Music2 className="w-4 h-4" /> },
]

const LOVE_STORIES = [
  {
    image: '/images/image-1.jpeg',
    label: '01',
    title: 'Pertemuan Pertama',
    desc: 'Takdir mempertemukan kami di tempat kerja yang sama. Dari sekedar rekan, perlahan tumbuh rasa yang tak terduga.',
  },
  {
    image: '/images/image-2.jpeg',
    label: '02',
    title: 'Chemistry Tumbuh',
    desc: 'Obrolan kecil berubah jadi cerita panjang. Kami saling menemukan diri dalam tawa dan momen sederhana bersama.',
  },
  {
    image: '/images/image-3.jpeg',
    label: '03',
    title: 'Memulai Hidup Baru',
    desc: 'Setelah melewati banyak momen bersama, kami memutuskan untuk melangkah lebih jauh dengan membangun bahterah rumah tangga dan masa depan yang kami impikan berdua.',
  },
]

function LoveStoryCarousel() {
  const [active, setActive] = useState(0)
  const touchStartX = useRef<number | null>(null)

  function prev() { setActive(i => (i - 1 + LOVE_STORIES.length) % LOVE_STORIES.length) }
  function next() { setActive(i => (i + 1) % LOVE_STORIES.length) }

  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 40) next()
    else if (diff < -40) prev()
    touchStartX.current = null
  }

  const story = LOVE_STORIES[active]

  return (
    <div id="kisah" className="bg-white py-14 overflow-hidden">
      <p className="text-xs tracking-widest text-gray-500 uppercase text-center mb-8 px-12" style={FONTS.heading}>
        Kisah Cinta
      </p>

      {/* Card */}
      <div
        className="mx-auto px-6 select-none w-full"
        style={{ maxWidth: '420px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(139, 92, 246, 0.25)',
            boxShadow: '0 0 0 4px rgba(139,92,246,0.06), 0 12px 40px rgba(109,40,217,0.12)',
          }}
        >
          {/* ── Image block ── */}
          <div className="relative w-full bg-gray-100 overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
            <img
              key={story.image}
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />

            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: 'rgba(167,139,250,0.7)' }} />
            <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: 'rgba(167,139,250,0.7)' }} />
            <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: 'rgba(167,139,250,0.7)' }} />
            <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: 'rgba(167,139,250,0.7)' }} />

            {/* Label */}
            <span
              className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ ...FONTS.heading, background: 'rgba(109,40,217,0.55)', color: '#e9d5ff', backdropFilter: 'blur(4px)' }}
            >
              {story.label}
            </span>

            {/* Arrows over image */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(109,40,217,0.4)', backdropFilter: 'blur(4px)' }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(109,40,217,0.4)', backdropFilter: 'blur(4px)' }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* ── Text block ── */}
          <div
            className="px-6 py-5"
            style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #eff6ff 100%)' }}
          >
            <p className="text-2xl text-violet-900 mb-2" style={FONTS.script}>{story.title}</p>
            <p className="text-xs leading-relaxed" style={{ ...FONTS.body, color: '#4c1d95cc' }}>{story.desc}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {LOVE_STORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? '20px' : '8px',
              height: '8px',
              background: i === active ? '#7c3aed' : '#ddd6fe',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function InvitationPage() {
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const [angpaoOpen, setAngpaoOpen] = useState(false)
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [formName, setFormName] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [sending, setSending] = useState(false)

  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [rsvpAlready, setRsvpAlready] = useState(false)
  const [rsvpSending, setRsvpSending] = useState(false)
  const [rsvpNama, setRsvpNama] = useState('')
  const [rsvpTelp, setRsvpTelp] = useState('')
  const [rsvpAlamat, setRsvpAlamat] = useState('')
  const [clientIp, setClientIp] = useState<string | null>(null)

  async function openRsvp() {
    setRsvpDone(false)
    setRsvpAlready(false)
    setRsvpOpen(true)
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const { ip } = await res.json()
      setClientIp(ip)
      const { data } = await supabase.from('rsvp').select('id').eq('ip_address', ip).maybeSingle()
      if (data) setRsvpAlready(true)
    } catch {
      setClientIp(null)
    }
  }

  async function handleRsvp() {
    const nama = rsvpNama.trim()
    const nomor_telp = rsvpTelp.trim()
    const alamat = rsvpAlamat.trim()
    if (!nama || !nomor_telp || !alamat) return
    setRsvpSending(true)
    const { error } = await supabase.from('rsvp').insert({ nama, nomor_telp, alamat, ip_address: clientIp })
    if (!error) {
      setRsvpDone(true)
      setRsvpNama('')
      setRsvpTelp('')
      setRsvpAlamat('')
    }
    setRsvpSending(false)
  }

  useEffect(() => {
    supabase
      .from('guest_messages')
      .select('name, message')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setMessages(data) })
  }, [])

  async function handleKirim() {
    const name = formName.trim()
    const message = formMessage.trim()
    if (!name || !message) return
    setSending(true)
    const { error } = await supabase.from('guest_messages').insert({ name, message })
    if (!error) {
      setMessages(prev => [{ name, message }, ...prev])
      setFormName('')
      setFormMessage('')
    }
    setSending(false)
  }

  const [igOpen, setIgOpen] = useState(false)
  const [capturing, setCapturing] = useState(false)

  async function handleCapture() {
    setCapturing(true)
    await document.fonts.ready

    const W = 1080
    const H = 1920
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    // Draw background image (cover)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = '/images/couple-hero.jpeg' })
    const scale = Math.max(W / img.width, H / img.height)
    const iw = img.width * scale
    const ih = img.height * scale
    ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2, iw, ih)

    // Gradient overlay
    const grad = ctx.createLinearGradient(0, H * 0.32, 0, H)
    grad.addColorStop(0, 'transparent')
    grad.addColorStop(0.35, 'rgba(42,42,42,0.97)')
    grad.addColorStop(1, 'rgba(42,42,42,1)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    ctx.textAlign = 'center'

    // WALIMATUL URSY
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '44px Cinzel, serif'
    ctx.letterSpacing = '8px'
    ctx.fillText('WALIMATUL URSY', W / 2, H * 0.57)

    // Iin
    ctx.fillStyle = 'rgba(255,255,255,1)'
    ctx.font = '230px "Great Vibes", cursive'
    ctx.letterSpacing = '0px'
    ctx.fillText('Iin', W / 2, H * 0.715)

    // &
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.font = '120px "Great Vibes", cursive'
    ctx.fillText('&', W / 2, H * 0.775)

    // Bintang
    ctx.fillStyle = 'rgba(255,255,255,1)'
    ctx.font = '230px "Great Vibes", cursive'
    ctx.fillText('Bintang', W / 2, H * 0.875)

    // Date
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.font = '42px Cormorant, serif'
    ctx.letterSpacing = '4px'
    ctx.fillText('Ahad  ·  22  ·  Maret  ·  2026', W / 2, H * 0.93)

    const link = document.createElement('a')
    link.download = 'undangan-iin-bintang.jpg'
    link.href = canvas.toDataURL('image/jpeg', 0.95)
    link.click()
    setCapturing(false)
  }

  return (
    <div className="w-full min-h-screen bg-gray-300 flex justify-center items-start relative pt-0">
      {/* Canvas */}
      <div
        className="w-full md:w-3/5 flex flex-col relative invitation-canvas"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.05)',
        }}
      >

        {/* ─── 1. HERO SECTION ─── */}
        <div className="relative w-full h-screen">
          <div
            className="absolute inset-0 hero-bg"
            style={{
              backgroundImage: 'url(/images/couple-hero.jpeg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Grey gradient overlay bottom to top */}
          <div
            className="absolute left-0 right-0 flex flex-col items-center justify-end pb-10"
            style={{
              top: '35%',
              bottom: '0',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(55,55,55,1) 40%)',
            }}
          >
            <p className="text-xs tracking-widest text-white/70 uppercase mb-6" style={FONTS.heading}>
              Undangan Pernikahan
            </p>
            <h1 className="text-6xl text-white mb-2" style={FONTS.script}>Iin</h1>
            <span className="text-3xl text-white/60 my-2" style={FONTS.script}>&</span>
            <h1 className="text-6xl text-white mb-6" style={FONTS.script}>Bintang</h1>
            <p className="text-sm text-white/70 tracking-wider" style={FONTS.body}>
              Ahad · 22 · Maret · 2026
            </p>
          </div>
        </div>

        {/* ─── 2. NAV ICONS BAR ─── (white) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white py-4 px-8 flex justify-center gap-8 border-t border-gray-100 md:bottom-auto md:top-0 md:border-t-0 md:border-b">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const active = activeNav === label
            return (
              <a
                key={label}
                href={href}
                onClick={() => setActiveNav(label)}
                className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-500' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {icon(active)}
                <span className="text-[10px]" style={FONTS.heading}>{label}</span>
              </a>
            )
          })}
        </div>

        {/* ─── 4. OPENING QUOTE ─── (dark) */}
        <div className="bg-neutral-800 py-14 px-12 flex flex-col items-center text-center">
          <span className="text-5xl text-white/30 mb-4" style={FONTS.script}>"</span>
          <p className="text-white/80 text-base leading-relaxed max-w-sm" style={FONTS.body}>
            Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri,
            supaya kamu cenderung dan merasa tenteram kepadanya.
          </p>
          <p className="text-white/40 text-xs mt-4 tracking-widest uppercase" style={FONTS.heading}>
            Ar-Rum: 21
          </p>
        </div>

        {/* ─── 5. BRIDE & GROOM ─── (white) */}
        <div id="couple" className="bg-white py-14 px-12">
          <p className="text-xs tracking-widest text-gray-500 uppercase text-center mb-10" style={FONTS.heading}>
            Mempertemukan Putri dan Putra Kami
          </p>
          {/* Bride */}
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shrink-0">
              <img src="/images/iin.jpeg" alt="Bride" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-2xl text-gray-900 mb-1" style={FONTS.script}>Iin Sumiati</p>
              <p className="text-xs text-gray-600 leading-relaxed" style={FONTS.body}>
                Putri dari Bapak Udin & Ibu Tarkiyah
              </p>
            </div>
          </div>

          <div className="text-center text-4xl text-gray-500 my-6" style={FONTS.script}>&</div>

          {/* Groom */}
          <div className="flex items-center gap-6 flex-row-reverse">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shrink-0">
              <img src="/images/bintang.jpeg" alt="Groom" className="w-full h-full object-cover" />
            </div>
            <div className="text-right">
              <p className="text-2xl text-gray-900 mb-1" style={FONTS.script}>Bintang Saepudin</p>
              <p className="text-xs text-gray-600 leading-relaxed" style={FONTS.body}>
                Putra dari Bapak Apud Saepudin & Ibu Asih
              </p>
            </div>
          </div>
        </div>

        {/* ─── 6. EVENTS ─── (dark) */}
        <div id="acara" className="bg-neutral-800 py-14 px-12 text-center">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-8" style={FONTS.heading}>Acara</p>

          {/* Akad Nikah */}
          <div className="mb-10">
            <h3 className="text-3xl text-white mb-3" style={FONTS.script}>Akad Nikah</h3>
            <p className="text-white/60 text-sm mb-1" style={FONTS.body}>Ahad, 22 Maret 2026</p>
            <p className="text-white/60 text-sm" style={FONTS.body}>08.00 – 10.00 WIB</p>
          </div>

          <div className="w-px h-10 bg-white/20 mx-auto mb-10" />

          {/* Resepsi */}
          <div className="mb-10">
            <h3 className="text-3xl text-white mb-3" style={FONTS.script}>Resepsi</h3>
            <p className="text-white/60 text-sm mb-1" style={FONTS.body}>Ahad, 22 Maret 2026</p>
            <p className="text-white/60 text-sm" style={FONTS.body}>11.00 – 15.00 WIB</p>
          </div>

          {/* Lokasi */}
          <p className="text-white/50 text-xs mb-6 leading-relaxed" style={FONTS.body}>
            Jl. Pemuda, Dusun Ciwalen RT 3/RW 1<br />
            Desa Ciwalen, Kec. Dayeuhluhur<br />
            Kab. Cilacap, Jawa Tengah
          </p>
          <div className="flex justify-center gap-3">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 transition-all" style={FONTS.heading}>
              <Calendar className="w-3 h-3" /> Simpan Tanggal
            </button>
            <a
              href="https://maps.app.goo.gl/J8TFTrizCpcZyLef9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 transition-all"
              style={FONTS.heading}
            >
              <MapPin className="w-3 h-3" /> Google Maps
            </a>
          </div>

          <div className="w-px h-10 bg-white/20 mx-auto mb-10" />

          {/* Live Streaming */}
          <div>
            <h3 className="text-3xl text-white mb-3" style={FONTS.script}>Live Streaming</h3>
            <p className="text-white/60 text-sm mb-4" style={FONTS.body}>
              Bagi yang tidak bisa hadir, saksikan secara live melalui tautan berikut
            </p>
            <a
              href="https://www.tiktok.com/@iinnnst_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 transition-all mx-auto"
              style={FONTS.heading}
            >
              <Monitor className="w-3 h-3" /> Tonton Live
            </a>
          </div>
        </div>

        {/* ─── 7. LOVE STORY ─── (white) */}
        <LoveStoryCarousel />

        {/* ─── 8. GALLERY ─── (dark) */}
        <div id="galeri" className="bg-neutral-800 py-14 px-12">
          <p className="text-xs tracking-widest text-white/40 uppercase text-center mb-8" style={FONTS.heading}>Galeri</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { src: '/images/image-4.jpeg', shift: false },
              { src: '/images/image-5.jpeg', shift: false },
              { src: '/images/image-6.jpeg', shift: true  },
              { src: '/images/image-7.jpeg', shift: false },
              { src: '/images/image-8.jpeg', shift: true  },
              { src: '/images/image-9.jpeg', shift: true  },
            ].map(({ src, shift }, i) => (
              <div key={i} className="aspect-square bg-neutral-700 overflow-hidden">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  style={{ objectPosition: shift ? 'top' : 'center' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── 9. RSVP ─── (dark) */}
        <div className="bg-neutral-900 py-14 px-12 text-center">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-6" style={FONTS.heading}>Konfirmasi Kehadiran</p>
          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs mx-auto" style={FONTS.body}>
            Kehadiran Bapak/Ibu, Saudara/i adalah kehormatan bagi kami. Mohon konfirmasi kehadiran Anda.
          </p>
          <button
            onClick={openRsvp}
            className="bg-white text-neutral-900 px-8 py-3 rounded-full text-sm tracking-wider hover:bg-white/90 transition-all"
            style={FONTS.heading}
          >
            Konfirmasi Sekarang
          </button>
        </div>

        {/* RSVP Modal */}
        {rsvpOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setRsvpOpen(false)}
          >
            <div
              className="rounded-2xl p-6 mx-4 max-w-xs w-full shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #0f2744 0%, #1a3f6f 40%, #0d1f38 100%)',
                border: '1px solid rgba(100, 160, 220, 0.25)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {rsvpAlready ? (
                <div className="text-center py-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(100,160,220,0.15)', border: '1px solid rgba(100,160,220,0.3)' }}
                  >
                    <Heart className="w-6 h-6 fill-current" style={{ color: '#7eb8e8' }} />
                  </div>
                  <p className="text-xl mb-2" style={{ ...FONTS.script, color: '#e8f4ff' }}>Sudah Terdaftar</p>
                  <p className="text-xs leading-relaxed mb-5" style={{ ...FONTS.body, color: 'rgba(168,212,245,0.7)' }}>
                    Anda sudah pernah mengkonfirmasi kehadiran sebelumnya. Terima kasih!
                  </p>
                  <button
                    onClick={() => setRsvpOpen(false)}
                    className="px-6 py-2 rounded-full text-xs tracking-wider transition-all"
                    style={{ ...FONTS.heading, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(100,160,220,0.3)', color: '#a8d4f5' }}
                  >
                    Tutup
                  </button>
                </div>
              ) : !rsvpDone ? (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm tracking-widest uppercase" style={{ ...FONTS.heading, color: '#a8d4f5' }}>
                      Konfirmasi Kehadiran
                    </h3>
                    <button
                      onClick={() => setRsvpOpen(false)}
                      className="transition-colors"
                      style={{ color: 'rgba(168, 212, 245, 0.5)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#a8d4f5')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(168, 212, 245, 0.5)')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3 mb-5">
                    {[
                      { type: 'text', placeholder: 'Nama lengkap', value: rsvpNama, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRsvpNama(e.target.value) },
                      { type: 'tel',  placeholder: 'Nomor telepon', value: rsvpTelp, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRsvpTelp(e.target.value) },
                    ].map(field => (
                      <input
                        key={field.placeholder}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
                        style={{
                          ...FONTS.body,
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(100, 160, 220, 0.2)',
                          color: '#e8f4ff',
                        }}
                      />
                    ))}
                    <textarea
                      placeholder="Alamat"
                      rows={3}
                      value={rsvpAlamat}
                      onChange={e => setRsvpAlamat(e.target.value)}
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all resize-none"
                      style={{
                        ...FONTS.body,
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(100, 160, 220, 0.2)',
                        color: '#e8f4ff',
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleRsvp}
                    disabled={!rsvpNama.trim() || !rsvpTelp.trim() || !rsvpAlamat.trim() || rsvpSending}
                    className="w-full py-3 rounded-lg text-sm tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      ...FONTS.heading,
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #2e6b9e 100%)',
                      color: '#e8f4ff',
                      border: '1px solid rgba(100,160,220,0.3)',
                    }}
                  >
                    {rsvpSending ? 'Mengirim...' : 'Kirim Konfirmasi'}
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(100,160,220,0.15)', border: '1px solid rgba(100,160,220,0.3)' }}
                  >
                    <Heart className="w-6 h-6 fill-current" style={{ color: '#7eb8e8' }} />
                  </div>
                  <p className="text-xl mb-2" style={{ ...FONTS.script, color: '#e8f4ff' }}>Terima Kasih!</p>
                  <p className="text-xs leading-relaxed mb-5" style={{ ...FONTS.body, color: 'rgba(168,212,245,0.7)' }}>
                    Konfirmasi kehadiran Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
                  </p>
                  <button
                    onClick={() => setRsvpOpen(false)}
                    className="px-6 py-2 rounded-full text-xs tracking-wider transition-all"
                    style={{
                      ...FONTS.heading,
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(100,160,220,0.3)',
                      color: '#a8d4f5',
                    }}
                  >
                    Tutup
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── 10. UCAPAN & DOA ─── (white) */}
        <div className="bg-white py-14 px-12">
          <p className="text-xs tracking-widest text-gray-600 uppercase text-center mb-8" style={FONTS.heading}>
            Ucapan & Doa
          </p>

          <input
            type="text"
            placeholder="Nama kamu"
            value={formName}
            onChange={e => setFormName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-all mb-3"
            style={FONTS.body}
          />
          <textarea
            placeholder="Tulis ucapan & doa terbaik kamu..."
            rows={4}
            value={formMessage}
            onChange={e => setFormMessage(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-all resize-none mb-4"
            style={FONTS.body}
          />
          <button
            onClick={handleKirim}
            disabled={!formName.trim() || !formMessage.trim() || sending}
            className="w-full bg-neutral-800 text-white py-3 rounded-lg text-sm tracking-wider hover:bg-neutral-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={FONTS.heading}
          >
            {sending ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>

          <div className="mt-8 space-y-4">
            {messages.map((guest, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-1" style={FONTS.heading}>{guest.name}</p>
                <p className="text-sm text-gray-800" style={FONTS.body}>{guest.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 11. INSTAGRAM STORIES ─── (white) */}
        <div className="bg-gray-50 py-14 px-12 text-center border-t border-gray-100">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4" style={FONTS.heading}>Instagram Stories</p>
          <p className="text-sm text-gray-500 mb-6" style={FONTS.body}>
            Bagikan momen bahagia ini di Instagram Stories kamu!
          </p>
          <button
            onClick={() => setIgOpen(true)}
            className="w-full text-white rounded-xl p-6 flex items-center gap-4 justify-center transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
              <span className="text-pink-500 text-xs font-bold">IG</span>
            </div>
            <span className="font-semibold tracking-wide" style={FONTS.heading}>Template IG Story</span>
          </button>
        </div>

        {/* IG Story Modal */}
        {igOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIgOpen(false)}
          >
            <div className="flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>

              {/* Story card — 9:16 */}
              <div
                className="relative overflow-hidden"
                style={{ width: '270px', height: '480px', borderRadius: '16px' }}
              >
                {/* Background photo */}
                <img
                  src="/images/couple-hero.jpeg"
                  alt="couple"
                  className="absolute inset-0 w-full h-full object-cover"
                  crossOrigin="anonymous"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(45,45,45,0.97) 65%)' }}
                />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 px-4 text-center">
                  <p className="text-[9px] tracking-[0.25em] text-white/60 uppercase mb-3" style={FONTS.heading}>
                    Walimatul Ursy
                  </p>
                  <p className="text-5xl text-white leading-none mb-1" style={FONTS.script}>Iin</p>
                  <p className="text-2xl text-white/50 my-1" style={FONTS.script}>&</p>
                  <p className="text-5xl text-white leading-none mb-4" style={FONTS.script}>Bintang</p>
                  <p className="text-[10px] text-white/60 tracking-widest" style={FONTS.body}>
                    Ahad · 22 · Maret · 2026
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCapture}
                  disabled={capturing}
                  className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-white/90 transition-all disabled:opacity-50"
                  style={FONTS.heading}
                >
                  <Download className="w-3.5 h-3.5" />
                  {capturing ? 'Menyimpan...' : 'Simpan Gambar'}
                </button>
                <button
                  onClick={() => setIgOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ─── 12. FOOTER ─── (dark) */}
        <div className="bg-neutral-900 py-12 px-12 text-center">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-6" style={FONTS.heading}>
            Terima Kasih Atas Kunjungannya
          </p>
          <p className="text-2xl text-white mb-2" style={FONTS.script}>Iin & Bintang</p>
          <p className="text-white/40 text-xs tracking-widest mb-6" style={FONTS.heading}>22 · MARET · 2026</p>
          <div className="w-16 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-white/30 text-xs" style={FONTS.body}>
            Dibuat dengan ❤️ · Terima kasih telah hadir
          </p>
        </div>

      </div>

      {/* ─── ANGPAO HANGING BUTTON ─── */}
      <button
        onClick={() => setAngpaoOpen(true)}
        className="fixed right-0 top-1/2 z-40 flex items-center gap-2 text-white px-3 py-2 shadow-2xl transition-all duration-200 hover:brightness-110"
        style={{
          ...FONTS.heading,
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2e6b9e 50%, #1a2f4a 100%)',
          borderRadius: '8px 8px 0 0',
          transformOrigin: 'bottom right',
          transform: 'rotate(-90deg) translateX(100%)',
        }}
        title="Angpao Digital"
      >
        <QrCode className="w-4 h-4 shrink-0" />
        <span className="text-[11px] tracking-widest uppercase">Angpao</span>
      </button>

      {/* ─── ANGPAO MODAL ─── */}
      {angpaoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          style={{ background: 'rgba(10, 25, 47, 0.75)' }}
          onClick={() => setAngpaoOpen(false)}
        >
          <div
            className="rounded-2xl p-6 mx-4 max-w-xs w-full shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #0f2744 0%, #1a3f6f 40%, #0d1f38 100%)',
              border: '1px solid rgba(100, 160, 220, 0.25)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4" style={{ color: '#7eb8e8' }} />
                <h3 className="text-sm tracking-widest uppercase" style={{ ...FONTS.heading, color: '#a8d4f5' }}>
                  Angpao Digital
                </h3>
              </div>
              <button
                onClick={() => setAngpaoOpen(false)}
                className="transition-colors"
                style={{ color: 'rgba(168, 212, 245, 0.5)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a8d4f5')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(168, 212, 245, 0.5)')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Intro */}
            <p className="text-xs text-center leading-relaxed mb-5" style={{ ...FONTS.body, color: 'rgba(168, 212, 245, 0.7)' }}>
              Silakan transfer ke rekening berikut untuk memberi hadiah kepada pengantin
            </p>

            {/* Bank Info */}
            <div
              className="rounded-xl p-5 text-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(100, 160, 220, 0.2)',
              }}
            >
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ ...FONTS.heading, color: 'rgba(168, 212, 245, 0.5)' }}>
                Bank Central Asia
              </p>
              <p className="text-2xl font-bold tracking-widest my-3" style={{ ...FONTS.heading, color: '#e8f4ff' }}>
                2030699532
              </p>
              <div className="w-10 h-px mx-auto mb-3" style={{ background: 'rgba(100, 160, 220, 0.3)' }} />
              <p className="text-xs mb-1" style={{ ...FONTS.body, color: 'rgba(168, 212, 245, 0.5)' }}>atas nama</p>
              <p className="text-base" style={{ ...FONTS.body, color: '#c8e6ff' }}>Iin Sumiati</p>
            </div>

            {/* Footer */}
            <p className="text-xs text-center mt-4 leading-relaxed" style={{ ...FONTS.body, color: 'rgba(168, 212, 245, 0.45)' }}>
              Terima kasih atas partisipasinya
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

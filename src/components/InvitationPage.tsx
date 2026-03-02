import { Calendar, Heart, MapPin, Monitor, Music2 } from 'lucide-react'
import { useState } from 'react'

const FONTS = {
  script: { fontFamily: 'Great Vibes, cursive' },
  heading: { fontFamily: 'Cinzel, serif' },
  body: { fontFamily: 'Cormorant, serif' },
}

const NAV_ITEMS = [
  { label: 'Couple', href: '#couple', icon: (active: boolean) => <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} /> },
  { label: 'Acara',  href: '#acara',  icon: (active: boolean) => <Calendar className="w-4 h-4" /> },
  { label: 'Kisah',  href: '#kisah',  icon: (active: boolean) => <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} /> },
  { label: 'Galeri', href: '#galeri', icon: (active: boolean) => <Music2 className="w-4 h-4" /> },
  { label: 'Lokasi', href: '#acara',  icon: (active: boolean) => <MapPin className={`w-4 h-4 ${active ? 'fill-current' : ''}`} /> },
]

export default function InvitationPage() {
  const [activeNav, setActiveNav] = useState<string | null>(null)

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
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
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
            <p className="text-white/60 text-sm mb-4" style={FONTS.body}>08.00 – 10.00 WIB</p>
            
          </div>

          <div className="w-px h-10 bg-white/20 mx-auto mb-10" />

          {/* Resepsi */}
          <div className="mb-10">
            <h3 className="text-3xl text-white mb-3" style={FONTS.script}>Resepsi</h3>
            <p className="text-white/60 text-sm mb-1" style={FONTS.body}>Ahad, 22 Maret 2026</p>
            <p className="text-white/60 text-sm mb-4" style={FONTS.body}>11.00 – 15.00 WIB</p>
            <div className="flex justify-center gap-3">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 transition-all" style={FONTS.heading}>
                <MapPin className="w-3 h-3" /> Google Maps
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 transition-all" style={FONTS.heading}>
                <Calendar className="w-3 h-3" /> Simpan Tanggal
              </button>
            </div>
          </div>

          <div className="w-px h-10 bg-white/20 mx-auto mb-10" />

          {/* Live Streaming */}
          <div>
            <h3 className="text-3xl text-white mb-3" style={FONTS.script}>Live Streaming</h3>
            <p className="text-white/60 text-sm mb-4" style={FONTS.body}>
              Bagi yang tidak bisa hadir, saksikan secara live melalui tautan berikut
            </p>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 transition-all mx-auto" style={FONTS.heading}>
              <Monitor className="w-3 h-3" /> Tonton Live
            </button>
          </div>
        </div>

        {/* ─── 7. LOVE STORY ─── (white) */}
        <div id="kisah" className="bg-white py-14 px-12">
          <p className="text-xs tracking-widest text-gray-600 uppercase text-center mb-10" style={FONTS.heading}>
            Kisah Cinta
          </p>

          {[
            { title: 'Pertemuan Pertama', desc: 'Kami pertama kali bertemu di sebuah acara yang tidak kami duga akan mengubah hidup kami selamanya.' },
            { title: 'Jatuh Cinta', desc: 'Waktu demi waktu berlalu, perasaan itu tumbuh perlahan namun pasti, hingga kami sadar telah saling mencintai.' },
          ].map((story, i) => (
            <div key={i} className={`flex gap-5 mb-10 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-28 h-28 flex-shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                <img src="/images/couple-hero.jpeg" alt={story.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl text-gray-900 mb-2" style={FONTS.script}>{story.title}</p>
                <p className="text-xs text-gray-700 leading-relaxed" style={FONTS.body}>{story.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 8. GALLERY ─── (dark) */}
        <div id="galeri" className="bg-neutral-800 py-14 px-12">
          <p className="text-xs tracking-widest text-white/40 uppercase text-center mb-8" style={FONTS.heading}>Galeri</p>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-700 overflow-hidden">
                <img
                  src="/images/couple-hero.jpeg"
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── 9. RSVP ─── (dark) */}
        <div className="bg-neutral-900 py-14 px-12 text-center">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-6" style={FONTS.heading}>RSVP</p>

          <div className="mb-6">
            <p className="text-white/70 text-sm mb-4" style={FONTS.body}>
              Kode undangan kamu:
            </p>
            <div className="bg-white/10 rounded-lg px-6 py-3 inline-block border border-white/20">
              <span className="text-white text-lg tracking-widest" style={FONTS.heading}>—</span>
            </div>
          </div>

          <p className="text-white/50 text-xs leading-relaxed mb-8 max-w-xs mx-auto" style={FONTS.body}>
            Mohon konfirmasi kehadiran kamu dengan memasukkan kode di atas untuk mendaftar tamu.
          </p>

          <input
            type="text"
            placeholder="Masukkan kode undangan"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm text-center outline-none focus:border-white/50 transition-all mb-4"
            style={FONTS.body}
          />
          <button
            className="w-full bg-white text-neutral-900 py-3 rounded-lg text-sm font-semibold tracking-wider hover:bg-white/90 transition-all"
            style={FONTS.heading}
          >
            Daftar Sekarang
          </button>
        </div>

        {/* ─── 10. UCAPAN & DOA ─── (white) */}
        <div className="bg-white py-14 px-12">
          <p className="text-xs tracking-widest text-gray-600 uppercase text-center mb-8" style={FONTS.heading}>
            Ucapan & Doa
          </p>

          <textarea
            placeholder="Tulis ucapan & doa terbaik kamu..."
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-all resize-none mb-4"
            style={FONTS.body}
          />
          <button
            className="w-full bg-neutral-800 text-white py-3 rounded-lg text-sm tracking-wider hover:bg-neutral-700 transition-all"
            style={FONTS.heading}
          >
            Kirim Ucapan
          </button>

          {/* Placeholder messages */}
          <div className="mt-8 space-y-4">
            {['Selamat & bahagia selalu!', 'Semoga menjadi keluarga sakinah mawaddah warahmah.'].map((msg, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-1" style={FONTS.heading}>Tamu {i + 1}</p>
                <p className="text-sm text-gray-800" style={FONTS.body}>{msg}</p>
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
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 flex items-center gap-4 justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-pink-500 text-xs font-bold">IG</span>
            </div>
            <span className="font-semibold tracking-wide" style={FONTS.heading}>Template IG Story</span>
          </div>
        </div>

        {/* ─── 12. FOOTER ─── (dark) */}
        <div className="bg-neutral-900 py-12 px-12 text-center">
          <div className="mb-6">
            <img src="/images/couple-hero.jpeg" alt="Footer" className="w-full h-40 object-cover object-top opacity-40" />
          </div>
          <p className="text-2xl text-white mb-2" style={FONTS.script}>Iin & Bintang</p>
          <p className="text-white/40 text-xs tracking-widest mb-6" style={FONTS.heading}>22 · MARET · 2026</p>
          <div className="w-16 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-white/30 text-xs" style={FONTS.body}>
            Dibuat dengan ❤️ · Terima kasih telah hadir
          </p>
        </div>

      </div>
    </div>
  )
}

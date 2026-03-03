import { Mail } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface InvitationCoverProps {
  playOnHover: () => Promise<void>
}

export default function InvitationCover({ playOnHover }: InvitationCoverProps) {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const handleOpenClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      navigate('/invitation')
    }, 600)
  }

  const guestName = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('to') || ''
  }, [])

  useEffect(() => {
    const calculateCountdown = () => {
      const weddingDate = new Date('2026-03-22').getTime()
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      onMouseEnter={playOnHover}
      style={{
        height: '100dvh',
        animation: isExiting ? 'easeOutDissolve 0.6s ease-out forwards' : 'none',
      }}
    >
      <style>{`
        @keyframes easeOutDissolve {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/couple-bg.jpg)',
          backgroundSize: 'cover',
          filter: 'grayscale(60%) brightness(0.55)',
        }}
      />

      {/* Metallic blue gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(10,25,60,0.55) 0%, rgba(15,39,100,0.70) 40%, rgba(8,18,45,0.88) 100%)',
        }}
      />

      {/* Blue shimmer top */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(56,120,220,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full">

        {/* Top label */}
        <p
          className="text-[11px] tracking-[0.35em] uppercase mb-8"
          style={{ fontFamily: 'Cinzel, serif', color: 'rgba(168,212,245,0.6)' }}
        >
          Undangan Pernikahan
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-8 w-40">
          <div className="flex-1 h-px" style={{ background: 'rgba(100,160,220,0.35)' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(168,212,245,0.5)' }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(100,160,220,0.35)' }} />
        </div>

        {/* Names */}
        <div className="mb-2">
          <div className="text-7xl md:text-8xl text-white" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Iin
          </div>
          <div className="text-2xl my-1" style={{ fontFamily: 'Great Vibes, cursive', color: 'rgba(168,212,245,0.5)' }}>
            &
          </div>
          <div className="text-7xl md:text-8xl text-white" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Bintang
          </div>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-3 my-8 w-40">
          <div className="flex-1 h-px" style={{ background: 'rgba(100,160,220,0.35)' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(168,212,245,0.5)' }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(100,160,220,0.35)' }} />
        </div>

        {/* Date */}
        <p
          className="text-base tracking-widest mb-8"
          style={{ fontFamily: 'Cormorant, serif', color: 'rgba(168,212,245,0.7)' }}
        >
          Ahad · 22 · Maret · 2026
        </p>

        {/* Guest name */}
        {guestName && (
          <div
            className="mb-8 px-5 py-2 rounded-full text-sm"
            style={{
              fontFamily: 'Cormorant, serif',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(100,160,220,0.2)',
              color: 'rgba(168,212,245,0.8)',
            }}
          >
            Kepada: <span style={{ color: '#e8f4ff' }}>{guestName}</span>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleOpenClick}
          className="flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-300 hover:brightness-110"
          style={{
            fontFamily: 'Cinzel, serif',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2e6b9e 100%)',
            border: '1px solid rgba(100,160,220,0.4)',
            boxShadow: '0 4px 24px rgba(30,90,180,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            color: '#e8f4ff',
            fontSize: '12px',
            letterSpacing: '0.15em',
          }}
        >
          <Mail className="w-4 h-4" />
          <span>Buka Undangan</span>
        </button>

        {/* Countdown */}
        <div className="mt-10 text-center">
          <p
            className="text-xs tracking-widest uppercase mb-5"
            style={{ fontFamily: 'Cinzel, serif', color: 'rgba(168,212,245,0.4)' }}
          >
            Menghitung Hari Spesial
          </p>
          <div className="flex gap-6 justify-center">
            {[
              { value: countdown.days, label: 'Hari' },
              { value: String(countdown.hours).padStart(2, '0'), label: 'Jam' },
              { value: String(countdown.minutes).padStart(2, '0'), label: 'Menit' },
              { value: String(countdown.seconds).padStart(2, '0'), label: 'Detik' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-semibold mb-2"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(100,160,220,0.2)',
                    color: '#e8f4ff',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  {value}
                </div>
                <span
                  className="text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: 'Cinzel, serif', color: 'rgba(168,212,245,0.4)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

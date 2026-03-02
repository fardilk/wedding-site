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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={playOnHover}
      style={{
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
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-gray-800"
        style={{
          backgroundImage: 'url(/images/couple-bg.jpg)',
          backgroundSize: '30% auto',
          filter: 'grayscale(100%)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>


      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">
        {/* Header Label */}
        <div className="mb-12">
          <p
            className="text-white/90 text-xl font-semibold tracking-widest uppercase"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Undangan Pernikahan
          </p>
        </div>

        {/* Names Section */}
        <div className="mb-12">
          <div
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Iin
          </div>
          <div className="text-white/70 text-2xl mb-4">&</div>
          <div
            className="text-6xl md:text-7xl font-bold text-white"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Bintang
          </div>
        </div>

        {/* Date Display */}
        <div className="mb-12">
          <div className="text-white text-2xl md:text-3xl font-light tracking-wider">
            22 <span className="mx-3">·</span> Maret <span className="mx-3">·</span> 2026
          </div>
        </div>

        {/* Recipient Label */}
        {guestName && (
          <div className="mb-12">
            <p className="text-white/80 text-lg">
              Kepada: <span className="font-semibold text-white">{guestName}</span>
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleOpenClick}
          className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50"
        >
          <Mail className="w-5 h-5" />
          <span className="font-medium">Buka Undangan</span>
        </button>

        {/* Countdown Timer */}
        <div
          className="mt-12 text-white/80 text-center"
          style={{ fontFamily: 'Cormorant, serif' }}
        >
          <p className="text-lg font-light mb-6">Menghitung Hari Spesial</p>
          <div className="flex gap-8 justify-center text-sm md:text-base">
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">
                {countdown.days}
              </div>
              <div className="text-white/70 text-xs md:text-sm mt-2">Hari</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">
                {String(countdown.hours).padStart(2, '0')}
              </div>
              <div className="text-white/70 text-xs md:text-sm mt-2">Jam</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">
                {String(countdown.minutes).padStart(2, '0')}
              </div>
              <div className="text-white/70 text-xs md:text-sm mt-2">Menit</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">
                {String(countdown.seconds).padStart(2, '0')}
              </div>
              <div className="text-white/70 text-xs md:text-sm mt-2">Detik</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'

interface UseBackgroundMusicProps {
  src: string
  volume?: number
}

export function useBackgroundMusic({
  src,
  volume = 0.3,
}: UseBackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      const audio = document.createElement('audio')
      audio.src = src
      audio.loop = true
      audio.volume = volume
      audio.preload = 'auto'
      document.body.appendChild(audio)
      audioRef.current = audio
    }

    // Cleanup: remove audio element when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        document.body.removeChild(audioRef.current)
        audioRef.current = null
      }
    }
  }, [src, volume])

  const playOnHover = async () => {
    if (!audioRef.current) return

    try {
      await audioRef.current.play()
    } catch (error) {
      console.error('Audio playback failed:', error)
    }
  }

  return { playOnHover }
}

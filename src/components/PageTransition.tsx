import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      style={{
        animation: isVisible
          ? 'dissolveIn 0.8s ease-in-out forwards'
          : 'dissolveOut 0.8s ease-in-out forwards',
      }}
    >
      <style>{`
        @keyframes dissolveIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes dissolveOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      {children}
    </div>
  )
}

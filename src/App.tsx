import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InvitationCover from './components/InvitationCover'
import InvitationPage from './components/InvitationPage'
import PageTransition from './components/PageTransition'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'

export default function App() {
  const { playOnHover } = useBackgroundMusic({
    src: '/audio/romantic-background.mp3',
    volume: 0.3,
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <InvitationCover playOnHover={playOnHover} />
            </PageTransition>
          }
        />
        <Route
          path="/invitation"
          element={
            <PageTransition>
              <InvitationPage />
            </PageTransition>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

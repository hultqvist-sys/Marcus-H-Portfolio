import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      {!isLoading && <HomePage />}
    </>
  )
}

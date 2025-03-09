import DessertsSection from './components/desserts-section/desserts-section'
import './App.css'
import { useRecipes } from './hooks/useRecipes'

function App() {
  const { loading, desserts, error } = useRecipes()
  return (
    <main>
      <DessertsSection></DessertsSection>
    </main>
  )
}

export default App

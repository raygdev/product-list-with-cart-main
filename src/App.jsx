import DessertsSection from './components/desserts-section/desserts-section'
import ShoppingCart from './components/cart/shopping-cart'
import ShoppingCartProvider from './context/cart-provider'
import './App.css'

function App() {
  return (
    <main>
      <ShoppingCartProvider>
        <DessertsSection />
        <ShoppingCart/>
      </ShoppingCartProvider>
    </main>
  )
}

export default App

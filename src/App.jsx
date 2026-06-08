import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import Catalog from './pages/Catalog'
import CartSheet from './components/CartSheet'
import AdminSheet from './components/AdminSheet'
import styles from './App.module.css'

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const { cartCount } = useApp()

  return (
    <div className="app-wrapper">
      <Header onCartOpen={() => setCartOpen(true)} onAdminOpen={() => setAdminOpen(true)} />
      <Catalog />

      {/* Floating cart button */}
      {cartCount > 0 && (
        <button className={styles.floatCart} onClick={() => setCartOpen(true)}>
          🛒 Ver pedido · {cartCount} {cartCount === 1 ? 'item' : 'items'}
        </button>
      )}

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
      <AdminSheet open={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

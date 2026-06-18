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
      <Header
        onCartOpen={() => setCartOpen(true)}
        onAdminOpen={() => setAdminOpen(true)}
      />
      <Catalog />

     {/* Botón flotante WhatsApp */}
{cartCount > 0 && !cartOpen && (
  <button
    className={styles.floatCart}
    onClick={() => setCartOpen(true)}
    aria-label="Ver carrito"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L.057 23.25a.75.75 0 00.918.919l5.453-1.47A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.74-.524-5.29-1.436l-.38-.225-3.236.872.885-3.157-.247-.395A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
    Ver pedido · {cartCount} {cartCount === 1 ? 'item' : 'items'}
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
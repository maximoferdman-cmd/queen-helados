import { useState } from 'react'
import { useApp } from '../context/AppContext'
import styles from './CartSheet.module.css'

export default function CartSheet({ open, onClose }) {
  const { cart, cartTotal, hasPrice, config, removeFromCart, clearCart, buildWhatsAppUrl } = useApp()
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')

  if (!open) return null

function handleSend() {
  if (cart.length === 0) return alert('Tu pedido está vacío')
  const url = buildWhatsAppUrl(clientName, clientAddress)
  window.open(url, '_blank')
  clearCart()
  setClientName('')
  setClientAddress('')   // ← tiene que estar ADENTRO, con el mismo sangrado
  onClose()
}
  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>

        <h2 className={styles.title}>Tu Pedido 🛒</h2>
        <p className={styles.sub}>Revisá antes de enviar</p>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <span>🛒</span>
            <p>Tu pedido está vacío</p>
            <small>Sumá productos del catálogo</small>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map(item => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemEmoji}>{item.emoji}</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemSub}>Cantidad: {item.qty}</p>
                  </div>
                  {item.showPrice && (
                    <p className={styles.itemPrice}>${(item.price * item.qty).toLocaleString('es-AR')}</p>
                  )}
                  <button className={styles.delBtn} onClick={() => removeFromCart(item.id)} aria-label="Eliminar">🗑</button>
                </div>
              ))}
            </div>

            {hasPrice && config.showTotals && (
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total estimado</span>
                <span className={styles.totalVal}>${cartTotal.toLocaleString('es-AR')}</span>
              </div>
            )}
          </>
        )}

        <div className={styles.field}>
  <label className={styles.fieldLabel}>Tu dirección (para confirmar cobertura)</label>
  <input
    className={styles.fieldInput}
    type="text"
    placeholder="Ej: Rivadavia 1234, Bernal"
    value={clientAddress}
    onChange={e => setClientAddress(e.target.value)}
  />
</div>

        <button className={styles.waBtn} onClick={handleSend}>
          <span>💬</span> Enviar por WhatsApp
        </button>

        {cart.length > 0 && (
          <button className={styles.clearBtn} onClick={clearCart}>Vaciar pedido</button>
        )}
      </div>
    </div>
  )
}

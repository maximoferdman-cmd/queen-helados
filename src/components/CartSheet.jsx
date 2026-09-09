import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import styles from './CartSheet.module.css'

export default function CartSheet({ open, onClose }) {
  useLockBodyScroll(open)
  const { cart, cartTotal, hasPrice, config, removeFromCart, clearCart, buildWhatsAppUrl, getItemQty, setItemQty, effectiveUnitPrice } = useApp()
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [justSent, setJustSent] = useState(false)

  if (!open) return null

  function handleSend() {
    if (cart.length === 0) return alert('Tu pedido está vacío')
    const url = buildWhatsAppUrl(clientName, clientAddress)
    window.open(url, '_blank')
    // No vaciamos el carrito acá: si algo falla al abrir WhatsApp
    // (o el cliente se arrepiente / quiere agregar algo más), el pedido
    // no debe perderse. Se vacía solo cuando el cliente confirma que
    // ya lo mandó, con el botón de abajo.
    setJustSent(true)
  }

  function handleConfirmedClear() {
    clearCart()
    setClientName('')
    setClientAddress('')
    setJustSent(false)
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
              {cart.map(item => {
                const isFixedQty = item.isPromo || item.isBucket || item.giosGroup === 'gio' || item.isSweetCreamItem
                const qty = isFixedQty ? item.qty : getItemQty(item.id)
                const unitPrice = effectiveUnitPrice(item)
                return (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemEmoji}>{item.emoji}</div>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      {isFixedQty ? (
                        <p className={styles.itemSub}>Cantidad: {item.qty}</p>
                      ) : (
                        <div className={styles.itemQtyRow}>
                          <button className={styles.itemQtyBtn} onClick={() => setItemQty(item.id, Math.max(0, qty - 1))} aria-label="Quitar uno">−</button>
                          <span className={styles.itemQtyNum}>{qty}</span>
                          <button className={styles.itemQtyBtn} onClick={() => setItemQty(item.id, qty + 1)} aria-label="Agregar uno">+</button>
                        </div>
                      )}
                    </div>
                    {item.showPrice && (
                      <p className={styles.itemPrice}>${(unitPrice * item.qty).toLocaleString('es-AR')}</p>
                    )}
                    <button className={styles.delBtn} onClick={() => removeFromCart(item.id)} aria-label="Eliminar">🗑</button>
                  </div>
                )
              })}
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
          <label className={styles.fieldLabel}>Tu nombre</label>
          <input
            className={styles.fieldInput}
            type="text"
            placeholder="Ej: María González"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
          />
        </div>

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

        {!justSent ? (
          <button className={styles.waBtn} onClick={handleSend}>
            <span>💬</span> Enviar por WhatsApp
          </button>
        ) : (
          <>
            <div className={styles.sentNotice}>
              ✅ Se abrió WhatsApp con tu pedido. Confirmá el envío ahí.
            </div>
            <button className={styles.waBtn} onClick={handleSend}>
              <span>💬</span> Volver a abrir WhatsApp
            </button>
            <button className={styles.confirmClearBtn} onClick={handleConfirmedClear}>
              Ya lo envié, vaciar pedido ✓
            </button>
          </>
        )}

        {cart.length > 0 && !justSent && (
          <button className={styles.clearBtn} onClick={clearCart}>Vaciar pedido</button>
        )}
      </div>
    </div>
  )
}
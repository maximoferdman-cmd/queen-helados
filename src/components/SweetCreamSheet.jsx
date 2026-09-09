import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { SWEET_CREAM_FLAVORS, SWEET_CREAM_PRICE } from '../data/sweetcream'
import styles from './PromoSheet.module.css'

export default function SweetCreamSheet({ onClose }) {
  useLockBodyScroll()
  const { getSweetCreamFlavorQty, setSweetCreamFlavorQty } = useApp()
  const [flavor, setFlavor] = useState(null)
  const [qty, setQty] = useState(1)

  function handleSelectFlavor(f) {
    setFlavor(f)
    // Si ya había cajas de este sabor en el carrito, arranca desde ahí
    const existing = getSweetCreamFlavorQty(f)
    setQty(existing > 0 ? existing : 1)
  }

  function handleConfirm() {
    setSweetCreamFlavorQty(flavor, qty)
    onClose()
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          {flavor && (
            <button className={styles.back} onClick={() => setFlavor(null)}>‹</button>
          )}
          <h2 className={styles.title}>
            {flavor ? `Sweet Cream ${flavor}` : '🧊 Sweet Cream — Elegí el sabor'}
          </h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {!flavor && (
          <div className={styles.variantOptionsCompact} style={{ padding: '0 20px 20px' }}>
            {SWEET_CREAM_FLAVORS.map(f => (
              <button key={f} className={styles.variantBtnCompact} onClick={() => handleSelectFlavor(f)}>
                {f}
              </button>
            ))}
          </div>
        )}

        {flavor && (
          <div className={styles.config}>
            <p style={{ fontSize: 13, color: 'var(--text2)' }}>
              Caja x40 unidades, todas de {flavor}. ${SWEET_CREAM_PRICE.toLocaleString('es-AR')} la caja.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <button className={styles.variantBtnCompact} style={{ width: 44, height: 44, fontSize: 20 }} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span style={{ fontSize: 20, fontWeight: 700, minWidth: 30, textAlign: 'center' }}>{qty}</span>
              <button className={styles.variantBtnCompact} style={{ width: 44, height: 44, fontSize: 20 }} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>
              {qty} {qty === 1 ? 'caja' : 'cajas'} · {qty * 40} unidades
            </p>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalPrice}>${(qty * SWEET_CREAM_PRICE).toLocaleString('es-AR')}</span>
              </div>
              <button className={styles.addBtn} onClick={handleConfirm}>
                🛒 Agregar al pedido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  )
}

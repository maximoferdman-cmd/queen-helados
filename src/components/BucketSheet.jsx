import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import styles from './PromoSheet.module.css'

// group: { id, label, price, flavors: [...] }
export default function BucketSheet({ group, onClose }) {
  useLockBodyScroll()
  const { addBucketToCart } = useApp()
  const [flavor, setFlavor] = useState(null)
  const sheetRef = useRef(null)

  function handleAddToCart() {
    addBucketToCart(group, flavor)
    onClose()
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} ref={sheetRef} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          <h2 className={styles.title}>🪣 Balde 10L {group.label}</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={styles.config}>
          <div className={styles.variantGroup}>
            <p className={styles.sectionLabel}>Elegí tu sabor</p>
            <div className={styles.variantOptionsCompact}>
              {group.flavors.map(f => (
                <button
                  key={f}
                  className={`${styles.variantBtnCompact} ${flavor === f ? styles.variantSelected : ''}`}
                  onClick={() => setFlavor(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>${group.price.toLocaleString('es-AR')}</span>
            </div>
            <button
              className={styles.addBtn}
              disabled={!flavor}
              onClick={handleAddToCart}
            >
              {flavor ? '🛒 Agregar al pedido' : 'Elegí un sabor'}
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  )
}

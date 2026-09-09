import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { GIO_FLAVORS, GIO_PISTACHO_FLAVOR, GIO_RETAIL_PRICE, GIO_WHOLESALE_PRICE, GIO_WHOLESALE_MIN, GIO_PISTACHO_PRICE } from '../data/gio'
import styles from './GioSheet.module.css'

export default function GioSheet({ onClose }) {
  useLockBodyScroll()
  const { cart, getGioFlavorQty, setGioFlavorQty } = useApp()

  const totalEligible = cart
    .filter(c => c.giosGroup === 'gio' && c.giosPromoEligible)
    .reduce((s, c) => s + c.qty, 0)
  const wholesaleActive = totalEligible >= GIO_WHOLESALE_MIN
  const unitPriceNow = wholesaleActive ? GIO_WHOLESALE_PRICE : GIO_RETAIL_PRICE
  const missing = Math.max(0, GIO_WHOLESALE_MIN - totalEligible)

  const pistachoQty = getGioFlavorQty(GIO_PISTACHO_FLAVOR)

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          <h2 className={styles.title}>🍫 GIO — Elegí tus sabores</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={wholesaleActive ? styles.noticeActive : styles.notice}>
          {wholesaleActive
            ? `🎉 Llegaste a ${totalEligible} unidades: $${GIO_WHOLESALE_PRICE.toLocaleString('es-AR')} c/u aplicado a todos los sabores (menos Pistachos)`
            : `Llevando 6 o más entre todos los sabores (menos Pistachos), el precio baja a $${GIO_WHOLESALE_PRICE.toLocaleString('es-AR')} c/u. Llevás ${totalEligible}/${GIO_WHOLESALE_MIN}${missing > 0 ? ` — te faltan ${missing}` : ''}.`}
        </div>

        <div className={styles.list}>
          {GIO_FLAVORS.map(flavor => {
            const qty = getGioFlavorQty(flavor)
            return (
              <div key={flavor} className={styles.row}>
                <div className={styles.rowInfo}>
                  <p className={styles.flavorName}>{flavor}</p>
                  <p className={styles.flavorPrice}>${unitPriceNow.toLocaleString('es-AR')} c/u</p>
                </div>
                <div className={styles.qtyRow}>
                  <button className={styles.qtyBtn} onClick={() => setGioFlavorQty(flavor, Math.max(0, qty - 1), false)} aria-label="Quitar">−</button>
                  <span className={styles.qtyNum}>{qty}</span>
                  <button className={styles.qtyBtn} onClick={() => setGioFlavorQty(flavor, qty + 1, false)} aria-label="Agregar">+</button>
                </div>
              </div>
            )
          })}

          <div className={styles.pistachoRow}>
            <div className={styles.rowInfo}>
              <p className={styles.flavorName}>{GIO_PISTACHO_FLAVOR}</p>
              <p className={styles.pistachoNote}>No acumula para la promo — ${GIO_PISTACHO_PRICE.toLocaleString('es-AR')} c/u siempre</p>
            </div>
            <div className={styles.qtyRow}>
              <button className={styles.qtyBtn} onClick={() => setGioFlavorQty(GIO_PISTACHO_FLAVOR, Math.max(0, pistachoQty - 1), true)} aria-label="Quitar">−</button>
              <span className={styles.qtyNum}>{pistachoQty}</span>
              <button className={styles.qtyBtn} onClick={() => setGioFlavorQty(GIO_PISTACHO_FLAVOR, pistachoQty + 1, true)} aria-label="Agregar">+</button>
            </div>
          </div>
        </div>

        <button className={styles.doneBtn} onClick={onClose}>Listo ✓</button>
      </div>
    </div>,
    document.body
  )
}

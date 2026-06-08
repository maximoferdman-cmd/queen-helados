import { useApp } from '../context/AppContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { getItemQty, setItemQty } = useApp()
  const qty = getItemQty(product.id)

  const inc = () => setItemQty(product.id, qty + 1)
  const dec = () => setItemQty(product.id, Math.max(0, qty - 1))

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        {product.image
          ? <img src={product.image} alt={product.name} className={styles.img} />
          : <span className={styles.emoji}>{product.emoji || '📦'}</span>
        }
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        {product.desc && <p className={styles.desc}>{product.desc}</p>}
        {product.showPrice && (
          <p className={styles.price}>${product.price.toLocaleString('es-AR')}</p>
        )}
        <div className={styles.qtyRow}>
          <button className={styles.qtyBtn} onClick={dec} aria-label="Quitar">−</button>
          <span className={styles.qtyNum}>{qty}</span>
          <button className={styles.qtyBtn} onClick={inc} aria-label="Agregar">+</button>
          {qty === 0
            ? <button className={styles.addBtn} onClick={inc}>Agregar</button>
            : <button className={`${styles.addBtn} ${styles.added}`} onClick={() => {}}>✓ Listo</button>
          }
        </div>
      </div>
    </div>
  )
}

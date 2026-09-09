import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { bucketGroups } from '../data/buckets'
import { GIO_WHOLESALE_PRICE } from '../data/gio'
import { SWEET_CREAM_PRICE } from '../data/sweetcream'
import BucketSheet from './BucketSheet'
import GioSheet from './GioSheet'
import SweetCreamSheet from './SweetCreamSheet'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { getItemQty, setItemQty } = useApp()
  const [bucketOpen, setBucketOpen] = useState(false)
  const [gioOpen, setGioOpen] = useState(false)
  const [sweetCreamOpen, setSweetCreamOpen] = useState(false)
  const qty = getItemQty(product.id)

  const inc = () => setItemQty(product.id, qty + 1)
  const dec = () => setItemQty(product.id, Math.max(0, qty - 1))

  // Precio dinámico según cantidad
  const hasWholesale = product.priceWholesale && product.wholesaleMin
  const currentPrice = hasWholesale && qty >= product.wholesaleMin
    ? product.priceWholesale
    : product.price

  // --- Producto especial: GIO, 10 sabores con promo mayorista combinada ---
  if (product.isGio) {
    return (
      <div className={styles.card}>
        <div className={styles.imgWrap}>
          {product.image
            ? <img src={product.image} alt={product.name} className={styles.img} />
            : <span className={styles.emoji}>{product.emoji || '🍫'}</span>
          }
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
          {product.desc && <p className={styles.desc}>{product.desc}</p>}
          <p className={styles.price}>Desde ${GIO_WHOLESALE_PRICE.toLocaleString('es-AR')}</p>
          <button className={styles.addBtn} style={{ width: '100%' }} onClick={() => setGioOpen(true)}>
            Ver sabores 🍫
          </button>
        </div>
        {gioOpen && <GioSheet onClose={() => setGioOpen(false)} />}
      </div>
    )
  }

  // --- Producto especial: Sweet Cream, caja x40 de un sabor a elegir ---
  if (product.isSweetCream) {
    return (
      <div className={styles.card}>
        <div className={styles.imgWrap}>
          {product.image
            ? <img src={product.image} alt={product.name} className={styles.img} />
            : <span className={styles.emoji}>{product.emoji || '🧊'}</span>
          }
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
          {product.desc && <p className={styles.desc}>{product.desc}</p>}
          <p className={styles.price}>${SWEET_CREAM_PRICE.toLocaleString('es-AR')} / caja x40</p>
          <button className={styles.addBtn} style={{ width: '100%' }} onClick={() => setSweetCreamOpen(true)}>
            Elegir sabor 🧊
          </button>
        </div>
        {sweetCreamOpen && <SweetCreamSheet onClose={() => setSweetCreamOpen(false)} />}
      </div>
    )
  }

  // --- Producto especial: balde 10L con sabor a elegir ---
  if (product.isBucket) {
    const group = bucketGroups.find(g => g.id === product.bucketGroupId)
    if (!group) return null
    return (
      <div className={styles.card}>
        <div className={styles.imgWrap}>
          {product.image
            ? <img src={product.image} alt={product.name} className={styles.img} />
            : <span className={styles.emoji}>{product.emoji || '🪣'}</span>
          }
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
          {product.desc && <p className={styles.desc}>{product.desc}</p>}
          <p className={styles.price}>${group.price.toLocaleString('es-AR')}</p>
          <button className={styles.addBtn} style={{ width: '100%' }} onClick={() => setBucketOpen(true)}>
            Elegir sabor 🍦
          </button>
        </div>
        {bucketOpen && <BucketSheet group={group} onClose={() => setBucketOpen(false)} />}
      </div>
    )
  }

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
          <div>
            <p className={styles.price}>${currentPrice.toLocaleString('es-AR')}</p>
            {hasWholesale && (
              <p className={styles.wholesaleTag}>
                {qty >= product.wholesaleMin
                  ? '✅ Precio mayorista aplicado'
                  : `💡 x${product.wholesaleMin}+ → $${product.priceWholesale.toLocaleString('es-AR')}`
                }
              </p>
            )}
          </div>
        )}
        <div className={styles.qtyRow}>
          <button className={styles.qtyBtn} onClick={dec} aria-label="Quitar">−</button>
          <span className={styles.qtyNum}>{qty}</span>
          <button className={styles.qtyBtn} onClick={inc} aria-label="Agregar">+</button>
          {qty === 0
            ? <button className={styles.addBtn} onClick={inc}>Agregar</button>
            : <span className={styles.added}>✓ Agregado</span>
          }
        </div>
      </div>
    </div>
  )
}
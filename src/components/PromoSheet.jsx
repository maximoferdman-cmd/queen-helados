import { useState, useRef } from 'react'
import { promos } from '../data/promos'
import { useApp } from '../context/AppContext'
import styles from './PromoSheet.module.css'

export default function PromoSheet({ onClose }) {
  const { addPromoToCart } = useApp()
  const [step, setStep] = useState('list') // 'list' | 'config'
  const [selectedPromo, setSelectedPromo] = useState(null)
  const [selections, setSelections] = useState({})
  const sheetRef = useRef(null)

  const itemsWithVariants = selectedPromo?.items.filter(i => i.variants) || []
  const allSelected = itemsWithVariants.every(i => selections[i.id])

  function goToStep(nextStep) {
    setStep(nextStep)
    requestAnimationFrame(() => {
      sheetRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  function handleSelectPromo(promo) {
    setSelectedPromo(promo)
    setSelections({})
    goToStep('config')
  }

  function handleVariant(itemId, variant) {
    setSelections(prev => ({ ...prev, [itemId]: variant }))
  }

  function handleAddToCart() {
    addPromoToCart(selectedPromo, selections)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} ref={sheetRef} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          {step === 'config' && (
            <button className={styles.back} onClick={() => goToStep('list')}>‹</button>
          )}
          <h2 className={styles.title}>
            {step === 'list' ? '🎁 Armá tu promo' : selectedPromo.name}
          </h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {step === 'list' && (
          <div className={styles.promoList}>
            {promos.map(promo => (
              <button key={promo.id} className={styles.promoCard} onClick={() => handleSelectPromo(promo)}>
                <div className={styles.promoEmoji}>{promo.emoji}</div>
                <div className={styles.promoInfo}>
                  <span className={styles.promoName}>{promo.name}</span>
                  <span className={styles.promoItems}>
                    {promo.items.map(i => i.name).join(' · ')}
                  </span>
                </div>
                <div className={styles.promoPrice}>
                  ${promo.price.toLocaleString('es-AR')}
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 'config' && (
          <div className={styles.config}>
            <div className={styles.fixedItems}>
              <p className={styles.sectionLabel}>Incluye</p>
              {selectedPromo.items.filter(i => !i.variants).map(item => (
                <div key={item.id} className={styles.fixedItem}>
                  <span>✓</span> {item.name}
                </div>
              ))}
            </div>

            {itemsWithVariants.map(item => (
              <div key={item.id} className={styles.variantGroup}>
                <p className={styles.sectionLabel}>Elegí tu {item.name}</p>
                <div className={styles.variantOptions}>
                  {item.variants.map(v => (
                    <button
                      key={v}
                      className={`${styles.variantBtn} ${selections[item.id] === v ? styles.variantSelected : ''}`}
                      onClick={() => handleVariant(item.id, v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalPrice}>${selectedPromo.price.toLocaleString('es-AR')}</span>
              </div>
              <button
                className={styles.addBtn}
                disabled={!allSelected}
                onClick={handleAddToCart}
              >
                {allSelected ? '🛒 Agregar al pedido' : 'Elegí todas las variantes'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
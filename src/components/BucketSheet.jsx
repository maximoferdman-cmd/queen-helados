import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { bucketGroups } from '../data/buckets'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import styles from './PromoSheet.module.css'

export default function BucketSheet({ onClose }) {
  useLockBodyScroll()
  const { addBucketToCart } = useApp()
  const [step, setStep] = useState('groups') // 'groups' | 'flavor'
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [flavor, setFlavor] = useState(null)
  const sheetRef = useRef(null)

  function goToStep(nextStep) {
    setStep(nextStep)
    // Volvemos el scroll del modal arriba al cambiar de paso,
    // para que no quede "trabado" a mitad de una lista larga.
    requestAnimationFrame(() => {
      sheetRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  function handleSelectGroup(group) {
    setSelectedGroup(group)
    setFlavor(null)
    goToStep('flavor')
  }

  function handleAddToCart() {
    addBucketToCart(selectedGroup, flavor)
    onClose()
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} ref={sheetRef} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          {step === 'flavor' && (
            <button className={styles.back} onClick={() => goToStep('groups')}>‹</button>
          )}
          <h2 className={styles.title}>
            {step === 'groups' ? '🪣 Balde 10L — Elegí el tipo' : `Elegí el sabor · ${selectedGroup.label}`}
          </h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {step === 'groups' && (
          <div className={styles.promoList}>
            {bucketGroups.map(group => (
              <button key={group.id} className={styles.promoCard} onClick={() => handleSelectGroup(group)}>
                <div className={styles.promoEmoji}>🪣</div>
                <div className={styles.promoInfo}>
                  <span className={styles.promoName}>{group.label}</span>
                  <span className={styles.promoItems}>{group.flavors.length} sabores a elegir</span>
                </div>
                <div className={styles.promoPrice}>
                  ${group.price.toLocaleString('es-AR')}
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 'flavor' && (
          <div className={styles.config}>
            <div className={styles.variantGroup}>
              <p className={styles.sectionLabel}>Sabores {selectedGroup.label}</p>
              <div className={styles.variantOptions}>
                {selectedGroup.flavors.map(f => (
                  <button
                    key={f}
                    className={`${styles.variantBtn} ${flavor === f ? styles.variantSelected : ''}`}
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
                <span className={styles.totalPrice}>${selectedGroup.price.toLocaleString('es-AR')}</span>
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
        )}

      </div>
    </div>,
    document.body

import React from 'react'
import { ShoppingCart, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { SHOW_CART_TOTAL } from '../config'

export default function FloatingCartButton({ onOpen }) {
  const { totalItems, totalPrice, hasPrices } = useCart()

  if (totalItems === 0) return null

  return (
    <div style={styles.wrap} className="animate-slideUp">
      <button style={styles.btn} onClick={onOpen} aria-label="Ver carrito">
        <div style={styles.left}>
          <div style={styles.iconWrap}>
            <ShoppingCart size={18} strokeWidth={2.2} />
            <span style={styles.badge}>{totalItems}</span>
          </div>
          <span style={styles.label}>Ver pedido</span>
        </div>

        <div style={styles.right}>
          {SHOW_CART_TOTAL && hasPrices && totalPrice > 0 && (
            <span style={styles.total}>
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          )}
          <ChevronRight size={18} strokeWidth={2.5} />
        </div>
      </button>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 150,
    width: 'calc(100% - 32px)',
    maxWidth: 420,
  },
  btn: {
    width: '100%',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-full)',
    padding: '15px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-float)',
    transition: 'transform var(--transition), background var(--transition)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -7,
    right: -8,
    background: 'var(--badge)',
    color: '#fff',
    borderRadius: 'var(--radius-full)',
    minWidth: 18,
    height: 18,
    fontSize: 10,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    padding: '0 4px',
  },
  label: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 700,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  total: {
    fontFamily: 'var(--font-display)',
    fontSize: 15,
    fontWeight: 700,
  },
}

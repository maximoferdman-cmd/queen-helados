import { useState } from 'react'
import { useApp } from '../context/AppContext'
import styles from './Header.module.css'

export default function Header({ onCartOpen, onAdminOpen }) {
  const { cartCount } = useApp()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
  <img src="/logo.png" alt="Queen Helados" className={styles.logo} />
</div>
      <div className={styles.right}>
        <button className={styles.cartBtn} onClick={onCartOpen} aria-label="Ver carrito">
          🛒
          <span>{cartCount}</span>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>
        <button className={styles.adminBtn} onClick={onAdminOpen}>⚙</button>
      </div>
    </header>
  )
}

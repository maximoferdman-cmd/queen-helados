import React from 'react'
import { Truck, Zap } from 'lucide-react'
import { BUSINESS } from '../config'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.decoBig}>🍦</div>
      <div className={styles.decoSmall}>🧊</div>

      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          {BUSINESS.tagline} <span className={styles.wave}>👑</span>
        </h1>
        <p className={styles.desc}>{BUSINESS.description}</p>

        <div className={styles.chips}>
          <Chip icon={<Truck size={13} />} label="Delivery sin cargo en tu zona" />
          <Chip icon={<Zap size={13} />} label="Pedidos al instante" />
          <Chip emoji="⭐" label="Siempre fresco" />
        </div>

        <button
          onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            marginTop: '16px',
            background: '#FFD700',
            color: '#111',
            border: 'none',
            borderRadius: '50px',
            padding: '13px 28px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'inherit',
          }}
        >
          🛒 Ver productos
        </button>
      </div>
    </div>
  )
}

function Chip({ icon, emoji, label }) {
  return (
    <div className={styles.chip}>
      {icon || emoji} {label}
    </div>
  )
}
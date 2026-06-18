import React from 'react'
import { Truck, Zap, ShoppingCart } from 'lucide-react'
import { BUSINESS } from '../config'
import styles from './Hero.module.css'

export default function Hero({ onCartOpen }) {
  return (
    <div style={styles.hero}>
      {/* Decoración de fondo */}
      <div style={styles.decoBig}>🍦</div>
      <div style={styles.decoSmall}>🧊</div>

      <div style={styles.heroContent}>
        <h1 style={styles.title}>
          {BUSINESS.tagline} <span style={styles.wave}>👑</span>
        </h1>
        <p style={styles.desc}>{BUSINESS.description}</p>

        <div style={styles.chips}>
          <Chip icon={<Truck size={13} />} label="Delivery sin cargo en tu zona" />
          <Chip icon={<Zap size={13} />}  label="Pedidos al instante" />
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
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      background: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '50px',
      padding: '5px 12px',
      fontSize: '12px',
      color: 'rgba(255,255,255,0.9)',
    }}>
      {icon || emoji} {label}
    </div>
  )
}
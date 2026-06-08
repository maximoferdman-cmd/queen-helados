import React from 'react'
import { Truck, Zap } from 'lucide-react'
import { BUSINESS } from '../config'

export default function Hero() {
  return (
    <div style={styles.hero}>
      {/* Decoración de fondo */}
      <div style={styles.decoBig}>❄</div>
      <div style={styles.decoSmall}>🧊</div>

      <h1 style={styles.title}>
        {BUSINESS.tagline} <span style={styles.wave}>🥶</span>
      </h1>
      <p style={styles.desc}>{BUSINESS.description}</p>

      <div style={styles.chips}>
        <Chip icon={<Truck size={13} />} label="Envío a domicilio" />
        <Chip icon={<Zap size={13} />}  label="Pedidos al instante" />
        <Chip emoji="⭐" label="Siempre fresco" />
      </div>
    </div>
  )
}

function Chip({ icon, emoji, label }) {
  return (
    <div style={styles.chip}>
      {icon && <span style={{ display:'flex', alignItems:'center' }}>{icon}</span>}
      {emoji && <span style={{ fontSize: 13 }}>{emoji}</span>}
      <span>{label}</span>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
    padding: '28px 20px 30px',
    position: 'relative',
    overflow: 'hidden',
  },
  decoBig: {
    position: 'absolute',
    right: -8,
    top: -12,
    fontSize: 110,
    opacity: 0.05,
    pointerEvents: 'none',
    transform: 'rotate(15deg)',
    lineHeight: 1,
  },
  decoSmall: {
    position: 'absolute',
    right: 32,
    bottom: -18,
    fontSize: 72,
    opacity: 0.07,
    pointerEvents: 'none',
    lineHeight: 1,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 26,
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: 7,
    position: 'relative',
  },
  wave: { display: 'inline' },
  desc: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 1.5,
    marginBottom: 16,
    position: 'relative',
    maxWidth: 290,
  },
  chips: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    position: 'relative',
  },
  chip: {
    background: 'rgba(255,255,255,0.14)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.92)',
    padding: '5px 12px',
    borderRadius: 'var(--radius-full)',
    fontSize: 12,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
}

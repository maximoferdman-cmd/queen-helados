import React, { useRef } from 'react'

export default function CategoryFilter({ categories, activeId, onSelect }) {
  const scrollRef = useRef(null)

  return (
    <div style={styles.wrap}>
      <p style={styles.label}>Categorías</p>
      <div style={styles.scroll} ref={scrollRef} role="list">
        {/* Pill: Todas */}
        <button
          role="listitem"
          style={{
            ...styles.pill,
            ...(activeId === 'todas' ? styles.pillActive : {}),
          }}
          onClick={() => onSelect('todas')}
        >
          <span style={styles.pillEmoji}>🌟</span>
          <span>Todas</span>
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            role="listitem"
            style={{
              ...styles.pill,
              ...(activeId === cat.id ? styles.pillActive : {}),
            }}
            onClick={() => onSelect(cat.id)}
          >
            <span style={styles.pillEmoji}>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    paddingBottom: 4,
  },
  label: {
    padding: '14px 18px 8px',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.9px',
  },
  scroll: {
    display: 'flex',
    gap: 8,
    padding: '2px 18px 14px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
  },
  pill: {
    background: 'var(--surface)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-full)',
    padding: '8px 15px',
    whiteSpace: 'nowrap',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    transition: 'all var(--transition)',
    flexShrink: 0,
  },
  pillActive: {
    background: 'var(--primary)',
    borderColor: 'var(--primary)',
    color: '#fff',
  },
  pillEmoji: {
    fontSize: 15,
    lineHeight: 1,
  },
}

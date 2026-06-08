import React, { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * BottomSheet reutilizable.
 * Uso: <BottomSheet open={bool} onClose={fn} title="...">...</BottomSheet>
 */
export default function BottomSheet({ open, onClose, title, subtitle, children, maxHeight = '92vh' }) {
  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div style={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ ...styles.sheet, maxHeight }} className="animate-slideUp">
        {/* Handle */}
        <div style={styles.handle} />

        {/* Header */}
        <div style={styles.header}>
          <div>
            {title && <h2 style={styles.title}>{title}</h2>}
            {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.52)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    animation: 'fadeIn 0.2s ease',
  },
  sheet: {
    background: 'var(--surface)',
    borderRadius: '24px 24px 0 0',
    width: '100%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  },
  handle: {
    width: 40,
    height: 4,
    background: 'var(--border)',
    borderRadius: 'var(--radius-full)',
    margin: '14px auto 6px',
    flexShrink: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '12px 20px 16px',
    borderBottom: '1px solid var(--border)',
    gap: 12,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--text)',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 13,
    color: 'var(--text-muted)',
    marginTop: 3,
  },
  closeBtn: {
    background: 'var(--surface-alt)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    width: 34,
    height: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    flexShrink: 0,
  },
  content: {
    padding: '0 20px 32px',
  },
}

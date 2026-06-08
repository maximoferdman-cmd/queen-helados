import React from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.box}>
        <Search size={17} color="var(--text-light)" strokeWidth={2.2} />
        <input
          type="search"
          placeholder="Buscar productos..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={styles.input}
          aria-label="Buscar productos"
        />
        {value && (
          <button style={styles.clear} onClick={() => onChange('')} aria-label="Limpiar búsqueda">
            <X size={15} color="var(--text-light)" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    padding: '14px 18px 8px',
  },
  box: {
    background: 'var(--surface)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    gap: 10,
    transition: 'border-color var(--transition)',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'var(--text)',
    fontSize: 15,
    lineHeight: 1,
  },
  clear: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}

import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ categories, products, activeCat, searchQuery }) {
  // Filtrar por búsqueda
  const query = searchQuery.toLowerCase().trim()
  const filteredProducts = products.filter(p => {
    if (!p.active) return false
    if (!query) return true
    return (
      p.name.toLowerCase().includes(query) ||
      p.desc?.toLowerCase().includes(query)
    )
  })

  // Determinar qué categorías mostrar
  const catsToShow = activeCat === 'todas'
    ? categories
    : categories.filter(c => c.id === activeCat)

  const sections = catsToShow
    .map(cat => ({
      cat,
      items: filteredProducts.filter(p => p.cat === cat.id),
    }))
    .filter(s => s.items.length > 0)

  if (sections.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={styles.emptyEmoji}>🔍</span>
        <p style={styles.emptyTitle}>Sin resultados</p>
        <p style={styles.emptyDesc}>
          {query ? `No encontramos "${searchQuery}"` : 'No hay productos en esta categoría'}
        </p>
      </div>
    )
  }

  return (
    <div style={styles.wrap}>
      {sections.map(({ cat, items }) => (
        <section key={cat.id} style={styles.section}>
          {/* Header de sección */}
          <div style={{ ...styles.catHeader, background: cat.color || 'var(--surface-alt)' }}>
            <span style={styles.catEmoji}>{cat.emoji}</span>
            <h2 style={styles.catName}>{cat.name}</h2>
            <span style={styles.catCount}>{items.length} productos</span>
          </div>

          {/* Grid 2 columnas */}
          <div style={styles.grid}>
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}

      {/* Spacer para el botón flotante */}
      <div style={{ height: 100 }} />
    </div>
  )
}

const styles = {
  wrap: {
    padding: '4px 14px 0',
  },
  section: {
    marginBottom: 28,
  },
  catHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    marginBottom: 13,
    border: '1px solid rgba(0,0,0,0.04)',
  },
  catEmoji: {
    fontSize: 22,
    lineHeight: 1,
  },
  catName: {
    fontFamily: 'var(--font-display)',
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--text)',
    flex: 1,
  },
  catCount: {
    fontSize: 12,
    color: 'var(--text-light)',
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 11,
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--text-light)',
  },
  emptyEmoji: {
    display: 'block',
    fontSize: 48,
    marginBottom: 14,
  },
  emptyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 14,
    lineHeight: 1.5,
  },
}

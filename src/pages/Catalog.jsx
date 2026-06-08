import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import styles from './Catalog.module.css'

export default function Catalog() {
  const { products, categories, config } = useApp()
  const [activeCat, setActiveCat] = useState('todas')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    if (!p.active) return false
    if (activeCat !== 'todas' && p.cat !== activeCat) return false
    if (search) return (p.name + p.desc).toLowerCase().includes(search.toLowerCase())
    return true
  })

  const visibleCats = activeCat === 'todas'
    ? categories.filter(c => filtered.some(p => p.cat === c.id))
    : categories.filter(c => c.id === activeCat)

  return (
    <div>
      {/* Hero */}
      <div className={styles.hero}>
        <h1>{config.businessName}</h1>
        <p>{config.tagline}</p>
        <div className={styles.chips}>
          <span className={styles.chip}>🚚 Envío a domicilio</span>
          <span className={styles.chip}>❄ Siempre fresco</span>
          <span className={styles.chip}>🔥 Pedidos al instante</span>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <div className={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>}
        </div>
      </div>

      {/* Category pills */}
<p className={styles.sectionTitle}>Categorías</p>
<div style={{position:'relative', display:'flex', alignItems:'center'}}>
  <button 
    className={styles.scrollBtn} 
    onClick={() => {
      const el = document.getElementById('catScroll')
      if(el.scrollLeft > 0) el.scrollBy({left: -150, behavior: 'smooth'})
    }}
  >‹</button>
  <div className={styles.catScroll} id="catScroll">
    <button className={`${styles.pill} ${activeCat === 'todas' ? styles.activePill : ''}`} onClick={() => setActiveCat('todas')}>
      🌟 Todas
    </button>
    {categories.map(c => (
      <button
        key={c.id}
        className={`${styles.pill} ${activeCat === c.id ? styles.activePill : ''}`}
        onClick={() => setActiveCat(c.id)}
      >
        {c.emoji} {c.name}
      </button>
    ))}
  </div>
  <button 
    className={styles.scrollBtn} 
    onClick={() => {
      const el = document.getElementById('catScroll')
      if(el.scrollLeft < el.scrollWidth - el.clientWidth) el.scrollBy({left: 150, behavior: 'smooth'})
    }}
  >›</button>
</div>

      {/* Products by category */}
      <div className={styles.products}>
        {visibleCats.map(cat => {
          const catProds = filtered.filter(p => p.cat === cat.id)
          if (catProds.length === 0) return null
          return (
            <div key={cat.id} className={styles.catSection}>
              <h2 className={styles.catTitle}><span>{cat.emoji}</span>{cat.name}</h2>
              <div className={styles.grid}>
                {catProds.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span>🔍</span>
            <p>No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  )
}

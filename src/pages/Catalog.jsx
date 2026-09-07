import { useState } from 'react'
import PromoSheet from '../components/PromoSheet'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import ProductCard from '../components/ProductCard'
import styles from './Catalog.module.css'

export default function Catalog() {
  const { products, categories, config, getSubcategories } = useApp()
  const [activeCat, setActiveCat] = useState('todas')
  const [activeSubcat, setActiveSubcat] = useState(null)
  const [search, setSearch] = useState('')
  const [promoOpen, setPromoOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  useLockBodyScroll(categoriesOpen)

  const handleCatClick = (catId) => {
    setActiveCat(catId)
    setActiveSubcat(null)
  }

  const currentSubcats = activeCat !== 'todas' ? getSubcategories(activeCat) : []

  const filtered = products.filter(p => {
    if (!p.active) return false
    if (search) return (p.name + p.desc).toLowerCase().includes(search.toLowerCase())
    if (activeCat !== 'todas') {
      if (p.cat !== activeCat) return false
      if (activeSubcat && p.subcat !== activeSubcat) return false
    }
    return true
  })

  const visibleCats = activeCat === 'todas'
    ? categories.filter(c => products.some(p => p.active && p.cat === c.id))
    : categories.filter(c => c.id === activeCat)

  return (
    <div>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{config.tagline}</h1>
          <p className={styles.heroDesc}>{config.description}</p>

          <div className={styles.heroChips}>
            <span className={styles.heroChip}>🚚 Delivery sin cargo en tu zona</span>
          </div>

   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <button
              className={styles.heroCta}
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => document.getElementById('catalogo-productos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🛒 Ver productos
            </button>
            <button
              className={styles.heroCta}
              style={{ width: '100%', justifyContent: 'center', background: '#C8282E', color: '#fff' }}
              onClick={() => setPromoOpen(true)}
            >
              🎁 Armá tu promo
            </button>
            <a
              href={`https://wa.me/${config.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCta}
              style={{
                width: '100%',
                justifyContent: 'center',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              Contactanos
            </a>
          </div>
        </div>
      </div>
      <div id="catalogo-productos">

        {/* Buscador */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Pills de categorías: Todas + primeras 2 + botón Ver categorías */}
        <div className={styles.pillsOuter}>
          <div className={styles.pillsWrap}>
            <button
              className={`${styles.pill} ${activeCat === 'todas' ? styles.pillActive : ''}`}
              onClick={() => handleCatClick('todas')}
            >
              🌟 Todas
            </button>
            {categories.slice(0, 2).map(cat => (
              <button
                key={cat.id}
                className={`${styles.pill} ${activeCat === cat.id ? styles.pillActive : ''}`}
                onClick={() => handleCatClick(cat.id)}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
            <button className={styles.pill} onClick={() => setCategoriesOpen(true)}>
              ☰ Ver categorías
            </button>
          </div>
        </div>

        {/* Modal: todas las categorías en grilla */}
        {categoriesOpen && (
          <div className={styles.catModalOverlay} onClick={() => setCategoriesOpen(false)}>
            <div className={styles.catModalSheet} onClick={e => e.stopPropagation()}>
              <div className={styles.catModalHeader}>
                <h2 className={styles.catModalTitle}>Todas las categorías</h2>
                <button className={styles.catModalClose} onClick={() => setCategoriesOpen(false)}>✕</button>
              </div>
              <div className={styles.catModalGrid}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.catModalCard} ${activeCat === cat.id ? styles.catModalCardActive : ''}`}
                    onClick={() => { handleCatClick(cat.id); setCategoriesOpen(false) }}
                  >
                    <span className={styles.catModalEmoji}>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
              <button
                className={styles.catModalAllBtn}
                onClick={() => { handleCatClick('todas'); setCategoriesOpen(false) }}
              >
                Ver todos los productos ›
              </button>
            </div>
          </div>
        )}

        {/* Subcategorías */}
        {currentSubcats.length > 0 && (
          <div className={styles.subcatScroll}>
            <button
              className={`${styles.subcatPill} ${activeSubcat === null ? styles.activeSubcatPill : ''}`}
              onClick={() => setActiveSubcat(null)}
            >Todos</button>
            {currentSubcats.map(sc => (
              <button
                key={sc.id}
                className={`${styles.subcatPill} ${activeSubcat === sc.id ? styles.activeSubcatPill : ''}`}
                onClick={() => setActiveSubcat(sc.id)}
              >
                {sc.emoji} {sc.name}
              </button>
            ))}
          </div>
        )}

        {/* Productos */}
        <div className={styles.catalog}>
          {visibleCats.map(cat => {
            const catProds = filtered.filter(p => p.cat === cat.id)
            if (catProds.length === 0) return null
            const subcats = getSubcategories(cat.id)
            if (subcats.length > 0 && !activeSubcat && activeCat !== 'todas') {
              return (
                <div key={cat.id} className={styles.catSection}>
                  {subcats.map(sc => {
                    const scProds = catProds.filter(p => p.subcat === sc.id)
                    if (scProds.length === 0) return null
                    return (
                      <div key={sc.id} className={styles.subcatSection}>
                        <h3 className={styles.subcatTitle}><span>{sc.emoji}</span>{sc.name}</h3>
                        <div className={styles.grid}>
                          {scProds.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }
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
      
      {promoOpen && <PromoSheet onClose={() => setPromoOpen(false)} />}

    </div>
  )
}
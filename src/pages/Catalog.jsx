import { useState } from 'react'
import PromoSheet from '../components/PromoSheet'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import styles from './Catalog.module.css'

export default function Catalog() {
  const { products, categories, config, getSubcategories } = useApp()
  const [activeCat, setActiveCat] = useState('todas')
  const [activeSubcat, setActiveSubcat] = useState(null)
  const [search, setSearch] = useState('')
  const [promoOpen, setPromoOpen] = useState(false)

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

    className={styles.heroCta}
    onClick={() => document.getElementById('catalogo-productos')?.scrollIntoView({ behavior: 'smooth' })}
  >
    🛒 Ver productos
  </button>
  <button
    className={styles.heroCta}
    style={{ background: '#C8282E', color: '#fff' }}
    onClick={() => setPromoOpen(true)}
  >
    🎁 Armá tu promo
  </button>
  <a         
    href={`https://wa.me/${config.waNumber}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: '#25D366',
      color: '#fff',
      borderRadius: '50px',
      padding: '12px 20px',
      fontSize: '15px',
      fontWeight: '700',
      textDecoration: 'none',
      fontFamily: 'inherit',
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L.057 23.25a.75.75 0 00.918.919l5.453-1.47A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.74-.524-5.29-1.436l-.38-.225-3.236.872.885-3.157-.247-.395A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
    Coordinar envío
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

        {/* Pills de categorías con flechitas */}
        <div className={styles.pillsOuter}>
          <button
            className={styles.pillArrow}
            onClick={() => document.getElementById('pills-scroll').scrollBy({ left: -150, behavior: 'smooth' })}
          >‹</button>
          <div id="pills-scroll" className={styles.pillsWrap}>
            <button
              className={`${styles.pill} ${activeCat === 'todas' ? styles.pillActive : ''}`}
              onClick={() => handleCatClick('todas')}
            >
              🌟 Todas
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.pill} ${activeCat === cat.id ? styles.pillActive : ''}`}
                onClick={() => handleCatClick(cat.id)}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
          <button
            className={styles.pillArrow}
            onClick={() => document.getElementById('pills-scroll').scrollBy({ left: 150, behavior: 'smooth' })}
          >›</button>
        </div>

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
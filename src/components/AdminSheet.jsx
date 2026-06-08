import { useState } from 'react'
import { useApp } from '../context/AppContext'
import styles from './AdminSheet.module.css'

const TABS = ['Productos', 'Nuevo', 'Categorías', 'Config']

export default function AdminSheet({ open, onClose }) {
  const { products, categories, config, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory, setConfig } = useApp()
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState({ name: '', desc: '', price: '', emoji: '', cat: '', showPrice: true, active: true })
  const [catForm, setCatForm] = useState({ emoji: '', name: '' })
  const [cfgForm, setCfgForm] = useState({ ...config })

  if (!open) return null

  function handleAddProduct() {
    if (!form.name.trim()) return alert('Ingresá el nombre')
    addProduct({ ...form, price: parseFloat(form.price) || 0, cat: form.cat || categories[0]?.id })
    setForm({ name: '', desc: '', price: '', emoji: '', cat: '', showPrice: true, active: true })
    setTab(0)
  }

  function handleAddCat() {
    if (!catForm.name.trim()) return alert('Ingresá el nombre')
    const id = catForm.name.toLowerCase().replace(/\s+/g, '-')
    const ok = addCategory({ id, name: catForm.name, emoji: catForm.emoji || '📁' })
    if (!ok) return alert('Ya existe una categoría con ese nombre')
    setCatForm({ emoji: '', name: '' })
  }

  function handleSaveConfig() {
    setConfig({ ...config, ...cfgForm, showTotals: cfgForm.showTotals })
    alert('✅ Configuración guardada')
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Panel Admin ⚙</h2>
        <p className={styles.sub}>Gestioná tu catálogo</p>

        <div className={styles.tabs}>
          {TABS.map((t, i) => (
            <button key={t} className={`${styles.tab} ${tab === i ? styles.activeTab : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        {/* PRODUCTOS */}
        {tab === 0 && (
          <div className={styles.list}>
            {products.map(p => (
              <div key={p.id} className={styles.pItem}>
                <span className={styles.pEmoji}>{p.emoji || '📦'}</span>
                <div className={styles.pInfo}>
                  <p className={styles.pName}>{p.name}</p>
                  <p className={styles.pMeta}>{categories.find(c => c.id === p.cat)?.name || p.cat} · {p.showPrice ? '$' + p.price.toLocaleString('es-AR') : 'Sin precio'}</p>
                </div>
                <div className={styles.pActions}>
                  <button className={`${styles.miniBtn} ${p.active ? styles.on : ''}`} onClick={() => updateProduct(p.id, { active: !p.active })}>{p.active ? '✓ Activo' : 'Inactivo'}</button>
                  <button className={`${styles.miniBtn} ${styles.del}`} onClick={() => { if (window.confirm('¿Eliminar?')) deleteProduct(p.id) }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NUEVO */}
        {tab === 1 && (
          <div>
            <div className={styles.notice}>💡 Los cambios se guardan en el dispositivo. Conectá Firebase para sincronizar en la nube.</div>
            <label className={styles.label}>Nombre *</label>
            <input className={styles.input} placeholder="Helado Frutilla x500ml" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <label className={styles.label}>Descripción</label>
            <input className={styles.input} placeholder="Opcional" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
            <div className={styles.row2}>
              <div>
                <label className={styles.label}>Precio ($)</label>
                <input className={styles.input} type="number" placeholder="1200" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
              <div>
                <label className={styles.label}>Emoji</label>
                <input className={styles.input} placeholder="🍦" value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} />
              </div>
            </div>
            <label className={styles.label}>Categoría</label>
            <select className={styles.input} value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>Mostrar precio</span>
              <label className={styles.toggle}><input type="checkbox" checked={form.showPrice} onChange={e => setForm(f => ({ ...f, showPrice: e.target.checked }))} /><span className={styles.slider} /></label>
            </div>
            <button className={styles.saveBtn} onClick={handleAddProduct}>Guardar Producto ✓</button>
          </div>
        )}

        {/* CATEGORÍAS */}
        {tab === 2 && (
          <div>
            <div className={styles.row2} style={{ marginBottom: 12 }}>
              <input className={styles.input} placeholder="🧊 Emoji" value={catForm.emoji} onChange={e => setCatForm(f => ({ ...f, emoji: e.target.value }))} />
              <input className={styles.input} placeholder="Nombre" value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <button className={styles.saveBtn} style={{ marginBottom: 20 }} onClick={handleAddCat}>+ Agregar Categoría</button>
            <div className={styles.list}>
              {categories.map(c => (
                <div key={c.id} className={styles.catItem}>
                  <span>{c.emoji}</span>
                  <span className={styles.catName}>{c.name}</span>
                  <button className={`${styles.miniBtn} ${styles.del}`} onClick={() => { if (window.confirm('¿Eliminar?')) deleteCategory(c.id) }}>🗑</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONFIG */}
        {tab === 3 && (
          <div>
            <label className={styles.label}>Nombre del negocio</label>
            <input className={styles.input} value={cfgForm.businessName} onChange={e => setCfgForm(f => ({ ...f, businessName: e.target.value }))} />
            <label className={styles.label}>Número WhatsApp (sin +)</label>
            <input className={styles.input} placeholder="5491155550000" value={cfgForm.waNumber} onChange={e => setCfgForm(f => ({ ...f, waNumber: e.target.value }))} />
            <label className={styles.label}>Mensaje de saludo</label>
            <input className={styles.input} value={cfgForm.greeting} onChange={e => setCfgForm(f => ({ ...f, greeting: e.target.value }))} />
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>Mostrar totales en carrito</span>
              <label className={styles.toggle}><input type="checkbox" checked={cfgForm.showTotals} onChange={e => setCfgForm(f => ({ ...f, showTotals: e.target.checked }))} /><span className={styles.slider} /></label>
            </div>
            <button className={styles.saveBtn} onClick={handleSaveConfig}>Guardar Config ✓</button>
          </div>
        )}
      </div>
    </div>
  )
}

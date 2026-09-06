import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { bucketGroups } from '../data/buckets'
import styles from './AdminSheet.module.css'

const TABS = ['Productos', 'Nuevo', 'Categorías', 'Config']

export default function AdminSheet({ open, onClose }) {
  useLockBodyScroll(open)
  const {
    products, categories, config,
    addProduct, updateProduct, deleteProduct,
    addCategory, deleteCategory, setConfig,
    user, login, logout,
  } = useApp()
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState({ name: '', desc: '', price: '', emoji: '', image: '', cat: '', showPrice: true, active: true, bucketGroupId: '' })
  const [catForm, setCatForm] = useState({ emoji: '', name: '' })
  const [cfgForm, setCfgForm] = useState({ ...config })
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(null)

  if (!open) return null

  async function handleLogin() {
    setLoginError('')
    try {
      await login(loginForm.email, loginForm.password)
    } catch (e) {
      setLoginError('Email o contraseña incorrectos')
    }
  }

  function handleAddProduct() {
    if (!form.name.trim()) return alert('Ingresá el nombre')
    const isBucket = !!form.bucketGroupId
    const group = isBucket ? bucketGroups.find(g => g.id === form.bucketGroupId) : null
    addProduct({
      ...form,
      isBucket,
      price: isBucket ? group.price : (parseFloat(form.price) || 0),
      showPrice: true,
      cat: form.cat || categories[0]?.id,
    })
    setForm({ name: '', desc: '', price: '', emoji: '', image: '', cat: '', showPrice: true, active: true, bucketGroupId: '' })
    setTab(0)
  }

  function startEdit(p) {
    setEditingId(p.id)
    setEditForm({
      name: p.name,
      desc: p.desc || '',
      price: p.price,
      emoji: p.emoji || '',
      image: p.image || '',
      cat: p.cat,
      showPrice: p.showPrice,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm(null)
  }

  function saveEdit(id) {
    if (!editForm.name.trim()) return alert('Ingresá el nombre')
    updateProduct(id, { ...editForm, price: parseFloat(editForm.price) || 0 })
    setEditingId(null)
    setEditForm(null)
  }

  async function handleAddCat() {
    if (!catForm.name.trim()) return alert('Ingresá el nombre')
    const id = catForm.name.toLowerCase().replace(/\s+/g, '-')
    const ok = await addCategory({ id, name: catForm.name, emoji: catForm.emoji || '📁' })
    if (!ok) return alert('Ya existe una categoría con ese nombre')
    setCatForm({ emoji: '', name: '' })
  }

  function handleSaveConfig() {
    setConfig({ ...config, ...cfgForm })
    alert('✅ Configuración guardada')
  }

  const filteredProducts = search.trim()
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : products

  // --- Pantalla de login si no está autenticado ---
  if (!user) {
    return (
      <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
        <div className={styles.sheet}>
          <div className={styles.handle} />
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
          <h2 className={styles.title}>Panel Admin ⚙</h2>
          <p className={styles.sub}>Iniciá sesión para gestionar el catálogo</p>

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={loginForm.email}
            onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
          />
          <label className={styles.label}>Contraseña</label>
          <input
            className={styles.input}
            type="password"
            value={loginForm.password}
            onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {loginError && <p style={{ color: '#C8282E', fontSize: 13, marginTop: 6 }}>{loginError}</p>}
          <button className={styles.saveBtn} onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Panel Admin ⚙</h2>
        <p className={styles.sub}>Gestioná tu catálogo</p>
        <button className={styles.miniBtn} style={{ marginBottom: 12 }} onClick={logout}>Cerrar sesión</button>

        <div className={styles.tabs}>
          {TABS.map((t, i) => (
            <button key={t} className={`${styles.tab} ${tab === i ? styles.activeTab : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        {/* PRODUCTOS */}
        {tab === 0 && (
          <div>
            <input
              className={styles.input}
              placeholder="🔍 Buscar producto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ marginBottom: 12 }}
            />
            <div className={styles.list}>
              {filteredProducts.map(p => (
                editingId === p.id ? (
                  <div key={p.id} className={styles.pItem} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                    <label className={styles.label}>Nombre</label>
                    <input className={styles.input} value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                    <label className={styles.label}>Descripción</label>
                    <input className={styles.input} value={editForm.desc} onChange={e => setEditForm(f => ({ ...f, desc: e.target.value }))} />
                    <div className={styles.row2}>
                      <div>
                        <label className={styles.label}>Precio ($)</label>
                        <input className={styles.input} type="number" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} />
                      </div>
                      <div>
                        <label className={styles.label}>Emoji</label>
                        <input className={styles.input} value={editForm.emoji} onChange={e => setEditForm(f => ({ ...f, emoji: e.target.value }))} />
                      </div>
                    </div>
                    <label className={styles.label}>Imagen (ruta del archivo)</label>
                    <input className={styles.input} placeholder="/balde-comunes.jpg" value={editForm.image} onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))} />
                    <label className={styles.label}>Categoría</label>
                    <select className={styles.input} value={editForm.cat} onChange={e => setEditForm(f => ({ ...f, cat: e.target.value }))}>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                    </select>
                    <div className={styles.toggleRow}>
                      <span className={styles.toggleLabel}>Mostrar precio</span>
                      <label className={styles.toggle}><input type="checkbox" checked={editForm.showPrice} onChange={e => setEditForm(f => ({ ...f, showPrice: e.target.checked }))} /><span className={styles.slider} /></label>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className={styles.saveBtn} style={{ flex: 1 }} onClick={() => saveEdit(p.id)}>Guardar ✓</button>
                      <button className={styles.miniBtn} onClick={cancelEdit}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div key={p.id} className={styles.pItem}>
                    <span className={styles.pEmoji}>{p.emoji || '📦'}</span>
                    <div className={styles.pInfo}>
                      <p className={styles.pName}>{p.name}</p>
                      <p className={styles.pMeta}>{categories.find(c => c.id === p.cat)?.name || p.cat} · {p.showPrice ? '$' + p.price.toLocaleString('es-AR') : 'Sin precio'}</p>
                    </div>
                    <div className={styles.pActions}>
                      <button className={styles.miniBtn} onClick={() => startEdit(p)}>✏️ Editar</button>
                      <button className={`${styles.miniBtn} ${p.active ? styles.on : ''}`} onClick={() => updateProduct(p.id, { active: !p.active })}>{p.active ? '✓ Activo' : 'Inactivo'}</button>
                      <button className={`${styles.miniBtn} ${styles.del}`} onClick={() => { if (window.confirm('¿Eliminar?')) deleteProduct(p.id) }}>🗑</button>
                    </div>
                  </div>
                )
              ))}
              {filteredProducts.length === 0 && (
                <p className={styles.sub} style={{ textAlign: 'center', padding: 20 }}>No se encontraron productos</p>
              )}
            </div>
          </div>
        )}

        {/* NUEVO */}
        {tab === 1 && (
          <div>
            <div className={styles.notice}>💡 Los cambios se guardan en Firebase y se ven en todos los dispositivos, al instante.</div>
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
            <label className={styles.label}>Imagen (ruta del archivo)</label>
            <input className={styles.input} placeholder="/balde-comunes.jpg" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
            <p className={styles.notice}>💡 Primero subí el archivo a la carpeta "public" del proyecto y hacé push. Después pegá acá el nombre, empezando con "/" (ej: /balde-comunes.jpg).</p>
            <label className={styles.label}>¿Es un balde 10L?</label>
            <select className={styles.input} value={form.bucketGroupId} onChange={e => setForm(f => ({ ...f, bucketGroupId: e.target.value }))}>
              <option value="">No, es un producto normal</option>
              {bucketGroups.map(g => (
                <option key={g.id} value={g.id}>{g.label} (${g.price.toLocaleString('es-AR')})</option>
              ))}
            </select>
            {form.bucketGroupId && (
              <p className={styles.notice}>💡 El cliente va a poder elegir el sabor entre los {bucketGroups.find(g => g.id === form.bucketGroupId)?.flavors.length} de "{bucketGroups.find(g => g.id === form.bucketGroupId)?.label}". El precio se toma automático de ese tipo.</p>
            )}

            <label className={styles.label}>Categoría</label>
            <select className={styles.input} value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
            {!form.bucketGroupId && (
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>Mostrar precio</span>
                <label className={styles.toggle}><input type="checkbox" checked={form.showPrice} onChange={e => setForm(f => ({ ...f, showPrice: e.target.checked }))} /><span className={styles.slider} /></label>
              </div>
            )}
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

import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy,
} from 'firebase/firestore'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { db, auth } from '../firebase'
import { GIO_RETAIL_PRICE, GIO_WHOLESALE_PRICE, GIO_WHOLESALE_MIN, GIO_PISTACHO_PRICE } from '../data/gio'
import { SWEET_CREAM_PRICE } from '../data/sweetcream'

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const AppContext = createContext(null)

const defaultConfig = {
  businessName: 'Mi Negocio',
  tagline: '',
  description: '',
  waNumber: '',
  greeting: 'Hola, quiero hacer este pedido:',
  farewell: 'Gracias',
  showTotals: true,
}

export function AppProvider({ children }) {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [config, setConfigRaw]      = useState(defaultConfig)
  const [cart, setCart]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [user, setUser]             = useState(null)

  // --- Suscripciones en tiempo real a Firestore ---
  useEffect(() => {
    const productsQuery = query(collection(db, 'products'), orderBy('order'))
    const unsubProducts = onSnapshot(productsQuery, snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    const categoriesQuery = query(collection(db, 'categories'), orderBy('order'))
    const unsubCategories = onSnapshot(categoriesQuery, snap => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubConfig = onSnapshot(doc(db, 'config', 'general'), snap => {
      if (snap.exists()) setConfigRaw({ ...defaultConfig, ...snap.data() })
    })

    const unsubAuth = onAuthStateChanged(auth, setUser)

    return () => { unsubProducts(); unsubCategories(); unsubConfig(); unsubAuth() }
  }, [])

  async function setConfig(v) {
    await setDoc(doc(db, 'config', 'general'), v, { merge: true })
  }

  // --- Auth ---
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
  }
  async function logout() {
    await signOut(auth)
  }

  // --- Cart helpers (siguen en memoria local, no van a Firestore) ---
  const cartCount = cart.reduce((a, c) => a + c.qty, 0)
  const hasPrice  = cart.some(c => c.showPrice)

  // Precio real de un ítem del carrito. Para la mayoría de los productos
  // es simplemente su precio guardado. Para GIO (sin contar Pistachos) el
  // precio depende de cuánto se acumuló EN TOTAL entre todos los sabores
  // del carrito: si entre todos llegan a 6 unidades, todos pasan a precio
  // mayorista — por eso no se puede guardar un precio fijo por ítem.
  function effectiveUnitPrice(item) {
    if (item.giosGroup === 'gio' && item.giosPromoEligible) {
      const totalEligible = cart
        .filter(c => c.giosGroup === 'gio' && c.giosPromoEligible)
        .reduce((s, c) => s + c.qty, 0)
      return totalEligible >= GIO_WHOLESALE_MIN ? GIO_WHOLESALE_PRICE : GIO_RETAIL_PRICE
    }
    return item.price
  }

  const cartTotal = cart.reduce((a, c) => a + (c.showPrice ? effectiveUnitPrice(c) * c.qty : 0), 0)

  function setItemQty(productId, qty) {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const getPrice = (q) => {
      if (product.priceWholesale && product.wholesaleMin && q >= product.wholesaleMin) {
        return product.priceWholesale
      }
      return product.price
    }

    setCart(prev => {
      const exists = prev.find(c => c.id === productId)
      if (qty <= 0) return prev.filter(c => c.id !== productId)
      if (exists) return prev.map(c => c.id === productId ? { ...c, qty, price: getPrice(qty) } : c)
      return [...prev, { id: productId, name: product.name, emoji: product.emoji, price: getPrice(qty), showPrice: product.showPrice, qty }]
    })
  }

  function getItemQty(productId) {
    return cart.find(c => c.id === productId)?.qty || 0
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(c => c.id !== productId))
  }

  function clearCart() { setCart([]) }

  function addPromoToCart(promo, selections) {
    const id = `promo_${promo.id}_${Date.now()}`
    const variantDesc = promo.items
      .filter(item => item.variants)
      .map(item => `${item.name}: ${selections[item.id]}`)
      .join(' · ')
    setCart(prev => [...prev, {
      id,
      name: promo.name,
      emoji: '🎁',
      price: promo.price,
      showPrice: true,
      qty: 1,
      isPromo: true,
      variantDesc,
    }])
  }

  function addBucketToCart(group, flavor) {
    const id = `bucket_${group.id}_${Date.now()}`
    setCart(prev => [...prev, {
      id,
      name: `Balde 10L ${group.label} - ${flavor}`,
      emoji: '🪣',
      price: group.price,
      showPrice: true,
      qty: 1,
      isBucket: true,
    }])
  }

  // --- GIO: 10 sabores, uno de los cuales (Pistachos) queda afuera de la
  // promo mayorista. Cada sabor es su propio ítem de carrito con id estable
  // (así reabrir el panel actualiza en vez de duplicar). El precio real de
  // cada uno se calcula con effectiveUnitPrice(), no se guarda fijo acá.
  function getGioFlavorQty(flavorName) {
    const id = `gio_${slugify(flavorName)}`
    return cart.find(c => c.id === id)?.qty || 0
  }

  function setGioFlavorQty(flavorName, qty, isPistacho) {
    const id = `gio_${slugify(flavorName)}`
    setCart(prev => {
      if (qty <= 0) return prev.filter(c => c.id !== id)
      const basePrice = isPistacho ? GIO_PISTACHO_PRICE : GIO_RETAIL_PRICE
      const item = {
        id,
        name: `GIO ${flavorName}`,
        emoji: '🍫',
        price: basePrice,
        showPrice: true,
        qty,
        giosGroup: 'gio',
        giosPromoEligible: !isPistacho,
      }
      const exists = prev.find(c => c.id === id)
      if (exists) return prev.map(c => c.id === id ? item : c)
      return [...prev, item]
    })
  }

  // --- Sweet Cream: caja x40 de un solo sabor, sin descuento por cantidad.
  function getSweetCreamFlavorQty(flavorName) {
    const id = `sweetcream_${slugify(flavorName)}`
    return cart.find(c => c.id === id)?.qty || 0
  }

  function setSweetCreamFlavorQty(flavorName, qty) {
    const id = `sweetcream_${slugify(flavorName)}`
    setCart(prev => {
      if (qty <= 0) return prev.filter(c => c.id !== id)
      const item = {
        id,
        name: `Sweet Cream ${flavorName} (caja x40)`,
        emoji: '🧊',
        price: SWEET_CREAM_PRICE,
        showPrice: true,
        qty,
        isSweetCreamItem: true,
      }
      const exists = prev.find(c => c.id === id)
      if (exists) return prev.map(c => c.id === id ? item : c)
      return [...prev, item]
    })
  }

  function buildWhatsAppUrl(clientName, clientAddress) {
    let msg = config.greeting + '\n\n'
    cart.forEach(item => {
      const unitPrice = effectiveUnitPrice(item)
      let line = `• ${item.qty} ${item.name}`
      if (item.variantDesc) line += `\n   (${item.variantDesc})`
      msg += item.showPrice
        ? `${line} — $${(unitPrice * item.qty).toLocaleString('es-AR')}\n`
        : `${line}\n`
    })
    if (hasPrice && config.showTotals) {
      msg += `\n*Total estimado: $${cartTotal.toLocaleString('es-AR')}*\n`
    }
    if (clientName) msg += `\nNombre: ${clientName}`
    if (clientAddress) msg += `\nDirección: ${clientAddress}`
    msg += '\n\n' + config.farewell
    return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(msg)}`
  }

  // --- Product helpers (ahora escriben en Firestore) ---
  async function addProduct(product) {
    const maxOrder = products.reduce((max, p) => Math.max(max, p.order ?? 0), 0)
    await addDoc(collection(db, 'products'), { ...product, active: true, order: maxOrder + 1 })
  }

  async function updateProduct(id, changes) {
    await updateDoc(doc(db, 'products', id), changes)
  }

  async function deleteProduct(id) {
    await deleteDoc(doc(db, 'products', id))
    removeFromCart(id)
  }

  // --- Category helpers ---
  async function addCategory(cat) {
    if (categories.find(c => c.id === cat.id)) return false
    const maxOrder = categories.reduce((max, c) => Math.max(max, c.order ?? 0), 0)
    await setDoc(doc(db, 'categories', cat.id), {
      name: cat.name,
      emoji: cat.emoji,
      subcategories: cat.subcategories || [],
      order: maxOrder + 1,
    })
    return true
  }

  async function updateCategory(id, changes) {
    await updateDoc(doc(db, 'categories', id), changes)
  }

  async function deleteCategory(id) {
    await deleteDoc(doc(db, 'categories', id))
  }

  function getSubcategories(catId) {
    const cat = categories.find(c => c.id === catId)
    return cat?.subcategories || []
  }

  return (
    <AppContext.Provider value={{
      products, categories, config, cart, loading, user,
      cartCount, cartTotal, hasPrice, effectiveUnitPrice,
      setItemQty, getItemQty, removeFromCart, clearCart, buildWhatsAppUrl,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory, updateCategory,
      setConfig, getSubcategories,
      addPromoToCart, addBucketToCart, login, logout,
      getGioFlavorQty, setGioFlavorQty,
      getSweetCreamFlavorQty, setSweetCreamFlavorQty,
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useApp = () => useContext(AppContext)
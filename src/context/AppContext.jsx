import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy,
} from 'firebase/firestore'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { db, auth } from '../firebase'

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
  const cartTotal = cart.reduce((a, c) => a + (c.showPrice ? c.price * c.qty : 0), 0)
  const hasPrice  = cart.some(c => c.showPrice)

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

  function buildWhatsAppUrl(clientName, clientAddress) {
    let msg = config.greeting + '\n\n'
    cart.forEach(item => {
      const line = `• ${item.qty} ${item.name}`
      msg += item.showPrice
        ? `${line} — $${(item.price * item.qty).toLocaleString('es-AR')}\n`
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
      cartCount, cartTotal, hasPrice,
      setItemQty, getItemQty, removeFromCart, clearCart, buildWhatsAppUrl,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory, updateCategory,
      setConfig, getSubcategories,
      addPromoToCart, addBucketToCart, login, logout,
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useApp = () => useContext(AppContext)
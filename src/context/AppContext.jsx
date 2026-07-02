import { createContext, useContext, useState, useEffect } from 'react'
import { initialCategories, initialProducts, initialConfig } from '../data/initialData'

const AppContext = createContext(null)

const LS_PRODUCTS   = 'friomax_products'
const LS_CATEGORIES = 'friomax_categories'
const LS_CONFIG     = 'friomax_config'

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch { return fallback }
}

export function AppProvider({ children }) {
  const [products,   setProductsRaw]   = useState(() => load(LS_PRODUCTS,   initialProducts))
  const [categories, setCategoriesRaw] = useState(() => load(LS_CATEGORIES, initialCategories))
  const [config,     setConfigRaw]     = useState(() => load(LS_CONFIG,      initialConfig))
  const [cart,       setCart]          = useState([])

  // Persist to localStorage on every change
  const setProducts = (v) => { setProductsRaw(v); localStorage.setItem(LS_PRODUCTS, JSON.stringify(v)) }
  const setCategories = (v) => { setCategoriesRaw(v); localStorage.setItem(LS_CATEGORIES, JSON.stringify(v)) }
  const setConfig = (v) => { setConfigRaw(v); localStorage.setItem(LS_CONFIG, JSON.stringify(v)) }

  // --- Cart helpers ---
  const cartCount   = cart.reduce((a, c) => a + c.qty, 0)
  const cartTotal   = cart.reduce((a, c) => a + (c.showPrice ? c.price * c.qty : 0), 0)
  const hasPrice    = cart.some(c => c.showPrice)

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

  function buildWhatsAppUrl(clientName, clientAddress) {
  let msg = config.greeting + '\n\n'
  cart.forEach(item => { msg += `• ${item.qty} ${item.name}\n` })
  if (clientName) msg += `\nNombre: ${clientName}`
  if (clientAddress) msg += `\nDirección: ${clientAddress}`
  msg += '\n\n' + config.farewell
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(msg)}`
}

  // --- Product helpers ---
  function addProduct(product) {
    const newId = Math.max(0, ...products.map(p => p.id)) + 1
    setProducts([...products, { ...product, id: newId, active: true }])
  }

  function updateProduct(id, changes) {
    setProducts(products.map(p => p.id === id ? { ...p, ...changes } : p))
  }

  function deleteProduct(id) {
    setProducts(products.filter(p => p.id !== id))
    removeFromCart(id)
  }

  // --- Category helpers ---
  function addCategory(cat) {
    if (categories.find(c => c.id === cat.id)) return false
    setCategories([...categories, cat])
    return true
  }

  function deleteCategory(id) {
    setCategories(categories.filter(c => c.id !== id))
  }

 function getSubcategories(catId) {
    const cat = categories.find(c => c.id === catId)
    return cat?.subcategories || []
  }

  return (
    <AppContext.Provider value={{
      products, categories, config, cart,
      cartCount, cartTotal, hasPrice,
      setItemQty, getItemQty, removeFromCart, clearCart, buildWhatsAppUrl,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory,
      setConfig, getSubcategories,
      addPromoToCart,
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useApp = () => useContext(AppContext)

import React, { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ product, qty }]

  const getQty = useCallback((productId) => {
    return items.find(i => i.product.id === productId)?.qty ?? 0
  }, [items])

  const setQty = useCallback((product, qty) => {
    setItems(prev => {
      if (qty <= 0) return prev.filter(i => i.product.id !== product.id)
      const exists = prev.find(i => i.product.id === product.id)
      if (exists) return prev.map(i => i.product.id === product.id ? { ...i, qty } : i)
      return [...prev, { product, qty }]
    })
  }, [])

  const increment = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id)
      if (exists) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1 }]
    })
  }, [])

  const decrement = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id)
      if (!exists) return prev
      if (exists.qty <= 1) return prev.filter(i => i.product.id !== product.id)
      return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty - 1 } : i)
    })
  }, [])

  const remove = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => {
    if (!i.product.showPrice) return sum
    return sum + (i.product.price * i.qty)
  }, 0)
  const hasPrices = items.some(i => i.product.showPrice)

  return (
    <CartContext.Provider value={{
      items, getQty, setQty, increment, decrement, remove, clear,
      totalItems, totalPrice, hasPrices
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

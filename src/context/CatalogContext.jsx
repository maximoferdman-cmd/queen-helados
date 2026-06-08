import React, { createContext, useContext, useState, useCallback } from 'react'
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../config'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [products, setProducts]     = useState(INITIAL_PRODUCTS)
  const [nextId, setNextId]         = useState(
    Math.max(...INITIAL_PRODUCTS.map(p => p.id), 0) + 1
  )

  // ---- CATEGORIES ----
  const addCategory = useCallback((cat) => {
    setCategories(prev => [...prev, cat])
  }, [])

  const updateCategory = useCallback((id, updates) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }, [])

  const deleteCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }, [])

  const reorderCategories = useCallback((newOrder) => {
    setCategories(newOrder)
  }, [])

  // ---- PRODUCTS ----
  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: nextId }
    setProducts(prev => [...prev, newProduct])
    setNextId(n => n + 1)
    return newProduct
  }, [nextId])

  const updateProduct = useCallback((id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  const toggleActive = useCallback((id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }, [])

  const toggleShowPrice = useCallback((id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, showPrice: !p.showPrice } : p))
  }, [])

  const getProductsByCategory = useCallback((catId) => {
    return products.filter(p => p.cat === catId && p.active)
  }, [products])

  return (
    <CatalogContext.Provider value={{
      categories, products,
      addCategory, updateCategory, deleteCategory, reorderCategories,
      addProduct, updateProduct, deleteProduct, toggleActive, toggleShowPrice,
      getProductsByCategory,
    }}>
      {children}
    </CatalogContext.Provider>
  )
}

export const useCatalog = () => {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}

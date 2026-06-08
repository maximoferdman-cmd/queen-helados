import { useCallback } from 'react'
import { BUSINESS } from '../config'

/**
 * Hook para generar y abrir el mensaje de WhatsApp con el pedido.
 * Editá BUSINESS.whatsappNumber y BUSINESS.greeting en src/config/index.js
 */
export function useWhatsApp() {
  const sendOrder = useCallback(({ items, clientName = '', customNumber = '' }) => {
    if (!items || items.length === 0) return false

    const number = customNumber || BUSINESS.whatsappNumber

    let message = BUSINESS.greeting + '\n\n'

    if (clientName.trim()) {
      message += `👤 *${clientName.trim()}*\n\n`
    }

    message += '*Pedido:*\n'
    items.forEach(({ product, qty }) => {
      message += `• ${qty}x ${product.name}`
      if (product.showPrice && product.price > 0) {
        const subtotal = (product.price * qty).toLocaleString('es-AR')
        message += ` — $${subtotal}`
      }
      message += '\n'
    })

    const total = items
      .filter(i => i.product.showPrice)
      .reduce((sum, i) => sum + i.product.price * i.qty, 0)

    if (total > 0) {
      message += `\n💰 *Total: $${total.toLocaleString('es-AR')}*`
    }

    message += `\n\n${BUSINESS.farewell}`

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    return true
  }, [])

  return { sendOrder }
}

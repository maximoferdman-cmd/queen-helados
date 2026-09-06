import { useEffect } from 'react'

// Bloquea el scroll de la página de fondo mientras un modal/sheet está abierto.
// Sin esto, al tocar un botón dentro del modal el dedo puede mover
// simultáneamente la página de atrás, generando saltos y "trabas" visuales.
//
// Pasar `true` (o nada) para componentes que se montan/desmontan solos.
// Pasar el prop `open` para componentes que quedan siempre montados
// y solo se ocultan (ej: CartSheet, AdminSheet).
export function useLockBodyScroll(active = true) {
  useEffect(() => {
    if (!active) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [active])
}


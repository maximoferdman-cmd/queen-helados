// Ejecutar UNA SOLA VEZ para arreglar el orden de las categorías.
// Le asigna a cada categoría un campo "order" según la posición que tenía
// en tu archivo src/data/initialData.js original (Helados primero, etc).
//
// IMPORTANTE: necesitás las reglas de Firestore en modo abierto:
//   allow read, write: if true;
// Después de correrlo, volvé a poner las reglas seguras.
//
// Correr con: node scripts/fix-category-order.mjs

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { initialCategories } from '../src/data/initialData.js'

const firebaseConfig = {
  apiKey: "AIzaSyDz6hOy0Jx3vxYFRnUzdw8NtrgxM2nefCg",
  authDomain: "queen-helados.firebaseapp.com",
  projectId: "queen-helados",
  storageBucket: "queen-helados.firebasestorage.app",
  messagingSenderId: "434273830049",
  appId: "1:434273830049:web:dec287a6212116b42d1ce0",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function fixCategoryOrder() {
  const orderById = new Map()
  initialCategories.forEach((c, index) => {
    orderById.set(c.id, index)
  })

  console.log('Leyendo categorías actuales de Firestore...')
  const snap = await getDocs(collection(db, 'categories'))
  console.log(`Encontradas ${snap.docs.length} categorías.`)

  let updated = 0
  let notFound = 0

  for (const docSnap of snap.docs) {
    const order = orderById.get(docSnap.id)

    if (order === undefined) {
      console.log(`⚠️  No encontré coincidencia para: "${docSnap.id}" (le pongo orden 9999)`)
      await updateDoc(doc(db, 'categories', docSnap.id), { order: 9999 })
      notFound++
      continue
    }

    await updateDoc(doc(db, 'categories', docSnap.id), { order })
    console.log(`✓ ${docSnap.id} → orden ${order}`)
    updated++
  }

  console.log(`✅ Listo! ${updated} categorías ordenadas. ${notFound} sin coincidencia.`)
  process.exit(0)
}

fixCategoryOrder().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})

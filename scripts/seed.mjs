// Ejecutar UNA SOLA VEZ para arreglar el orden de los productos que ya subiste.
// Le asigna a cada producto un campo "order" según la posición que tenía
// en tu archivo src/data/initialData.js original.
//
// IMPORTANTE: para poder escribir, necesitás estar con las reglas de Firestore
// en modo abierto otra vez (las mismas que usaste para el seed):
//   allow read, write: if true;
// Después de correr este script, volvé a poner las reglas seguras.
//
// Correr con: node scripts/fix-order.mjs

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { initialProducts } from '../src/data/initialData.js'

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

async function fixOrder() {
  // Mapa: nombre del producto -> posición original en initialData.js
  const orderByName = new Map()
  initialProducts.forEach((p, index) => {
    orderByName.set(p.name.trim(), index)
  })

  console.log('Leyendo productos actuales de Firestore...')
  const snap = await getDocs(collection(db, 'products'))
  console.log(`Encontrados ${snap.docs.length} productos.`)

  let updated = 0
  let notFound = 0

  for (const docSnap of snap.docs) {
    const data = docSnap.data()
    const name = (data.name || '').trim()
    const order = orderByName.get(name)

    if (order === undefined) {
      console.log(`⚠️  No encontré coincidencia para: "${name}" (le pongo orden 9999)`)
      await updateDoc(doc(db, 'products', docSnap.id), { order: 9999 })
      notFound++
      continue
    }

    await updateDoc(doc(db, 'products', docSnap.id), { order })
    updated++
  }

  console.log(`✅ Listo! ${updated} productos ordenados correctamente. ${notFound} sin coincidencia exacta.`)
  process.exit(0)
}

fixOrder().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})

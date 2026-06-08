# FríoMax — App de Pedidos por WhatsApp

App web para distribuidora de alimentos y congelados.
Clientes eligen productos y envían el pedido directamente por WhatsApp.

---

## Instalación (5 minutos)

Necesitás tener instalado [Node.js](https://nodejs.org) (versión 18 o superior).

```bash
# 1. Descomprimí la carpeta friomax
# 2. Abrí una terminal dentro de la carpeta y ejecutá:

npm install
npm run dev
```

Luego abrí http://localhost:5173 en tu navegador.

---

## Personalización básica

### Cambiar nombre, WhatsApp y textos
Editá el archivo: `src/data/initialData.js`

```js
export const initialConfig = {
  businessName:  'El nombre de tu negocio',
  tagline:       'Tu slogan aquí',
  waNumber:      '5491155550000',  // Tu número sin +
  greeting:      'Hola, quiero hacer este pedido:',
  farewell:      'Gracias',
  showTotals:    true,
  adminPassword: '1234',   // ← CAMBIALO
}
```

### Agregar o editar productos
En el mismo archivo `src/data/initialData.js`, editá el array `initialProducts`.
También podés hacerlo desde el **Panel Admin** dentro de la app (botón ⚙).

### Cambiar colores
Editá las variables en `src/index.css`:
- `--primary`: color principal (verde oscuro)
- `--accent`: color de fondo suave
- `--badge`: color del contador del carrito

---

## Publicar online (gratis con Vercel)

```bash
# 1. Creá una cuenta en https://vercel.com (gratis)
# 2. Instalá la CLI de Vercel:
npm install -g vercel

# 3. Desde la carpeta del proyecto:
vercel

# 4. Seguí los pasos en pantalla. Vercel te da un link público al instante.
```

---

## Conectar Firebase (próximo paso)

Cuando quieras que los productos se guarden en la nube y se editen desde cualquier dispositivo:

1. Creá un proyecto en https://firebase.google.com
2. Activá Firestore Database
3. Reemplazá las funciones en `src/context/AppContext.jsx` 
   con llamadas a Firestore (se puede hacer sin tocar el resto del código)

---

## Estructura del proyecto

```
src/
  App.jsx                  ← Componente raíz
  index.css                ← Variables globales y estilos base
  context/
    AppContext.jsx          ← Estado global (carrito, productos, config)
  data/
    initialData.js          ← TUS PRODUCTOS Y CONFIGURACIÓN ← EDITÁ ACÁ
  components/
    Header.jsx              ← Barra superior
    ProductCard.jsx         ← Tarjeta de producto
    CartSheet.jsx           ← Carrito / envío por WhatsApp
    AdminSheet.jsx          ← Panel administrador
  pages/
    Catalog.jsx             ← Pantalla principal con catálogo
```

---

## Soporte
Para conectar Firebase, login de clientes o funciones extra, el código está
preparado para escalar. Cada componente es independiente y fácil de extender.

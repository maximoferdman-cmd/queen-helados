// ============================================================
//  ⚙️  ARCHIVO DE CONFIGURACIÓN PRINCIPAL
//  Editá este archivo para personalizar toda la app sin tocar
//  ningún otro archivo de código.
// ============================================================

// ------ INFORMACIÓN DEL NEGOCIO ------
export const BUSINESS = {
  name: "FríoMax",           // Nombre que aparece en el header
  tagline: "Tu distribuidora de confianza",
  description: "Helados, congelados, snacks y más. Pedidos rápidos por WhatsApp.",
  whatsappNumber: "5491155550000",  // SIN el + → formato: 549 + área + número
  greeting: "Hola! Quiero hacer el siguiente pedido:",
  farewell: "Muchas gracias 🙏",
  logoEmoji: "❄️",           // Emoji usado como logo (reemplazar con imagen real)
  // logoUrl: "/logo.png",   // Descomentar cuando tengas logo real en /public
};

// ------ COLORES ------
// Para cambiar la paleta, solo editá estos valores.
// Se aplican automáticamente a toda la app.
export const COLORS = {
  // Primarios
  primary:       "#0B4F3A",   // Verde oscuro (header, botones principales)
  primaryLight:  "#1A7A5A",   // Verde medio (hover)
  primaryDark:   "#073528",   // Verde muy oscuro (sombras, texto sobre primary)

  // Superficies
  bg:            "#F2F6F1",   // Fondo general de la app
  surface:       "#FFFFFF",   // Fondo de tarjetas
  surfaceAlt:    "#E8F2EC",   // Fondo alternativo suave

  // Acentos
  accent:        "#C8EFE2",   // Verde muy claro (chips, badges)
  cold:          "#3B9BD8",   // Azul frío (detalles)
  coldLight:     "#E6F4FC",   // Azul muy claro (fondos info)
  badge:         "#FF6B35",   // Naranja (carrito, badge count)
  whatsapp:      "#25D366",   // Verde WhatsApp

  // Texto
  text:          "#1A2B24",   // Texto principal
  textMuted:     "#4A6B5E",   // Texto secundario
  textLight:     "#8AADA0",   // Texto terciario/placeholder

  // Bordes
  border:        "#D4E5DC",   // Borde general
};

// ------ TIPOGRAFÍA ------
// Para cambiar fuentes, actualizá también el link en index.html
export const FONTS = {
  display: "'Syne', sans-serif",  // Títulos, headers, precios
  body:    "'DM Sans', sans-serif", // Texto general, descripciones
};

// ------ MOSTRAR PRECIOS ------
// true = se muestran precios por defecto en productos nuevos
// false = se ocultan por defecto
export const SHOW_PRICES_DEFAULT = true;

// ------ MOSTRAR TOTAL EN CARRITO ------
export const SHOW_CART_TOTAL = true;

// ------ CATEGORÍAS ------
// Para agregar/quitar categorías, editá este array.
// id: debe ser único, sin espacios ni tildes
// name: nombre visible
// emoji: ícono visual
// color: color de fondo del header de sección (opcional, usa primary si no se define)
export const INITIAL_CATEGORIES = [
  { id: "helados",       name: "Helados",       emoji: "🍦", color: "#E8F2EC" },
  { id: "snacks",        name: "Snacks",         emoji: "🍿", color: "#FFF3E8" },
  { id: "panchos",       name: "Panchos",        emoji: "🌭", color: "#FFF3E8" },
  { id: "hamburguesas",  name: "Hamburguesas",   emoji: "🍔", color: "#FFF3E8" },
  { id: "aderezos",      name: "Aderezos",       emoji: "🧴", color: "#F3EEF8" },
  { id: "mccain",        name: "McCain",         emoji: "🍟", color: "#FFFBE8" },
  { id: "alfajores",     name: "Alfajores",      emoji: "🍫", color: "#F8F0E8" },
  { id: "fideos",        name: "Fideos",         emoji: "🍝", color: "#FFF8E8" },
  { id: "bebidas",       name: "Bebidas",        emoji: "🥤", color: "#E8F4FF" },
  { id: "congelados",    name: "Congelados",     emoji: "🧊", color: "#EAF7FF" },
];

// ------ PRODUCTOS INICIALES ------
// Cada producto tiene:
//   id        → número único
//   name      → nombre visible
//   desc      → descripción corta (puede ser "")
//   price     → precio numérico
//   emoji     → ícono/imagen representativa
//   imageUrl  → (opcional) URL de imagen real: "/images/helado.jpg" o URL externa
//   cat       → id de categoría (debe coincidir con INITIAL_CATEGORIES)
//   showPrice → true/false — si se muestra el precio
//   active    → true/false — si aparece en el catálogo
export const INITIAL_PRODUCTS = [
  // HELADOS
  { id: 1,  name: "Helado Frutilla 500ml",        desc: "Cremoso artesanal",        price: 1200, emoji: "🍓", imageUrl: "", cat: "helados",      showPrice: true,  active: true },
  { id: 2,  name: "Helado Chocolate 500ml",        desc: "Sabor intenso, sin TACC",  price: 1200, emoji: "🍫", imageUrl: "", cat: "helados",      showPrice: true,  active: true },
  { id: 3,  name: "Helado Dulce de Leche 500ml",   desc: "El clásico argentino",     price: 1350, emoji: "🍨", imageUrl: "", cat: "helados",      showPrice: true,  active: true },
  { id: 4,  name: "Helado Limón x1L",              desc: "Ideal para el verano",     price: 2200, emoji: "🍋", imageUrl: "", cat: "helados",      showPrice: true,  active: true },
  // McCAIN
  { id: 5,  name: "Papas McCain Crinkle 700g",     desc: "Onduladas, crujientes",    price: 890,  emoji: "🍟", imageUrl: "", cat: "mccain",       showPrice: true,  active: true },
  { id: 6,  name: "Aros de Cebolla McCain 300g",   desc: "",                         price: 750,  emoji: "🧅", imageUrl: "", cat: "mccain",       showPrice: true,  active: true },
  { id: 7,  name: "Bastones McCain x500g",         desc: "Listos en 15 min",         price: 820,  emoji: "🥔", imageUrl: "", cat: "mccain",       showPrice: true,  active: true },
  // PANCHOS
  { id: 8,  name: "Panchos Viena x10",             desc: "Listos para hervir o grill", price: 1100, emoji: "🌭", imageUrl: "", cat: "panchos",    showPrice: true,  active: true },
  { id: 9,  name: "Panchos Extra Jumbo x6",        desc: "Tamaño grande",            price: 1300, emoji: "🌭", imageUrl: "", cat: "panchos",      showPrice: true,  active: true },
  // HAMBURGUESAS
  { id: 10, name: "Hamburguesa Vacuna x4",         desc: "100% vacuno, 120g c/u",    price: 1600, emoji: "🍔", imageUrl: "", cat: "hamburguesas", showPrice: true,  active: true },
  { id: 11, name: "Hamburguesa de Pollo x4",       desc: "Jugosa y tierna",          price: 1450, emoji: "🍗", imageUrl: "", cat: "hamburguesas", showPrice: true,  active: true },
  // ADEREZOS
  { id: 12, name: "Mayonesa Hellmann's 500g",      desc: "",                         price: 980,  emoji: "🧴", imageUrl: "", cat: "aderezos",     showPrice: false, active: true },
  { id: 13, name: "Ketchup Heinz 500ml",           desc: "",                         price: 850,  emoji: "🍅", imageUrl: "", cat: "aderezos",     showPrice: true,  active: true },
  { id: 14, name: "Mostaza Savora 250g",           desc: "",                         price: 620,  emoji: "🟡", imageUrl: "", cat: "aderezos",     showPrice: true,  active: true },
  // ALFAJORES
  { id: 15, name: "Alfajor Oreo x12 unid.",        desc: "Con relleno doble",        price: 2200, emoji: "🍪", imageUrl: "", cat: "alfajores",    showPrice: true,  active: true },
  { id: 16, name: "Alfajor Havanna x6",            desc: "Clásico de Mar del Plata", price: 3600, emoji: "🎁", imageUrl: "", cat: "alfajores",    showPrice: true,  active: true },
  // FIDEOS
  { id: 17, name: "Spaghetti Matarazzo 500g",      desc: "",                         price: 420,  emoji: "🍝", imageUrl: "", cat: "fideos",       showPrice: true,  active: true },
  { id: 18, name: "Moñito Don Vicente 500g",       desc: "",                         price: 390,  emoji: "🎀", imageUrl: "", cat: "fideos",       showPrice: true,  active: true },
  // BEBIDAS
  { id: 19, name: "Coca Cola 2.25L",               desc: "",                         price: 1050, emoji: "🥤", imageUrl: "", cat: "bebidas",      showPrice: true,  active: true },
  { id: 20, name: "Sprite 1.5L",                   desc: "",                         price: 850,  emoji: "💚", imageUrl: "", cat: "bebidas",      showPrice: true,  active: true },
  { id: 21, name: "Agua Villavicencio 2L",         desc: "",                         price: 550,  emoji: "💧", imageUrl: "", cat: "bebidas",      showPrice: true,  active: true },
  // CONGELADOS
  { id: 22, name: "Empanadas Carne x12",           desc: "Relleno suave y jugoso",   price: 1800, emoji: "🥟", imageUrl: "", cat: "congelados",   showPrice: true,  active: true },
  { id: 23, name: "Deditos de Queso x500g",        desc: "Apanados crujientes",      price: 1100, emoji: "🧀", imageUrl: "", cat: "congelados",   showPrice: true,  active: true },
  { id: 24, name: "Milanesas de Pollo x6",         desc: "",                         price: 2100, emoji: "🍗", imageUrl: "", cat: "congelados",   showPrice: true,  active: true },
  // SNACKS
  { id: 25, name: "Papas Fritas Lay's 100g",       desc: "",                         price: 350,  emoji: "🍿", imageUrl: "", cat: "snacks",       showPrice: true,  active: true },
  { id: 26, name: "Nachos Doritos 100g",           desc: "Sabor original",           price: 380,  emoji: "🌽", imageUrl: "", cat: "snacks",       showPrice: true,  active: true },
];

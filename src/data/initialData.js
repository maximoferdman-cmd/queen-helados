// ============================================================
//  DATOS INICIALES — editá acá tus productos y categorías
//  Más adelante podés conectar Firebase para editar
//  desde el panel admin sin tocar código.
// ============================================================

export const initialCategories = [
  { id: 'helados',       name: 'Helados',       emoji: '🍦' },
  { id: 'snacks',        name: 'Snacks',        emoji: '🍿' },
  { id: 'panchos',       name: 'Panchos',       emoji: '🌭' },
  { id: 'hamburguesas',  name: 'Hamburguesas',  emoji: '🍔' },
  { id: 'aderezos',      name: 'Aderezos',      emoji: '🧴' },
  { id: 'mccain',        name: 'McCain',        emoji: '🍟' },
  { id: 'alfajores',     name: 'Alfajores',     emoji: '🍫' },
  { id: 'fideos',        name: 'Fideos',        emoji: '🍝' },
  { id: 'panificados', name: 'Panificados', emoji: '🍞' },
]

export const initialProducts = [
  { id: 1,  name: 'Helado Frutilla 500ml',    desc: 'Cremoso artesanal',      price: 1200, emoji: '🍓', cat: 'helados',      showPrice: true,  active: true },
  { id: 2,  name: 'Helado Chocolate 500ml',   desc: 'Sabor intenso',          price: 1200, emoji: '🍫', cat: 'helados',      showPrice: true,  active: true },
  { id: 3,  name: 'Helado Dulce de Leche',    desc: 'El clásico argentino',   price: 1350, emoji: '🍨', cat: 'helados',      showPrice: true,  active: true },
  { id: 4,  name: 'Papas McCain Noisettes 2.5kg',          desc: 'Bolsa', price: 20300, emoji: '🍟', image: '/mcnoi.png',      cat: 'mccain', showPrice: true, active: true },
  { id: 63, name: 'Papas McCain Noisettes x4 bolsas',      desc: 'Caja', price: 77600, emoji: '🍟', image: '/mcnoi.png',      cat: 'mccain', showPrice: true, active: true },
  { id: 5,  name: 'Papas McCain Smiles 1.5kg',             desc: 'Bolsa', price: 12200, emoji: '🍟', image: '/mcsmile.png',        cat: 'mccain', showPrice: true, active: true },
  { id: 64, name: 'Papas McCain Smiles x6 bolsas',         desc: 'Caja', price: 70000, emoji: '🍟', image: '/mcsmile.png',        cat: 'mccain', showPrice: true, active: true },
  { id: 65, name: 'Papas McCain Corte Tradicional 2.5kg',  desc: 'Bolsa', price: 12100, emoji: '🍟', image: '/mctradi.png', cat: 'mccain', showPrice: true, active: true },
  { id: 66, name: 'Papas McCain Corte Tradicional x6',     desc: 'Caja', price: 70000, emoji: '🍟', image: '/mctradi.png', cat: 'mccain', showPrice: true, active: true },
  { id: 6,  name: 'Panchos Viena x10',        desc: 'Listos para hervir',     price: 1100, emoji: '🌭', cat: 'panchos',      showPrice: true,  active: true },
  { id: 7,  name: 'Hamburguesa Vacuna x4',    desc: '100% vacuno, 120g c/u',  price: 1600, emoji: '🍔', cat: 'hamburguesas', showPrice: true,  active: true },
{ id: 8,  name: 'Alfajor Mr.Bob Negro x18',    desc: 'Mr. Bob', price: 15200, emoji: '🍫', image: '/mrbobnegro.png',  cat: 'alfajores', showPrice: true, active: true },
  { id: 60, name: 'Alfajor Mr.Bob Blanco x18',   desc: 'Mr. Bob', price: 15200, emoji: '🍫', image: '/mrbobbco.png',   cat: 'alfajores', showPrice: true, active: true },
  { id: 61, name: 'Alfajor Orense Blanco x12',   desc: 'Orense Premium', price: 10600, emoji: '🍪', image: '/orensebco.png',   cat: 'alfajores', showPrice: true, active: true },
  { id: 62, name: 'Alfajor Orense Negro x12',    desc: 'Orense Premium', price: 10600, emoji: '🍪', image: '/orensenegro.png', cat: 'alfajores', showPrice: true, active: true },
  { id: 9,  name: 'Coca Cola 2.25L',          desc: '',                       price: 1050, emoji: '🥤', cat: 'bebidas',      showPrice: true,  active: true },
  { id: 10, name: 'Mayonesa Hellmanns 500g',  desc: '',                       price: 980,  emoji: '🧴', cat: 'aderezos',     showPrice: false, active: true },
  { id: 51, name: 'Fideos Nidos N1 Al Huevo 500g',      desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/n1.png',       cat: 'fideos', showPrice: true, active: true },
  { id: 52, name: 'Fideos Nidos N2 Al Huevo 500g',      desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/n2.png',       cat: 'fideos', showPrice: true, active: true },
  { id: 53, name: 'Fideos Nidos N3 Al Huevo 500g',      desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/n3.png',       cat: 'fideos', showPrice: true, active: true },
  { id: 54, name: 'Fideos Nidos N4 Espinaca 500g',      desc: 'A la Buena de Dios', price: 3200, emoji: '🍝', image: '/verdu.png',    cat: 'fideos', showPrice: true, active: true },
  { id: 55, name: 'Guiseros Al Huevo Codo 500g',        desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/codito.png',   cat: 'fideos', showPrice: true, active: true },
  { id: 56, name: 'Guiseros Al Huevo Moños 500g',       desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/moños.png',    cat: 'fideos', showPrice: true, active: true },
  { id: 57, name: 'Guiseros Al Huevo Moñitos Sopa 500g',desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/moñitos.png',  cat: 'fideos', showPrice: true, active: true },
  { id: 58, name: 'Guiseros Al Huevo Mostachol 500g',   desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/moztachol.png',cat: 'fideos', showPrice: true, active: true },
  { id: 59, name: 'Guiseros Al Huevo Tirabuson 500g',   desc: 'A la Buena de Dios', price: 2500, emoji: '🍝', image: '/tirabu.png',   cat: 'fideos', showPrice: true, active: true },
  { id: 13, name: 'Empanadas Congeladas x12', desc: 'Carne suave',            price: 1800, emoji: '🥟', cat: 'congelados',   showPrice: true,  active: true },
  { id: 12,  name: 'Papas Fritas Clásicas 70g',        desc: '',  price: 700,  emoji: '🍟', image: '/papa-clas70.svg',  cat: 'snacks', showPrice: true, active: true },
  { id: 15, name: 'Papas Fritas Corte Americano 70g',  desc: '', price: 700,  emoji: '🍟', image: '/papa-ame70.svg',   cat: 'snacks', showPrice: true, active: true },
  { id: 16, name: 'Chisitos Queso 100g',               desc: '', price: 630,  emoji: '🧀', image: '/palito-queso.svg',  cat: 'snacks', showPrice: true, active: true },
  { id: 17, name: 'Papas Pay 1kg',                     desc: '', price: 8100, emoji: '🥔', image: '/paykg.svg',        cat: 'snacks', showPrice: true, active: true },
  { id: 18, name: 'Papas Pay 80g',                     desc: '', price: 780,  emoji: '🥔', image: '/pay80.svg',        cat: 'snacks', showPrice: true, active: true },
  { id: 19, name: 'Palitos Salados Queso 120g',        desc: '', price: 690,  emoji: '🥖', image: '/palito-queso.svg',  cat: 'snacks', showPrice: true, active: true },
  { id: 20, name: 'Palitos Salados Jamón 120g',        desc: '', price: 820,  emoji: '🥖', image: '/palito-jamon.svg',  cat: 'snacks', showPrice: true, active: true },
  { id: 21, name: 'Palitos Salados Clásicos 120g',     desc: '', price: 730,  emoji: '🥖', image: '/palito-clas.svg',   cat: 'snacks', showPrice: true, active: true },
  { id: 22, name: 'Maní Frito Salado 150g',            desc: '', price: 1170, emoji: '🥜', image: '/mani.svg',          cat: 'snacks', showPrice: true, active: true },
  { id: 23, name: 'Rueditas de Queso 70g',             desc: '', price: 460,  emoji: '🧀', image: '/ruedita.svg',       cat: 'snacks', showPrice: true, active: true },
  { id: 24, name: 'Papas Fritas Clásicas 500g',        desc: '', price: 4600, emoji: '🍟', image: '/papa-clas500.svg', cat: 'snacks', showPrice: true, active: true },
  { id: 25, name: 'Papas Fritas Corte Americano 500g', desc: '', price: 4600, emoji: '🍟', image: '/papa-ame500.svg',  cat: 'snacks', showPrice: true, active: true },// --- PANIFICADOS - PANES DE HAMBURGUESA ---
  { id: 36, name: 'Pan de Hamburguesa Tipo Mostaza x4', desc: 'Mi Mago', price: 1200, emoji: '🍔', image: '/panmostaza.png', cat: 'panificados', showPrice: true, active: true },
  { id: 37, name: 'Pan de Hamburguesa de Papa x4',      desc: 'Mi Mago', price: 1550, emoji: '🍔', image: '/panpapa.png',    cat: 'panificados', showPrice: true, active: true },
  { id: 38, name: 'Pan Hamburguesa Maxi sin Sésamo x4', desc: 'Mi Mago', price: 1300, emoji: '🍔', image: '/maxicon.png',    cat: 'panificados', showPrice: true, active: true },
  { id: 39, name: 'Pan Hamburguesa Maxi con Sésamo x4', desc: 'Mi Mago', price: 1200, emoji: '🍔', image: '/maxisin.png',    cat: 'panificados', showPrice: true, active: true },
  { id: 40, name: 'Pan Hamburguesa Común con Sésamo x4',desc: 'Mi Mago', price: 1150, emoji: '🍔', image: '/hamburcon.png',  cat: 'panificados', showPrice: true, active: true },
  { id: 41, name: 'Pan Hamburguesa Común sin Sésamo x4',desc: 'Mi Mago', price: 1050, emoji: '🍔', image: '/hambursin.png',  cat: 'panificados', showPrice: true, active: true },
  // --- PANIFICADOS - PANCHOS ---
  { id: 42, name: 'Pan para Pancho Largo x6',           desc: 'Mi Mago', price: 1500, emoji: '🌭', image: '/superpancho.png',cat: 'panificados', showPrice: true, active: true },
  { id: 43, name: 'Pan para Pancho Corto x6',           desc: 'Mi Mago', price: 1200, emoji: '🌭', image: '/panchocorto.png',  cat: 'panificados', showPrice: true, active: true },
  // --- PANIFICADOS - LACTAL MI MAGO ---
  { id: 44, name: 'Lactal Blanco Grande',               desc: 'Mi Mago', price: 2450, emoji: '🍞', image: '/lactalgde.png',  cat: 'panificados', showPrice: true, active: true },
  { id: 45, name: 'Lactal Blanco Chico',                desc: 'Mi Mago', price: 1600, emoji: '🍞', image: '/lactalchico.png',  cat: 'panificados', showPrice: true, active: true },
  { id: 46, name: 'Lactal Salvado Grande',              desc: 'Mi Mago', price: 2600, emoji: '🍞', image: '/salvadogde.png', cat: 'panificados', showPrice: true, active: true },
  { id: 47, name: 'Lactal Salvado Chico',               desc: 'Mi Mago', price: 1800, emoji: '🍞', image: '/salvadochico.png', cat: 'panificados', showPrice: true, active: true },
  // --- PANIFICADOS - LACTAL TIO GUIS ---
  { id: 48, name: 'Lactal Multicereal',                 desc: 'Tío Guis', price: 2100, emoji: '🍞', image: '/tiomulti.png',  cat: 'panificados', showPrice: true, active: true },
  { id: 49, name: 'Lactal Doble Integral',              desc: 'Tío Guis', price: 1800, emoji: '🍞', image: '/tiodoble.png',  cat: 'panificados', showPrice: true, active: true },
  { id: 50, name: 'Pan de Campo',                       desc: 'Tío Guis', price: 1800, emoji: '🍞', image: '/tiocampo.png',  cat: 'panificados', showPrice: true, active: true },
]

// ============================================================
//  CONFIGURACIÓN GENERAL — cambiá estos valores por los tuyos
// ============================================================
export const initialConfig = {
  businessName:  'QUEEN HELADOS BERNAL',
  tagline:       'Tu distribuidora de confianza',
  waNumber:      '5491127176917',   // Tu número sin + (ej: 5491155550000)
  greeting:      'Hola, quiero hacer este pedido:',
  farewell:      'Gracias',
  showTotals:    true,
  adminPassword: '1234',            // Cambiá esta clave
}

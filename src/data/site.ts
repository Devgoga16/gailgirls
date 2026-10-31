// Datos de Gail Girls. Todo lo que aparece aquí está confirmado en su Instagram (@gailgirls)
// o en su página de Facebook (octubre 2026). Lo que no está confirmado se muestra como
// "Consulta precio" o se pregunta por WhatsApp; no se inventan precios ni condiciones.

export const NEGOCIO = {
  nombre: 'Gail Girls',
  firma: 'By Abby Pardo',
  whatsapp: '51986687129',
  telefono: '986 687 129',
  correo: 'gailgirls.spa.2020@gmail.com',
  instagram: 'https://www.instagram.com/gailgirls/',
  facebook: 'https://www.facebook.com/profile.php?id=100063835320524',
  horario: 'Lunes a domingo, 10:00 a. m. – 8:00 p. m.',
  horarioCorto: 'Lun – Dom · 10 a. m. – 8 p. m.',
};

export const SEDES = [
  {
    id: 'santa-luzmila',
    nombre: 'Sede Santa Luzmila',
    direccion: 'Av. Guillermo de la Fuente 354',
    distrito: 'Comas, Lima Norte',
    mapa: 'Av. Guillermo de la Fuente 354, Comas, Lima, Perú',
  },
  {
    id: 'la-pascana',
    nombre: 'Sede La Pascana',
    direccion: 'Av. Túpac Amaru 3664, Urb. La Pascana',
    distrito: 'Comas, Lima Norte',
    mapa: 'Av. Túpac Amaru 3664, La Pascana, Comas, Lima, Perú',
  },
];

export type Servicio = {
  id: string;
  categoria: string;
  nombre: string;
  detalle: string;
  /** Precio confirmado en redes. Si no hay, se muestra "Consulta precio". */
  precio?: string;
  etiqueta?: string;
};

export const CATEGORIAS = [
  { id: 'unas', nombre: 'Uñas', icono: 'nail' },
  { id: 'pies', nombre: 'Pies', icono: 'foot' },
  { id: 'pestanas', nombre: 'Pestañas', icono: 'lash' },
  { id: 'cejas', nombre: 'Cejas', icono: 'brow' },
  { id: 'rostro', nombre: 'Rostro y depilación', icono: 'face' },
];

export const SERVICIOS: Servicio[] = [
  { id: 'acrilicas', categoria: 'unas', nombre: 'Uñas acrílicas', detalle: 'Largo y forma a tu gusto: coffin, almendrada, cuadrada o stiletto.'},
  { id: 'polygel', categoria: 'unas', nombre: 'Uñas en polygel', detalle: 'Resistentes y ligeras. Te asesoramos si te conviene más que el softgel.' },
  { id: 'softgel', categoria: 'unas', nombre: 'Uñas en softgel', detalle: 'Acabado natural y cómodo, ideal para el día a día.' },
  { id: 'semipermanente', categoria: 'unas', nombre: 'Esmaltado semipermanente', detalle: 'Color y brillo que duran, sobre tu uña natural.' },
  { id: 'frances', categoria: 'unas', nombre: 'Francés', detalle: 'Clásico, redondo, largo, diagonal, en V… el francés que va contigo.' },
  { id: 'baby-boomer', categoria: 'unas', nombre: 'Baby boomer', detalle: 'El degradado blanco y nude más pedido. Tenemos catálogo con modelos en promo.', etiqueta: 'En promo' },
  { id: 'ojo-de-gato', categoria: 'unas', nombre: 'Ojo de gato', detalle: 'Efecto magnético con brillo y profundidad.' },
  { id: 'nail-art', categoria: 'unas', nombre: 'Nail art y diseño personalizado', detalle: '¿Tienes una foto de referencia? Tráela y la hacemos realidad.' },
  { id: 'pedicure', categoria: 'pies', nombre: 'Pedicure', detalle: 'Pies cuidados y bonitos, con el acabado que elijas.' },
  { id: 'extensiones', categoria: 'pestanas', nombre: 'Extensiones de pestañas', detalle: 'Pelo a pelo, para una mirada que cambia todo.', precio: 'Desde S/ 55'},
  { id: 'lifting', categoria: 'pestanas', nombre: 'Lifting de pestañas', detalle: 'Curvatura y volumen a tus pestañas naturales.' },
  { id: 'cejas', categoria: 'cejas', nombre: 'Cejas', detalle: 'Te asesoramos según tu rostro y el resultado que buscas.' },
  { id: 'pigmentacion', categoria: 'cejas', nombre: 'Pigmentaciones', detalle: 'Consulta por WhatsApp la técnica y el tiempo de cada sesión.' },
  { id: 'faciales', categoria: 'rostro', nombre: 'Faciales', detalle: 'Un momento para cuidar y renovar tu piel.' },
  { id: 'mascarillas', categoria: 'rostro', nombre: 'Mascarillas', detalle: 'El complemento ideal para tu facial.' },
  { id: 'depilacion', categoria: 'rostro', nombre: 'Depilaciones', detalle: 'Consulta zonas y disponibilidad en tu sede.' },
];

export type Diseno = {
  id: string;
  nombre: string;
  filtro: string;
  img: string;
  alt: string;
  servicio: string;
};

// Fotos reales de trabajos publicados en @gailgirls.
export const DISENOS: Diseno[] = [
  { id: 'baby-boomer', nombre: 'Baby boomer con flores', filtro: 'tendencia', img: '/assets/img/hero-baby-boomer.webp', alt: 'Uñas cuadradas baby boomer con flores en relieve y brillos', servicio: 'baby-boomer' },
  { id: 'frances-floral', nombre: 'Francés con detalles', filtro: 'frances', img: '/assets/img/frances-floral.webp', alt: 'Uñas almendradas con francés blanco y negro y flores pintadas a mano', servicio: 'frances' },
  { id: 'ojo-de-gato', nombre: 'Lunares y ojo de gato', filtro: 'tendencia', img: '/assets/img/ojo-de-gato.webp', alt: 'Uñas almendradas con lunares negros sobre base gris translúcida', servicio: 'ojo-de-gato' },
  { id: 'baby-shower', nombre: 'Uñas baby shower', filtro: 'ocasiones', img: '/assets/img/baby-shower.webp', alt: 'Uñas en tonos pastel con piecitos rosados y celestes', servicio: 'nail-art' },
  { id: 'pestanas', nombre: 'Extensiones de pestañas', filtro: 'pestanas', img: '/assets/img/pestanas.webp', alt: 'Clienta con extensiones de pestañas pelo a pelo', servicio: 'extensiones' },
];

export const FILTROS_DISENO = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'tendencia', nombre: 'Tendencia' },
  { id: 'frances', nombre: 'Francés' },
  { id: 'ocasiones', nombre: 'Ocasiones especiales' },
  { id: 'pestanas', nombre: 'Pestañas' },
];

export const EQUIPO = ['Deisy', 'Amelia', 'Cielo', 'Yubell'];

export const waLink = (texto: string) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(texto)}`;

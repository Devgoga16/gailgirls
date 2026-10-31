# Gail Girls · Propuesta de web

Web para **Gail Girls By Abby Pardo**, salón de uñas, cejas y pestañas con dos sedes en Comas (Lima Norte). Construida con [Astro](https://astro.build) como sitio estático, igual que las otras propuestas.

## Cómo usarlo

```bash
npm install
npm run dev       # http://localhost:4330
npm run build     # genera el sitio estático en dist/
npm run preview
```

## Lo que encontramos en sus redes (octubre 2026)

- **Qué es:** salón de belleza, no tienda de productos. Instagram: “Expertas en Uñas, Cejas, Pestañas”. Facebook: uñas acrílicas, faciales, mascarillas, pigmentaciones, lifting de pestañas, depilaciones y pedicure.
- **Técnicas y estilos que publican:** acrílicas, polygel, softgel, semipermanente, francés (7 estilos), baby boomer, ojo de gato, nail art, uñas baby shower, formas coffin/almendrada/cuadrada/stiletto, extensiones de pestañas pelo a pelo. “Trae tu diseño y lo hacemos realidad”.
- **Sedes:** Santa Luzmila (Av. Guillermo de la Fuente 354) y La Pascana (Av. Túpac Amaru 3664).
- **Horario:** lunes a domingo, 10 a. m. – 8 p. m.
- **Contacto:** WhatsApp 986 687 129 · gailgirls.spa.2020@gmail.com.
- **Precios publicados:** solo extensiones de pestañas, desde S/ 55. “Catálogo con muchos modelos en promo” (baby boomer).
- **Equipo Santa Luzmila:** Deisy, Amelia, Cielo y Yubell.
- **Comunidad:** ~11 mil seguidores en Facebook, ~4.9 mil en Instagram.

## Decisiones de la propuesta

El brief pedía una tienda virtual con productos y colecciones. Como Gail Girls vende **servicios**, la “tienda” se adaptó a un **catálogo de servicios con reserva**:

- **Mi cita** (funciona como un carrito): la clienta agrega uno o varios servicios, elige sede y día, y se envía todo armado por WhatsApp.
- **Reserva rápida** bajo el hero, en un solo paso.
- **Galería de diseños** con filtros y botón “Lo quiero”, que abre WhatsApp con el nombre del diseño. Incluye “Envía tu propio diseño”.
- **Promos y novedades**: solo con lo confirmado (baby boomer en promo, pestañas desde S/ 55, uñas baby shower). Se actualiza en `src/pages/index.astro`.
- **Envíos → Sedes**: no aplica a un salón, así que se reemplazó por mapas, “Cómo llegar” y reserva por sede.
- **Métodos de pago:** no están publicados, así que la FAQ dice que se confirman al reservar.
- Barra fija en móvil con “Mi cita” + WhatsApp siempre visibles.
- Fotos reales de su Instagram, recortadas sin los textos superpuestos.

## Pendiente de confirmar con el cliente

1. **Precios** de cada servicio (hoy dice “Consulta precio”, salvo pestañas). Se cambian en `src/data/site.ts`.
2. **Medios de pago** (Yape, Plin, efectivo, tarjeta…) para mostrarlos en la FAQ y en la reserva.
3. **Promos vigentes** con fechas y condiciones.
4. Si el equipo de **La Pascana** quiere aparecer también, y fotos del local.
5. Si **venden productos** (esmaltes, kits, etc.). Si es así, se agrega una sección de tienda con el mismo flujo de pedido por WhatsApp.
6. **Logo en vector** (SVG). Hoy se usa una versión PNG con el fondo blanco removido.
7. **Libro de Reclamaciones virtual** (obligatorio en Perú si se publica la web como canal de venta).
8. Dominio real (cambiar `site` en `astro.config.mjs`).

## Siguientes fases sugeridas

- Reservas con horario en tiempo real (Calendly, Cal.com o un sistema propio) cuando el volumen lo justifique.
- Catálogo de diseños administrable (CMS) para que el salón suba sus trabajos sin tocar código.
- Pago en línea de un adelanto para separar la cita.
- Programa de referidas o tarjeta de fidelidad (“tu 5.ª cita con descuento”).

## Estructura

- `src/data/site.ts`: datos del negocio, sedes, servicios, diseños y equipo.
- `src/layouts/Base.astro`: topbar, header, menú móvil, footer, WhatsApp flotante y panel “Mi cita”.
- `src/pages/index.astro`: todas las secciones.
- `src/scripts/main.ts`: filtros, “Mi cita” (guardada en `localStorage`) y formularios que abren WhatsApp.
- `src/styles/global.css`: identidad visual (rosa del salón + café y dorado del logo; Fraunces + Outfit).
- `public/assets/img/`: fotos de Instagram optimizadas en WebP y logo.

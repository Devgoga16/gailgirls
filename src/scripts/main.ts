// Interacciones del sitio: menú móvil, filtros, "Mi cita" y formularios que abren WhatsApp.

const WA = '51986687129';
const STORE_KEY = 'gailgirls-cita';

type Servicio = { id: string; nombre: string; precio?: string };
const servicios: Servicio[] = JSON.parse(document.getElementById('servicios-data')?.textContent || '[]');
const byId = (id: string) => servicios.find((s) => s.id === id);

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

const openWhatsApp = (text: string) => {
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
};

const formatFecha = (value: string) => {
  if (!value) return '';
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });
};

// Fecha mínima: hoy
const hoy = new Date();
const hoyISO = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
$$<HTMLInputElement>('input[type="date"]').forEach((i) => (i.min = hoyISO));

/* ---------- Header con sombra al hacer scroll ---------- */
const header = $('#header');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Menú móvil ---------- */
const mobileNav = $('#mobile-nav');
const menuOpen = $('[data-menu-open]');
const setMenu = (open: boolean) => {
  mobileNav?.classList.toggle('open', open);
  mobileNav?.setAttribute('aria-hidden', String(!open));
  menuOpen?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
menuOpen?.addEventListener('click', () => setMenu(true));
$('[data-menu-close]')?.addEventListener('click', () => setMenu(false));
$$('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setMenu(false)));

/* ---------- Pestañas de servicios ---------- */
const tabs = $$<HTMLButtonElement>('[data-tab]');
const selectTab = (id: string) => {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  $$<HTMLElement>('[data-service-grid] .service').forEach((card) => {
    card.hidden = id !== 'todos' && card.dataset.cat !== id;
  });
};
tabs.forEach((t) => t.addEventListener('click', () => selectTab(t.dataset.tab!)));
$$<HTMLAnchorElement>('[data-tab-link]').forEach((a) => a.addEventListener('click', () => selectTab(a.dataset.tabLink!)));

/* ---------- Filtros de diseños ---------- */
const chips = $$<HTMLButtonElement>('[data-filter]');
chips.forEach((chip) =>
  chip.addEventListener('click', () => {
    const f = chip.dataset.filter!;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    $$<HTMLElement>('.design[data-group]').forEach((d) => {
      d.hidden = f !== 'todos' && d.dataset.group !== f;
    });
  }),
);

/* ---------- Mi cita ---------- */
const load = (): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(v) ? v.filter((id) => byId(id)) : [];
  } catch {
    return [];
  }
};
let cita = load();
const save = () => {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(cita)); } catch { /* sin almacenamiento: la cita vive solo en esta visita */ }
};

const drawer = $('#drawer');
const overlay = $('[data-cita-overlay]');
const setDrawer = (open: boolean) => {
  drawer?.classList.toggle('open', open);
  overlay?.classList.toggle('open', open);
  drawer?.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) setTimeout(() => $<HTMLButtonElement>('[data-close-cita]', drawer!)?.focus(), 50);
};
$$('[data-open-cita]').forEach((b) => b.addEventListener('click', () => { hideToast(); setDrawer(true); }));
$$('[data-close-cita]').forEach((b) => b.addEventListener('click', () => setDrawer(false)));
overlay?.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  setDrawer(false);
  setMenu(false);
});

const iconTrash = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>';

const render = () => {
  const list = $('[data-cita-list]')!;
  list.innerHTML = '';
  cita.forEach((id) => {
    const s = byId(id)!;
    const li = document.createElement('li');
    li.innerHTML = `<div><strong></strong><small></small></div><button type="button" aria-label="Quitar">${iconTrash}</button>`;
    li.querySelector('strong')!.textContent = s.nombre;
    li.querySelector('small')!.textContent = s.precio ?? 'Precio a consultar';
    li.querySelector('button')!.addEventListener('click', () => toggle(id));
    list.appendChild(li);
  });
  const empty = cita.length === 0;
  $('[data-cita-empty]')!.hidden = !empty;
  $('[data-cita-form]')!.hidden = empty;
  ($('[data-cita-send]') as HTMLButtonElement).disabled = empty;
  $('[data-cita-send]')!.style.opacity = empty ? '.5' : '';

  $$('[data-cita-count]').forEach((el) => {
    el.textContent = String(cita.length);
    el.classList.toggle('has', cita.length > 0);
  });
  $$<HTMLButtonElement>('[data-add]').forEach((b) => {
    const on = cita.includes(b.dataset.add!);
    b.classList.toggle('added', on);
    b.querySelector('span')!.textContent = on ? 'Agregado' : 'Agregar';
    b.querySelector('svg')!.innerHTML = on ? '<path d="m5 12.5 4.5 4.5L19 7.5"/>' : '<path d="M12 5v14M5 12h14"/>';
  });
};

const toast = $('[data-toast]');
let toastTimer: number | undefined;
const hideToast = () => toast?.classList.remove('show');
const showToast = (msg: string) => {
  if (!toast) return;
  $('[data-toast-text]', toast)!.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(hideToast, 3200);
};

const toggle = (id: string) => {
  const had = cita.includes(id);
  cita = had ? cita.filter((x) => x !== id) : [...cita, id];
  save();
  render();
  if (!had) {
    showToast(`${byId(id)?.nombre} agregado a tu cita`);
    $$('[data-cita-count]').forEach((el) => {
      el.classList.remove('bump');
      void (el as HTMLElement).offsetWidth;
      el.classList.add('bump');
    });
  }
};
$$<HTMLButtonElement>('[data-add]').forEach((b) => b.addEventListener('click', () => toggle(b.dataset.add!)));

$('[data-cita-send]')?.addEventListener('click', () => {
  if (!cita.length) return;
  const form = $<HTMLFormElement>('[data-cita-form]')!;
  const data = new FormData(form);
  const nombre = String(data.get('nombre') || '').trim();
  const fecha = formatFecha(String(data.get('fecha') || ''));
  const lineas = cita.map((id) => {
    const s = byId(id)!;
    return `• ${s.nombre}${s.precio ? ` (${s.precio})` : ''}`;
  });
  const msg = [
    `¡Hola Gail Girls! 💅${nombre ? ` Soy ${nombre}.` : ''} Quisiera reservar una cita:`,
    '',
    ...lineas,
    '',
    `📍 ${data.get('sede')}`,
    fecha ? `🗓️ ${fecha}` : '🗓️ Día por coordinar',
    '',
    '¿Qué horarios tienen disponibles?',
  ].join('\n');
  openWhatsApp(msg);
});

render();

/* ---------- Reserva rápida ---------- */
$<HTMLFormElement>('[data-quick-form]')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget as HTMLFormElement);
  const nombre = String(data.get('nombre') || '').trim();
  const fecha = formatFecha(String(data.get('fecha') || ''));
  openWhatsApp(
    [
      `¡Hola Gail Girls! 💅${nombre ? ` Soy ${nombre}.` : ''} Quisiera reservar:`,
      `• ${data.get('servicio')}`,
      `📍 ${data.get('sede')}`,
      fecha ? `🗓️ ${fecha}` : '🗓️ Día por coordinar',
      '¿Qué horarios tienen disponibles?',
    ].join('\n'),
  );
});

/* ---------- Formulario de contacto ---------- */
$<HTMLFormElement>('[data-contact-form]')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget as HTMLFormElement);
  const partes = [`¡Hola Gail Girls! Soy ${String(data.get('nombre')).trim()}.`];
  if (data.get('servicio')) partes.push(`Me interesa: ${data.get('servicio')}`);
  if (data.get('sede')) partes.push(`Sede: ${data.get('sede')}`);
  partes.push('', String(data.get('mensaje')).trim());
  openWhatsApp(partes.join('\n'));
});

/* ---------- Aparición al hacer scroll ---------- */
const reveals = $$('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

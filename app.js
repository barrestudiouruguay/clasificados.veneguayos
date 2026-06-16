// ============================================================
// CLASIFICADOS VENEGUAYOS — app.js v4
// ============================================================

let _sb = null;
function getSupabase() {
  if (!_sb) _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _sb;
}

// ── Rubros ───────────────────────────────────────────────────
const IC = `fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
const RUBROS = {
  admin:          { label:'Administración y oficina',      svg:`<svg viewBox="0 0 32 32" ${IC}><rect x="6" y="4" width="20" height="24" rx="2"/><path d="M11 10h10M11 15h10M11 20h6"/></svg>` },
  ventas:         { label:'Ventas y comercial',            svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="10" cy="24" r="2"/><circle cx="22" cy="24" r="2"/><path d="M4 6h3l3 12h10l2-8H9"/></svg>` },
  atencion:       { label:'Atención al cliente',           svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M8 18a8 8 0 0 1 16 0"/><path d="M6 18h3v6H6ZM23 18h3v6h-3Z"/><path d="M23 24v1a3 3 0 0 1-3 3h-3"/></svg>` },
  marketing:      { label:'Marketing y comunicación',      svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="16" cy="16" r="4"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8"/></svg>` },
  tecnologia:     { label:'Tecnología / informática',      svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M12 11 7 16l5 5M20 11l5 5-5 5M18 8.5 14.5 23.5"/></svg>` },
  contabilidad:   { label:'Contabilidad y finanzas',       svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M6 6h20v20H6Z"/><path d="M10 16h4M10 20h4M18 10v12"/></svg>` },
  rrhh:           { label:'Recursos humanos',              svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="16" cy="10" r="4"/><path d="M8 26a8 8 0 0 1 16 0"/></svg>` },
  legal:          { label:'Legal',                         svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M16 4v24M8 12l8-8 8 8"/><path d="M10 20h12"/></svg>` },
  ingenieria:     { label:'Ingeniería y arquitectura',     svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M6 26L16 6l10 20"/><path d="M10 18h12"/></svg>` },
  construccion:   { label:'Construcción',                  svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M7 21a9 9 0 0 1 18 0"/><path d="M5 21h22"/></svg>` },
  industria:      { label:'Industria y producción',        svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M4 26V14l8-6v6l8-6v6l8-6v12"/><path d="M4 26h24"/></svg>` },
  logistica:      { label:'Logística y transporte',        svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M16 5 27 10.5V21.5L16 27 5 21.5V10.5Z"/><path d="M5 10.5 16 16l11-5.5M16 16v11"/></svg>` },
  cadeteria:      { label:'Cadetería / delivery',          svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="10" cy="24" r="2"/><circle cx="24" cy="24" r="2"/><path d="M4 10h14v10H4ZM18 14h6l4 4v6h-4"/></svg>` },
  gastronomia:    { label:'Gastronomía',                   svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M9 6v6a3 3 0 0 0 6 0V6M12 6v20M22 6c3 1 3 8 0 9v11"/></svg>` },
  hoteleria:      { label:'Hotelería y turismo',           svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M6 26V10l10-6 10 6v16"/><path d="M13 26v-6h6v6"/><path d="M10 14h2M20 14h2M10 18h2M20 18h2"/></svg>` },
  salud:          { label:'Salud',                         svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="16" cy="16" r="11"/><path d="M16 10v12M10 16h12"/></svg>` },
  educacion:      { label:'Educación',                     svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M16 6 4 13l12 7 12-7Z"/><path d="M4 13v8M20 15v7a8 4 0 0 1-8 0v-7"/></svg>` },
  limpieza:       { label:'Limpieza y mantenimiento',      svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M10 13h12l-1.6 13H11.6Z"/><path d="M10 13a6 3 0 0 1 12 0"/></svg>` },
  seguridad:      { label:'Seguridad',                     svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8Z"/></svg>` },
  servicios:      { label:'Servicios generales',           svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="16" cy="16" r="3"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.8 7.8l2.8 2.8M21.4 21.4l2.8 2.8M7.8 24.2l2.8-2.8M21.4 10.6l2.8-2.8"/></svg>` },
  oficios:        { label:'Oficios',                       svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M8 24l14-14M18 6l8 8-4 4-8-8Z"/><path d="M6 22l4 4-4 2Z"/></svg>` },
  domestico:      { label:'Trabajo doméstico',             svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M6 16L16 6l10 10v12H6Z"/><path d="M13 28v-8h6v8"/></svg>` },
  agro:           { label:'Agricultura / agro',            svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M16 28V14"/><path d="M16 14C16 8 8 6 6 10c4 0 6 2 10 4"/><path d="M16 14c0-6 8-8 10-4-4 0-6 2-10 4"/></svg>` },
  cuidados:       { label:'Cuidados y asistencia',         svg:`<svg viewBox="0 0 32 32" ${IC}><path d="M16 27s-11-6.5-11-14a7 7 0 0 1 11-5.74A7 7 0 0 1 27 13c0 7.5-11 14-11 14z"/></svg>` },
  otros:          { label:'Otros empleos',                 svg:`<svg viewBox="0 0 32 32" ${IC}><circle cx="10" cy="16" r="2"/><circle cx="16" cy="16" r="2"/><circle cx="22" cy="16" r="2"/></svg>` },
};

function catLabel(id) { return (RUBROS[id]||{label:id}).label; }
function catTone(id) { return 'azul'; }

function rubroChip(id) {
  const r = RUBROS[id] || { label: id, svg:'' };
  return `<span style="display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:999px;background:rgba(46,125,177,.1);color:var(--azul);font-weight:700;font-size:13px;line-height:1;">
    <span style="width:16px;height:16px;flex-shrink:0;">${r.svg}</span>${r.label}
  </span>`;
}

// ── SVG Icons ─────────────────────────────────────────────────
const IconGlobe = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>`;
const IconMail  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`;
const IconPin   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
const IconClock = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
const IconWA    = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#1FA855"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;

const LOGO_SVG_COLOR = `<svg viewBox="0 0 120 96" xmlns="http://www.w3.org/2000/svg">
  <text x="2" y="72" font-family="Arial Black,sans-serif" font-weight="900" font-size="80" fill="#2E7DB1">C</text>
  <text x="52" y="72" font-family="Arial Black,sans-serif" font-weight="900" font-size="80" fill="#8E1F3F">V</text>
  <circle cx="84" cy="18" r="8" fill="#E0A53A"/>
  <polygon points="84,4 86,14 96,14 88,20 91,30 84,24 77,30 80,20 72,14 82,14" fill="#E0A53A"/>
  <polygon points="84,32 85.5,37 90,37 86.5,39.5 88,44 84,41.5 80,44 81.5,39.5 78,37 82.5,37" fill="#2E7DB1"/>
  <polygon points="84,46 85.5,51 90,51 86.5,53.5 88,58 84,55.5 80,58 81.5,53.5 78,51 82.5,51" fill="#8E1F3F"/>
</svg>`;

const LOGO_SVG_WHITE = LOGO_SVG_COLOR.replace(/#2E7DB1/g,'#fff').replace(/#8E1F3F/g,'#fff').replace(/#E0A53A/g,'#E0A53A');

const flagBar = (cls='') => `<div class="flag-bar ${cls}"><div class="f1"></div><div class="f2"></div><div class="f3"></div></div>`;

const logoRow = (v='color') => `<a class="logo-row" href="index.html">
  <div style="width:40px;height:34px;flex-shrink:0;">${v==='white'?LOGO_SVG_WHITE:LOGO_SVG_COLOR}</div>
  <div class="logo-words"><div class="w1">CLASIFICADOS</div><div class="w2">VENEGUAYOS</div></div>
</a>`;

// ── Nav ───────────────────────────────────────────────────────
function renderHeader(active) {
  const links = [
    ['index.html','Inicio'],
    ['nosotros.html','Nosotros'],
    ['empleos.html','Empleos'],
    ['alojamiento.html','Alojamientos'],
    ['publicar.html','Publicar anuncio'],
  ].map(([h,l]) => `<a href="${h}" class="${active===h?'active':''}">${l}</a>`).join('');
  return `<header class="site-header">
    <div class="header-inner">
      ${logoRow('color')}
      <nav class="site-nav">${links}<a href="admin.html" class="btn-admin">⚙ Admin</a></nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          ${logoRow('white')}
          <p>Conectando migrantes y personas de cualquier nacionalidad con oportunidades reales en Uruguay desde 2014.</p>
        </div>
        <div class="footer-col">
          <h4>Navegar</h4>
          <a href="index.html">Inicio</a>
          <a href="nosotros.html">Nosotros</a>
          <a href="empleos.html">Empleos</a>
          <a href="alojamiento.html">Alojamientos</a>
          <a href="publicar.html">Publicar anuncio</a>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <a href="https://instagram.com/clasificados.veneguayos" target="_blank">📷 @clasificados.veneguayos</a>
          <a href="mailto:clasificados.veneguayos@gmail.com">✉ clasificados.veneguayos@gmail.com</a>
          <a href="https://wa.me/598XXXXXXXX" target="_blank">💬 WhatsApp</a>
        </div>
      </div>
      ${flagBar()}
      <div class="footer-bottom" style="margin-top:20px;">
        <span class="footer-copy">© 2026 Clasificados VeneGuayos. Todos los derechos reservados.</span>
        <span style="font-size:1.1rem;">🇻🇪 🇺🇾</span>
      </div>
    </div>
  </footer>`;
}

// ── Time ──────────────────────────────────────────────────────
function timeAgo(d) {
  const diff = Math.floor((new Date() - new Date(d)) / 1000);
  if (diff < 3600)   return 'Hace ' + Math.floor(diff/60) + ' min';
  if (diff < 86400)  return 'Hace ' + Math.floor(diff/3600) + ' h';
  if (diff < 172800) return 'Ayer';
  if (diff < 604800) return 'Hace ' + Math.floor(diff/86400) + ' días';
  return new Date(d).toLocaleDateString('es-UY',{day:'numeric',month:'short'});
}
function isNew(d) { return (new Date() - new Date(d)) < 72*3600*1000; }

// ── Contact reveal ────────────────────────────────────────────
const _jobsCache = {};
function cacheJob(j) { _jobsCache[j.id] = j; }

function buildContactBlock(job) {
  const waMsg = encodeURIComponent(`Hola, vi el aviso de ${job.titulo} en Clasificados VeneGuayos y me interesa postularme.`);
  const waNum = job.contacto_wa ? job.contacto_wa.replace(/\D/g,'') : '';
  const emailLink = job.contacto_email
    ? `<a href="mailto:${job.contacto_email}?subject=Postulación: ${job.titulo}&body=Hola, vi tu aviso en Clasificados VeneGuayos y me interesa el puesto de ${job.titulo}." class="contact-link">${IconMail} ${job.contacto_email}</a>`
    : '';
  const waLink = waNum
    ? `<a href="https://wa.me/598${waNum}?text=${waMsg}" target="_blank" class="contact-link">${IconWA} ${job.contacto_wa}</a>`
    : '';
  return `<div class="contact-block contact-anim">
    <div class="contact-block-head">Datos de contacto del empleador</div>
    <div class="contact-block-body">${emailLink}${waLink}</div>
    <div class="contact-block-foot">Información recibida del empleador. Para mayores detalles, consultar directamente.</div>
  </div>`;
}

function revealContact(uid, jobId) {
  const job = _jobsCache[jobId];
  if (!job) return;
  document.getElementById('wrap_' + uid).innerHTML = buildContactBlock(job);
}

// ── Job card ──────────────────────────────────────────────────
function renderJobCard(job) {
  const uid = 'card_' + job.id;
  const hasContact = job.contacto_email || job.contacto_wa;
  return `<div class="job-card">
    <div class="job-card-top-bar"></div>
    <div class="job-card-body">
      <div class="job-card-head">
        ${rubroChip(job.categoria)}
        <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end;">
          ${job.urgente?'<span class="badge-destacado">URGENTE</span>':''}
          ${isNew(job.created_at)?'<span class="badge-nuevo">NUEVO</span>':''}
        </div>
      </div>
      <a href="empleo.html?id=${job.id}" style="text-decoration:none;">
        <div class="job-title">${job.titulo}</div>
      </a>
      <div class="job-empresa">${job.empresa}</div>
      <div class="job-meta">
        <span>${IconPin} ${job.zona}${job.barrio?', '+job.barrio:''}</span>
        <span>${IconClock} ${job.tipo_jornada}</span>
        ${job.sueldo?`<span style="font-family:var(--f-archivo);font-weight:800;color:var(--vino);font-size:15px;">${job.sueldo}</span>`:''}
      </div>
      ${job.descripcion?`<div class="job-desc">${job.descripcion}</div>`:''}
      ${hasContact?`<div id="wrap_${uid}">
        <button class="contact-reveal-btn" onclick="revealContact('${uid}',${job.id})">
          ${IconGlobe} Ver datos de contacto
        </button>
      </div>`:''}
    </div>
  </div>`;
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type='success') {
  let t = document.getElementById('_toast');
  if (!t) { t=document.createElement('div'); t.id='_toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.className=`toast ${type}`;
  setTimeout(()=>t.classList.add('show'),10);
  setTimeout(()=>t.classList.remove('show'),3200);
}

// ── Admin auth ────────────────────────────────────────────────
function checkAdmin()  { return sessionStorage.getItem('vg_admin')==='ok'; }
function loginAdmin(p) { if(p===ADMIN_PASSWORD){sessionStorage.setItem('vg_admin','ok');return true;} return false; }
function logoutAdmin() { sessionStorage.removeItem('vg_admin'); location.reload(); }

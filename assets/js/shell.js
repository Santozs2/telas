/* =========================================================================
   SIPAE - shell.js
   Monta sidebar + topbar conforme o perfil declarado no <body> e liga as
   interacoes comuns (abas, filtros, drawer de detalhe, toasts).
   ========================================================================= */

const PERFIS = {
  docente: {
    rotulo: 'Docente',
    relacao: '1x1',
    ico: 'docente',
    corIcone: 'background:rgba(10,92,173,.24);color:#7cbdf5',
    usuario: { nome: 'Edvaldo Ramos', iniciais: 'ER', cargo: 'Docente - Mecânica Industrial' },
    nav: [
      { grupo: 'Operação', itens: [
        { id: 'dashboard', ico: 'painel',     txt: 'Painel',            href: 'dashboard.html' },
        { id: 'mapa',      ico: 'mapa',       txt: 'Mapa de Salas',     href: 'mapa-salas.html' },
        { id: 'novo',      ico: 'mais',       txt: 'Novo Agendamento',  href: 'novo-agendamento.html' },
        { id: 'meus',      ico: 'agenda',     txt: 'Meus Agendamentos', href: 'meus-agendamentos.html', badge: '2' }
      ]},
      { grupo: 'Planejamento', itens: [
        { id: 'plano',     ico: 'plano',      txt: 'Meu Plano de Curso', href: 'plano-curso.html' },
        { id: 'extrato',   ico: 'ampulheta',  txt: 'Extrato de Horas',   href: 'extrato-horas.html' }
      ]}
    ]
  },

  coordenador: {
    rotulo: 'Coordenação',
    relacao: 'Nx1',
    ico: 'prancheta',
    corIcone: 'background:rgba(93,63,176,.28);color:#bda6f2',
    usuario: { nome: 'Saran Oliveira', iniciais: 'SO', cargo: 'Coordenação - Eixo Industrial' },
    nav: [
      { grupo: 'Operação', itens: [
        { id: 'dashboard',    ico: 'painel',  txt: 'Painel',              href: 'dashboard.html' },
        { id: 'mapa',         ico: 'mapa',    txt: 'Mapa Geral de Salas', href: 'mapa-geral.html' },
        { id: 'solicitacoes', ico: 'sino',    txt: 'Solicitações',        href: 'solicitacoes.html', badge: '7' },
        { id: 'conflitos',    ico: 'alerta',  txt: 'Conflitos',           href: 'conflitos.html',    badge: '3', urgente: true }
      ]},
      { grupo: 'Gestão', itens: [
        { id: 'docentes',  ico: 'docentes', txt: 'Docentes',     href: 'docentes.html' },
        { id: 'ambientes', ico: 'predio',   txt: 'Ambientes',    href: 'ambientes.html' },
        { id: 'cursos',    ico: 'curso',    txt: 'Cursos e UCs', href: 'cursos-ucs.html' }
      ]},
      { grupo: 'Acompanhamento', itens: [
        { id: 'relatorios', ico: 'grafico', txt: 'Relatório Mensal', href: 'relatorios.html' }
      ]}
    ]
  },

  diretor: {
    rotulo: 'Direção',
    relacao: 'Institucional',
    ico: 'predio',
    corIcone: 'background:rgba(11,112,72,.28);color:#63c99b',
    usuario: { nome: 'Didi Barbosa', iniciais: 'DB', cargo: 'Direção da Unidade' },
    nav: [
      { grupo: 'Visão institucional', itens: [
        { id: 'dashboard',   ico: 'painel',  txt: 'Painel Executivo',       href: 'dashboard.html' },
        { id: 'ocupacao',    ico: 'predio',  txt: 'Ocupação e Capacidade',  href: 'ocupacao.html' },
        { id: 'indicadores', ico: 'grafico', txt: 'Indicadores',            href: 'indicadores.html' }
      ]},
      { grupo: 'Governança', itens: [
        { id: 'aprovacoes', ico: 'aprovado',  txt: 'Aprovações',        href: 'aprovacoes.html', badge: '2', urgente: true },
        { id: 'auditoria',  ico: 'auditoria', txt: 'Auditoria',         href: 'auditoria.html' },
        { id: 'usuarios',   ico: 'docentes',  txt: 'Usuários e Perfis', href: 'usuarios.html' }
      ]}
    ]
  }
};

function montarShell() {
  const body   = document.body;
  const perfil = PERFIS[body.dataset.role];
  if (!perfil) return;

  const pagina = body.dataset.page || '';
  const crumb  = body.dataset.crumb || '';
  const titulo = body.dataset.title || '';

  const nav = perfil.nav.map(g => `
      <div class="nav__group">${g.grupo}</div>
      ${g.itens.map(i => `
        <a class="nav__item ${i.id === pagina ? 'is-active' : ''}" href="${i.href}"
           ${i.urgente ? 'data-urgente' : ''} ${i.id === pagina ? 'aria-current="page"' : ''} title="${i.txt}">
          <i data-ico="${i.ico}"></i>
          <span>${i.txt}</span>
          ${i.badge ? `<span class="nav__badge">${i.badge}</span>` : ''}
        </a>`).join('')}
  `).join('');

  const sidebar = `
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="brand__mark">SIP</div>
        <div class="brand__txt">
          <div class="brand__name">SIPAE</div>
          <div class="brand__desc">Mapa de Salas</div>
        </div>
      </div>

      <div class="role-chip">
        <div class="role-chip__ico" style="${perfil.corIcone}"><i data-ico="${perfil.ico}"></i></div>
        <div>
          <div class="role-chip__lb">Perfil de acesso</div>
          <div class="role-chip__vl">${perfil.rotulo} &middot; ${perfil.relacao}</div>
        </div>
      </div>

      <nav class="nav" aria-label="Menu principal">${nav}</nav>

      <div class="sidebar__foot">
        <div class="avatar">${perfil.usuario.iniciais}</div>
        <div>
          <div class="nm">${perfil.usuario.nome}</div>
          <div class="rl">${perfil.usuario.cargo}</div>
        </div>
        <a class="out" href="../index.html" title="Trocar de perfil" aria-label="Trocar de perfil"><i data-ico="sair"></i></a>
      </div>
    </aside>`;

  const topbar = `
    <header class="topbar">
      <button class="icon-btn topbar__menu" id="btn-menu" aria-label="Abrir menu"><i data-ico="menu"></i></button>
      <div class="crumb">
        <span>${perfil.rotulo}</span>
        <span class="sep">/</span>
        ${crumb ? `<span>${crumb}</span><span class="sep">/</span>` : ''}
        <b>${titulo}</b>
      </div>
      <div class="topbar__spacer"></div>
      <label class="search">
        <i data-ico="busca"></i>
        <input type="text" placeholder="Buscar sala, docente ou UC" aria-label="Buscar">
        <kbd>Ctrl K</kbd>
      </label>
      <button class="icon-btn" aria-label="Notificações"><i data-ico="sino"></i><span class="dot"></span></button>
      <button class="icon-btn" aria-label="Ajuda"><i data-ico="ajuda"></i></button>
      <div class="avatar" title="${perfil.usuario.nome}">${perfil.usuario.iniciais}</div>
    </header>`;

  const alvoSidebar = document.getElementById('sidebar-slot');
  const alvoTopbar  = document.getElementById('topbar-slot');
  if (alvoSidebar) alvoSidebar.outerHTML = sidebar;
  if (alvoTopbar)  alvoTopbar.outerHTML  = topbar;

  document.title = 'SIPAE · ' + (titulo || perfil.rotulo);
}

/* ----------------------------- infraestrutura ----------------------------- */
function montarUtilitarios() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="drawer-bg" id="drawer-bg"></div>
    <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Detalhe"></aside>
    <div class="toasts" id="toasts" role="status" aria-live="polite"></div>`);
}

function toast(titulo, detalhe) {
  const caixa = document.getElementById('toasts');
  if (!caixa) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i data-ico="check"></i><div><b>${titulo}</b>${detalhe ? `<span>${detalhe}</span>` : ''}</div>`;
  caixa.appendChild(el);
  aplicarIcones(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; }, 3200);
  setTimeout(() => el.remove(), 3500);
}

function abrirDrawer(conteudo) {
  const d = document.getElementById('drawer');
  const bg = document.getElementById('drawer-bg');
  d.innerHTML = conteudo;
  aplicarIcones(d);
  d.classList.add('is-open');
  bg.classList.add('is-open');
  d.querySelectorAll('[data-fechar]').forEach(b => b.addEventListener('click', fecharDrawer));
  const primeiro = d.querySelector('button, a, input, select');
  if (primeiro) primeiro.focus();
}
function fecharDrawer() {
  document.getElementById('drawer').classList.remove('is-open');
  document.getElementById('drawer-bg').classList.remove('is-open');
}

/* ------------------------ interacoes genericas ---------------------------- */
function ativarInteracoes() {
  // abas
  document.querySelectorAll('.tabs').forEach(grupo => {
    grupo.setAttribute('role', 'tablist');
    grupo.querySelectorAll('.tab').forEach(t => {
      if (t.tagName !== 'BUTTON') {
        const b = document.createElement('button');
        b.className = t.className; b.innerHTML = t.innerHTML;
        Object.entries(t.dataset).forEach(([k, v]) => b.dataset[k] = v);
        t.replaceWith(b);
      }
    });
    grupo.querySelectorAll('.tab').forEach(t => {
      t.setAttribute('role', 'tab');
      t.setAttribute('aria-selected', t.classList.contains('is-on'));
    });
    grupo.addEventListener('click', e => {
      const t = e.target.closest('.tab');
      if (!t) return;
      grupo.querySelectorAll('.tab').forEach(x => { x.classList.remove('is-on'); x.setAttribute('aria-selected', 'false'); });
      t.classList.add('is-on'); t.setAttribute('aria-selected', 'true');
      const alvo = t.dataset.tab;
      if (!alvo) return;
      document.querySelectorAll('[data-tab-panel]').forEach(p => {
        p.style.display = (p.dataset.tabPanel === alvo) ? '' : 'none';
      });
    });
  });

  // segmentos e pills
  document.querySelectorAll('.seg, .pill-filter').forEach(grupo => {
    const multiplo = grupo.dataset.multiplo !== undefined;
    grupo.addEventListener('click', e => {
      const b = e.target.closest('button, .pill');
      if (!b || !grupo.contains(b)) return;
      if (multiplo) { b.classList.toggle('is-on'); return; }
      grupo.querySelectorAll('button, .pill').forEach(x => x.classList.remove('is-on'));
      b.classList.add('is-on');
      if (typeof window.aoTrocarSegmento === 'function') window.aoTrocarSegmento(b.dataset.value, grupo);
    });
  });

  // cartoes de radio
  document.querySelectorAll('.radio-cards').forEach(grupo => {
    grupo.addEventListener('click', e => {
      const c = e.target.closest('.rc');
      if (!c) return;
      grupo.querySelectorAll('.rc').forEach(x => x.classList.remove('is-on'));
      c.classList.add('is-on');
      if (typeof window.aoTrocarAmbiente === 'function') window.aoTrocarAmbiente(c.dataset.value, grupo);
    });
  });

  // checkboxes em cartao
  document.querySelectorAll('.check input[type=checkbox]').forEach(cb => {
    const marcar = () => cb.closest('.check').classList.toggle('is-on', cb.checked);
    cb.addEventListener('change', marcar); marcar();
  });

  // menu lateral no mobile
  const btnMenu = document.getElementById('btn-menu');
  if (btnMenu) btnMenu.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('is-open'));

  // fundo do drawer e tecla ESC
  const bg = document.getElementById('drawer-bg');
  if (bg) bg.addEventListener('click', fecharDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharDrawer(); });

  // feedback nos botoes de demonstracao
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-toast]');
    if (!b) return;
    e.preventDefault();
    toast(b.dataset.toast, b.dataset.toastDetalhe || '');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  montarShell();
  montarUtilitarios();
  ativarInteracoes();
  aplicarIcones();
});

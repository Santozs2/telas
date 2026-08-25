/* =========================================================================
   SIPAE - icones.js
   Conjunto de icones de traco (24x24). Substitui <i data-ico="nome"></i>
   por SVG inline, garantindo aparencia identica em qualquer sistema.
   ========================================================================= */

const ICONES = {
  painel:    '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  mapa:      '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
  calendario:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  agenda:    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h3M8 17h6"/>',
  mais:      '<path d="M12 5v14M5 12h14"/>',
  plano:     '<path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  ampulheta: '<path d="M7 3h10M7 21h10M8 3v4l4 5 4-5V3M8 21v-4l4-5 4 5v4"/>',
  sino:      '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M10.5 20a2 2 0 0 0 3 0"/>',
  alerta:    '<path d="M12 4 2.5 20h19L12 4Z"/><path d="M12 10v4M12 17.5v.5"/>',
  docente:   '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>',
  docentes:  '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><path d="M16 5.3a3 3 0 0 1 0 5.4M17.5 14.2c2.1.6 3.5 2.3 3.5 4.8"/>',
  predio:    '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M14 9h4a2 2 0 0 1 2 2v10"/><path d="M7 7h3M7 11h3M7 15h3M17 13h1M17 17h1M2 21h20"/>',
  curso:     '<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11.5V17c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5"/>',
  grafico:   '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  aprovado:  '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  busca:     '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.6-3.6"/>',
  sair:      '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 8 6 12l4 4M6 12h10"/>',
  relogio:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  prancheta: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 11h6M9 15h4"/>',
  check:     '<path d="m5 12.5 4.5 4.5L19 7"/>',
  troca:     '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  cadeado:   '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  info:      '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/>',
  lab:       '<path d="M10 3h4M11 3v6.5L5.5 18A2 2 0 0 0 7.2 21h9.6a2 2 0 0 0 1.7-3L13 9.5V3"/><path d="M8.5 15h7"/>',
  oficina:   '<path d="M14.5 4.5a4 4 0 0 0 5 5L21 8a6 6 0 0 1-8.5 6.8L6 21a2.1 2.1 0 0 1-3-3l6.2-6.5A6 6 0 0 1 16 3l-1.5 1.5Z"/>',
  auditorio: '<rect x="9" y="3" width="6" height="10" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
  caixa:     '<path d="m12 3 8 4v10l-8 4-8-4V7l8-4Z"/><path d="m4 7 8 4 8-4M12 11v10"/>',
  baixar:    '<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 19h14"/>',
  imprimir:  '<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="2"/><path d="M7 14h10v6H7z"/>',
  local:     '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  recusado:  '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
  dinheiro:  '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  repetir:   '<path d="M4 10a6 6 0 0 1 6-6h7l-2.5-2.5M20 14a6 6 0 0 1-6 6H7l2.5 2.5"/>',
  soma:      '<path d="M18 5H6l6 7-6 7h12"/>',
  ajuda:     '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.7.7-.7 1.4M12 16.5v.5"/>',
  menu:      '<path d="M4 7h16M4 12h16M4 17h16"/>',
  filtro:    '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
  editar:    '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m14.5 5.5 4 4"/>',
  fechar:    '<path d="M6 6l12 12M18 6 6 18"/>',
  atualizar: '<path d="M20 11a8 8 0 1 0-.7 4.3"/><path d="M20 5v6h-6"/>',
  auditoria: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.5-4.5M11 8v3l2 1.5"/>'
};

function aplicarIcones(raiz = document) {
  raiz.querySelectorAll('i[data-ico]').forEach(el => {
    const nome = el.dataset.ico;
    const d = ICONES[nome];
    if (!d) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'ic ' + (el.className || ''));
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = d;
    el.replaceWith(svg);
  });
}

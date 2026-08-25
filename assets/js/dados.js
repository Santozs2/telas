/* =========================================================================
   SIPAE - dados.js
   Dados de demonstracao + montagem da grade (mapa de salas).
   Regras vindas das entrevistas:
     CT  -> aula 45 min | intervalo 15 min
     CAI -> aula 50 min | intervalo 20 min
     Sala de aula teorica: 32 a 40 alunos por docente
     Laboratorio / oficina: 16 alunos por docente (turma maior = divisao em grupos)
   ========================================================================= */

const DOCENTE_LOGADO = 'Edvaldo Ramos';

/* -------------------------- Periodos por curso -------------------------- */
const MATRIZ_HORARIA = {
  CT:  { aula: 45, intervalo: 15, inicio: { manha: '07:30', tarde: '13:00' } },
  CAI: { aula: 50, intervalo: 20, inicio: { manha: '07:30', tarde: '13:00' } }
};

function somaMin(hhmm, min) {
  const [h, m] = hhmm.split(':').map(Number);
  const t = h * 60 + m + min;
  return String(Math.floor(t / 60) % 24).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
}

/** Gera P1..P5 com o intervalo depois do 3o periodo. */
function gerarPeriodos(curso = 'CT', turno = 'manha') {
  const cfg = MATRIZ_HORARIA[curso] || MATRIZ_HORARIA.CT;
  let hora = cfg.inicio[turno];
  const lista = [];
  for (let i = 1; i <= 5; i++) {
    const fim = somaMin(hora, cfg.aula);
    lista.push({ id: 'P' + i, tipo: 'aula', lb: 'P' + i, hh: hora + ' - ' + fim });
    hora = fim;
    if (i === 3) {
      const fimInt = somaMin(hora, cfg.intervalo);
      lista.push({ id: 'INT', tipo: 'intervalo', lb: 'Intervalo', hh: hora + ' - ' + fimInt });
      hora = fimInt;
    }
  }
  return lista;
}

/* ------------------------------- Ambientes ------------------------------ */
const AMBIENTES = [
  { id: 'SA-01',   nome: 'Sala de Aula 01',            tipo: 'Sala de aula',  cap: 40,  bloco: 'Bloco A' },
  { id: 'SA-02',   nome: 'Sala de Aula 02',            tipo: 'Sala de aula',  cap: 40,  bloco: 'Bloco A' },
  { id: 'SA-03',   nome: 'Sala de Aula 03',            tipo: 'Sala de aula',  cap: 36,  bloco: 'Bloco A' },
  { id: 'SA-04',   nome: 'Sala de Aula 04',            tipo: 'Sala de aula',  cap: 32,  bloco: 'Bloco B' },
  { id: 'LAB-CMD', nome: 'Lab. de Comando Elétrico',   tipo: 'Laboratório',   cap: 16,  bloco: 'Bloco C' },
  { id: 'LAB-PNE', nome: 'Lab. de Pneumática',         tipo: 'Laboratório',   cap: 16,  bloco: 'Bloco C' },
  { id: 'LAB-MET', nome: 'Lab. de Metrologia',         tipo: 'Laboratório',   cap: 16,  bloco: 'Bloco C' },
  { id: 'LAB-INF', nome: 'Lab. de Informática',        tipo: 'Laboratório',   cap: 20,  bloco: 'Bloco B' },
  { id: 'LAB-CNC', nome: 'Lab. de Usinagem CNC',       tipo: 'Laboratório',   cap: 12,  bloco: 'Bloco D' },
  { id: 'OF-USI',  nome: 'Oficina de Usinagem',        tipo: 'Oficina',       cap: 16,  bloco: 'Bloco D' },
  { id: 'OF-SOL',  nome: 'Oficina de Soldagem',        tipo: 'Oficina',       cap: 16,  bloco: 'Bloco D' },
  { id: 'OF-ELE',  nome: 'Oficina Elétrica Predial',   tipo: 'Oficina',       cap: 16,  bloco: 'Bloco C' },
  { id: 'AUD-01',  nome: 'Auditório',                  tipo: 'Auditório',     cap: 120, bloco: 'Bloco A' },
  { id: 'SP-01',   nome: 'Sala de Preparo',            tipo: 'Sala de preparo', cap: 8, bloco: 'Bloco C' }
];

const ICONE_TIPO = {
  'Sala de aula': 'painel',
  'Laboratório': 'lab',
  'Oficina': 'oficina',
  'Auditório': 'auditorio',
  'Sala de preparo': 'caixa'
};

/* --------------- Ocupacao do dia (quinta-feira, 20/08/2026) -------------- */
/* estados: livre | meu | ocupado | conflito | pendente | treino | bloq     */
const oc = (estado, t1, t2) => ({ estado, t1, t2 });
const LIVRE = null;

const OCUPACAO = {
  'SA-01':   [ oc('ocupado','Mecânica Aplicada','Carla Mendes - MEC-3A'), oc('ocupado','Mecânica Aplicada','Carla Mendes - MEC-3A'), LIVRE, oc('meu','Desenho Técnico','MEC-2A - 28 alunos'), oc('meu','Desenho Técnico','MEC-2A - 28 alunos') ],
  'SA-02':   [ LIVRE, oc('ocupado','Segurança do Trabalho','Rafael Lima - ELE-1B'), oc('ocupado','Segurança do Trabalho','Rafael Lima - ELE-1B'), LIVRE, LIVRE ],
  'SA-03':   [ oc('ocupado','Matemática Aplicada','Juliana Reis - AUT-1A'), LIVRE, LIVRE, oc('ocupado','Gestão da Qualidade','Paulo Nunes - MEC-3A'), oc('ocupado','Gestão da Qualidade','Paulo Nunes - MEC-3A') ],
  'SA-04':   [ LIVRE, LIVRE, oc('treino','Treinamento in company','Empresa parceira · 24 vagas'), oc('treino','Treinamento in company','Empresa parceira · 24 vagas'), LIVRE ],
  'LAB-CMD': [ oc('ocupado','Comandos Elétricos','Saran Oliveira - ELE-2A (G1)'), oc('conflito','2 solicitações','Edvaldo x Rafael - desempate'), oc('conflito','2 solicitações','Edvaldo x Rafael - desempate'), oc('meu','Comandos Elétricos','MEC-2A (G1) - 15 alunos'), oc('pendente','Comandos Elétricos','Aguardando coordenação') ],
  'LAB-PNE': [ LIVRE, oc('ocupado','Pneumática e Hidráulica','Saran Oliveira - AUT-2A (G1)'), oc('ocupado','Pneumática e Hidráulica','Saran Oliveira - AUT-2A (G2)'), oc('pendente','Pneumática e Hidráulica','Rafael Lima - em análise'), LIVRE ],
  'LAB-MET': [ oc('ocupado','Metrologia','Paulo Nunes - MEC-1A (G1)'), oc('ocupado','Metrologia','Paulo Nunes - MEC-1A (G2)'), LIVRE, LIVRE, oc('ocupado','Metrologia','Carla Mendes - MEC-3A') ],
  'LAB-INF': [ LIVRE, LIVRE, oc('ocupado','Informática Aplicada','Juliana Reis - AUT-1A'), oc('ocupado','Projetos','Juliana Reis - AUT-3A'), LIVRE ],
  'LAB-CNC': [ oc('bloq','Manutenção preventiva','Bloqueado até 12:00'), oc('bloq','Manutenção preventiva','Bloqueado até 12:00'), LIVRE, oc('ocupado','Usinagem CNC','Marcos Prado - MEC-3A (G1)'), LIVRE ],
  'OF-USI':  [ oc('ocupado','Processos de Usinagem','Marcos Prado - MEC-2B (G1)'), oc('ocupado','Processos de Usinagem','Marcos Prado - MEC-2B (G2)'), oc('ocupado','Processos de Usinagem','Marcos Prado - MEC-2B (G2)'), LIVRE, LIVRE ],
  'OF-SOL':  [ LIVRE, oc('pendente','Soldagem MIG/MAG','Bruno Alves - em análise'), LIVRE, oc('ocupado','Soldagem MIG/MAG','Bruno Alves - MEC-1B (G1)'), oc('ocupado','Soldagem MIG/MAG','Bruno Alves - MEC-1B (G2)') ],
  'OF-ELE':  [ oc('ocupado','Instalações Prediais','Rafael Lima - ELE-1A (G1)'), LIVRE, LIVRE, LIVRE, oc('treino','Treinamento FIC','NR-10 - 16 vagas') ],
  'AUD-01':  [ LIVRE, LIVRE, oc('ocupado','Palestra de integração','Coordenação - 90 alunos'), oc('ocupado','Palestra de integração','Coordenação - 90 alunos'), LIVRE ],
  'SP-01':   [ LIVRE, LIVRE, LIVRE, oc('ocupado','Preparo de bancadas','Técnico de laboratório'), LIVRE ]
};

const ROTULO_ESTADO = {
  livre: 'Disponível', meu: 'Minha reserva', ocupado: 'Ocupada',
  conflito: 'Em conflito', pendente: 'Aguardando aprovação', treino: 'Treinamento', bloq: 'Bloqueada'
};

/* ---------------------------- Render da grade --------------------------- */
/**
 * Celula vazia = ambiente livre. Só o que está ocupado ganha cor, para o
 * olho encontrar a vaga sem precisar ler cada quadradinho.
 * @param {string} seletor  container onde a tabela sera inserida
 * @param {object} opc      { curso, turno, ambientes, papel }
 */
function renderGrade(seletor, opc = {}) {
  const alvo = document.querySelector(seletor);
  if (!alvo) return;

  const curso    = opc.curso || 'CT';
  const turno    = opc.turno || 'manha';
  const lista    = opc.ambientes || AMBIENTES;
  const papel    = opc.papel || 'docente';
  const periodos = gerarPeriodos(curso, turno);

  const cabecalho = periodos.map(p => p.tipo === 'intervalo'
    ? `<th class="col-int" scope="col"><div class="col-int-lb">INTERVALO</div></th>`
    : `<th scope="col">${p.lb}<span class="hh">${p.hh}</span></th>`
  ).join('');

  const linhas = lista.map(amb => {
    const dia = OCUPACAO[amb.id] || [];
    let iAula = -1;
    const celulas = periodos.map(p => {
      if (p.tipo === 'intervalo') return '<td class="col-int"></td>';
      iAula++;
      const o = dia[iAula];
      const base = `data-amb="${amb.id}" data-periodo="${p.id}" data-hora="${p.hh}"`;

      if (!o) {
        return `<td><button type="button" class="slot slot--livre" ${base} data-estado="livre"
                  title="Disponível · ${amb.nome} · ${p.hh}"
                  aria-label="Disponível, ${amb.nome}, ${p.lb}, ${p.hh}">
                  <span class="t1">+</span></button></td>`;
      }
      return `<td><button type="button" class="slot slot--${o.estado}" ${base} data-estado="${o.estado}"
                title="${ROTULO_ESTADO[o.estado]} · ${amb.nome} · ${p.hh}"
                aria-label="${ROTULO_ESTADO[o.estado]}, ${o.t1}, ${amb.nome}, ${p.lb}">
                <span class="t1">${o.t1}</span><span class="t2">${o.t2}</span></button></td>`;
    }).join('');

    return `<tr>
      <th class="room-col" scope="row">
        <div class="rn">${amb.nome}</div>
        <div class="rm"><i data-ico="${ICONE_TIPO[amb.tipo] || 'painel'}"></i> ${amb.tipo} &middot; ${amb.cap} lugares &middot; ${amb.bloco}</div>
      </th>${celulas}</tr>`;
  }).join('');

  alvo.innerHTML = `<div class="table-wrap">
      <table class="grade">
        <thead><tr><th class="room-col" scope="col">Ambiente</th>${cabecalho}</tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>`;

  if (typeof aplicarIcones === 'function') aplicarIcones(alvo);
  ligarCliqueDaGrade(alvo, papel);
}

/* ------------------- Drawer de detalhe ao clicar na celula ---------------- */
function ligarCliqueDaGrade(alvo, papel) {
  alvo.addEventListener('click', e => {
    const cel = e.target.closest('.slot');
    if (!cel || cel.dataset.estado === 'bloq') return;

    alvo.querySelectorAll('.slot').forEach(s => s.classList.remove('is-sel'));
    cel.classList.add('is-sel');

    const amb = AMBIENTES.find(a => a.id === cel.dataset.amb) || {};
    const estado = cel.dataset.estado;
    const dia = OCUPACAO[amb.id] || [];
    const idx = Number(String(cel.dataset.periodo).replace('P', '')) - 1;
    const o = dia[idx];

    const acoes = {
      livre: papel === 'docente'
        ? `<button class="btn" data-fechar>Fechar</button>
           <button class="btn btn--primary" style="margin-left:auto" data-toast="Solicitação enviada" data-toast-detalhe="Aguardando análise da coordenação.">Solicitar este horário</button>`
        : `<button class="btn" data-fechar>Fechar</button>
           <button class="btn btn--primary" style="margin-left:auto" data-toast="Ambiente alocado" data-toast-detalhe="Docente e turma foram notificados.">Alocar manualmente</button>`,
      meu: `<button class="btn" data-fechar>Fechar</button>
            <button class="btn btn--danger" data-toast="Falta registrada" data-toast-detalhe="Ambiente liberado no mapa para outros docentes.">Registrar falta</button>
            <button class="btn btn--primary" style="margin-left:auto" data-toast="Alteração salva">Trocar sala</button>`,
      ocupado: papel === 'docente'
        ? `<button class="btn" data-fechar>Fechar</button>
           <span class="hint" style="margin-left:auto"><i data-ico="cadeado"></i> Reserva de outro docente</span>`
        : `<button class="btn" data-fechar>Fechar</button>
           <button class="btn btn--primary" style="margin-left:auto" data-toast="Remanejamento aplicado" data-toast-detalhe="O docente recebeu a notificação com o motivo.">Remanejar</button>`,
      conflito: `<button class="btn" data-fechar>Fechar</button>
                 <a class="btn btn--primary" style="margin-left:auto" href="${papel === 'docente' ? 'meus-agendamentos.html' : 'conflitos.html'}">Ver disputa</a>`,
      pendente: `<button class="btn" data-fechar>Fechar</button>
                 <button class="btn btn--ok" style="margin-left:auto" data-toast="Solicitação aprovada">Aprovar agora</button>`,
      treino:   `<button class="btn" data-fechar>Fechar</button>`
    };

    const rotulo = {
      livre: 'badge--ok', meu: 'badge--info', ocupado: 'badge--muted',
      conflito: 'badge--danger', pendente: 'badge--warn', treino: 'badge--purple'
    }[estado];

    abrirDrawer(`
      <div class="drawer__head">
        <div>
          <h3>${amb.nome || ''}</h3>
          <div class="sub">${cel.dataset.periodo} &middot; ${cel.dataset.hora} &middot; ${amb.bloco || ''}</div>
        </div>
        <button class="icon-btn" style="margin-left:auto" data-fechar aria-label="Fechar"><i data-ico="fechar"></i></button>
      </div>
      <div class="drawer__body">
        <div class="row" style="margin-bottom:14px">
          <span class="badge ${rotulo}"><span class="bullet"></span> ${ROTULO_ESTADO[estado]}</span>
          <span class="tag">${amb.tipo || ''}</span>
          <span class="tag">${amb.cap || 0} lugares</span>
        </div>
        ${o ? `
          <dl class="dl">
            <dt>Atividade</dt><dd>${o.t1}</dd>
            <dt>Responsável</dt><dd>${o.t2}</dd>
            <dt>Período</dt><dd>${cel.dataset.periodo} &middot; ${cel.dataset.hora}</dd>
            <dt>Ambiente</dt><dd>${amb.nome}</dd>
          </dl>` : `
          <dl class="dl">
            <dt>Situação</dt><dd>Livre para reserva</dd>
            <dt>Período</dt><dd>${cel.dataset.periodo} &middot; ${cel.dataset.hora}</dd>
            <dt>Capacidade</dt><dd>${amb.cap} lugares</dd>
            <dt>Limite por docente</dt><dd>${amb.tipo === 'Sala de aula' ? '32 a 40' : '16'} alunos</dd>
          </dl>`}
        <div class="divider"></div>
        <div class="hint"><i data-ico="info"></i><span>${
          estado === 'livre'
            ? 'A reserva é validada contra o plano de curso, a capacidade do ambiente e o saldo de horas da UC.'
            : estado === 'conflito'
              ? 'Duas solicitações disputam este horário. O desempate segue a prioridade da UC sobre o ambiente.'
              : 'Alterações ficam registradas em auditoria e notificam os envolvidos.'
        }</span></div>
      </div>
      <div class="drawer__foot">${acoes[estado] || acoes.livre}</div>
    `);
  });
}

/* --------------------- Cursos, turmas e unidades curriculares ----------- */
const CURSOS = [
  { id: 'CAI-MEC', sigla: 'CAI', nome: 'Aprendizagem Industrial - Mecânica', turmas: ['MEC-1A','MEC-1B','MEC-2A','MEC-2B','MEC-3A'], aula: 50 },
  { id: 'CAI-ELE', sigla: 'CAI', nome: 'Aprendizagem Industrial - Eletroeletrônica', turmas: ['ELE-1A','ELE-1B','ELE-2A'], aula: 50 },
  { id: 'CT-AUT',  sigla: 'CT',  nome: 'Técnico em Automação Industrial', turmas: ['AUT-1A','AUT-2A','AUT-3A'], aula: 45 },
  { id: 'CT-MEC',  sigla: 'CT',  nome: 'Técnico em Mecatrônica', turmas: ['MTR-1A','MTR-2A'], aula: 45 },
  { id: 'CT-ELT',  sigla: 'CT',  nome: 'Técnico em Eletrotécnica', turmas: ['ETC-1A','ETC-2A'], aula: 45 }
];

const UCS_DOCENTE = [
  { uc: 'Projetos Integradores',    curso: 'CAI Mecânica',  turma: 'MEC-2A', ch: 45, feitas: 8,  ambiente: 'Lab. de Informática / Sala de aula', prio: 1 },
  { uc: 'Comandos Elétricos',       curso: 'CAI Mecânica',  turma: 'MEC-2A', ch: 60, feitas: 24, ambiente: 'Lab. de Comando Elétrico',           prio: 1 },
  { uc: 'Desenho Técnico',          curso: 'CAI Mecânica',  turma: 'MEC-2A', ch: 40, feitas: 30, ambiente: 'Sala de aula',                       prio: 2 },
  { uc: 'Metrologia',               curso: 'CAI Mecânica',  turma: 'MEC-1A', ch: 30, feitas: 12, ambiente: 'Lab. de Metrologia',                 prio: 2 },
  { uc: 'Segurança do Trabalho',    curso: 'CT Automação',  turma: 'AUT-1A', ch: 20, feitas: 20, ambiente: 'Sala de aula',                       prio: 3 }
];

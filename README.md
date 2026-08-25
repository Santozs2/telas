# SIPAE — Mapa de Salas

Protótipo de telas (front-end) do sistema de gestão, alocação e otimização dinâmica de
ambientes de ensino, derivado das três entrevistas e do fluxo do quadro branco.

## Como abrir

Abra `index.html` no navegador, ou suba um servidor local:

```bash
python -m http.server 8765
```

O `index.html` é apenas o seletor de perfil do protótipo — **telas de login e autenticação
não fazem parte desta entrega**, conforme combinado.

## Estrutura

```
index.html              seletor dos três perfis
assets/css/sipae.css    design system completo (tokens, componentes, responsivo, impressão)
assets/js/icones.js     conjunto de ícones SVG de traço
assets/js/dados.js      dados de demonstração + grade do mapa de salas + drawer de detalhe
assets/js/shell.js      sidebar/topbar por perfil, abas, filtros, toasts

docente/       dashboard · mapa-salas · novo-agendamento · meus-agendamentos · plano-curso · extrato-horas
coordenador/   dashboard · mapa-geral · solicitacoes · conflitos · docentes · ambientes · cursos-ucs · relatorios
diretor/       dashboard · ocupacao · indicadores · aprovacoes · auditoria · usuarios
```

Cada página declara o perfil no `<body>`; o `shell.js` monta a navegação correspondente:

```html
<body data-role="coordenador" data-page="conflitos"
      data-title="Conflitos e Desempate" data-crumb="Operação">
```

## Regras das entrevistas que a interface materializa

| Regra levantada | Onde aparece |
|---|---|
| CT: aula 45 min / intervalo 15 min — CAI: 50 min / 20 min | matriz horária alterna a grade do mapa |
| Sala de aula 32 a 40 alunos; laboratório e oficina 16 por docente | capacidade nos ambientes e divisão automática em grupos |
| Turma de 30 vira 2 grupos de 15 | etapa 3 do novo agendamento |
| Professor não escolhe a sala — quem manda é o plano de curso | filtro "só ambientes do meu plano de curso" e vínculo UC × ambiente |
| 1 docente = 1 ambiente por período | validação na solicitação |
| Docente principal e docente auxiliar | campo no agendamento e coluna nas listagens |
| Relação 1x1 (docente) e Nx1 (coordenação) | permissões, matriz em *Usuários e Perfis*, ações do drawer |
| Desempate: sala principal > secundária > terciária | tela de conflitos, com peso por critério |
| Agenda mensal com ajuste semanal e mudança diária | calendário e janela de agendamento |
| Agenda abre na última semana do mês anterior | aviso no painel e destaque no calendário |
| Sala desocupada volta a aparecer livre na hora | botão *Registrar falta* e liberação automática |
| Extrato de horas por UC (45h − 8h = 37h) | tela de extrato, com saldo por lançamento |
| Relatório mensal | tela da coordenação, com uso por ambiente |

## Tema

O sistema usa tema **escuro**, definido inteiramente por variáveis CSS no `:root` de
`assets/css/sipae.css`. Nenhuma página tem cor fixa: trocar o bloco de tokens troca o
tema inteiro das 20 telas.

- `--brand` é o acento (links, bordas, ícones, barras) e `--brand-solid` é o
  preenchimento que carrega texto branco (botão primário, item ativo do menu).
- As cores semânticas seguem o mesmo par: cor viva para texto/ícone
  (`--ok`, `--warn`, `--danger`, `--purple`) e tinta translúcida para fundo (`--ok-050`…).
- `color-scheme: dark` faz os controles nativos (campos de data, selects, barras de
  rolagem) acompanharem o tema.
- Todo texto foi verificado em contraste mínimo de 4,5:1 sobre o seu fundo real.
- A impressão continua saindo em papel branco com texto preto.

## Convenções de interface

- **Célula vazia = ambiente livre.** Só o ocupado recebe cor, para o olho achar a vaga sem ler quadrado por quadrado.
- Estados do mapa: minha reserva (azul), ocupada (cinza), pendente (âmbar), conflito (vermelho),
  treinamento (roxo), bloqueada (hachurada).
- Clique em qualquer célula abre o painel lateral com detalhes e as ações permitidas ao perfil.
- Ações destrutivas ou de exceção nunca são o botão primário da tela.

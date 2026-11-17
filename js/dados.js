/* EduAcessível — dados demonstrativos (base local)
   Tudo aqui é SIMULADO para demonstração. Quando houver backend/IA real,
   este módulo deve ser substituído por chamadas à API (mesmo contrato). */
window.EA = window.EA || {};

EA.DADOS = {
  aula: { materia: 'Matemática', tema: 'Frações', turma: '6º A' },

  sugestoes: [
    'O que é uma fração?',
    'Me dá um exemplo com pizza',
    'Como somar frações?',
    'O que é fração equivalente?'
  ],

  /* Base local de perguntas frequentes.
     k: palavras-chave (sem acento) · r: resposta completa · s: versão simplificada · pic: pictograma */
  faq: [
    {
      k: ['o que e', 'fracao', 'o que é'],
      r: 'Uma fração representa uma parte de um todo dividido em partes iguais. O número de cima (numerador) diz quantas partes pegamos; o de baixo (denominador) diz em quantas partes iguais o todo foi dividido.',
      s: 'Fração é um pedaço de algo dividido em partes iguais. Ex.: 1/2 = uma de duas partes iguais.',
      pic: '🍕'
    },
    {
      k: ['pizza', 'exemplo'],
      r: 'Exemplo: se uma pizza é cortada em 4 fatias iguais e você come 1 fatia, comeu 1/4 da pizza. Se come 2 fatias, comeu 2/4 — que é o mesmo que 1/2 (metade).',
      s: 'Pizza em 4 fatias: 1 fatia = 1/4. Duas fatias = 2/4 = metade da pizza.',
      pic: '🍕'
    },
    {
      k: ['somar', 'soma', 'adicionar', 'juntar'],
      r: 'Para somar frações com o mesmo denominador, some os numeradores e mantenha o denominador: 1/4 + 2/4 = 3/4. Com denominadores diferentes, primeiro encontre um denominador comum.',
      s: 'Mesmo número de baixo? Some os números de cima. 1/4 + 2/4 = 3/4.',
      pic: '➕'
    },
    {
      k: ['equivalente', 'equivalencia', 'igual'],
      r: 'Frações equivalentes representam a mesma quantidade: 1/2 = 2/4 = 4/8. Para encontrar uma equivalente, multiplique ou divida numerador e denominador pelo mesmo número.',
      s: '1/2 = 2/4: é a mesma quantidade, escrita de outro jeito.',
      pic: '🔄'
    },
    {
      k: ['maior', 'comparar', 'menor'],
      r: 'Para comparar frações com o mesmo denominador, compare os numeradores: 3/4 é maior que 1/4. Com numeradores iguais, a maior fração é a de menor denominador: 1/2 é maior que 1/4.',
      s: 'Mesmo número de baixo: quem tem mais em cima é maior. 3/4 > 1/4.',
      pic: '⚖️'
    }
  ],

  fallback: 'Boa pergunta! Nesta demonstração eu sei responder sobre frações: o que são, exemplos com pizza, como somar e frações equivalentes. Na versão completa, a IA acompanhará o conteúdo real da aula.',

  respostasRapidas: [
    { rotulo: '👍 Entendi', msg: 'Entendi, obrigado!', resp: 'Que ótimo! Se surgir outra dúvida, é só perguntar.' },
    { rotulo: '🤔 Não entendi', msg: 'Ainda não entendi', resp: 'Sem problemas! Vou tentar explicar de outro jeito: imagine dividir algo em partes iguais e pegar algumas delas — isso é uma fração.' },
    { rotulo: '🔁 Repete', msg: 'Pode repetir?', resp: null /* repete a última resposta */ }
  ],

  /* Painel do professor — dados fictícios */
  pedidos: [
    { id: 1, nome: 'Ana', hora: '10:12', texto: 'Solicita explicação com exemplo.', detalhe: 'Apoios ativos: texto ampliado, linguagem simples.', status: 'pendente' },
    { id: 2, nome: 'Carlos', hora: '10:18', texto: 'Dificuldade na atividade.', detalhe: 'Apoios ativos: leitura em voz alta.', status: 'pendente' },
    { id: 3, nome: 'Luiza', hora: '10:22', texto: 'Quer revisar o conceito anterior.', detalhe: 'Apoios ativos: pictogramas.', status: 'em atendimento' }
  ],

  apoiosTurma: [
    { nome: 'Linguagem simples', n: 9 },
    { nome: 'Texto ampliado', n: 8 },
    { nome: 'Leitura em voz alta', n: 6 },
    { nome: 'Pictogramas', n: 5 },
    { nome: 'Alto contraste', n: 3 }
  ],

  duvidas: [
    { tema: 'Equivalência de frações', n: 3 },
    { tema: 'Simplificação', n: 2 },
    { tema: 'Numerador × denominador', n: 2 }
  ],

  conquistas: [
    { id: 'pergunta1', nome: 'Primeira pergunta', desc: 'Fez a primeira pergunta ao assistente', ico: '❖' },
    { id: 'sugestao', nome: 'Explorador', desc: 'Usou uma sugestão pronta', ico: '🧭' },
    { id: 'ouviu', nome: 'Ouvinte', desc: 'Usou a leitura em voz alta', ico: '🔊' },
    { id: 'apoios', nome: 'Do meu jeito', desc: 'Personalizou os apoios', ico: '🎨' },
    { id: 'contraste', nome: 'Alto contraste', desc: 'Ativou o modo de alto contraste', ico: '◐' },
    { id: 'curioso', nome: 'Curioso', desc: 'Fez 3 perguntas ao assistente', ico: '★' }
  ]
};

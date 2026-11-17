/* EduAcessível — painel do professor (dados demonstrativos)
   Simula o acompanhamento da aula; o professor decide cada pedido de ajuda. */
window.EA = window.EA || {};

EA.Professor = (() => {
  const $ = id => document.getElementById(id);
  let pedidos = [];

  function esc(s) { return s.replace(/</g, '&lt;'); }

  function renderPedidos() {
    const ul = $('pedidos');
    if (!ul) return;
    ul.innerHTML = '';
    if (!pedidos.length) {
      ul.innerHTML = '<li class="vazio">Nenhum pedido de ajuda no momento. Turma acompanhando bem a aula.</li>';
    }
    pedidos.forEach(p => {
      const li = document.createElement('li');
      li.className = 'pedido st-' + p.status.replace(/\s/g, '-');
      li.innerHTML =
        '<div class="p-top"><b>' + esc(p.nome) + '</b><span class="p-hora">' + p.hora + '</span>' +
        '<span class="p-status">' + p.status + '</span></div>' +
        '<p class="p-txt">' + esc(p.texto) + '</p>' +
        '<div class="p-det" hidden>' + esc(p.detalhe) + '</div>' +
        '<div class="p-acoes">' +
          '<button type="button" class="mini" data-a="det">Detalhes</button>' +
          (p.status !== 'resolvido' ? '<button type="button" class="mini" data-a="ind">Responder individualmente</button>' : '') +
          (p.status === 'pendente' ? '<button type="button" class="mini" data-a="turma">Abordar com a turma</button>' : '') +
        '</div>';
      li.querySelector('[data-a=det]').addEventListener('click', ev => {
        const det = li.querySelector('.p-det');
        det.hidden = !det.hidden;
        ev.target.textContent = det.hidden ? 'Detalhes' : 'Ocultar';
      });
      const bi = li.querySelector('[data-a=ind]');
      if (bi) bi.addEventListener('click', () => { p.status = 'resolvido'; atualizar(); });
      const bt = li.querySelector('[data-a=turma]');
      if (bt) bt.addEventListener('click', () => { p.status = 'resolvido'; atualizar(); });
      ul.appendChild(li);
    });
    const kpi = $('kpi-ped');
    if (kpi) kpi.textContent = String(pedidos.filter(p => p.status !== 'resolvido').length);
  }

  function renderGraf() {
    const box = $('graf');
    if (!box) return;
    const max = Math.max(...EA.DADOS.apoiosTurma.map(a => a.n));
    box.innerHTML = EA.DADOS.apoiosTurma.map(a =>
      '<div class="bar-row"><span class="bar-l">' + a.nome + '</span>' +
      '<span class="bar-t"><span class="bar-f" style="width:' + Math.round(a.n / max * 100) + '%"></span></span>' +
      '<span class="bar-n">' + a.n + '</span></div>'
    ).join('');
  }

  function renderDuvidas() {
    const ul = $('duvidas');
    if (!ul) return;
    ul.innerHTML = '';
    EA.DADOS.duvidas.forEach(d => {
      const li = document.createElement('li');
      li.innerHTML = '<span>' + esc(d.tema) + '</span><b>' + d.n + ' alunos</b>';
      ul.appendChild(li);
    });
  }

  function atualizar() { renderPedidos(); }

  function init() {
    pedidos = EA.DADOS.pedidos.map(p => ({ ...p }));
    renderPedidos(); renderGraf(); renderDuvidas();
  }

  return { init };
})();

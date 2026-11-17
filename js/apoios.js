/* EduAcessível — Meus Apoios (preferências do estudante)
   Cada preferência aplica um efeito real na interface e é persistida. */
window.EA = window.EA || {};

EA.Apoios = (() => {
  const K = 'eduacess-apoios';
  let prefs = { visual: false, auditivo: false, motor: false, comunicacao: false, leitura: false, pictogramas: false };

  const NOMES = {
    visual: 'Apoio visual', auditivo: 'Apoio auditivo', motor: 'Apoio motor',
    comunicacao: 'Apoio à comunicação', leitura: 'Leitura simplificada', pictogramas: 'Pictogramas'
  };

  function salvar() {
    try { localStorage.setItem(K, JSON.stringify(prefs)); } catch (e) {}
  }

  function ativos() {
    return Object.keys(prefs).filter(k => prefs[k]);
  }

  function aplicar() {
    const b = document.body;
    b.classList.toggle('apoio-motor', prefs.motor);

    // Apoio visual: garante texto ampliado (se ainda estiver no tamanho padrão)
    if (prefs.visual && EA.A11y && EA.A11y.st.fonte < 115) {
      EA.A11y.st.fonte = 115;
      document.documentElement.style.fontSize = '115%';
    }

    // Apoio à comunicação: mostra respostas rápidas por toque
    const rap = document.getElementById('rapidas');
    if (rap) rap.hidden = !prefs.comunicacao;

    // Status textual para leitores de tela e usuários
    const st = document.getElementById('apoios-status');
    if (st) {
      const a = ativos();
      st.textContent = a.length
        ? 'Apoios ativos: ' + a.map(k => NOMES[k]).join(' · ') + '.'
        : 'Nenhum apoio selecionado.';
    }
  }

  function init() {
    try {
      const salvo = JSON.parse(localStorage.getItem(K));
      if (salvo) prefs = { ...prefs, ...salvo };
    } catch (e) {}

    document.querySelectorAll('#apoios-list input[type=checkbox]').forEach(cb => {
      const key = cb.dataset.apoio;
      cb.checked = !!prefs[key];
      cb.addEventListener('change', () => {
        prefs[key] = cb.checked;
        salvar(); aplicar();
        if (cb.checked && EA.Conq) EA.Conq.unlock('apoios');
      });
    });
    aplicar();
  }

  return { init, get prefs() { return prefs; }, ativos };
})();

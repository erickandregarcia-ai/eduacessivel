/* EduAcessível — ferramentas de acessibilidade (barra fixa)
   Tamanho do texto · alto contraste · leitura em voz alta (SpeechSynthesis)
   Preferências persistidas em localStorage. */
window.EA = window.EA || {};

EA.A11y = (() => {
  const K = 'eduacess-a11y';
  const PASSO = 15, MIN = 85, MAX = 145;
  let st = { fonte: 100, contraste: false };

  const $ = id => document.getElementById(id);

  function salvar() {
    try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) {}
  }

  function aplicarFonte() {
    document.documentElement.style.fontSize = st.fonte + '%';
  }

  function aplicarContraste() {
    document.body.classList.toggle('alto-contraste', st.contraste);
    const b = $('a-contraste');
    if (b) b.setAttribute('aria-pressed', String(st.contraste));
  }

  function mudarFonte(delta) {
    st.fonte = Math.min(MAX, Math.max(MIN, st.fonte + delta));
    aplicarFonte(); salvar();
    EA.Conq && EA.Conq.unlock('apoios');
  }

  function toggleContraste() {
    st.contraste = !st.contraste;
    aplicarContraste(); salvar();
    if (st.contraste && EA.Conq) EA.Conq.unlock('contraste');
  }

  /* --- SpeechSynthesis --- */
  const ttsOK = 'speechSynthesis' in window;

  function falar(texto) {
    if (!ttsOK || !texto) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'pt-BR';
    u.rate = 1;
    window.speechSynthesis.speak(u);
    EA.Conq && EA.Conq.unlock('ouviu');
    return true;
  }

  function parar() {
    if (ttsOK) window.speechSynthesis.cancel();
  }

  function lerPagina() {
    const main = document.getElementById('conteudo');
    if (!main) return;
    let texto = main.innerText.replace(/\s+\n/g, '\n').trim();
    if (texto.length > 4000) texto = texto.slice(0, 4000) + '. Leitura resumida para demonstração.';
    falar(texto);
  }

  function init() {
    try {
      const salvo = JSON.parse(localStorage.getItem(K));
      if (salvo) st = { ...st, ...salvo };
    } catch (e) {}
    aplicarFonte(); aplicarContraste();

    $('a-menor') && $('a-menor').addEventListener('click', () => mudarFonte(-PASSO));
    $('a-maior') && $('a-maior').addEventListener('click', () => mudarFonte(PASSO));
    $('a-contraste') && $('a-contraste').addEventListener('click', toggleContraste);
    $('a-ouvir') && $('a-ouvir').addEventListener('click', lerPagina);
    $('a-parar') && $('a-parar').addEventListener('click', parar);

    if (!ttsOK) {
      ['a-ouvir', 'a-parar'].forEach(id => {
        const b = $(id);
        if (b) { b.disabled = true; b.title = 'Leitura não suportada neste navegador'; }
      });
    }
  }

  return { init, falar, parar, mudarFonte, toggleContraste, get st() { return st; } };
})();

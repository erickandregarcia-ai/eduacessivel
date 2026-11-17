/* EduAcessível — inicialização, navegação e menu mobile */
window.EA = window.EA || {};

(function () {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  function fechaMenu() {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  }

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', fechaMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') fechaMenu(); });
    document.addEventListener('click', e => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== burger) fechaMenu();
    });
  }

  /* scroll suave compensando o header fixo */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const alvo = id && document.getElementById(id);
      if (!alvo) return;
      e.preventDefault();
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });
  });

  /* inicializa módulos */
  ['A11y', 'Conq', 'Apoios', 'Assistente', 'Professor'].forEach(m => {
    if (EA[m] && EA[m].init) {
      try { EA[m].init(); } catch (err) { console.error('EA.' + m, err); }
    }
  });
})();

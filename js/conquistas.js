/* EduAcessível — conquistas (gamificação inclusiva, sem ranking) */
window.EA = window.EA || {};

EA.Conq = (() => {
  const K = 'eduacess-conq';
  const XP_POR_CONQ = 15;
  let st = { unlocked: {}, xp: 0 };

  const $ = id => document.getElementById(id);

  function salvar() {
    try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) {}
  }

  function render() {
    const ul = $('badges');
    if (!ul) return;
    ul.innerHTML = '';
    EA.DADOS.conquistas.forEach(c => {
      const li = document.createElement('li');
      const ok = !!st.unlocked[c.id];
      li.className = 'badge-c' + (ok ? ' on' : '');
      li.innerHTML =
        '<span class="b-ico" aria-hidden="true">' + c.ico + '</span>' +
        '<span class="b-nome">' + c.nome + '</span>' +
        '<span class="b-desc">' + (ok ? c.desc : 'Bloqueada') + '</span>';
      li.setAttribute('aria-label', c.nome + (ok ? ' — conquistada: ' + c.desc : ' — ainda bloqueada'));
      ul.appendChild(li);
    });
    const xp = Math.min(st.xp, 100);
    const fill = $('xp-fill'), bar = $('xp-bar'), val = $('xp-val');
    if (fill) fill.style.width = xp + '%';
    if (bar) bar.setAttribute('aria-valuenow', String(xp));
    if (val) val.textContent = st.xp + ' XP';
  }

  function toast(msg) {
    const t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => { t.classList.remove('show'); t.hidden = true; }, 3200);
  }

  function unlock(id) {
    if (st.unlocked[id]) return;
    const c = EA.DADOS.conquistas.find(x => x.id === id);
    if (!c) return;
    st.unlocked[id] = true;
    st.xp += XP_POR_CONQ;
    salvar(); render();
    toast('Conquista desbloqueada: ' + c.nome);
  }

  function init() {
    try {
      const salvo = JSON.parse(localStorage.getItem(K));
      if (salvo) st = { ...st, ...salvo };
    } catch (e) {}
    render();
  }

  return { init, unlock, toast };
})();

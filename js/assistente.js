/* EduAcessível — camaleão-assistente (DEMONSTRAÇÃO)
   Respostas vêm da base local EA.DADOS.faq. A função responder() é o ponto
   de integração futura com uma API de IA real (trocar a implementação,
   manter a interface). */
window.EA = window.EA || {};

EA.Assistente = (() => {
  const $ = id => document.getElementById(id);
  let chat, input, ultimaResp = '', nPerguntas = 0;

  const AVATAR = '<span class="avatar" aria-hidden="true"><svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="17" ry="15" fill="#6FC49F"/><path d="M12 10 Q20 2 28 10 Q20 7 12 10 Z" fill="#4BBFAE"/><circle cx="14" cy="20" r="4.5" fill="#fff"/><circle cx="26" cy="20" r="4.5" fill="#fff"/><circle cx="14.5" cy="20.5" r="2.2" fill="#49345F"/><circle cx="25.5" cy="20.5" r="2.2" fill="#49345F"/><path d="M15 28 Q20 32 25 28" fill="none" stroke="#2E6B54" stroke-width="2" stroke-linecap="round"/></svg></span>';

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /* PONTO DE INTEGRAÇÃO FUTURA:
     substituir o corpo desta função por uma chamada à API de IA.
     Manter o retorno { texto, simples, pic } para não quebrar a UI. */
  function responder(pergunta) {
    const q = norm(pergunta);
    const hit = EA.DADOS.faq.find(f => f.k.some(k => q.includes(k)));
    if (!hit) return { texto: EA.DADOS.fallback, simples: EA.DADOS.fallback, pic: '💡' };
    return { texto: hit.r, simples: hit.s, pic: hit.pic };
  }

  function msg(classe, html) {
    const d = document.createElement('div');
    d.className = 'msg ' + classe;
    d.innerHTML = (classe === 'ia' ? AVATAR : '') + '<div class="balao">' + html + '</div>';
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
    return d;
  }

  function escolherTexto(r) {
    const simples = EA.Apoios && EA.Apoios.prefs.leitura;
    return simples ? (r.simples || r.texto) : r.texto;
  }

  function enviarPergunta(texto, viaSugestao) {
    texto = (texto || '').trim();
    if (!texto) return;

    msg('user', texto.replace(/</g, '&lt;'));
    nPerguntas++;
    if (viaSugestao && EA.Conq) EA.Conq.unlock('sugestao');
    if (EA.Conq) {
      EA.Conq.unlock('pergunta1');
      if (nPerguntas >= 3) EA.Conq.unlock('curioso');
    }

    const typing = msg('ia typing', '<span class="dots"><i></i><i></i><i></i></span> Camaleão pensando...');

    setTimeout(() => {
      typing.remove();
      const r = responder(texto);
      let resp = escolherTexto(r);
      ultimaResp = resp;
      if (EA.Apoios && EA.Apoios.prefs.pictogramas && r.pic) {
        resp += ' <span class="pic" aria-hidden="true">' + r.pic + '</span>';
      }
      const el = msg('ia', resp.replace(/</g, '&lt;').replace(/\*(.+?)\*/g, '<b>$1</b>'));
      if (EA.Apoios && EA.Apoios.prefs.auditivo && EA.A11y) {
        EA.A11y.falar(el.innerText);
      }
    }, 700);
  }

  function respostaRapida(item) {
    msg('user', item.msg.replace(/</g, '&lt;'));
    const typing = msg('ia typing', '<span class="dots"><i></i><i></i><i></i></span>');
    setTimeout(() => {
      typing.remove();
      const resp = item.resp || ultimaResp || EA.DADOS.fallback;
      const el = msg('ia', resp.replace(/</g, '&lt;'));
      if (EA.Apoios && EA.Apoios.prefs.auditivo && EA.A11y) EA.A11y.falar(el.innerText);
    }, 600);
  }

  function montarSugestoes() {
    const box = $('sugestoes');
    if (!box) return;
    box.innerHTML = '';
    EA.DADOS.sugestoes.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-q';
      b.textContent = s;
      b.addEventListener('click', () => enviarPergunta(s, true));
      box.appendChild(b);
    });
  }

  function montarRapidas() {
    const box = $('rapidas');
    if (!box) return;
    box.innerHTML = '';
    EA.DADOS.respostasRapidas.forEach(item => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-q rap';
      b.textContent = item.rotulo;
      b.addEventListener('click', () => respostaRapida(item));
      box.appendChild(b);
    });
  }

  function init() {
    chat = $('chat'); input = $('pergunta');
    const aula = EA.DADOS.aula;
    const ctx = $('ctx-aula');
    if (ctx) ctx.textContent = aula.materia + ' · ' + aula.tema + ' · ' + aula.turma;

    montarSugestoes();
    montarRapidas();

    const form = $('chat-form');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      enviarPergunta(input.value);
      input.value = '';
      input.focus();
    });
  }

  return { init, enviarPergunta };
})();

# EduAcessível

> **Apoio, autonomia e participação para cada forma de aprender.**

Projeto desenvolvido para o **Hack Brasil 2026** — Trilha **Acesso à Educação**.

## O problema

Estudantes com diferentes necessidades (deficiências visuais, auditivas, motoras e intelectuais, TEA, TDAH, dislexia, necessidades de comunicação alternativa e outras) enfrentam barreiras para participar plenamente das aulas presenciais. Em pesquisa da Fundação Lemann (2021), 40% dos docentes de escolas públicas declararam nunca ter feito formação sobre inclusão. Ao mesmo tempo, o apoio que funciona varia de pessoa para pessoa — não existe uma única forma de aprender.

## A proposta

O **EduAcessível** é uma proposta de tecnologia assistiva educacional que usa inteligência artificial como **ponte entre o conteúdo, o estudante e o professor** dentro da sala de aula presencial:

- **Apoios personalizáveis** — leitura em voz alta, texto ampliado, alto contraste, Libras, pictogramas, redução de estímulos e mais, combináveis sem exigir diagnóstico
- **IA que acompanha a aula** — explica, exemplifica, retoma conteúdo e responde dúvidas no ritmo do estudante
- **Professor no comando** — visão da turma com pedidos de ajuda e insights de participação

**O que não é:** não é ensino a distância e não substitui o professor.

## Mascote

O **camaleão** representa adaptação: é a tecnologia que se adapta ao estudante — e não o contrário.

## Status

**MVP demonstrativo funcional.** A página pública inclui uma demonstração interativa da experiência "Minha aula" e do painel do professor. Respostas e dados são simulados (base local) — nenhuma IA conectada nesta versão; o código está organizado para integrar uma API de IA posteriormente (`js/assistente.js` → função `responder()`).

### O que funciona hoje (real, no navegador)

- Barra de acessibilidade: texto A−/A+, alto contraste, leitura em voz alta (SpeechSynthesis) com interrupção — preferências persistidas
- Meus Apoios: seleção de preferências (visual, auditivo, motor, comunicação, leitura simplificada, pictogramas) com efeito real na interface
- Camaleão-assistente: chat com base local de perguntas frequentes, sugestões prontas e respostas rápidas
- Painel do professor: pedidos de ajuda com ações (detalhes/responder/abordar), apoios da turma, tópicos com mais dúvidas — **dados fictícios identificados**
- Conquistas: XP e selos por exploração, sem ranking

## Estrutura

```
├── index.html          → capa + seções do MVP (publicada via GitHub Pages)
├── css/style.css       → identidade visual + estilos do MVP
├── js/
│   ├── dados.js        → base local simulada (contrato p/ futura API)
│   ├── acessibilidade.js → fonte, contraste, SpeechSynthesis
│   ├── apoios.js       → preferências do estudante
│   ├── assistente.js   → chat do camaleão (ponto de integração com IA)
│   ├── professor.js    → painel do professor (dados simulados)
│   ├── conquistas.js   → gamificação sem ranking
│   └── app.js          → navegação, menu mobile, inicialização
├── assets/             → mascote, ilustrações e ícones
└── docs/               → (futuro) briefing, pesquisas e roteiro de pitch
```

## Stack

HTML + CSS + **JavaScript puro** (sem frameworks, sem dependências externas).

## Equipe

Erick André Garcia · Geovana Calixto Costa · Gabriel A. São José · Felipe Silva

## Links

- Página do projeto: https://erickandregarcia-ai.github.io/eduacessivel/
- Hack Brasil: https://luma.com/hackbr

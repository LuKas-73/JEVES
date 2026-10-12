# Contexto do projeto JEVES

## Visão geral

Este projeto é a interface web dos Jogos Escolares de Vespasiano (JEVES). A página inicial é [`index.html`](./index.html); as demais páginas públicas ficam em [`publico/`](./publico/), as páginas de erro em [`erros/`](./erros/) e os recursos compartilhados em [`assets/`](./assets/).

A interface usa HTML, CSS, JavaScript nos próprios arquivos HTML e módulos TypeScript em `assets/ts`. O framework Bootstrap e os ícones Bootstrap Icons são carregados por CDN nas páginas que precisam deles. O repositório contém pontos de integração com uma API, mas várias interações e dados ainda são de demonstração; a interface não deve ser confundida com um backend ou banco de dados.

## Página inicial: `index.html`

Apresenta o JEVES 2026 e organiza o conteúdo em seções de apresentação, modalidades, informações do evento e chamadas para as páginas públicas. Utiliza o design system de `assets/css` e componentes de Bootstrap.

No `index.html`, reutilizei e adaptei a animação de partículas de um projeto antigo. O JavaScript cria pontos em um canvas, movimenta-os, reposiciona-os ao redimensionar a janela e desenha conexões entre partículas próximas. `requestAnimationFrame` mantém a animação atualizada. A quantidade de partículas é definida em `Array.from`; raio, velocidade e aparência são definidos em `criarParticula`; cores, limites e distância das conexões ficam em `animar`.

Outras funções e recursos de interface usados nos scripts inline:

- `alternarMenu(abrir)`: abre ou fecha o menu móvel, atualiza `aria-expanded`/`aria-hidden` e o ícone; o menu também fecha ao clicar fora, pressionar Escape ou escolher um link.
- O listener de `scroll` adiciona a classe `rolado` à navegação quando a página desce, para aplicar o estilo de navbar recolhida.
- `IntersectionObserver` observa elementos com a classe `animado` e adiciona a classe `visivel` quando entram na área visível, acionando as animações de entrada do CSS.
- `requestAnimationFrame` é usado para a animação contínua das partículas e para acompanhar o ritmo de atualização do navegador.

Algumas dessas interações aparecem novamente, implementadas em scripts locais às páginas. Não são necessariamente chamadas a uma função compartilhada central.

## Pastas

- [`assets/`](./assets/context.md): folhas de estilo, imagem e módulos TypeScript.
- [`erros/`](./erros/context.md): páginas para erros HTTP e sessão expirada.
- [`publico/`](./publico/context.md): páginas de navegação, torneios, calendário, acesso e cadastro.

Cada subpasta de `assets` também tem seu próprio `context.md` com a descrição dos recursos e módulos presentes.

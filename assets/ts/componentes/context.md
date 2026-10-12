# Contexto de `assets/ts/componentes`

Componentes TypeScript reutilizáveis de interface:

- `navbar.ts`: inicializa comportamento da navegação e gera a navbar pública.
- `sidebar.ts`: cria menu lateral conforme perfil (escola, organizador ou administrador).
- `barSuperior.ts` e `cabecalhoPagina.ts`: montam a barra superior e o cabeçalho/breadcrumb de uma página.
- `rodape.ts`: gera o rodapé.
- `badgeStatus.ts`: converte estados de inscrição, torneio ou jogo em badges visuais.
- `modal.ts`: apresenta modal de confirmação.
- `stepper.ts`: controla etapas de um fluxo, com avanço, retorno e navegação para uma etapa.
- `tabelaDados.ts`: renderiza tabela com filtragem, ordenação e paginação/controles definidos pelas opções.

As funções exportadas recebem elementos do DOM e opções tipadas. O componente precisa ser chamado pela página que possui o contêiner correspondente.

# Contexto de `assets`

Esta pasta reúne recursos compartilhados pela interface:

- [`css/`](./css/context.md): variáveis visuais, estilos globais e componentes do design system.
- [`Img/`](./Img/context.md): imagens utilizadas pelo site, incluindo o logotipo.
- [`ts/`](./ts/context.md): utilitários e componentes escritos em TypeScript.

As páginas HTML importam os estilos por caminho relativo. Os módulos TypeScript são fontes organizadas para utilitários e componentes; `tsconfig.json` define compilação estrita para ES2020 e saída em `assets/js`.

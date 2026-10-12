# Contexto de `assets/ts`

Fontes TypeScript dos utilitários e componentes compartilháveis da interface. O `tsconfig.json` da raiz habilita modo estrito, compila para ES2020 e define `assets/ts` como raiz das fontes e `assets/js` como diretório de saída.

- [`componentes/`](./componentes/context.md): componentes de interface que podem ser montados ou inicializados em páginas.
- [`utilitarios/`](./utilitarios/context.md): validação de dados, mensagens, sessão e chamadas HTTP.

Os módulos usam tipos e interfaces para descrever opções e respostas. Para uma página utilizar uma função desses módulos, ela precisa importar o módulo compilado correspondente; scripts inline existentes em HTML podem ter implementações próprias e não passam automaticamente a usar estes utilitários.

# Contexto de `assets/ts`

Fontes TypeScript dos utilitários, tipos, serviços e componentes compartilháveis da interface do JEVES. O `tsconfig.json` da raiz habilita modo estrito, compila para ES2020 e define `assets/ts` como raiz das fontes e `assets/js` como diretório de saída.

## Estrutura de Pastas

- [`tipos/`](./tipos/context.md): tipos e interfaces de dados que espelham o Modelo Lógico do Banco de Dados (Escolas, Torneios, Equipes, Alunos, Jogos, etc.) e seus respectivos DTOs.
- [`servicos/`](./servicos/context.md): clientes e serviços de integração tipados com a API Python REST (`servicoAuth`, `servicoEscolas`, `servicoTorneios`, `servicoJogos`, etc.).
- [`utilitarios/`](./utilitarios/context.md): motor de requisições HTTP (`api.ts`), validações de formulário (`validadores.ts`), gerenciamento de sessão/JWT (`autenticacao.ts`) e feedback ao usuário (`toast.ts`).
- [`componentes/`](./componentes/context.md): componentes de interface que podem ser montados ou inicializados em páginas (sidebar, modal, stepper, tabela, navbar).

## Fluxo de Compilação e Uso

O TypeScript compila os módulos em arquivos `.js` dentro de `assets/js/`. As páginas HTML podem importar os utilitários e serviços como módulos ES (`<script type="module">`) ou por bundler, conectando os fluxos da interface diretamente à API Python sem depender de mocks manuais.

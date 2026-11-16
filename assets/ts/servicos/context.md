# Contexto de `assets/ts/servicos`

Este diretório contém os serviços TypeScript que conectam as páginas e componentes do frontend às rotas da API REST em Python (Flask).

## Arquivos

- `apiCliente.ts`: encapsula chamadas HTTP tipadas para cada entidade do sistema, utilizando a infraestrutura de requisição de `../utilitarios/api`:
  - `servicoAuth`: login, logout e consulta dos dados do usuário logado (`/api/auth/*`).
  - `servicoEscolas`: listagem, detalhe, criação, edição e exclusão de escolas (`/api/escolas/*`).
  - `servicoUsuarios`: gerenciamento de contas e troca de senhas (`/api/usuarios/*`).
  - `servicoTorneios`: ciclo de vida dos torneios e transição de status (`/api/torneios/*`).
  - `servicoModalidades`: modalidades esportivas (`/api/modalidades/*`).
  - `servicoCategorias`: faixas etárias e gêneros (`/api/categorias/*`).
  - `servicoTorneioModalidades`: amarração entre torneios, modalidades e categorias (`/api/torneio-modalidades/*`).
  - `servicoInscricoes`: submissão por escolas e análise/aprovação por organizadores (`/api/inscricoes/*`).
  - `servicoEquipes`: criação de times e vinculação de alunos atletas com camisa e posição (`/api/equipes/*`).
  - `servicoAlunos`: cadastro escolar de estudantes e upload de foto (`/api/alunos/*`).
  - `servicoLocais`: ginásios e arenas esportivas (`/api/locais/*`).
  - `servicoJogos`: agendamento de partidas e lançamento de placares (`/api/jogos/*`).
- `index.ts`: ponto de entrada para reexportação dos serviços.

## Integração com a API

Todas as funções retornam `Promise<RespostaApi<T>>`, onde:
- `dados`: objeto ou array retornado pelo backend caso a requisição tenha sucesso.
- `erro`: mensagem explicativa retornada pelo servidor ou erro de rede caso falhe.
- `status`: código HTTP da resposta.
Os tokens JWT são injetados automaticamente no cabeçalho `Authorization: Bearer <token>` em todas as rotas protegidas.


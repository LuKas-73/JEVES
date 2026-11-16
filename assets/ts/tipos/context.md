# Contexto de `assets/ts/tipos`

Este diretório contém as definições de tipos e interfaces TypeScript que refletem fielmente o **Modelo Lógico do Banco de Dados** dos Jogos Escolares de Vespasiano (JEVES).

## Arquivos

- `modelos.ts`: declaração de todas as interfaces das tabelas relacionais do banco de dados, tipos enumerados de status e DTOs (Data Transfer Objects) para operações de criação, atualização e filtros de busca:
  - **Escolas**: `Escola`, `CriarEscolaDTO`, `AtualizarEscolaDTO`
  - **Usuários**: `Usuario`, `CriarUsuarioDTO`, `AtualizarUsuarioDTO`, `PerfilUsuario`
  - **Torneios**: `Torneio`, `CriarTorneioDTO`, `AtualizarTorneioDTO`, `StatusTorneio`
  - **Modalidades**: `Modalidade`, `CriarModalidadeDTO`, `AtualizarModalidadeDTO`, `TipoModalidade`
  - **Categorias**: `Categoria`, `CriarCategoriaDTO`, `AtualizarCategoriaDTO`, `GeneroCategoria`
  - **Torneio_Modalidades**: `TorneioModalidade`, `CriarTorneioModalidadeDTO`, `AtualizarTorneioModalidadeDTO`
  - **Inscrições**: `Inscricao`, `CriarInscricaoDTO`, `FiltrosInscricao`, `StatusInscricao`
  - **Equipes**: `Equipe`, `CriarEquipeDTO`, `AtualizarEquipeDTO`
  - **Alunos**: `Aluno`, `CriarAlunoDTO`, `AtualizarAlunoDTO`
  - **Equipe_Alunos**: `EquipeAluno`, `CriarEquipeAlunoDTO`
  - **Locais**: `Local`, `CriarLocalDTO`, `AtualizarLocalDTO`
  - **Jogos**: `Jogo`, `CriarJogoDTO`, `AtualizarJogoDTO`, `FiltrosJogo`, `StatusJogo`
  - **Sessão / Auth**: `RespostaLogin`
- `index.ts`: ponto de entrada para reexportação dos tipos.

## Finalidade

Garantir type-safety em tempo de compilação entre o frontend web e a API REST em Python (Flask/SQLAlchemy), prevenindo inconsistências de atributos e facilitando manutenção e autocompletion no desenvolvimento.


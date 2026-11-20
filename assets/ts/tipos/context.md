# Contexto de `assets/ts/tipos`

Este diretório contém as definições de tipos e interfaces TypeScript que refletem com exatidão o **Modelo Físico do Banco de Dados `projetojeves`** definido no arquivo [`api/database/schema.sql`](../../api/database/schema.sql).

## Arquivos

- `modelos.ts`: declaração de todas as interfaces das tabelas relacionais do banco de dados, tipos enumerados de status e DTOs (Data Transfer Objects) para operações de criação, atualização e filtros de busca:
  - **Escolas (`escolas`)**: `Escola`, `CriarEscolaDTO`, `AtualizarEscolaDTO`, `TipoEscola` (`'municipal' | 'estadual' | 'federal' | 'privada'`)
  - **Usuários (`usuarios`)**: `Usuario`, `CriarUsuarioDTO`, `AtualizarUsuarioDTO`, `PerfilUsuario` (`'admin' | 'organizador' | 'escola'`)
  - **Torneios (`torneios`)**: `Torneio`, `CriarTorneioDTO`, `AtualizarTorneioDTO`, `StatusTorneio` (`'rascunho' | 'inscricoes_abertas' | 'em_andamento' | 'encerrado' | 'cancelado'`)
  - **Modalidades (`modalidades`)**: `Modalidade`, `CriarModalidadeDTO`, `AtualizarModalidadeDTO`, `TipoModalidade` (`'individual' | 'coletiva'`)
  - **Categorias (`categorias`)**: `Categoria`, `CriarCategoriaDTO`, `AtualizarCategoriaDTO`, `GeneroCategoria` (`'masculino' | 'feminino' | 'misto'`)
  - **Torneio_Modalidades (`torneio_modalidades`)**: `TorneioModalidade`, `CriarTorneioModalidadeDTO`, `AtualizarTorneioModalidadeDTO`
  - **Inscrições (`inscricoes`)**: `Inscricao`, `CriarInscricaoDTO`, `FiltrosInscricao`, `StatusInscricao` (`'pendente' | 'aprovada' | 'rejeitada' | 'cancelada'`)
  - **Equipes (`equipes`)**: `Equipe`, `CriarEquipeDTO`, `AtualizarEquipeDTO`
  - **Alunos (`alunos`)**: `Aluno`, `CriarAlunoDTO`, `AtualizarAlunoDTO`, `GeneroAluno` (`'masculino' | 'feminino'`)
  - **Equipe_Alunos (`equipe_alunos`)**: `EquipeAluno`, `CriarEquipeAlunoDTO`
  - **Locais (`locais`)**: `Local`, `CriarLocalDTO`, `AtualizarLocalDTO`
  - **Jogos (`jogos`)**: `Jogo`, `CriarJogoDTO`, `AtualizarJogoDTO`, `FiltrosJogo`, `StatusJogo` (`'agendado' | 'em_andamento' | 'finalizado' | 'adiado' | 'cancelado'`)
  - **Sessão / Auth**: `RespostaLogin`
- `index.ts`: ponto de entrada para reexportação dos tipos.

## Finalidade

Garantir type-safety em tempo de compilação entre o frontend web e a API REST em Python (Flask/SQLAlchemy), respeitando com rigor todas as constraints (`CHECK`, `UNIQUE`, `NOT NULL`) do banco MySQL oficial.

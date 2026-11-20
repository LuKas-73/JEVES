# Contexto do projeto JEVES

## Visão geral

Este projeto é a plataforma web dos Jogos Escolares de Vespasiano (JEVES). Ele conecta o frontend (HTML, CSS e TypeScript) a uma **API REST em Python (Flask + SQLAlchemy)** e ao **Banco de Dados MySQL `projetojeves`** estruturado a partir do dump oficial em [`api/database/schema.sql`](./api/database/schema.sql).

A página inicial é [`index.html`](./index.html); as páginas públicas ficam em [`publico/`](./publico/), as áreas autenticadas em [`escola/`](./escola/), [`organizador/`](./organizador/) e [`admin/`](./admin/), as páginas de erro em [`erros/`](./erros/) e os recursos compartilhados em [`assets/`](./assets/). O backend está localizado em [`api/`](./api/).

## Arquitetura de Integração (Frontend + API + Banco de Dados)

### 1. Banco de Dados MySQL Oficial (`api/database/schema.sql`)
- **Nome do Banco:** `projetojeves`
- **Tabelas e Constraints:**
  - `escolas`: código INEP, CNPJ e e-mail únicos; tipos restritos via check (`municipal`, `estadual`, `federal`, `privada`).
  - `usuarios`: perfis restritos via check (`admin`, `organizador`, `escola`).
  - `torneios`: validação de datas via check (`data_fim >= data_inicio`, `fim_inscricoes > inicio_inscricoes`) e status (`rascunho`, `inscricoes_abertas`, `em_andamento`, `encerrado`, `cancelado`).
  - `modalidades`: validação de contagem de alunos via check e tipo (`individual`, `coletiva`).
  - `categorias`: faixas etárias validadas e gênero (`masculino`, `feminino`, `misto`).
  - `torneio_modalidades`: amarração única por torneio, modalidade e categoria.
  - `inscricoes`: status restritos (`pendente`, `aprovada`, `rejeitada`, `cancelada`).
  - `equipes` & `equipe_alunos`: unicidade de camisa e atleta na equipe.
  - `alunos`: gênero restrito (`masculino`, `feminino`).
  - `locais` & `jogos`: status de partida (`agendado`, `em_andamento`, `finalizado`, `adiado`, `cancelado`) com placares.

### 2. Backend em Python (`api/`)
- **Framework**: Flask com Flask-CORS e Flask-SQLAlchemy (driver PyMySQL).
- **Comandos SQL Explícitos**: Todas as consultas e operações em [`api/routes/`](./api/routes/) utilizam comandos nativos MySQL (`SELECT`, `INSERT INTO`, `UPDATE`, `DELETE`, `JOIN`) através de `text(...)` com parametrização segura (`:param`).
- **Autenticação**: Tokens JWT (`PyJWT`) com expiração e perfil de acesso (`escola`, `organizador`, `admin`).
- **Configuração**: Gerenciada via `.env` (credenciais MySQL apontando para `projetojeves`, secret JWT, portas e CORS).

### 3. Frontend em TypeScript (`assets/ts/`)
- **`tipos/`**: Interfaces tipadas correspondentes a cada tabela e status do banco (`Escola`, `Torneio`, `Aluno`, `Jogo`, etc.).
- **`servicos/`**: Camada de serviços (`servicoAuth`, `servicoEscolas`, `servicoTorneios`, `servicoJogos`, etc.) que executam chamadas assíncronas tipadas à API.
- **`utilitarios/`**:
  - `api.ts`: Cliente HTTP base configurado com a `baseUrl` da API (padrão `http://localhost:5000`), envio automático de token Bearer no cabeçalho `Authorization` e suporte a JSON e FormData.
  - `autenticacao.ts`: Gerenciamento de sessão, token JWT e permissões por perfil.
  - `toast.ts`: Sistema de feedback e alertas na tela.
  - `validadores.ts`: Validações de CNPJ, CEP, e-mail e regras de negócio de formulários.
- **`componentes/`**: Componentes reutilizáveis (sidebar, stepper, modais, cabeçalhos, etc.).

### 4. Compilação TypeScript
O `tsconfig.json` está configurado com `rootDir: "./assets/ts"` e `outDir: "./assets/js"`, compilando em padrão ES2020 para consumo pelas páginas HTML.

## Pastas do Projeto

- [`api/`](./api/app.py): Backend Python da aplicação com rotas em SQL explícito e configuração do banco.
- [`api/database/schema.sql`](./api/database/schema.sql): Dump SQL real do banco `projetojeves`.
- [`assets/`](./assets/context.md): Folhas de estilo, imagens e código TypeScript (`tipos`, `servicos`, `utilitarios`, `componentes`).
- [`escola/`](./escola/context.md): Painel, cadastros de alunos, gestão de equipes, torneios abertos e submissão de inscrições.
- [`organizador/`](./organizador/context.md): Gestão de torneios, análise de inscrições, agendamento de partidas e lançamento de resultados.
- [`admin/`](./admin/context.md): Gestão administrativa de usuários, instituições de ensino, modalidades e categorias.
- [`erros/`](./erros/context.md): Telas para códigos HTTP (403, 404, 500) e sessão expirada.
- [`publico/`](./publico/context.md): Navegação aberta, consulta de torneios, calendário, login e cadastro de escolas.

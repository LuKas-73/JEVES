# Contexto do projeto JEVES

## Visão geral

Este projeto é a plataforma web dos Jogos Escolares de Vespasiano (JEVES). Ele conecta o frontend (HTML, CSS e TypeScript) a uma **API REST em Python (Flask + SQLAlchemy)** e a um **Banco de Dados MySQL** estruturado segundo o modelo lógico oficial.

A página inicial é [`index.html`](./index.html); as páginas públicas ficam em [`publico/`](./publico/), as áreas autenticadas em [`escola/`](./escola/), [`organizador/`](./organizador/) e [`admin/`](./admin/), as páginas de erro em [`erros/`](./erros/) e os recursos compartilhados em [`assets/`](./assets/). O backend está localizado em [`api/`](./api/).

## Arquitetura de Integração (Frontend + API + Banco de Dados)

### 1. Backend em Python (`api/`)
- **Framework**: Flask com Flask-CORS e Flask-SQLAlchemy (driver PyMySQL).
- **Autenticação**: Tokens JWT (`PyJWT`) com expiração e perfil de acesso (`escola`, `organizador`, `admin`).
- **Modelos (`api/models/`)**: Mapeamento de todas as 12 entidades do modelo lógico (Escolas, Usuários, Torneios, Modalidades, Categorias, Torneio_Modalidades, Inscrições, Equipes, Alunos, Equipe_Alunos, Locais, Jogos).
- **Rotas (`api/routes/`)**: Endpoints REST para autenticação e operações completas em todas as entidades.
- **Configuração**: Gerenciada via `.env` (credenciais MySQL, secret JWT, portas e CORS).

### 2. Frontend em TypeScript (`assets/ts/`)
- **`tipos/`**: Interfaces tipadas correspondentes a cada tabela e status do banco (`Escola`, `Torneio`, `Aluno`, `Jogo`, etc.).
- **`servicos/`**: Camada de serviços (`servicoAuth`, `servicoEscolas`, `servicoTorneios`, `servicoJogos`, etc.) que executam chamadas assíncronas tipadas à API.
- **`utilitarios/`**:
  - `api.ts`: Cliente HTTP base configurado com a `baseUrl` da API (padrão `http://localhost:5000`), envio automático de token Bearer no cabeçalho `Authorization` e suporte a JSON e FormData.
  - `autenticacao.ts`: Gerenciamento de sessão, token JWT e permissões por perfil.
  - `toast.ts`: Sistema de feedback e alertas na tela.
  - `validadores.ts`: Validações de CNPJ, CEP, e-mail e regras de negócio de formulários.
- **`componentes/`**: Componentes reutilizáveis (sidebar, stepper, modais, cabeçalhos, etc.).

### 3. Compilação TypeScript
O `tsconfig.json` está configurado com `rootDir: "./assets/ts"` e `outDir: "./assets/js"`, compilando em padrão ES2020 para consumo pelas páginas HTML.

## Pastas do Projeto

- [`api/`](./api/app.py): Backend Python da aplicação com modelos, rotas e configuração de banco de dados.
- [`assets/`](./assets/context.md): Folhas de estilo, imagens e código TypeScript (`tipos`, `servicos`, `utilitarios`, `componentes`).
- [`escola/`](./escola/context.md): Painel, cadastros de alunos, gestão de equipes, torneios abertos e submissão de inscrições.
- [`organizador/`](./organizador/context.md): Gestão de torneios, análise de inscrições, agendamento de partidas e lançamento de resultados.
- [`admin/`](./admin/context.md): Gestão administrativa de usuários, instituições de ensino, modalidades e categorias.
- [`erros/`](./erros/context.md): Telas para códigos HTTP (403, 404, 500) e sessão expirada.
- [`publico/`](./publico/context.md): Navegação aberta, consulta de torneios, calendário, login e cadastro de escolas.

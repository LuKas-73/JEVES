# Contexto de `assets/ts/utilitarios`

Funções de apoio compartilhadas por diferentes páginas:

- `validadores.ts`: valida e formata e-mail, CNPJ, CEP, senha, confirmação, campos obrigatórios e data; também aplica/remove indicação de erro em campos.
- `toast.ts`: apresenta e remove notificações temporárias de sucesso, erro, aviso ou informação.
- `autenticacao.ts`: representa dados de usuário e sessão, lê/grava a sessão no `localStorage`, verifica perfil e redireciona para login, páginas por perfil ou erro 403.
- `api.ts`: centraliza chamadas HTTP `GET`, `POST`, `PUT`, `PATCH` e `DELETE`, gerencia envio de JSON e `FormData` (uploads), extrai mensagens de erro do backend e, se houver token local (`jeves_token`), o inclui no cabeçalho `Authorization: Bearer <token>`. A propriedade `configuracaoApi.baseUrl` aponta para `http://localhost:5000` (ajustável para produção).

Os utilitários são infraestrutura de frontend compartilhada e alimentam tanto a camada de serviços em `assets/ts/servicos/` quanto os componentes visuais.

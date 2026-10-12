# Contexto de `assets/ts/utilitarios`

Funções de apoio compartilhadas por diferentes páginas:

- `validadores.ts`: valida e formata e-mail, CNPJ, CEP, senha, confirmação, campos obrigatórios e data; também aplica/remova indicação de erro em campos.
- `toast.ts`: apresenta e remove notificações temporárias de sucesso, erro, aviso ou informação.
- `autenticacao.ts`: representa dados de usuário e sessão, lê/grava a sessão no `localStorage`, verifica perfil e redireciona para login, páginas por perfil ou erro 403.
- `api.ts`: centraliza chamadas HTTP `GET`, `POST`, `PUT`, `PATCH` e `DELETE`, envia JSON e, se houver token local, o inclui no cabeçalho Authorization. `configuracaoApi.baseUrl` está vazio e precisa ser configurado para o ambiente do backend.

Os utilitários são infraestrutura de frontend, não substituem validação/autorização no servidor. O `localStorage` e o código do navegador não devem ser considerados uma fronteira de segurança. A integração real depende de API e backend disponíveis.

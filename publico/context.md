# Contexto de `publico`

Páginas acessíveis ao público, sem a navegação de áreas autenticadas:

- `login.html`: formulário de acesso e interações de interface relacionadas ao login.
- `cadastro_escola.html`: cadastro da instituição em etapas, validação de campos, resumo, consulta de endereço via ViaCEP e confirmação visual. A confirmação atual é uma simulação; o cadastro precisa ser enviado a um backend para ser persistido.
- `recuperar_senha.html`: fluxo de solicitação e validação visual de código para recuperação. O envio, token e validação são de demonstração e precisam de backend/e-mail para funcionar em produção.
- `redefinir_senha.html`: validação local dos requisitos de senha e confirmação. A gravação da senha e validação do token devem ser feitas pelo backend.
- `torneio.html`: listagem de torneios, filtros, resumo e navegação para os detalhes. Possui um modo de dados mock e um ponto de integração com `/api/torneios`.
- `torneio_detalhe.html`: detalhes de torneio, jogos, classificações e escalações. Inclui dados gerados para demonstração e um endpoint de integração `/api/torneios/:id`.
- `calendario.html`: calendário de jogos com navegação por mês, filtros e integração prevista com API de jogos.

As páginas compartilham a identidade visual de `assets/css`, mas algumas interações — como menu móvel, partículas, notificações e validações — estão implementadas em JavaScript inline e repetidas entre arquivos. A presença de uma URL `/api` ou de uma mensagem de sucesso não significa que exista conexão funcional com um banco de dados; a API e o servidor precisam ser implementados e configurados separadamente.

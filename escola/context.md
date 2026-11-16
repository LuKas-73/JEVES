# Contexto da área da escola

As páginas em `escola/` compõem a área autenticada de instituições participantes:

- `painel.html`: resumo de inscrições, equipes, alunos e agenda demonstrativa.
- `perfil-escola.html` e `meu-perfil.html`: edição local dos dados da instituição e do usuário.
- `torneios-disponiveis.html`: busca e consulta das competições abertas.
- `nova-inscricao.html`: fluxo guiado em seis etapas para torneio, modalidade/categoria, equipe, alunos, revisão e confirmação.
- `inscricoes.html` e `inscricao-detalhe.html`: acompanhamento, retorno do organizador e correção/reenvio de uma inscrição.
- `equipes.html` e `equipe-detalhe.html`: criação de equipes e gerenciamento dos atletas, camisas e posições.
- `alunos.html`: cadastro, busca e remoção de alunos.
- Cada página contém sua estrutura HTML, estilos específicos no `<style>` local e interações no script inline.

Para facilitar testes locais, as páginas abrem com um perfil demonstrativo quando não há sessão válida no navegador. Os cadastros e inscrições também são armazenados no `localStorage`; não há conexão de persistência nem autenticação de produção nesta interface. A autorização e o armazenamento reais devem ser implementados no backend.

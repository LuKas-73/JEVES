# Contexto da área administrativa

As páginas em `admin/` compõem a interface de gestão global do JEVES:

- `painel.html`: resumo dos usuários, escolas, modalidades e categorias cadastradas.
- `usuarios.html`: cadastro, edição, busca, ativação e desativação de usuários e seus perfis.
- `escolas.html`: cadastro, edição, busca e ativação/desativação das instituições.
- `modalidades.html`: cadastro, edição, busca e ativação/desativação das modalidades.
- `categorias.html`: cadastro, edição, busca e ativação/desativação das faixas etárias e gêneros.
- Cada página contém sua estrutura HTML, estilos específicos no `<style>` local e interações no script inline.

Para testes, as páginas abrem com um perfil demonstrativo quando não há uma sessão válida; uma sessão válida de outro perfil é encaminhada à página 403. Os dados administrativos ficam no `localStorage` e não são compartilhados com a API ou com um banco de dados. A autorização e a persistência de produção precisam ser implementadas no backend.

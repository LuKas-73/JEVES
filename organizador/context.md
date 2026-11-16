# Contexto da área do organizador

As páginas em `organizador/` compõem a área de gestão das competições:

- `painel.html`: resumo de torneios, inscrições que precisam de análise e próximos jogos.
- `torneios.html` e `torneio-form.html`: listagem e cadastro/edição de torneios, períodos, regras e situação.
- `torneio-modalidades.html`: configuração de modalidades e categorias por torneio.
- `inscricoes.html` e `inscricao-analise.html`: filtros por status, escola e modalidade; consulta de equipes/alunos e decisão de aprovar, recusar ou solicitar correções.
- `equipes.html`: consulta das equipes participantes.
- `locais.html`: cadastro e remoção de locais de competição.
- `jogos.html`: agendamento e cancelamento de partidas.
- `resultados.html`: registro de placares e encerramento de jogos.
- Cada página contém sua estrutura HTML, estilos específicos no `<style>` local e interações no script inline.

Para testes, as páginas abrem com um perfil demonstrativo se não houver uma sessão válida. Uma sessão válida de outro perfil é encaminhada à página 403. Torneios, inscrições, locais, jogos e demais dados de demonstração ficam no `localStorage`; não há conexão com API ou banco de dados. A autorização e a persistência de produção precisam ser implementadas no backend.

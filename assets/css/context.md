# Contexto de `assets/css`

As folhas de estilo definem o design system compartilhado do JEVES:

- `variaveis.css`: paleta azul e dourada, gradientes, fontes Outfit/Inter, tamanhos de texto, espaçamentos, bordas, sombras, transições e camadas (`z-index`).
- `global.css`: normalização e estilos base para corpo, títulos, parágrafos, links, foco acessível, rolagem e seções.
- `componentes.css`: estilos reutilizáveis da interface, como navegação, botões, formulários, cards, badges e elementos de autenticação.

As páginas carregam normalmente `variaveis.css`, depois `global.css` e `componentes.css`, para que os tokens estejam disponíveis aos estilos globais e aos componentes. Estilos muito específicos de uma única página podem permanecer no `<style>` dessa página.

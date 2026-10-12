# Portal JEVES (Jogos Escolares de Vespasiano)

> **Projeto Acadêmico — UniBH (Centro Universitário de Belo Horizonte)**  
> Plataforma web desenvolvida para otimizar, descentralizar e dar transparência à gestão de competições escolares, facilitando a inscrição de escolas e o acompanhamento de jogos pela comunidade de Vespasiano - MG.

---

##  1. Sobre o Projeto

O **JEVES (Jogos Escolares de Vespasiano)** é um dos eventos esportivos mais tradicionais do município. Tradicionalmente, sua organização dependia de planilhas dispersas, formulários avulsos e grupos de mensagens. 

O projeto substitui esse processo fragmentado por uma solução tecnológica sob medida. A plataforma centraliza a criação de torneios, automatiza a inscrição das escolas e entrega transparência em tempo real para atletas, professores, organizadores e cidadãos.

---

##  2. Equipe e Funções

| Função | Integrante | RA |
| :--- | :--- | :--- |
| **Líder do Projeto** | Bruno Costa Fonseca | 972515862 |
| **Analista de Negócios** | Eduarda Marquezini Pereira | 972512862 |
| **Designer UX/UI** | Oseias Lopes dos Santos | 972520746 |
| **Desenvolvedor Front-end** | Lukas Amorim | 972515660 |
| **Desenvolvedor Back-end** | Caio Lincon Oliveira Brandão | 972515401 |
| **Analista de Qualidade (QA)** | Pedro Lucas De Sousa Oliveira Santos | 972515721 |
| **Marketing e Apresentação** | Daniella Evelyn Pereira da Silva de Faria | 972520490 |

---

##  3. Proposta de Valor e Diferenciais

- **O Problema:** Dificuldade na administração e burocracia excessiva na organização de competições escolares.
- **Público-Alvo:** Órgãos, secretarias e instituições responsáveis por eventos esportivos escolares.
- **Inovação e Disrupção:** Uma ferramenta feita do zero sob medida para o fluxo de eventos escolares (gestão de modalidades, categorias, submissão e aprovação de atletas), eliminando o trabalho manual e o retrabalho com planilhas.
- **Eficiência:** Automação na coleta de dados, redução de erros de digitação, corte de custos com papel e centralização de relatórios.

---

##  4. Arquitetura do Frontend e Design System

Desenvolvido com **HTML5, CSS3, TypeScript e Bootstrap**, o sistema conta com uma estrutura totalmente responsiva (foco *mobile-first* para o público geral e *desktop/tablet* para organizadores no ginásio).

### Ambientes do Sistema:
1. **Público:** Início, listagem de torneios, detalhes de jogos/torneios, login, cadastro de escolas, recuperação de senha e termos de uso.
2. **Área da Escola:** Dashboard gerencial, perfil da instituição, gestão de equipes, cadastro de alunos e acompanhamento de inscrições passo a passo (*Stepper*).
3. **Área do Organizador:** Criação/edição de torneios, configuração de modalidades/categorias, análise de inscrições, cadastro de locais e lançamento de resultados/placares.
4. **Área Administrativa:** Gestão global de usuários, escolas, modalidades e categorias.

---

##  5. Modelagem do Banco de Dados (Backend)

O ecossistema de dados do sistema é composto pelas seguintes entidades principais:
- **Escolas:** Armazena dados cadastrais, CNPJ, código INEP e endereços das instituições participantes.
- **Usuários:** Gerencia credenciais, perfis de acesso (*Escola, Organizador, Administrador*) e status de ativação.
- **Torneios:** Controla datas, descrições, regras e o ciclo de vida da competição (*rascunho, inscrições abertas, andamento, encerrado*).
- **Modalidades & Categorias:** Define esportes (futebol, vôlei, xadrez, etc.), faixas etárias (Sub-15, Sub-17) e gêneros.
- **Torneio_Modalidades:** Vincula esportes e regras específicas a cada torneio.
- **Inscrições & Equipes:** Controla o fluxo de submissão das escolas, status de aprovação, notas do organizador e dados dos técnicos.
- **Alunos & Equipe_Alunos:** Gerencia o cadastro completo dos atletas (documentos, data de nascimento) e sua alocação nas equipes (número de camisa, posições).
- **Locais & Jogos:** Gerencia arenas/ginásios, agendamento de partidas, fases da competição e lançamento de placares em tempo real.

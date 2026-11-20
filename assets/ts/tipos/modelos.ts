/**
 * Tipos e interfaces TypeScript baseados no Modelo Real do Banco de Dados `projetojeves`
 * (Arquivo de origem: api/database/schema.sql)
 */

export type PerfilUsuario = 'escola' | 'organizador' | 'admin';
export type TipoEscola = 'municipal' | 'estadual' | 'federal' | 'privada';
export type StatusTorneio = 'rascunho' | 'inscricoes_abertas' | 'em_andamento' | 'encerrado' | 'cancelado';
export type StatusInscricao = 'pendente' | 'aprovada' | 'rejeitada' | 'cancelada';
export type StatusJogo = 'agendado' | 'em_andamento' | 'finalizado' | 'adiado' | 'cancelado';
export type TipoModalidade = 'individual' | 'coletiva';
export type GeneroCategoria = 'masculino' | 'feminino' | 'misto';
export type GeneroAluno = 'masculino' | 'feminino';

/**
 * Entidade: Escolas (tabela `escolas`)
 */
export interface Escola {
  id: number;
  nome: string;
  codigo_inep: string; // varchar(20) NOT NULL UNIQUE
  cnpj: string;        // varchar(18) NOT NULL UNIQUE
  tipo: TipoEscola;    // municipal, estadual, federal, privada
  cidade: string;
  endereco?: string | null;
  logradouro: string;
  numero?: string | null; // varchar(20) DEFAULT NULL
  cep: string;
  bairro: string;
  telefone: string;
  email: string;       // varchar(100) NOT NULL UNIQUE
  responsavel: string;
}

export type CriarEscolaDTO = Omit<Escola, 'id'>;
export type AtualizarEscolaDTO = Partial<CriarEscolaDTO>;

/**
 * Entidade: Usuários (tabela `usuarios`)
 */
export interface Usuario {
  id: number;
  escola_id?: number | null;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean | number;
  criado_em?: string | null;
}

export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  escola_id?: number | null;
  ativo?: boolean | number;
}

export type AtualizarUsuarioDTO = Partial<Omit<CriarUsuarioDTO, 'senha'>>;

/**
 * Entidade: Torneios (tabela `torneios`)
 */
export interface Torneio {
  id: number;
  nome: string;
  descricao?: string | null;
  organizador_id: number;
  data_inicio: string; // YYYY-MM-DD
  data_fim: string;    // YYYY-MM-DD (deve ser >= data_inicio)
  inicio_inscricoes: string; // DATETIME
  fim_inscricoes: string;    // DATETIME (deve ser > inicio_inscricoes)
  regras?: string | null;
  status: StatusTorneio;
}

export type CriarTorneioDTO = Omit<Torneio, 'id'>;
export type AtualizarTorneioDTO = Partial<CriarTorneioDTO>;

/**
 * Entidade: Modalidades (tabela `modalidades`)
 */
export interface Modalidade {
  id: number;
  nome: string;
  individual_ou_coletiva: TipoModalidade;
  min_alunos: number;
  max_alunos: number; // deve ser >= min_alunos
}

export type CriarModalidadeDTO = Omit<Modalidade, 'id'>;
export type AtualizarModalidadeDTO = Partial<CriarModalidadeDTO>;

/**
 * Entidade: Categorias (tabela `categorias`)
 */
export interface Categoria {
  id: number;
  nome: string;
  idade_min: number;
  idade_max: number; // deve ser >= idade_min
  genero: GeneroCategoria;
}

export type CriarCategoriaDTO = Omit<Categoria, 'id'>;
export type AtualizarCategoriaDTO = Partial<CriarCategoriaDTO>;

/**
 * Entidade: Torneio_Modalidades (tabela `torneio_modalidades`)
 */
export interface TorneioModalidade {
  id: number;
  torneio_id: number;
  modalidade_id: number;
  categoria_id: number;
  max_equipes: number;
  regras_especificas?: string | null;
  modalidade_nome?: string;
  categoria_nome?: string;
}

export type CriarTorneioModalidadeDTO = Omit<TorneioModalidade, 'id' | 'modalidade_nome' | 'categoria_nome'>;
export type AtualizarTorneioModalidadeDTO = Partial<CriarTorneioModalidadeDTO>;

/**
 * Entidade: Inscrições (tabela `inscricoes`)
 */
export interface Inscricao {
  id: number;
  torneio_modalidade_id: number;
  escola_id: number;
  status: StatusInscricao; // pendente, aprovada, rejeitada, cancelada
  observacao_organizador?: string | null;
  criado_em?: string | null;
  atualizado_em?: string | null;
  escola_nome?: string;
  modalidade_nome?: string;
  categoria_nome?: string;
  torneio_nome?: string;
}

export interface CriarInscricaoDTO {
  torneio_modalidade_id: number;
  escola_id?: number;
}

export interface FiltrosInscricao {
  escola_id?: number;
  torneio_modalidade_id?: number;
  status?: StatusInscricao | string;
}

/**
 * Entidade: Equipes (tabela `equipes`)
 */
export interface Equipe {
  id: number;
  inscricao_id: number;
  nome: string;
  tecnico_nome: string;
  tecnico_contato: string;
}

export type CriarEquipeDTO = Omit<Equipe, 'id'>;
export type AtualizarEquipeDTO = Partial<CriarEquipeDTO>;

/**
 * Entidade: Alunos (tabela `alunos`)
 */
export interface Aluno {
  id: number;
  escola_id: number;
  nome: string;
  data_nascimento: string; // YYYY-MM-DD
  genero: GeneroAluno;    // masculino, feminino
  documento: string;
  foto?: string | null;
}

export type CriarAlunoDTO = Omit<Aluno, 'id'>;
export type AtualizarAlunoDTO = Partial<CriarAlunoDTO>;

/**
 * Entidade: Equipe_Alunos (tabela `equipe_alunos`)
 */
export interface EquipeAluno {
  id: number;
  equipe_id: number;
  atleta_id: number;
  numero_camisa?: number | null;
  posicao?: string | null;
  atleta_nome?: string;
  data_nascimento?: string;
  documento?: string;
}

export type CriarEquipeAlunoDTO = Omit<EquipeAluno, 'id' | 'atleta_nome' | 'data_nascimento' | 'documento'>;

/**
 * Entidade: Locais (tabela `locais`)
 */
export interface Local {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
}

export type CriarLocalDTO = Omit<Local, 'id'>;
export type AtualizarLocalDTO = Partial<CriarLocalDTO>;

/**
 * Entidade: Jogos (tabela `jogos`)
 */
export interface Jogo {
  id: number;
  torneio_modalidade_id: number;
  fase: string;
  equipe_a_id: number;
  equipe_b_id: number;
  local_id: number;
  data_hora: string;
  status: StatusJogo; // agendado, em_andamento, finalizado, adiado, cancelado
  placar_a?: number | null;
  placar_b?: number | null;
  equipe_a_nome?: string;
  equipe_b_nome?: string;
  local_nome?: string;
}

export type CriarJogoDTO = Omit<Jogo, 'id' | 'placar_a' | 'placar_b' | 'equipe_a_nome' | 'equipe_b_nome' | 'local_nome'>;
export type AtualizarJogoDTO = Partial<CriarJogoDTO>;

export interface FiltrosJogo {
  torneio_modalidade_id?: number;
  status?: StatusJogo | string;
  fase?: string;
}

/**
 * Autenticação e Respostas de Sessão
 */
export interface RespostaLogin {
  token: string;
  usuario: Usuario;
}

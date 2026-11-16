/**
 * Tipos e interfaces TypeScript baseados no Modelo Lógico do Banco de Dados JEVES
 */

export type PerfilUsuario = 'escola' | 'organizador' | 'admin';
export type StatusTorneio = 'rascunho' | 'inscricoes_abertas' | 'em_andamento' | 'encerrado';
export type StatusInscricao = 'pendente' | 'aprovada' | 'correcao_solicitada' | 'recusada';
export type StatusJogo = 'agendado' | 'em_andamento' | 'finalizado' | 'cancelado';
export type TipoModalidade = 'individual' | 'coletiva';
export type GeneroCategoria = 'masculino' | 'feminino' | 'misto';

/**
 * Entidade: Escolas
 */
export interface Escola {
  id: number;
  nome: string;
  codigo_inep?: string | null;
  cnpj?: string | null;
  tipo?: string | null; // municipal, estadual, federal, privada...
  cidade?: string | null;
  endereco?: string | null;
  logradouro?: string | null;
  numero?: number | null;
  cep?: string | null;
  bairro?: string | null;
  telefone?: string | null;
  email?: string | null;
  responsavel?: string | null;
}

export type CriarEscolaDTO = Omit<Escola, 'id'>;
export type AtualizarEscolaDTO = Partial<CriarEscolaDTO>;

/**
 * Entidade: Usuários
 */
export interface Usuario {
  id: number;
  escola_id?: number | null;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  criado_em?: string | null;
}

export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  escola_id?: number | null;
  ativo?: boolean;
}

export type AtualizarUsuarioDTO = Partial<Omit<CriarUsuarioDTO, 'senha'>>;

/**
 * Entidade: Torneios
 */
export interface Torneio {
  id: number;
  nome: string;
  descricao?: string | null;
  organizador_id: number;
  data_inicio?: string | null; // Formato YYYY-MM-DD
  data_fim?: string | null;    // Formato YYYY-MM-DD
  inicio_inscricoes?: string | null; // ISO DateTime
  fim_inscricoes?: string | null;    // ISO DateTime
  regras?: string | null;
  status: StatusTorneio;
}

export type CriarTorneioDTO = Omit<Torneio, 'id'>;
export type AtualizarTorneioDTO = Partial<CriarTorneioDTO>;

/**
 * Entidade: Modalidades
 */
export interface Modalidade {
  id: number;
  nome: string;
  individual_ou_coletiva?: TipoModalidade | string | null;
  min_alunos?: number | null;
  max_alunos?: number | null;
}

export type CriarModalidadeDTO = Omit<Modalidade, 'id'>;
export type AtualizarModalidadeDTO = Partial<CriarModalidadeDTO>;

/**
 * Entidade: Categorias
 */
export interface Categoria {
  id: number;
  nome: string;
  idade_min?: number | null;
  idade_max?: number | null;
  genero?: GeneroCategoria | string | null;
}

export type CriarCategoriaDTO = Omit<Categoria, 'id'>;
export type AtualizarCategoriaDTO = Partial<CriarCategoriaDTO>;

/**
 * Entidade: Torneio_Modalidades
 */
export interface TorneioModalidade {
  id: number;
  torneio_id: number;
  modalidade_id: number;
  categoria_id: number;
  max_equipes?: number | null;
  regras_especificas?: string | null;
}

export type CriarTorneioModalidadeDTO = Omit<TorneioModalidade, 'id'>;
export type AtualizarTorneioModalidadeDTO = Partial<CriarTorneioModalidadeDTO>;

/**
 * Entidade: Inscrições
 */
export interface Inscricao {
  id: number;
  torneio_modalidade_id: number;
  escola_id: number;
  status: StatusInscricao;
  observacao_organizador?: string | null;
  criado_em?: string | null;
  atualizado_em?: string | null;
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
 * Entidade: Equipes
 */
export interface Equipe {
  id: number;
  inscricao_id: number;
  nome: string;
  tecnico_nome?: string | null;
  tecnico_contato?: string | null;
}

export type CriarEquipeDTO = Omit<Equipe, 'id'>;
export type AtualizarEquipeDTO = Partial<CriarEquipeDTO>;

/**
 * Entidade: Alunos
 */
export interface Aluno {
  id: number;
  escola_id: number;
  nome: string;
  data_nascimento?: string | null; // YYYY-MM-DD
  genero?: string | null;
  documento?: string | null;
  foto?: string | null;
}

export type CriarAlunoDTO = Omit<Aluno, 'id'>;
export type AtualizarAlunoDTO = Partial<CriarAlunoDTO>;

/**
 * Entidade: Equipe_Alunos
 */
export interface EquipeAluno {
  id: number;
  equipe_id: number;
  atleta_id: number;
  numero_camisa?: number | null;
  posicao?: string | null;
}

export type CriarEquipeAlunoDTO = Omit<EquipeAluno, 'id'>;

/**
 * Entidade: Locais
 */
export interface Local {
  id: number;
  nome: string;
  endereco?: string | null;
  cidade?: string | null;
}

export type CriarLocalDTO = Omit<Local, 'id'>;
export type AtualizarLocalDTO = Partial<CriarLocalDTO>;

/**
 * Entidade: Jogos
 */
export interface Jogo {
  id: number;
  torneio_modalidade_id: number;
  fase?: string | null; // grupos, semifinal, final...
  equipe_a_id?: number | null;
  equipe_b_id?: number | null;
  local_id?: number | null;
  data_hora?: string | null; // ISO DateTime
  status: StatusJogo;
  placar_a?: number | null;
  placar_b?: number | null;
}

export type CriarJogoDTO = Omit<Jogo, 'id' | 'placar_a' | 'placar_b'>;
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


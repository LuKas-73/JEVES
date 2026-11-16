/**
 * Serviços de integração da interface web com a API JEVES (Python/Flask + MySQL)
 * Utiliza as funções HTTP de utilitarios/api e as tipagens de tipos/modelos
 */

import { get, post, put, patch, deletar, RespostaApi } from '../utilitarios/api';
import {
  Escola, CriarEscolaDTO, AtualizarEscolaDTO,
  Usuario, CriarUsuarioDTO, AtualizarUsuarioDTO, RespostaLogin,
  Torneio, CriarTorneioDTO, AtualizarTorneioDTO, StatusTorneio,
  Modalidade, CriarModalidadeDTO, AtualizarModalidadeDTO,
  Categoria, CriarCategoriaDTO, AtualizarCategoriaDTO,
  TorneioModalidade, CriarTorneioModalidadeDTO, AtualizarTorneioModalidadeDTO,
  Inscricao, CriarInscricaoDTO, FiltrosInscricao, StatusInscricao,
  Equipe, CriarEquipeDTO, AtualizarEquipeDTO,
  Aluno, CriarAlunoDTO, AtualizarAlunoDTO,
  EquipeAluno, CriarEquipeAlunoDTO,
  Local, CriarLocalDTO, AtualizarLocalDTO,
  Jogo, CriarJogoDTO, AtualizarJogoDTO, FiltrosJogo, StatusJogo
} from '../tipos/modelos';

/**
 * 1. Serviço de Autenticação
 */
export const servicoAuth = {
  async login(email: string, senha: string): Promise<RespostaApi<RespostaLogin>> {
    return post<RespostaLogin>('/api/auth/login', { email, senha });
  },

  async me(): Promise<RespostaApi<Usuario>> {
    return get<Usuario>('/api/auth/me');
  },

  async logout(): Promise<RespostaApi<{ mensagem: string }>> {
    return post<{ mensagem: string }>('/api/auth/logout');
  }
};

/**
 * 2. Serviço de Escolas
 */
export const servicoEscolas = {
  async listar(): Promise<RespostaApi<Escola[]>> {
    return get<Escola[]>('/api/escolas/');
  },

  async buscarPorId(id: number): Promise<RespostaApi<Escola>> {
    return get<Escola>(`/api/escolas/${id}`);
  },

  async criar(dados: CriarEscolaDTO): Promise<RespostaApi<Escola>> {
    return post<Escola>('/api/escolas/', dados);
  },

  async atualizar(id: number, dados: AtualizarEscolaDTO): Promise<RespostaApi<Escola>> {
    return put<Escola>(`/api/escolas/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/escolas/${id}`);
  }
};

/**
 * 3. Serviço de Usuários
 */
export const servicoUsuarios = {
  async listar(perfil?: string): Promise<RespostaApi<Usuario[]>> {
    const qs = perfil ? `?perfil=${encodeURIComponent(perfil)}` : '';
    return get<Usuario[]>(`/api/usuarios/${qs}`);
  },

  async buscarPorId(id: number): Promise<RespostaApi<Usuario>> {
    return get<Usuario>(`/api/usuarios/${id}`);
  },

  async criar(dados: CriarUsuarioDTO): Promise<RespostaApi<Usuario>> {
    return post<Usuario>('/api/usuarios/', dados);
  },

  async atualizar(id: number, dados: AtualizarUsuarioDTO): Promise<RespostaApi<Usuario>> {
    return put<Usuario>(`/api/usuarios/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/usuarios/${id}`);
  },

  async trocarSenha(id: number, senhaAtual: string, novaSenha: string): Promise<RespostaApi<{ mensagem: string }>> {
    return patch<{ mensagem: string }>(`/api/usuarios/${id}/senha`, {
      senha_atual: senhaAtual,
      nova_senha: novaSenha
    });
  }
};

/**
 * 4. Serviço de Torneios
 */
export const servicoTorneios = {
  async listar(): Promise<RespostaApi<Torneio[]>> {
    return get<Torneio[]>('/api/torneios/');
  },

  async buscarPorId(id: number): Promise<RespostaApi<Torneio>> {
    return get<Torneio>(`/api/torneios/${id}`);
  },

  async criar(dados: CriarTorneioDTO): Promise<RespostaApi<Torneio>> {
    return post<Torneio>('/api/torneios/', dados);
  },

  async atualizar(id: number, dados: AtualizarTorneioDTO): Promise<RespostaApi<Torneio>> {
    return put<Torneio>(`/api/torneios/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/torneios/${id}`);
  },

  async atualizarStatus(id: number, status: StatusTorneio): Promise<RespostaApi<Torneio>> {
    return patch<Torneio>(`/api/torneios/${id}/status`, { status });
  }
};

/**
 * 5. Serviço de Modalidades
 */
export const servicoModalidades = {
  async listar(): Promise<RespostaApi<Modalidade[]>> {
    return get<Modalidade[]>('/api/modalidades/');
  },

  async buscarPorId(id: number): Promise<RespostaApi<Modalidade>> {
    return get<Modalidade>(`/api/modalidades/${id}`);
  },

  async criar(dados: CriarModalidadeDTO): Promise<RespostaApi<Modalidade>> {
    return post<Modalidade>('/api/modalidades/', dados);
  },

  async atualizar(id: number, dados: AtualizarModalidadeDTO): Promise<RespostaApi<Modalidade>> {
    return put<Modalidade>(`/api/modalidades/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/modalidades/${id}`);
  }
};

/**
 * 6. Serviço de Categorias
 */
export const servicoCategorias = {
  async listar(): Promise<RespostaApi<Categoria[]>> {
    return get<Categoria[]>('/api/categorias/');
  },

  async buscarPorId(id: number): Promise<RespostaApi<Categoria>> {
    return get<Categoria>(`/api/categorias/${id}`);
  },

  async criar(dados: CriarCategoriaDTO): Promise<RespostaApi<Categoria>> {
    return post<Categoria>('/api/categorias/', dados);
  },

  async atualizar(id: number, dados: AtualizarCategoriaDTO): Promise<RespostaApi<Categoria>> {
    return put<Categoria>(`/api/categorias/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/categorias/${id}`);
  }
};

/**
 * 7. Serviço de TorneioModalidades
 */
export const servicoTorneioModalidades = {
  async listarPorTorneio(torneioId?: number): Promise<RespostaApi<TorneioModalidade[]>> {
    const qs = torneioId ? `?torneio_id=${torneioId}` : '';
    return get<TorneioModalidade[]>(`/api/torneio-modalidades/${qs}`);
  },

  async buscarPorId(id: number): Promise<RespostaApi<TorneioModalidade>> {
    return get<TorneioModalidade>(`/api/torneio-modalidades/${id}`);
  },

  async criar(dados: CriarTorneioModalidadeDTO): Promise<RespostaApi<TorneioModalidade>> {
    return post<TorneioModalidade>('/api/torneio-modalidades/', dados);
  },

  async atualizar(id: number, dados: AtualizarTorneioModalidadeDTO): Promise<RespostaApi<TorneioModalidade>> {
    return put<TorneioModalidade>(`/api/torneio-modalidades/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/torneio-modalidades/${id}`);
  }
};

/**
 * 8. Serviço de Inscrições
 */
export const servicoInscricoes = {
  async listar(filtros: FiltrosInscricao = {}): Promise<RespostaApi<Inscricao[]>> {
    const params = new URLSearchParams();
    if (filtros.escola_id) params.set('escola_id', String(filtros.escola_id));
    if (filtros.torneio_modalidade_id) params.set('torneio_modalidade_id', String(filtros.torneio_modalidade_id));
    if (filtros.status) params.set('status', filtros.status);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return get<Inscricao[]>(`/api/inscricoes/${qs}`);
  },

  async buscarPorId(id: number): Promise<RespostaApi<Inscricao>> {
    return get<Inscricao>(`/api/inscricoes/${id}`);
  },

  async criar(dados: CriarInscricaoDTO): Promise<RespostaApi<Inscricao>> {
    return post<Inscricao>('/api/inscricoes/', dados);
  },

  async reemitirCorrecao(id: number): Promise<RespostaApi<Inscricao>> {
    return put<Inscricao>(`/api/inscricoes/${id}`, {});
  },

  async alterarStatus(id: number, status: StatusInscricao, observacao?: string): Promise<RespostaApi<Inscricao>> {
    return patch<Inscricao>(`/api/inscricoes/${id}/status`, {
      status,
      observacao_organizador: observacao
    });
  },

  async cancelar(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/inscricoes/${id}`);
  }
};

/**
 * 9. Serviço de Equipes
 */
export const servicoEquipes = {
  async listar(inscricaoId?: number): Promise<RespostaApi<Equipe[]>> {
    const qs = inscricaoId ? `?inscricao_id=${inscricaoId}` : '';
    return get<Equipe[]>(`/api/equipes/${qs}`);
  },

  async buscarPorId(id: number): Promise<RespostaApi<Equipe>> {
    return get<Equipe>(`/api/equipes/${id}`);
  },

  async criar(dados: CriarEquipeDTO): Promise<RespostaApi<Equipe>> {
    return post<Equipe>('/api/equipes/', dados);
  },

  async atualizar(id: number, dados: AtualizarEquipeDTO): Promise<RespostaApi<Equipe>> {
    return put<Equipe>(`/api/equipes/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/equipes/${id}`);
  },

  async listarMembros(equipeId: number): Promise<RespostaApi<EquipeAluno[]>> {
    return get<EquipeAluno[]>(`/api/equipes/${equipeId}/membros`);
  },

  async adicionarMembro(equipeId: number, dados: Omit<CriarEquipeAlunoDTO, 'equipe_id'>): Promise<RespostaApi<EquipeAluno>> {
    return post<EquipeAluno>(`/api/equipes/${equipeId}/membros`, dados);
  },

  async removerMembro(equipeId: number, membroId: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/equipes/${equipeId}/membros/${membroId}`);
  }
};

/**
 * 10. Serviço de Alunos
 */
export const servicoAlunos = {
  async listar(escolaId?: number): Promise<RespostaApi<Aluno[]>> {
    const qs = escolaId ? `?escola_id=${escolaId}` : '';
    return get<Aluno[]>(`/api/alunos/${qs}`);
  },

  async buscarPorId(id: number): Promise<RespostaApi<Aluno>> {
    return get<Aluno>(`/api/alunos/${id}`);
  },

  async criar(dados: CriarAlunoDTO): Promise<RespostaApi<Aluno>> {
    return post<Aluno>('/api/alunos/', dados);
  },

  async atualizar(id: number, dados: AtualizarAlunoDTO): Promise<RespostaApi<Aluno>> {
    return put<Aluno>(`/api/alunos/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/alunos/${id}`);
  },

  async uploadFoto(alunoId: number, arquivoFoto: File): Promise<RespostaApi<{ foto: string }>> {
    const formData = new FormData();
    formData.append('foto', arquivoFoto);
    return post<{ foto: string }>(`/api/alunos/${alunoId}/foto`, formData);
  }
};

/**
 * 11. Serviço de Locais
 */
export const servicoLocais = {
  async listar(): Promise<RespostaApi<Local[]>> {
    return get<Local[]>('/api/locais/');
  },

  async buscarPorId(id: number): Promise<RespostaApi<Local>> {
    return get<Local>(`/api/locais/${id}`);
  },

  async criar(dados: CriarLocalDTO): Promise<RespostaApi<Local>> {
    return post<Local>('/api/locais/', dados);
  },

  async atualizar(id: number, dados: AtualizarLocalDTO): Promise<RespostaApi<Local>> {
    return put<Local>(`/api/locais/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/locais/${id}`);
  }
};

/**
 * 12. Serviço de Jogos
 */
export const servicoJogos = {
  async listar(filtros: FiltrosJogo = {}): Promise<RespostaApi<Jogo[]>> {
    const params = new URLSearchParams();
    if (filtros.torneio_modalidade_id) params.set('torneio_modalidade_id', String(filtros.torneio_modalidade_id));
    if (filtros.status) params.set('status', filtros.status);
    if (filtros.fase) params.set('fase', filtros.fase);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return get<Jogo[]>(`/api/jogos/${qs}`);
  },

  async buscarPorId(id: number): Promise<RespostaApi<Jogo>> {
    return get<Jogo>(`/api/jogos/${id}`);
  },

  async criar(dados: CriarJogoDTO): Promise<RespostaApi<Jogo>> {
    return post<Jogo>('/api/jogos/', dados);
  },

  async atualizar(id: number, dados: AtualizarJogoDTO): Promise<RespostaApi<Jogo>> {
    return put<Jogo>(`/api/jogos/${id}`, dados);
  },

  async excluir(id: number): Promise<RespostaApi<{ mensagem: string }>> {
    return deletar<{ mensagem: string }>(`/api/jogos/${id}`);
  },

  async registrarPlacar(id: number, placarA: number, placarB: number): Promise<RespostaApi<Jogo>> {
    return patch<Jogo>(`/api/jogos/${id}/placar`, { placar_a: placarA, placar_b: placarB });
  },

  async alterarStatus(id: number, status: StatusJogo): Promise<RespostaApi<Jogo>> {
    return patch<Jogo>(`/api/jogos/${id}/status`, { status });
  }
};


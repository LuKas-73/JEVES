type PerfilUsuario = 'escola' | 'organizador' | 'admin';

interface DadosUsuario {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  escolaId: number | null;
}

interface SessaoUsuario {
  token: string;
  usuario: DadosUsuario;
  expiracao: number;
}

const CHAVE_SESSAO = 'jeves_sessao';
const CHAVE_TOKEN = 'jeves_token';

const rotas: Record<PerfilUsuario, string> = {
  escola: '/escola/painel.html',
  organizador: '/organizador/painel.html',
  admin: '/admin/painel.html',
};

function obterSessao(): SessaoUsuario | null {
  const dados = localStorage.getItem(CHAVE_SESSAO);
  if (!dados) return null;

  try {
    const sessao = JSON.parse(dados) as SessaoUsuario;
    if (Date.now() > sessao.expiracao) {
      encerrarSessao();
      return null;
    }
    return sessao;
  } catch {
    return null;
  }
}

function salvarSessao(sessao: SessaoUsuario): void {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
  localStorage.setItem(CHAVE_TOKEN, sessao.token);
}

function encerrarSessao(): void {
  localStorage.removeItem(CHAVE_SESSAO);
  localStorage.removeItem(CHAVE_TOKEN);
  window.location.href = '/publico/login.html';
}

function estaAutenticado(): boolean {
  return obterSessao() !== null;
}

function obterUsuario(): DadosUsuario | null {
  return obterSessao()?.usuario ?? null;
}

function verificarPerfil(perfil: PerfilUsuario): boolean {
  return obterUsuario()?.perfil === perfil;
}

function redirecionarSeNaoAutenticado(): void {
  if (!estaAutenticado()) {
    window.location.href = '/publico/login.html';
  }
}

function redirecionarSeAutenticado(): void {
  const usuario = obterUsuario();
  if (!usuario) return;
  window.location.href = rotas[usuario.perfil];
}

function exigirPerfil(perfil: PerfilUsuario): void {
  const usuario = obterUsuario();
  if (!usuario) {
    window.location.href = '/publico/login.html';
    return;
  }
  if (usuario.perfil !== perfil) {
    window.location.href = '/erros/403.html';
  }
}

export {
  obterSessao,
  salvarSessao,
  encerrarSessao,
  estaAutenticado,
  obterUsuario,
  verificarPerfil,
  redirecionarSeNaoAutenticado,
  redirecionarSeAutenticado,
  exigirPerfil,
};
export type { DadosUsuario, SessaoUsuario, PerfilUsuario };

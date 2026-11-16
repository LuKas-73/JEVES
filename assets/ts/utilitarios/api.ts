interface RespostaApi<T> {
  dados: T | null;
  erro: string | null;
  status: number;
}

const configuracaoApi = {
  // Ajuste a URL do backend se estiver rodando em outra porta ou host
  baseUrl: 'http://localhost:5000',
};

async function requisicao<T>(
  endpoint: string,
  opcoes: RequestInit = {}
): Promise<RespostaApi<T>> {
  try {
    const token = localStorage.getItem('jeves_token');
    const cabecalhos: Record<string, string> = {
      ...(opcoes.headers as Record<string, string>),
    };

    // Só define application/json se não for FormData (upload multipart)
    if (!(opcoes.body instanceof FormData) && !cabecalhos['Content-Type']) {
      cabecalhos['Content-Type'] = 'application/json';
    }

    if (token) {
      cabecalhos['Authorization'] = `Bearer ${token}`;
    }

    const resposta = await fetch(`${configuracaoApi.baseUrl}${endpoint}`, {
      ...opcoes,
      headers: cabecalhos,
    });

    let corpoResposta: unknown;
    const contentType = resposta.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      corpoResposta = await resposta.json();
    } else {
      corpoResposta = await resposta.text();
    }

    if (!resposta.ok) {
      let mensagemErro = `Erro ${resposta.status}`;
      if (typeof corpoResposta === 'object' && corpoResposta !== null && 'erro' in corpoResposta) {
        mensagemErro = String((corpoResposta as { erro: unknown }).erro);
      } else if (typeof corpoResposta === 'string' && corpoResposta.trim()) {
        mensagemErro = corpoResposta;
      }
      return { dados: null, erro: mensagemErro, status: resposta.status };
    }

    return { dados: corpoResposta as T, erro: null, status: resposta.status };
  } catch (erro) {
    return {
      dados: null,
      erro: erro instanceof Error ? erro.message : 'Erro de conexão com o servidor',
      status: 0,
    };
  }
}

async function get<T>(endpoint: string): Promise<RespostaApi<T>> {
  return requisicao<T>(endpoint, { method: 'GET' });
}

  async function post<T>(endpoint: string, corpo?: unknown): Promise<RespostaApi<T>> {
    const opcoes: RequestInit = { method: 'POST' };
    if (corpo instanceof FormData) {
      opcoes.body = corpo;
    } else if (corpo !== undefined) {
      opcoes.body = JSON.stringify(corpo);
    }
    return requisicao<T>(endpoint, opcoes);
  }

    async function put<T>(endpoint: string, corpo?: unknown): Promise<RespostaApi<T>> {
      return requisicao<T>(endpoint, { method: 'PUT', body: JSON.stringify(corpo) });
    }

      async function patch<T>(endpoint: string, corpo?: unknown): Promise<RespostaApi<T>> {
        return requisicao<T>(endpoint, { method: 'PATCH', body: JSON.stringify(corpo) });
      }

      async function deletar<T>(endpoint: string): Promise<RespostaApi<T>> {
        return requisicao<T>(endpoint, { method: 'DELETE' });
      }

      export { get, post, put, patch, deletar, requisicao, configuracaoApi };
      export type { RespostaApi };

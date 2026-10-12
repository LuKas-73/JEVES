interface RespostaApi<T> {
  dados: T | null;
  erro: string | null;
  status: number;
}

const configuracaoApi = {
  baseUrl: '',
};

async function requisicao<T>(
  endpoint: string,
  opcoes: RequestInit = {}
): Promise<RespostaApi<T>> {
  try {
    const token = localStorage.getItem('jeves_token');
    const cabecalhos: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(opcoes.headers as Record<string, string>),
    };

    if (token) {
      cabecalhos['Authorization'] = `Bearer ${token}`;
    }

    const resposta = await fetch(`${configuracaoApi.baseUrl}${endpoint}`, {
      ...opcoes,
      headers: cabecalhos,
    });

    if (!resposta.ok) {
      const textoErro = await resposta.text();
      return { dados: null, erro: textoErro || `Erro ${resposta.status}`, status: resposta.status };
    }

    const dados = (await resposta.json()) as T;
    return { dados, erro: null, status: resposta.status };
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

async function post<T>(endpoint: string, corpo: unknown): Promise<RespostaApi<T>> {
  return requisicao<T>(endpoint, { method: 'POST', body: JSON.stringify(corpo) });
}

async function put<T>(endpoint: string, corpo: unknown): Promise<RespostaApi<T>> {
  return requisicao<T>(endpoint, { method: 'PUT', body: JSON.stringify(corpo) });
}

async function patch<T>(endpoint: string, corpo: unknown): Promise<RespostaApi<T>> {
  return requisicao<T>(endpoint, { method: 'PATCH', body: JSON.stringify(corpo) });
}

async function deletar<T>(endpoint: string): Promise<RespostaApi<T>> {
  return requisicao<T>(endpoint, { method: 'DELETE' });
}

export { get, post, put, patch, deletar, configuracaoApi };
export type { RespostaApi };

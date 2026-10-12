interface ColunaTabela<T> {
  chave: keyof T | string;
  titulo: string;
  renderizar?: (valor: unknown, linha: T) => string;
  ordenavel?: boolean;
}

interface OpcaoTabelaDados<T> {
  dados: T[];
  colunas: ColunaTabela<T>[];
  idChave: keyof T;
  itensPorPagina?: number;
  semDados?: string;
}

interface EstadoTabela<T> {
  paginaAtual: number;
  termoBusca: string;
  colunasOrdem: string | null;
  direcaoOrdem: 'asc' | 'desc';
  dadosFiltrados: T[];
}

function criarTabelaDados<T extends Record<string, unknown>>(
  conteiner: HTMLElement,
  opcao: OpcaoTabelaDados<T>
): { atualizar: (novosDados: T[]) => void } {
  const estado: EstadoTabela<T> = {
    paginaAtual: 1,
    termoBusca: '',
    colunasOrdem: null,
    direcaoOrdem: 'asc',
    dadosFiltrados: [...opcao.dados],
  };

  const itensPorPagina = opcao.itensPorPagina ?? 10;

  function filtrar(): void {
    const termo = estado.termoBusca.toLowerCase();
    estado.dadosFiltrados = opcao.dados.filter(linha =>
      Object.values(linha).some(val => String(val).toLowerCase().includes(termo))
    );
    estado.paginaAtual = 1;
    renderizar();
  }

  function ordenar(chave: string): void {
    if (estado.colunasOrdem === chave) {
      estado.direcaoOrdem = estado.direcaoOrdem === 'asc' ? 'desc' : 'asc';
    } else {
      estado.colunasOrdem = chave;
      estado.direcaoOrdem = 'asc';
    }
    estado.dadosFiltrados.sort((a, b) => {
      const va = String(a[chave] ?? '');
      const vb = String(b[chave] ?? '');
      return estado.direcaoOrdem === 'asc' ? va.localeCompare(vb, 'pt-BR') : vb.localeCompare(va, 'pt-BR');
    });
    renderizar();
  }

  function renderizar(): void {
    const inicio = (estado.paginaAtual - 1) * itensPorPagina;
    const paginaDados = estado.dadosFiltrados.slice(inicio, inicio + itensPorPagina);
    const totalPaginas = Math.ceil(estado.dadosFiltrados.length / itensPorPagina);

    const cabecalhos = opcao.colunas.map(col => {
      const ordemAtiva = estado.colunasOrdem === col.chave;
      const iconeOrdem = ordemAtiva
        ? estado.direcaoOrdem === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
        : 'bi-arrow-down-up';
      return col.ordenavel
        ? `<th class="th-ordenavel ${ordemAtiva ? 'ativo' : ''}" data-chave="${String(col.chave)}" scope="col">
            ${col.titulo} <i class="bi ${iconeOrdem}" aria-hidden="true"></i>
           </th>`
        : `<th scope="col">${col.titulo}</th>`;
    }).join('');

    const linhas = paginaDados.length
      ? paginaDados.map(linha => {
          const celulas = opcao.colunas.map(col => {
            const valor = linha[col.chave as string];
            const conteudo = col.renderizar ? col.renderizar(valor, linha) : String(valor ?? '—');
            return `<td>${conteudo}</td>`;
          }).join('');
          return `<tr data-id="${String(linha[opcao.idChave])}">${celulas}</tr>`;
        }).join('')
      : `<tr><td colspan="${opcao.colunas.length}" class="td-sem-dados">
          <i class="bi bi-inbox" aria-hidden="true"></i>
          <p>${opcao.semDados ?? 'Nenhum registro encontrado'}</p>
         </td></tr>`;

    const paginacaoHtml = totalPaginas > 1
      ? `<nav aria-label="Paginação" class="paginacao-container">
          <button class="btn-pagina" ${estado.paginaAtual === 1 ? 'disabled' : ''} data-acao="anterior" aria-label="Página anterior">
            <i class="bi bi-chevron-left" aria-hidden="true"></i>
          </button>
          <span class="info-pagina">${estado.paginaAtual} / ${totalPaginas}</span>
          <button class="btn-pagina" ${estado.paginaAtual === totalPaginas ? 'disabled' : ''} data-acao="proxima" aria-label="Próxima página">
            <i class="bi bi-chevron-right" aria-hidden="true"></i>
          </button>
         </nav>`
      : '';

    conteiner.innerHTML = `
      <div class="tabela-wrapper">
        <div class="tabela-controles">
          <div class="tabela-busca">
            <i class="bi bi-search" aria-hidden="true"></i>
            <input type="search" id="tabela-input-busca" class="input-busca" 
              placeholder="Buscar..." value="${estado.termoBusca}" aria-label="Buscar na tabela">
          </div>
          <span class="tabela-contagem" aria-live="polite">${estado.dadosFiltrados.length} registros</span>
        </div>
        <div class="tabela-scroll" role="region" aria-label="Tabela de dados" tabindex="0">
          <table class="tabela-jeves">
            <thead><tr>${cabecalhos}</tr></thead>
            <tbody>${linhas}</tbody>
          </table>
        </div>
        ${paginacaoHtml}
      </div>
    `;

    conteiner.querySelector<HTMLInputElement>('#tabela-input-busca')?.addEventListener('input', (e) => {
      estado.termoBusca = (e.target as HTMLInputElement).value;
      filtrar();
    });

    conteiner.querySelectorAll<HTMLElement>('.th-ordenavel').forEach(th => {
      th.addEventListener('click', () => ordenar(th.dataset.chave!));
    });

    conteiner.querySelectorAll<HTMLButtonElement>('[data-acao]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.acao === 'anterior') estado.paginaAtual--;
        else estado.paginaAtual++;
        renderizar();
      });
    });
  }

  renderizar();
  return {
    atualizar: (novosDados: T[]) => {
      opcao.dados.splice(0, opcao.dados.length, ...novosDados);
      filtrar();
    },
  };
}

export { criarTabelaDados };
export type { ColunaTabela, OpcaoTabelaDados };

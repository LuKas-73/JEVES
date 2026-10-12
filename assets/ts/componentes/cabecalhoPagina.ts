interface ItemBreadcrumb {
  rotulo: string;
  href?: string;
}

interface OpcaoCabecalho {
  titulo: string;
  breadcrumbs?: ItemBreadcrumb[];
  botaoAcao?: {
    rotulo: string;
    icone?: string;
    id: string;
    href?: string;
  };
}

function gerarCabecalhoPagina(conteiner: HTMLElement, opcao: OpcaoCabecalho): void {
  const breadcrumbHtml = opcao.breadcrumbs?.length
    ? `<nav aria-label="Localização atual">
        <ol class="breadcrumb-jeves">
          ${opcao.breadcrumbs.map((item, i) => {
            const ultimo = i === opcao.breadcrumbs!.length - 1;
            return ultimo
              ? `<li class="breadcrumb-item-jeves ativo" aria-current="page">${item.rotulo}</li>`
              : `<li class="breadcrumb-item-jeves"><a href="${item.href ?? '#'}">${item.rotulo}</a></li>`;
          }).join('<li class="breadcrumb-separador" aria-hidden="true"><i class="bi bi-chevron-right"></i></li>')}
        </ol>
      </nav>`
    : '';

  const botaoHtml = opcao.botaoAcao
    ? opcao.botaoAcao.href
      ? `<a href="${opcao.botaoAcao.href}" class="btn-jeves-primario" id="${opcao.botaoAcao.id}">
          ${opcao.botaoAcao.icone ? `<i class="bi ${opcao.botaoAcao.icone}" aria-hidden="true"></i>` : ''}
          ${opcao.botaoAcao.rotulo}
        </a>`
      : `<button class="btn-jeves-primario" id="${opcao.botaoAcao.id}">
          ${opcao.botaoAcao.icone ? `<i class="bi ${opcao.botaoAcao.icone}" aria-hidden="true"></i>` : ''}
          ${opcao.botaoAcao.rotulo}
        </button>`
    : '';

  conteiner.innerHTML = `
    <div class="cabecalho-pagina">
      <div class="cabecalho-pagina-info">
        ${breadcrumbHtml}
        <h1 class="cabecalho-pagina-titulo">${opcao.titulo}</h1>
      </div>
      ${botaoHtml ? `<div class="cabecalho-pagina-acao">${botaoHtml}</div>` : ''}
    </div>
  `;
}

export { gerarCabecalhoPagina };
export type { OpcaoCabecalho, ItemBreadcrumb };

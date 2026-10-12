type PerfilSidebar = 'escola' | 'organizador' | 'admin';

interface ItemMenu {
  icone: string;
  rotulo: string;
  href: string;
  id: string;
}

const itensPorPerfil: Record<PerfilSidebar, ItemMenu[]> = {
  escola: [
    { icone: 'bi-grid-fill', rotulo: 'Painel', href: '/escola/painel.html', id: 'nav-painel' },
    { icone: 'bi-trophy-fill', rotulo: 'Torneios Disponíveis', href: '/escola/torneios-disponiveis.html', id: 'nav-torneios' },
    { icone: 'bi-clipboard-check-fill', rotulo: 'Minhas Inscrições', href: '/escola/inscricoes.html', id: 'nav-inscricoes' },
    { icone: 'bi-people-fill', rotulo: 'Equipes', href: '/escola/equipes.html', id: 'nav-equipes' },
    { icone: 'bi-person-badge-fill', rotulo: 'Alunos', href: '/escola/alunos.html', id: 'nav-alunos' },
    { icone: 'bi-building-fill', rotulo: 'Perfil da Escola', href: '/escola/perfil-escola.html', id: 'nav-perfil-escola' },
    { icone: 'bi-person-gear', rotulo: 'Meu Perfil', href: '/escola/meu-perfil.html', id: 'nav-meu-perfil' },
  ],
  organizador: [
    { icone: 'bi-grid-fill', rotulo: 'Painel', href: '/organizador/painel.html', id: 'nav-painel' },
    { icone: 'bi-trophy-fill', rotulo: 'Meus Torneios', href: '/organizador/torneios.html', id: 'nav-torneios' },
    { icone: 'bi-clipboard-data-fill', rotulo: 'Inscrições', href: '/organizador/inscricoes.html', id: 'nav-inscricoes' },
    { icone: 'bi-people-fill', rotulo: 'Equipes', href: '/organizador/equipes.html', id: 'nav-equipes' },
    { icone: 'bi-geo-alt-fill', rotulo: 'Locais', href: '/organizador/locais.html', id: 'nav-locais' },
    { icone: 'bi-calendar-event-fill', rotulo: 'Jogos', href: '/organizador/jogos.html', id: 'nav-jogos' },
    { icone: 'bi-bar-chart-fill', rotulo: 'Resultados', href: '/organizador/resultados.html', id: 'nav-resultados' },
  ],
  admin: [
    { icone: 'bi-grid-fill', rotulo: 'Painel', href: '/admin/painel.html', id: 'nav-painel' },
    { icone: 'bi-person-lines-fill', rotulo: 'Usuários', href: '/admin/usuarios.html', id: 'nav-usuarios' },
    { icone: 'bi-building-fill', rotulo: 'Escolas', href: '/admin/escolas.html', id: 'nav-escolas' },
    { icone: 'bi-activity', rotulo: 'Modalidades', href: '/admin/modalidades.html', id: 'nav-modalidades' },
    { icone: 'bi-tags-fill', rotulo: 'Categorias', href: '/admin/categorias.html', id: 'nav-categorias' },
  ],
};

function gerarSidebar(conteiner: HTMLElement, perfil: PerfilSidebar, paginaAtual?: string): void {
  const itens = itensPorPerfil[perfil];
  const nomesPerfil: Record<PerfilSidebar, string> = {
    escola: 'Área da Escola',
    organizador: 'Área do Organizador',
    admin: 'Administração',
  };

  const itensHtml = itens.map(item => {
    const ativo = paginaAtual && item.href.includes(paginaAtual) ? 'ativo' : '';
    const ariaCurrent = ativo ? 'aria-current="page"' : '';
    return `
      <a href="${item.href}" class="item-sidebar ${ativo}" id="${item.id}" ${ariaCurrent}>
        <i class="bi ${item.icone}" aria-hidden="true"></i>
        <span>${item.rotulo}</span>
      </a>
    `;
  }).join('');

  conteiner.innerHTML = `
    <aside class="sidebar-jeves" id="sidebar-principal" aria-label="Menu ${nomesPerfil[perfil]}">
      <div class="sidebar-topo">
        <a href="/index.html" class="sidebar-logo" aria-label="JEVES 2026">
          <i class="bi bi-fire" aria-hidden="true"></i>
          <span>JEVES</span>
        </a>
        <span class="sidebar-perfil-label">${nomesPerfil[perfil]}</span>
      </div>
      <nav class="sidebar-nav" aria-label="Menu de navegação">
        ${itensHtml}
      </nav>
      <div class="sidebar-rodape">
        <button class="btn-sair-sidebar" id="btn-sair" aria-label="Sair do sistema">
          <i class="bi bi-box-arrow-left" aria-hidden="true"></i>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  `;

  const btnSair = document.getElementById('btn-sair');
  btnSair?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/publico/login.html';
  });
}

export { gerarSidebar };
export type { PerfilSidebar, ItemMenu };

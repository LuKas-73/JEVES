interface OpcaoBarSuperior {
  nomeUsuario: string;
  tituloPagina?: string;
}

function gerarBarSuperior(conteiner: HTMLElement, opcao: OpcaoBarSuperior): void {
  const iniciais = opcao.nomeUsuario
    .split(' ')
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('');

  conteiner.innerHTML = `
    <header class="bar-superior" id="bar-superior" role="banner">
      <div class="bar-superior-esquerda">
        <button class="btn-toggle-sidebar" id="btn-toggle-sidebar"
          aria-label="Alternar menu lateral" aria-expanded="true" aria-controls="sidebar-principal">
          <i class="bi bi-list" aria-hidden="true"></i>
        </button>
        ${opcao.tituloPagina ? `<h1 class="bar-superior-titulo">${opcao.tituloPagina}</h1>` : ''}
      </div>
      <div class="bar-superior-direita">
        <button class="btn-notificacoes" id="btn-notificacoes" aria-label="Ver notificações">
          <i class="bi bi-bell" aria-hidden="true"></i>
          <span class="ponto-notificacao" aria-hidden="true"></span>
        </button>
        <div class="usuario-info" id="menu-usuario" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
          <div class="avatar-usuario" aria-hidden="true">${iniciais}</div>
          <span class="nome-usuario">${opcao.nomeUsuario}</span>
          <i class="bi bi-chevron-down chevron-usuario" aria-hidden="true"></i>
        </div>
        <div class="dropdown-usuario" id="dropdown-usuario" role="menu" aria-hidden="true">
          <a href="./meu-perfil.html" class="item-dropdown" role="menuitem">
            <i class="bi bi-person" aria-hidden="true"></i> Meu Perfil
          </a>
          <hr class="dropdown-divisor" />
          <button class="item-dropdown item-dropdown-sair" id="btn-sair-top" role="menuitem">
            <i class="bi bi-box-arrow-left" aria-hidden="true"></i> Sair
          </button>
        </div>
      </div>
    </header>
  `;

  const menuUsuario = document.getElementById('menu-usuario')!;
  const dropdown = document.getElementById('dropdown-usuario')!;

  const alternarDropdown = () => {
    const aberto = dropdown.getAttribute('aria-hidden') === 'false';
    dropdown.setAttribute('aria-hidden', aberto ? 'true' : 'false');
    menuUsuario.setAttribute('aria-expanded', aberto ? 'false' : 'true');
    dropdown.classList.toggle('visivel', !aberto);
  };

  menuUsuario.addEventListener('click', alternarDropdown);
  menuUsuario.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarDropdown(); }
  });

  document.addEventListener('click', (e) => {
    if (!menuUsuario.contains(e.target as Node)) {
      dropdown.setAttribute('aria-hidden', 'true');
      menuUsuario.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('visivel');
    }
  });

  document.getElementById('btn-sair-top')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../publico/login.html';
  });

  const btnToggle = document.getElementById('btn-toggle-sidebar');
  const sidebar = document.getElementById('sidebar-principal');
  btnToggle?.addEventListener('click', () => {
    const colapsado = sidebar?.classList.toggle('colapsado');
    btnToggle.setAttribute('aria-expanded', colapsado ? 'false' : 'true');
  });
}

export { gerarBarSuperior };
export type { OpcaoBarSuperior };

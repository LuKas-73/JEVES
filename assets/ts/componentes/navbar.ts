interface OpcaoNavbar {
  paginaAtual?: string;
}

function inicializarNavbar(opcao: OpcaoNavbar = {}): void {
  const navbar = document.getElementById('navbar-principal');
  if (!navbar) return;

  const aoRolar = () => {
    navbar.classList.toggle('rolado', window.scrollY > 60);
  };

  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  if (opcao.paginaAtual) {
    navbar.querySelectorAll<HTMLAnchorElement>('.nav-link-jeves, .menu-dropdown-item').forEach(link => {
      if (link.getAttribute('href')?.includes(opcao.paginaAtual!)) {
        link.classList.add('ativo');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  const btnHamburguer = document.getElementById('btn-hamburguer');
  const menuDropdown = document.getElementById('menu-dropdown-mobile');
  const iconeHamburguer = document.getElementById('icone-hamburguer');

  if (btnHamburguer && menuDropdown) {
    const alternarMenu = (abrir?: boolean) => {
      const estaAberto = typeof abrir === 'boolean' ? abrir : !menuDropdown.classList.contains('aberto');
      menuDropdown.classList.toggle('aberto', estaAberto);
      btnHamburguer.setAttribute('aria-expanded', estaAberto ? 'true' : 'false');
      menuDropdown.setAttribute('aria-hidden', estaAberto ? 'false' : 'true');
      if (iconeHamburguer) {
        iconeHamburguer.className = estaAberto ? 'bi bi-x-lg' : 'bi bi-list';
      }
    };

    btnHamburguer.addEventListener('click', (e) => {
      e.stopPropagation();
      alternarMenu();
    });

    document.addEventListener('click', (e) => {
      if (!menuDropdown.contains(e.target as Node) && !btnHamburguer.contains(e.target as Node)) {
        alternarMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        alternarMenu(false);
      }
    });

    menuDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        alternarMenu(false);
      });
    });
  }
}

function gerarNavbarPublica(conteiner: HTMLElement): void {
  conteiner.innerHTML = `
    <nav class="navbar-jeves" id="navbar-principal" role="navigation" aria-label="Navegação principal">
      <div class="container">
        <div class="navbar-conteudo-wrapper">
          <div class="navbar-secao-esquerda">
            <a href="/index.html" class="navbar-brand-jeves" aria-label="JEVES 2026 — Página inicial">
              <span class="texto-logo-jeves">JEVES</span>
            </a>
          </div>

          <nav class="navbar-secao-centro d-none d-lg-flex" aria-label="Links principais">
            <a href="/index.html" class="nav-link-jeves">Início</a>
            <a href="/publico/torneios.html" class="nav-link-jeves">Torneios</a>
            <a href="/publico/jogos.html" class="nav-link-jeves">Jogos</a>
          </nav>

          <div class="navbar-secao-direita">
            <a href="/publico/login.html" class="btn-entrar-nav d-none d-lg-inline-flex" id="btn-entrar-navbar">
              <span>Entrar</span>
            </a>

            <button class="navbar-toggler-jeves d-lg-none" id="btn-hamburguer" type="button" aria-expanded="false"
              aria-controls="menu-dropdown-mobile" aria-label="Abrir menu de navegação">
              <i class="bi bi-list" id="icone-hamburguer" aria-hidden="true"></i>
            </button>
          </div>

          <div class="menu-dropdown-mobile" id="menu-dropdown-mobile" aria-hidden="true">
            <div class="menu-dropdown-mobile-cabecalho">
              <span class="menu-dropdown-mobile-titulo">Navegação</span>
              <span class="badge-item-temporada">2026</span>
            </div>
            <div class="menu-dropdown-mobile-lista">
              <a href="/index.html" class="menu-dropdown-item">
                <i class="bi bi-house-door-fill" aria-hidden="true"></i>
                <span>Início</span>
              </a>
              <a href="/publico/torneios.html" class="menu-dropdown-item">
                <i class="bi bi-trophy-fill" aria-hidden="true"></i>
                <span>Torneios</span>
              </a>
              <a href="/publico/jogos.html" class="menu-dropdown-item">
                <i class="bi bi-calendar-event-fill" aria-hidden="true"></i>
                <span>Jogos</span>
              </a>
            </div>
            <div class="menu-dropdown-mobile-divisor"></div>
            <div class="menu-dropdown-mobile-rodape">
              <a href="/publico/login.html" class="btn-entrar-mobile">
                <i class="bi bi-box-arrow-in-right" aria-hidden="true"></i>
                <span>Entrar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
}

export { inicializarNavbar, gerarNavbarPublica };
export type { OpcaoNavbar };

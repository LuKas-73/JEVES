interface OpcaoRodape {
  modoPublico?: boolean;
}

function gerarRodape(conteiner: HTMLElement, opcao: OpcaoRodape = {}): void {
  const anoAtual = new Date().getFullYear();

  conteiner.innerHTML = `
    <footer class="rodape-jeves" role="contentinfo">
      <div class="container">
        <div class="row g-5 rodape-corpo">
          <div class="col-lg-4">
            <a href="/index.html" class="rodape-logo" aria-label="JEVES — Página inicial">
              <i class="bi bi-fire" aria-hidden="true"></i> JEVES
            </a>
            <p class="rodape-tagline">Jogos Escolares de Vespasiano — Unindo esporte, juventude e educação.</p>
            <div class="rodape-redes" aria-label="Redes sociais">
              <a href="#" class="icone-social" aria-label="Instagram da Prefeitura de Vespasiano" rel="noopener noreferrer" target="_blank">
                <i class="bi bi-instagram" aria-hidden="true"></i>
              </a>
              <a href="#" class="icone-social" aria-label="Facebook da Prefeitura de Vespasiano" rel="noopener noreferrer" target="_blank">
                <i class="bi bi-facebook" aria-hidden="true"></i>
              </a>
              <a href="#" class="icone-social" aria-label="YouTube da Prefeitura de Vespasiano" rel="noopener noreferrer" target="_blank">
                <i class="bi bi-youtube" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="col-sm-6 col-lg-2">
            <h2 class="rodape-titulo-coluna">Plataforma</h2>
            <nav aria-label="Links da plataforma">
              <a href="/index.html" class="rodape-link">Início</a>
              <a href="/publico/torneios.html" class="rodape-link">Torneios</a>
              <a href="/publico/jogos.html" class="rodape-link">Jogos</a>
            </nav>
          </div>
          <div class="col-sm-6 col-lg-2">
            <h2 class="rodape-titulo-coluna">Acesso</h2>
            <nav aria-label="Links de acesso">
              <a href="/publico/login.html" class="rodape-link">Entrar</a>
              <a href="/publico/cadastro-escola.html" class="rodape-link">Cadastrar Escola</a>
              <a href="/publico/recuperar-senha.html" class="rodape-link">Recuperar Senha</a>
            </nav>
          </div>
          <div class="col-sm-6 col-lg-4">
            <h2 class="rodape-titulo-coluna">Realização</h2>
            <address class="rodape-endereco">
              <p>Secretaria de Juventude e Esportes</p>
              <p>Prefeitura Municipal de Vespasiano — MG</p>
              <a href="tel:+553135589000" class="rodape-link">
                <i class="bi bi-telephone" aria-hidden="true"></i> (31) 3558-9000
              </a>
              <a href="/publico/privacidade.html" class="rodape-link">Política de Privacidade</a>
              <a href="/publico/termos.html" class="rodape-link">Termos de Uso</a>
            </address>
          </div>
        </div>
        <hr class="rodape-divisor" />
        <div class="rodape-base">
          <p class="rodape-copyright">
            &copy; ${anoAtual} JEVES — Jogos Escolares de Vespasiano. Todos os direitos reservados.
          </p>
          ${opcao.modoPublico ? '' : ''}
        </div>
      </div>
    </footer>
  `;
}

export { gerarRodape };
export type { OpcaoRodape };

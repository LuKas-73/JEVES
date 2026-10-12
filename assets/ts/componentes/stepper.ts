interface PassoStepper {
  id: string;
  rotulo: string;
  descricao?: string;
  validar?: () => boolean | Promise<boolean>;
}

interface OpcaoStepper {
  passos: PassoStepper[];
  conteinerPassos: string;
  conteinerConteudo: string;
  aoConcluir?: () => void;
}

interface EstadoStepper {
  passoAtual: number;
}

function criarStepper(opcao: OpcaoStepper): {
  avancar: () => Promise<void>;
  voltar: () => void;
  irPara: (indice: number) => void;
  obterPassoAtual: () => number;
} {
  const estado: EstadoStepper = { passoAtual: 0 };
  const conteinerPassos = document.getElementById(opcao.conteinerPassos);
  const conteinerConteudo = document.getElementById(opcao.conteinerConteudo);

  function renderizarPassos(): void {
    if (!conteinerPassos) return;
    conteinerPassos.innerHTML = `
      <ol class="stepper-lista" role="list">
        ${opcao.passos.map((passo, i) => {
          const concluido = i < estado.passoAtual;
          const ativo = i === estado.passoAtual;
          const status = concluido ? 'concluido' : ativo ? 'ativo' : 'pendente';
          const ariaCurrent = ativo ? 'aria-current="step"' : '';
          return `
            <li class="stepper-passo ${status}" role="listitem" ${ariaCurrent}>
              <div class="stepper-indicador" aria-hidden="true">
                ${concluido
                  ? '<i class="bi bi-check-lg"></i>'
                  : `<span>${i + 1}</span>`}
              </div>
              <div class="stepper-info">
                <span class="stepper-rotulo">${passo.rotulo}</span>
                ${passo.descricao ? `<span class="stepper-descricao">${passo.descricao}</span>` : ''}
              </div>
              ${i < opcao.passos.length - 1 ? '<div class="stepper-linha" aria-hidden="true"></div>' : ''}
            </li>
          `;
        }).join('')}
      </ol>
    `;
  }

  function renderizarConteudo(): void {
    if (!conteinerConteudo) return;
    const passoAtual = opcao.passos[estado.passoAtual];
    const ultimoPasso = estado.passoAtual === opcao.passos.length - 1;

    const painel = conteinerConteudo.querySelector(`#painel-${passoAtual.id}`);
    conteinerConteudo.querySelectorAll('[data-painel-passo]').forEach(p => p.classList.remove('ativo'));
    painel?.classList.add('ativo');

    const botoesContainer = document.getElementById('stepper-botoes');
    if (botoesContainer) {
      botoesContainer.innerHTML = `
        ${estado.passoAtual > 0
          ? `<button class="btn-jeves-contorno" id="btn-stepper-voltar">
              <i class="bi bi-arrow-left" aria-hidden="true"></i> Voltar
             </button>`
          : '<div></div>'}
        <button class="btn-jeves-primario" id="btn-stepper-avancar">
          ${ultimoPasso
            ? '<i class="bi bi-check-circle" aria-hidden="true"></i> Concluir'
            : 'Avançar <i class="bi bi-arrow-right" aria-hidden="true"></i>'}
        </button>
      `;

      document.getElementById('btn-stepper-voltar')?.addEventListener('click', voltar);
      document.getElementById('btn-stepper-avancar')?.addEventListener('click', avancar);
    }
  }

  async function avancar(): Promise<void> {
    const passoAtual = opcao.passos[estado.passoAtual];
    if (passoAtual.validar) {
      const valido = await passoAtual.validar();
      if (!valido) return;
    }
    if (estado.passoAtual === opcao.passos.length - 1) {
      opcao.aoConcluir?.();
      return;
    }
    estado.passoAtual++;
    renderizarPassos();
    renderizarConteudo();
  }

  function voltar(): void {
    if (estado.passoAtual === 0) return;
    estado.passoAtual--;
    renderizarPassos();
    renderizarConteudo();
  }

  function irPara(indice: number): void {
    if (indice < 0 || indice >= opcao.passos.length) return;
    estado.passoAtual = indice;
    renderizarPassos();
    renderizarConteudo();
  }

  renderizarPassos();
  renderizarConteudo();

  return {
    avancar,
    voltar,
    irPara,
    obterPassoAtual: () => estado.passoAtual,
  };
}

export { criarStepper };
export type { PassoStepper, OpcaoStepper };

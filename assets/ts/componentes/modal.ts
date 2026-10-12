interface OpcaoModal {
  id: string;
  titulo: string;
  mensagem: string;
  rotuloBtnConfirmar?: string;
  rotuloBtnCancelar?: string;
  tipo?: 'perigo' | 'aviso' | 'informacao';
  aoConfirmar: () => void | Promise<void>;
}

function exibirModalConfirmacao(opcao: OpcaoModal): void {
  const existente = document.getElementById(opcao.id);
  existente?.remove();

  const coresTipo: Record<string, string> = {
    perigo: '#E74C3C',
    aviso: '#F39C12',
    informacao: '#3498DB',
  };
  const cor = coresTipo[opcao.tipo ?? 'perigo'];

  const overlay = document.createElement('div');
  overlay.id = opcao.id;
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', `${opcao.id}-titulo`);
  overlay.setAttribute('aria-describedby', `${opcao.id}-mensagem`);

  overlay.innerHTML = `
    <div class="modal-caixa">
      <div class="modal-icone" style="color:${cor};" aria-hidden="true">
        <i class="bi bi-exclamation-triangle-fill"></i>
      </div>
      <h2 class="modal-titulo" id="${opcao.id}-titulo">${opcao.titulo}</h2>
      <p class="modal-mensagem" id="${opcao.id}-mensagem">${opcao.mensagem}</p>
      <div class="modal-acoes">
        <button class="btn-modal-cancelar" id="${opcao.id}-cancelar">
          ${opcao.rotuloBtnCancelar ?? 'Cancelar'}
        </button>
        <button class="btn-modal-confirmar" id="${opcao.id}-confirmar" style="background:${cor};">
          ${opcao.rotuloBtnConfirmar ?? 'Confirmar'}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visivel'));

  const fechar = () => {
    overlay.classList.remove('visivel');
    setTimeout(() => overlay.remove(), 300);
  };

  document.getElementById(`${opcao.id}-cancelar`)!.addEventListener('click', fechar);
  document.getElementById(`${opcao.id}-confirmar`)!.addEventListener('click', async () => {
    fechar();
    await opcao.aoConfirmar();
  });

  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); }, { once: true });

  const primeiroBotao = overlay.querySelector<HTMLElement>('button');
  primeiroBotao?.focus();
}

export { exibirModalConfirmacao };
export type { OpcaoModal };

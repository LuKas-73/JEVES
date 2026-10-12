type TipoToast = 'sucesso' | 'erro' | 'aviso' | 'informacao';

interface OpcaoToast {
  tipo: TipoToast;
  mensagem: string;
  titulo?: string;
  duracao?: number;
}

const iconesPorTipo: Record<TipoToast, string> = {
  sucesso: 'bi-check-circle-fill',
  erro: 'bi-x-circle-fill',
  aviso: 'bi-exclamation-triangle-fill',
  informacao: 'bi-info-circle-fill',
};

const coresPorTipo: Record<TipoToast, string> = {
  sucesso: '#2ECC71',
  erro: '#E74C3C',
  aviso: '#F39C12',
  informacao: '#3498DB',
};

function obterConteiner(): HTMLElement {
  let conteiner = document.getElementById('jeves-conteiner-toasts');
  if (conteiner) return conteiner;
  conteiner = document.createElement('div');
  conteiner.id = 'jeves-conteiner-toasts';
  Object.assign(conteiner.style, {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '380px',
    width: 'calc(100% - 3rem)',
  });
  document.body.appendChild(conteiner);
  return conteiner;
}

function exibirToast(opcao: OpcaoToast): void {
  const conteiner = obterConteiner();
  const duracao = opcao.duracao ?? 4500;
  const cor = coresPorTipo[opcao.tipo];
  const icone = iconesPorTipo[opcao.tipo];

  const elemento = document.createElement('div');
  Object.assign(elemento.style, {
    background: 'rgba(11, 22, 64, 0.98)',
    border: '1px solid rgba(42, 74, 175, 0.35)',
    borderLeft: `4px solid ${cor}`,
    borderRadius: '14px',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
    opacity: '0',
    transform: 'translateX(20px)',
    transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: "'Inter', sans-serif",
  });

  elemento.innerHTML = `
    <i class="bi ${icone}" style="color:${cor};font-size:1.2rem;flex-shrink:0;margin-top:2px;" aria-hidden="true"></i>
    <div style="flex:1;min-width:0;">
      ${opcao.titulo ? `<div style="color:#fff;font-weight:600;font-size:.9rem;margin-bottom:2px;font-family:'Outfit',sans-serif;">${opcao.titulo}</div>` : ''}
      <div style="color:#A8B8D8;font-size:.875rem;line-height:1.5;">${opcao.mensagem}</div>
    </div>
    <button aria-label="Fechar" style="background:none;border:none;color:rgba(255,255,255,.35);cursor:pointer;padding:0;font-size:1rem;line-height:1;flex-shrink:0;transition:color .15s;">
      <i class="bi bi-x" aria-hidden="true"></i>
    </button>
  `;

  const btnFechar = elemento.querySelector('button')!;
  btnFechar.addEventListener('click', () => removerToast(elemento));
  conteiner.appendChild(elemento);

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      elemento.style.opacity = '1';
      elemento.style.transform = 'translateX(0)';
    })
  );

  const timer = setTimeout(() => removerToast(elemento), duracao);
  elemento.addEventListener('mouseenter', () => clearTimeout(timer));
}

function removerToast(elemento: HTMLElement): void {
  elemento.style.opacity = '0';
  elemento.style.transform = 'translateX(20px)';
  setTimeout(() => elemento.remove(), 320);
}

const toast = {
  sucesso: (mensagem: string, titulo?: string) => exibirToast({ tipo: 'sucesso', mensagem, titulo }),
  erro: (mensagem: string, titulo?: string) => exibirToast({ tipo: 'erro', mensagem, titulo }),
  aviso: (mensagem: string, titulo?: string) => exibirToast({ tipo: 'aviso', mensagem, titulo }),
  info: (mensagem: string, titulo?: string) => exibirToast({ tipo: 'informacao', mensagem, titulo }),
};

export { toast, exibirToast };
export type { TipoToast, OpcaoToast };

type StatusInscrição = 'pendente' | 'aprovada' | 'correcao' | 'recusada';
type StatusTorneio = 'rascunho' | 'inscricoes-abertas' | 'em-andamento' | 'encerrado';
type StatusJogo = 'agendado' | 'em-andamento' | 'finalizado';

type StatusBadge = StatusInscrição | StatusTorneio | StatusJogo;

interface ConfigBadge {
  rotulo: string;
  classe: string;
  icone: string;
}

const configuracoesBadge: Record<StatusBadge, ConfigBadge> = {
  'rascunho': { rotulo: 'Rascunho', classe: 'status-rascunho', icone: 'bi-pencil' },
  'inscricoes-abertas': { rotulo: 'Inscrições Abertas', classe: 'status-inscricoes-abertas', icone: 'bi-door-open' },
  'em-andamento': { rotulo: 'Em Andamento', classe: 'status-em-andamento', icone: 'bi-play-circle' },
  'encerrado': { rotulo: 'Encerrado', classe: 'status-encerrado', icone: 'bi-lock' },
  'pendente': { rotulo: 'Pendente', classe: 'status-pendente', icone: 'bi-hourglass-split' },
  'aprovada': { rotulo: 'Aprovada', classe: 'status-aprovada', icone: 'bi-check-circle' },
  'correcao': { rotulo: 'Correção Solicitada', classe: 'status-correcao', icone: 'bi-pencil-square' },
  'recusada': { rotulo: 'Recusada', classe: 'status-recusada', icone: 'bi-x-circle' },
  'agendado': { rotulo: 'Agendado', classe: 'status-agendado', icone: 'bi-calendar-event' },
  'finalizado': { rotulo: 'Finalizado', classe: 'status-finalizado', icone: 'bi-flag' },
};

function gerarBadge(status: StatusBadge): string {
  const config = configuracoesBadge[status];
  if (!config) return `<span class="badge-status">${status}</span>`;
  return `
    <span class="badge-status ${config.classe}">
      <i class="bi ${config.icone}" aria-hidden="true"></i>
      <span>${config.rotulo}</span>
    </span>
  `;
}

function aplicarBadge(elemento: HTMLElement, status: StatusBadge): void {
  elemento.innerHTML = gerarBadge(status);
}

export { gerarBadge, aplicarBadge, configuracoesBadge };
export type { StatusBadge, StatusInscrição, StatusTorneio, StatusJogo };

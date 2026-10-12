interface ResultadoValidacao {
  valido: boolean;
  mensagem: string;
}

function validarEmail(email: string): ResultadoValidacao {
  if (!email?.trim()) return { valido: false, mensagem: 'E-mail é obrigatório' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { valido: false, mensagem: 'Formato de e-mail inválido' };
  return { valido: true, mensagem: '' };
}

function validarCnpj(cnpj: string): ResultadoValidacao {
  const digitos = cnpj.replace(/\D/g, '');
  if (digitos.length !== 14) return { valido: false, mensagem: 'CNPJ deve ter 14 dígitos' };
  if (/^(\d)\1{13}$/.test(digitos)) return { valido: false, mensagem: 'CNPJ inválido' };
  return { valido: true, mensagem: '' };
}

function validarCep(cep: string): ResultadoValidacao {
  const digitos = cep.replace(/\D/g, '');
  if (digitos.length !== 8) return { valido: false, mensagem: 'CEP deve ter 8 dígitos' };
  return { valido: true, mensagem: '' };
}

function validarSenha(senha: string): ResultadoValidacao {
  if (!senha || senha.length < 8) return { valido: false, mensagem: 'A senha deve ter pelo menos 8 caracteres' };
  if (!/[A-Z]/.test(senha)) return { valido: false, mensagem: 'A senha deve ter pelo menos uma letra maiúscula' };
  if (!/[0-9]/.test(senha)) return { valido: false, mensagem: 'A senha deve ter pelo menos um número' };
  return { valido: true, mensagem: '' };
}

function validarConfirmacaoSenha(senha: string, confirmacao: string): ResultadoValidacao {
  if (senha !== confirmacao) return { valido: false, mensagem: 'As senhas não coincidem' };
  return { valido: true, mensagem: '' };
}

function validarObrigatorio(valor: string, nomeCampo: string): ResultadoValidacao {
  if (!valor?.trim()) return { valido: false, mensagem: `${nomeCampo} é obrigatório` };
  return { valido: true, mensagem: '' };
}

function validarData(data: string): ResultadoValidacao {
  if (isNaN(new Date(data).getTime())) return { valido: false, mensagem: 'Data inválida' };
  return { valido: true, mensagem: '' };
}

function mascaraCnpj(valor: string): string {
  return valor.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .substring(0, 18);
}

function mascaraCep(valor: string): string {
  return valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9);
}

function mascaraTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '');
  return d.length <= 10
    ? d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').substring(0, 14)
    : d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').substring(0, 15);
}

function marcarErro(campoId: string, mensagem: string): void {
  const campo = document.getElementById(campoId) as HTMLInputElement | null;
  if (!campo) return;
  campo.classList.add('is-invalid');
  campo.classList.remove('is-valid');
  let feedback = campo.nextElementSibling as HTMLElement | null;
  if (!feedback?.classList.contains('invalid-feedback')) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    campo.parentNode?.insertBefore(feedback, campo.nextSibling);
  }
  feedback.textContent = mensagem;
}

function limparErro(campoId: string): void {
  const campo = document.getElementById(campoId) as HTMLInputElement | null;
  if (!campo) return;
  campo.classList.remove('is-invalid');
  campo.classList.add('is-valid');
}

export {
  validarEmail,
  validarCnpj,
  validarCep,
  validarSenha,
  validarConfirmacaoSenha,
  validarObrigatorio,
  validarData,
  mascaraCnpj,
  mascaraCep,
  mascaraTelefone,
  marcarErro,
  limparErro,
};
export type { ResultadoValidacao };

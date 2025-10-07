export function dataAtualFormatada() {
  const hoje = new Date();
  return hoje.toLocaleDateString("pt-BR");
}

export function parseData(dataStr) {
  const [dia, mes, ano] = dataStr.split("/");
  return new Date(`${ano}-${mes}-${dia}`);
}

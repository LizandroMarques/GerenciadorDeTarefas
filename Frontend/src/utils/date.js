export function dataAtualFormatada() {
  const hoje = new Date();
  return hoje.toLocaleDateString("pt-BR");
}

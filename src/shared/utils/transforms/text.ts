//algoritmo que recebe um texto ou undefined
// caso undefined retorna uma string vazia
// caso o texto conter somente uma palavra retorna a primeira e segunda letra
// caso o texto conter mais que duas palavras deverá retorna somente a primeira letra da primeira palabra e a primeira lebra da da segunda palavra
// caso o texto conter mais que duas palavras e a segunda palavra for um artigo ou preposição deverá retorna somente a primeira letra da primeira palabra e a primeira lebra da da terceira palavra
// caso o texto conter mais que duas palavras e a segunda palavra for um artigo ou preposição deverá retorna somente a primeira letra da primeira palabra e a primeira lebra da da terceira palavra

export function getInitials(text: string | undefined): string {
  if (!text) {
    return '';
  }

  const words = text.split(' ');

  if (words.length === 1) {
    return words[0].substring(0, 2).toLocaleUpperCase();
  }

  if (words.length > 1) {
    if (words[1] === 'de' || words[1] === 'da' || words[1] === 'do') {
      return `${words[0].substring(0, 1)}${words[2].substring(
        0,
        1
      )}`.toLocaleUpperCase();
    }

    return `${words[0].substring(0, 1)}${words[1].substring(
      0,
      1
    )}`.toLocaleUpperCase();
  }

  return '';
}

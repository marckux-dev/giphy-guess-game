
export const isAlphabetic = (character: string) =>
  character.toLowerCase() !== character.toUpperCase();

export const hideTerm = (term: string) =>
  term.split('').map(c => isAlphabetic(c)? '_' : c).join('');


export const isAlphabetic = (character: string) =>
  character.toLowerCase() !== character.toUpperCase();

export const hideTerm = (term: string) =>
  term.split('').map(c => isAlphabetic(c)? '_' : c).join('');

export const getPositions = (term: string, character: string): number[] =>
  Array.from(term)
    .map((char, index) => char === character? index : -1 )
    .filter(index => index !== -1);

export const shuffleArray = (arr: string[]) => (
  arr
    .map((item) => ({item, k:Math.random()}))
    .sort((a,b) => a.k - b.k)
    .map(({ item }) => item)
);

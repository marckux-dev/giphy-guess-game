import {shuffleArray} from './array-utils';

export const isAlphabetic = (character: string) =>
  character.toLowerCase() !== character.toUpperCase();

export const hideTerm = (term: string) =>
  term.split('').map(c => isAlphabetic(c)? '_' : c).join('');

export const getPositions = (term: string, character: string): number[] =>
  Array.from(term)
    .map((char, index) => char === character? index : -1 )
    .filter(index => index !== -1);

export const shuffleArrayOfWords: (arr:string[]) => string[] = shuffleArray<string>;

export const revealRandomLetter = (term: string, template: string) => {
  const positons = getPositions(template, '_');
  if (positons.length === 0) return template;
  const randomIndex = Math.floor(Math.random() * positons.length);
  const position = positons[randomIndex];
  const letter = term[position];
  template = template.slice(0, position) + letter + template.slice(position + 1);
  return template;
}

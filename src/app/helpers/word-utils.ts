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
  const positions = getPositions(template, '_');
  if (positions.length === 0) return template;
  const randomIndex = Math.floor(Math.random() * positions.length);
  const position = positions[randomIndex];
  const letter = term[position];
  template = template.slice(0, position) + letter + template.slice(position + 1);
  return template;
}

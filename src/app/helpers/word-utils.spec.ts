import {getPositions, hideTerm, shuffleArray} from './word-utils';

describe('hideTerm', () => {
  it('should replace only alphabetic characters with underscores', () => {
    const result = hideTerm('hello');
    expect(result).toBe('_____');
  });

  it('should preserve non-alphabetic characters', () => {
    const result = hideTerm('hi! :)');
    expect(result).toBe('__! :)');
  });

  it('should preserve spaces', () => {
    const result = hideTerm('new york');
    expect(result).toBe('___ ____');
  });

  it('should handle mixed-case letters', () => {
    const result = hideTerm('GiPhY');
    expect(result).toBe('_____');
  });

  it('should return an empty string if input is empty', () => {
    const result = hideTerm('');
    expect(result).toBe('');
  });

  it('should preserve numbers and symbols', () => {
    const result = hideTerm('Top 10 GIFs!');
    expect(result).toBe('___ 10 ____!');
  });
});

describe('getPositions', () => {
  it('should return all positions of a character in a word', () => {
    const result = getPositions('banana', 'a');
    expect(result).toEqual([1, 3, 5]);
  });

  it('should return an empty array if the character is not found', () => {
    const result = getPositions('banana', 'z');
    expect(result).toEqual([]);
  });

  it('should return positions of the first character', () => {
    const result = getPositions('abcabc', 'a');
    expect(result).toEqual([0, 3]);
  });

  it('should handle repeated characters in a row', () => {
    const result = getPositions('bookkeeper', 'e');
    expect(result).toEqual([5, 6, 8]);
  });

  it('should be case-sensitive', () => {
    const result = getPositions('Apple', 'a');
    expect(result).toEqual([]); // 'a' is not the same as 'A'
  });

  it('should return empty array for an empty string', () => {
    const result = getPositions('', 'x');
    expect(result).toEqual([]);
  });
});


describe('shuffleArray', () => {
  it('should return an array of the same length', () => {
    const input = ['a', 'b', 'c', 'd'];
    const result = shuffleArray(input);
    expect(result.length).toBe(input.length);
  });

  it('should contain the same elements (ignoring order)', () => {
    const input = ['apple', 'banana', 'cherry'];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual(input.slice().sort());
  });

  it('should return a different order in most cases', () => {
    const input = ['x', 'y', 'z', 'w'];
    const runs = new Set<string>();

    // Try multiple runs to check for non-determinism
    for (let i = 0; i < 10; i++) {
      runs.add(shuffleArray(input).join(''));
    }

    // Expect at least one run to produce a different order
    expect(runs.size).toBeGreaterThan(1);
  });

  it('should not mutate the original array', () => {
    const input = ['1', '2', '3'];
    const copy = [...input];
    shuffleArray(input);
    expect(input).toEqual(copy);
  });

  it('should return an empty array when input is empty', () => {
    const result = shuffleArray([]);
    expect(result).toEqual([]);
  });

  it('should return the same single element when input has one item', () => {
    const result = shuffleArray(['solo']);
    expect(result).toEqual(['solo']);
  });
});


import {hideTerm} from './word-utils';

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

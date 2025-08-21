import {Injectable, signal} from '@angular/core';
import {shuffleArrayOfWords} from '../helpers/word-utils';
import {DEFAULT_SEARCH_TERMS} from '../constants/gif-constants';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  words = signal<string[]>(
    shuffleArrayOfWords(DEFAULT_SEARCH_TERMS)
  );

  reset(): void {
    this.words.set(shuffleArrayOfWords(DEFAULT_SEARCH_TERMS));
  }

  serveWord(): string {
    let word: string | undefined;
    this.words.update(oldWords => {
      word = oldWords.pop();
      return oldWords;
    })
    return word?? '';
  }


}

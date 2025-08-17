import {Injectable, signal} from '@angular/core';
import {shuffleArray} from '../helpers/word-utils';
import {DEFAULT_SEARCH_TERMS} from '../constants/gif-constants';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  words = signal<string[]>(
    shuffleArray(DEFAULT_SEARCH_TERMS)
  );

  serveWord(): string {
    let word: string | undefined;
    this.words.update(oldWords => {
      word = oldWords.pop();
      return oldWords;
    })
    return word?? '';
  }


}
